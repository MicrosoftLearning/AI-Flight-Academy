---
title: Set up Scout / GitHub Copilot
---

<!-- markdownlint-disable MD013 MD025 -->

# Set up Scout / GitHub Copilot

**Tool:** VS Code + GitHub Copilot agent mode or GitHub Copilot CLI
**Source status:** Code altitude setup

<!-- #region guide -->
This block gives you a local agent workbench. You will use it to run portable Agent Skills, custom subagents, and MCP tools from the same project folder.

::: tip Portability is the point
Agent Skills are plain files. The same folder can run in Cowork, VS Code Copilot, and the GitHub Copilot CLI without rewriting the core instructions.
:::

## Steps

1. Install the GitHub Copilot CLI if you want a terminal runner.

   ```powershell
   npm install -g @github/copilot
   copilot --version
   ```

2. Open your project in VS Code.

   ```powershell
   code .
   ```

3. Confirm GitHub Copilot Chat is signed in, then switch the chat mode to **Agent**.

   ::: warning Org-managed setting
   The VS Code setting `chat.agent.enabled` may be managed by your organization. If agent mode is off and locked, use the Copilot CLI path instead.
   :::

4. Add custom subagents under `.github/agents/`. The folder name matters. Agent files outside `.github/agents/` will not be discovered.

   ```text
   .github/
     agents/
       researcher.agent.md
       planner.agent.md
       critic.agent.md
   ```

5. Give each agent frontmatter. Keep its return shape short so it does not flood the orchestrator.

   ```md
   ---
   name: capacity
   description: Argues from measured capacity and returns a short position.
   tools: ['read']
   ---

   You are the capacity subagent.

   Return exactly:
   POSITION: <one sentence>
   BECAUSE: <two sentences max>
   RISK: <one sentence>
   ```

6. If one agent must call the others, say so directly in the orchestrator agent.

   ```md
   ---
   name: arbiter
   description: Invokes the council before making a decision.
   tools: ['read', 'agent']
   agents: ['ambition', 'obligation', 'capacity']
   ---

   You MUST invoke each listed subagent before synthesizing.
   Do not simulate their answers yourself.
   ```

7. Run a task from the CLI when you want repeatable, scriptable execution.

   ```powershell
   copilot -p "Read the local spec and produce the decision memo." --allow-all-tools
   ```

   ::: warning Approval prompts eat the hack
   For a local hack build, `--allow-all-tools` keeps you out of repeated approval prompts. Use it only in a folder you trust.
   :::

8. For long prompts on Windows, put the prompt in a file and ask Copilot to read it. `cmd.exe` caps the command line at 8191 characters.

   ```python
   from pathlib import Path
   import subprocess
   import uuid

   ROOT = Path(__file__).parent
   SCRATCH = ROOT / ".agent-scratch"

   def run_copilot(prompt: str) -> str:
       SCRATCH.mkdir(exist_ok=True)
       prompt_file = SCRATCH / f"prompt-{uuid.uuid4().hex[:8]}.md"
       prompt_file.write_text(prompt, encoding="utf-8")
       rel = prompt_file.relative_to(ROOT).as_posix()

       instruction = (
           f"Read `{rel}` in this repository. It contains the task. "
           "Execute it and print only the final answer."
       )
       try:
           result = subprocess.run(
               ["copilot", "-p", instruction, "--allow-all-tools"],
               cwd=str(ROOT), capture_output=True, text=True, timeout=300,
               shell=True, encoding="utf-8", errors="replace",
           )
           return result.stdout.strip()
       finally:
           prompt_file.unlink(missing_ok=True)
   ```

9. Wire MCP tools into VS Code with `.vscode/mcp.json`.

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

10. Restart the agent session after adding agents or MCP config. Discovery happens at session start.

**You'll know it worked when...** VS Code can see your `.github/agents/*.agent.md` files, the CLI can run `copilot -p "say hello" --allow-all-tools`, and your MCP server appears in the agent tool list.

## Apply it to your scenario

Use this setup when your scenario needs more than one perspective. Put the shared facts in files. Put each viewpoint in `.github/agents/`. Make the orchestrator explicitly delegate, then synthesize.
<!-- #endregion guide -->
