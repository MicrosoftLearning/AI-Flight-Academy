"""
dispatchlib — plumbing for the Dispatch routing runner.

Teams are DATA (council/*.json). A request is intake (../dispatch-data/requests/*.md).
This module owns the *countable* half: whether a request is even **routable**
(intake-complete) before the room decides where it goes — the part a language
model should not be guessing.

The MODEL does the routing (the dashboard and mcp_server.py drive that). This
just answers "does the request have enough in it to route?" and defines what
"enough" means.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).parent

# The fields a request needs to be routable. Mirrors
# ../dispatch-data/policy/INTAKE-FIELDS.md — keep the two in sync.
REQUIRED_FIELDS = ["requester", "audience", "topic", "outcome"]

# Field name -> the labels that can introduce it in a request markdown file.
FIELD_ALIASES = {
    "requester": ["requester", "from"],
    "audience": ["stated audience", "audience"],
    "topic": ["topic"],
    "outcome": ["desired outcome", "outcome"],
    "deadline": ["deadline / motion", "deadline/motion", "deadline"],
    "trigger": ["trigger / motion", "trigger"],
}

# Values that look filled in but aren't.
_PLACEHOLDERS = {"", "-", "\u2014", "tbd", "todo", "none", "n/a", "unclear",
                 "undefined", "unknown", "?"}


def is_placeholder(value: str | None) -> bool:
    """True when a field value is empty or a stand-in (—, unclear, undefined, …)."""
    if value is None:
        return True
    v = re.sub(r"[*_`]", "", value).strip().lower()
    v = re.sub(r"\s+", " ", v)
    if v in _PLACEHOLDERS:
        return True
    return v.startswith("\u2014") or "unclear" in v or "undefined" in v or "*unclear*" in v


def parse_request(text: str) -> dict[str, str]:
    """Pull intake fields out of a request markdown file.

    Handles the two shapes the requests use:
      - table rows:  `| **Stated audience** | Customers |`
      - inline tags: `**Requester:** Priya N.`  /  `Requester: Priya N.`
    Returns a { lowercased-label -> value } dict.
    """
    fields: dict[str, str] = {}

    for m in re.finditer(r"^\|\s*\*{0,2}([^|*]+?)\*{0,2}\s*\|\s*(.+?)\s*\|\s*$",
                         text, re.MULTILINE):
        fields.setdefault(m.group(1).strip().lower(), m.group(2).strip())

    for m in re.finditer(r"^\*{0,2}([A-Za-z /]+?)\*{0,2}:\*{0,2}\s+(.+?)\s*$",
                         text, re.MULTILINE):
        key = m.group(1).strip().lower()
        if key in ("requester", "from"):
            fields.setdefault(key, m.group(2).strip())

    return fields


def field_value(fields: dict[str, str], canonical: str) -> str | None:
    """Look up a canonical field (e.g. 'outcome') by any of its aliases."""
    for alias in FIELD_ALIASES.get(canonical, [canonical]):
        if alias in fields:
            return fields[alias]
    return None
