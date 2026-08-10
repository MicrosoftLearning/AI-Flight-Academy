---
title: Build a custom connector (MCP)
---

<!-- markdownlint-disable MD013 MD025 -->

# Build a custom connector (MCP)

**Tool:** Python + MCP + VS Code / GitHub Copilot
**Source status:** Code track connector

<!-- #region guide -->
An MCP server turns your local spec into callable tools. Instead of pasting context into every prompt, you expose small functions like `read_policy()`, `check_boundary()`, or `lookup_customer_context()`.

## Steps

1. Create a Python environment and install MCP.

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install "mcp[cli]"
   ```

2. Create `mcp_server.py`.

   ```python
   from pathlib import Path
   from mcp.server.mcpserver import MCPServer

   ROOT = Path(__file__).parent
   SPEC = ROOT / "spec"

   mcp = MCPServer(
       name="local-spec",
       title="Local Spec Tools",
       version="0.1.0",
       instructions="Call these tools before acting on behalf of the user.",
   )

   def read_spec(name: str) -> str:
       path = SPEC / name
       return path.read_text(encoding="utf-8") if path.exists() else f"[missing: {name}]"

   @mcp.tool(description="Return the decision rules. Thin, instant, no model call.")
   def decision_rules() -> str:
       return read_spec("rules.md")

   @mcp.tool(description="Check whether an action is allowed before it leaves the system.")
   def check_boundary(action: str, recipient: str = "") -> str:
       text = f"{action} {recipient}".lower()
       if "external" in text or "customer" in text:
           return "ASK_FIRST\nrule: external communication requires approval\nsource: rules.md"
       if "secret" in text or "personal" in text:
           return "NEVER\nrule: do not disclose sensitive information\nsource: rules.md"
       return "ALLOW\nrule: no boundary matched\nsource: rules.md"

   if __name__ == "__main__":
       mcp.run(transport="stdio")
   ```

3. Add a second transport for connector-shaped HTTP calls.

   ```python
   import sys

   if __name__ == "__main__":
       if "--http" in sys.argv:
           mcp.run(transport="streamable-http", host="127.0.0.1", port=8848)
       else:
           mcp.run(transport="stdio")
   ```

4. Test the local server.

   ```powershell
   python mcp_server.py
   ```

   Use `stdio` for VS Code and other local agent hosts. Use `streamable-http` when you want the same shape a remote connector would expose.

5. Wire it into VS Code with `.vscode/mcp.json`.

   ```json
   {
     "servers": {
       "local-spec": {
         "command": "python",
         "args": ["mcp_server.py"],
         "cwd": "${workspaceFolder}"
       }
     }
   }
   ```

6. Run HTTP mode when you need a connector-shaped endpoint.

   ```powershell
   python mcp_server.py --http
   ```

7. Split tools into thin and thick.

   | Tool type | What it does | Good for |
   | --- | --- | --- |
   | Thin | Reads files, checks rules, returns structured facts. No LLM call. | Connectors, guardrails, fast grounding. |
   | Thick | Calls another model, runs a council, drafts a long answer. | Local demos and deep reasoning. |

   ::: warning Keep connector tools fast
   Cowork-style connectors need sub-30-second responses. Put instant file reads and checks behind the connector. Keep slow model calls local or asynchronous.
   :::

**You'll know it worked when...** your agent can call `decision_rules()` and `check_boundary()` as tools, and HTTP mode starts on a local port without changing the tool code.

## Apply it to your scenario

Expose the smallest stable facts your scenario needs. Good MCP tools are boring and reliable: read the spec, return the current rule, check the boundary, list the known gaps. Let the calling agent do the creative work.
<!-- #endregion guide -->
