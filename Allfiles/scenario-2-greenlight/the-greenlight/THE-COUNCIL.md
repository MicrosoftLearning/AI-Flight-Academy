# THE COUNCIL

## 🎬 Your work product — the greenlight council

**This is the only file you edit.** Every persona you seat and every criterion they nominate lands here. The skill reads this file when it runs `convene` and `greenlight`.

> **Start empty on purpose.** At v0 the room has no seats. You add them. A council of one is just the solo critic with extra steps — seat at least two audiences who want *different outcomes*, or the room can't disagree.

---

## How this file works

Each **seat** is one audience. Each seat **nominates criteria** — the bars that protect *its* outcome. When you `convene`, every seat scores the subject against its own criteria, and the room debates where they disagree.

Copy the block below for each audience you seat. Fill it in with `seat`, or by hand.

---

## SEAT TEMPLATE — copy this per audience

```
### 🎫 Seat: [emoji] [audience name]   ·   card: [AC-0X or "custom"]

**The outcome this seat defends:**
> [One sentence. What is this audience trying to accomplish? What does "it worked" look like FOR THEM?
>  e.g. "A store lead adopts Copilot summarization without a training session — because there won't be one."]

**Nominated criteria** (at least one per seat; the sharpest seats have 2–3):

- **id:** [short_snake_case]
  **the bar:** [what must be true of the subject — phrased so a human could check it]
  **protects the outcome:** [why this bar matters for THIS audience's result — the "for what"]
  **anchors:**
    - 0 (fail): [subject actively blocks the outcome]
    - 1 (weak): [present but the audience will struggle]
    - 2 (ok):   [acceptable for this audience]
    - 3 (strong): [the subject nails it for this audience]
  **fatal?:** [yes / no — if yes, a 0 here forces this seat to REJECT no matter the total]
  **watch_for:** [the trap — where a lazy reviewer would wave this through]
```

> ### 🎯 The test every criterion must pass
> **Would this criterion score the subject differently for a *different* audience?**
> If no, it's a solo-critic criterion (accurate / clear / competent) — it belongs to `reference/solo.md`, not to a seat. Cut it or sharpen it until the answer is yes.

---

## THE ROSTER

<!-- Seat your audiences below. Delete this comment and the example once you have your own. -->

### 🎫 Seat: 🛒 Retail Store Operations Lead · card: AC-01   *(example — replace or keep)*

**The outcome this seat defends:**
> A floor associate can act on this in one short standing read, and re-teach it to a supervisor — so it gets adopted without a training session that will never be scheduled.

**Nominated criteria:**

- **id:** actionable_standing_up
  **the bar:** A distracted reader can reach the first useful action within the first two lines, and finish in under ~6 minutes standing up.
  **protects the outcome:** If they can't act before the first interruption, they never come back to it — there is no session two.
  **anchors:**
    - 0 (fail): No action is reachable without reading a page of prose first, or the piece assumes a desk and uninterrupted time.
    - 1 (weak): The action exists but is buried past the fold, or needs re-reading.
    - 2 (ok): Action is near the top and followable standing up.
    - 3 (strong): First two lines say what it does for them; steps are doable one-handed, interrupted, on a phone.
  **fatal?:** yes
  **watch_for:** Well-written long-form. Fluency is not brevity. A beautiful 800-word explainer fails this for a reason a competence check will never flag.

- **id:** within_their_authority
  **the bar:** Every instructed action is something this reader can actually do with the access they have.
  **protects the outcome:** An instruction to open an admin center or install software isn't "advanced" for this reader — it's impossible, so the whole piece stops working.
  **anchors:**
    - 0 (fail): Requires admin rights, install, or budget the reader can never get.
    - 1 (weak): Requires an approval or a person the reader has to go find.
    - 2 (ok): Fully within the reader's standing access.
    - 3 (strong): Explicitly names what needs the DM's sign-off and what doesn't.
  **fatal?:** yes
  **watch_for:** "Reach out to your IT admin." AC-01's store has no IT admin. That's a dead end, not a workaround.

---

<!--
Seat at least one MORE audience with a DIFFERENT outcome (e.g. 🏦 AC-02 Compliance, whose outcome is
"a rollout that survives an audit" — for whom a governance whitepaper PASSES where it fails Retail).
That contrast is the whole point. Convene the room and watch the verdicts split.
-->

---

## Council settings

| Setting | Value | Notes |
|---|---|---|
| **Quorum for greenlight** | every seated audience clears its threshold | v7 gate uses this. Lower it deliberately if you want a "majority ships" room, and say why. |
| **Verdict thresholds** | SHIP ≥ 2.5 · REVISE ≥ 1.5 · REJECT < 1.5 | Per seat. A fatal 0 forces REJECT for that seat regardless of total. |
| **Abstention** | `Low` confidence on a fatal criterion → that seat escalates to a human, does not force a verdict | Guessing is how a false greenlight happens. |

---

## Where this goes next

| You have… | Do |
|---|---|
| One seat | Seat another with a *different* outcome — say `seat the council` |
| Two+ seats | `convene` over a piece (start with `P4-exec-summary`) and watch the room split |
| A split verdict | `greenlight` — turn the failures into a transformation plan, then re-score it |
| A working room | Ask `next` — how far can you climb on your path? |
