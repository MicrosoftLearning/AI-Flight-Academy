---
name: "the-greenlight"
description: "Content Health greenlight-council evaluator for The Greenlight hack (the alternate Scenario 2). Seats a room of audience personas who each nominate rubric criteria tied to their own audience outcome, backs every claim with evidence, a source, and a confidence level, scores a subject from every seat at once so the verdicts diverge, debates where they disagree, and produces a transformation plan of the assets and formats each audience would actually finish — then re-scores that plan to greenlight it. Use when the user says the greenlight, greenlight council, seat the council, convene the room, mentions a council or panel of audiences reviewing content, wants content scored from multiple audience points of view at once, wants a transformation or asset plan for a subject, or asks what to do next in the Greenlight hack."
---

# The Greenlight

The solo critic reviews with **one implied reader.** This skill seats a **council of audiences** — each judging the same subject for **its own outcome** — so the room can say what a single reviewer never can: *"excellent, and useless for three of the four people in this room."*

---

## Modes

Pick the mode from what the user asks, load that reference file, and follow it. **Load one at a time.** Do not read all of them up front.

| User says something like | Mode | Load |
|---|---|---|
| *"what do I do next"* · *"am I done"* · *"what do I submit"* | 🧭 **next** | `reference/next.md` |
| *"seat the council"* · *"add a persona"* · *"nominate criteria"* · *"who's in the room"* | 🎤 **seat** | `reference/seat.md` |
| *"run the solo critic"* · *"what does the old eval say"* · *"the baseline"* | ⚖️ **solo** | `reference/solo.md` |
| *"convene the room"* · *"score this subject"* · *"let them debate"* | 🎞️ **convene** | `reference/convene.md` |
| *"greenlight it"* · *"transformation plan"* · *"what should we build"* · *"re-score the plan"* | 🟢 **greenlight** | `reference/greenlight.md` |

**If the user's intent is unclear, run `next`.** It works out where they are and tells them what to do.

---

## The idea that governs everything

> ### 🎯 A criterion is a bar that protects one audience's outcome.
> Every criterion a seat nominates must name **the outcome it defends** — *what this audience is trying to accomplish* — not a generic quality. *"Is it clear?"* belongs to the solo critic. *"Can a floor associate act on this standing up in 6 minutes, so they adopt it without a training session that will never happen?"* belongs to a seat.
>
> **The test:** would this criterion score a subject differently for a *different* audience? If no, it isn't a seat's criterion — it's the solo critic's, and it doesn't belong in the council.

If the user asks to add a criterion, seat a persona, or sharpen the room, **that always means `THE-COUNCIL.md`.** Say so if it's ambiguous.

---

## The other rule: every claim is backed

> ### 🧾 No claim without evidence, a source, and a confidence.
> When a seat scores a subject, each score carries **three** things:
>
> | | |
> |---|---|
> | **Evidence** | a direct quote from the subject — the text that caused the score. No quote, no score. |
> | **Source** | what makes the seat *right* — a line from its audience card, a style-guide rule, a URL. If none, say `UNVERIFIED` and what was searched. |
> | **Confidence** | `High` · `Medium` · `Low`. A seat that is guessing must say so — and `Low` on a fatal criterion escalates to a human rather than forcing a verdict. |

A confident seat with no source is exactly the failure this scenario exists to kill. Make the room earn its verdicts.

---

## Never edit the solo critic

> ### ⛔ Never edit `reference/solo.md`.
> It is the "before" — one reviewer, one implied reader, already scored on all five pieces. If you change it, both sides of the comparison move and the council can't prove it saw anything. Keep it untouched and you get to say: *"the solo critic said REVISE for everyone. The council said REJECT for Retail and SHIP for Compliance — same piece. Here are the quotes."*

---

## The loop

Every feature the user adds ends the same way:

**add a seat or a criterion to `THE-COUNCIL.md` → `convene` over the subject → watch where the room disagrees → refine**

They never know whether the room got sharper until they convene it again. Push them to re-run.

---

## What they're building toward

Rungs, in order. `reference/next.md` has the detail and the per-path finish lines.

| | Feature | Teaches |
|:---:|---|---|
| v1 | **Seat the council** — 2–3 personas, each nominates criteria tied to its outcome | Multi-persona conditioning · criteria-with-anchors · grounding |
| v2 | **The debate** — seats react to each other with evidence, source, confidence; abstain when unsure | Orchestration · adversarial cross-talk · calibrated uncertainty |
| v3 | **Transformation plan** — derive the assets from the failures, then re-score to greenlight | Eval → generation loop · closing the greenlight |
| v4 | **Automate** — convene on any new subject, the plan lands where people are | Triggers · unattended orchestration |
| v5 | **Swap the roster** — someone runs the room with their own audiences | Reusable multi-agent artifacts |
| v6 | **Coverage matrix** — every piece × every seat, who's served and who's abandoned | Orchestration at scale · gap analysis |
| v7 | **The greenlight gate** — nothing ships until every seated audience clears threshold | Consensus gating · publish-time integration |

**v1–v3 is the assignment.** The finish line depends on their path — `next` knows which.

---

## The self-check to keep repeating

> **If every seat returns the same verdict on every piece, the room is one reviewer in four costumes.** Either the seats aren't judging for different outcomes, or the criteria aren't reading the cards.

Say this early and say it again. It's the fastest way to find out the seats are interchangeable.
