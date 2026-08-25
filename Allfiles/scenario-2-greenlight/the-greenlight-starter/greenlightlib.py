"""
greenlightlib - plumbing for the greenlight council runner.

Seats are DATA (council/*.json). This module loads them, runs the deterministic
checks wired to each criterion, validates that every score carries evidence, and
rolls per-seat scorecards into a coverage matrix.

The MODEL does the scoring (the dashboard and mcp_server.py drive that). This is
the countable half - the part a language model should not be doing.
"""

from __future__ import annotations

import json
from pathlib import Path

import checks

ROOT = Path(__file__).parent

# Wire a check name used in a seat's criterion to the function that runs it.
CHECK_REGISTRY = {
    "check_reading_time": checks.check_reading_time,
    "check_requires_install": checks.check_requires_install,
    "check_table_width": checks.check_table_width,
}

DEFAULT_RUBRIC = ROOT.parent / "the-greenlight" / "reference" / "solo-rubric.json"


def load_seats(council_dir: Path | str = ROOT / "council") -> list[dict]:
    """Load every seated audience. `*.example.json` is illustrative and is skipped -
    copy it to `*.json` (drop `.example`) to seat it."""
    council_dir = Path(council_dir)
    seats = []
    for path in sorted(council_dir.glob("*.json")):
        if path.name.endswith(".example.json"):
            continue
        seats.append(json.loads(path.read_text(encoding="utf-8")))
    return seats


def load_output_contract(rubric_path: Path | str = DEFAULT_RUBRIC) -> dict:
    """Read the solo critic's output_contract. The control is read-only - never edit it."""
    rubric = json.loads(Path(rubric_path).read_text(encoding="utf-8"))
    return rubric["output_contract"]


def run_checks_for_seat(seat: dict, text: str) -> list[dict]:
    """Run every deterministic check wired to this seat's criteria. Thresholds come
    from the seat card (the JSON), never hardcoded here."""
    results = []
    for crit in seat.get("criteria", []):
        for spec in crit.get("checks", []):
            fn = CHECK_REGISTRY.get(spec["fn"])
            if fn is None:
                results.append({"criterion": crit["id"], "check": spec["fn"],
                                "error": "unknown check"})
                continue
            results.append({"criterion": crit["id"], "check": spec["fn"],
                            **fn(text, **spec.get("args", {}))})
    return results


def validate_scorecard(scorecard: dict) -> list[str]:
    """A score is not allowed without evidence. Returns a list of problems; empty = valid.

    This is the guardrail the runner enforces: no quote / no source / no confidence
    means the run refuses to complete. INSUFFICIENT_CONTEXT may skip evidence but can
    never SHIP.
    """
    problems = []
    who = scorecard.get("audience", "?")
    for crit in scorecard.get("criteria", []):
        cid = crit.get("id", "?")
        if crit.get("score") == "INSUFFICIENT_CONTEXT":
            continue
        if not crit.get("evidence"):
            problems.append(f"{who}/{cid}: score without a quote")
        if not crit.get("source"):
            problems.append(f"{who}/{cid}: score without a source")
        if not crit.get("confidence"):
            problems.append(f"{who}/{cid}: score without a confidence")
    return problems


def coverage_matrix(scorecards: list[dict]) -> dict[str, dict[str, str]]:
    """content_id -> { seat -> verdict }. A piece abandons a seat when that seat's
    verdict is REJECT (tighten to REVISE if your quorum demands it)."""
    matrix: dict[str, dict[str, str]] = {}
    for sc in scorecards:
        piece = sc.get("content_id", "?")
        matrix.setdefault(piece, {})[sc.get("audience", "?")] = sc.get("verdict", "?")
    return matrix


if __name__ == "__main__":
    # Smoke test: load the example seat and run its wired checks against P4.
    seats = load_seats()
    if not seats:
        example = ROOT / "council" / "retail.example.json"
        seats = [json.loads(example.read_text(encoding="utf-8"))] if example.exists() else []
        print("(no seated council yet - using retail.example.json for this smoke test)")
    article = ROOT.parent / "data-pack" / "content" / "P4-exec-summary.md"
    if seats and article.exists():
        text = article.read_text(encoding="utf-8")
        for seat in seats:
            print(f"\nseat: {seat.get('seat_id')}  ({seat.get('audience')})")
            for r in run_checks_for_seat(seat, text):
                print(f"  {r}")
    else:
        print("Seat a council and place ../data-pack next to this starter to smoke test.")
