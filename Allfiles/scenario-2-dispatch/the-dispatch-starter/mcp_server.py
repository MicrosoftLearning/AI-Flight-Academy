"""
The Dispatch — MCP Server
=========================

Exposes the seated room so *other* agents — Cowork, Scout, a VS Code chat agent —
can route a skilling request without going through the dashboard.

Working out of the box (no model call):
    list_room()               — the seated Global Skilling teams from council/*.json
    check_routable(request)   — the intake gate: is the request complete enough to route?
    routing_rules()           — the guardrails a valid routing decision must satisfy

Starter TODO (the model-calling half):
    dispatch(request_path)    — each team takes a position, the room lands one routing decision

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

import dispatchlib as d

ROOT = Path(__file__).parent
COUNCIL_DIR = ROOT / "council"
DATA_PACK = ROOT.parent / "dispatch-data"
POLICY = DATA_PACK / "policy"

mcp = MCPServer(
    name="the-dispatch",
    title="The Dispatch Council",
    version="0.1.0",
    instructions=(
        "Routes a skilling request through a room of Global Skilling teams. Use list_room to see "
        "the teams, check_routable to gate an under-specified request, and dispatch to have the "
        "room take positions and land ONE routing decision (owner, audience, a plan of "
        "deliverables with cross-team reuse, disposition, next action)."
    ),
)


# --------------------------------------------------------------- helpers

def _load_teams() -> list[dict]:
    teams = []
    for p in sorted(COUNCIL_DIR.glob("*.json")):
        if p.name.endswith(".example.json"):
            continue
        teams.append(json.loads(p.read_text(encoding="utf-8")))
    return teams


def _resolve_request(request: str, request_path: str) -> str:
    """Accept raw text, or a path resolved against the starter then dispatch-data/requests."""
    if request.strip():
        return request
    if request_path.strip():
        p = Path(request_path)
        if not p.is_absolute():
            for base in (ROOT, DATA_PACK / "requests"):
                cand = base / request_path
                if cand.exists():
                    p = cand
                    break
        return p.read_text(encoding="utf-8")
    raise ValueError("Provide either request (raw text) or request_path (a file).")


# ----------------------------------------------------------- working tools

@mcp.tool(
    description=(
        "List the seated Global Skilling teams (council/*.json): what each owns, who it serves, "
        "and its format bias. No model call."
    )
)
def list_room() -> str:
    teams = _load_teams()
    if not teams:
        return ("No teams seated. Add council/*.json (copy team.example.json) — at least three "
                "teams that want different things, or the room can't disagree.")
    lines = [f"{len(teams)} seated team(s):", ""]
    for t in teams:
        lines.append(f"## {t.get('team', '?')}  (card {t.get('card', '?')})")
        lines.append(f"Owns: {t.get('owns', '')}")
        lines.append(f"Serves: {t.get('serves', '')}")
        lines.append(f"Format bias: {t.get('format_bias', '')}")
        lines.append("")
    return "\n".join(lines).rstrip()


@mcp.tool(
    description=(
        "The intake gate: is a request complete enough to route? Checks the required fields "
        "(requester, audience, topic, outcome). Pass request (raw text) OR request_path (a file "
        "path; relative paths resolve against the starter or dispatch-data/requests). No model call."
    )
)
def check_routable(request: str = "", request_path: str = "") -> str:
    text = _resolve_request(request, request_path)
    fields = d.parse_request(text)
    present, missing = [], []
    for name in d.REQUIRED_FIELDS:
        val = d.field_value(fields, name)
        (missing if (val is None or d.is_placeholder(val)) else present).append(name)
    lines = [
        "ROUTABLE" if not missing else "NOT routable — sharpen first",
        f"present: {', '.join(present) or 'none'}",
        f"missing: {', '.join(missing) or 'none'}",
    ]
    if missing:
        lines.append("A rough idea like this should be sharpened (pin the missing fields) — "
                     "disposition defer or decline-and-redirect, never a confident route.")
    return "\n".join(lines)


@mcp.tool(
    description=(
        "The routing rules a valid decision must satisfy — the guardrails (one primary owner, "
        "audience coverage, explicit build-once/reuse, certify-only-stable, a real next action). "
        "Read-only. No model call."
    )
)
def routing_rules() -> str:
    try:
        return (POLICY / "ROUTING-RULES.md").read_text(encoding="utf-8")
    except Exception as e:  # noqa: BLE001 — surface any read problem to the caller
        return f"Could not read routing rules (expected at {POLICY / 'ROUTING-RULES.md'}): {e}"


# -------------------------------------------------------------- TODO tool

@mcp.tool(
    description=(
        "TODO: run the room on a request. Each team takes a position, then the room lands ONE "
        "routing decision (owner, audience, plan of deliverables + reuse, disposition, next_action)."
    )
)
def dispatch(request_path: str) -> str:
    raise NotImplementedError(
        "TODO (MCP path): implement dispatch(request_path).\n"
        "  Start: check_routable(request_path=...) for the gate, list_room() for the teams,\n"
        "  routing_rules() for the guardrails.\n"
        "  The model half is yours — either shell out to the GitHub Copilot CLI (see\n"
        "  dashboard/server.js buildPrompt + execCopilotJson: `copilot -p <prompt>\n"
        "  --allow-all-tools` returning JSON), or compose the prompt and let the calling\n"
        "  agent reason. Have each team take a position (interest, deliverable, reuse, effort,\n"
        "  ownership, disposition_lean, rationale), then synthesize ONE decision: owner,\n"
        "  audience, plan (deliverables with builder + reused_by + audience), disposition,\n"
        "  next_action. A not-routable request must defer or redirect, never route."
    )


if __name__ == "__main__":
    if "--http" in sys.argv:
        mcp.run(transport="streamable-http", host="127.0.0.1", port=8849)
    else:
        mcp.run(transport="stdio")
