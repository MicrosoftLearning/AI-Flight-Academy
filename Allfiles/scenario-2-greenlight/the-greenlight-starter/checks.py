"""
Deterministic checks - the countable half of the council.

A language model catches what's contextual. Code catches what's countable. These
functions are the countable part: reading time, forbidden prerequisites, table width.

THE RULE: a check pulls its threshold from a seat's CARD, not from a hardcoded value.
So every function takes its threshold as an argument, and the seat JSON
(council/*.json) supplies it. Retail's card says "5-10 minutes, standing", so its
reading budget is 6 - passed in from the seat, never baked in here.

Run the built-in demo across the five articles:
    python checks.py
    python checks.py --piece P4-exec-summary
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
CONTENT = ROOT.parent / "data-pack" / "content"

WORDS_PER_MINUTE = 200  # unhurried reading; a card may justify a different rate


def _word_count(text: str) -> int:
    return len(re.findall(r"\b\w[\w'-]*\b", text))


def check_reading_time(text: str, minutes_budget: float, wpm: int = WORDS_PER_MINUTE) -> dict:
    """Fail when the piece can't be read inside the seat's time budget.

    `minutes_budget` comes from the card (AC-01 Retail: ~6 min, standing).
    """
    words = _word_count(text)
    minutes = round(words / wpm, 1)
    return {
        "passed": minutes <= minutes_budget,
        "minutes": minutes,
        "budget": minutes_budget,
        "detail": f"{words} words is about {minutes} min (budget {minutes_budget} min)",
    }


# Words that mean "you need access this reader can never get." Pull the real list
# from the card's "hard floor" and "words that stop them reading" rows.
_BLOCKED_DEFAULT = [
    "install", "admin center", "admin rights", "provision", "deploy",
    "tenant", "endpoint", "powershell", "command line", "terminal",
]


def check_requires_install(text: str, blocked: list[str] | None = None) -> dict:
    """Fail when the piece instructs an action the reader has no access to perform.

    `blocked` comes from the card - AC-01's hard floor plus its stop-words.
    """
    blocked = blocked or _BLOCKED_DEFAULT
    low = text.lower()
    hits = sorted({w for w in blocked if w.lower() in low})
    return {
        "passed": not hits,
        "hits": hits,
        "detail": "no blocked prerequisites" if not hits else f"found: {', '.join(hits)}",
    }


def check_table_width(text: str, max_cols: int) -> dict:
    """TODO  ·  Path: Deterministic checks + expansion.

    Fail when a markdown table is wider than max_cols - a phone reader (AC-01)
    can't scroll a 6-column table. Pull max_cols from the seat card's screen
    constraint; do not hardcode it.

    TIPS (a start for you / your Copilot session):
      - A markdown table header row looks like `| a | b | c |`, followed by a
        separator row like `| --- | --- | --- |`. Column count ≈ the number of
        `|`-separated cells (mind the leading/trailing pipes).
      - Scan lines, find rows whose next line is a `---`/`:--` separator, count
        their columns, and fail if any exceeds max_cols.
      - Return the same shape the other checks do:
          {"passed": bool, "widest": <int>, "budget": max_cols, "detail": "..."}
      - Wire it into a seat: add {"fn": "check_table_width", "args": {"max_cols": N}}
        to a criterion's "checks" in that audience's council/*.json.
    """
    raise NotImplementedError(
        "TODO: implement check_table_width(text, max_cols). Count columns per markdown "
        "table header row and fail any wider than max_cols, which comes from the card."
    )


def _demo(piece: str | None) -> None:
    if not CONTENT.exists():
        print(f"[!] {CONTENT} not found. Put the data-pack folder next to this starter "
              f"and rerun. In the hack repo the three folders sit side by side.")
        return
    files = sorted(CONTENT.glob("*.md"))
    if piece:
        files = [f for f in files if piece.lower() in f.stem.lower()]
    if not files:
        print(f"[!] no article matching '{piece}' in {CONTENT}")
        return
    # A budget of 6 min comes from AC-01, not from this file.
    for f in files:
        text = f.read_text(encoding="utf-8")
        rt = check_reading_time(text, minutes_budget=6)
        ri = check_requires_install(text)
        print(f"\n{f.stem}")
        print(f"  reading_time     {'PASS' if rt['passed'] else 'FAIL'}  {rt['detail']}")
        print(f"  requires_install {'PASS' if ri['passed'] else 'FAIL'}  {ri['detail']}")


if __name__ == "__main__":
    arg = None
    if "--piece" in sys.argv:
        i = sys.argv.index("--piece")
        arg = sys.argv[i + 1] if i + 1 < len(sys.argv) else None
    _demo(arg)
