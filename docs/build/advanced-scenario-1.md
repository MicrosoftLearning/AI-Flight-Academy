---
title: The Digital Twin — Code
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🧬 The Digital Twin

**You'll build this in code — VS Code, GitHub Copilot, and the Copilot CLI.**

You get the contract and the plumbing. You write the agents.

## What you're solving

Copilot already personalizes. It has memory, and Work IQ reads your mail, calendar, and files.

What it doesn't have is anything you've explicitly decided — how you rank competing priorities, which promises you protect, what you'd refuse outright. That gets inferred, you can't inspect or correct it, and it doesn't travel between tools.

There's a second problem this track solves: **a decision under conflict isn't one voice.** When an exec ask lands on top of a peer promise, you're weighing ambition against obligation against capacity. A single prompt can role-play one of those at a time. It can't run the argument and tell you what it overruled.

## What your team will have built

One system, not five. Everyone shares a single spec, and each person owns one agent that reasons over it.

| Piece | What it does |
| --- | --- |
| **The spec** | Three plain-text files: how the person decides, how they write, what their calendar shows |
| **The council** | Three agents that argue, one that decides and **publishes what it overruled** |
| **The critic** | Watches a miss, works out which line of the spec caused it, proposes a patch |
| **The server** | Exposes the whole thing as MCP tools, so any agent can call it |
| **The guardrail** | Refuses actions outside the spec's boundaries — enforced at the tool, not suggested in a prompt |

The same spec folder runs in Cowork and the CLI unmodified.

## Before you start

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/digital-twin-starter.zip" download>
    <span class="lab-card-emoji">📦</span>
    <span class="lab-card-title">Starter repo</span>
    <span class="lab-card-desc">Schema, MCP skeleton, council runner, test harness. The contract — not the solution.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/avery-persona-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Avery Washington</span>
    <span class="lab-card-desc">Optional. A made-up marketing manager with a fake inbox and calendar — use them instead of your own data.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

Unzip it wherever you keep projects, then open the folder in VS Code. **No cloning, no repo to fork.**

::: details Prefer one line in a terminal?
**PowerShell** — downloads, unzips, and opens it in VS Code:

```powershell
$u='https://microsoftlearning.github.io/Team-Week-Imagineer-Hack/downloads/digital-twin-starter.zip'
$z="$env:TEMP\dts.zip"; iwr $u -OutFile $z
Expand-Archive $z -DestinationPath "$HOME\digital-twin" -Force
code "$HOME\digital-twin\digital-twin-starter"
```

**macOS / Linux:**

```bash
curl -L -o /tmp/dts.zip https://microsoftlearning.github.io/Team-Week-Imagineer-Hack/downloads/digital-twin-starter.zip
unzip -q /tmp/dts.zip -d ~/digital-twin && code ~/digital-twin/digital-twin-starter
```

Add the persona pack the same way, swapping in `avery-persona-pack.zip`.
:::

**Check this first, before anything else:** open Copilot Chat in VS Code and confirm you can switch to **Agent** mode. It's an org-managed setting and it may be off. If it is, use the Copilot CLI instead — everything here works either way.

::: tip Want every step spelled out?
This page gets you through the build. There are also **[full step-by-step guides](/bricks/)** for each part — open one in a new tab and keep it beside this page.
:::

---

## 1 · Split the work

Five people, five agents, one shared spec. Decide this in the first two minutes.

| Who | Agent | Argues for | Returns |
| --- | --- | --- | --- |
| 1 | **Ambition** | The visible, strategic, reusable work | position · because · cost if ignored |
| 2 | **Obligation** | Promises already made, people waiting | position · because · cost if ignored |
| 3 | **Capacity** | What the calendar says you can actually absorb | position · because · cost if ignored |
| 4 | **Arbiter** | Nothing — it decides, in voice, and publishes the dissent | decision · draft · dissent · confidence · gap |
| 5 | **Critic** | Nothing — it diagnoses misses and patches the spec | root cause · diff · net lines |

**Fewer than five?** Fold the Critic into the Arbiter. **More?** Add someone on tests and someone on the demo.

::: tip The drives should be biased
Ambition shouldn't be balanced. Neither should Obligation or Capacity. Each one argues its corner as hard as it can — the Arbiter is where nuance happens. Balanced sub-agents produce mush.
:::

## 2 · Write the spec

Three files, shared by everyone. Get a rough version fast, then improve it all session.

**soul** — how the person decides. Aim for about a page. The critical part is **tiebreakers, not values**:

| ❌ Value | ✅ Tiebreaker |
| --- | --- |
| I value responsiveness. | When a same-day exec ask collides with a peer promise, cut scope before slipping the peer. |
| I care about quality. | When a claim can't be verified before the deadline, cut that section and hold the date. |

A value tells an agent nothing. A tiebreaker tells it what to do.

**voice** — 5–10 real sent emails, verbatim, plus the rules those samples imply. Do not clean them up; the punctuation and signoff habits are the part a description would lose.

**revealed** — what the calendar actually shows.

::: tip Shorter really is better
Resist adding one more clause. Anthropic [found while building Constitutional AI](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback) that broad principles beat long specific ones. ["Lost in the Middle"](https://arxiv.org/abs/2307.03172) (peer-reviewed, *Transactions of the ACL*) showed models pay least attention to whatever's in the middle of a long prompt. Your spec is a prompt.
:::

## 3 · Ground it in real behavior

This is the half a person can't self-report. Pull it from evidence.

**Your own data** — let Cowork's Work IQ do the retrieval and export the summary. Ask for percentages, not raw entries:

```text
Summarize my last 30 days of calendar: time by category, accept/decline/tentative
ratio, self-organized vs invited ratio, recurring load. Use percentages.
Leave out private meeting titles.
```

**Avery Washington** — the persona pack has a 30-day calendar with everything already in it.

Either way, extract these four:

- time by category
- **response latency by sender** — the honest stakeholder ranking, whatever the org chart says
- accept / decline / tentative ratio
- self-organized vs. invited

::: danger Don't build a Graph integration
Azure AD app registration plus MSAL will take 30–60 minutes and eat your session. Roughly a third of teams that try it never get past it. Let Cowork retrieve, or use the persona pack. Your working style is slow-moving data — a monthly snapshot is plenty.

<a href="/Team-Week-Imagineer-Hack/bricks/advanced-work-iq" target="_blank" rel="noreferrer">📖 Ground on live data with Work IQ — full guide (opens in a new tab) ↗</a>
:::

## 4 · Write the agents

Five files in `.github/agents/`. The starter repo has the required frontmatter and return contract for each — the bodies are yours.

::: warning This one will cost you 20 minutes if you miss it
The Arbiter won't actually delegate unless you tell it to, in those words:

```text
You MUST invoke each agent as a subagent before synthesizing.
```

Without that line it'll just answer directly and you'll wonder why the council never runs.
:::

Two more that bite:

- **Force short returns.** Three verbose sub-agents will blow the Arbiter's context window before it reasons.
- **Run with `--allow-all-tools`** in your own repo, or you'll spend the session clicking approval prompts.

::: details Agent file anatomy
Each agent is a markdown file in `.github/agents/` with frontmatter declaring what it can reach:

```md
---
name: capacity
description: Argues from measured load. Subagent — never replies to the user.
tools: ['read']
---

You are one of three competing drives. You are CAPACITY.

Read `digital-twin/references/revealed.md` FIRST, then `soul.md`.
You argue from measured reality, not stated intent.

You are biased. That is your job. Do not be balanced.

**You are a subagent. Do NOT reply to the user. Return your position to the arbiter.**

Return exactly:
POSITION: <one sentence>
BECAUSE: <two sentences max, citing a measured number>
COST IF IGNORED: <one sentence>
```

The Arbiter is the only one that talks to the user, and it declares its children:

```md
---
name: arbiter
description: Polls the drives, decides in voice, publishes the dissent.
tools: ['read', 'edit', 'agent']
agents: ['ambition', 'obligation', 'capacity']
---
```

**Running it from the CLI:**

```powershell
copilot -p "Run the council on this dilemma: <text>" --allow-all-tools
```

On Windows the command line caps at 8191 characters, so long prompts have to go through a file — `twinlib.py` in the starter repo handles that for you.

<a href="/Team-Week-Imagineer-Hack/bricks/advanced-setup" target="_blank" rel="noreferrer">📖 Set up Scout / GitHub Copilot — full guide (opens in a new tab) ↗</a>

:::

## 5 · Expose it as a server

Build the MCP server so anything can call your twin — Cowork, VS Code, Claude, an agent nobody's written yet.

**Thin tools first.** These just read files, so they're instant and free:

```text
soul_spec()   voice_rules()   revealed_behavior()
check_boundary(action, recipient)   soul_gap()
```

**Thick tools if you have time.** These spend model calls:

```text
twin_decide(situation)   twin_draft(recipient, intent)
propose_soul_patch(what_it_said, what_they_would_do)
```

The split matters: Cowork connectors need answers in **under 30 seconds**, which the thin tools clear easily and `twin_decide` never will.

::: details Building the server
```python
from mcp.server.mcpserver import MCPServer

mcp = MCPServer(name="digital-twin", version="1.0.0")

@mcp.tool(description="How this person decides. Call before drafting or prioritizing anything.")
def soul_spec() -> str:
    return (REFS / "soul.md").read_text(encoding="utf-8")

if __name__ == "__main__":
    mcp.run(transport="stdio")            # VS Code, Claude Desktop
    # mcp.run(transport="streamable-http", host="127.0.0.1", port=8848)
```

**The `description` is not documentation** — it's how a calling agent decides whether to use your tool. Write it as an instruction: *"Call this before drafting anything on their behalf."*

**Wire it into VS Code** with `.vscode/mcp.json` (already in the starter):

```json
{ "servers": { "digital-twin": {
  "type": "stdio", "command": "python",
  "args": ["${workspaceFolder}/mcp_server.py"] } } }
```

Then `Ctrl+Shift+P` → **MCP: List Servers** → start it. Switch Copilot Chat to **Agent** mode and your tools appear under the 🔧 icon.

**Two transports, two audiences.** `stdio` for local editors. `streamable-http` is the shape a Cowork connector needs — JSON-RPC 2.0 over HTTPS. Production would also need TLS and OAuth; local is fine today.

<a href="/Team-Week-Imagineer-Hack/bricks/advanced-mcp-connector" target="_blank" rel="noreferrer">📖 Build a custom connector (MCP) — full guide (opens in a new tab) ↗</a>

:::

## 6 · Add the guardrail

One check that runs before anything leaves the system:

```text
ALLOW | ASK_FIRST | NEVER
rule:   <the rule that governs this>
source: <which file and section>
```

Run it before any send, share, commit, decline, or external message.

**Enforce it at the tool, not in a prompt.** That's the difference between a suggestion and a boundary — yours has to hold even when the caller is an agent you didn't write.

::: details What a guardrail looks like
```python
@mcp.tool(description="Check whether an action is allowed before taking it. "
                      "Call before any send, commit, decline, or external message.")
def check_boundary(action: str, recipient: str = "") -> str:
    a = f"{action} {recipient}".lower()

    if any(k in a for k in ("why", "reason", "travel", "calendar", "ooo")):
        return ("NEVER\nrule: never disclose calendar reasons or travel. "
                "A decline says WHEN I'm free, never WHY I'm not.\n"
                "source: soul.md > Boundaries")

    if any(k in a for k in ("external", "customer", "commit", "deadline")):
        return ("ASK_FIRST\nrule: anything external, or any date commitment.\n"
                "source: soul.md > Boundaries")

    return "ALLOW\nrule: no boundary governs this\nsource: soul.md > Boundaries"
```

Note it returns **the rule and where it came from**, not just a verdict — so a calling agent can explain itself, and a human can audit it.

**Try this in your demo:** have another agent ask your twin to explain why the person is out next week. Watching it return `NEVER` — with a citation — is the moment the room understands the difference between a boundary and a polite request.

<a href="/Team-Week-Imagineer-Hack/bricks/advanced-guardrail" target="_blank" rel="noreferrer">📖 Add a guardrail / output check — full guide (opens in a new tab) ↗</a>

:::

## 7 · ⚡ The twist

Your facilitator will hand this out partway through. Run it through the full council:

```text
A senior executive wants a new customer narrative by 3 PM today.
You already promised a peer their launch review notes by 4 PM.
Decide what to do, what to say to each of them, and what gets cut.
```

You are checking for three positions, one decision, and an explicit statement of what got overruled and why.

## 8 · Let the critic patch it

Find one thing the twin got wrong. Have the Critic diagnose **which line of the spec caused it** — not "the answer was bad."

```text
HARD CAP: net growth of +2 lines.
Human approves before anything is written.
```

Without the cap, the critic fixes every miss by adding lines, and the spec degrades as it grows.

::: tip Say the honest limit out loud in your demo
The **file** gets better. The **model** doesn't learn. Every run reloads an improved file. That's real and useful, and it isn't training — claiming otherwise is the fastest way to lose a technical room.
:::

---

## Show it off

60–90 seconds. Hit these:

- [ ] The folder — spec, agents, server
- [ ] **One thing the calendar revealed that self-report would never have caught**
- [ ] The council: who owns what, and the short return shape
- [ ] The twist, run live
- [ ] Arbiter output — **especially the dissent**
- [ ] The guardrail returning `NEVER` on something
- [ ] One critic patch, +2 lines or fewer
- [ ] The same spec folder running somewhere else — CLI, VS Code, or Cowork

::: tip Lead with the dissent
Show what the twin decided against and why. That is the part a single prompt cannot produce, and it is visible in one screen.
:::

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Agent mode is missing in VS Code | Org-managed setting. Use the Copilot CLI instead |
| The Arbiter answers without consulting anyone | Add "You MUST invoke each agent as a subagent before synthesizing" |
| Output truncates, context blows up | Sub-agents are too verbose — force short structured returns |
| Endless approval prompts | `--allow-all-tools`, in your own repo only |
| Long prompts fail on Windows | Command line caps at 8191 chars — pass via a file. `twinlib.py` does this |
| Custom agents aren't picked up | They must be in `.github/agents/` with the right frontmatter |
| Every drive agrees with every other | They're too balanced. Make each one biased |

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)
