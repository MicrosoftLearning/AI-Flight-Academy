---
title: Scenario 2 · The Greenlight
---

# Scenario 2 – The Greenlight

::: warning 🚧 Work in progress
This scenario is drafted and being tested. Details may change before the event.
:::

![A lone film critic sits by himself in an old-Hollywood screening room, smugly pressing a glowing green approve button; his neon nameplate reads "average," three unlit empty verdict stations sit beside him, and the rows of red cinema seats behind him are deserted. Headline reads "No such person as average."](/img/scenario-2-council-opener.png)

## The problem

Copilot and other agents already produce the things we ship – drafts, summaries, posts, documents, decks, plans. The checks we run on those **assets** look at whether they're accurate, clear, and roughly the right level, and they pass almost everything.

What they don't look at is *who the asset is for*. They review as if there's one average reader who stands in for everyone – but that reader exists nowhere. So an asset that's competent, yet aimed at the wrong person, passes every time.

Here's what that misses. Take a long, formal write-up that a compliance team would love but a busy store manager can't use. A single reviewer sees clean, accurate writing and calls it good – it never notices the same document fits one reader and fails the other.

## What 'done' looks like

You build a **council of audience personas** and use it to review an asset for the specific people it's meant to reach.

In **Cowork**, the part you build is one file:

- **`THE-COUNCIL.md`** – your council's audience profiles. For each one, write its **goal** and what the asset must do to get them there.

The provided skill reviews the asset from each audience's point of view. Every judgement includes a **quote**, a **source**, and a **confidence** rating. Where audiences disagree, it shows the conflict side by side, proposes what to build instead, and helps you make it – down to the message to the person waiting on it. From there you can set the review to run on its own; **Scout** and **Code** teams take that further, up to a gate that blocks the asset until every audience is served.

![A diverse council of four critics reviews the same content but splits its verdict – two green approve lights, two red reject lights – as members lean in to argue. Neon nameplates read Retail, Compliance, Clinical, and Manufacturing. Headline reads "Same content. Split verdict."](/img/scenario-2-council-split.png)

With the supplied pack, the same asset should get **different verdicts from different audiences**. With your own asset, the council should show whether audiences agree for good reasons or need different treatment. Every verdict points to the text and the audience need behind it. A replacement is ready only when the audience it serves would accept it.

::: tip There's a "before" to measure against
The kit includes a **solo critic** – one all-purpose reviewer that pictures a single reader. Its verdicts are already recorded, and you never change it. Compare your council against this one-verdict "before." The executive summary simply "needs work" to the solo critic; the council shows who it fits and who it does not.
:::

## The data

The kit gives you a working skill and everything the council needs to review. Choose one path for the asset and audiences.

### Path A – Use the pack that comes with the kit

Use the pack included with the scenario: five short assets (a learning unit, a how-to, a blog post, an executive summary, and a quickstart), four ready-made audience profiles, and the house style guide.

This is the recommended path. The pack is designed to surface real differences between audiences, and none of it is personal data.

Use:

- the five assets in `data-pack/content/` as the material under review
- the four profiles in `data-pack/audience-cards/` as your council's members
- the rules in `data-pack/style-guide/` as the shared bar for house style

### Path B – Bring your own asset and audiences

Use a real piece your team actually publishes – a help article, a launch post, a policy doc – and review it for audiences you actually serve.

Pick this if you'd rather work with something real. Work IQ can draft an audience profile from the work signals you have access to; correct it with people who know that audience. It is available in both Cowork and Scout. Keep data in your own tenant and out of shared spaces.

## Assembly maps

Use the building blocks for your altitude.

- **🟢 Cowork:**
  1. [Connect Cowork to a data source](/bricks/cowork-connect-source)
  2. [Write a reusable Cowork skill](/bricks/cowork-build-skill)
  3. [Produce a formatted output](/bricks/cowork-formatted-output)
  4. [Re-run a skill on new inputs](/bricks/cowork-rerun-skill)

- **🔵 Scout (Microsoft Scout):**
  1. Import the Greenlight skill and seat your audiences
  2. Convene the council on a piece and watch the verdicts split
  3. Have Scout build a live dashboard, run by GitHub Copilot CLI
  4. Make it a one-command app or a scheduled task

- **🟣 Code:**
  1. [Advanced setup](/bricks/advanced-setup)
  2. [Use Work IQ](/bricks/advanced-work-iq)
  3. [Add a guardrail](/bricks/advanced-guardrail)
  4. [Build an MCP connector](/bricks/advanced-mcp-connector)

::: info Team model
In Cowork and Scout, each person adds a different audience, then the team combines them into one council and compares the results.

In Code, the team builds one system. Each person owns an audience reviewer, the comparison step, or the final sign-off.
:::

## Start building

Pick your altitude:

<!-- markdownlint-disable MD033 -->
<BuildMatrix scenario="scenario-2" />

![The diverse council of four critics at their screening-room desk all light their verdict lamps green in approval, thumbs up. Neon nameplates read Retail, Compliance, Clinical, and Manufacturing. Headline reads "Now every audience gets a vote."](/img/scenario-2-council-conclusion.png)

::: details 🎬 Blooper reel
![One council critic has fallen asleep face-down on his green approve button amid spilled popcorn while the other three react with facepalms and eye-rolls. Neon nameplates read Retail, Compliance, Clinical, and Manufacturing. Headline reads "Even the best panel nods off."](/img/scenario-2-council-blooper.png)

Even the best panel nods off now and then – which is exactly why you convene more than one reviewer.
:::
