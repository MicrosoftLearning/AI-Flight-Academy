---
title: The Ambassador - Code
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# The Ambassador

<div class="brief">
<span class="brief-badge">The problem</span>

The AI Skilling Ambassador program runs on people who volunteer for it - 72 of them across nine regions, doing office hours, mentoring, and writing the quickstarts everyone leans on, all on top of their real jobs. Nobody's paid, so the program keeps them with what it can offer back: an invitation in, a facilitation slot, a nomination. Last round five withdrew and seven were passed over, and the person who ran it left halfway through.

`cohort.py` picks the next cohort. It reads `definition.md`, sends all 72 candidates to the model, and comes back with eight names, a reason for each, and a next step. It's fast and confident - and it can't show its work. Nine data files are loaded; it sends the model one summary line per person, checks no claim against a record, and gives no one a way to overrule it.
</div>

## Objectives

Ship something that makes the pick trustworthy: it surfaces someone the fast path misses, backs every claim with evidence, and keeps a person in the loop. How you meet that is yours - write Python, build agents in `.github/agents/`, or both. A table that ships one of these well beats a table that half-ships three.

By the end, you should have at least one of:

- **Someone `cohort.py` misses** - surfaced from the evidence it currently ignores.
- **Every claim backed by a record** - no assertion without a row behind it.
- **A person who can overrule it** - and a next run that remembers the correction.

::: warning Nothing gets sent
Invitations, nominations and recognition are drafted and held for a person to read. Keep that in whatever you build.
:::

## Setup

::: warning The data is fictional
Invented people, invented scores, invented feedback. Nothing here describes a real person and no real program is being modeled. `program-data/DISCLAIMER.md` has the details.
:::

Build with whichever GitHub Copilot surface you like - VS Code, the Copilot CLI, or the GitHub Copilot app - but the starter calls the **Copilot CLI** behind the scenes, so keep it signed in. You'll also need **Python 3.10+**.

### 1 · Download the starter

<a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">A working cohort picker, three alternative definitions, and the nine data files.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

What's in the download:

```text
ambassador-starter/
  cohort.py         the entry point - picks the cohort
  definition.md     what the program looks for. This is the file you edit
  definitions/      three worked alternatives - reach, depth, rising
  agent.py          ask() and ask_json(), over the GitHub Copilot CLI
  program/data.py   loads the nine data files
  program-data/     72 candidates, ~2,000 evidence records across nine files
  PLAYBOOK.md       how the program describes itself
```

::: tip Two places to get unstuck
Ask Copilot - it's building with you, so paste the error and let it fix it. For general mechanics the **[Guides](/bricks/)** are short how-tos. Coaches are in the room and every table has an SME.
:::

### 2 · Run it, and swap the definition

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

Same 72 people, different shortlists - compare them and you'll see only a few names overlap. The definition is doing the work, and it's plain prose in a file you can edit. Open `definition.md`, write what your program would look for, and re-run.

## Build

**Done when:** one condition is met, on real output, with a name on screen.

::: tip 🎈 This is the fun part - keep it low-stress
Pick whatever direction sounds good and build it with your table. It doesn't have to be perfect, and it doesn't have to solve everything - the whole point is to explore your tool, trade ideas, and vibe-code something together. Use whatever you came here to learn, see how far you get, and have fun with it. You're here to learn by doing. Anything on this page phrased as a prompt is an example, not a script; say it your way.
:::

Everything's loaded and nothing's used: `cohort.py` sends the model a one-line summary per person, so the real evidence - what people ran, the feedback they got, what they've shipped - sits in `data.py` untouched. That's the room to build in.

### Pick a direction

Remember what `cohort.py` does today: it sends the model one summary line per person - never the full records - and hands back eight names it can't back up. Each idea below starts from one of those gaps. Take one, combine two, or ignore all of them. Click a bubble for where to start and an example prompt to open the conversation with Copilot.

<script setup>
const ideas = [
  {
    emoji: "🔍", color: "blue", title: "Recruitment", tag: "easiest",
    what: "Give the model the real feedback instead of a one-line summary, and see who it surfaces that the default run misses.",
    start: "Today `cohort.py` sends one summary line per person. Send each person's actual `PeerFeedback.csv` rows instead, run it again, and compare the new eight names with the original eight.",
    prompt: "Change cohort.py so it sends each candidate's full PeerFeedback.csv rows instead of the one-line summary. Then show me who's on the new shortlist but not the original one, with a short invitation drafted for each.",
  },
  {
    emoji: "🥊", color: "orange", title: "A second opinion",
    what: "Two agents look at the same people and disagree on purpose - one picks the cohort, one argues against it.",
    start: "Add a second agent with the opposite brief, so you see both sides instead of one confident answer. Agents live in `.github/agents/` and can each run a different model.",
    prompt: "Add a second agent that argues against the shortlist using the same records. Run both and print where they disagree - don't resolve it, just show me.",
  },
  {
    emoji: "🔄", color: "teal", title: "The run-to-run diff",
    what: "After someone edits the definition, show only what changed in the shortlist - not the whole list again.",
    start: "Save each run's eight names to a file, then compare the latest run with the previous one so the change stands out.",
    prompt: "Save each run's shortlist to a timestamped JSON file, and add a --diff option that compares the latest run with the one before it by CandidateId.",
  },
  {
    emoji: "⚖️", color: "purple", title: "Fairness audit at scale",
    what: "Run the same request many times to see which names are steady and which are just luck of the draw.",
    start: "The model isn't perfectly consistent. Run the same definition ten times, collect the shortlists, and count how often each person survives.",
    prompt: "Run the same definition ten times, collect the shortlists, and print how often each CandidateId makes the cut. Flag anyone who appears in fewer than half the runs.",
  },
  {
    emoji: "🎖️", color: "pink", title: "Their own view",
    what: "Write what a single candidate would read about their own standing, using only their records.",
    start: "Instead of one shortlist for everyone, send just one person's records and generate their own summary. Get one name right before scaling to all 72.",
    prompt: "For one CandidateId, send only that person's records and write what they'd read about their own standing. Get one name right before we loop over everyone.",
  },
  {
    emoji: "🌐", color: "green", title: "Point it at something real",
    what: "Run the picker on live data - a SharePoint list or Teams export - instead of the sample files.",
    start: "The starter reads CSVs in `data.py`. Swap that loader for your own source; as long as the record shape matches, nothing else has to change.",
    prompt: "Replace the CSV loader in data.py with one that reads from my SharePoint list, keeping the same record shape so cohort.py doesn't change.",
  },
  {
    emoji: "📦", color: "blue", title: "Package it as a skill",
    what: "Wrap what you built into a reusable skill you can run anywhere Copilot runs.",
    start: "Put your definition and code behind a `.github/skills/<name>/SKILL.md` file, so it works in VS Code, the Copilot CLI, and the GitHub cloud agent.",
    prompt: "Package this as a skill under .github/skills/<name>/SKILL.md so I can run the same shortlist from VS Code, the CLI, or the cloud agent.",
  },
  {
    emoji: "🤖", color: "orange", title: "Two models, one question",
    what: "Ask two different models the same thing and see where their picks differ.",
    start: "Run `cohort.py` twice, once per model, by setting `AMBASSADOR_MODEL` each time, then compare the two shortlists.",
    prompt: "Run the same definition through two different models and show me where the two shortlists differ.",
  },
  {
    emoji: "🧪", color: "teal", title: "Test the hard cases",
    what: "Pick a few people you already have an opinion on, and check your build agrees.",
    start: "Write five candidates with the outcome you'd expect, then run your build against them and see where it disagrees with you.",
    prompt: "Help me write five test candidates I know the answer for, and a quick check that flags any my build gets wrong.",
  },
  {
    emoji: "🧳", color: "purple", title: "Take the definition with you",
    what: "Reuse the plain-text definition outside this starter - in a normal Copilot chat.",
    start: "`definition.md` is just prose describing what 'good' looks like. Drop it into a Copilot chat elsewhere and it still works.",
    prompt: "Help me reuse definition.md outside this starter, in a plain Copilot chat, and tell me what stays the same and what I'd change.",
  },
  {
    emoji: "🎯", color: "gray", title: "Yours",
    what: "Whatever your table thinks the program is still missing.",
    start: "Start with the smallest version that runs.",
    prompt: "Our table thinks the program is missing [describe it]. Help us build the smallest version that runs on the starter data.",
  },
];
</script>

<DirectionBubbles :items="ideas" start-label="Where to start" />

**Pick by what your table would still run next time round**, not by what sounds most impressive.


::: tip 🎛️ Pick the model that fits the job
A long-context model can hold all nine files at once; a faster one is better while you're iterating. In Copilot Chat, switch in the model picker. For `cohort.py`, set `AMBASSADOR_MODEL` (for example `$env:AMBASSADOR_MODEL = "claude-haiku-4.5"` in PowerShell) and compare on the same question.
:::

## After today

This is a starting point, not the finish line. In one session, alongside a table doing the same thing, you took a fast, opaque picker and made a piece of it trustworthy - and practiced the real skill: describing what you want, watching Copilot build it, and correcting from there.

---

[← Back to start](/)
