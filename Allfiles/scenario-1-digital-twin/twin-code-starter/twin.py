"""Ask your twin something, from Python.

Everything in this starter goes through `ask()`. It shells out to the GitHub Copilot
CLI, which loads the skill in `.github/skills/my-twin/` and answers using the files in
that skill's `references/` folder.

    from twin import ask

    print(ask("A teammate is blocked on my review and I'm mid-migration. What do I do?"))

Run it directly to try a one-off question:

    python twin.py "should I take this on?"

Two things worth knowing before you build on this:

* **A call takes 20 to 60 seconds.** It is a full agent turn, not a completion. Anything
  that calls the twin in a loop needs to bound how many times it runs.
* **Ask for JSON when a program is reading the answer.** `ask_json()` does that, and
  copes with a model that adds prose or a code fence anyway.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).parent
REFERENCES = ROOT / ".github" / "skills" / "my-twin" / "references"

# Long prompts can exceed the OS command-line limit (~8 KB on Windows), so anything
# large is written to a file and the CLI is pointed at it instead.
_ARG_LIMIT = 4000
_SCRATCH = ROOT / ".twin-scratch"

_EXAMPLE_MARKER = "This is example content"


class TwinError(RuntimeError):
    """The CLI is missing, failed, timed out, or returned nothing usable."""


def is_example_twin() -> bool:
    """True while persona.md or voice.md is still the fictional starter content.

    Checked here rather than asked of the twin: an instruction to disclose this in
    every answer fights any request for structured output, and the model would rather
    warn you than return clean JSON.
    """
    for name in ("persona.md", "voice.md"):
        path = REFERENCES / f"{name}"
        if path.exists() and _EXAMPLE_MARKER in path.read_text(encoding="utf-8"):
            return True
    return False


def example_warning() -> str:
    """A one-line notice, or an empty string once the twin is the user's own."""
    if not is_example_twin():
        return ""
    return (
        "note: this is the example twin - replace "
        ".github/skills/my-twin/references/persona.md and voice.md with your own."
    )


def _final_message(stdout: str) -> tuple[str, int | None]:
    """Pull the answer and exit code out of the CLI's JSONL stream.

    `--output-format json` emits one JSON object per line: session setup, tool calls,
    streaming deltas, then a final `result`. The answer is the last `assistant.message`
    carrying content. Parsing this is why the twin can read files and use tools without
    its progress output ending up in the reply.
    """
    answer = ""
    exit_code: int | None = None

    for line in stdout.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            event = json.loads(line)
        except json.JSONDecodeError:
            continue  # a partial line is not worth failing over

        kind = event.get("type")
        if kind == "assistant.message":
            content = (event.get("data") or {}).get("content") or ""
            if content.strip():
                answer = content.strip()
        elif kind == "result":
            exit_code = event.get("exitCode")

    return answer, exit_code


def ask(prompt: str, *, timeout: int = 180) -> str:
    """Send `prompt` to the twin and return its reply as text."""
    # Resolve the executable rather than relying on the OS to find it. npm installs
    # the CLI as copilot.cmd on Windows, which CreateProcess will not launch by bare
    # name - it only appends .exe.
    executable = shutil.which("copilot")
    if not executable:
        raise TwinError(
            "GitHub Copilot CLI not found. Install it with "
            "`npm install -g @github/copilot`, then run `copilot` once to sign in."
        )

    scratch_file = None
    # A prompt is passed as an argv value, and a diff or a template contains lines
    # starting with `---` that the CLI's parser reads as options - the prompt arrives
    # mangled and the twin answers a question nobody asked. Anything multi-line or
    # long goes via a file instead, which has no such ambiguity.
    if "\n" in prompt or len(prompt) > _ARG_LIMIT:
        _SCRATCH.mkdir(exist_ok=True)
        # A unique name per call: two asks running at once must not overwrite or
        # delete each other's prompt.
        handle, path = tempfile.mkstemp(suffix=".md", dir=_SCRATCH)
        os.close(handle)
        scratch_file = Path(path)
        scratch_file.write_text(prompt, encoding="utf-8")
        sent = (
            f"Read the file {scratch_file.relative_to(ROOT).as_posix()} in this "
            "repository. It contains your instructions. Carry them out exactly and "
            "reply with the result only."
        )
    else:
        sent = prompt

    try:
        result = subprocess.run(
            # Flags go before -p. A multi-line prompt containing diff markers can
            # swallow options that follow it, and --output-format is then silently
            # ignored - which turns the JSONL stream back into decorated text.
            [executable, "--output-format", "json", "--allow-all-tools", "-p", sent],
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=str(ROOT),
            encoding="utf-8",
            errors="replace",
        )
    except subprocess.TimeoutExpired as exc:
        raise TwinError(f"No answer within {timeout}s.") from exc
    except OSError as exc:
        raise TwinError(f"Could not run {executable}: {exc}") from exc
    finally:
        if scratch_file is not None:
            scratch_file.unlink(missing_ok=True)

    stderr = (result.stderr or "").strip()

    # A non-zero exit is usually sign-in or quota. Without this check the error text
    # comes back as though the twin had said it.
    if result.returncode != 0:
        raise TwinError(f"Copilot CLI exited {result.returncode}: {stderr[:300]}")

    answer, reported_code = _final_message(result.stdout or "")
    if reported_code not in (0, None):
        raise TwinError(f"The twin's session ended with code {reported_code}.")
    if not answer:
        raise TwinError(f"The twin returned nothing ({stderr[:300] or 'no output'}).")
    return answer


def ask_json(prompt: str, *, timeout: int = 180):
    """Ask for a JSON reply and return it parsed.

    Appends the instruction rather than trusting the caller to remember it, then tries
    progressively harder to find JSON in the reply: as-is, inside a code fence, then the
    outermost braces. A twin with strong opinions sometimes answers in prose however the
    question is phrased.
    """
    raw = ask(
        f"{prompt}\n\n---\nOUTPUT FORMAT: valid JSON only. No prose before or after it, "
        "no code fence, no preamble. The reply is parsed by a program.",
        timeout=timeout,
    )

    candidates = [raw]

    # Stripping a fence up front would corrupt a valid reply that merely quotes one
    # inside a string value - which a code-reviewing twin does regularly.
    fenced = re.search(r"```(?:json)?\s*(.+?)\s*```", raw, re.DOTALL)
    if fenced:
        candidates.append(fenced.group(1))

    span = re.search(r"[\{\[].*[\}\]]", raw, re.DOTALL)
    if span:
        candidates.append(span.group(0))

    for candidate in candidates:
        try:
            return json.loads(candidate)
        except json.JSONDecodeError:
            continue

    raise TwinError(f"Expected JSON, got: {raw[:300]}")


if __name__ == "__main__":
    # Windows consoles default to a legacy code page, which mangles anything the twin
    # writes outside ASCII - dashes and quotes especially.
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    question = " ".join(sys.argv[1:])
    if not question:
        print(__doc__)
        raise SystemExit(2)
    try:
        answer = ask(question)
    except TwinError as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc

    notice = example_warning()
    if notice:
        print(notice, file=sys.stderr)
    print(answer)
