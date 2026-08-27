---
title: The Ambassador - Code
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🎖️ The Ambassador

::: warning 🚧 Work in progress
Scenario 3 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in code - VS Code, GitHub Copilot, and the Copilot CLI.**

<div class="brief">
  <span class="brief-badge">The handoff</span>
  <p class="brief-lead">The AI Skilling Ambassador program runs on people who volunteer for it, and it has to keep them. The person who ran it left halfway through.</p>
  <p>72 ambassadors across nine regions do it on top of their real jobs: office hours, answering questions, mentoring one-on-one, and writing the quickstart guides everyone else leans on. Nobody is paid for it, so the program runs on what it can offer back: an invitation in, a facilitation slot, a nomination, a sponsor conversation. Last round five people withdrew and seven were passed over.</p>
  <p><code>cohort.py</code> picks the next cohort. It reads <code>definition.md</code>, sends all 72 candidates to the model, and comes back with eight names, a reason for each, and a proposed next step. It is fast, it is confident, and it cannot show its work.</p>
  <p class="brief-ask">Ship something that finds someone <code>cohort.py</code> misses, shows the evidence behind every claim, and lets a person overrule it.</p>
  <ul class="brief-stats">
    <li><strong>9</strong> data files loaded, <strong>1</strong> sent to the model</li>
    <li><strong>0</strong> claims checked against a row</li>
    <li><strong>72</strong> candidates, <strong>~2,000</strong> evidence records</li>
  </ul>
</div>

## What you're shipping

Three conditions. How you meet them is yours.

| | Condition |
| --- | --- |
| **1** | It finds someone `cohort.py` misses |
| **2** | Every claim it makes points at a record that supports it |
| **3** | A person can overrule it, and the next run remembers |

Nothing says which of those to do first, or whether you write Python, build agents in `.github/agents/`, or both. A table that ships one condition well beats a table that half-ships three.

::: warning Nothing gets sent
Invitations, nominations and recognition are drafted and held for a person to read. Keep that in whatever you build.
:::

## How this runs

| | | Time |
| --- | --- | --- |
| **1** | **Run it, and swap the definition** | 20 min |
| **2** | **Build** | 60 min |
| **3** | **Show it** | 20 min |

Do step 1 on your own. Everything after is the table.

## Before you start

::: warning The data is fictional
Invented people, invented scores, invented feedback. Nothing here describes a real person and no real program is being modeled. `program-data/DISCLAIMER.md` has the details.
:::

**Python 3.10+** and the **GitHub Copilot CLI**, signed in:

```bash
copilot --version
```

Missing? `npm install -g @github/copilot`, then run `copilot` once to sign in.

<a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">A working cohort picker, three alternative definitions, and the nine data files.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

::: tip Two places to get unstuck
Ask Copilot - it's building with you, so paste the error and let it fix it. For general mechanics the **[Guides](/bricks/)** are short how-tos. Coaches are in the room and every table has an SME.
:::

---

## 1 · Run it, and swap the definition

**Done when:** two definitions have given you two different shortlists.

```bash
cd ambassador-starter
python cohort.py
```

Eight names, a reason each, a next step each. Now change what it's looking for:

```bash
python cohort.py --definition definitions/depth.md
python cohort.py --definition definitions/rising.md
```

Same 72 people. `depth.md` and `rising.md` share two names out of eight, and each surfaces four people no other definition finds. The definition is doing the work, and it's plain prose in a file you can edit.

Open `definition.md` and write what your program would look for. Re-run.

Then read **What it does not do** in the README. Those are the three conditions, and they're where the next 60 minutes go.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>One line each: which definition did you run, and one name it found that the shipped one missed. Anyone whose CLI isn't working, say so now rather than at the end.</p>
  </div>
</div>

## 2 · Build

**Done when:** one condition is met, on real output, with a name on screen.

### Where the room is

Everything is loaded and nothing is used. `data.py` attaches every record to its candidate:

| File | Rows | What it holds |
| --- | --- | --- |
| `CommunityActivities.csv` | 866 | What people ran, for whom, at what quality |
| `ProgramContributions.csv` | 390 | What they made, whether it was reused, teams reached |
| `PeerFeedback.csv` | 283 | Sentiment, theme, how well evidenced |
| `LearningCredentials.csv` | 275 | Completed, facilitated, coached |
| `RecognitionHistory.csv` | 128 | Who's been recognized before |
| `AmbassadorApplications.csv` | 41 | Who put their hand up |

`cohort.py` sends none of it. It sends a summary line per person.

### Ideas, not instructions

Starting points if you want one. Take one, combine two, or ignore all of them.

| | What it is | Where to start |
| --- | --- | --- |
| 🔍 **Recruitment** · easiest | The people one file can't see, with an invitation drafted for each | Send `PeerFeedback.csv` rows instead of profile summaries, then diff your shortlist against the shipped one |
| 🥊 **A second opinion** | One agent picks, another argues against it from the same evidence | Two calls, opposed instructions. `.github/agents/*.agent.md`, and they can run different models. Keep the disagreement in the output instead of resolving it |
| 🔄 **The run-to-run diff** | What changed since last time, not the whole list again | Persist each run to disk, compare by `CandidateId` |
| ⚖️ **Fairness audit at scale** | Whether a skew is real or just one run's noise | Loop the same definition ten times, collect the shortlists, count how often each name survives |
| 🎖️ **Their own view** | What each candidate would read about their own standing, generated per person | One call per name, from that person's records only. Hardest to get right, most useful if you do |
| 🎯 **Yours** | Whatever your table thinks this program is missing | Smallest version that runs first |

**Pick by what your table would still run next time round**, not by what sounds most impressive.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Two minutes round the table: which condition are you going after, and who's doing what? Out loud, before anyone opens the editor.</p>
  </div>
</div>

### Things that will shape what you build

**A call takes 20 to 60 seconds.** It's a full agent turn, not a completion. Anything looping over 72 people takes most of an hour, so bound it early: one region, ten candidates, one definition.

**Pick the model that fits the job.** A long-context model can hold all nine files at once. A faster one is better while you're iterating. Switch in the model picker and compare on the same question.

**Ask for JSON when a program reads the answer.** `ask_json()` appends the instruction, strips a code fence if the model adds one, and hands back a parsed object.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Halfway: does it run? If not, cut what it does in half and get one real name on screen before adding anything back.</p>
  </div>
</div>

## Push it further

1. **Point it at something real** - the starter reads CSVs, but the shape is the same for a SharePoint list or a Teams channel export. Swap the loader, keep everything else.
2. **Package it as a skill** - `.github/skills/<name>/SKILL.md` runs in VS Code, the Copilot CLI, and the GitHub cloud agent.
3. **Two models, one question** - run the same definition through two models and diff the shortlists.
4. **Test the hard cases** - write five candidates you know the answer for, and check your build gets them right.
5. **Take the definition with you** - `definition.md` is plain text and works at any altitude.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-3)
