---
title: The Ambassador - Cowork
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🎖️ The Ambassador

::: warning 🚧 Work in progress
Scenario 3 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in Cowork. No code, and no experience needed.**

<div class="brief">
  <span class="brief-badge">The handoff</span>
  <p class="brief-lead">The AI Skilling Ambassador program has to decide who gets recognized, who gets invited in, and who's ready for more. The person who ran it left halfway through.</p>
  <p>72 people across nine regions do it on top of their real jobs: office hours, answering questions, mentoring one-on-one, and writing the quickstart guides everyone else leans on. Recognition is the only thing the program has to give back, so who gets named matters.</p>
  <p>The <strong>Ambassador skill</strong> they left behind still runs. Ask it who deserves recognition and it ranks all 72 people, sorts them into five tiers from Explorer up to Flight Lead, and recommends a next step for each one. It scores on business impact, execution reliability and leadership signals, the three numbers already sitting on the spreadsheet.</p>
  <p>Nine data files shipped with the program. The Ambassador skill opens one. The other eight hold what an ambassador actually does: whose guide got reused, who unblocked somebody, whose name a peer brings up.</p>
  <p class="brief-ask">Make it find the right people, and be able to show why. How you do that is yours.</p>
  <ul class="brief-stats">
    <li><strong>9</strong> data files, <strong>1</strong> read</li>
    <li><strong>4</strong> scored columns ignored</li>
    <li><strong>2</strong> playbook rules unimplemented</li>
  </ul>
</div>

## What you'll walk out with

A skill that reads the evidence files it currently skips, and one output the program owner can act on.

| What you make | What it does |
| --- | --- |
| **A program that reads evidence** | Recommends people the original ranking couldn't see, and names the evidence behind each one |
| **A playbook you extended** | `PLAYBOOK.md` is the program written down - your rules go in it, and they travel |
| **An output with names in it** | A shortlist, a manager brief, a watch list or a fairness audit, each line carrying its evidence |

## How this runs

| | Step | Time |
| --- | --- | --- |
| **1** | **Run it and catch it being wrong** - find who it ranked too high | 15 min |
| **2** | **Teach it to read** - add evidence, watch who moves | 20 min |
| **3** | **Build one output** - pick a direction, split it across the table | 60 min |

Do steps 1 and 2 on your own. In step 3 the table picks one output and each person takes a piece of it.

::: tip When you're stuck, ask Cowork
You're building with Cowork, so it can also fix what you're building. Paste the error, or describe what came back wrong. Coaches are in the room if that doesn't land.
:::

## Before you start

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-skill.zip" download>
    <span class="lab-card-emoji">🎖️</span>
    <span class="lab-card-title">Ambassador</span>
    <span class="lab-card-desc">The half-built skill, plus the playbook it runs on.</span>
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

::: tip Want a step spelled out?
The **[Guides](/bricks/)** in the top nav cover the general mechanics: setting up, connecting to your work, running things on a schedule. Open one in a new tab if you're stuck on a mechanic.
:::

---

## 1 · Run it and catch it being wrong

**Done when:** you can name the person the skill ranked too high, and the column that gives it away.

1. In Cowork, open **Customize** → **Skills** → the arrow next to **Add** → **Upload skill**, and drag in the whole `ambassador-skill.zip`. Upload the zip, not the `SKILL.md` inside it - `references/PLAYBOOK.md` sits beside it and holds the tiers and the rules.
2. Start a **new** Cowork session. Skills only load at the start.
3. Unzip the program data and drag **`CandidateProfiles.csv`** into the session.

Then ask it the question the program exists to answer:

```text
Who should we recognize this round?
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

The second-ranked person's watchout reads *"limited evidence of peer enablement or community lift."* The skill put them there anyway, because `Watchouts` is not one of the three columns it scores.

::: warning It may tell you it only read one file
The skill is written to admit what it skipped, so it often volunteers this. It still ranked all 72 people on that one file.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Everyone name one person the ranking got wrong, and the reason. Did you all pick the same person?</p>
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

Start with peer feedback. Attach `PeerFeedback.csv` and say:

```text
Read this too. Add a rule to the playbook: someone whose peers don't name them shouldn't outrank someone whose peers do. Then re-run and tell me which names changed.
```

Compare the new top ten against the old one. If the same people are in it, the rule you wrote isn't doing anything yet - say so and ask it to weigh peer evidence harder.

**Add one file at a time.** Attach all eight and you won't know which one moved anybody. One file is enough for this step; go back for more if you're ahead.

Two rules in the playbook aren't implemented at all - **R-004** (prior recognition isn't a reason to recognize again) and **R-006** (repeated activity with weak quality doesn't outrank quieter high-multiplier work). Implementing either one changes the list.

::: tip Rules go in the playbook, capabilities go beside it
`references/PLAYBOOK.md` holds the tiers, the rules, and what a recommendation has to contain, so a new rule belongs there. A new capability, like reading another file, belongs in its own `references/*.md`. The skill's instructions point Cowork toward that structure.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Read out the names that entered your top ten. Compare with the next table - did the same people surface?</p>
  </div>
</div>

## 3 · Build one output

**Done when:** you have a shortlist, brief, watch list or audit with names in it, and each name carries the evidence behind it.

A ranking tells you the order. It doesn't tell the program owner who to invite this week, who to check on, or who to defend to a sponsor.

### Pick a direction

Seven starting points. Take one, combine two, or name something the program is missing and build that instead.

| | What it is | Start with |
| --- | --- | --- |
| 🔍 **Recruitment** · easiest | The people the ranking buries: strong peer evidence, low overall score | *"Find people with strong peer and enablement evidence who rank low overall. Draft an invitation for each, held for approval."* |
| 🎯 **Assignment** | Who to pick for one specific job, which is not the same as who ranks highest - see **R-007** | *"I need someone to run a session for a new-hire audience in EMEA. Who, and why them over the next-best option?"* |
| 👀 **The watch** | Who's climbing and who's stopped showing up, instead of a single snapshot | *"Build me a watch list: who's climbing, who's dropped off, and who's been recognized before and stalled."* |
| 🧭 **Manager's view** | One manager, their people, one next action each | *"Give me a one-page brief for a manager: their candidates, each one's tier, and the single next action for each."* |
| ⚖️ **Fairness audit** | Whether the tiers skew by region, org, level or tenure, and whether each one can be explained from evidence | *"Audit the recommendations. Do outcomes skew by region, org, level or tenure? Show me any tier you can't explain from evidence."* |
| 🎖️ **Their own view** | What one candidate would read about their own standing | *"Write what one candidate would see about their own standing: where they are, why, and what would move them up."* |
| 🎯 **Yours** | Whatever your table thinks this program is missing | *"The program needs [what]. Work out what that takes and build the smallest version first."* |

**Pick the one your table would still use next time round**, not the one that sounds most impressive.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Two minutes round the table: what are you building, and who reads it? Out loud, before anyone types. If another table could demo the same thing with different labels, narrow it.</p>
  </div>
</div>

### Split the work

Pick one direction, then **take one standalone question each**: one rule, one section of the brief, one panel of the audit, one file's worth of evidence. **If it can't be checked on its own, it's too big.**

Split by question, not by layer. *"Who's climbing"*, *"who's stopped showing up"*, *"who's been recognized and stalled"* and *"who applied but isn't ready"* are four independent builds of one watch list.

### Build in layers

Get one real name on screen before you add anything:

1. **The smallest version** - *"Build the smallest version that produces real output. Start simple."*
2. **The evidence** - *"Now make every line carry the evidence behind it, and say which files you read."*
3. **One addition** - *"That works. Now add [one thing]."*
4. **A bound** - *"Cap this at [N] people, and say what you left out."*

The more specific your ask, the less you'll undo:

| Vague | Specific |
| --- | --- |
| *"Make it fairer"* | *"Show me whether Flight Lead assignments skew by region, and name any you can't explain from evidence."* |
| *"Use the peer data"* | *"Rank on peer evidence depth, and show me the three people this moves furthest."* |
| *"Make it better"* | *"For each recommendation, show which rule decided it."* |

::: details What "working" looks like, per direction

| | You've got it when |
| --- | --- |
| **Recruitment** | A name comes up that wasn't in the original top twenty, with the evidence that put it there |
| **Assignment** | It picks one person for one job and says why them over the next-best |
| **The watch** | It reports what changed since the last run, not the whole list again |
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
    <p>Halfway: does it produce output? If not, cut what it does in half and get one real name on screen before adding anything back.</p>
  </div>
</div>

## Push it further

1. **Defend a call** - pick someone who didn't make the list and ask it to explain the decision to them. R-008 applies.
2. **Break it on purpose** - invent a candidate who should obviously be recognized and see whether your version finds them.
3. **Run it on a schedule** - ask Cowork to re-run the program weekly and send you what changed, not the whole list.
4. **Take the playbook with you** - `PLAYBOOK.md` is plain text, so it runs at the Scout or Code altitude unchanged.
5. **Swap tables** - hand another table your playbook and have them run it against the same data. Different rules, different ambassadors.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-3)
