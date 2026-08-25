"""Ask the model something, from Python.

Shells out to the GitHub Copilot CLI and returns the reply. Use it where a
judgment or a piece of writing is wanted; use `evaluate.py` where a number is.

    from agent import ask, ask_json

    print(ask("Summarize this candidate's case in three sentences: ..."))

Run it directly for a one-off:

    python agent.py "who is this program for?"

Two things that shape anything built on this:

* **A call takes 20 to 60 seconds.** It is a full agent turn, not a completion.
  Anything that calls per-candidate over 72 people needs a bound.
* **Ask for JSON when a program reads the answer.** `ask_json()` does that and
  copes with a model that adds prose or a code fence anyway.
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent

# The prompt is piped in on stdin, so there is no OS command-line limit. This
# cap is about the agent turn: more evidence per call is slower and vaguer.
# Trim what you send instead - see MAX_RECORDS in examples/brief.py.
_ARG_LIMIT = 20000


class AgentError(RuntimeError):
    """The CLI is missing, failed, timed out, or returned nothing usable."""


def _final_message(stdout: str) -> tuple[str, int | None]:
    """Pull the answer and exit code out of the CLI's JSONL stream.

    `--output-format json` emits one JSON object per line: session setup, tool
    calls, streaming deltas, then a final `result`. The answer is the last
    `assistant.message` carrying content.
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
    """Send `prompt` to the model and return its reply as text."""
    # Resolve the executable rather than relying on the OS to find it. npm
    # installs the CLI as copilot.cmd on Windows, which CreateProcess will not
    # launch by bare name - it only appends .exe.
    executable = shutil.which("copilot")
    if not executable:
        raise AgentError(
            "GitHub Copilot CLI not found. Install it with "
            "`npm install -g @github/copilot`, then run `copilot` once to sign in."
        )

    scratch_file = None
    if len(prompt) > _ARG_LIMIT:
        raise AgentError(
            f"Prompt is {len(prompt)} characters, over the {_ARG_LIMIT} limit. "
            "Send less evidence per call rather than splitting the question."
        )

    try:
        result = subprocess.run(
            # The prompt goes in on stdin, not as `-p`. A multi-line value passed
            # as an argument is truncated at the first newline, and the model
            # answers whatever the first line happened to say.
            [executable, "--output-format", "json", "--allow-all-tools"],
            input=prompt,
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=str(ROOT),
            encoding="utf-8",
            errors="replace",
        )
    except subprocess.TimeoutExpired as exc:
        raise AgentError(f"No answer within {timeout}s.") from exc
    except OSError as exc:
        raise AgentError(f"Could not run {executable}: {exc}") from exc

    stderr = (result.stderr or "").strip()

    if result.returncode != 0:
        raise AgentError(f"Copilot CLI exited {result.returncode}: {stderr[:300]}")

    answer, reported_code = _final_message(result.stdout or "")
    if reported_code not in (0, None):
        raise AgentError(f"The session ended with code {reported_code}.")
    if not answer:
        raise AgentError(f"Returned nothing ({stderr[:300] or 'no output'}).")
    return answer


def ask_json(prompt: str, *, timeout: int = 180):
    """Ask for a JSON reply and return it parsed."""
    raw = ask(
        f"{prompt}\n\n---\nOUTPUT FORMAT: valid JSON only. No prose before or "
        "after it, no code fence, no preamble. The reply is parsed by a program.",
        timeout=timeout,
    )

    candidates = [raw]

    # Stripping a fence up front would corrupt a valid reply that quotes one
    # inside a string value.
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

    raise AgentError(f"Expected JSON, got: {raw[:300]}")


if __name__ == "__main__":
    # Windows consoles default to a legacy code page, which mangles anything
    # written outside ASCII.
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    question = " ".join(sys.argv[1:])
    if not question:
        print(__doc__)
        raise SystemExit(2)
    try:
        print(ask(question))
    except AgentError as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
