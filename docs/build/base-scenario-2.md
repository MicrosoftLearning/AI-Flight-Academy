---
title: 🟢 Base · Copilot-Crafted — Scenario 2
---

# 🟢 Base · Copilot-Crafted
## Scenario 2 — The Greenlight

**Building with:** Microsoft 365 Copilot + Cowork

## 1 · Your mission

Seat a **council of audiences** in Cowork, convene it over a piece of content so the verdicts split, then have the room decide what to build — and set it to run on its own.

## 2 · What you'll demonstrate

See the required functions for this altitude on the [🟢 Base · Copilot-Crafted level page](/levels/base/).

---

## 3 · Assembly map — snap these blocks together

Steps 1–4 give you a room that disagrees in about 35 minutes. Everything after that makes it sharp.

### Step 1 — Get the files into Cowork
📘 [Connect Cowork to a data source](/bricks/cowork-connect-source)

**Goal:** the **`the-greenlight`** skill is installed, and Cowork can read all five articles, the four example audience cards, and the style guide from the **`data-pack`** folder.

### Step 2 — See what the solo critic says
*~5 minutes*

**Goal:** you've seen the solo critic's verdict on all five articles. Say **`run the solo critic`**.

| Piece | Solo verdict |
|---|---|
| Training unit (P1) | SHIP |
| How-to (P2) | REVISE |
| Blog post (P3) | REVISE |
| **Executive summary (P4)** | **REVISE** |
| Quickstart (P5) | SHIP |

**Look hard at P4** — a governance whitepaper filed against a store lead. The solo critic sees competent prose and says "tidy it up." It holds **one implied reader**, so it can't say *"reject it for Retail, ship it for Compliance"* at once. That blind spot is your whole opening.

::: info Why this matters
Zheng et al. (2023) documented that models acting as judges carry consistent biases — they favour longer, fluent answers. A single reviewer averages every audience into one reader who exists nowhere, and passes content aimed at the wrong person.
:::

### Step 3 — Seat two audiences who want *different things*
*~12 minutes*

**Goal:** two seats in `THE-COUNCIL.md`, each with a one-line **outcome** and at least one criterion that protects it. Say **`seat the council`**.

Start with the sharpest clash in the pack: **🛒 Retail** (outcome: *adopts it without a training session — there won't be one*) versus **🏦 Compliance** (outcome: *a rollout decision that survives an audit*). If you serve a real audience, seat that instead — Cowork will use Work IQ to fill what it can before asking you.

> *Stuck?* → **"Using the-greenlight skill, seat two audiences whose outcomes clash — Retail and Compliance — and nominate one outcome-protecting criterion each."**

### Step 4 — Convene the room and watch it split
*~15 minutes*

**Goal:** every seat scores P4 against its own criteria. Say **`convene the room over P4`**.

| Seat | Solo critic | The council | Why |
|---|---|---|---|
| 🛒 Retail | REVISE | **REJECT** | *"quote from the content"* — a page of governance prose they'll never finish standing up |
| 🏦 Compliance | REVISE | **SHIP** | *"quote from the content"* — exactly the audit rigor they need |

> **You never edit the solo critic.** It's the one-verdict "before" you're measuring against. Everything you build lives in `THE-COUNCIL.md`.

**Done when:** the same piece gets two different verdicts from two seats.

> *Stuck?* → **"Convene both seats over P4 and show me where their verdicts disagree, with a quote from each."**

---

## Attack surfaces

### Step 5 — Attack surface: NARROW

**Cut each seat's criteria to what actually protects its outcome.**

A criterion that would score the same for any audience belongs to the solo critic, not a seat.

| ❌ Weak seat criterion | ✅ Strong seat criterion |
|---|---|
| Is it clear? | Can a floor associate reach the first action in two lines, standing up? |
| Is it accurate? | Does every claim carry the source Compliance needs to survive an audit? |

The test on every criterion: **swap the seat's card — would the score change?** If no, cut it or sharpen it.

::: info Why this matters
Liu et al. (2023) found models attend worst to instructions buried in the middle of a long context — the "lost in the middle" effect. A bloated seat doesn't disagree more sharply; it makes its one load-bearing constraint easier to skip.
:::

### Step 6 — Attack surface: EVIDENCE

**Every score carries three things: a quote, a source, and a confidence.**

- **Quote** — the exact text that caused the score. No quote, no score.
- **Source** — what makes the seat right: a line from its audience card, a style rule, a doc link — or `UNVERIFIED`.
- **Confidence** — `High` / `Medium` / `Low`. `Low` on a fatal criterion → that seat **abstains** rather than forcing a verdict.

| ❌ Assertion | ✅ Backed |
|---|---|
| Wrong for Retail | *"Step 4 requires admin rights. Card: 'cannot get admin rights, ever.' Confidence: High."* |
| Unsupported claim | *"No source found for this figure. UNVERIFIED — searched the style guide and the card. Confidence: Low → abstain."* |

**Done when:** at least one seat abstains or marks a score `UNVERIFIED` rather than guessing.

> *Stuck?* → **"For every score each seat gives, add the quote, the source, and a confidence. Have any seat with Low confidence on a fatal criterion abstain."**

### Step 7 — Attack surface: CONFLICT — the debate

**A council that agrees with itself is one reviewer in costumes.** The point is the disagreement.

Take the passage two seats scored in opposite directions and make them argue it — each from its card, each with a quote. Then take the piece the solo critic scored **highest** and check whether any seat still objects. If every seat agrees on everything, your seats aren't judging for different outcomes.

**Done when:** the room surfaces one real conflict — the same passage, scored opposite, defended both ways.

---

## Steps 8 and 9 — the two shared beats

Around halfway the room stops for a **team checkpoint**, and at ~55 minutes a **twist** lands. Both are on the [Scenario 2 brief](/scenarios/scenario-2#two-beats-everyone-hits).

---

## Step 10 — Sweep every audience

**Goal:** all five articles convened against all four example seats — around 20 verdicts in one table.

| Article | 🛒 Retail | 🏦 Compliance | 🏥 Health | 🏭 Manufacturing |
|---|:---:|:---:|:---:|:---:|
| Executive summary (P4) | REJECT | **SHIP** | REVISE | REVISE |
| Blog post (P3) | REVISE | REVISE | REVISE | **REJECT** |

**Done when:** the same article gets two different verdicts for two different seats.

### Step 11 — Greenlight: turn the failures into a plan

**Goal:** for every seat that rejected a piece, the room proposes an **asset** — what to build, in what format — then re-scores it. Say **`greenlight it`**.

The failures *are* the spec. If Retail failed P4 on modality, the note isn't "trim paragraph three" — it's *"this shouldn't be a document; Retail needs a 90-second video."* Then re-read that asset's spec against Retail's **same criteria** to confirm it would now pass.

**Done when:** at least one proposal changes the *format*, not just the words — and the seat that rejected the original would pass its replacement.

### Step 12 — Set the council loose 🏁
📘 [Re-run a skill on new inputs](/bricks/cowork-rerun-skill)

**Goal:** the council convenes on a schedule against a folder of content, and the transformation plan lands in a chat or channel you set up for this.

::: warning Approval matters
Route the digest to a chat or channel you created for this exercise — not a live team channel, and not an individual colleague. Nothing the council writes should reach a real author without you reading it first.
:::

**Done when it convenes tomorrow morning without you.**

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
- [ ] P4 convened — REJECT for Retail, SHIP for Compliance, with a quote from each
- [ ] A score where a seat abstained or marked `UNVERIFIED` instead of guessing
- [ ] The debate — one passage two seats scored opposite, argued both ways
- [ ] **The twist** — what happened when one audience's constraint changed
- [ ] The cross-audience sweep — one article, two different verdicts
- [ ] A transformation plan that changes a *format*, not just words
- [ ] The scheduled convene arriving without you asking for it

[← Back to start](/) · [Scenario 2 brief](/scenarios/scenario-2)
