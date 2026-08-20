"""Review a diff the way you would.

Reads a git diff, asks your twin to review it against `persona.md`, prints the result,
and exits non-zero if your twin would block it. That exit code is the point: it makes
this usable as a pre-commit hook or a CI step, with no chat window anywhere.

    python examples/review_diff.py                # unstaged changes
    python examples/review_diff.py --staged       # staged changes (pre-commit)
    git diff main... | python examples/review_diff.py -

As a pre-commit hook:

    # .git/hooks/pre-commit
    #!/bin/sh
    python examples/review_diff.py --staged || exit 1

This is one worked example, not a template you have to follow. It exists so there is
something running to read, copy, or throw away.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from twin import TwinError, ask_json  # noqa: E402

# A large diff costs time and adds little - the twin only needs enough to judge the
# change, and a review that takes four minutes will not survive contact with a hook.
MAX_DIFF_CHARS = 12_000

PROMPT = """Using my twin, review this diff the way I would review a colleague's pull request.

Apply my own standards from persona.md - my bar, my non-negotiables, what I check before
committing. Do not give generic code-review advice: if my files do not cover something,
leave it alone.

Return JSON with these keys:
  verdict  - "block" if one of my non-negotiables is broken, "comment" if I would leave
             notes but approve, "ok" if I would approve without comment
  summary  - one sentence, in my voice
  notes    - array of objects with "file" and "comment", in my voice. Empty if none
  rule     - the line from persona.md that drove the verdict, quoted

Diff:
```diff
{diff}
```"""


def collect_diff(source: str) -> str:
    """Return the diff to review, from git or stdin."""
    if source == "-":
        return sys.stdin.read()

    args = ["git", "diff", "--staged"] if source == "staged" else ["git", "diff"]
    try:
        result = subprocess.run(args, capture_output=True, text=True, check=True)
    except FileNotFoundError:
        raise SystemExit("git not found on PATH.")
    except subprocess.CalledProcessError as exc:
        raise SystemExit(f"git diff failed: {(exc.stderr or '').strip()}")
    return result.stdout


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument(
        "source",
        nargs="?",
        default="unstaged",
        choices=["unstaged", "staged", "-"],
        help="what to review: working tree (default), staged changes, or stdin",
    )
    parser.add_argument("--staged", action="store_const", const="staged", dest="source")
    args = parser.parse_args()

    diff = collect_diff(args.source).strip()
    if not diff:
        print("Nothing to review.")
        return 0

    truncated = len(diff) > MAX_DIFF_CHARS
    if truncated:
        diff = diff[:MAX_DIFF_CHARS]

    try:
        review = ask_json(PROMPT.format(diff=diff))
    except TwinError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2

    verdict = str(review.get("verdict", "")).lower()
    marks = {"block": "BLOCK", "comment": "COMMENT", "ok": "OK"}

    print(f"{marks.get(verdict, verdict.upper() or '?')}  {review.get('summary', '')}")
    for note in review.get("notes") or []:
        print(f"  {note.get('file', '?')}: {note.get('comment', '')}")
    if review.get("rule"):
        print(f"  rule: {review['rule']}")
    if truncated:
        print(f"  (reviewed the first {MAX_DIFF_CHARS} characters of the diff)")

    return 1 if verdict == "block" else 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    raise SystemExit(main())
