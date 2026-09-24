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

The starter ships everything you need: nine files, 72 candidates, ~2,000 evidence records. **You don't build the data; it's here.** What `cohort.py` doesn't do is use most of it - it sends the model a one-line summary per person and ignores the eight files of real evidence in `program-data/`. So the builds below come in two shapes: **leverage** the run to make something new from its picks - a dashboard, a consistency sweep - or **build onto** the picker so it reads the real records, adds an agent that argues back, or checks its own claims every run. Work one change at a time.

### Pick a direction

Pick one or two and spend the session building. Take one as-is, combine two, or bring your own. Click a bubble for where to start and a prompt to open with Copilot.

<script setup>
const ideas = [
  {
    emoji: "🔍", color: "blue", title: "Read the evidence it ignores", tag: "easiest",
    what: "`cohort.py` sends one summary line per person. Change it to send the real records and see who surfaces.",
    start: "Send each candidate's actual PeerFeedback.csv and ProgramContributions.csv rows instead of the summary line, and weigh repeated patterns over one-off praise.",
    prompt: "Change cohort.py to send each candidate's full PeerFeedback.csv and ProgramContributions.csv rows instead of the one-line summary, weigh a repeated pattern over one-off praise, then show me who's on the new shortlist but not the original.",
  },
  {
    emoji: "🖥️", color: "teal", title: "A dashboard you can open",
    what: "Turn the run into a local page: the eight, the records behind each, filters, and what's waiting on a decision.",
    start: "Have a small script beside cohort.py render the run as an HTML page and open it.",
    prompt: "Add a step that renders the shortlist as a local HTML dashboard - each pick, the evidence behind it, filters for region and level - and opens it.",
  },
  {
    emoji: "🎭", color: "orange", title: "A panel of agents",
    what: "Orchestrate three agents on the same records - a picker, a challenger, and a referee that weighs them - instead of one confident answer.",
    start: "Agents live in `.github/agents/` and can each run a different model. Add a challenger and a referee, and have cohort.py run them in turn.",
    prompt: "Add two agents under .github/agents/: a challenger that argues against the shortlist on the same records, and a referee that reads both and produces a final eight with its reasoning. Orchestrate all three from cohort.py and show me each stage.",
  },
  {
    emoji: "🤖", color: "pink", title: "The same question, two models",
    what: "Run the pick across two models and compare - keep only the names both land on, or show where they split.",
    start: "Set `AMBASSADOR_MODEL` for each run - the call falls back to the default if a model isn't available - then diff the two shortlists.",
    prompt: "Run the same definition through two different models by setting AMBASSADOR_MODEL each time, then show me the names both models agree on and where they split.",
  },
  {
    emoji: "⚖️", color: "purple", title: "A fairness gate on every run",
    what: "A check the picker runs every time - flags skew by region, level, and tenure, and any claim with no record behind it.",
    start: "Build the check into cohort.py so it runs with every pick, not as a one-off.",
    prompt: "Add a fairness check to cohort.py: every run flags skew by region, level, and tenure, and any claim it can't trace to a record.",
  },
  {
    emoji: "🔁", color: "green", title: "Consistency at scale",
    what: "The model isn't perfectly consistent. Run the same definition many times and see which names are steady and which are luck of the draw.",
    start: "Loop the run, collect the shortlists, and count how often each person survives.",
    prompt: "Run the same definition ten times, collect the shortlists, and print how often each CandidateId makes the cut. Flag anyone who appears in fewer than half the runs.",
  },
  {
    emoji: "🤝", color: "teal", title: "Two definitions, head to head",
    what: "Run two definitions over the same 72 and show exactly where they disagree.",
    start: "Add a compare mode: pass two definition files and diff the shortlists.",
    prompt: "Add a compare mode to cohort.py: run two definitions over the same 72 people and show me where the two shortlists disagree, name by name.",
  },
  {
    emoji: "🌐", color: "blue", title: "Point it at real data",
    what: "Run the picker on your own export instead of the sample CSVs. Your columns won't match - so `data.py` and `definition.md` may need reworking, and Copilot can do that with you.",
    start: "The starter reads CSVs in `data.py`. Swap that loader for your source; if the shape differs, rework the loader and the definition to match.",
    prompt: "Replace the CSV loader in data.py with one that reads my own export. If the columns don't match the sample shape, help me rework data.py and definition.md, then show me what changed in the shortlist.",
  },
  {
    emoji: "✨", color: "gray", title: "Yours",
    what: "The most ambitious thing your table can name. You've got Python, agents, git, and the CLI - aim high.",
    start: "Start with the smallest version that runs on the starter data.",
    prompt: "Our table wants to build [describe it]. Work out what it takes - a change to cohort.py, a new agent, a scheduled run - and get the smallest version running first.",
  },
];
</script>

<DirectionBubbles :items="ideas" start-label="Where to start" />

**Pick by what your table would actually use**, not by what sounds most impressive - then spend the time making it real.


::: tip 🎛️ Pick the model that fits the job
A long-context model can hold all nine files at once; a faster one is better while you're iterating. In Copilot Chat, switch in the model picker. For `cohort.py`, set `AMBASSADOR_MODEL` (for example `$env:AMBASSADOR_MODEL = "claude-haiku-4.5"` in PowerShell) and compare on the same question.
:::

## After today

This is a starting point, not the finish line. In one session, alongside a table doing the same thing, you took a fast, opaque picker and made a piece of it trustworthy - and practiced the real skill: describing what you want, watching Copilot build it, and correcting from there.

---

[← Back to start](/)
