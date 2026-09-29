---
title: The Ambassador - Scout
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# The Ambassador

## Objectives

Contoso's AI Skilling Ambassador program is a group of volunteers who help colleagues use the company's AI tools - running office hours, mentoring, answering questions, and writing the guides everyone leans on, all on top of their day jobs. Each round the program brings in eight new ambassadors, chosen from people across nine regions already doing some of this informally.

The **Ambassador skill** was built to take some of that work off whoever runs the round, and it isn't finished. It reads a short written description of what the program looks for, applies it to every candidate, and returns eight names with a reason for each. It's fast and confident, and it can't show you the evidence behind any of it - so nobody can check whether those reasons hold up.

In this activity you run that skill, change what it looks for, and then start extending it. Three steps:

| | Step | You're done when |
| --- | --- | --- |
| **1** | **Import and run** | Scout returns eight names from the program data. |
| **2** | **Change what it looks for** | A different definition has given you a different shortlist. |
| **3** | **Extend it** | The skill does something it couldn't before. |

Steps 1 and 2 you do on your own, and they're quick. **Step 3 is the main build, and it's where your table works together** - pick a direction, split the work, compare what each of you got. It isn't one change either: extend the skill, re-run, see what moved, then extend it again. Most cards include a prompt you can paste. **Change it as you like. It's a starting point, not the answer.**

**The skill proposes. A person decides.** The eight names are a recommendation someone has to act on, so every change you make should make that person's job easier: more evidence on screen, clearer reasoning, a faster way to overrule it.

::: details Glossary

- **Skill:** a folder of plain-text instructions Scout loads and follows. You can read it and edit it.
- **Cohort:** the group of eight the program brings in each round. Picking the next one is the job.
- **Candidate:** one of the volunteers the program could bring in. Not an applicant - 31 of the 72 never put themselves forward.
- **Definition:** the written description of what the program is looking for. The skill applies it to every candidate. Editing it is how you change the result.
- **Shortlist:** the eight names the skill returns. A proposal for a person to act on, not a decision.
- **Evidence:** the records behind a claim - what someone ran, the feedback they got, what they contributed.

:::

## Before you start

Download both files and keep them in the same folder.

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

Open Microsoft Scout and check it's signed in - ask it anything and confirm you get an answer back. You'll add the Ambassador skill in Step 1. The files stay on your machine; the prompts Scout builds from them go to the model.

**The data is fictional.** Invented people, invented scores, invented feedback. Nothing here describes a real person and no real program is being modeled.

What's in the skill:

```text
ambassador/
  SKILL.md              the instructions Scout loads and follows
  references/
    DEFINITION.md       what the program looks for. This is the file you edit
    PLAYBOOK.md         how the program describes itself
  definitions/          three worked alternatives - reach, depth, rising
```

::: tip When you're stuck, ask Scout
You're building with Scout, so it can also fix what you're building. Paste the error, or describe what came back wrong. Coaches are in the room if that doesn't land.
:::

---

## 1 · Import and run

**Done when:** Scout returns eight names from the program data.

1. Download `ambassador-skill.zip` and unzip it. In Scout, go to **Extensions → Import**, and drag in the `ambassador` folder - the one with `SKILL.md` inside. Use the **skill folder** drop zone, not the `.md` one. The trust warning is normal; this is the lab download.
   ![Screenshot of the Import Skill dialog window in Microsoft Scout.](./media/scout-import-skill-folder.png)

1. Unzip `ambassador-program-data.zip` somewhere Scout can reach it. You want the `program-data` folder - copy its full path, you'll paste it in a moment.

1. Start a **new chat** in Scout. It is important to start a **new chat** for the skill files to load.

1. Ask Scout to run it. Start every request with *"Using the ambassador skill"* - that's how Scout knows to call it. Swap in the path where you put the folder.

   ```text
   Using the ambassador skill, who should be in the next cohort? The data is in "C:\Users\me\Downloads\ambassador-program-data\program-data".
   ```

   You should see 8 names appear.

   **Those eight are a first guess, not an answer.** The skill judged everyone on seven summary scores and nothing else, and those scores are invented - some of them deliberately misleading. Finding where the list is wrong is the rest of the exercise.

## 2 · Change what it looks for

**Done when:** a different definition has given you a different shortlist.

The skill judges every candidate against `DEFINITION.md` - a few sentences of plain text. Swap it and the answer changes. Three worked alternatives ship with the skill.

```text
Using the ambassador skill, use definitions/depth.md as the definition instead. Re-run and tell me which names changed.
```

Then try `definitions/rising.md`. Same candidates, different results - and you changed it by swapping a paragraph of text, not by touching code.

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
      <p>You bring the idea, Scout does the building. Describe what you want, look at what comes back, then tell it what to change. Ask it for options when you're stuck — <em>"what else could this board show?"</em></p>
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
    emoji: "🖥️", color: "blue", title: "A local cohort board",
    what: "A page on your machine: the current shortlist, the records behind each, filters, and a column for what's waiting on a decision - all local, nothing hosted.",
    start: "Have Scout build a local HTML board from the run and open it.",
    prompt: "Using the ambassador skill, build a local HTML board of the current cohort - each name, the evidence behind it, filters for region and level, and a column for what's waiting on a decision.",
  },
  {
    emoji: "⚖️", color: "orange", title: "A fairness check on every run",
    what: "A check the skill runs on every shortlist - flags when the list clusters by region, level, or tenure, and any claim with no record behind it.",
    start: "Build the check into the skill so it runs on every shortlist, not as a one-off audit.",
    prompt: "Add a fairness check to the ambassador skill: every shortlist flags when the list clusters by region, level, or tenure, and any claim it can't trace to a record.",
  },
  {
    emoji: "🔍", color: "teal", title: "Read the evidence it ignores", tag: "easiest",
    what: "The skill judges on the summary scores. Teach it to open the real records - peer feedback, contributions - and weigh them.",
    start: "Point it at the files the summary hides, and weigh repeated patterns over one-off praise.",
    prompt: "Add to the ambassador skill: read PeerFeedback.csv and ProgramContributions.csv, not just the summary scores, and weigh a repeated pattern over one-off praise. Then show me who that adds who wasn't in the original eight.",
  },
  {
    emoji: "🧠", color: "purple", title: "Give it a memory",
    what: "A file it writes as well as reads, so every run knows what the last one decided - including a human override.",
    start: "Have the skill write each run and any human decision to a file, and read it back next time.",
    prompt: "Add a memory to the ambassador skill: write each run and any human override to a file, and read it on the next run so decisions carry forward.",
  },
  {
    emoji: "🛑", color: "pink", title: "Make it stop",
    what: "A rule that routes thin evidence to a person with a specific question, instead of guessing.",
    start: "Build the hold into the skill so candidates with thin evidence wait for a human decision.",
    prompt: "Add a rule to the ambassador skill: when a candidate's evidence is thin, don't decide - write the specific question a person should answer, and hold it.",
  },
  {
    emoji: "🧭", color: "green", title: "Your program, your rules",
    what: "You probably run something shaped like this - a nomination, a shortlist, a review. Work out what a skill would need to help, using what you just learned here.",
    start: "Describe your own program to Scout and have it draft the definition and the evidence list you'd need. Stay on paper - no real names, no exports.",
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
    what: "The most ambitious thing your table can name - make something new from the shortlist, or change how the skill decides.",
    start: "Describe the end state and get the smallest working version running first.",
    prompt: "I want to add [big idea] to the ambassador skill. Work out what it takes and get the smallest working version running first.",
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
| Scout ignores the skill | Start a new chat. Skills load only when a chat starts. Begin your request with *"using the ambassador skill"*. |
| Import didn't work | Unzip `ambassador-skill.zip` first, then import the **folder** - not the zip, and not `SKILL.md` on its own. |
| Scout can't find the data | Give it the full path to the unzipped `program-data` folder, for example `C:\program-data`. |
| The same eight names every time | Check Scout is reading the definition you edited. Ask it to show you the definition it just used. |
| A claim with no record behind it | Ask which file and row it came from. If it can't answer, it guessed - tell it to say so instead. |
| It changed more than you asked | Ask what it changed and why. Undo the parts you didn't want, then make one change at a time. |

---

[← Back to start](/)
