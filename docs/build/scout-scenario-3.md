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
  <p>The <strong>Ambassador skill</strong> they left behind still runs. Ask it who should move up and it ranks all 72 people, sorts them into five tiers from Explorer up to Flight Lead, and names the next step for each one: invite, offer a slot, nominate, sponsor. It scores on business impact, execution reliability and leadership signals, the three numbers already sitting on the spreadsheet.</p>
  <p>Nine data files shipped with the program. The Ambassador skill opens one. The other eight hold what an ambassador actually does: whose guide got reused, who unblocked somebody, whose name a peer brings up.</p>
  <p class="brief-ask">Make it find the right people, then build the thing that runs it: a board, a weekly scan, a brief per manager.</p>
  <ul class="brief-stats">
    <li><strong>9</strong> data files, <strong>1</strong> read</li>
    <li><strong>4</strong> scored columns ignored</li>
    <li><strong>2</strong> playbook rules unimplemented</li>
  </ul>
</div>

::: details New to Scout?
An agentic assistant that runs on your machine. Two things plug into it:

- **Microsoft 365**, through **Work IQ** - your mail, calendar, Teams, files and org context. Nothing to connect, and it only sees what you can already see.
- **GitHub Copilot CLI** - so it can write and run code locally.

For this scenario the second one matters most: Scout can read the program data *and* build something that runs against it, in the same conversation. Setup is in the **[Guides](/bricks/scout-setup)**.
:::

## What you'll walk out with

A program that reads evidence, and something that runs it on your machine without you retyping the question.

| What you make | What it does |
| --- | --- |
| **A program that reads evidence** | Recommends people the original ranking couldn't see, and names the evidence behind each one |
| **A playbook you extended** | `PLAYBOOK.md` is the program written down - your rules go in it, and they travel |
| **A board, a scan or a brief** | Opens in a browser, runs on a schedule, or writes one page per manager, straight from the data |

**Everything stays local.** Nothing is hosted, nothing leaves your machine, and nothing is sent to anyone in the data.

## How this runs

| | Step | Time |
| --- | --- | --- |
| **1** | **Run it and catch it being wrong** - find who it ranked too high | 15 min |
| **2** | **Teach it to read** - add evidence, watch who moves | 20 min |
| **3** | **Build the thing that runs it** - pick a direction, split it across the table | 60 min |

Do steps 1 and 2 on your own. In step 3 the table picks one output and each person takes a piece of it.

## Before you start

**Check Scout is signed in.** Ask it anything and confirm you get an answer back.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-skill.zip" download>
    <span class="lab-card-emoji">🎖️</span>
    <span class="lab-card-title">Ambassador</span>
    <span class="lab-card-desc">The half-built skill, plus the playbook it runs on. Unzip and import the folder.</span>
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

## 1 · Run it and catch it being wrong

**Done when:** you can name the person the skill ranked too high, and the column that gives it away.

1. Unzip both downloads. Put the `program-data` folder somewhere you can point Scout at.
2. In Scout, open **Extensions** → **Import** and drag in the **`ambassador` folder**. Import the folder, not `SKILL.md` - `references/PLAYBOOK.md` sits beside it and holds the tiers and the rules.
3. Start a **new session**. Skills load when a session begins.

Then ask it the question the program exists to answer:

```text
Who should we recognize this round? The data is in [path to program-data].
```

You get all 72 people ranked, a tier for each, and a next step. Now run two checks on that answer.

**Check the size of the top tier:**

```text
How many people did you put in Flight Lead?
```

Sixteen, out of 72. Flight Lead is meant for sustained impact across a region, and nearly a quarter of the program does not clear that bar.

**Check the people at the top:**

```text
Show me the Watchouts column for your top five.
```

Read them against the tier each person was given. `Watchouts` is not one of the three columns the skill scores, so nothing in that column reached the ranking.

::: warning It may tell you it only read one file
The skill is written to admit what it skipped, so it often volunteers this. It still ranked all 72 people on that one file.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>One line each: which of the top five looked wrong to you, and what in the data made you say so? Anyone still getting a generic answer, say so now.</p>
  </div>
</div>

## 2 · Teach it to read

**Done when:** you added one evidence file, re-ran, and someone new is in the top ten.

The skill reads `CandidateProfiles.csv`. Eight more files shipped with it:

| File | What it can tell you |
| --- | --- |
| `PeerFeedback.csv` | Whether peers name them, and how strong the evidence is |
| `ProgramContributions.csv` | Whether what they made got reused, and by how many teams |
| `CommunityActivities.csv` | What they ran, for whom, and at what quality |
| `LearningCredentials.csv` | Whether they completed, facilitated, or coached |
| `RecognitionHistory.csv` | Who's already been recognized - see **R-004** |
| `AmbassadorApplications.csv` | Who put their hand up, which is not the same as who's ready |
| `PolicyRules.csv` | R-001 to R-008, the rules the program is supposed to follow |
| `RewardTiers.csv` | The five tiers: Explorer, Connector, Multiplier, Flight Lead, Review Hold |

Start with peer feedback:

```text
Read PeerFeedback.csv too. Add a rule to the playbook: someone whose peers don't name them shouldn't outrank someone whose peers do. Then re-run and tell me which names changed.
```

Compare the new top ten against the old one. If the same people are in it, the rule you wrote isn't doing anything yet - say so and ask it to weigh peer evidence harder.

**Add one file at a time.** Read all eight at once and you won't know which one moved anybody. One file is enough for this step; go back for more if you're ahead.

Two rules in the playbook aren't implemented at all - **R-004** (prior recognition isn't a reason to recognize again) and **R-006** (repeated activity with weak quality doesn't outrank quieter high-multiplier work). Implementing either one changes the list.

::: tip Rules in the playbook, capabilities in their own file
`references/PLAYBOOK.md` holds the tiers, the rules, and what a recommendation must contain, so a new rule goes there. A new capability gets its own `references/*.md`. The skill's instructions point Scout toward that structure.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>One line each: which file did you add, and which name moved. If nothing moved for you, say so - the rule probably needs to be sharper.</p>
  </div>
</div>

## 3 · Build the thing that runs it

**Done when:** one command or one click reruns it against the same data and returns names with evidence.

Ask Scout in a chat and the answer dies with the window. Have Scout write the page, the script or the scheduled job instead, and the next round starts with a command.

### Pick a direction

Seven starting points. Take one, combine two, or name something the program is missing and build that instead.

| | What it is | Start with |
| --- | --- | --- |
| 🖥️ **A board** · easiest | A local page you open: who's up for recognition, who needs a decision, what changed since last time | *"Build me a local page with panels for who's ready, who needs evidence, and who moved. Write it somewhere I can open in a browser."* |
| 🔍 **Recruitment** | The people the ranking buries: strong peer evidence, low overall score | *"Find people with strong peer and enablement evidence who rank low overall. Draft an invitation for each, held for approval."* |
| ⏰ **A scheduled scan** | Runs on a timer and reports only what changed | *"Build a scan I can run once now, then schedule weekly. Report who moved tier and who's newly ready - not the whole list."* |
| 🧭 **Manager's view** | One manager, their people, one next action each | *"Build a one-page brief per manager: their candidates, each one's tier, and the single next action for each."* |
| ⚖️ **Fairness audit** | Whether the tiers skew by region, org, level or tenure, and whether each one can be explained from evidence | *"Audit the recommendations for skew by region, org, level and tenure. Flag any tier you can't explain from evidence."* |
| 🎖️ **Their own view** | What one candidate would read about their own standing | *"Generate what one candidate would see about their own standing: where they are, why, and what would move them up."* |
| 🎯 **Yours** | Whatever your table thinks this program is missing | *"The program needs [what]. Work out what that takes and build the smallest version first."* |

**Pick the one your table would still use next time round**, not the one that sounds most impressive.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Two minutes round the table: what are you building, and who reads it? Out loud, before anyone opens Scout. If another table could demo the same thing with different labels, narrow it.</p>
  </div>
</div>

### Split the work

Pick one direction, then **take one standalone piece each**: one panel, one section of the brief, one rule, one check in the audit. **If it can't run alone, it's too big.**

Split by question, not by layer. *"Who's ready"*, *"who's stopped showing up"*, *"who's been recognized and stalled"* and *"who applied but isn't ready"* are four independent builds of one board.

Share the **prompt that worked** so the next person doesn't rediscover it.

### Build in layers

Get one real name on screen end to end before you add anything:

1. **The smallest version** - *"Build the smallest version that runs end to end. Start simple."*
2. **The evidence** - *"Now make every line carry the evidence behind it, and say which files you read."*
3. **One addition** - *"That works. Now add [one thing]."*
4. **A bound** - *"Cap this at [N] people per run and say what was left out."*
5. **The runtime** - *"If this needs JavaScript, use Scout's bundled Node under `resources/node`, not a bare `node`."*

The more specific your prompt, the less you'll undo:

| Vague | Specific |
| --- | --- |
| *"Build me a dashboard"* | *"A page with one panel: people whose peer evidence is strong and whose overall rank is below 40."* |
| *"Make it fairer"* | *"Show whether Flight Lead assignments skew by region, and flag any I can't explain from evidence."* |
| *"Make it better"* | *"Show which rule decided each recommendation."* |

::: details What "working" looks like, per direction

| | You've got it when |
| --- | --- |
| **A board** | You open the file and it names someone you'd act on today |
| **Recruitment** | A name comes up that wasn't in the original top twenty, with the evidence that put it there |
| **Scheduled scan** | It ran on its own and reported what changed, not the whole list |
| **Manager's view** | A manager could act on it without asking a follow-up question |
| **Fairness audit** | It names a skew you'd have to explain, or shows there isn't one |
| **Their own view** | You'd be comfortable showing it to the person it's about |
| **Yours** | Someone at the table would run it again next week |

:::

::: warning Nothing goes out
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

1. **Give it a memory** - a file it writes as well as reads, so it can tell you what changed since last run.
2. **Make it stop** - a rule that routes a call to a human instead of deciding, and a way to see when it fired.
3. **Defend a call** - pick someone who didn't make the list and have it explain the decision to them. R-008 applies.
4. **Break it on purpose** - invent a candidate who should obviously be recognized and see whether your version finds them.
5. **Take the playbook with you** - `PLAYBOOK.md` is plain text, so it runs at the Cowork or Code altitude unchanged.
6. **Swap tables** - hand another table your playbook and have them run it against the same data. Different rules, different ambassadors.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-3)
