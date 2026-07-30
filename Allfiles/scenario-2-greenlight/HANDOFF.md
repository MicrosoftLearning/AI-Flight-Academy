# THE GREENLIGHT — Session Handoff

> **Purpose of this file.** A complete handoff for continuing work on the *Greenlight* scenario in a fresh VS Code / GitHub Copilot session. It captures the genesis, the design decisions and *why* they were made, the exact repo state, and the open work. Read it top to bottom once; after that it's a reference.
>
> Written 2026-07-30 at the end of a Microsoft Scout chat session. Not participant-facing — it lives at the scenario root, outside the installable `the-greenlight/` kit.

---

## 0. TL;DR

- **What this is:** an *alternate* take on the Imagineer Hack **Scenario 2 (Content Health / slide 9 "persona-lization")**. It sits alongside the original, which was renamed from **The Screening Room → The Critic**.
- **The idea:** instead of teaching *one* reviewer to know *one* audience (that's The Critic), you seat a **council of audience personas** who each **nominate rubric criteria tied to their own outcome**, back every score with **evidence + source + confidence**, **debate** the conflicts, and produce a **transformation plan** — which is then **re-scored by the same council** to "greenlight" it.
- **Where it lives:** fork `dahans-msft2/Team-Week-Imagineer-Hack`, branch **`scenario-2-greenlight`**, everything pushed. `upstream` (MicrosoftLearning) never touched.
- **State:** kit + facilitator materials + docs (scenario page + 3 build pages) all complete, committed, pushed. No dead links. JSON validates.

---

## 1. Project genesis & where this fits

### The Imagineer Hack
- Microsoft **Team Week, October 2026**. ~500–600 participants, mixed-skill teams, most seeing the tools for the first time, **2-hour** build window.
- Three **paths / altitudes**, same rungs, different tool + finish line:
  - 🟢 **Base** = Cowork
  - 🔵 **Builder** = Copilot Studio
  - 🟣 **Advanced** = Scout · GitHub Copilot · VS Code
- Design principle across the hack: *all three paths build the **same** solution in different tooling; capability is allowed to differ; one brief and one rubric span all levels.* "Higher isn't automatically more points" (deck slide 4) — the rubric rewards the right tool for the job, so a sharp Base build beats a sloppy Advanced one.
- **Copilot Studio's fate is uncertain** — Darrin's team is trying to get it *out* of the mix. Every scenario is designed so the Builder path is an additive, removable tail ("Cowork, deeper" is the ready replacement). Build for it, but never make it a prerequisite.

### Scenario 2 = "Content Health"
- Owner: **Darrin Hanson**. Maps to **deck slide 9** (Content & Insights, "persona-lization").
- The pain: *our agents write content; our evals check accuracy/clarity/level and pass almost everything; they have no idea **who the content is for**. Competent content aimed at the wrong reader passes every time.*
- The ask: content **evaluated and adapted for a specific audience** — industry, role, authority, experience, time, and **how they actually learn (modality)**.

### The two takes on Scenario 2 (this is the key context)
| Branch | Name | Mechanism |
|---|---|---|
| `scenario-2-screening-room` | **The Screening Room** (original) | one **audience lens** — teach a single reviewer who the content is for |
| `scenario-2-the-critic` | **The Critic** | the Screening Room, *renamed* (done in a parallel session) |
| **`scenario-2-greenlight`** | **The Greenlight** ← *this work* | a **council** of audiences that score, debate, and decide what to build |

So the lineage is: *The Screening Room → renamed to The Critic* (its own branch), and **The Greenlight is a separate, orchestration-forward sibling** cut from `main`. They solve the **same slide-9 need** with different techniques. An open decision (below) is whether both ship as a participant choice, or one is primary.

---

## 2. How the concept evolved (the genesis of the idea itself)

This matters because the *reasoning* is load-bearing — several early framings were explicitly rejected. The conversation went:

1. **Seed (user):** inspired by a "screening room" of virtual people with different audience profiles who review a subject as a group — each announces what matters to them, why it's relevant / not relevant, what modality doesn't work, what to improve — then debate and propose a transformation plan of assets.
2. **First framing (rejected as too loose):** a free-form *debate* panel producing prose opinions. Problem: debate produces a transcript, not a re-runnable artifact; conflict risked being theater.
3. **Sharpening (user):** what if the room instead **builds a rubric / deterministic evals / Studio actions together** — each member **nominates a criterion that matters to them**? This was the turning point: nomination produces a **machine that scores**, not a transcript.
4. **Option A vs B decision:** 
   - A = one **blended composite rubric** (simpler; good Cowork on-ramp).
   - B = a **panel — one rubric per persona** (N scorecards per subject). **Locked B as the headline** because it produces *same subject, many verdicts* — persona-lization you can *run* — and it's what keeps it distinct from The Critic. Composite kept only as the Cowork entry rung.
5. **Debate kept, not dropped (user):** heavy debate stays, but every nomination/score must carry **evidence + sources + a confidence rating**. This is what makes the debate rigorous instead of vibes.
6. **The clarity that unlocked it (user asked "criteria *for what*?"):** a criterion isn't "what I care about" — it's **a bar that protects one audience's *outcome*.** Not *"is this good?"* but *"will this get **my** people to the result they need?"* Every seat judges the same subject **for a different result**; that's *why* the room disagrees, and the disagreement is the product. This became the scenario's central rule (analogous to The Critic's "no quote, no score").
7. **Two-pass mechanic (from "what is the rubric grading?"):** 
   - **Pass 1 (`convene`)** scores the **subject** — verdicts diverge per seat.
   - The **failures are the spec** → a **transformation plan** (assets + honest format calls, incl. "this shouldn't be a document").
   - **Pass 2 (`greenlight`)** re-scores the **plan/assets on the *same* criteria.** An asset is greenlit only when the seat that rejected the original would now pass its replacement. *The council that vetoes is the council that clears.* That symmetry is the whole meaning of "greenlight."
8. **Naming:** candidates were THE GREENLIGHT / THE TEST SCREENING / THE WRITERS' ROOM / THE FOCUS GROUP. **Locked THE GREENLIGHT** (a greenlight committee decides what gets produced).

### Design invariants that came out of that
- **A council of one is just the solo critic with extra steps** → minimum two seats with *different outcomes*, or nothing can disagree.
- **The self-check:** if every seat returns the same verdict on every piece, it's "one reviewer in four costumes" — either the seats aren't judging for different outcomes, or the criteria aren't reading the cards.
- **Beginner safety in 2 hours:** v1 must be achievable as *sequential voices in a single Cowork thread* — no orchestration framework required. "Real" orchestration only becomes necessary at v2+ on the Advanced path. Keep the entry rung boring.
- **Distinct from The Critic on three axes:** (a) many co-authoring personas vs one elicited lens; (b) a *panel* of N verdicts vs one verdict; (c) cross-persona conflict resolution + a closed greenlight loop, neither of which exist in The Critic.

---

## 3. The mechanic, precisely

```
THE SUBJECT (a blog / doc / video script / one of P1–P5)
        │
   each SEAT nominates outcome-protecting criteria (0–3 anchors, fatal?, watch_for)
        │
  ── PASS 1 · convene · score the SUBJECT ──
   🛒 Retail REJECT   🏦 Compliance SHIP   🏭 Mfg REJECT     ← same piece, different verdicts
        │  (each score: quote + source + confidence; Low-on-fatal ⇒ abstain)
   the DEBATE: same passage scored opposite, argued from each card
        │
   the failures are the spec ⇒ TRANSFORMATION PLAN
   (asset + format per under-served seat; "wrong format entirely" is the prize output)
        │
  ── PASS 2 · greenlight · re-score the PLAN on the SAME criteria ──
   asset greenlit only when the seat that rejected the original now passes it
```

### The five verbs (skill modes)
| Verb | Role | Edits? |
|---|---|---|
| `next` | 🧭 guide — what now / am I done / what to submit | — |
| `seat` | 🎤 seat an audience; name its outcome; nominate criteria | writes `THE-COUNCIL.md` |
| `solo` | ⚖️ the solo critic — one implied reader, **pre-scored**, the control | ⛔ never edit |
| `convene` | 🎞️ Pass 1 — every seat scores + the debate | — |
| `greenlight` | 🟢 Pass 2 — transformation plan + re-score | — |

Participants **only ever edit `THE-COUNCIL.md`** (the roster + nominated criteria).

### The rungs (v0–v7) and finish lines
| Rung | Feature |
|---|---|
| v0 | solo critic (provided, pre-scored) |
| v1 | **seat the council** (≥2 seats, distinct outcomes) — *the assignment floor* |
| v2 | **the debate** (evidence+source+confidence, abstain) |
| v3 | **transformation plan + greenlight** (re-score) |
| v4 | automate — 🟢 **Base finish line** |
| v5 | swap the roster — 🔵 **Builder finish line** |
| v6 | coverage matrix |
| v7 | greenlight gate — 🟣 **Advanced finish line** |

**v1–v3 is the assignment at every level.** Everything above is the tail.

---

## 4. The data pack (SHARED with The Critic — do not fork it lightly)

Reused verbatim so Greenlight is a true sibling, not a rebuild. Lives at `Allfiles/scenario-2-greenlight/data-pack/`.

- **5 content pieces** (all about Copilot summarization in Teams):
  - `P1-retail-learn-unit` (declares AC-01) — genuinely fine; **stable SHIP control**.
  - `P2-health-howto` (AC-03) — competent; REVISE.
  - `P3-manufacturing-announce` (AC-04) — reads well; solo critic can't see the segmented plant network can't reach half of it.
  - **`P4-exec-summary` (declares AC-01)** — ⭐ **the tell.** A polished governance/compliance whitepaper *filed against a retail store lead.* Solo critic says REVISE. The council makes it **REJECT-for-Retail + SHIP-for-Compliance** — the split a single reviewer structurally cannot produce. **The entire scenario turns on P4.**
  - `P5-quickstart` (AC-01) — short, followable; SHIP.
- **4 audience cards** = the seats: 🛒 AC-01 Retail store lead · 🏦 AC-02 Financial compliance/risk · 🏥 AC-03 Health clinical informatics · 🏭 AC-04 Manufacturing production.
  - **Sharpest clash for teaching = AC-01 Retail vs AC-02 Compliance on P4.** Retail wants a 6-min standing read / no admin rights; Compliance wants audit rigor / zero unsupported claims. Opposite outcomes → opposite verdicts on the same governance doc.
- **Style guide** (one page).

The solo critic's pre-scored verdicts (the "number to beat") are baked into `the-greenlight/reference/solo.md` and `solo-rubric.json`: P1 SHIP · P2 REVISE · P3 REVISE · P4 REVISE · P5 SHIP. **Headline finding: no solo pass flags P4 as REJECT.**

---

## 5. File inventory (branch `scenario-2-greenlight`)

### The installable kit — `Allfiles/scenario-2-greenlight/the-greenlight/`
| File | Purpose |
|---|---|
| `README.md` | Participant landing — problem, the "criterion = outcome bar" idea, two-pass diagram, rungs, self-check |
| `SKILL.md` | Skill front-matter + mode router (the 5 verbs) + the two governing rules |
| `THE-COUNCIL.md` | **The only file participants edit.** Seat template + one worked example seat (AC-01 Retail with 2 criteria) + council settings (quorum, thresholds, abstention) |
| `reference/next.md` | 🧭 guide: rungs, per-path finish lines, nudges, the clock |
| `reference/seat.md` | 🎤 seating flow; the "would this score differently for a different audience?" test |
| `reference/solo.md` | ⚖️ the control + its pre-scored table + why it can't flag P4 (⛔ never edit) |
| `reference/solo-rubric.json` | machine-readable control + `already_scored` + `output_contract` (extended by council with seat/source/confidence) |
| `reference/convene.md` | 🎞️ Pass 1 procedure: independent per-seat scoring, the debate, the coverage line, compare-to-solo |
| `reference/greenlight.md` | 🟢 Pass 2: build orders → portfolio → re-score → greenlight verdict; per-path "how real is Pass 2" |

### Facilitator materials — `.../the-greenlight/facilitator/`
| File | Purpose |
|---|---|
| `BRIEF.md` | The full owner/design brief. Business problem, mechanic (mermaid), two rules, rungs × 3 tools, what gets graded, run of show, learning outcomes, **7 open items** |
| `JUDGING-RUBRIC.json` | Grades **teams**. 7 weighted criteria (distinct_seats 3 · outcome_criteria 3 · backed_debate 3 · **severity_discrimination 4** · transformation_plan 3 · coverage 2 · path_finish_line 2 = 60 pts). Deductions incl. "one reviewer in costumes" cap, greenlight_symmetry, false-red on P1, severity_over_detection (REVISE-on-P4 caps at 1) |
| `PICK-YOUR-PATH.md` | Participant-facing path chooser + per-path rung-by-rung build + mixed-team guidance |

### Docs (VitePress site) — `docs/`
| File | Purpose |
|---|---|
| `scenarios/scenario-2-greenlight.md` | The scenario brief page (villain complaint, done-looks-like, two-pass mechanic, the two rules, two shared beats, path links) |
| `build/base-scenario-2.md` | 🟢 build page — seat→convene→greenlight→automate; finish v4 |
| `build/builder-scenario-2.md` | 🔵 build page — seat-agents + synthesizer + responder + publish/swap; finish v5 |
| `build/advanced-scenario-2.md` | 🟣 build page — parallel scorecards + judge + deterministic checks + coverage matrix + PR gate; finish v7 |

### This file
- `Allfiles/scenario-2-greenlight/HANDOFF.md` (you're reading it).

---

## 6. Exact git / repo state

- **Remotes:** `origin` = `https://github.com/dahans-msft2/Team-Week-Imagineer-Hack.git` (Darrin's **fork** — the only push target). `upstream` = `MicrosoftLearning/Team-Week-Imagineer-Hack.git` (**never pushed to**).
- **Working repo path (Windows):** `C:\Users\dahans\OneDrive - Microsoft\Documents\Microsoft Scout\Imagineer-Hack\work`
- **Commit identity used** (matches Darrin's existing commits; required because GitHub blocks the private `@microsoft.com` email): `dahans-msft2 <49003767+dahans-msft2@users.noreply.github.com>`.
- **Branches** (all on the fork):
  - `main` — upstream baseline; Scenario 1 (Digital Twin) locked. **Neither the data-pack nor any Scenario 2 kit exists on `main`.**
  - `scenario-2-screening-room` — original lens take (`Allfiles/screening-room/`).
  - `scenario-2-the-critic` — the rename of Screening Room (`Allfiles/the-critic/`). *(Cleaned this session: removed a stray partial `the-greenlight/` WIP that a parallel session had accidentally committed here.)*
  - **`scenario-2-greenlight`** — this work. Cut from `main`.
- **`scenario-2-greenlight` commit history** (newest first):
  - `25951d8` Rebuild scenario-2 build pages for The Greenlight council; fix kit path
  - `7071973` Reorganize Allfiles into per-scenario folders (scenario-1-digital-twin, scenario-2-greenlight)
  - `cbb964d` update sibling references to 'The Critic' (post-rename)
  - `adb7f5a` docs scenario page
  - `f0d6d21` facilitator BRIEF, JUDGING-RUBRIC.json, PICK-YOUR-PATH
  - `16ed979` reference verbs + solo rubric json
  - `8331182` alternate Scenario 2 kit (WIP) + shared data-pack
- **Everything is pushed.** `origin/scenario-2-greenlight` == local HEAD.

### The `Allfiles/` reorganization (important)
This session a working-tree change (from a parallel session) restructured `Allfiles/` from a flat layout into **per-scenario folders**. It's committed on this branch as clean renames:
```
Allfiles/
  scenario-1-digital-twin/   (digital-twin-starter, persona-pack, twin-forge)
  scenario-2-greenlight/     (data-pack, the-greenlight, the-greenlight-starter[empty])
```
`the-greenlight-starter/` is an **empty dir** (git doesn't track empty dirs, so it may not appear on clone — recreate it, or the Advanced build page tells participants their runner/checks live there).

---

## 7. ⚠️ Hazards & lessons from this session (read before you start editing)

1. **Concurrent sessions on one working copy are dangerous.** Twice this session an uncommitted set of Greenlight files was **wiped by a branch switch** performed by a *parallel* chat session sharing the same `work/` checkout. Lesson for VS Code: **commit early and often**, and don't run two agents against the same working tree. All current work is safely committed + pushed, so you're starting clean.
2. **Do not push to `upstream`.** Only `git push origin`. Confirmed convention.
3. **Email privacy:** commits must use `49003767+dahans-msft2@users.noreply.github.com` or GitHub rejects the push (GH007).
4. **Shared data pack:** `data-pack/` is shared conceptually with The Critic. Changing content invalidates the solo critic's pre-scored table and both scenarios' examples. Don't casually edit P1–P5 or the cards.
5. **Never edit the solo critic** (`solo.md` / `solo-rubric.json`) as part of a build — it's the control. This is stated in the kit but worth repeating.
6. **Two schema files are referenced but not present:** `solo-rubric.schema.json` and `judging-rubric.schema.json` are named in `$schema` keys but were never created (the Critic branch has analogous ones). Optional to add; JSON validates fine without them.

---

## 8. Open items / TODO for the VS Code session

From the BRIEF's open-items list plus session notes:

1. **Prove v4** (scheduled/triggered convene in a real attendee tenant) — it's Base's finish line, so it's load-bearing. Verify before instructions lock.
2. **Screening Room/The Critic vs The Greenlight** — decide whether **both ship as a participant choice** or one is primary. This affects the shared `docs/build/*-scenario-2.md` filenames (see #3).
3. ⚠️ **Build-page filename collision risk.** The Critic branch and this branch both define `docs/build/{base,builder,advanced}-scenario-2.md` and `docs/scenarios/scenario-2*.md`. If they're ever merged into one site, decide whose Scenario 2 build pages win, or namespace them (e.g. `-scenario-2-critic` vs `-scenario-2-greenlight`). *Currently isolated per branch, so no conflict yet.*
4. **Build the Advanced starter** — `the-greenlight-starter/` is empty. The Advanced build page assumes participants write a council runner + deterministic checks there. Consider shipping a skeleton runner + 1–2 example `check_*` functions (The Critic branch shipped `screening-room-starter/checks.py` with `check_reading_time` + `check_banned_terms` as a model to adapt).
5. **Seats-per-team** guidance depends on final team size (600 ÷ ?). Two seats is the floor for a split.
6. **Debate-quality grading at scale** — hardest thing to grade for 600 teams. Consider requiring a "one conflict, same passage, opposite verdicts" artifact to make `backed_debate` mechanically checkable.
7. **Validate the judging weights** — designed from the P4 finding, not tested. Run ~10 sample submissions before locking.
8. **Wire the level pages** — `docs/levels/{base,builder,advanced}/index.md` still say "Scenario 2 — Coming soon." Update to link the Greenlight build pages if this take advances.
9. **Confirm with Cameron Percy** that "persona-lization" is the slide-9 outcome and that the orchestration-forward framing lands.
10. **Optional:** add the two `*.schema.json` files (#7 in Hazards).

---

## 9. Quick-start for the next session

```powershell
cd "C:\Users\dahans\OneDrive - Microsoft\Documents\Microsoft Scout\Imagineer-Hack\work"
git fetch origin
git switch scenario-2-greenlight
git config user.email "49003767+dahans-msft2@users.noreply.github.com"   # if not already set
git config user.name  "dahans-msft2"
# work, then:
git add -A && git commit -m "..." && git push origin scenario-2-greenlight
```

To preview the docs site: it's a VitePress project at repo root (`package.json`, `docs/`). `npm install` then the dev script if you want to eyeball the build pages.

Kit entry point for testing the skill itself: install `Allfiles/scenario-2-greenlight/the-greenlight/` and say *"seat the council"* — or *"what do I do next?"*. First convene to run is **P4** (the money shot: Retail REJECT vs Compliance SHIP).

---

*End of handoff. The whole scenario turns on one sentence: a single reviewer can tell you whether content is good; only a room of the actual audiences can tell you whether it's good for everyone it was sent to — and, when it isn't, what to build instead.*
