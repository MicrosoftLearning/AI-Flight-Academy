---
title: 🔵 Builder · Agent-Orchestrated — Scenario 2
---

# 🔵 Builder · Agent-Orchestrated
## Scenario 2 — The Greenlight

**Building with:** Copilot Studio

## 1 · Your mission

Build a published **council of agents** — each voicing an audience — that scores a piece from every seat at once, debates the conflicts, and proposes a transformation plan. Then have someone who wasn't at the hack reseat it with their own audiences and run it.

## 2 · What you'll demonstrate

See the required functions for this altitude on the [🔵 Builder · Agent-Orchestrated level page](/levels/builder/).

---

## 3 · Assembly map — snap these blocks together

Steps 1–4 give you a room that disagrees in about 35 minutes. Everything after that makes it sharp.

### Step 1 — Install the skill and see the data
📘 [Create an agent + solution](/bricks/studio-create-agent)

**Goal:** the **`the-greenlight`** skill is installed, and your agent can access all five articles, the four example audience cards, and the style guide from the **`data-pack`** folder.

### Step 2 — See what the solo critic says
*~5 minutes*

**Goal:** you've seen the solo critic's verdict on all five articles.

| Piece | Solo verdict |
|---|---|
| Training unit (P1) | SHIP |
| How-to (P2) | REVISE |
| Blog post (P3) | REVISE |
| **Executive summary (P4)** | **REVISE** |
| Quickstart (P5) | SHIP |

**Look hard at P4.** One reviewer, one implied reader — it can't hold *"reject for Retail, ship for Compliance"* at the same time, so it splits the difference and misses.

### Step 3 — Seat two audiences who want *different things*
*~12 minutes*

**Goal:** two seats defined — each an audience with a one-line **outcome** and at least one criterion that protects it. Start with **🛒 Retail** vs **🏦 Compliance**; use a real audience you serve if you have one (Work IQ fills what it can first).

> *Stuck?* → **"Using the-greenlight skill, seat two audiences whose outcomes clash and nominate one outcome-protecting criterion each."**

### Step 4 — Two seat-agents that score the same piece
📘 [Ground on a knowledge source](/bricks/studio-knowledge-grounding)

**Goal:** two Copilot Studio agents — one per seat — each grounded on **its own** audience card + the style guide as **knowledge sources**, each with a **topic** that accepts a content piece and returns a scorecard against that seat's criteria. Every new criterion describes what a 0, 1, 2 and 3 look like.

| Seat | Solo critic | Seat-agent | Why |
|---|---|---|---|
| 🛒 Retail | REVISE | **REJECT** | *"quote from the content"* |
| 🏦 Compliance | REVISE | **SHIP** | *"quote from the content"* |

> **You never change the solo critic.** It's the "before." Everything you build is the council.

**Test early.** Score ONE piece with each seat-agent. Did each use *its own* criteria — or did they blur into one voice? If they agree on everything, the seats aren't grounded on different outcomes.

**Done when:** the two seat-agents return different verdicts on P4.

---

## Attack surfaces

### Step 5 — Attack surface: NARROW

**Cut each seat's criteria to what protects its outcome.** A criterion that scores the same for any audience belongs to the solo critic.

| ❌ Weak seat criterion | ✅ Strong seat criterion |
|---|---|
| Is it clear? | Can a floor associate reach the first action in two lines, standing up? |
| Is it accurate? | Does every claim carry the source Compliance needs to survive an audit? |

The test: swap the seat's card — would the score change? If no, cut it.

::: info Why this matters
Liu et al. (2023) found models attend worst to instructions in the middle of a long context. A bloated seat-agent applies four of its five criteria and quietly drops the load-bearing one.
:::

### Step 6 — Attack surface: EVIDENCE

**Every score carries a quote, a source, and a confidence.** A doc link, a card line, or a style rule — or `UNVERIFIED`. `Low` confidence on a fatal criterion → that seat abstains.

| ❌ Assertion | ✅ Backed |
|---|---|
| Wrong for Retail | *"Step 4 requires admin rights. Card: 'cannot get admin rights, ever.' Confidence: High."* |
| Unsupported claim | *"No source found. UNVERIFIED — searched the card and style guide. Confidence: Low → abstain."* |

**Done when:** at least one seat abstains or marks `UNVERIFIED` instead of guessing.

### Step 7 — Attack surface: CONFLICT — the debate

**A council that agrees with itself is worthless.** Take the passage two seats scored opposite and make them argue it, each with a quote. Then check the piece the solo critic scored **highest** — does any seat still object?

**Done when:** the room surfaces one real conflict — the same passage, scored opposite, defended both ways.

---

## Steps 8 and 9 — the two shared beats

Around halfway the room stops for a **team checkpoint**, and at ~55 minutes a **twist** lands. Both are on the [Scenario 2 brief](/scenarios/scenario-2-greenlight#two-beats-everyone-hits).

---

## Step 10 — A synthesizer agent that runs the room
📘 [Build two agents that hand off](/bricks/studio-multi-agent)

**Goal:** a **synthesizer agent** downstream of the seats. It collects every seat's scorecard, surfaces the conflicts (not a compromise), and states the coverage: who's served as-is, who isn't.

Content → **seat-agents** (fan out) → **synthesizer** (collect + diff).

**Done when:** the synthesizer names a clash between two seats rather than averaging them.

> *Stuck?* → **"Build an agent that takes both seat scorecards and reports where they disagree on the same passage, plus who the piece serves and who it abandons."**

### Step 11 — A responder agent that proposes the plan
📘 [Build two agents that hand off](/bricks/studio-multi-agent)

**Goal:** a **responder agent** that turns the failures into a **transformation plan** — an asset per under-served seat, with the honest format call (*"this shouldn't be a document"*) — then re-scores each asset against that seat's **same criteria** to greenlight it.

Content → seat-agents → synthesizer → **responder**.

::: info Why this matters
Madaan et al. (2023) showed self-critique improves quality — but only when the critique step is separate from the first answer. A separate responder that re-scores on the same rubric is what makes "greenlight" mean something.
:::

**Done when:** the responder proposes at least one different-format asset and re-scores it to a pass.

### Step 12 — Put the plan in front of a human
📘 [Send an Adaptive Card to Teams](/bricks/studio-adaptive-card)

**Goal:** the plan arrives in Teams as an **Adaptive Card** — the split verdicts, the coverage line, and the proposed assets — with **Approve** and **Send back** actions.

**Done when:** both buttons are there and respond when pressed.

### Step 13 — Route the decision
📘 [Add an agent flow](/bricks/studio-agent-flow) · 📘 [Add a topic with a trigger](/bricks/studio-topic-trigger)

**Goal:** an agent flow that convenes the council on a trigger (new content) and acts on the button pressed — approved plans move on, sent-back plans return with the assets attached.

**Done when:** the council fires unattended on new content and the routed decision lands.

### Step 14 — Publish and hand over the room 🏁
📘 [Publish your agent](/bricks/studio-publish)

**Goal:** the council is published, and someone who wasn't at the hack **reseats it with their own audiences** and runs it.

**Done when someone who wasn't there swaps the roster and gets their own split verdicts.**

## 4 · The data

| Folder | What's in it |
|---|---|
| `the-greenlight/` | The skill. Install this first. You only edit `THE-COUNCIL.md`. |
| `data-pack/content/` | The five articles |
| `data-pack/audience-cards/` | Four example audience cards — the seats |
| `data-pack/style-guide/` | The house style rules |

## 5 · Demo checklist

- [ ] Your two seats, and the one-line outcome each one defends
- [ ] Where a seat came from — the parts Work IQ found, and the parts you corrected
- [ ] A criterion you cut during NARROW because it would score the same for any audience
- [ ] P4 scored REJECT by the Retail seat and SHIP by the Compliance seat, each with a quote
- [ ] A score where a seat abstained or marked `UNVERIFIED`
- [ ] **The twist** — what happened when one audience's constraint changed
- [ ] The seat-agents → synthesizer → responder chain running end to end
- [ ] The synthesizer naming a conflict, not a compromise
- [ ] A transformation plan with a different-format asset, re-scored to a pass
- [ ] The Adaptive Card in Teams with Approve and Send back
- [ ] Someone else reseating the published council with their own audiences

[← Back to start](/) · [Scenario 2 brief](/scenarios/scenario-2-greenlight)
