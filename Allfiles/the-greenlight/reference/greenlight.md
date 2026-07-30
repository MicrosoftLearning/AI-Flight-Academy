# GREENLIGHT

## 🟢 Pass 2 — the transformation plan, then the re-score that greenlights it

`convene` gave you a room full of verdicts, and — usually — a subject that some seats reject. This mode does two things:

1. **Derives a transformation plan** from those failures: what to build, for whom, in what format.
2. **Re-scores the plan against the same council** — the greenlight. Nothing is greenlit until the seats that rejected the subject would now pass what replaces it.

> **The plan is not advice. It's a spec that has to pass the room that ordered it.** A plan the council wouldn't greenlight is a wish, not a plan.

---

## Step 1 — the failures are the spec

Take the `convene` output. For every seat that returned **REVISE or REJECT**, the criteria that failed *tell you what has to change* — and often, that the format itself is wrong.

For each under-served seat, write a **build order**:

| Field | |
|---|---|
| **audience** | the seat |
| **why the subject failed them** | the failed criterion + the evidence quote from Pass 1 |
| ⭐ **the format call** | the honest one. If they fail `actionable_standing_up` on a 480-word whitepaper, the answer is not "trim it" — it's **"this shouldn't be a document."** |
| **the asset to build** | concrete: *"a 90-second video that opens with the one outcome"* · *"a one-page laminated job aid"* · *"a 3-line Teams card with the single action"* |
| **what it must contain** | the 2–4 things this audience's criteria demand — pulled straight from their anchors |
| **what to drop** | everything the other audiences needed that this one doesn't |

> ### The format call is the whole point
> A generic reviewer says *"rewrite paragraph three."* The council says *"paragraph three is fine for Compliance and irrelevant to Retail — Retail doesn't need a better paragraph, they need a different **artifact.**"* That's a verdict only a room of audiences can produce. Make it explicitly.

---

## Step 2 — the portfolio

Roll the build orders into one **transformation plan**: the subject becomes a *set* of assets, each aimed at a seat (or a group of seats that share an outcome).

```
TRANSFORMATION PLAN · subject: P4-exec-summary

Keep as-is  → 🏦 Compliance        (already SHIP — the whitepaper is their asset)
Build new   → 🛒 Retail            90-sec video: "what changes for your store, and the one thing to do"
Build new   → 🏭 Manufacturing     laminated 1-page job aid, no-network, shift-change readable
Do not ship → (none abandoned)     every seated audience has an asset
```

Note anyone **abandoned** — a seat with no asset in the plan is an audience you're choosing not to serve. Say so out loud; sometimes that's the right call, but it must be a decision, not an oversight.

---

## Step 3 — the greenlight (re-score, same rubric)

Now close the loop. For each **new asset** in the plan, re-run the **same seat's criteria** against it — the spec of the asset if it isn't built yet, or the draft if the participant generated one.

| Asset | For | Seat's Pass-1 verdict | Re-score verdict | Greenlit? |
|---|---|:---:|:---:|:---:|
| 90-sec video (spec) | 🛒 Retail | REJECT (fatal) | SHIP | ✅ |
| Job aid (spec) | 🏭 Manufacturing | REJECT (fatal) | SHIP | ✅ |
| Whitepaper (unchanged) | 🏦 Compliance | SHIP | SHIP | ✅ |

**The rule:** an asset is greenlit only when **the seat that rejected the original would now pass its replacement**, scored on the *same criteria, with the same evidence-source-confidence discipline.* The council that vetoed it is the council that clears it.

If a proposed asset still doesn't clear its seat, it goes back — the plan isn't done. Say which criterion still fails and why.

---

## Step 4 — the greenlight verdict

Close with the room's decision:

> 🟢 **GREENLIT.** The subject ships as a portfolio: whitepaper (Compliance), 90-sec video (Retail), job aid (Manufacturing). Every seated audience clears its own threshold. The solo critic would have shipped one document to all three and lost two of them.

or

> 🔴 **NOT YET.** Retail's asset still fails `actionable_standing_up` — the proposed video is 4 minutes; their bar is ~90 seconds standing up. Cut it or re-spec it, then re-run greenlight.

---

## Per-path — how real is Pass 2

| Path | What the greenlight actually is |
|---|---|
| 🟢 **Cowork** | The council re-reads the **plan's description** of each asset and confirms it would clear the criteria. Honest and lightweight — you're scoring the spec, not a built asset. |
| 🔵 **Studio** | A Responder agent drafts each asset stub; the council agent re-scores it. |
| 🟣 **VS Code** | Generate the asset (or its outline), re-run the rubric in code, and let the **gate** block until every seat passes (that's v7). |

---

## Rules

- **Derive, don't invent.** Every build order traces to a failed criterion and its Pass-1 evidence quote. No failure, no new asset.
- **Name the format call.** "Wrong format entirely" is the highest-value output here. Don't downgrade it to a copy edit.
- **Re-score on the same criteria.** Pass 2 is not a new rubric — it's Pass 1's rubric pointed at the replacement. That symmetry is what makes "greenlight" mean something.
- **Abandonment is a decision.** A seat with no asset must be called out, not quietly dropped.
