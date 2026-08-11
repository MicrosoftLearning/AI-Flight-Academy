---
title: Scenario 1 · The Digital Twin
---

# Scenario 1 — The Digital Twin

::: warning 🚧 Work in progress
This scenario is drafted and being tested. Details may change before the event.
:::

## The problem

Copilot personalizes already — memory, plus Work IQ across mail, calendar, and files. That gets a draft most of the way.

What it doesn't have is what you've explicitly decided: how you rank priorities that conflict, which commitments you protect, what you never send without checking. All of that is inferred from past activity. You can't inspect the inference, correct it, or carry it to another tool.

The result is a rewrite on most drafts, and the same context re-supplied every session.

## What 'done' looks like

A twin is a `SKILL.md` plus a `references/` folder — the **Agent Skills open standard**, so the same files run in Cowork, VS Code Copilot, and the GitHub Copilot CLI unmodified.

Inside `references/`:

- **`soul.md`** — decision rules, boundaries, capacity, blind spots.
- **`voice.md`** — real sent-email samples and the style rules they imply.

Twin Forge writes those two, then hands off. **The rest of the hack is yours:** in a new Cowork task, you add the files it doesn't have — the people you deal with, what you refuse, what you're actually working on — and wire each one in. That's most of Cowork.

The Code track adds **`revealed.md`** — what your calendar shows about how you spend time — and a council of agents that argue before deciding.

Done means the twin drafts in a way you'd recognise as yours, and you can point to the rule that produced it.

::: tip The proof is a real thread
Name something unresolved from your own inbox. The twin retrieves it and answers. If the answer isn't yours, you've found the missing rule.
:::

## The data

Choose one path.

### Path A — Build your own twin

Use your own Microsoft 365 data: sent mail, calendar patterns, and recent decisions you remember making.

The most accurate twin, because the evidence is real. Keep it private — your own tenant, your own screen, nothing personal pasted into shared spaces.

- 5–10 real sent emails → `voice.md`
- a short yes/no interview about situations you've handled → `soul.md`
- recent calendar patterns → `revealed.md` (Code track)

### Path B — Build Avery Washington's twin

Use the **Avery Washington persona pack**: a synthetic marketing manager with a fake inbox, calendar, and goals doc.

Same exercise, no personal data. Details on the [Cowork build page](/build/cowork-scenario-1).

## Build paths

<!-- markdownlint-disable MD033 -->
<BuildMatrix scenario="scenario-1" />

## Assembly maps

Use the building blocks for your track.

- **🟢 Cowork:**
  1. [Connect Cowork to a data source](/bricks/cowork-connect-source)
  2. [Write a reusable Cowork skill](/bricks/cowork-build-skill)
  3. [Produce a formatted output](/bricks/cowork-formatted-output)
  4. [Re-run a skill on new inputs](/bricks/cowork-rerun-skill)

- **🔵 Scout:** Coming soon

- **🟣 Code:**
  1. [Set up Scout / GitHub Copilot](/bricks/advanced-setup)
  2. [Build an MCP connector](/bricks/advanced-mcp-connector)
  3. [Use Work IQ](/bricks/advanced-work-iq)
  4. [Add a guardrail](/bricks/advanced-guardrail)

::: info Team model
In Cowork, everyone builds their own twin and the table converges on shape — compare rules, steal good tiebreakers.

In Code, the team builds one system. Each person owns one council agent — Ambition, Obligation, Capacity, Arbiter, or Critic — sharing one `soul.md`.
:::
