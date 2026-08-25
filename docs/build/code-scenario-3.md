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
  <p>The plumbing they left is fine: <code>data.py</code> loads all nine data files and attaches every activity, comment and contribution to the right candidate. <code>evaluate.py</code> is the problem. It scores three delivery columns, ignores the rest, then sorts all 72 people into five tiers and names each one's next step: invite, offer a slot, nominate, sponsor.</p>
  <p><code>evaluate.py</code> reads one of those nine files. The other eight hold what an ambassador actually does: whose guide got reused, who unblocked somebody, whose name a peer brings up. <code>data.py</code> already loaded every one of them.</p>
  <p><code>agent.py</code> calls the Copilot CLI from Python, so the program can ask for judgment as well as compute a number. One worked example uses it. Nothing else does yet.</p>
  <p class="brief-ask">Fix what the program decides, then build an agent that acts on it: a brief, an audit, a scheduled scan, a service another agent can call.</p>
  <ul class="brief-stats">
    <li><strong>9</strong> data files loaded, <strong>1</strong> scored</li>
    <li><strong>4</strong> scored columns ignored</li>
    <li><strong>2</strong> playbook rules unimplemented</li>
    <li><code>evaluate.py</code> is <strong>~90</strong> lines</li>
  </ul>
</div>

## How this runs

**Build something that runs without a chat window and calls the model where judgment is needed.** A command, a scheduled job, a report generator, a local service. That's the only rule.

| | Step | Time |
| --- | --- | --- |
| **1** | **Run it and see the hole** | 15 min |
| **2** | **Build the agent** - pick a direction, split it across your table | 85 min |

Do step 1 on your own. In step 2 the table picks one output and splits it across scoring, evidence readers, and the agent calls.

## Before you start

::: warning The data is fictional
Invented people, invented scores, invented feedback. Nothing here describes a real person and no real program is being modeled. `program-data/DISCLAIMER.md` has the details.
:::

**Python 3.10+** and the **GitHub Copilot CLI**, signed in:

```bash
copilot --version
```

Missing? `npm install -g @github/copilot`, then run `copilot` once to sign in. The starter has no other dependencies.

<a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">Half a program that runs, an agent call wired up, the nine data files, and the playbook it's supposed to follow.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

::: tip Two places to get unstuck
Ask Copilot - it's building with you, so paste the error and let it fix it. For general mechanics the **[Guides](/bricks/)** are short how-tos. Coaches are in the room and every table has an SME.
:::

---

## 1 · Run it and see the hole

**Done when:** you've briefed one of the top ten and can say whether their tier holds up.

Unzip the starter and open the folder in VS Code. **Every command runs from inside `ambassador-starter/`:**

```bash
cd ambassador-starter
python run.py
```

```text
ambassador-starter/
  run.py                  the entry point
  agent.py                ask() and ask_json() - calls the Copilot CLI
  program/
    data.py               loads every CSV, attaches evidence to candidates
    evaluate.py           scoring and tier assignment
  examples/
    brief.py              worked example: code scores, the model writes the case
  program-data/           72 candidates, ~2,000 evidence records
  PLAYBOOK.md             the program's rules and tiers
```

Two things about what comes back:

- **Ten people, all within two points, all with the same next action.** As a shortlist for who to contact first, it doesn't say anything.
- **16 of 72 are Flight Lead.** Count them with `--all`. A top tier holding a fifth of the program isn't a top tier.

Every line's `NOT READ:` says the same thing: four score columns in `CandidateProfiles.csv` were loaded and never scored, along with everything in the other eight files.

```bash
python run.py --all                 # all 72, each with what was ignored
python run.py --who "Alex Kim"      # one candidate in full
python run.py --export register.csv # the whole thing as CSV
```

### So which of those ten belong there?

The score can't separate them. It gave them nearly the same number. Ask instead:

```bash
python examples/brief.py "Alex Kim"
```

`evaluate.py` computes the tier. `agent.py` sends the same evidence to the Copilot CLI and asks for the case for it, the case against, and what's thin - including the columns the score ignored.

Run it on a second name from that list and compare what each one says is thin.

**Code decides, the model explains.** A score is reproducible and defensible, and says nothing a program owner can act on. A model call reads 30 scattered records and writes the case, and has no business assigning a tier. Neither does the other's job.

A call takes 20 to 60 seconds, so anything looping over all 72 people needs a bound.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>One line each: which name did you brief, and what did it say was thin? Anyone whose CLI isn't working, say so now rather than at the end.</p>
  </div>
</div>

### Where the hole is

Open `program/evaluate.py`. The top of the file is the entire problem:

- `WEIGHTS` names three fields. `PeerSupport`, `KnowledgeSharing`, `CommunityContribution` and `MultiplierBehavior` sit in the same rows and are never scored.
- `data.py` loads nine files. This one reads a single file's columns.
- **R-004** (prior recognition isn't a reason to recognize again) and **R-006** (repeated activity with weak quality doesn't outrank quieter high-multiplier work) are in `PLAYBOOK.md` and not in the code.

`PLAYBOOK.md` says what the program is supposed to do. `evaluate.py` does something narrower. Closing that distance is step 2.

## 2 · Build the agent

**Done when:** one command reads the data, decides something in code, and uses a model call to produce output a person would act on.

Fixing the weights takes five minutes and is not the exercise. **Replacing `evaluate.py` is the floor, not the goal** - the goal is what you build once the recommendations are worth trusting.

Two constraints to keep you past a refactor:

- **It has to answer a question `run.py` can't answer today.**
- **It has to call the model where judgment is needed**, and keep the scoring in code where it belongs.

### Pick a direction

Seven starting points. Take one, combine two, or name something the program is missing and build that instead.

| | What it is | Where to start |
| --- | --- | --- |
| 🧭 **Manager's brief** · easiest | One file per manager: their people, each tier, and the case for the next action | `examples/brief.py` does one person. Group by org, bound the calls, write one file per group |
| 🖥️ **A board** | A local HTML page: who's ready, who needs a decision, what changed since last run | Generate alongside `run.py`. Use a model call for the summary line on each card, not for the ranking |
| 🔍 **Recruitment** | Find the emerging people the ranking buries, and draft an invitation to each in the program's voice | Rank on peer and enablement evidence in code, then ask for the invitation per person |
| ⏰ **A scheduled scan** | Runs on a timer and reports the *diff* - who moved tier, who's newly ready | Persist each run, compare against the last. Only spend a model call on what changed |
| ⚖️ **Fairness audit** | Whether outcomes skew by region, org, level or tenure, and which tiers can't be explained | Compute the skew in code. Ask the model to explain a tier from evidence and flag where it can't |
| 🎖️ **Their own view** | What one candidate would read about their own standing | Hardest test of your scoring: if you can't show it to them, it isn't defensible. **R-008** applies |
| 🔌 **A tool other agents can call** | The program as an MCP server, so Cowork or Scout can ask it who's ready | Wrap `evaluate_all` and one agent-backed question. See the [MCP guide](/bricks/code-mcp-connector) |
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
| **The prompt** | What goes to the model, what comes back, and how it's bounded. Works against `agent.py` |
| **The output** | The board, the brief, the export. Builds against whatever the scorer returns |

The reader-per-file split is the one that scales: `PeerFeedback.csv`, `ProgramContributions.csv`, `CommunityActivities.csv` and `RecognitionHistory.csv` are four independent builds, and each one changes who's on the list.

Agree the shape of what the scorer returns early, then work against it. That's the only coupling you need.

### Build in layers

1. **The smallest version** - get one new signal into the ranking and see who moves.
2. **Names, not adjectives** - print who moved after every change. *"More balanced"* isn't checkable; *"Drew Foster entered the top ten"* is.
3. **One agent call** - one person, one question, printed. Then bound it before you loop.
4. **Make it explain itself** - every recommendation carries the evidence and the rule that decided it. That's **R-005**.

::: tip Two things that will shape the design
**A call takes 20 to 60 seconds.** It's a full agent turn, not a completion. Anything that calls per-candidate across 72 people takes most of an hour, so bound it in the first version rather than the fifth.

**Ask for JSON when a program reads the answer.** `ask_json()` appends the instruction, strips a code fence if the model adds one, and hands back a parsed object.
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
