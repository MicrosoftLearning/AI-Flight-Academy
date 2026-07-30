---
title: 🟣 Advanced · Code-Extended — Scenario 2
---

# 🟣 Advanced · Code-Extended

## Scenario 2 — The Greenlight

**Building with:** Scout + GitHub Copilot

## 1 · Your mission

Build a **council** in a repo — many audience seats scoring one subject in parallel, a judge that diffs them, a transformation plan re-scored on the same rubric — and gate a pull request until every seated audience is served.

## 2 · What you'll demonstrate

See the required functions for this altitude on the [🟣 Advanced · Code-Extended level page](/levels/advanced/).

---

## 3 · Assembly map — snap these blocks together

Steps 1–4 give you a room that disagrees in about 35 minutes. Everything after that makes it sharp.

### Step 1 — Set up the repo and get the data in
📘 [Set up Scout / GitHub Copilot](/bricks/advanced-setup)

**Goal:** a project repo containing the **`the-greenlight`** skill, the **`the-greenlight-starter`** folder (your council runner and checks live here), and the **`data-pack`** folder (five articles, four example audience cards, style guide).

### Step 2 — See what the solo critic says
*~5 minutes*

**Goal:** you've seen the solo critic's verdict on all five articles. The machine-readable control is `the-greenlight/reference/solo-rubric.json`.

| Piece | Solo verdict |
|---|---|
| Training unit (P1) | SHIP |
| How-to (P2) | REVISE |
| Blog post (P3) | REVISE |
| **Executive summary (P4)** | **REVISE** |
| Quickstart (P5) | SHIP |

**P4 is the tell.** One implied reader can't emit *"REJECT for Retail, SHIP for Compliance"* at once. Your council can, because each seat gets its own verdict.

### Step 3 — Seat the audiences (as data)
📘 [Ground on live data with Work IQ](/bricks/advanced-work-iq)
*~12 minutes*

**Goal:** two or more seats defined in `THE-COUNCIL.md` (or a `council/*.json` per seat) — each an audience with a one-line **outcome** and criteria that protect it, with 0/1/2/3 anchors. Ground a real seat on Work IQ where you can; correct what it gets wrong.

**Work IQ grounding belongs here — at the start, seating real audiences — not bolted on at the end.**

> *Stuck?* → **"Seat Retail and Compliance as JSON — each with an outcome and one criterion, with 0–3 anchors — in the shape solo-rubric.json uses, plus a seat id."**

### Step 4 — Score the subject from every seat, in parallel
*~15 minutes*

**Goal:** a runner that loads every seat and scores one article against **each seat's** criteria, emitting structured per-seat JSON (reuse the `output_contract` from `solo-rubric.json`, plus a `seat`, a `source`, and a `confidence` per score).

| Seat | Solo critic | Council | Why |
|---|---|---|---|
| 🛒 Retail | REVISE | **REJECT** | *"quote from the content"* |
| 🏦 Compliance | REVISE | **SHIP** | *"quote from the content"* |

> **You never change the solo critic.** It's the "before." Everything you build is the council.

**Done when:** the runner emits two different verdicts for two seats on P4.

> *Stuck?* → **"Write a runner that scores one article against every seat in THE-COUNCIL.md and prints one scorecard per seat as JSON."**

---

## Attack surfaces

### Step 5 — Attack surface: NARROW

**Cut each seat's criteria to what protects its outcome.** A criterion that scores the same for any audience belongs in `solo-rubric.json`, not a seat.

| ❌ Weak seat criterion | ✅ Strong seat criterion |
|---|---|
| Is it clear? | Can a floor associate reach the first action in two lines, standing up? |
| Is it accurate? | Does every claim carry the source Compliance needs to survive an audit? |

The test: swap the seat's card — would the score change? If no, cut it.

::: info Why this matters
Liu et al. (2023): models attend worst to instructions buried in a long context. A bloated seat drops its load-bearing constraint. Keep each seat lean.
:::

### Step 6 — Attack surface: EVIDENCE

**Every score carries a quote, a source, and a confidence.** `Low` confidence on a fatal criterion → that seat abstains. At this altitude, EVIDENCE applies to code too: your deterministic checks (Step 10) cite the card line that justifies each threshold.

| ❌ Assertion | ✅ Backed |
|---|---|
| Wrong for Retail | *"Step 4 requires admin rights. Card: 'cannot get admin rights, ever.' Confidence: High."* |
| Unsupported claim | *"No source found. UNVERIFIED. Confidence: Low → abstain."* |

**Done when:** a score is marked `UNVERIFIED` or a seat abstains rather than guessing.

::: info Why this matters
Madaan et al. (2023): self-critique improves quality only when the critique is separate from the first answer. Your judge (Step 10) and your greenlight re-score (Step 11) are that separation.
:::

### Step 7 — Attack surface: CONFLICT — the debate

**A council that agrees with itself is one reviewer in costumes.** Make two seats argue the same passage, each with a quote. Check the piece the solo critic scored **highest** — does any seat still object?

**Done when:** the runner surfaces one real conflict — the same passage, scored opposite, defended both ways.

---

## Steps 8 and 9 — the two shared beats

Around halfway the room stops for a **team checkpoint**, and at ~55 minutes a **twist** lands. Both are on the [Scenario 2 brief](/scenarios/scenario-2#two-beats-everyone-hits).

---

## Step 10 — A judge, plus the checks a model shouldn't be doing

**Goal:** a **judge step** that diffs the per-seat scorecards and reports conflicts and coverage — and **deterministic checks** alongside the model's judgement, because code catches what's countable and the model catches what's contextual.

Write your checks into `the-greenlight-starter/`. Look for anything countable on a seat's card, and draw the threshold **from the card, not a hardcoded value**:

- Retail *"6 minutes, standing"* → reading-time check per seat's time budget
- Retail *"can't install anything"* → instructions containing "install"
- Retail *"on a phone"* → tables wider than N columns

**You are not expected to hand-write Python.** Describe each check to Copilot or Scout — **but test it against content you know should fail.**

**Done when:** at least two articles fail at least one deterministic check tied to a seat's card.

> *Stuck?* → **"Find two countable things on the Retail card. Write a Python function for each that pulls its threshold from the card, and run them across the five articles."**

### Step 11 — Greenlight: re-score the plan on the same rubric
📘 [Add a guardrail / output check](/bricks/advanced-guardrail)

**Goal:** for every seat that rejected a piece, generate the asset spec (the format call included), then **re-run that seat's same criteria** against it. An asset is greenlit only when the seat that rejected the original would now pass it. Add validation that fails the run when any score lacks a quote or a source.

::: warning Over-building
The guardrail is roughly ten lines. Do not build a framework. Remove the evidence from one score and the run should refuse to complete.
:::

**Done when:** a proposed asset is re-scored to a pass by the seat that rejected the original — and the run fails if a score has no evidence.

### Step 12 — The coverage matrix

**Goal:** one command scores all five articles × all seats and emits a ranked **coverage dashboard** — who's served, who's abandoned, per piece.

**Done when:** the matrix shows at least one piece that serves one audience and abandons another.

### Step 13 — Gate the pull request 🏁
📘 [Build a custom connector (MCP)](/bricks/advanced-mcp-connector) · 📘 [Add a guardrail / output check](/bricks/advanced-guardrail)

**Goal:** the council runs on a PR and turns it **red until every seated audience clears its threshold** (or the plan covers them). Deterministic checks and seat verdicts both run.

**The thing that wrote the plan is not allowed to merge it.** The council proposes; the gate blocks; a human approves.

**Done when a pull request fails because the plan left an audience unserved — and passes after the fix.**

## 4 · The data

| Folder | What's in it |
|---|---|
| `the-greenlight/` | The skill + `reference/solo-rubric.json` (the control). You edit `THE-COUNCIL.md`. |
| `the-greenlight-starter/` | Where your council runner and deterministic checks live |
| `data-pack/content/` | The five articles |
| `data-pack/audience-cards/` | Four example audience cards — the seats |
| `data-pack/style-guide/` | The house style rules |

## 5 · Demo checklist

- [ ] Your seats as data — each with an outcome and anchored criteria
- [ ] Where a seat came from — the parts Work IQ found, and the parts you corrected
- [ ] A criterion you cut during NARROW because it would score the same for any audience
- [ ] The runner emitting per-seat scorecards — REJECT for Retail, SHIP for Compliance on P4
- [ ] A score marked `UNVERIFIED` or a seat abstaining on low confidence
- [ ] **The twist** — what happened when one audience's constraint changed
- [ ] Two deterministic checks that pull thresholds from a seat's card and fail on content they should
- [ ] The judge diffing the seats — one conflict, same passage, opposite verdicts
- [ ] The greenlight re-score — an asset passing the seat that rejected its original
- [ ] The coverage matrix — one piece served for one audience, abandoned for another
- [ ] The PR check turning red because an audience was left unserved, green after the fix

[← Back to start](/) · [Scenario 2 brief](/scenarios/scenario-2)
