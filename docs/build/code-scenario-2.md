---
title: Dispatch - Code
---

# Dispatch

<div class="scene">

![An operations engineer in a headset stands at a wide airport ops console of glowing monitors; purple data-lines fan out across the dusk tarmac to a row of airliners parked at their gates.](/img/scenario-2-dispatch-code-hero.png)

<p class="scene-cap">Get behind the board.</p>

</div>

You start with a routing dashboard that already works. You make it your own, and you add a code check that catches unclear requests before the AI routes them. Then you choose a path to take it further.

![Screenshot of the starter project - The Dispatch Dashboard.](./media/the-dispatch-dashboard.png)

## Objectives

Skilling requests arrive all day. Usually, one person (the *triager*) reads each request and sends it to one team. But the same request can mean different work for different teams. For example, a request for agent governance training before a product launch could become a self-paced learning path, a live workshop, and a partner rollout. The best plan is to build it once and let every team reuse it.

The board sends each request to a **room of teams**, and the AI model decides each team's position. But AI models sometimes route a request that isn't ready. So you add code that checks facts it can count, like whether the request names an audience. If a request isn't ready, the board labels it **"sharpen first"**.

You work on your own, in five steps, and Copilot Chat helps you build each one:

| | Step | You're done when |
| --- | --- | --- |
| **1** | **Start the board** | `http://localhost:4173` is running, and the Copilot CLI is signed in. |
| **2** | **Dispatch a request and hear each team's view** | Each team gives its own position on the same request, with a reason from its card. No code yet. |
| **3** | **Seat a team with its own view** | Your own team (a new file in `council/`) gives its own position on the same request, with a reason from its card. |
| **4** | **Wire the intake gate** | The intake gate (`check_content.py`) labels a rough idea "sharpen first" before the room routes it. |
| **5** | **Pick a path** | You finish Path A (a seat editor on the board) or Path B (saving the room's decision to a handoff file). |

If you want to do more, the **MCP bonus** lets your other agents use the room too.

::: details Glossary

- **Triager:** the person who reads a request and decides which team gets it.
- **Route:** to send a request to the team (or teams) that will do the work.
- **Team card:** a short description of a team. It says what the team owns, who it serves, and what kind of work it wants. It's also called a *charter*.
- **Room:** a group of teams that looks at the same request together.
- **Seat:** one team's place in the room. To *seat* a team means to add it to the room. In this project, each seat is a file in the `council/` folder.
- **Dispatch:** to send one request to every team in the room at the same time.
- **Position:** a team's answer to a request, based on its team card.
- **Rough idea:** a request that's missing important details. It needs to be *sharpened* (given more detail) before anyone routes it.

For more definitions, see the [Glossary](/glossary).

:::

## Before you start

Download all three files below, and unzip them into the same folder. Keep `the-dispatch-starter`, `the-dispatch`, and `dispatch-data` **next to each other**. The board expects to find them there.

::: warning Watch for the folder inside the folder
Each zip already contains its own folder, so Windows **Extract All** wraps it in a second one - you end up with `the-dispatch-starter\the-dispatch-starter\`. Drag the inner folder out and delete the wrapper. All three have to sit side by side or the dashboard won't find the data.
:::

<div class="lab-grid lab-grid-3">
	<a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch-starter.zip" download>
		<span class="lab-card-emoji">📦</span>
		<span class="lab-card-title">Starter repo</span>
		<span class="lab-card-desc">The dashboard, a room with teams already seated, the intake gate, and the MCP server. The parts that you build are marked with TODO comments.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
	<a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch.zip" download>
		<span class="lab-card-emoji">🟢</span>
		<span class="lab-card-title">Dispatch skill</span>
		<span class="lab-card-desc">How the room routes a request, plus the single triager's decisions. This is the "before" that you compare against, and it never changes.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
	<a class="lab-card" href="/AI-Flight-Academy/downloads/dispatch-data-pack.zip" download>
		<span class="lab-card-emoji">🗂️</span>
		<span class="lab-card-title">Data pack</span>
		<span class="lab-card-desc">Sample requests, the Global Skilling team cards, and the routing rules. Use these instead of real work data.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
</div>

You need three tools. On Windows, the fastest way to install them is `winget`, in a terminal that you opened with **Run as administrator**:

```powershell
winget install OpenJS.NodeJS.LTS     # Node - runs the board
winget install Python.Python.3.12    # Python 3 - runs the intake gate
winget install GitHub.Copilot        # GitHub Copilot CLI - the board calls it
```

Then reopen your terminal, so that it can find the new tools. Run `copilot` once and sign in.

If you prefer installers, download [Node.js](https://nodejs.org/) and [Python 3](https://www.python.org/downloads/). On macOS or Linux, install the GitHub Copilot CLI with `npm install -g @github/copilot`.

You can build with any GitHub Copilot tool: VS Code, the Copilot CLI, or the GitHub Copilot app. Keep the **Copilot CLI** signed in, because the board uses it in the background.

You need **Node** to start the board. You need **Python 3** only in Step 4, when you wire the intake gate, and for the MCP bonus. Until then, the board runs normally, and the gate shows "not built." When you're ready, open the **the-dispatch-starter** project in VS Code.

---

## The starting point

You have the project. Now it's time to build.

::: tip The board shows you what to build
Look for amber **"not wired"** markers on the intake badge and on **Act on this decision**. Each marker is something that you build. The board uses a specific model (`claude-sonnet-5`). If your account can't use that model, the board uses your CLI's default model instead. To choose a different model, set `DISPATCH_MODEL`.
:::

### 1 · Start the board

Open a terminal, and go to the folder where you unzipped the files.

```powershell
cd the-dispatch-starter/dashboard
npm install
npm start
```

Open `http://localhost:4173`. When the server starts, its first line of output tells you whether it found the Copilot CLI and whether you're signed in. If it didn't, install the CLI, sign in, and start the server again.

**Done when:** the board is running, and the server's first line of output confirms that the Copilot CLI is signed in.

### 2 · Dispatch a request

Drag a request file onto the board, or select **Browse…** and choose it. Use **Agent governance training before launch** (`dispatch-data/requests/request-agent-governance-before-launch.md`). The data pack includes the single triager's decision for each request. For this request, the triager could only say *"send it to Content & Insights."*

::: tip Pasting instead?
Paste the **whole file**, including the headings and the table of fields. Don't paste only the quoted ask. The board reads the fields in the table, so without them, even a complete request looks unfinished.
:::

Your room agrees on the owner, and **each team adds its own part of the plan**:

- Content & Insights builds the governance learning path once.
- Delivery reuses it in live sessions.
- Field & Partner reuses it in their regions.
- Partners are the audience who need it first.

Each position comes from that team's card. You haven't written any code yet, and one owner has already become a plan with reuse.

**Done when:** each team gives its own position on the same request, and each position gives a reason from that team's card.

### 3 · Seat a team with its own view

Remember, a **seat** is one team in the room. It says what the team owns, who it serves, and what makes the team want a request or turn it down. Each seat is a small file in the `council/` folder. Five teams are already included.

Add a seat for a team that *you* work with. The key is the team card. Give your team its own point of view, like a different audience or a different favorite format. Then its position comes from its own card, not from copying the others. (If a team would route every request the same way as another team, for the same reasons, it's a copy.)

You don't have to write the file yourself. Open an AI tool that knows your work, such as **Copilot**, **Cowork**, or **Scout**. Point it at the sample file `council/team.example.json`, and ask:

> Create `my-team.json` for _[your team]_, in the same shape as `team.example.json`: what it owns, who it serves, what makes it say yes or no, and its format bias.

When you review the result, check these three parts:

- **owns / serves:** what makes a request belong to this team.
- **says_yes_when / says_no_when:** what makes the team want a request or turn it down. Each team's reasons come from these fields.
- **format_bias:** the kind of deliverable that the team prefers. This often shows up in the plan.

Save the file in `council/` with a new name. (If you use an existing name, you replace that team.) Then select **Reload room** on the board.

**Done when:** your team gives its own position on the same request, and its reason points to something on its card.

<div class="scene scene--flip">

![The engineer patches purple cables into desks labeled Content, Delivery, Product, Field and MTTs beside an intake-gate switch.](/img/scenario-2-dispatch-code-wiring.png)

<p class="scene-cap">Code the room.</p>

</div>

### 4 · Wire the intake gate

Your teams' positions come from the AI model. The model is good at judgment, but it sometimes routes a request that isn't ready. **The intake gate is the part that code can count.** Does the request name an audience, a topic, and an outcome? A rough idea (a file whose name starts with `rough-idea-`) shouldn't be routed as if it were ready. It should be *sharpened* first. This is a yes-or-no check, not a guess.

You have two small jobs, and you **don't write either one from scratch**. The starter file is half-built and includes notes, and GitHub Copilot Chat can read all of it. Your job is to decide *what makes a request ready to route*. Copilot helps you write the code.

1. **Turn on the gate.** One starter file, `check_content.py`, isn't finished. That's why the board says that the intake gate isn't built. Open the file. The note at the top explains, in plain English, what the gate returns: `{routable, present, missing, detail}`. `dispatchlib.parse_request` already reads the request for you. You decide which required fields are present and which are missing. Point Copilot Chat at the file, and ask it to finish the gate.

1. **Add your own guardrail.** The gate checks the *request*. A guardrail checks the *decision*. Choose a rule from `dispatch-data/policy/ROUTING-RULES.md`, and ask Copilot to add it. For example, choose *"a credential deliverable needs stable objectives,"* or *"a partner audience must involve Field & Partner."*

::: tip What you actually need to do
You do **not** need to be a Python developer. The starter and Copilot Chat write the code. You decide *what makes a request ready to route*, and you check that the gate works. You're done when a `rough-idea-…` file gets the label "sharpen first," and a complete `request-…` file passes. Test with whole files, not only the quoted ask.
:::

**Done when:** you drop a rough-idea file onto the board, and the board labels it **"sharpen first"** before the room routes it.

---

## Pick a path

You now have a room with your own teams and an intake gate that won't route a guess. Now take it further. **When you finish either path, A or B, you're done.**

- **Path A is front-end work:** a screen in the browser, built with JavaScript and a little Node.
- **Path B is back-end work:** Node, and a little work with files.

Both paths have clear instructions, and Copilot Chat helps you build either one. Choose the path that matches how you like to build. If you finish and want to keep going, try the bonus.

<PathChooser
  a-emoji="🪑"
  a-title="Path A · Edit the room from the board"
  a-desc="Build a seat editor in the browser, so you can add, edit, and remove teams while the board runs. No more editing JSON by hand. Front-end (JavaScript and a little Node)."
  b-emoji="📤"
  b-title="Path B · Act on the decision"
  b-desc="Make the board's Act button hand the decision off: save it to a file on your computer, ready for the owner. The room suggests, and a person approves. Back-end (Node)."
>

<template #pathA>

### Path A - edit the room from the board

Right now, to add a team, you edit a `council/*.json` file by hand. In this path, you build a small **seat editor** into the board. Then anyone can add, edit, and remove teams while the board runs.

There are two parts. The **endpoint** is the small part. It cleans the team ID, so the file can't be saved outside the `council/` folder. Then it saves (or deletes) the team's file:

```js
// dashboard/server.js - POST /api/council/seat (you add this)
const id = String(req.body.team_id).replace(/[^a-z0-9-_]/gi, "");   // stay inside the folder
fs.writeFileSync(path.join(COUNCIL_DIR, `${id}.json`), JSON.stringify(req.body, null, 2));
```

The **editor screen** is the bigger part. It's a form with the fields from a team card (owns, serves, says yes/says no, and format bias). The form sends its data to the endpoint. Point Copilot Chat at `dashboard/public/`, ask it to build the dialog, and then reload the board.

**Done when:** you add a new team from the browser, and it gives a position on the next request.

</template>

<template #pathB>

### Path B - act on the decision

A routing decision should go somewhere real. In this path, you make the board's **📤 Act on this decision** button work. Right now, the button returns a `501` error. That's on purpose: 501 means "not implemented," and this is the part you build. When you finish, the button saves the room's decision to a handoff file, ready for the owner. The room suggests, and a person approves. Selecting the button *is* the approval, so never let the board act on its own.

The job already stores the decision. Collect it and save it:

```js
// dashboard/server.js - POST /api/dispatch/:id/act (stubbed, returns 501)
const decision = job.result.decision;   // owner, audience, plan[], disposition, next_action
// ...save the decision to a file in dashboard/outbox/, then return { message } with the file path...
```

Dispatch a request, then select **📤 Act on this decision** now. The board shows a hint about what to build. Then ask Copilot Chat to build it.

**Done when:** you select **📤 Act on this decision**, the board shows where it saved the file, and the file has the owner, audience, plan, disposition, and next action.

::: tip Want to go further?
Send the decision to a real tracker or channel as well. `DISPATCH_ACT_TARGET` is a placeholder for that destination. Send something only when a real destination is set up, and keep the local file either way.
:::

</template>

</PathChooser>

---

## Bonus - let other agents use the room (MCP)

The board is one way to use the room. An **MCP server** makes the room available to your *other* agents, like the chat agent in VS Code. Then those agents can dispatch requests too. (MCP stands for Model Context Protocol. It's a standard way to share tools with AI agents.)

The starter includes `mcp_server.py`. The simple tools (`list_room`, `check_routable`, and `routing_rules`) already work. The `dispatch` tool is marked as a TODO.

**1 · Set up Python for the server.** The server needs one package, called `mcp`. Install it in a private environment inside `the-dispatch-starter`, so nothing else on your computer changes. In a terminal in `the-dispatch-starter` (the folder with `mcp_server.py` and `requirements.txt`), run:

```powershell
py -3.12 -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
```

On macOS or Linux, run `python3 -m venv .venv`, and then `.venv/bin/python -m pip install -r requirements.txt`. To undo it all, delete the `.venv` folder.

**2 · Connect it to VS Code.** Don't start the server yourself. In a terminal, it just waits silently for an agent to connect. Instead, tell VS Code how to start it. Open `the-dispatch-starter` as your VS Code folder, and create `.vscode/mcp.json`:

```json
{
  "servers": {
    "the-dispatch": {
      "type": "stdio",
      "command": "${workspaceFolder}/.venv/Scripts/python.exe",
      "args": ["${workspaceFolder}/mcp_server.py"]
    }
  }
}
```

On macOS or Linux, use `${workspaceFolder}/.venv/bin/python` for `command`. Select **Start** above the server name in the file, or run **MCP: List Servers** from the Command Palette. The server shows as **Running**, with 4 tools.

**3 · Test it from chat.** Open Copilot Chat in **Agent** mode, and check that the `the-dispatch` tools are turned on in the tools picker. You don't need a dispatch for this test. Ask:

> Use list_room to show me the teams in the room.

You get 5 teams. Then ask:

> Use check_routable on request-agent-governance-before-launch.md, and then on rough-idea-seller-copilot-value.md.

The first request is **ROUTABLE**. The second is **NOT routable**, because it has no outcome.

**4 · Build `dispatch(request_path)`.** Each team gives a position, and then the room makes one decision. The hints point you to the same Copilot CLI approach that the board uses in `dashboard/server.js`.

**Done when:** you ask Copilot Chat to dispatch **Agent governance training before launch**, and the chat shows each team's position and one routing decision.

::: tip Using Scout?
Scout can start the same server: add it as a **Command** MCP server, and use full paths to the `.venv` Python and to `mcp_server.py`. A dispatch takes about 90 seconds, so raise the tool timeout in Scout's settings.
:::

<div class="scene">

![The engineer leans back in command as the purple room runs and a routable / sharpen intake gate works.](/img/scenario-2-dispatch-code-running.png)

<p class="scene-cap">Intake to decision - yours.</p>

</div>

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| The board won't start | Check that Node is installed. Run `npm install` in `dashboard/` first. |
| The server says the CLI is missing | Install the GitHub Copilot CLI (on Windows: `winget install GitHub.Copilot`), sign in, and restart the server. |
| The board can't find the room | Keep `the-dispatch-starter`, `the-dispatch`, and `dispatch-data` next to each other in the same folder. |
| Every team gives the same position | Check each team's reason. If each reason comes from that team's card, agreement is a fine answer. If the reasons are vague or all the same, make the team cards more specific. |
| The intake badge says "not built" | This is expected until you finish `check_content.py`. After that, the board shows whether each request is ready to route. |
| Copilot asks you to approve too many actions | Use `--allow-all-tools`, but only in your own practice repo. |
| A complete request says "sharpen first" | Drop or browse to the whole file. If you paste, paste all of it, including the table of fields. |
| A dispatch says there was a problem with the AI's reply | Dispatch the request again. If it keeps happening, send the file that the message names (in `dashboard/runs/`) to a coach. |
| `python mcp_server.py` seems stuck | It's waiting for an agent to connect. Close it, and let VS Code start it from `.vscode/mcp.json` (bonus step 2). |

::: details 🎬 Nobody gets it right the first time
<div class="scene scene--flip">

![Sparks fly, screens flash red errors, a dispatch desk glitches, and she winces holding a sparking cable.](/img/scenario-2-dispatch-code-blooper.png)

<p class="scene-cap">It compiles. Mostly.</p>

</div>

The first attempt rarely works. An error isn't the end. Read the error message, fix a team file, and run it again. Shipping just means that the last retry worked.
:::

---

[← Back to start](/)
