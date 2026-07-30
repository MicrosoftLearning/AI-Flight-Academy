---
title: 🟣 Advanced · Code-Extended — Scenario 1
---

<!-- markdownlint-disable MD013 MD025 -->

# 🟣 Advanced · Code-Extended

## Scenario 1 — Digital Twin Council

**Building with:** VS Code, GitHub Copilot, Copilot CLI, MCP, and Work IQ

::: tip Get the files
Twin Forge, the Marcus Webb persona pack, and the starter repo are all on the [Downloads page](/resources/downloads).
:::

You will build one team system: a portable digital twin with a council of agents that argue over a real tradeoff and an arbiter that makes the call.

## 1 · Your mission

Build a digital twin: a one-page spec of how a person works, plus agents that run on it. The same folder should run in Cowork, VS Code Copilot, and the GitHub Copilot CLI without changing the core files.

Your shared twin has three files:

1. `soul.md` — how the person decides: priority stack, decision rules, stakeholders, boundaries, capacity, and blind spots.
2. `voice.md` — how the person writes: 5-10 sent-email samples or synthetic samples, quoted verbatim, plus inferred style rules.
3. `revealed.md` — what the calendar says versus what the person says.

::: tip Advanced team model
Do not build five separate twins. Build one shared system. Each teammate owns one agent in the council, and all five agents share the same `soul.md`.
:::

## 2 · What you'll demonstrate

You will demonstrate the Advanced spine from the [🟣 Advanced · Code-Extended level page](/levels/advanced/):

- A custom connector / tool: an MCP server that exposes the twin as callable tools.
- Grounding on live data: Work IQ evidence distilled into `revealed.md`.
- One guardrail: `check_boundary` returns `ALLOW`, `ASK_FIRST`, or `NEVER` before action leaves the system.

You should also show the portability spine: the same Agent Skills folder works across Cowork, VS Code Copilot, and the GitHub Copilot CLI.

## 3 · Assembly map — snap these blocks together

Start from the starter repo at `/Allfiles/digital-twin-starter/`. Copy it into your own working folder before editing.

### Step 0 — Divide the council

| Owner | Agent | Job | Return shape |
| --- | --- | --- | --- |
| Teammate 1 | `ambition.agent.md` | Argues for visible, strategic, reusable work. | Position, because, cost if ignored. |
| Teammate 2 | `obligation.agent.md` | Argues for promises already made and people waiting. | Position, because, cost if ignored. |
| Teammate 3 | `capacity.agent.md` | Argues from measured load and calendar reality. | Position, because, cost if ignored. |
| Teammate 4 | `arbiter.agent.md` | Invokes the three drives, applies `soul.md`, decides in voice, publishes dissent. | Decision, draft, dissent, confidence, gap. |
| Teammate 5 | `critic.agent.md` | Diagnoses misses and proposes tiny spec patches for approval. | Root cause, diff, net lines. |

If you have fewer than five people, combine Critic with Arbiter. If you have more, add a test owner and a demo owner.

### Step 1 — Set up the agent workbench

Use [Set up Scout / GitHub Copilot](/bricks/advanced-setup).

You need:

```text
.github/agents/
  ambition.agent.md
  obligation.agent.md
  capacity.agent.md
  arbiter.agent.md
  critic.agent.md
.vscode/mcp.json
digital-twin/
  SKILL.md
  references/
    soul.md
    voice.md
    revealed.md
```

::: warning What will eat your clock
The orchestrator will not reliably delegate unless its instructions say: `You MUST invoke each agent as a subagent before synthesizing.` Put that sentence in `arbiter.agent.md`.
:::

### Step 2 — Build the portable spec

Create or refine:

1. `soul.md` — keep it close to one page. Write tiebreakers, not values.
2. `voice.md` — include samples, then style rules inferred from the samples.
3. `revealed.md` — include measured behavior from Work IQ or the persona pack.

Bad rule:

```text
I value responsiveness.
```

Good rule:

```text
When a same-day executive ask collides with a peer promise, cut scope before slipping the peer promise.
```

### Step 3 — Ground the twin

Use [Ground on live data with Work IQ](/bricks/advanced-work-iq).

Choose one path:

- **Path A — Own data:** ask Cowork's native Work IQ to summarize your last ~30 days of calendar and recent sent-mail style. Export the distilled result. Do not demo raw private entries.
- **Path B — Marcus Webb pack:** use the synthetic marketing manager data at `/Allfiles/persona-pack/`.

Extract:

- Time allocation by category.
- Response latency by sender as the honest stakeholder ranking.
- Accept / decline / tentative ratios.
- Self-organized vs invited ratio.

### Step 4 — Add the MCP connector

Use [Build a custom connector (MCP)](/bricks/advanced-mcp-connector).

Expose thin tools first:

```text
soul_spec()
voice_rules()
revealed_behavior()
check_boundary(action, recipient)
soul_gap()
```

Add thick tools only if you have time:

```text
twin_decide(situation)
twin_draft(recipient, intent)
propose_soul_patch(what_the_twin_said, what_the_person_would_do)
```

::: warning Keep connector tools thin
Verbose subagents blow the context window. Force short structured returns. Connector-shaped tools should answer in under 30 seconds.
:::

### Step 5 — Add the guardrail

Use [Add a guardrail / output check](/bricks/advanced-guardrail).

`check_boundary` must return:

```text
ALLOW | ASK_FIRST | NEVER
rule: <governing rule>
source: <file and section>
```

Enforce it before send, share, commit, decline, or external communication. This is a tool boundary, not a prompt suggestion.

### Step 6 — Run the council from the CLI

Use the CLI for repeatable tests.

```powershell
copilot -p "Read the arbiter task from this repo and run the council on the dilemma." --allow-all-tools
```

::: warning Approval prompts eat the hack
Use `--allow-all-tools` for the local hack repo or you will sit in approval prompts instead of building. Long prompts on Windows should go through a file, not the command line.
:::

### Step 7 — Mid-build twist, at about 55 minutes

Run this conflict through the council:

```text
A senior executive asks for a new customer narrative by 3 PM today. You already promised a peer that you would finish launch review notes by 4 PM. Use the twin to decide what to do, what to say to each person, and what scope to cut.
```

The point is not to produce the nicest answer. The point is to show the argument: ambition, obligation, capacity, arbiter, dissent, and boundary check.

### Step 8 — Patch one miss

Have the Critic diagnose one failure. It must propose a diff, not rewrite the whole spec.

```text
HARD CAP: net growth is +2 lines or less.
Human approval required before writing.
```

## 4 · The data

Use one of two paths.

### Path A — Your own Microsoft 365 data

Use Cowork's Work IQ to retrieve and summarize. Keep the final artifact safe.

```text
Summarize my last 30 days of calendar by category, organizer type, accept/decline/tentative ratio, self-organized vs invited ratio, and recurring meeting load. Use percentages. Do not include private meeting titles in the final output.
```

```text
Find 5-10 sent emails that show my normal writing style. Quote only samples I approve for this hack artifact. Infer style rules from the samples.
```

### Path B — Marcus Webb persona pack

Use `/Allfiles/persona-pack/`. Marcus Webb is synthetic. This path is safer for demos and faster for teams that do not want to use personal work data.

### Starter repo

Use `/Allfiles/digital-twin-starter/` for the initial folder shape, scripts, agent files, and MCP server skeleton. Do not edit that folder directly. Copy it into your team workspace.

## 5 · Demo checklist

Show these in 60-90 seconds:

- [ ] The folder: `SKILL.md`, `soul.md`, `voice.md`, `revealed.md`, `.github/agents/*.agent.md`, and `mcp_server.py`.
- [ ] Which data path you used: own data or Marcus Webb.
- [ ] One measured finding in `revealed.md` that self-report would have missed.
- [ ] The council division of labor and the short return shape from each subagent.
- [ ] The mid-build twist: executive ask colliding with peer promise.
- [ ] Arbiter output with decision, draft, dissent, confidence, and gap.
- [ ] `check_boundary` returning `ALLOW`, `ASK_FIRST`, or `NEVER` with source.
- [ ] One Critic patch with net growth of +2 lines or less.
- [ ] The same core folder running from either VS Code agent mode or the Copilot CLI.

[← Back to start](/) · [Scenario 1 brief](/scenarios/scenario-1)
