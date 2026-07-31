# CONVENE

## 🎞️ Pass 1 — the whole council scores a subject, then debates

You convene the council over one **subject** (a piece from `../data-pack/content/`, or anything the participant pastes — a blog, a doc, a video script). Every **seat** in `THE-COUNCIL.md` scores it against **its own** criteria. Then the room **debates** where the verdicts split.

This is the heart of the exercise. **The output is not one verdict — it's N verdicts, one per seat, and the disagreement between them.**

---

## What you do, in order

### 1. Load the room
Read `THE-COUNCIL.md`. Get every seat, its outcome, and its criteria. If there's only one seat, stop and say: *"A council of one can't disagree. Seat another audience with a different outcome first — say `seat the council`."*

### 2. Score the subject, one seat at a time
For **each seat**, produce a scorecard against **that seat's** criteria only. Do the seats **independently** — a later seat must not soften an earlier seat's verdict. Each score carries the three backings:

| Field | |
|---|---|
| **score** | 0–3, or `INSUFFICIENT_CONTEXT` |
| **evidence** | a direct quote from the subject — the text that caused the score. **No quote, no score.** |
| **source** | what backs the judgement: a line from this seat's audience card, a style-guide rule, a URL — or `UNVERIFIED` and what you searched for |
| **confidence** | `High` · `Medium` · `Low`. `Low` on a fatal criterion → this seat abstains (escalate to human), does not force a verdict |
| **fix** | required when score ≤ 1: specific and actionable, for **this** audience |

Then the seat's **verdict** (SHIP / REVISE / REJECT) by the thresholds in `THE-COUNCIL.md`.

### 3. Build the council table

| Seat | Verdict | Score | Fatal trip? | One-line reason (with a quote) |
|---|:---:|:---:|:---:|---|
| 🛒 Retail | REJECT | 0.8 | ✅ actionable_standing_up | *"Over an eight-week pilot… control posture"* — a page of governance prose; they never reach an action |
| 🏦 Compliance | SHIP | 2.7 | — | *"should not be recorded as a control"* — exactly the audit rigor they need |

### 4. Run the debate
This is what makes it a council and not four evaluators in parallel. Surface the **real conflicts** — places where two seats scored the *same text* in opposite directions.

For each conflict:

> **The clash:** 🛒 Retail scored `actionable_standing_up` = 0 on *"[quote]"* · 🏦 Compliance scored `audit_defensible` = 3 on the *same passage*.
> **🛒 argues:** *"[the Retail seat's case, from its outcome and card — with its source and confidence]"*
> **🏦 answers:** *"[the Compliance seat's case]"*
> **What it exposes:** the passage isn't good or bad — it's **right for one outcome and fatal for another.** That's not a defect to fix in place; it's a signal the subject must **fork** into different assets. (That's what `greenlight` does with it.)

> ⚠️ **Debate is evidence-bound.** Every move in the debate cites a quote and a source. A seat is not allowed to "feel" something is wrong — it argues from its card and the text. A seat with only `Low` confidence must say so and defer rather than push a verdict it can't back.

### 5. The coverage line
Close with who the subject, **as it stands**, actually serves:

> **Served as-is:** 🏦 Compliance. **Not served:** 🛒 Retail (fatal), 🏭 Manufacturing (fatal). **Abstained:** none.
> A single reviewer gave this one verdict. The room gives you three — and two of them are the people this was filed *for.*

---

## Compare to the solo critic

Always end by putting the room next to `reference/solo.md`'s pre-scored verdict for that piece:

> **Solo critic said:** REVISE (one verdict, one implied reader).
> **The council says:** REJECT for Retail, SHIP for Compliance, REJECT for Manufacturing.
> **What the council saw that the solo critic couldn't:** the same competent prose is a different thing to each audience. One verdict had to average them, and the average hid a fatal miss.

If the council's verdicts are **identical across every seat**, say so plainly — that's the failure mode:

> ⚠️ **Every seat returned the same verdict.** Right now this is one reviewer in costumes. Either the seats aren't judging for different outcomes, or the criteria aren't reading the cards. Look at your sharpest audience's hardest constraint — that's a criterion the others wouldn't share.

---

## Rules

- **Score seats independently.** Never let one seat's verdict bleed into another's. Different outcomes must be free to disagree.
- **No quote, no score. No score without a source and a confidence.** Enforce all three every time.
- **Name the conflict, don't smooth it.** The disagreement is the product. Do not resolve it into a compromise verdict — surface it.
- **Don't invent capabilities.** A feature that appears nowhere in the subject is an accuracy problem, not an assumption.
- **The subject can be anything.** A pasted blog or video script is a valid subject. The five pieces are just the ones with a known solo-critic score to beat.

---

## When to run

- After seating or changing any seat — this is the feedback loop.
- Start with `P4-exec-summary`. It's the piece the solo critic can't handle, and the Retail↔Compliance split is the sharpest in the pack.
- Before `greenlight` — the failures this pass surfaces are the spec the transformation plan is built from.
