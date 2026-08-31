"""Sort a list of incoming items the way you would, and draft each reply.

Reads items - one per line, from a file or stdin - and asks the twin to bucket each into
needs-me / delegate / decline / noise, with a one-line reply in your voice. No code
anywhere: this is the twin doing knowledge work, the same call `review_diff` makes about
a diff pointed at an inbox instead.

    python examples/triage.py examples/inbox.sample.md
    printf 'Priya: can you review the Lantern PR today?\\nRecruiter: 15 min next week?\\n' | python examples/triage.py -

Add --json for the raw object a program would act on.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from twin import TwinError, ask_json  # noqa: E402

# Enough to judge and reply, not so many that one slow agent turn reads a whole mailbox.
MAX_ITEMS = 20

PROMPT = """Using my twin, triage these incoming items the way I would. For each one,
decide where it goes and draft the reply I'd send.

Buckets:
  needs-me   - I have to handle this myself, soon
  delegate   - someone else should own it; say who if my files name them
  decline    - I'd say no, or not now
  noise      - no reply needed

Items:
{items}

Return a single JSON object with one key, "triaged", an array in the same order as the
items. Each element:

  item    - the original text, trimmed
  bucket  - one of the four above
  reply   - one line in my voice, or "" for noise
  rule    - the persona.md or voice.md line behind the call, short

Reply with the JSON object only - no prose around it, no code fence."""


def read_items(source: str | None) -> list[str]:
    text = sys.stdin.read() if source in (None, "-") else Path(source).read_text(encoding="utf-8")
    # Blank lines and markdown bullets are noise for the model; strip them here.
    items = []
    for line in text.splitlines():
        line = line.strip().lstrip("-* ").strip()
        if line and not line.startswith("#"):
            items.append(line)
    return items


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("source", nargs="?", help="a file of items, or - for stdin")
    parser.add_argument("--json", action="store_true", help="print the raw JSON object")
    args = parser.parse_args()

    items = read_items(args.source)
    if not items:
        print("Nothing to triage.")
        return 0
    if len(items) > MAX_ITEMS:
        print(f"  (triaging the first {MAX_ITEMS} of {len(items)} items)")
        items = items[:MAX_ITEMS]

    numbered = "\n".join(f"{i + 1}. {item}" for i, item in enumerate(items))
    try:
        result = ask_json(PROMPT.format(items=numbered))
    except TwinError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2

    if args.json:
        print(json.dumps(result, indent=2))
        return 0

    for row in result.get("triaged") or []:
        print(f"[{str(row.get('bucket', '?')).upper():8}] {row.get('item', '')}")
        if row.get("reply"):
            print(f"           reply: {row['reply']}")
    return 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    raise SystemExit(main())
