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
  <p class="brief-lead">The AI Skilling Ambassador program runs on people who volunteer for it, and it has to keep them. The person who ran it left halfway through.</p>
  <p>72 ambassadors across nine regions do it on top of their real jobs: office hours, answering questions, mentoring one-on-one, and writing the quickstart guides everyone else leans on. Nobody is paid for it, so the program runs on what it can offer back: an invitation in, a facilitation slot, a nomination, a sponsor conversation. Last round five people withdrew and seven were passed over.</p>
  <p>The <strong>Ambassador skill</strong> they left behind picks the next cohort. It reads <code>DEFINITION.md</code>, applies it to the candidates, and comes back with eight names, a reason for each, and what to offer them. It is fast, it is confident, and it cannot show its work.</p>
  <p class="brief-ask">Ship something that finds someone the skill misses, shows the evidence behind every claim, and lets a person overrule it.</p>
  <ul class="brief-stats">
    <li><strong>9</strong> data files, <strong>1</strong> read</li>
    <li><strong>0</strong> claims checked against a record</li>
    <li><strong>72</strong> candidates, <strong>~2,000</strong> evidence records</li>
  </ul>
</div>

## What you're shipping

Three conditions. How you meet them is yours.

| | Condition |
| --- | --- |
| **1** | It finds someone the shipped skill misses |
| **2** | Every claim it makes points at a record that supports it |
| **3** | A person can overrule it, and the next run remembers |

Nothing says which to do first. A table that ships one condition well beats a table that half-ships three.

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

::: tip Nothing here is coding
Everything is a sentence typed into a chat box. Cowork reads the files, edits them, and saves them for you. The only thing you handle is the download.
:::

## Before you start

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-skill.zip" download>
    <span class="lab-card-emoji">🎖️</span>
    <span class="lab-card-title">Ambassador</span>
    <span class="lab-card-desc">The skill, the definition it runs on, and three alternatives.</span>
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

::: tip When you're stuck, ask Cowork
You're building with Cowork, so it can also fix what you're building. Paste the error, or describe what came back wrong. Coaches are in the room if that doesn't land.
:::

---

## 1 · Run it, and swap the definition

**Done when:** two definitions have given you two different shortlists.

1. In Cowork, open **Customize** → **Skills** → the arrow next to **Add** → **Upload skill**, and drag in the whole `ambassador-skill.zip`. Upload the zip, not the `SKILL.md` inside it: `references/` holds the definition and the playbook.
2. Start a **new** Cowork session. Skills only load at the start.
3. Unzip the program data and drag **`CandidateProfiles.csv`** into the session.

Then ask it the question the program exists to answer:

```text
Who should be in the next cohort?
```

Eight names, a reason each, and what to offer them. Now change what it's looking for:

```text
Use definitions/depth.md as the definition instead. Re-run and tell me which names changed.
```

Then try `definitions/rising.md`. Same 72 people, and the shortlists barely overlap: `depth.md` and `rising.md` share two names out of eight, and each surfaces four people no other definition finds.

The definition is plain prose. Tell Cowork what your program is looking for and have it rewrite the file:

```text
Show me the definition you're using.
```

```text
Rewrite it. We care about people whose work gets picked up by teams they've never worked with, and we'd rather reach someone new than someone who's already been recognized twice. Then re-run and tell me which names changed.
```

You never open a file. Cowork edits `references/DEFINITION.md` and re-runs against it.

### What it can't do

Ask it directly:

```text
What did you not read, and which of your claims aren't backed by a record?
```

It reads `CandidateProfiles.csv` and nothing else. It can say someone's work "gets reused across teams" because a summary score is high, with nothing in `ProgramContributions.csv` behind it. And running it twice gives you two shortlists with nowhere to record that you disagreed.

Those are the three conditions, and they're where the next 60 minutes go.

## 2 · Build

**Done when:** one condition is met, on real output, with a name on screen.

::: tip 🎈 This is the fun part - keep it low-stress
Pick whatever direction sounds good and build it with your table. It doesn't have to be perfect, and it doesn't have to solve everything - the whole point is to explore your tool, trade ideas, and vibe-code something together. Use whatever you came here to learn, see how far you get, and have fun with it. You're here to learn by doing.
:::

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

Attach one and tell the skill what to do with it. Attach all six and you won't know which file changed the shortlist.

### Ideas, not instructions

Starting points if you want one. Take one, combine two, or ignore all of them.

| | What it is | Start with |
| --- | --- | --- |
| 🔍 **Recruitment** · easiest | The people one file can't see: strong peer evidence, ordinary activity numbers | *"Find people whose peer feedback shows a repeated pattern of enabling others, not one-off praise, and tell me which of them the shipped definition missed."* |
| 🎯 **Assignment** | Who to pick for one specific job, which is not the same as who tops the shortlist | *"I need someone to run a session for a new-hire audience in EMEA. Who, and why them over the next-best?"* |
| 🧭 **Manager's view** | One manager, their people, one next action each | *"Give me a one-page brief for a manager: their candidates, what's proposed for each, and the single next action."* |
| ⚖️ **Fairness audit** | Whether your shortlist skews by region, org, level, or tenure | *"Audit the eight names against region, level, and tenure. Name any skew you'd have to explain."* |
| 🎖️ **Their own view** | What one candidate would read about their own standing | *"Write what one candidate would see: where they stand, what the records show, and what would put them in."* |
| 📨 **The invitation** | The message that actually goes out, in the program's voice, held for approval | *"Draft the invitation for each of the eight in the program's voice. Hold them for approval, don't send."* |
| 🎯 **Yours** | Whatever your table thinks this program is missing | *"The program needs [what]. Work out what that takes and build the smallest version first."* |

**Pick by what your table would still run next time round**, not by what sounds most impressive.

::: tip Ask Cowork to file it in the right place
`references/DEFINITION.md` is what the program wants. `references/PLAYBOOK.md` is how the program runs. A new capability, like reading another file or checking a claim, belongs in its own reference file. Say *"add that as a new reference file, don't put it in the definition"* and Cowork writes it where it belongs.
:::

### Build in layers

Get one real name on screen before you add anything:

1. **The smallest version** - one file attached, one change to the definition, re-run.
2. **The evidence** - every line carries the record behind it, and says which files it read.
3. **One addition** - one file, one rule, one check at a time.
4. **A bound** - cap what it considers, and say what it left out.

The more specific your ask, the less you'll undo:

| Vague | Specific |
| --- | --- |
| *"Use the peer data"* | *"Weigh peer comments with evidence depth of 'repeated pattern' above single events, and show me who enters the shortlist as a result."* |
| *"Make it fairer"* | *"Show me whether the shortlist skews by region, and name anyone you can't trace to a record."* |
| *"Make it better"* | *"For each name, cite the file and row that supports the claim."* |

## Push it further

1. **Point it at something real** - the skill reads attached files, and a SharePoint list export is the same shape.
2. **Run it on a schedule** - ask Cowork to re-run weekly and send you who's newly matching.
3. **Two definitions, one room** - hand another table your definition and compare shortlists on the same data.
4. **Test the hard cases** - write five candidates you know the answer for, and check your build gets them right.
5. **Take the definition with you** - `DEFINITION.md` is plain text and works at any altitude.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-3)
