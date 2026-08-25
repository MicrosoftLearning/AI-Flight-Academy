"""
The Greenlight - MCP Server
===========================

Exposes the seated council so *other* agents - Cowork, Scout, a VS Code chat
agent - can hook into the Greenlight review without going through the dashboard.

Two tools work out of the box (no model call):
    list_council()        - the seated audiences from council/*.json
    run_checks(content)   - the deterministic checks (checks.py) per seat: the
                            countable half a language model should not be doing
    solo_baseline()       - the solo critic's recorded verdicts (the control)

Two tools are starter TODOs for you to implement - the model-calling half:
    convene(content_path) - score every seat against its own criteria
    greenlight(review)    - turn the gaps into a plan and re-score it

Run:
    python mcp_server.py         # stdio, for VS Code / Cowork / Scout MCP clients
    python mcp_server.py --http  # streamable-http on 127.0.0.1:8849

Install once:  pip install -r requirements.txt
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from mcp.server.mcpserver import MCPServer

import greenlightlib as g

ROOT = Path(__file__).parent
COUNCIL_DIR = ROOT / "council"
DATA_PACK = ROOT.parent / "data-pack"

mcp = MCPServer(
    name="the-greenlight",
    title="The Greenlight Council",
    version="0.1.0",
    instructions=(
        "Reviews content from several seated audiences at once. Use list_council to see the "
        "audiences, run_checks for the deterministic (countable) checks, and convene to score a "
        "piece from every seat. Every model score must carry a quote, a source, and a confidence "
        "- no quote, no score."
    ),
)


# --------------------------------------------------------------- helpers

def _load_seats() -> list[dict]:
    return g.load_seats(COUNCIL_DIR)


def _resolve_content(content: str, content_path: str) -> str:
    """Accept raw text, or a path resolved against the starter then data-pack/content."""
    if content.strip():
        return content
    if content_path.strip():
        p = Path(content_path)
        if not p.is_absolute():
            for base in (ROOT, DATA_PACK / "content"):
                cand = base / content_path
                if cand.exists():
                    p = cand
                    break
        return p.read_text(encoding="utf-8")
    raise ValueError("Provide either content (raw text) or content_path (a file).")


def _council_summary(seats: list[dict]) -> str:
    if not seats:
        return ("No seats yet. Add council/*.json (copy retail.example.json to retail.json) - "
                "at least two audiences with different outcomes, or the room can't disagree.")
    lines = [f"{len(seats)} seated audience(s):", ""]
    for s in seats:
        lines.append(f"## {s.get('audience', '?')}  (card {s.get('card', '?')}, seat_id {s.get('seat_id', '?')})")
        lines.append(f"Outcome: {s.get('outcome', '')}")
        for c in s.get("criteria", []):
            fatal = " [deal-breaker]" if c.get("fatal") else ""
            checks = ", ".join(ch.get("fn", "?") for ch in c.get("checks", [])) or "none"
            lines.append(f"  - {c.get('id')}{fatal}: {c.get('the_bar', '')}  (checks: {checks})")
        lines.append("")
    return "\n".join(lines).rstrip()


def _run_all_checks(text: str, seats: list[dict]) -> str:
    if not seats:
        return "No seats to check against. Seat the council first (see list_council)."
    out = []
    for s in seats:
        out.append(f"## {s.get('audience', '?')}")
        results = g.run_checks_for_seat(s, text)
        if not results:
            out.append("  (no deterministic checks wired - this audience is judged by the model only)")
        for r in results:
            status = "PASS" if r.get("passed") else "FAIL"
            detail = r.get("detail") or r.get("error") or ""
            out.append(f"  [{status}] {r.get('criterion')} · {r.get('check')} - {detail}")
        out.append("")
    return "\n".join(out).rstrip()


# ----------------------------------------------------------- working tools

@mcp.tool(
    description=(
        "List the seated audiences (from council/*.json): each audience's outcome and the "
        "criteria that protect it, including which deterministic checks are wired. No model call."
    )
)
def list_council() -> str:
    return _council_summary(_load_seats())


@mcp.tool(
    description=(
        "Run the deterministic checks (checks.py) for every seat against a piece of content - the "
        "countable half a language model should not do. Pass content (raw text) OR content_path (a "
        "file path; relative paths resolve against the starter or data-pack/content). No model call."
    )
)
def run_checks(content: str = "", content_path: str = "") -> str:
    text = _resolve_content(content, content_path)
    return _run_all_checks(text, _load_seats())


@mcp.tool(
    description=(
        "The solo critic's recorded baseline verdicts for the five data-pack pieces - the "
        "one-reviewer 'before' the council is measured against. Read-only control; never edit it."
    )
)
def solo_baseline() -> str:
    try:
        rubric = json.loads(Path(g.DEFAULT_RUBRIC).read_text(encoding="utf-8"))
    except Exception as e:  # noqa: BLE001 - surface any read problem to the caller
        return f"Could not read the solo rubric: {e}"
    scored = rubric.get("already_scored", {})
    lines = ["Solo critic (one implied reader) - the number to beat:", ""]
    for p in scored.get("pieces", []):
        lines.append(f"  {p.get('content_id')}: {p.get('solo_verdict')} - {p.get('tell', '')}")
    if scored.get("headline"):
        lines += ["", scored["headline"]]
    return "\n".join(lines)


# -------------------------------------------------------------- TODO tools

@mcp.tool(
    description=(
        "TODO: score a piece from EVERY seat at once. Returns one scorecard per audience "
        "(verdict + per-criterion score, quote, source, confidence)."
    )
)
def convene(content_path: str) -> str:
    raise NotImplementedError(
        "TODO (MCP path): implement convene(content_path).\n"
        "  Start: read the file, get the seats from list_council(), and run\n"
        "  run_checks(content_path=...) for the countable half.\n"
        "  The model half is yours to make - either shell out to the GitHub Copilot\n"
        "  CLI (see dashboard/server.js execCopilotJson: `copilot -p <prompt>\n"
        "  --allow-all-tools` returning JSON), or compose the per-seat scoring prompt\n"
        "  and let the calling agent reason.\n"
        "  Score each seat against ONLY its own criteria (0-3 + quote + source +\n"
        "  confidence; a deal-breaker scored 0 forces Reject). Let a failed\n"
        "  deterministic check override a hopeful model verdict. Return one scorecard per seat."
    )


@mcp.tool(
    description=(
        "TODO: turn a convene review's gaps into a remediation plan and re-score it. Greenlit "
        "only when the seat that rejected the original would accept its replacement."
    )
)
def greenlight(review: str) -> str:
    raise NotImplementedError(
        "TODO (MCP path): implement greenlight(review).\n"
        "  For every seat that did not Ship: write a build order (the failed\n"
        "  criterion + its quote, the honest format call, what to make), draft the\n"
        "  replacement, then re-score that draft against the SAME seat's criteria\n"
        "  (reuse the convene() model path). Greenlit only when the seat that\n"
        "  rejected the original would now accept its replacement. Return the plan\n"
        "  and which audiences are now served."
    )


if __name__ == "__main__":
    if "--http" in sys.argv:
        mcp.run(transport="streamable-http", host="127.0.0.1", port=8849)
    else:
        mcp.run(transport="stdio")
