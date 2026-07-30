---
title: Scenario 1 · The Digital Twin
---

# Scenario 1 — The Digital Twin

## The problem (villain's complaint)

I use AI all day, and somehow I still do the last mile myself.

It can write an email. It cannot write *my* email. It can summarize a thread. It misses the thing I would have flagged. It knows Microsoft in the abstract, but it does not know how I make tradeoffs, who I protect, what I never send without checking, or when I cut scope to hold a date.

So every draft becomes a rewrite. Every summary needs a pass. The productivity gain evaporates right where the work gets personal.

## What 'done' looks like

You build a portable digital twin spec and an agent that can run on it.

Your twin is three files:

- **`soul.md`** — how you decide: identity, priority stack, decision rules, stakeholder table, boundaries, capacity, and blind spots.
- **`voice.md`** — how you write: 5–10 real sent-email samples, plus the style rules those samples imply.
- **`revealed.md`** — what your calendar says about you, compared with what you say about yourself.

These files use the **Agent Skills open standard**: `SKILL.md` plus a `references/` folder. The same files should run in Cowork, VS Code Copilot, and the GitHub Copilot CLI without rewriting them.

Done means your twin can draft or advise in a way that feels recognizably like you — and you can point to the specific rule, sample, or calendar pattern that made it behave that way.

::: tip The reveal is not a score
At the start, you answer a few forced-choice work dilemmas and seal them. At the end, your twin answers the same dilemmas cold. You compare the answers to learn what it understood, what it missed, and what needs correction.
:::

## The data

Choose one path.

### Path A — Build your own twin

Use your own Microsoft 365 data: sent mail, calendar patterns, and your own recollection of recent decisions.

This is the strongest experience because the last mile is real. Keep it private. Work in your own tenant, use only your own screen, and do not paste personal data into shared spaces.

Use:

- 5–10 real sent emails for `voice.md`
- recent calendar patterns for `revealed.md`
- recent tradeoffs and decisions for `soul.md`

### Path B — Build Marcus Webb's twin

Use the **Marcus Webb persona pack**: a synthetic marketing manager with a fake inbox, calendar, and goals doc.

Pick this path if you cannot or do not want to use your own data. It exercises the same skills without personal data. See the Base build page for details: [/build/base-scenario-1](/build/base-scenario-1).

## Assembly maps

Use the building blocks for your altitude.

- **🟢 Base:**
  1. [Connect Cowork to a data source](/bricks/cowork-connect-source)
  2. [Write a reusable Cowork skill](/bricks/cowork-build-skill)
  3. [Produce a formatted output](/bricks/cowork-formatted-output)
  4. [Re-run a skill on new inputs](/bricks/cowork-rerun-skill)

- **🔵 Builder:** Coming soon

- **🟣 Advanced:**
  1. [Advanced setup](/bricks/advanced-setup)
  2. [Build an MCP connector](/bricks/advanced-mcp-connector)
  3. [Use Work IQ](/bricks/advanced-work-iq)
  4. [Add a guardrail](/bricks/advanced-guardrail)

::: info Team model
In Base, everyone builds their own twin, but the team converges on the shared schema. Compare fields. Steal good tiebreakers. Improve the spec together.

In Advanced, the team builds one integrated system. Each person owns one council agent — Ambition, Obligation, Capacity, Arbiter, or Critic — and all agents share one `soul.md`.
:::

---

Why this scenario is designed the way it is: [The Research](/resources/research).
