---
title: The Ambassador - Code
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🎖️ The Ambassador

::: warning 🚧 Work in progress
Scenario 3 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in code - VS Code, GitHub Copilot, and Python.**

<div class="brief">
  <span class="brief-badge">The handoff</span>
  <p class="brief-lead">The AI Skilling Ambassador program has to decide who gets recognized, who gets invited in, and who's ready for more. The person who ran it left halfway through.</p>
  <p>72 people across nine regions do it on top of their real jobs: office hours, answering questions, mentoring one-on-one, and writing the quickstart guides everyone else leans on. Recognition is the only thing the program has to give back, so who gets named matters.</p>
  <p>The plumbing they left is fine: <code>data.py</code> loads all nine data files and attaches every activity, comment and contribution to the right candidate. <code>evaluate.py</code> is the problem. It scores three delivery columns, ignores the rest, then sorts all 72 people into five tiers from Explorer up to Flight Lead.</p>
  <p><code>evaluate.py</code> reads one of those nine files. The other eight hold what an ambassador actually does: whose guide got reused, who unblocked somebody, whose name a peer brings up. <code>data.py</code> already loaded every one of them.</p>
  <p class="brief-ask">Replace <code>evaluate.py</code>, then build a command, a scheduled job or a generated report that runs the result without a chat window.</p>
  <ul class="brief-stats">
    <li><strong>9</strong> data files loaded, <strong>1</strong> scored</li>
    <li><strong>4</strong> scored columns ignored</li>
    <li><strong>2</strong> playbook rules unimplemented</li>
    <li><code>evaluate.py</code> is <strong>~90</strong> lines</li>
  </ul>
</div>

## How this runs

**Build a command, a scheduled job, a report generator or a local service.** Anything that runs without a chat window counts, and that's the only rule.

| | Step | Time |
| --- | --- | --- |
| **1** | **Run it and see the hole** | 15 min |
| **2** | **Build something headless** - pick a direction, split it across your table | 85 min |

Do step 1 on your own. In step 2 the table picks one output and splits it across scoring, evidence readers, and the output itself.

## Before you start

::: warning The data is fictional
Invented people, invented scores, invented feedback. Nothing here describes a real person and no real program is being modeled. `program-data/DISCLAIMER.md` has the details.
:::

**Python 3.10+.** The starter has no dependencies - standard library only.

<a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">Half a program that runs, the nine data files it half-reads, and the playbook it's supposed to follow.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

::: tip Two places to get unstuck
Ask Copilot - it's building with you, so paste the error and let it fix it. For general mechanics the **[Guides](/bricks/)** are short how-tos. Coaches are in the room and every table has an SME.
:::

---

## 1 · Run it and see the hole

**Done when:** you can point at the lines in `evaluate.py` that put the wrong person second.

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
    evaluate.py           decides the tier. This is the half that was built
  program-data/           72 candidates, ~2,000 evidence records
  PLAYBOOK.md             the program's rules and tiers
```

You get a shortlist and a note at the bottom listing what the run ignored. Two things in it are wrong on their face:

- **Alex Kim ranks second.** Their `Watchouts` field in `CandidateProfiles.csv` reads *"limited evidence of peer enablement or community lift."*
- **16 of 72 people are Flight Lead.** That tier is meant for sustained impact across a region.

Look Alex Kim up in full:

```bash
python run.py --who "Alex Kim"
```

The `NOT READ:` line lists what `data.py` loaded for that person and `evaluate.py` skipped: four score columns, 13 activities, 4 peer comments, 2 contributions, 5 credentials, 1 recognition record, 1 application.

The rest of the CLI:

```bash
python run.py --all                 # all 72, each with what was ignored
python run.py --export register.csv # the whole thing as CSV
```

### Where the hole is

Open `program/evaluate.py`. The top of the file is the entire problem:

- `WEIGHTS` names three fields. `PeerSupport`, `KnowledgeSharing`, `CommunityContribution` and `MultiplierBehavior` sit in the same rows and are never scored.
- `data.py` loads nine files. This one reads a single file's columns.
- **R-004** (prior recognition isn't a reason to recognize again) and **R-006** (repeated activity with weak quality doesn't outrank quieter high-multiplier work) are in `PLAYBOOK.md` and not in the code.

`PLAYBOOK.md` says what the program is supposed to do. `evaluate.py` does something narrower. Closing that distance is step 2.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Everyone name the person the ranking got wrong, and the column that would have caught it. Did you all pick the same one?</p>
  </div>
</div>

## 2 · Build something headless

**Done when:** one command reads the data and writes a shortlist, brief, audit or diff, with names and evidence in it.

Fixing the weights takes five minutes and is not the exercise. **Replacing `evaluate.py` is the floor, not the goal** - the goal is what you build once the recommendations are worth trusting.

One constraint to keep you past a refactor: **whatever you build has to answer a question `run.py` can't answer today.**

### Pick a direction

Seven starting points. Take one, combine two, or name something the program is missing and build that instead.

| | What it is | Where to start |
| --- | --- | --- |
| 🖥️ **A board** · easiest | Generate a local HTML page: who's ready, who needs a decision, what changed since last run | Write alongside `run.py`, output a single self-contained file you open in a browser |
| 🔍 **Recruitment** | Find the emerging people the ranking buries, and draft an invitation for each | Rank on peer and enablement evidence, filter to low overall rank, template the output |
| ⏰ **A scheduled scan** | Runs on a timer and reports the *diff* - who moved tier, who's newly ready | Persist each run, compare against the last one. This needs somewhere to write state |
| 🧭 **Manager's view** | One file per manager: their people, each tier, one next action each | Group by the org field, generate per group |
| ⚖️ **Fairness audit** | Whether outcomes skew by region, org, level or tenure - and which tiers can't be explained | A second pass over the results, not a change to scoring |
| 🎖️ **Their own view** | What one candidate would read about their own standing, generated per person | Hardest test of your scoring: if you can't show it to them, it isn't defensible |
| 🎯 **Yours** | Whatever your table thinks this program is missing | Smallest version that runs first |

**Pick the one your table would still run next time round**, not the one that sounds most impressive.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Two minutes round the table: what are you building, and who runs it? Out loud, before anyone opens the editor. If another table could demo the same thing with different labels, narrow it.</p>
  </div>
</div>

### Split the work

`evaluate.py` is one file, so **don't put four people in it.** Split by output instead:

| | Owns |
| --- | --- |
| **The scoring** | One person replaces `evaluate.py` and nobody else touches it |
| **A reader** | One person per evidence file: turn raw records into a signal the scorer can use |
| **The output** | The board, the brief, the export. Builds against whatever the scorer returns |
| **The check** | The fairness audit or the diff. Runs on the results, so it can be built in parallel |

The reader-per-file split is the one that scales: `PeerFeedback.csv`, `ProgramContributions.csv`, `CommunityActivities.csv` and `RecognitionHistory.csv` are four independent builds, and each one changes who's on the list.

Agree the shape of what the scorer returns early, then work against it. That's the only coupling you need.

### Build in layers

1. **The smallest version** - get one new signal into the ranking and see who moves.
2. **Names, not adjectives** - print who moved after every change. *"More balanced"* isn't checkable; *"Drew Foster entered the top ten"* is.
3. **One addition** - one file, one rule, one panel at a time.
4. **Make it explain itself** - every recommendation carries the evidence and the rule that decided it. That's **R-005**.

::: tip Let Copilot do the plumbing
`data.py` already hands you every evidence record attached to its candidate, so most of what's left is scoring rather than parsing. Paste `PLAYBOOK.md` into Copilot and ask it to implement **R-006** against the data you've got, then check which names moved.
:::

::: warning Nothing gets sent
Invitations, nominations and recognition are drafted and held for a person to read. That's **R-005**, and it's in the playbook. Keep it that way in whatever you build.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Halfway: does it run? If not, cut what it does in half and get one real name on screen before adding anything back.</p>
  </div>
</div>

## Push it further

1. **Make it defend a call** - a command that takes a name and explains why they didn't make the list. R-008 applies.
2. **Break it on purpose** - write a candidate who should obviously be recognized, add them to the data, and see whether your version finds them.
3. **Test the rules** - a test per playbook rule, so a scoring change that breaks R-002 fails loudly.
4. **Give it a memory** - persist each run so the program can report what changed instead of restating the list.
5. **Take the playbook with you** - `PLAYBOOK.md` is plain text, so it runs at the Cowork or Scout altitude unchanged.
6. **Swap tables** - hand another table your scorer and have them run it against the same data. Different rules, different ambassadors.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-3)
