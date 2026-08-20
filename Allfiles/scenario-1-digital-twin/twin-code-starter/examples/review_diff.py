"""Review a diff the way you would.

Reads a git diff, asks your twin to review it against `persona.md`, prints the result,
and exits non-zero if your twin would block it. That exit code is the point: it makes
this usable as a pre-commit hook or a CI step, with no chat window anywhere.

    python examples/review_diff.py                # unstaged changes
    python examples/review_diff.py --staged       # staged changes (pre-commit)
    git diff main... | python examples/review_diff.py --stdin

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

from twin import TwinError, ask_json, example_warning  # noqa: E402

# A large diff costs time and adds little - the twin only needs enough to judge the
# change, and a review that takes four minutes will not survive contact with a hook.
MAX_DIFF_CHARS = 12_000

PROMPT = """Return a single JSON object with these keys, and nothing else:

  verdict  - "block" if one of my non-negotiables is broken, "comment" if I would leave
             notes but approve, "ok" if I would approve without comment
  summary  - one sentence, in my voice
  notes    - array of objects with "file" and "comment", in my voice. Empty if none
  rule     - the line from persona.md that drove the verdict, quoted

The task: using my twin, review this diff the way I would review a colleague's pull
request. Apply my own standards from persona.md - my bar, my non-negotiables, what I
check before committing. Do not give generic code-review advice: if my files do not
cover something, leave it alone.

Everything you need is below. Do not run any commands, do not look at the repository,
and do not check git state.

Diff:
```diff
{diff}
```

If the diff ends with `[diff truncated]` it was cut for length - review what you can see
and do not mention that it is incomplete.

Reply with the JSON object only. No prose before or after it, no code fence."""


def collect_diff(source: str) -> str:
    """Return the diff to review, from git or stdin."""
    if source == "-":
        return sys.stdin.read()

    args = ["git", "diff", "--staged"] if source == "staged" else ["git", "diff"]
    try:
        result = subprocess.run(args, capture_output=True, text=True, check=True)
    except FileNotFoundError:
        # Exit 2, not 1. In a hook, 1 means "your twin blocked this" - an environment
        # failure must not be mistaken for a verdict.
        print("git not found on PATH.", file=sys.stderr)
        raise SystemExit(2)
    except subprocess.CalledProcessError as exc:
        # git's own usage dump is long and unhelpful here - keep the first line.
        lines = (exc.stderr or "").strip().splitlines()
        print(f"git diff failed: {lines[0] if lines else exc}", file=sys.stderr)
        raise SystemExit(2)
    return result.stdout


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    # One flag, one meaning. An earlier version had a positional and --staged writing
    # to the same dest, and argparse silently resolved it to the positional default -
    # so --staged reviewed the working tree and the hook could never block.
    group = parser.add_mutually_exclusive_group()
    group.add_argument(
        "--staged",
        action="store_true",
        help="review staged changes instead of the working tree (use in a pre-commit hook)",
    )
    group.add_argument(
        "--stdin",
        action="store_true",
        help="read the diff from stdin",
    )
    parser.add_argument(
        "source",
        nargs="?",
        default=None,
        choices=["staged", "-"],
        help=argparse.SUPPRESS,  # kept so `review_diff.py staged` and `-` still work
    )
    args = parser.parse_args()

    if args.stdin or args.source == "-":
        source = "-"
    elif args.staged or args.source == "staged":
        source = "staged"
    else:
        source = "unstaged"

    diff = collect_diff(source).strip()
    if not diff:
        print("Nothing to review.")
        return 0

    truncated = len(diff) > MAX_DIFF_CHARS
    if truncated:
        # Cut at a line boundary so the twin never sees half a changed line.
        diff = diff[:MAX_DIFF_CHARS].rsplit("\n", 1)[0] + "\n[diff truncated]"

    try:
        review = ask_json(PROMPT.format(diff=diff))
    except TwinError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2

    verdict = str(review.get("verdict", "")).lower()
    marks = {"block": "BLOCK", "comment": "COMMENT", "ok": "OK"}

    notice = example_warning()
    if notice:
        print(notice, file=sys.stderr)

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
