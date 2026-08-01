"""
check_content.py — TODO  ·  Path: Deterministic checks + expansion
==================================================================

The dashboard shells out to this script to show the *countable* half of the
review — checks.py — next to the model's verdicts, so a code-caught FAIL sits
right beside (or against) whatever the model says. Right now it's a stub: build
the bridge, then expand the checks.

WHAT TO BUILD
  check_file(content_path) must return a dict shaped EXACTLY like this and print
  it as JSON to stdout (the dashboard reads parsed["seats"]):

    {"seats": [
      {"seat_id": "retail", "audience": "🛒 Retail Store Operations Lead",
       "checks": [
         {"criterion": "actionable_standing_up", "check": "check_reading_time",
          "passed": true, "detail": "456 words is about 2.3 min (budget 6 min)"}
       ]}
    ]}

TIPS  (a starting approach for you / your Copilot session — not the only way)
  1. The heavy lifting already exists in greenlightlib:
        seats   = greenlightlib.load_seats()                  # reads council/*.json
        results = greenlightlib.run_checks_for_seat(seat, text)  # runs the wired checks
     Each result already carries: criterion, check, passed, detail. You're mostly
     reshaping those into the JSON above (one entry per seat).
  2. Read the file at content_path (utf-8) into `text` first.
  3. A seat with no wired checks should still appear, with an empty "checks" list
     — the dashboard shows it as "model-only".
  4. Keep it best-effort: on any error print {"error": "..."} and exit 1. The
     dashboard treats a failure as "no checks" and never blocks the model review.

THEN EXPAND (the "+ expansion" half of this path)
  - Implement the check_table_width TODO in checks.py.
  - Add a check for a countable need on one of your audiences (a time budget, a
    blocked action, a screen/column limit). Wire it into that seat's
    council/*.json under the criterion's "checks", and it shows up here for free.

Usage:  python check_content.py <content_file>
"""

from __future__ import annotations

import json
import sys

import greenlightlib as g  # noqa: F401  — load_seats() + run_checks_for_seat() do the work


def check_file(content_path: str) -> dict:
    raise NotImplementedError(
        "TODO (checks path): read content_path, run greenlightlib.run_checks_for_seat "
        "for each seat in greenlightlib.load_seats(), and return "
        "{'seats': [{'seat_id','audience','checks':[{criterion,check,passed,detail}]}]}. "
        "See this module's docstring for the exact shape and tips."
    )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "usage: python check_content.py <content_file>"}))
        sys.exit(1)
    try:
        print(json.dumps(check_file(sys.argv[1])))
    except Exception as e:  # noqa: BLE001 — the caller only has stdout; surface the reason there
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
