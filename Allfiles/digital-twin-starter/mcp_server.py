"""
Digital Twin MCP Server
=======================

Thin tools return local spec files instantly. Thick tools are intentionally left as
starter TODOs for participants to implement with their council agents.

Cowork connectors have a practical 30-second response constraint, so Cowork should
prefer thin tools: soul_spec(), voice_rules(), and revealed_behavior(). Longer
council calls belong in local CLI or developer tools unless you have made them fast.

Run:
    python mcp_server.py         # stdio, for VS Code and local MCP clients
    python mcp_server.py --http  # streamable-http on 127.0.0.1:8848
"""

from __future__ import annotations

import sys
from pathlib import Path

from mcp.server.mcpserver import MCPServer

ROOT = Path(__file__).parent
REFS = ROOT / "digital-twin" / "references"

mcp = MCPServer(
    name="digital-twin",
    title="Digital Twin Starter",
    version="0.1.0",
    instructions=(
        "Digital twin starter. Use thin tools to read the local spec. "
        "Do not invent preferences missing from soul.md."
    ),
)


def _read_reference(stem: str) -> str:
    """Read participant file if present, otherwise the starter template."""
    for name in (f"{stem}.md", f"{stem}.template.md"):
        path = REFS / name
        if path.exists():
            return path.read_text(encoding="utf-8")
    return f"[missing digital-twin/references/{stem}.md or {stem}.template.md]"


# ---------------------------------------------------------------- THIN TOOLS

@mcp.tool(
    description=(
        "Read the twin's decision spec: identity, priority stack, decision rules, "
        "stakeholders, boundaries, capacity, blind spots, and coaching gaps."
    )
)
def soul_spec() -> str:
    return _read_reference("soul")


@mcp.tool(
    description=(
        "Read the twin's writing spec: verbatim sent-message samples and inferred "
        "style rules. Use before drafting in the person's voice."
    )
)
def voice_rules() -> str:
    return _read_reference("voice")


@mcp.tool(
    description=(
        "Read measured behavioral evidence from calendar and response patterns. "
        "Use for capacity, overcommitment, and stated-vs-revealed behavior."
    )
)
def revealed_behavior() -> str:
    return _read_reference("revealed")


# --------------------------------------------------------------- TODO TOOLS

@mcp.tool(
    description=(
        "TODO: Decide whether a proposed action is allowed under soul.md boundaries. "
        "Should return ALLOW, ASK_FIRST, or NEVER with the governing rule."
    )
)
def check_boundary(action: str, recipient: str = "") -> str:
    raise NotImplementedError(
        "TODO: implement check_boundary(action, recipient). Read soul.md > Boundaries, "
        "match the action against always_ask and never, and return ALLOW, ASK_FIRST, "
        "or NEVER with the exact rule. Do not silently allow external sends or commitments."
    )


@mcp.tool(
    description=(
        "TODO: Run the council on a situation and return the arbiter's decision, draft, "
        "dissent, confidence, and gap."
    )
)
def twin_decide(situation: str) -> str:
    raise NotImplementedError(
        "TODO: implement twin_decide(situation). Poll ambition, obligation, and capacity; "
        "then have arbiter apply soul.md and publish DECISION/DRAFT/DISSENT/CONFIDENCE/GAP."
    )


@mcp.tool(
    description=(
        "TODO: Draft a message in the twin's voice for a recipient and intent."
    )
)
def twin_draft(recipient: str, intent: str) -> str:
    raise NotImplementedError(
        "TODO: implement twin_draft(recipient, intent). Read soul.md and voice.md, check "
        "boundaries before external or commitment-bearing drafts, and output only the draft."
    )


@mcp.tool(
    description=(
        "TODO: Propose a minimal soul.md patch after the twin gets something wrong."
    )
)
def propose_soul_patch(
    what_the_twin_said: str,
    what_the_person_would_do: str,
    dilemma: str = "",
) -> str:
    raise NotImplementedError(
        "TODO: implement propose_soul_patch(...). Use the critic agent to identify the "
        "root cause and propose a human-reviewed patch with net growth capped at +2 lines."
    )


if __name__ == "__main__":
    if "--http" in sys.argv:
        mcp.run(transport="streamable-http", host="127.0.0.1", port=8848)
    else:
        mcp.run(transport="stdio")
