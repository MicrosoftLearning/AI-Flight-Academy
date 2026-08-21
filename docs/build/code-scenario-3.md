---
title: The Ambassador – Code
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🎖️ The Ambassador

::: warning 🚧 Work in progress
Scenario 3 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in code – VS Code, GitHub Copilot, and Python.**

Imagine you've just inherited someone else's half-finished work.

The plumbing is done: `data.py` loads all nine data files and attaches every activity, comment and contribution to the right candidate. The judgment isn't. `evaluate.py` scores people on three columns, ignores the rest, and ranks with total confidence.

It's about ninety lines. It's meant to be replaced.

## What you're solving

A thousand people are doing community work. Some of them are quietly making everyone around them better; some are just busy. The program is supposed to find the first group.

The version you've inherited ranks on `BusinessImpact`, `ExecutionReliability` and `LeadershipSignals`. Those are the numbers that were already being reported, so those are the numbers it uses. Sitting in the same rows, unread: peer support, knowledge sharing, community contribution, multiplier behavior. Sitting in the same folder, loaded but never scored: 866 activities, 283 peer comments, 390 contributions, 275 credentials, 128 recognition events, 41 applications.

**The challenge is to replace the judgment, and to build something that runs without you.**

## How this runs

**Whatever you build has to run without a chat window.** A command, a scheduled job, a report generator, a local service – that's the bar, and it's the only rule.

| | Step | Time |
| --- | --- | --- |
| **1** | **Run it and see the hole** | 15 min |
| **2** | **Build something headless** – pick a direction, split it across your table | 85 min |

Step 1 is on your own. Step 2 is where the table works together, and it's most of the session.

## Before you start

::: warning The data is fictional
Invented people, invented scores, invented feedback. Nothing here describes a real person and no real program is being modeled — which is what makes it safe to argue about in a room. `program-data/DISCLAIMER.md` has the details.
:::

**Python 3.10+.** The starter has no dependencies — standard library only.

<a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">Half a program that runs, the nine data files it half-reads, and the playbook it's supposed to follow.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

::: tip Two places to get unstuck
Ask Copilot – it's building with you, so paste the error and let it fix it. For general mechanics the **[Guides](/bricks/)** are short how-tos. Coaches are in the room and every table has an SME.
:::

---

## 1 · Run it and see the hole

**Done when:** you can point at the line that put the wrong person second.

Unzip the starter and open the folder in VS Code. **Every command runs from inside `ambassador-starter/`:**

```bash
cd ambassador-starter
python run.py
```

```text
ambassador-starter/
  run.py                  the entry point
  program/
    data.py               loads every CSV, attaches evidence to candidates
    evaluate.py           decides the rung. This is the half that was built
  program-data/           72 candidates, ~2,000 evidence records
  PLAYBOOK.md             the program's rules and ladder
```

You get a shortlist, and a note at the bottom telling you what the run ignored. Two things in that output are wrong on their face:

| Look at | What you'll find |
| --- | --- |
| **Who's second** | Someone whose delivery numbers are excellent and whose community evidence is thin. `--who` shows both |
| **The top rung** | 16 of 72 people on it. A top rung holding 22% of the field isn't a top rung |

Look one person up in full:

```bash
python run.py --who "Alex Kim"
```

You get their score, their evidence, and a `NOT READ:` line listing what was loaded and skipped for that person — unused score columns, activities, peer feedback, contributions, credentials, recognition history, applications. Then read their `Watchouts` field in `CandidateProfiles.csv`.

The rest of the CLI:

```bash
python run.py --all                 # all 72, each with what was ignored
python run.py --export register.csv # the whole thing as CSV
```

### Where the hole is

Open `program/evaluate.py`. The top of the file is the entire problem:

- `WEIGHTS` names three fields. `PeerSupport`, `KnowledgeSharing`, `CommunityContribution` and `MultiplierBehavior` are in the same rows and never scored.
- Eight of the nine files are loaded by `data.py` and never touched here.
- **R-004** (prior recognition isn't a reason to recognize again) and **R-006** (repeated activity with weak quality doesn't outrank quieter high-multiplier work) are in `PLAYBOOK.md` and not in the code.

`PLAYBOOK.md` is what the program is supposed to do. `evaluate.py` is what it does. The gap between them is the work.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Everyone name the person the ranking got wrong, and the column that would have caught it. Did you all pick the same one?</p>
  </div>
</div>

## 2 · Build something headless

**Done when:** something runs from a command, produces output you'd act on, and nobody had to type into a chat window.

Fixing the weights takes five minutes and is not the exercise. **Replacing `evaluate.py` is the floor, not the goal** — the goal is what you build once the recommendations are worth trusting.

One constraint to keep you past a refactor: **whatever you build has to answer a question `run.py` can't answer today.**

### Pick a direction

Seven starting points. Take one, combine two, or build what the program obviously needs.

| | What it is | Where to start |
| --- | --- | --- |
| 🖥️ **A board** · easiest | Generate a local HTML page: who's ready, who needs a decision, what changed since last run | Write alongside `run.py`, output a single self-contained file you open in a browser |
| 🔍 **Recruitment** | Find the emerging people the ranking buries, and draft an invitation for each | Rank on peer and community evidence, filter to low overall rank, template the output |
| ⏰ **A scheduled scan** | Runs on a timer and reports the *diff* — who moved rung, who's newly ready | Persist each run, compare against the last one. This needs somewhere to write state |
| 🧭 **Manager's view** | One file per manager: their people, each rung, one next action each | Group by the org field, generate per group |
| ⚖️ **Fairness audit** | Whether outcomes skew by region, org, level or tenure — and which rungs can't be explained | A second pass over the results, not a change to scoring |
| 🎖️ **Their own view** | What a candidate would see about themselves, generated per person | Hardest test of your reasoning — if it can't be shown to them, it isn't defensible |
| 🎯 **Yours** | Whatever your table thinks this program is missing | Smallest version that runs first |

**Pick by what would actually get run**, not by what's most impressive to describe.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Two minutes round the table: what are you building, and who would run it? Out loud, before anyone opens the editor. If another table could demo the same thing with different labels, narrow it.</p>
  </div>
</div>

### Split the work

`evaluate.py` is one file, so **don't put four people in it.** Split by output instead:

| | Owns |
| --- | --- |
| **The scoring** | One person replaces `evaluate.py` and nobody else touches it |
| **A reader** | One person per evidence file — turn raw records into a signal the scorer can use |
| **The output** | The board, the brief, the export — builds against whatever the scorer returns |
| **The check** | The fairness audit or the diff — runs *on* the results, so it can be built in parallel |

The reader-per-file split is the one that scales: `PeerFeedback.csv`, `ProgramContributions.csv`, `CommunityActivities.csv` and `RecognitionHistory.csv` are four independent builds, and each one changes who's on the list.

Agree the shape of what the scorer returns early, then work against it. That's the only coupling you need.

### Build in layers

1. **The smallest version** — get one new signal into the ranking and see who moves.
2. **Names, not adjectives** — print who moved after every change. *"More balanced"* isn't checkable; *"Drew Foster entered the top ten"* is.
3. **One addition** — one file, one rule, one panel at a time.
4. **Make it explain itself** — every recommendation should carry the evidence and the rule that decided it. That's **R-005**.

::: tip Let Copilot do the plumbing
`data.py` already hands you every evidence record attached to its candidate, so most of what's left is judgment rather than parsing. Paste `PLAYBOOK.md` into Copilot and ask it to implement **R-006** against the data you've got — then check whether the result actually moved the right people.
:::

::: warning Nothing gets sent
Invitations, nominations and recognition are drafted and held for a person to read. That's **R-005**, and it's in the playbook — the program proposes, a human decides. Keep that in whatever you build.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Halfway: does it run? If not, halve what it does and get <em>something</em> working before adding anything back.</p>
  </div>
</div>

## Push it further

1. **Make it defend a call** — a command that takes a name and explains why they didn't make the list. R-008 applies.
2. **Break it on purpose** — write a candidate who should obviously be recognized, add them to the data, and see whether your version finds them.
3. **Test the rules** — a test per playbook rule, so a scoring change that breaks R-002 fails loudly.
4. **Give it a memory** — persist each run so the program can report change rather than state.
5. **Take the playbook with you** — `PLAYBOOK.md` is plain text and moves to another altitude unchanged.
6. **Swap tables** — hand another table your scorer and have them run it against the same data. Different rules, different ambassadors.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-3)
