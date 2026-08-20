"""Expose your twin as MCP tools, so any agent can call it.

Once this is running, VS Code Copilot (or any MCP client) can ask your twin things
directly instead of you relaying them. `.vscode/mcp.json` points VS Code at it.

    python mcp_server.py              # stdio, for VS Code and other local clients
    python mcp_server.py --http       # streamable HTTP on 127.0.0.1:8848

Two tools are instant: `persona` and `voice` read local files. `decide` runs a full agent
turn through the Copilot CLI and takes about a minute, which is worth knowing before you
wire it into anything impatient.
"""

from __future__ import annotations

import sys
from pathlib import Path

from mcp.server import MCPServer

from twin import TwinError, ask

ROOT = Path(__file__).parent
REFERENCES = ROOT / ".github" / "skills" / "my-twin" / "references"

mcp = MCPServer(
    name="my-twin",
    title="My Twin",
    version="0.1.0",
    instructions=(
        "The user's digital twin. Read persona() before deciding anything on their "
        "behalf, and voice() before drafting anything in their name. Never invent a "
        "preference that is not in those files."
    ),
)


def _reference(name: str) -> str:
    path = REFERENCES / f"{name}.md"
    if not path.exists():
        return f"[{path.relative_to(ROOT).as_posix()} does not exist yet]"
    return path.read_text(encoding="utf-8")


@mcp.tool(
    description=(
        "The user's decision rules: who they are, what they refuse, what wins when two "
        "priorities collide, and what they check before committing. Read this before "
        "making a call on their behalf."
    )
)
def persona() -> str:
    return _reference("persona")


@mcp.tool(
    description=(
        "How the user writes: their style rules and verbatim samples of their own "
        "messages. Read this before drafting anything that goes out in their name."
    )
)
def voice() -> str:
    return _reference("voice")


@mcp.tool(
    description=(
        "Ask the twin to take a position on a situation, applying the user's own rules. "
        "Returns a decision and the rule behind it. Takes about a minute - it runs a "
        "full agent turn. Prefer persona() when you only need the rules themselves."
    )
)
def decide(situation: str) -> str:
    try:
        return ask(f"Using my twin: {situation}")
    except TwinError as exc:
        return f"[twin unavailable: {exc}]"


if __name__ == "__main__":
    if "--http" in sys.argv:
        mcp.run(transport="streamable-http", host="127.0.0.1", port=8848)
    else:
        mcp.run(transport="stdio")
