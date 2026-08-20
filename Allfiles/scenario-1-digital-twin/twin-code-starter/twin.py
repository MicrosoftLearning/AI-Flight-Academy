"""Ask your twin something, from Python.

Everything in this starter goes through `ask()`. It shells out to the GitHub Copilot
CLI, which loads the skill in `.github/skills/my-twin/` and answers using the files in
that skill's `references/` folder.

    from twin import ask

    print(ask("A teammate is blocked on my review and I'm mid-migration. What do I do?"))

Run it directly to try a one-off question:

    python twin.py "should I take this on?"

Two things worth knowing before you build on this:

* **A call takes roughly a minute.** It is a full agent turn, not a completion. Anything
  that calls the twin in a loop needs to bound how many times it runs.
* **Ask for JSON when a program is reading the answer.** `ask_json()` does that, and
  tolerates a model that wraps its reply in a code fence anyway.
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent

# Long prompts can exceed the OS command-line limit (~8 KB on Windows), so anything
# large is written to a file and the CLI is pointed at it instead.
_ARG_LIMIT = 4000
_SCRATCH = ROOT / ".twin-scratch"


class TwinError(RuntimeError):
    """The CLI is missing, timed out, or returned nothing usable."""


def ask(prompt: str, *, timeout: int = 180) -> str:
    """Send `prompt` to the twin and return its reply as text."""
    if not shutil.which("copilot"):
        raise TwinError(
            "GitHub Copilot CLI not found. Install it with "
            "`npm install -g @github/copilot`, then run `copilot` once to sign in."
        )

    scratch_file = None
    if len(prompt) > _ARG_LIMIT:
        _SCRATCH.mkdir(exist_ok=True)
        scratch_file = _SCRATCH / "prompt.md"
        scratch_file.write_text(prompt, encoding="utf-8")
        sent = (
            f"Read the file {scratch_file.relative_to(ROOT).as_posix()} in this "
            "repository. It contains your instructions. Carry them out and reply with "
            "the result only."
        )
    else:
        sent = prompt

    try:
        result = subprocess.run(
            ["copilot", "-p", sent, "--allow-all-tools", "--silent"],
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=str(ROOT),
            encoding="utf-8",
            errors="replace",
        )
    except subprocess.TimeoutExpired as exc:
        raise TwinError(f"No answer within {timeout}s.") from exc
    finally:
        if scratch_file is not None:
            scratch_file.unlink(missing_ok=True)

    answer = (result.stdout or "").strip()
    if not answer:
        detail = (result.stderr or "").strip()[:300] or "no output"
        raise TwinError(f"The twin returned nothing ({detail}).")
    return answer


def ask_json(prompt: str, *, timeout: int = 180):
    """Ask for a JSON reply and return it parsed.

    Appends the instruction rather than trusting the caller to remember it, and strips a
    surrounding code fence if the model adds one.
    """
    raw = ask(
        f"{prompt}\n\nReply with valid JSON only. No prose, no code fence.",
        timeout=timeout,
    )
    fenced = re.search(r"```(?:json)?\s*(.+?)\s*```", raw, re.DOTALL)
    if fenced:
        raw = fenced.group(1)
    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        raise TwinError(f"Expected JSON, got: {raw[:300]}") from exc


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
        print(ask(question))
    except TwinError as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
