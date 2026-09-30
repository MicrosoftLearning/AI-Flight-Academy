---
title: The Ambassador - Code
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# The Ambassador

## Objectives

Contoso's AI Skilling Ambassador program is a group of volunteers who help colleagues use the company's AI tools - running office hours, mentoring, answering questions, and writing the guides everyone leans on, all on top of their day jobs. Each round the program brings in eight new ambassadors, chosen from people across nine regions already doing some of this informally.

`cohort.py` was built to take some of that work off whoever runs the round, and it isn't finished. It reads a short written description of what the program looks for, sends every candidate to the model, and returns eight names with a reason for each. It's fast and confident, and it can't show you the evidence behind any of it - so nobody can check whether those reasons hold up.

In this activity you run it, change what it looks for, and then start extending it. Three steps:

| | Step | You're done when |
| --- | --- | --- |
| **1** | **Run it** | `python cohort.py` returns eight names from the program data. |
| **2** | **Change what it looks for** | You've swapped the written description of what the program wants, re-run, and seen different names come back. |
| **3** | **Extend it** | `cohort.py` does something it couldn't before. |

Step 3 is the main build, and it isn't one change. Extend it, re-run, see what moved, then extend it again. Most cards include a prompt you can paste. **Change it as you like. It's a starting point, not the answer.**

**cohort.py proposes. A person decides.** The eight names are a recommendation someone has to act on, so every change you make should make that person's job easier: more evidence on screen, clearer reasoning, a faster way to overrule it.

::: details Glossary

- **Cohort:** the group of eight the program brings in each round. Picking the next one is the job.
- **Candidate:** one of the volunteers the program could bring in. Not an applicant - 31 of the 72 never put themselves forward.
- **Definition:** the written description of what the program is looking for. `cohort.py` applies it to every candidate. Editing it is how you change the result.
- **Shortlist:** the eight names the run returns. A proposal for a person to act on, not a decision.
- **Evidence:** the records behind a claim - what someone ran, the feedback they got, what they contributed.
- **Agent:** a Markdown file under `.github/agents/` that gives Copilot a role and a model to use. `challenger.agent.md` is a worked example. It's a text file, not a service - nothing is deployed.

:::

## Before you start

Download the starter.

<a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">A working cohort script, three alternative definitions, and the nine data files.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

Build with whichever GitHub Copilot surface you like - VS Code, the Copilot CLI, or the GitHub Copilot app - but the starter calls the **Copilot CLI** behind the scenes, so keep it signed in. You'll also need **Python 3.10+**.

**The data is fictional.** Invented people, invented scores, invented feedback. Nothing here describes a real person and no real program is being modeled - `program-data/DISCLAIMER.md` has the details.

::: warning Nothing to deploy
`AGENTS.md` and `.github/agents/` are **instructions, not infrastructure**: Markdown that tells Copilot what this repo is and what roles it can take. Nothing in them runs on its own; your Copilot surface reads and follows them. That means Copilot starts with context on this project, so you can open the folder and start asking.

No service, no orchestrator, no vector store, no Foundry. `cohort.py` reads the CSVs from your disk, builds a prompt, and hands it to the Copilot CLI - so the script isn't the agent, it delegates to one. The data starts local, but it travels with the prompt to a hosted model, and each call usually takes 20-60 seconds.

That's the ceiling for today, and it's deliberately low. The point is how far plain text and a small script get you.
:::

What's in the download:

```text
ambassador-starter/
  cohort.py         the entry point - picks the cohort
  definition.md     what the program looks for. This is the file you edit
  definitions/      three worked alternatives - reach, depth, rising
  agent.py          ask() and ask_json(), over the GitHub Copilot CLI
  program/data.py   loads the nine data files
  program-data/     72 candidates, ~2,000 evidence records across nine files
  AGENTS.md         what Copilot reads to learn the repo before it helps you
  .github/agents/   role files - challenger.agent.md, wired up by --challenge
  PLAYBOOK.md       how the program describes itself
```

::: tip When you're stuck, ask Copilot
You're building with Copilot, so it can also fix what you're building. Paste the error, or describe what came back wrong. Coaches are in the room if that doesn't land.
:::

---

## 1 · Run it

**Done when:** `cohort.py` returns eight names from the program data.

1. Unzip the starter and open a terminal in the `ambassador-starter` folder - the one with `cohort.py` inside. If `python` isn't found, try `py`.

   ```bash
   python cohort.py
   ```

   You should see 8 names appear. The first run takes 20-60 seconds - it's a full agent call.

   **Those eight are a first guess, not an answer.** The skill judged everyone on seven summary scores and nothing else, and those scores are invented - some of them deliberately misleading. Finding where the list is wrong is the rest of the exercise.

## 2 · Change what it looks for

**Done when:** a different definition has given you a different shortlist.

`cohort.py` judges every candidate against `definition.md` - a few sentences of plain text saying what the program wants. Swap that file and the answer changes.

Three alternative definitions ship with it: `reach.md` (work that gets reused), `depth.md` (one-to-one support), and `rising.md` (trajectory over standing).

```bash
python cohort.py --definition definitions/depth.md
python cohort.py --definition definitions/rising.md
```

Same candidates, different results - and you changed it by swapping a paragraph of text, not by touching code.

Then see what a second opinion does to it:

```bash
python cohort.py --challenge
```

That runs the shortlist, then loads `.github/agents/challenger.agent.md` and runs a **second pass on a different model** whose only job is to argue against the first. Two calls, two roles, two models, one script - about 25 lines in `cohort.py`. It's the smallest working example of the thing step 3 asks you to extend.

## 3 · Extend it

**Done when:** `cohort.py` does something it couldn't before.

`program-data` has nine files. `cohort.py` sends the model one summary line per person, built from just one of them, `CandidateProfiles.csv`. The other eight are already loaded by `program/data.py` and never reach the model: what people actually ran, what colleagues said, what they left behind, who applied. Send those records instead and the shortlist changes.

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
      <p>You bring the idea, Copilot writes the code. Describe what you want, run it, then tell it what to change. Ask it for options when you're stuck — <em>"what else could this dashboard show?"</em></p>
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
    emoji: "🔍", color: "blue", title: "Read the evidence it ignores", tag: "easiest",
    what: "`cohort.py` sends one summary line per person. Change it to send the real records and see who that adds.",
    start: "Send each candidate's actual PeerFeedback.csv and ProgramContributions.csv rows instead of the summary line, and weigh repeated patterns over one-off praise.",
    prompt: "Change cohort.py to send each candidate's full PeerFeedback.csv and ProgramContributions.csv rows instead of the one-line summary, weigh a repeated pattern over one-off praise, then show me who's on the new shortlist but not the original.",
  },
  {
    emoji: "🖥️", color: "teal", title: "A dashboard you can open",
    what: "Turn the run into a local page: the eight, the records behind each, filters, and what's waiting on a decision.",
    start: "Have a small script beside cohort.py render the run as an HTML page and open it.",
    prompt: "Add a step that renders the shortlist as a local HTML dashboard - each name, the evidence behind it, filters for region and level - and opens it.",
  },
  {
    emoji: "🎭", color: "orange", title: "A third voice",
    what: "`--challenge` already gives you a picker and a challenger on different models. Add a referee that reads both and recommends a final set for a person to sign off.",
    start: "Copy the shape of `challenger.agent.md`, give the referee its own model, and have `cohort.py` call all three in turn.",
    prompt: "Read cohort.py and .github/agents/challenger.agent.md to see how --challenge wires a role file into a second pass. Add a referee role beside it, on a different model, that reads both the shortlist and the challenge and recommends a final set with its reasoning for a person to sign off. Wire it in as a third pass and show me each stage.",
  },
  {
    emoji: "🤖", color: "pink", title: "The same question, two models",
    what: "Run the shortlist across two models and compare - keep only the names both land on, or show where they split.",
    start: "Set `AMBASSADOR_MODEL` for each run - the call falls back to the default if a model isn't available - then compare the two shortlists.",
    prompt: "Run the same definition through two different models by setting AMBASSADOR_MODEL each time, then show me the names both models agree on and where they split.",
  },
  {
    emoji: "⚖️", color: "purple", title: "A fairness check on every run",
    what: "A check cohort.py runs every time - flags when the list clusters by region, level, or tenure, and any claim with no record behind it.",
    start: "Build the check into cohort.py so it runs on every shortlist, not as a one-off.",
    prompt: "Add a fairness check to cohort.py: every run flags when the list clusters by region, level, or tenure, and any claim it can't trace to a record.",
  },
  {
    emoji: "🔁", color: "green", title: "Consistency at scale",
    what: "The model isn't perfectly consistent. Run the same definition many times and see which names are steady and which are luck of the draw.",
    start: "Loop the run, collect the shortlists, and count how often each person survives.",
    prompt: "Run the same definition ten times, collect the shortlists, and print how often each CandidateId makes the cut. Flag anyone who appears in fewer than half the runs.",
  },
  {
    emoji: "🤝", color: "teal", title: "Two definitions, head to head",
    what: "Run two definitions over the same candidates and show exactly where they disagree.",
    start: "Add a compare mode: pass two definition files and show what changed between the shortlists.",
    prompt: "Add a compare mode to cohort.py: run two definitions over the same candidates and show me where the two shortlists disagree, name by name.",
  },
  {
    emoji: "🧭", color: "blue", title: "Your program, your rules",
    what: "You probably run something shaped like this - a nomination, a shortlist, a review. Work out what a script like this would need to help, using what you just learned here.",
    start: "Describe your own program to Copilot and have it draft the definition and the evidence list you'd need. Stay on paper - no real names, no exports.",
    prompt: "I run [your program]. Using what cohort.py does, help me write the definition it would need, list the evidence I'd have to collect, and name where a person must stay in the loop. Keep it on paper - no real names and no exports.",
  },
  {
    emoji: "✨", color: "gray", title: "Yours",
    what: "The most ambitious thing your table can name. You've got Python, agents, git, and the CLI - aim high.",
    start: "Start with the smallest version that runs on the starter data.",
    prompt: "Our table wants to build [describe it]. Work out what it takes - a change to cohort.py, a new agent, a new check - and get the smallest version running first.",
  },
];
</script>

<DirectionBubbles :items="ideas" start-label="Where to start" />

::: tip 🎈 Start small
Nothing has to be perfect or finished. Get the smallest version working, then build on it. Time and token budget are the real limits - so aim at something you can show, not something you can finish.
:::

::: tip 🎛️ Two ways to change the model
`AMBASSADOR_MODEL` sets the model for a whole run - `$env:AMBASSADOR_MODEL = "claude-haiku-4.5"` in PowerShell. A role file sets the model for its own step, which is why the challenger answers on a different model than the picker. A second opinion is worth less if it shares the first one's blind spots.
:::

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| `python` isn't recognized | Install Python 3.10+, or try `python3` instead. |
| The run fails on the first call | Check the GitHub Copilot CLI is installed and signed in - `cohort.py` calls it behind the scenes. |
| It hangs for a while | A full agent call takes 20-60 seconds. Give it a minute before you cancel. |
| The same eight names every time | Check you passed `--definition` and that you edited the file you think you did. |
| A claim with no record behind it | Ask Copilot which file and row it came from. If it can't answer, it guessed - make it say so instead. |
| Copilot changed more than you asked | Review the change before you accept it. Undo, then ask for one change at a time. |

---

[← Back to start](/)
