---
title: The Ambassador - Scout
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🎖️ The Ambassador

::: warning 🚧 Work in progress
Scenario 3 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in Microsoft Scout. You describe what you want; Scout writes it.**

<div class="brief">
  <span class="brief-badge">The handoff</span>
  <p class="brief-lead">The AI Skilling Ambassador program runs on people who volunteer for it, and it has to keep them. The person who ran it left halfway through.</p>
  <p>72 ambassadors across nine regions do it on top of their real jobs: office hours, answering questions, mentoring one-on-one, and writing the quickstart guides everyone else leans on. Nobody is paid for it, so the program runs on what it can offer back: an invitation in, a facilitation slot, a nomination, a sponsor conversation. Last round five people withdrew and seven were passed over.</p>
  <p>The <strong>Ambassador skill</strong> they left behind picks the next cohort. It reads <code>DEFINITION.md</code>, applies it to the candidates, and comes back with eight names, a reason for each, and what to offer them. It is fast, it is confident, and it cannot show its work.</p>
  <p class="brief-ask">Ship something that finds someone the skill misses, shows the evidence behind every claim, and lets a person overrule it. Then give it somewhere to run.</p>
  <ul class="brief-stats">
    <li><strong>9</strong> data files, <strong>1</strong> read</li>
    <li><strong>0</strong> claims checked against a record</li>
    <li><strong>72</strong> candidates, <strong>~2,000</strong> evidence records</li>
  </ul>
</div>

::: details New to Scout?
An agentic assistant that runs on your machine. Two things plug into it:

- **Microsoft 365**, through **Work IQ** - your mail, calendar, Teams, files and org context. Nothing to connect, and it only sees what you can already see.
- **GitHub Copilot CLI** - so it can write and run code locally.

For this scenario the second one matters most: Scout can read the program data *and* build something that runs against it, in the same conversation. Setup is in the **[Guides](/bricks/scout-setup)**.
:::

## What you're shipping

Three conditions, plus one that only Scout can do. How you meet them is yours.

| | Condition |
| --- | --- |
| **1** | It finds someone the shipped skill misses |
| **2** | Every claim it makes points at a record that supports it |
| **3** | A person can overrule it, and the next run remembers |
| **4** | It runs again without you |

Nothing says which to do first. A table that ships one condition well beats a table that half-ships four.

::: warning Nothing gets sent
Invitations and nominations are drafted and held for a person to read. Keep that in whatever you build.
:::

## How this runs

| | | Time |
| --- | --- | --- |
| **1** | **Run it, and swap the definition** | 20 min |
| **2** | **Build** | 60 min |
| **3** | **Show it** | 20 min |

Do step 1 on your own. Everything after is the table.

**Everything stays local.** Nothing is hosted, nothing leaves your machine, and nothing is sent to anyone in the data.

## Before you start

**Check Scout is signed in.** Ask it anything and confirm you get an answer back.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-skill.zip" download>
    <span class="lab-card-emoji">🎖️</span>
    <span class="lab-card-title">Ambassador</span>
    <span class="lab-card-desc">The skill, the definition it runs on, and three alternatives. Unzip and import the folder.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-program-data.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Program data</span>
    <span class="lab-card-desc">72 candidates and ~2,000 evidence records across nine files.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**The data is fictional.** Invented people, invented scores, invented feedback. Nothing here describes a real person and no real program is being modeled.

::: tip Two places to get unstuck
Ask Scout: it's building with you, so paste the error or describe what came back wrong. For mechanics like scheduling or running things locally, the **[Guides](/bricks/)** are short how-tos. Coaches are in the room and every table has an SME.
:::

---

## 1 · Run it, and swap the definition

**Done when:** two definitions have given you two different shortlists.

1. Unzip both downloads. Put the `program-data` folder somewhere you can point Scout at.
2. In Scout, open **Extensions** → **Import** and drag in the **`ambassador` folder**. Import the folder, not `SKILL.md`: `references/` holds the definition and the playbook.
3. Start a **new session**. Skills load when a session begins.

Then ask it the question the program exists to answer:

```text
Who should be in the next cohort? The data is in [path to program-data].
```

Eight names, a reason each, and what to offer them. Now change what it's looking for:

```text
Use definitions/depth.md as the definition instead. Re-run and tell me which names changed.
```

Then try `definitions/rising.md`. Same 72 people, and the shortlists barely overlap: `depth.md` and `rising.md` share two names out of eight, and each surfaces four people no other definition finds.

The definition is plain prose in a file. Open `references/DEFINITION.md`, write what your program would look for, and re-run.

### What it can't do

Ask it directly:

```text
What did you not read, and which of your claims aren't backed by a record?
```

It reads `CandidateProfiles.csv` and nothing else. It can say someone's work "gets reused across teams" because a summary score is high, with nothing in `ProgramContributions.csv` behind it. And running it twice gives you two shortlists with nowhere to record that you disagreed.

Those are the conditions, and they're where the next 60 minutes go.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>One line each: which definition did you run, and one name it found that the shipped one missed. Anyone whose skill isn't loading, say so now rather than at the end.</p>
  </div>
</div>

## 2 · Build

**Done when:** one condition is met, on real output, with a name on screen.

### Where the room is

Eight files shipped with the program and the skill opens none of them:

| File | Rows | What it holds |
| --- | --- | --- |
| `CommunityActivities.csv` | 866 | What people ran, for whom, at what quality |
| `ProgramContributions.csv` | 390 | What they made, whether it was reused, teams reached |
| `PeerFeedback.csv` | 283 | Sentiment, theme, how well evidenced |
| `LearningCredentials.csv` | 275 | Completed, facilitated, coached |
| `RecognitionHistory.csv` | 128 | Who's been recognized before |
| `AmbassadorApplications.csv` | 41 | Who put their hand up |

Point Scout at one and say what to do with it. Point it at all six at once and you won't know which file changed the shortlist.

### Ideas, not instructions

Starting points if you want one. Take one, combine two, or ignore all of them.

| | |
| --- | --- |
| 🖥️ **A board** | A local page you open: who's proposed, the evidence behind each, what changed since last run |
| 🔍 **Give it the evidence** | Read peer feedback or contributions and weigh them. Different people surface |
| 🧾 **Make it cite** | Every claim names the file and row behind it, and flags any claim it can't source |
| ✋ **Let a person overrule** | A decisions file the program reads before it recommends, so your call survives |
| ⏰ **A scheduled scan** | Runs on a timer and reports who's newly matching, not the whole list again |
| 🕳️ **Find the blind spot** | Break the definition into claims and check which ones the data cannot answer |
| 🎯 **Yours** | Whatever the conditions suggest to you |

**Pick by what your table would still run next time round**, not by what sounds most impressive.

::: tip Definition, playbook, capability
`references/DEFINITION.md` is what the program wants. `references/PLAYBOOK.md` is how the program runs. A new capability, like reading another file or checking a claim, belongs in its own `references/*.md`. The skill's instructions point Scout toward that structure.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Two minutes round the table: which condition are you going after, and who's doing what? Out loud, before anyone opens Scout.</p>
  </div>
</div>

### Build in layers

Get one real name on screen end to end before you add anything:

1. **The smallest version** - *"Build the smallest version that runs end to end. Start simple."*
2. **The evidence** - *"Now make every line carry the record behind it, and say which files you read."*
3. **One addition** - *"That works. Now add [one thing]."*
4. **A bound** - *"Cap this at [N] people per run and say what was left out."*
5. **The runtime** - *"If this needs JavaScript, use Scout's bundled Node under `resources/node`, not a bare `node`."*

The more specific your prompt, the less you'll undo:

| Vague | Specific |
| --- | --- |
| *"Build me a dashboard"* | *"A page with one panel: people the definition matches whose evidence sits outside CandidateProfiles.csv."* |
| *"Make it fairer"* | *"Show whether the shortlist skews by region, and flag anyone I can't justify from a record."* |
| *"Make it better"* | *"For each name, cite the file and row that supports the claim."* |

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Halfway: does it run? If not, cut what it does in half and get one real name on screen before adding anything back.</p>
  </div>
</div>

## 3 · Show it

Four tables go up on the main screen, picked for contrast. Have ready:

- The definition you wrote, in one sentence
- One name your build found that the shipped skill missed
- The thing you'd fix first with another hour

## Push it further

1. **Point it at something real** - the skill reads files, and a SharePoint list export is the same shape.
2. **Give it a memory** - a file it writes as well as reads, so it reports what changed since last run.
3. **Make it stop** - a rule that routes thin evidence to a person with a specific question.
4. **Two definitions, one room** - hand another table your definition and compare shortlists on the same data.
5. **Take the definition with you** - `DEFINITION.md` is plain text and works at any altitude.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-3)
