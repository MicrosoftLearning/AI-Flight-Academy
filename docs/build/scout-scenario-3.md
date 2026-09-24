---
title: The Ambassador - Scout
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# The Ambassador

<div class="brief">
<span class="brief-badge">The problem</span>

The AI Skilling Ambassador program runs on people who volunteer for it - 72 of them across nine regions, doing office hours, mentoring, and writing the quickstarts everyone leans on, all on top of their real jobs. Nobody's paid, so the program keeps them with what it can offer back: an invitation in, a facilitation slot, a nomination. Last round five withdrew and seven were passed over, and the person who ran it left halfway through.

The **Ambassador skill** they left behind picks the next cohort. It reads `DEFINITION.md`, applies it to the candidates, and comes back with eight names, a reason for each, and what to offer them. It's fast and confident - and it can't show its work. Nine data files ship with it; the skill reads one, checks no claim against a record, gives no one a way to overrule it, and can't run again without someone kicking it off.
</div>

## Objectives

Ship something that makes the pick trustworthy and gives it somewhere to run: it surfaces someone the shipped skill misses, backs every claim with evidence, keeps a person in the loop, and can run again on its own. How you meet that is yours - a table that ships one of these well beats a table that half-ships four.

By the end, you should have at least one of:

- **Someone the skill misses** - surfaced from the evidence it currently ignores.
- **Every claim backed by a record** - no assertion without a row behind it.
- **A person who can overrule it** - and a next run that remembers the correction.
- **It runs again without you** - on a schedule, on your machine.

::: warning Nothing gets sent
Invitations and nominations are drafted and held for a person to read. Keep that in whatever you build.
:::

## Setup

**Check Scout is signed in.** Ask it anything and confirm you get an answer back. Everything stays local - nothing is hosted and nothing leaves your machine.

**The data is fictional.** Invented people, invented scores, invented feedback. Nothing here describes a real person and no real program is being modeled.

### 1 · Download the skill and the data

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

What's in the skill:

```text
ambassador/
  SKILL.md              the instructions Scout loads and follows
  references/
    DEFINITION.md       what the program looks for. This is the file you edit
    PLAYBOOK.md         how the program describes itself
  definitions/          three worked alternatives - reach, depth, rising
```

::: tip Two places to get unstuck
Ask Scout: it's building with you, so paste the error or describe what came back wrong. For mechanics like scheduling or running things locally, the **[Guides](/bricks/)** are short how-tos. Coaches are in the room and every table has an SME.
:::

### 2 · Run it, and swap the definition

**Done when:** two definitions have given you two different shortlists.

1. Unzip both downloads. Put the `program-data` folder somewhere you can point Scout at.
2. In Scout, open **Extensions** → **Import** and drag in the **`ambassador` folder**. Import the folder, not `SKILL.md`: `references/` holds the definition and the playbook.
3. Start a **new session**. Skills load when a session begins.

Then ask it the question the program exists to answer - name the skill so Scout calls it:

```text
Using the ambassador skill, who should be in the next cohort? The data is in [path to program-data].
```

Eight names, a reason each, and what to offer them. Start each request with *"using the ambassador skill"* - that's the skill's name, and Scout may not call it otherwise. Now change what it's looking for:

```text
Using the ambassador skill, use definitions/depth.md as the definition instead. Re-run and tell me which names changed.
```

Then try `definitions/rising.md`. Same 72 people, and the shortlists barely overlap: `depth.md` and `rising.md` share two names out of eight, and each surfaces four people no other definition finds.

The definition is plain prose in a file. Open `references/DEFINITION.md` from the folder where your Scout skills are imported to (`%USERPROFILE%/.scout/m-skills/ambassador`), write what your program would look for, and re-run.

## Build

**Done when:** one condition is met, on real output, with a name on screen.

::: tip 🎈 This is the fun part - keep it low-stress
Pick whatever direction sounds good and build it with your table. It doesn't have to be perfect, and it doesn't have to solve everything - the whole point is to explore your tool, trade ideas, and vibe-code something together. Use whatever you came here to learn, see how far you get, and have fun with it. You're here to learn by doing.
:::

The program already ships everything you need to judge these people: nine files, 72 candidates, ~2,000 evidence records - what they ran, the feedback they got, what they've shipped. **You don't build the data; it's here.** What the skill *doesn't* do is use most of it - it reads one file and ignores eight. Scout can reach a lot to change that: it reads and writes files, runs on a schedule, and drives the CLI and git on your machine. So the builds below come in two shapes: **leverage** the skill as it is to make something new from its picks - a local board, a scheduled scan - or **build onto** the skill so it reads more, remembers what it decided, or holds a call for a human every run. Work one change at a time; throw everything at it at once and you won't know what moved the shortlist.

### Pick a direction

Pick one or two and spend the session building. Take one as-is, combine two, or bring your own. Click a bubble for where to start and a prompt to open with.

<script setup>
const ideas = [
  {
    emoji: "🖥️", color: "blue", title: "A local cohort board", tag: "easiest",
    what: "A page on your machine: the current pick, the records behind each, filters, and a column for what's waiting on a decision - all local, nothing hosted.",
    start: "Leverage the skill's output: have Scout build a local HTML board from the run and open it.",
    prompt: "Using the ambassador skill, build a local HTML board of the current cohort - each pick, the evidence behind it, filters for region and level, and a column for what's waiting on a decision.",
  },
  {
    emoji: "⏰", color: "orange", title: "A scheduled scan that runs itself",
    what: "It re-runs on your machine on a timer and writes a short diff of who moved - nobody has to kick it off.",
    start: "Get one clean run, then have Scout schedule it and diff against the last run on disk.",
    prompt: "Using the ambassador skill, run the pick on a schedule on my machine, save each run to disk, and write me a short note of who entered or left the shortlist since last time.",
  },
  {
    emoji: "🔍", color: "teal", title: "Read the evidence it ignores",
    what: "The skill judges on the summary scores. Teach it to open the real records - peer feedback, contributions - and weigh them.",
    start: "Point it at the files the summary hides, and weigh repeated patterns over one-off praise.",
    prompt: "Add to the ambassador skill: read PeerFeedback.csv and ProgramContributions.csv, not just the summary scores, and weigh a repeated pattern over one-off praise. Then show me who that surfaces who wasn't in the shipped eight.",
  },
  {
    emoji: "🧠", color: "purple", title: "Give it a memory",
    what: "A file it writes as well as reads, so every run knows what the last one decided - including a human override.",
    start: "Have the skill persist each run and any human call to disk, and read it back next time.",
    prompt: "Add a memory to the ambassador skill: write each run and any human override to a file, and read it on the next run so decisions carry forward.",
  },
  {
    emoji: "🛑", color: "pink", title: "Make it stop",
    what: "A rule that routes thin evidence to a person with a specific question, instead of guessing.",
    start: "Build the hold into the skill so weak-evidence picks wait for a human call.",
    prompt: "Add a rule to the ambassador skill: when a candidate's evidence is thin, don't decide - write the specific question a person should answer, and hold it.",
  },
  {
    emoji: "🌐", color: "green", title: "Point it at real data",
    what: "Swap the sample files for your own export and run the whole pick locally. Your columns won't match the samples - so the definition and the reader may need reworking, and Scout can do that with you.",
    start: "Give Scout your export instead of the sample CSVs; if the shape differs, have it rework DEFINITION.md and how the skill reads the files.",
    prompt: "Using the ambassador skill, run the whole pick against my own export instead of the sample data. If the columns don't line up, help me rework DEFINITION.md and how the skill reads the files, then show me what changed.",
  },
  {
    emoji: "🤝", color: "teal", title: "Two definitions, head to head",
    what: "Run two definitions over the same 72 and show where they disagree - your table's brief against another's.",
    start: "Add a compare step so the skill runs both and diffs the shortlists.",
    prompt: "Add a compare mode to the ambassador skill: run our definition and another table's over the same 72 people, and show me where the two shortlists disagree.",
  },
  {
    emoji: "✨", color: "gray", title: "Yours",
    what: "The most ambitious thing your table can name - leverage the skill, or build onto it. Scout reaches the CLI, git, and your files, so aim high.",
    start: "Describe the end state and get the smallest working version running first.",
    prompt: "I want to add [big idea] to the ambassador skill. Work out what it takes - files, a schedule, a CLI step - and get the smallest working version running first.",
  },
];
</script>

<DirectionBubbles :items="ideas" start-label="Where to start" />

**Pick by what your table would actually use**, not by what sounds most impressive - then spend the time making it real.

### Build in layers

Get one real name on screen end to end before you add anything:

1. **The smallest version** - *"Build the smallest version that runs end to end. Start simple."*
2. **The evidence** - *"Now make every line carry the record behind it, and say which files you read."*
3. **One addition** - *"That works. Now add [one thing]."*
4. **A bound** - *"Cap this at [N] people per run and say what was left out."*

## After today

This is a starting point, not the finish line. In one session, alongside a table doing the same thing, you took a fast, opaque pick and made a piece of it trustworthy - and gave it somewhere to run. You practiced the real skill: describing what you want, watching Scout build it, and correcting from there.

---

[← Back to start](/)
