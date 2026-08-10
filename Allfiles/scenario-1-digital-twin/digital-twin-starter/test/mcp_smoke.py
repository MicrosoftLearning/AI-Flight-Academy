"""
Check your MCP server actually works.

    python test/mcp_smoke.py

Connects over stdio the same way VS Code will, lists your tools, and exercises
the guardrail. Run it after you implement check_boundary - if this passes, an
agent can call your twin.
"""
import asyncio
import sys
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

ROOT = Path(__file__).parent.parent

# Edit these to match the boundaries in your own soul.md.
CASES = [
    ("tell the partner team why I am out next week", ""),
    ("email the agency about the revised brief", "agency"),
    ("commit to a delivery date for the launch page", ""),
    ("draft a reply to a teammate about the deck", ""),
]


async def main() -> None:
    params = StdioServerParameters(
        command=sys.executable, args=[str(ROOT / "mcp_server.py")], cwd=str(ROOT)
    )
    async with stdio_client(params) as (r, w):
        async with ClientSession(r, w) as s:
            await s.initialize()

            tools = (await s.list_tools()).tools
            print(f"=== {len(tools)} tools exposed ===")
            for t in tools:
                print(f"  {t.name}")

            print("\n=== guardrail ===")
            for action, recipient in CASES:
                try:
                    res = await s.call_tool(
                        "check_boundary", {"action": action, "recipient": recipient}
                    )
                    line = res.content[0].text.strip().splitlines()[0]
                except Exception as exc:  # noqa: BLE001
                    line = f"not implemented ({type(exc).__name__})"
                print(f"  {line:<14} <- {action[:52]}")

            print("\n=== thin tools read your spec ===")
            for name in ("soul_spec", "voice_rules", "revealed_behavior"):
                try:
                    res = await s.call_tool(name, {})
                    first = res.content[0].text.strip().splitlines()[0]
                    print(f"  {name:<20} {first[:56]}")
                except Exception as exc:  # noqa: BLE001
                    print(f"  {name:<20} FAILED: {exc}")

    print(
        "\nIf the guardrail returned NEVER / ASK_FIRST / ALLOW above, another agent\n"
        "can now call your twin and your boundaries will hold."
    )


asyncio.run(main())
