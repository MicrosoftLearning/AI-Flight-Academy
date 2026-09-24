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

The skill reads one file and ignores eight - the real evidence about what people ran, the feedback they got, and what they've shipped is sitting in the program data, unopened. Point Scout at a file and say what to do with it; point it at all of them at once and you won't know which one changed the shortlist.

### Pick a direction

Starting points if you want one. Take one, combine two, or ignore all of them. Click a bubble for where to start and an example prompt.

<script setup>
const ideas = [
  {
    emoji: "🖥️", color: "blue", title: "A board", tag: "easiest",
    what: "A local page you open: who's proposed, the evidence behind each, what's waiting on a decision.",
    start: "Ask Scout to build a local HTML page from the current run and open it.",
    prompt: "Build a local HTML page showing the current eight, the records behind each, and anything waiting on a decision.",
  },
  {
    emoji: "⏰", color: "orange", title: "A scheduled scan",
    what: "Runs on a timer and reports only what changed.",
    start: "Get it running once, then ask Scout to schedule it and diff against the last run.",
    prompt: "Run this on a schedule and tell me only who entered or left the shortlist since last time.",
  },
  {
    emoji: "👀", color: "teal", title: "The watch",
    what: "Who's climbing and who's stopped showing up.",
    start: "Point it at the activity dates and ask who's picking up and who's gone quiet.",
    prompt: "Build a watch list from activity dates: who's picking up, who's gone quiet, and who was recognized before and stalled.",
  },
  {
    emoji: "🔍", color: "pink", title: "Recruitment",
    what: "The people one file can't see, with the records that surfaced them.",
    start: "Have Scout read peer feedback and contributions and diff against the shipped eight.",
    prompt: "Read peer feedback and contributions, then tell me who that surfaces who wasn't in the shipped eight.",
  },
  {
    emoji: "🌐", color: "green", title: "Point it at something real",
    what: "Run the pick on a live source - a SharePoint list export is the same shape as the sample files.",
    start: "Swap the sample folder for your own export; Scout reads it the same way.",
    prompt: "Point this at a SharePoint list export instead of the sample data and tell me what changed.",
  },
  {
    emoji: "🧠", color: "blue", title: "Give it a memory",
    what: "A file it writes as well as reads, so it reports what changed since last run.",
    start: "Have Scout persist each run to disk and compare the latest with the one before.",
    prompt: "Save each run to a file and, on the next run, tell me only what changed since last time.",
  },
  {
    emoji: "🛑", color: "orange", title: "Make it stop",
    what: "A rule that routes thin evidence to a person with a specific question.",
    start: "Ask Scout to flag any pick whose evidence is weak and hold it for a human call.",
    prompt: "When a candidate's evidence is thin, don't decide - write the specific question a person should answer and hold it.",
  },
  {
    emoji: "🤝", color: "teal", title: "Two definitions, one room",
    what: "Compare your table's definition against another table's on the same data.",
    start: "Swap definitions with another table and diff the two shortlists.",
    prompt: "Here's another table's definition. Run both against the same data and show me where the two shortlists disagree.",
  },
  {
    emoji: "🧳", color: "purple", title: "Take the definition with you",
    what: "Reuse the plain-text definition outside this skill.",
    start: "`DEFINITION.md` is just prose - drop it into a chat elsewhere and it still describes what 'good' looks like.",
    prompt: "Help me reuse DEFINITION.md outside this skill, and tell me what stays the same and what I'd change.",
  },
  {
    emoji: "✨", color: "gray", title: "Yours",
    what: "Whatever your table thinks this program is missing.",
    start: "Describe what's missing, build the smallest version that runs, then make it run again on its own.",
    prompt: "The program needs [what]. Build the smallest version that runs, then make it run again on its own.",
  },
];
</script>

<DirectionBubbles :items="ideas" start-label="Where to start" />

**Pick by what your table would still run next time round**, not by what sounds most impressive.

::: tip Definition, playbook, capability
`references/DEFINITION.md` is what the program wants. `references/PLAYBOOK.md` is how the program runs. A new capability, like reading another file or checking a claim, belongs in its own `references/*.md`. The skill's instructions point Scout toward that structure.
:::

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
