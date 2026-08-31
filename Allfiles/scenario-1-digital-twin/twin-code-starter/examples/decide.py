"""Make a call the way you would, from any program.

Give it any situation - code or not - and it returns your position and the rule behind
it. Plain text by default; JSON with --json so a program can act on the verdict.

    python examples/decide.py "a teammate wants to ship Friday but the migration isn't reversible yet"
    python examples/decide.py --json "should I take the on-call swap this weekend?"
    python examples/decide.py --remember "decline the extra project until Lantern lands"

This is the most general thing the twin does: your judgment, callable. `review_diff` is
this pointed at a diff; `triage` is this run over a list. Same idea, different input.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from twin import TwinError, ask_json, remember  # noqa: E402

PROMPT = """Using my twin, take a position on this the way I would.

Situation:
{situation}

Return a single JSON object with these keys, and nothing else:

  position    - what I'd do, one line, in my voice
  rule        - the line from persona.md or standards.md that drove it, quoted
  confidence  - "firm" if a rule covers it cleanly, "lean" if it's a judgment call,
                "gap" if nothing in my files really covers it

If it's a "gap", say so in position rather than inventing a preference. Reply with the
JSON object only - no prose around it, no code fence."""


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("situation", help="the situation to weigh, in plain words")
    parser.add_argument("--json", action="store_true", help="print the raw JSON object")
    parser.add_argument(
        "--remember",
        action="store_true",
        help="log the call to the twin's memory so the next run can see it",
    )
    args = parser.parse_args()

    try:
        call = ask_json(PROMPT.format(situation=args.situation))
    except TwinError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2

    if args.json:
        import json

        print(json.dumps(call, indent=2))
    else:
        confidence = str(call.get("confidence", "")).lower()
        mark = {"firm": "FIRM", "lean": "LEAN", "gap": "GAP"}.get(confidence, confidence.upper())
        print(f"{mark}  {call.get('position', '')}")
        if call.get("rule"):
            print(f"  rule: {call['rule']}")

    if args.remember:
        remember(f"{call.get('position', '').strip()} {call.get('rule', '')}".strip())
        print("  (noted to memory.md)")

    return 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    raise SystemExit(main())
