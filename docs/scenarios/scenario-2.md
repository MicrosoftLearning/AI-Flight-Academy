---
title: Scenario 2 · The Greenlight
---

# Scenario 2 — The Greenlight

::: warning 🚧 Work in progress
This scenario is drafted and being tested. Details may change before the event.
:::

## The problem

Copilot and other agents already write content — drafts, summaries, posts, documents. The checks we run on that content look at whether it's accurate, clear, and roughly the right level, and they pass almost everything.

What they don't look at is *who the content is for*. They review as if there's one average reader who stands in for everyone — but that reader exists nowhere. So content that's competent, yet aimed at the wrong person, passes every time.

Here's what that misses. Take a long, formal write-up that a compliance team would love but a busy store manager can't use. A single reviewer sees clean, accurate writing and calls it good — it never notices the same document fits one reader and fails the other.

## What 'done' looks like

You build a **council of audience personas** and use it to review content for the specific people it's meant to reach.

In **Base**, the part you build is one file:

- **`THE-COUNCIL.md`** — your council's audience profiles. For each one, write its **goal** and what the content must do to get them there.

The provided skill reviews the content from each audience's point of view. Every judgement includes a **quote**, a **source**, and a **confidence** rating. Where audiences disagree, it shows the conflict side by side, proposes what to build instead, and helps you make it — down to the message to the person waiting on it. From there you can set the review to run on its own; **Builder** and **Advanced** teams take that further, up to a gate that blocks content until every audience is served.

With the supplied pack, the same content should get **different verdicts from different audiences**. With your own content, the council should show whether audiences agree for good reasons or need different treatment. Every verdict points to the text and the audience need behind it. A replacement is ready only when the audience it serves would accept it.

::: tip There's a "before" to measure against
The kit includes a **solo critic** — one all-purpose reviewer that pictures a single reader. Its verdicts are already recorded, and you never change it. Compare your council against this one-verdict "before." The executive summary simply "needs work" to the solo critic; the council shows who it fits and who it does not.
:::

## The data

The kit gives you a working skill and everything the council needs to review. Choose one path for the content and audiences.

### Path A — Use the content pack that comes with the kit

Use the pack included with the scenario: five short articles (a learning unit, a how-to, a blog post, an executive summary, and a quickstart), four ready-made audience profiles, and the house style guide.

This is the recommended path. The content is designed to surface real differences between audiences, and none of it is personal data.

Use:

- the five articles in `data-pack/content/` as the content under review
- the four profiles in `data-pack/audience-cards/` as your council's members
- the rules in `data-pack/style-guide/` as the shared bar for house style

### Path B — Bring your own content and audiences

Use a real piece your team actually publishes — a help article, a launch post, a policy doc — and review it for audiences you actually serve.

Pick this if you'd rather work with something real. Work IQ can draft an audience profile from the work signals you have access to; correct it with people who know that audience. It is available in Cowork on Base and Scout on Advanced. Keep data in your own tenant and out of shared spaces.

## Assembly maps

Use the building blocks for your altitude.

- **🟢 Base:**
  1. [Connect Cowork to a data source](/bricks/cowork-connect-source)
  2. [Write a reusable Cowork skill](/bricks/cowork-build-skill)
  3. [Produce a formatted output](/bricks/cowork-formatted-output)
  4. [Re-run a skill on new inputs](/bricks/cowork-rerun-skill)

- **🔵 Builder:**
  1. [Create an agent + solution](/bricks/studio-create-agent)
  2. [Ground on a knowledge source](/bricks/studio-knowledge-grounding)
  3. [Build two agents that hand off](/bricks/studio-multi-agent)
  4. [Publish your agent](/bricks/studio-publish)

- **🟣 Advanced:**
  1. [Advanced setup](/bricks/advanced-setup)
  2. [Use Work IQ](/bricks/advanced-work-iq)
  3. [Add a guardrail](/bricks/advanced-guardrail)
  4. [Build an MCP connector](/bricks/advanced-mcp-connector)

::: info Team model
In Base and Builder, each person adds a different audience, then the team combines them into one council and compares the results.

In Advanced, the team builds one system. Each person owns an audience reviewer, the comparison step, or the final sign-off.
:::

## Start building

Pick your altitude:

- [🟢 Base · Cowork](/build/base-scenario-2)
- [🔵 Builder · Copilot Studio](/build/builder-scenario-2)
- [🟣 Advanced · Scout · VS Code](/build/advanced-scenario-2)
