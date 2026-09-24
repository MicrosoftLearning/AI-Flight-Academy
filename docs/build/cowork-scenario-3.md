---
title: The Ambassador - Cowork
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# The Ambassador

<div class="brief">
<span class="brief-badge">The problem</span>

The AI Skilling Ambassador program runs on people who volunteer for it - 72 of them across nine regions, doing office hours, mentoring, and writing the quickstarts everyone leans on, all on top of their real jobs. Nobody's paid, so the program keeps them with what it can offer back: an invitation in, a facilitation slot, a nomination. Last round five withdrew and seven were passed over, and the person who ran it left halfway through.

The **Ambassador skill** they left behind picks the next cohort. It reads `DEFINITION.md`, applies it to the candidates, and comes back with eight names, a reason for each, and what to offer them. It's fast and confident - and it can't show its work. Nine data files ship with it; the skill reads one, checks no claim against a record, and gives no one a way to overrule it.
</div>

## Objectives

Ship something that makes the pick trustworthy: it surfaces someone the shipped skill misses, backs every claim with evidence, and keeps a person in the loop. How you meet that is yours - a table that ships one of these well beats a table that half-ships three.

By the end, you should have at least one of:

- **Someone the skill misses** - surfaced from the evidence it currently ignores.
- **Every claim backed by a record** - no assertion without a row behind it.
- **A person who can overrule it** - and a next run that remembers the correction.

::: warning Nothing gets sent
Invitations and nominations are drafted and held for a person to read. Keep that in whatever you build.
:::

## Setup

::: tip Nothing here is coding
Everything is a sentence typed into a chat box. Cowork reads the files, edits them, and saves them for you. The only thing you handle is the download.
:::

**The data is fictional.** Invented people, invented scores, invented feedback. Nothing here describes a real person and no real program is being modeled.

### 1 · Download the skill and the data

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

What's in the skill:

```text
ambassador/
  SKILL.md              the instructions Cowork loads and follows
  references/
    DEFINITION.md       what the program looks for. This is the file you edit
    PLAYBOOK.md         how the program describes itself
  definitions/          three worked alternatives - reach, depth, rising
```

::: tip When you're stuck, ask Cowork
You're building with Cowork, so it can also fix what you're building. Paste the error, or describe what came back wrong. Coaches are in the room if that doesn't land.
:::

### 2 · Run it, and swap the definition

**Done when:** two definitions have given you two different shortlists.

1. In Cowork, open **Customize** → **Skills** → the arrow next to **Add** → **Upload skill**, and drag in the whole `ambassador-skill.zip`. Upload the zip, not the `SKILL.md` inside it: `references/` holds the definition and the playbook.
2. Start a **new** Cowork session. Skills only load at the start.
3. Unzip the program data and drag **`CandidateProfiles.csv`** into the session.

Then ask it the question the program exists to answer - name the skill so Cowork calls it:

```text
Using the ambassador skill, who should be in the next cohort?
```

Eight names, a reason each, and what to offer them. Name the ambassador skill in each request - that's how Cowork knows to call it. Now change what it's looking for:

```text
Using the ambassador skill, use definitions/depth.md as the definition instead. Re-run and tell me which names changed.
```

Then try `definitions/rising.md`. Same 72 people, and the shortlists barely overlap: `depth.md` and `rising.md` share two names out of eight, and each surfaces four people no other definition finds.

The definition is plain prose. Tell Cowork what your program is looking for and have it rewrite the file:

```text
Show me the definition you're using in the ambassador skill.
```

```text
Rewrite the ambassador skill definition. We care about people whose work gets picked up by teams they've never worked with, and we'd rather reach someone new than someone who's already been recognized twice. Then re-run and tell me which names changed.
```

You never open a file. Cowork edits `references/DEFINITION.md` and re-runs against it.

::: tip Cowork asks before it changes anything
When a prompt makes Cowork edit a file - the definition, a reference - it shows you the change and waits for you to approve or reject it. That's expected; approve to let it through.
:::

## Build

**Done when:** one condition is met, on real output, with a name on screen.

::: tip 🎈 This is the fun part - keep it low-stress
Pick whatever direction sounds good and build it with your table. It doesn't have to be perfect, and it doesn't have to solve everything - the whole point is to explore your tool, trade ideas, and vibe-code something together. Use whatever you came here to learn, see how far you get, and have fun with it. You're here to learn by doing.
:::

The program already ships everything you need to judge these people: nine files, 72 candidates, ~2,000 evidence records - what they ran, the feedback they got, what they've shipped. **You don't build the data; it's here.** What the skill *doesn't* do is use most of it - it reads one file and ignores eight. So the builds below come in two shapes: **leverage** the skill as it is to make something new from its picks - a dashboard, a scheduled digest - or **build onto** the skill so it reads more, weighs it differently, or checks its own claims every run. Work one change at a time; throw everything at it at once and you won't know what moved the shortlist.

### Pick a direction

Pick one or two and spend the session building. Take one as-is, combine two, or bring your own. Click a bubble for where to start and a prompt to open with.

<script setup>
const ideas = [
  {
    emoji: "🖥️", color: "blue", title: "A live cohort dashboard",
    what: "An interactive page of the current pick - each name, the records behind it, filters for region and level.",
    start: "Leverage the skill's output: have Cowork render the shortlist as a page you can click through.",
    prompt: "Using the ambassador skill, build an interactive dashboard of the current cohort - each pick, the evidence behind it, and filters for region and level.",
  },
  {
    emoji: "📅", color: "orange", title: "A daily digest",
    what: "The pick, re-run on its own each morning, with an email of what changed.",
    start: "Ask Cowork to schedule the run and mail you only the movement since last time.",
    prompt: "Using the ambassador skill, re-run the pick every morning and email me a summary of who newly matches and who fell off since yesterday.",
  },
  {
    emoji: "🔍", color: "teal", title: "Read the evidence it ignores", tag: "easiest",
    what: "The skill judges on the summary scores alone. Teach it to open the real records underneath.",
    start: "Point it at the peer feedback and contributions the summary hides, and weigh repeated patterns over one-off praise.",
    prompt: "Add to the ambassador skill: read PeerFeedback.csv and ProgramContributions.csv, not just the summary scores, and weigh a repeated pattern over one-off praise. Then show me who that surfaces who wasn't in the shipped eight.",
  },
  {
    emoji: "⚖️", color: "purple", title: "A fairness check on every run",
    what: "A standing check the skill runs with every pick - not a one-off audit you have to remember.",
    start: "Build the check into the skill so it flags skew and unbacked claims automatically.",
    prompt: "Add a fairness check to the ambassador skill - every pick flags skew by region, level, and tenure, and any claim with no record behind it.",
  },
  {
    emoji: "📨", color: "green", title: "The invitation pipeline",
    what: "Draft each invite in the program's voice, hold for approval, track who's said yes - nothing sends on its own.",
    start: "Have the skill draft and hold, and keep a record of the state.",
    prompt: "Add an invitation step to the ambassador skill: draft each pick's invite in the program's voice, hold them for approval, and track who's sent, accepted, or declined. Nothing sends on its own.",
  },
  {
    emoji: "🌐", color: "pink", title: "Point it at real data",
    what: "Swap the sample files for a live SharePoint or Teams export and run the whole pick against it.",
    start: "The skill reads what you attach - give it your export instead of the sample CSVs.",
    prompt: "Using the ambassador skill, run the whole pick against my SharePoint export instead of the sample data, and show me what changed.",
  },
  {
    emoji: "🤝", color: "teal", title: "Two definitions, head to head",
    what: "Run two definitions over the same 72 and show exactly where they disagree - your table's brief against another's.",
    start: "Add a compare step so the skill runs both and diffs the shortlists.",
    prompt: "Add a compare mode to the ambassador skill: run our definition and another table's over the same 72 people, and show me where the two shortlists disagree.",
  },
  {
    emoji: "✨", color: "gray", title: "Yours",
    what: "The most ambitious thing your table can name - leverage the skill, or build onto it.",
    start: "Describe the end state and get the smallest working version on screen first.",
    prompt: "I want to add [big idea] to the ambassador skill. Work out what it takes and get the smallest working version on screen first.",
  },
];
</script>

<DirectionBubbles :items="ideas" start-label="Where to start" />

**Pick by what your table would actually use**, not by what sounds most impressive - then spend the time making it real.

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

## After today

This is a starting point, not the finish line. In one session, alongside a table doing the same thing, you took a fast, opaque pick and made a piece of it trustworthy - and practiced the real skill: describing what you want, watching Cowork build it, and correcting from there.

---

[← Back to start](/)
