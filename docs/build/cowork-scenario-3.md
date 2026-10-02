---
title: The Ambassador - Cowork
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# The Ambassador

## Objectives

Contoso's AI Skilling Ambassador program is a group of volunteers who help colleagues use the company's AI tools - running office hours, mentoring, answering questions, and writing the guides everyone leans on, all on top of their day jobs. Each round the program brings in eight new ambassadors, chosen from people across nine regions already doing some of this informally.

The **Ambassador skill** was built to take some of that work off whoever runs the round, and it isn't finished. It reads a short written description of what the program looks for, applies it to every candidate, and returns eight names with a reason for each. It's fast and confident, and it can't show you the evidence behind any of it - so nobody can check whether those reasons hold up.

In this activity you run that skill, change what it looks for, and then start extending it. Three steps:

| | Step | You're done when |
| --- | --- | --- |
| **1** | **Upload and run** | Cowork has the Ambassador skill loaded and returns eight names from the program data. |
| **2** | **Change what it looks for** | You've swapped the written description of what the program wants, re-run, and seen different names come back. |
| **3** | **Extend it** | The skill does something it couldn't before. |

Step 3 is the main build, and it isn't one change. Close a gap, re-run, see what moved, then close the next one.

**The skill proposes. A person decides.** The eight names are a recommendation someone has to act on, so every change you make should make that person's job easier: more evidence on screen, clearer reasoning, a faster way to overrule it.

::: details Glossary

- **Skill:** a folder of plain-text instructions Cowork loads and follows. You can read it and edit it.
- **Cohort:** the group of eight the program brings in each round. Picking the next one is the job.
- **Candidate:** one of the volunteers the program could bring in. Not an applicant - 31 of the 72 never put themselves forward.
- **Definition:** the written description of what the program is looking for. The skill applies it to every candidate. Editing it is how you change the result.
- **Shortlist:** the eight names the skill returns. A proposal for a person to act on, not a decision.
- **Evidence:** the records behind a claim - what someone ran, the feedback they got, what they contributed.

For more definitions, see the [Glossary](/glossary).

:::

## Before you start

Download both files.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-skill.zip" download>
    <span class="lab-card-emoji">🎖️</span>
    <span class="lab-card-title">Ambassador skill</span>
    <span class="lab-card-desc">How the program picks its next eight, plus three alternative definitions of what it's looking for. This is the "before" you compare against.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-program-data.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Program data</span>
    <span class="lab-card-desc">72 candidates and ~2,000 evidence records across nine files. Use these instead of real people data.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

Open Cowork. You'll add the Ambassador skill in Step 1. Nothing here needs code - every change is a sentence typed into the chat. The CSVs you attach travel with your prompt to the model, which is why the data is fictional.

**The data is fictional.** Invented people, invented scores, invented feedback. Nothing here describes a real person and no real program is being modeled.

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

---

## 1 · Upload and run

**Done when:** Cowork returns eight names from the program data.

1. In Cowork, open **Customize** → the arrow next to **Add** → **Upload**, and drag in `ambassador-skill.zip` (or the unzipped folder - Cowork takes either).

   ::: warning Upload the whole zip, not just SKILL.md
   `SKILL.md` is only the instructions. The zip also carries `references/` and `definitions/`, which hold the definition it runs on, the playbook, and the three alternatives.
   :::

   ![The Cowork Customize page, with Customize in the left menu, the Add dropdown open, and Upload highlighted](/img/cowork-upload-skill.png)

1. Start a **new** Cowork session. Skills load only when a session starts.

1. Unzip `ambassador-program-data.zip` and drag in **all nine CSVs** to the session - the `.csv` files only, not the two markdown files beside them.

1. Ask Cowork to run it. Start every request with *"Using the ambassador skill"* - that's how Cowork knows to call it.

   ```text
   Using the ambassador skill, who should be in the next cohort?
   ```

   You should see 8 names appear.

   **Those eight are a first guess, not an answer.** The skill judged everyone on seven summary scores and nothing else, and those scores are invented - some of them deliberately misleading. Finding where the list is wrong is the rest of the exercise.

## 2 · Change what it looks for

**Done when:** a different definition has given you a different shortlist.

The skill judges every candidate against `DEFINITION.md` - a few sentences of plain text saying what the program wants. Swap that file and the answer changes.

Three alternative definitions ship with it: `reach.md` (work that gets reused), `depth.md` (one-to-one support), and `rising.md` (trajectory over standing).

```text
Using the ambassador skill, use definitions/depth.md as the definition instead. Re-run and tell me which names changed.
```

Then try `definitions/rising.md`. Same candidates, different results - and you changed it by swapping a paragraph of text, not by touching code.

::: tip Cowork may ask before it changes a file
When a prompt makes Cowork edit a file - the definition, a reference - it often shows you the change and waits for you to approve it. Approve it, or the change won't happen. If you aren't asked, that's fine too; check the result and keep going.
:::

## 3 · Extend it

**Done when:** the skill does something it couldn't before.

`program-data` has nine files. The skill only reads one of them, `CandidateProfiles.csv`, a summary of seven scores per person. The other eight are sitting there unused: what people actually ran, what colleagues said, what they left behind, who applied. Tell the skill to read those too and the shortlist changes.

That's one gap. There are others.

### Pick a direction

The cards below are **starters, not finished builds**. Use them for inspiration, or ignore them and build what your table actually wants.

<div class="skill-steps">
  <div class="skill-step">
    <div class="skill-step-num">1</div>
    <div class="skill-step-body">
      <span class="skill-step-title">Talk it through</span>
      <p>Scan the cards for ideas and decide as a table where to start. Add as much as you want from there.</p>
    </div>
  </div>
  <div class="skill-step">
    <div class="skill-step-num">2</div>
    <div class="skill-step-body">
      <span class="skill-step-title">Sketch it</span>
      <p>Two minutes on what it should do and what it needs to read.</p>
    </div>
  </div>
  <div class="skill-step">
    <div class="skill-step-num">3</div>
    <div class="skill-step-body">
      <span class="skill-step-title">Build it by talking</span>
      <p>You bring the idea, Cowork does the building. Describe what you want, look at what comes back, then tell it what to change. Ask it for options when you're stuck - <em>"what else could this dashboard show?"</em></p>
    </div>
  </div>
  <div class="skill-step">
    <div class="skill-step-num">4</div>
    <div class="skill-step-body">
      <span class="skill-step-title">Re-run</span>
      <p>See what moved. Change one thing at a time - if you change three at once, you won't know which one did it.</p>
    </div>
  </div>
</div>

<script setup>
const ideas = [
  {
    emoji: "🖥️", color: "blue", title: "A live cohort dashboard",
    what: "An interactive page of the current shortlist - each name, the records behind it, filters for region and level.",
    start: "Have Cowork render the shortlist as a page you can click through.",
    prompt: "Using the ambassador skill, build an interactive dashboard of the current cohort - each name, the evidence behind it, and filters for region and level.",
  },
  {
    emoji: "🧠", color: "orange", title: "Give it a memory",
    what: "A file it writes as well as reads, so every run knows what the last one decided - including a human override.",
    start: "Have Cowork write each run and any human call to a file, and read it back on the next run.",
    prompt: "Add a memory to the ambassador skill: write each run and any human override to a file, and read it on the next run so decisions carry forward.",
  },
  {
    emoji: "🔍", color: "teal", title: "Read the evidence it ignores", tag: "easiest",
    what: "The skill judges on the summary scores alone. Teach it to open the real records underneath.",
    start: "Point it at the peer feedback and contributions the summary hides, and weigh repeated patterns over one-off praise.",
    prompt: "Add to the ambassador skill: read PeerFeedback.csv and ProgramContributions.csv, not just the summary scores, and weigh a repeated pattern over one-off praise. Then show me who that adds who wasn't in the original eight.",
  },
  {
    emoji: "⚖️", color: "purple", title: "A fairness check on every run",
    what: "A standing check the skill runs on every shortlist - not a one-off audit you have to remember.",
    start: "Build the check into the skill so it flags clustering and unbacked claims automatically.",
    prompt: "Add a fairness check to the ambassador skill - every shortlist flags when the list clusters by region, level, or tenure, and any claim with no record behind it.",
  },
  {
    emoji: "📨", color: "green", title: "Draft the invitations",
    what: "Write each invite in the program's voice, with the evidence that earned it sitting alongside so a person can check the reasoning before they act on it.",
    start: "Have the skill draft each invite and attach the records behind each name.",
    prompt: "Add an invitation step to the ambassador skill: draft each candidate's invite in the program's voice, and show the records behind that pick alongside the draft so I can check the reasoning before I use it.",
  },
  {
    emoji: "🧭", color: "pink", title: "Your program, your rules",
    what: "You probably run something shaped like this - a nomination, a shortlist, a review. Work out what a skill would need to help, using what you just learned here.",
    start: "Describe your own program to Cowork and have it draft the definition and the evidence list you'd need. Stay on paper - no real names, no exports.",
    prompt: "I run [your program]. Using what the ambassador skill does, help me write the definition it would need, list the evidence I'd have to collect, and name where a person must stay in the loop. Keep it on paper - no real names and no exports.",
  },
  {
    emoji: "🤝", color: "teal", title: "Two definitions, head to head",
    what: "Run two definitions over the same candidates and show where they disagree - your table's brief against another's.",
    start: "Add a compare step so the skill runs both and shows what changed between the two shortlists.",
    prompt: "Add a compare mode to the ambassador skill: run our definition and another table's over the same candidates, and show me where the two shortlists disagree.",
  },
  {
    emoji: "✨", color: "gray", title: "Yours",
    what: "The most ambitious thing your table can name - build something new from the shortlist, or change how the skill decides.",
    start: "Describe the end state and get the smallest working version on screen first.",
    prompt: "I want to add [big idea] to the ambassador skill. Work out what it takes and get the smallest working version on screen first.",
  },
];
</script>

<DirectionBubbles :items="ideas" start-label="Where to start" />

::: tip 🎈 Start small
Nothing has to be perfect or finished. Get the smallest version working, then build on it. Time and token budget are the real limits - so aim at something you can show, not something you can finish.
:::

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Cowork ignores the skill | Start a **new** Cowork session. Skills load only when a session starts. Begin your request with *"using the ambassador skill"*. |
| Upload didn't work | Give it the zip or the whole unzipped folder - not `SKILL.md` on its own. |
| Cowork can't find the data | Attach all nine CSVs to the session. Cowork only sees what you attach. |
| The same eight names every time | Check Cowork is reading the definition you edited. Ask it to show you the definition it just used. |
| A claim with no record behind it | Ask which file and row it came from. If it can't answer, it guessed - tell it to say so instead. |
| It changed more than you asked | Ask what it changed and why. Reject the change and try again with a narrower ask. |

---

[← Back to start](/)
