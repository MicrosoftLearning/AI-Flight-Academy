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

Eight names, a reason each, and what to offer them. Start each request with *"using the ambassador skill"* - that's the skill's name, and Cowork may not call it otherwise. Now change what it's looking for:

```text
Using the ambassador skill, use definitions/depth.md as the definition instead. Re-run and tell me which names changed.
```

Then try `definitions/rising.md`. Same 72 people, and the shortlists barely overlap: `depth.md` and `rising.md` share two names out of eight, and each surfaces four people no other definition finds.

The definition is plain prose. Tell Cowork what your program is looking for and have it rewrite the file:

```text
Using the ambassador skill, show me the definition you're using.
```

```text
Using the ambassador skill, rewrite the definition. We care about people whose work gets picked up by teams they've never worked with, and we'd rather reach someone new than someone who's already been recognized twice. Then re-run and tell me which names changed.
```

You never open a file. Cowork edits `references/DEFINITION.md` and re-runs against it.

## Build

**Done when:** one condition is met, on real output, with a name on screen.

::: tip 🎈 This is the fun part - keep it low-stress
Pick whatever direction sounds good and build it with your table. It doesn't have to be perfect, and it doesn't have to solve everything - the whole point is to explore your tool, trade ideas, and vibe-code something together. Use whatever you came here to learn, see how far you get, and have fun with it. You're here to learn by doing.
:::

The skill reads one file and ignores eight - the real evidence about what people ran, the feedback they got, and what they've shipped is sitting in the program data, unopened. Attach a file and tell the skill what to do with it; attach all of them at once and you won't know which one changed the shortlist.

### Pick a direction

Starting points if you want one. Take one, combine two, or ignore all of them. Click a bubble for where to start and an example prompt.

<script setup>
const ideas = [
  {
    emoji: "🔍", color: "blue", title: "Recruitment", tag: "easiest",
    what: "The people one file can't see: strong peer evidence, ordinary activity numbers.",
    start: "Attach `PeerFeedback.csv` and ask Cowork to weigh repeated patterns over one-off praise, then compare with the shipped shortlist.",
    prompt: "Find people whose peer feedback shows a repeated pattern of enabling others, not one-off praise, and tell me which of them the shipped definition missed.",
  },
  {
    emoji: "🎯", color: "orange", title: "Assignment",
    what: "Who to pick for one specific job - not the same as who tops the shortlist.",
    start: "Describe the job and audience, and ask who fits and why over the next-best.",
    prompt: "I need someone to run a session for a new-hire audience in EMEA. Who, and why them over the next-best?",
  },
  {
    emoji: "⚖️", color: "purple", title: "Fairness audit",
    what: "Whether your shortlist skews by region, org, level, or tenure.",
    start: "Ask Cowork to check the eight names against region, level, and tenure and name any skew.",
    prompt: "Audit the eight names against region, level, and tenure. Name any skew you'd have to explain.",
  },
  {
    emoji: "🎖️", color: "pink", title: "Their own view",
    what: "What one candidate would read about their own standing.",
    start: "Pick one name and ask for what they'd see, grounded in the records.",
    prompt: "Write what one candidate would see: where they stand, what the records show, and what would put them in.",
  },
  {
    emoji: "📨", color: "green", title: "The invitation",
    what: "The message that actually goes out, in the program's voice, held for approval.",
    start: "Ask Cowork to draft the invitations and hold them, not send.",
    prompt: "Draft the invitation for each of the eight in the program's voice. Hold them for approval, don't send.",
  },
  {
    emoji: "🌐", color: "green", title: "Point it at something real",
    what: "Run the pick on a live source - a SharePoint list export is the same shape as the sample files.",
    start: "Swap the attached CSV for your own export; the skill reads it the same way.",
    prompt: "I've attached a SharePoint list export instead of the sample data. Run the same pick against it and tell me what changed.",
  },
  {
    emoji: "📅", color: "blue", title: "Run it on a schedule",
    what: "Have Cowork re-run on its own and tell you who's newly matching.",
    start: "Ask Cowork to schedule the run and summarize what changed since last time.",
    prompt: "Re-run this weekly and send me only the people who newly match the definition since the last run.",
  },
  {
    emoji: "🤝", color: "orange", title: "Two definitions, one room",
    what: "Compare your table's definition against another table's on the same data.",
    start: "Swap definitions with another table and diff the two shortlists.",
    prompt: "Here's another table's definition. Run both against the same data and show me where the two shortlists disagree.",
  },
  {
    emoji: "🧪", color: "teal", title: "Test the hard cases",
    what: "A few candidates you already have an opinion on, checked against your build.",
    start: "Name five people with the outcome you'd expect and see where the build disagrees.",
    prompt: "Help me write five test candidates I know the answer for, and check which ones my build gets wrong.",
  },
  {
    emoji: "🧳", color: "purple", title: "Take the definition with you",
    what: "Reuse the plain-text definition outside this skill.",
    start: "`DEFINITION.md` is just prose - drop it into another Cowork task and it still describes what 'good' looks like.",
    prompt: "Help me reuse DEFINITION.md outside this skill, and tell me what stays the same and what I'd change.",
  },
  {
    emoji: "✨", color: "gray", title: "Yours",
    what: "Whatever your table thinks this program is missing.",
    start: "Describe what's missing and build the smallest version first.",
    prompt: "The program needs [what]. Work out what that takes and build the smallest version first.",
  },
];
</script>

<DirectionBubbles :items="ideas" start-label="Where to start" />

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

## After today

This is a starting point, not the finish line. In one session, alongside a table doing the same thing, you took a fast, opaque pick and made a piece of it trustworthy - and practiced the real skill: describing what you want, watching Cowork build it, and correcting from there.

---

[← Back to start](/)
