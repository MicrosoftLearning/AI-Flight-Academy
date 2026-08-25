"""
check_content.py — TODO  ·  Path: the intake gate (deterministic check)
=======================================================================

Before the room routes a request, the dashboard shells out to THIS script to
answer one countable question: **is the request even routable?** A request
missing its audience, topic, or desired outcome (a rough IDEA-…) shouldn't be
confidently routed — it should be sharpened first. That's a check, not a vibe,
and it's the honest gate that keeps the room from guessing.

Right now it's a stub. Build the gate, then expand it.

WHAT TO BUILD
  check_request(request_path) must read the request and return a dict shaped
  EXACTLY like this, printed as JSON to stdout (the dashboard reads it):

    {"routable": false,
     "present": ["requester", "audience", "topic"],
     "missing": ["outcome"],
     "detail": "Missing a desired outcome — sharpen it before routing."}

TIPS  (one approach — not the only one)
  1. dispatchlib does the parsing:
        import dispatchlib as d
        fields = d.parse_request(text)                 # {label -> value}
        val    = d.field_value(fields, "outcome")      # None if absent
     A required field counts as MISSING when it's absent OR d.is_placeholder(val).
  2. d.REQUIRED_FIELDS is the list to check: requester, audience, topic, outcome.
  3. routable = no required field is missing.
  4. Best-effort: on any error print {"error": "..."} and exit 1. The dashboard
     treats a failure as "couldn't check" and never blocks the room.

THEN EXPAND (the guardrail half)
  - Add a soft check for a deadline/motion — present-but-not-required, so a
    missing one is a warning, not a blocker.
  - Add a routing-rules guardrail from ../dispatch-data/policy/ROUTING-RULES.md
    that runs on the room's DECISION, not just the request — e.g. "a credential
    deliverable needs stable objectives", or "a partner audience must involve
    Field & Partner". Those are the rules that keep a *decision* honest.

Usage:  python check_content.py <request_file>
"""

from __future__ import annotations

import json
import sys

import dispatchlib as d  # noqa: F401 — parse_request / field_value / is_placeholder do the work


def check_request(request_path: str) -> dict:
    raise NotImplementedError(
        "TODO (intake gate): read request_path, parse it with dispatchlib.parse_request, "
        "then for each name in dispatchlib.REQUIRED_FIELDS decide present vs missing "
        "(missing = field_value is None or dispatchlib.is_placeholder). Return "
        "{'routable': bool, 'present': [...], 'missing': [...], 'detail': '...'}. "
        "See this module's docstring for the exact shape and tips."
    )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "usage: python check_content.py <request_file>"}))
        sys.exit(1)
    try:
        print(json.dumps(check_request(sys.argv[1])))
    except Exception as e:  # noqa: BLE001 — the caller only has stdout; surface the reason there
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
