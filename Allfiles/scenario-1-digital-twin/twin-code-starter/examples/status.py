"""Turn rough bullets into a status update in your voice.

Feed it what you did as a few scrappy notes; it writes the update the way you'd write it -
your structure, your register, no filler. This is the twin's voice doing the work rather
than its judgment, so the output is prose, not JSON.

    python examples/status.py "shipped the guard; lantern slips to thu; fabrikam holding"
    python examples/status.py --to manager "shipped the guard; lantern slips to thu"
    python examples/status.py < notes.txt

--to shifts the register the way voice.md says you write for that recipient.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from twin import TwinError, ask  # noqa: E402

PROMPT = """Using my twin, write a short status update from these rough notes, in my
voice. Follow voice.md - my structure, my register, no preamble. Lead with what matters
most to the reader, not with the first note. Don't invent anything that isn't here.

{audience}Notes:
{notes}

Return the update only - no heading, no "here's your update", just the text I'd send."""


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("notes", nargs="?", help="rough bullets; omit to read from stdin")
    parser.add_argument("--to", default="", help="who it's for, e.g. manager, team, an external partner")
    args = parser.parse_args()

    notes = args.notes if args.notes else sys.stdin.read()
    notes = notes.strip()
    if not notes:
        print("Nothing to write up.", file=sys.stderr)
        return 2

    audience = f"This is for my {args.to}, so match how voice.md says I write to them.\n\n" if args.to else ""
    try:
        print(ask(PROMPT.format(audience=audience, notes=notes)))
    except TwinError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    raise SystemExit(main())
