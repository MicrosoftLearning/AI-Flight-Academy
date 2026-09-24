---
title: The Digital Twin - Code
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# The Digital Twin

<div class="brief">
<span class="brief-badge">The problem</span>

You already know how you work. Which trade-off you make when two things conflict, what you check before you commit, how the wording changes between a partner team and your own.

None of that is written down anywhere an agent can reach. So it only gets applied while you're sitting there applying it.

Here you turn it into a skill an agent can load - and call it from code. Once an agent can reach your twin, it can ask at commit time, on a schedule, or mid-task - and get back what you would have said.
</div>

## Objectives

Get a twin answering from a Python call, then make it better - extend the skill so it works the way you want.

By the end, you should have:

- **A twin answering from code** - `python twin.py "..."` returns a position and the `persona.md` rule behind it.
- **A change that extends the skill** - structured memory, evaluations, feedback, domain standards, or any other way you made the twin sharper.

## Setup

Build with whichever GitHub Copilot surface you like - VS Code, the Copilot CLI, or the GitHub Copilot app - but the starter calls the **Copilot CLI** behind the scenes, so keep it signed in. The starter also needs **Python 3.10+**; nothing else to install unless you build the MCP server.

::: warning The twin comes pre-populated with fictional data
You don't need to write a persona today. The starter ships as **Jordan Reyes**, a made-up engineer at a fictional company, so it answers on the first command and nothing of yours goes into a shared exercise. Everything you build runs against Jordan - unless you take the optional step below to use your own.

`DISCLAIMER.md` in the starter lists what's invented, and how to point the twin at your own work after the session.
:::

### 1 · Download the starter

<a class="lab-card" href="/AI-Flight-Academy/downloads/twin-code-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">A fictional twin, ready to answer. One call that reaches it from Python, four worked examples spanning code and non-code, an MCP server, and a make-it-yours interview.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

### 2 · Open it and find the twin

Unzip the starter and open the folder in the Copilot surface you prefer. You'll also need a terminal open inside it. **Every command on this page runs from inside `twin-code-starter/`**:

```bash
cd twin-code-starter
copilot skill list
```

`my-twin` appears under **Project skills** - the CLI finds `.github/skills/` in the current folder, so it only shows up when your terminal is in the starter. There's nothing to register.

```text
twin-code-starter/
  .github/skills/my-twin/     the twin. Every Copilot surface finds it here
    SKILL.md                  how it answers
    references/
      persona.md              how Jordan decides
      voice.md                how Jordan writes
      standards.md            the bar for judging work (swap for your domain)
      memory.md               a dated log it reads before recurring work, and writes after
  twin.py                     ask the twin, from Python
  onboard.py                  make it yours: an interview that replaces Jordan
  examples/                   review a diff, decide anything, triage an inbox, draft a status
  mcp_server.py               the twin as MCP tools
```

**Use whichever Copilot surface you like** - the GitHub Copilot app, the GitHub Copilot CLI, the VS Code Agents window, or Copilot Chat in the VS Code editor. Whichever you pick, you'll work in two places side by side:

| | What it's for |
| --- | --- |
| **A terminal** in `twin-code-starter/` | Running the twin from code - `python twin.py` and the examples. This is what you're building: something that works without a chat window. |
| **Your Copilot surface** | Getting Copilot to write and change that code with you. |

### 3 · Ask your twin

**In the terminal**, run one question to confirm everything works - Python, the Copilot CLI, and your sign-in:

```bash
python twin.py "Using my twin: a teammate is blocked on my review but I'm mid-migration. What do I do?"
```

You'll get a position and the rule from `persona.md` or `standards.md` that produced it. Each call takes 20-60 seconds - it's a full agent turn, not a hang. That's the whole loop; the `examples/` folder shows what you can build on it, and each direction below points at one.

::: tip Asking in chat works too
Ask the same question in your Copilot surface's chat and the twin answers there as well. In chat it also adds one dated line to `references/memory.md` - that's by design, so it remembers the call next time. Still make sure the terminal command above works. The code you build calls the twin the same way, so if it works in the terminal, it will work in your code.
:::

::: details Optional · Use your own work instead of Jordan (about 10-15 minutes)
Skip this if you'd rather get straight to building - everything on this page works with Jordan.

1. **Run the interview:** `python onboard.py`. Answer a handful of short questions and it writes your own `persona.md`, `voice.md`, and `standards.md`. It runs locally and sends nothing anywhere. Jordan's files are backed up as `*.jordan.md`, so you can compare or switch back.
2. **Deepen it from your real work (optional).** Open one of the new files in a Copilot surface that can see your mail and calendar, and ask it to fill in a thin section from how you actually work. Correct what it drafts.
3. **Re-run your question** with `python twin.py` and check the answer now sounds like you.

Keep your own files local - nothing personal belongs in a shared repo. `DISCLAIMER.md` has the detail.
:::

## Build

Now make your twin better: extend the skill so it works the way you want. Pick a direction with your table and build in small steps.

::: tip 🎈 You don't need to be a developer
Copilot writes the code with you. Describe what you want, run it, and correct what comes back - that's the skill here. Anything on this page phrased as a prompt is an example, not a script; say it your way.
:::

### Pick a direction

Take one, combine two, or pick your own. Click a bubble to see where to start and an example prompt that builds the change and then tests it.

<script setup>
const directions = [
  {
    emoji: "🗂️", color: "blue", title: "Structure its memory",
    what: "Record the decision, context, rule, outcome, confidence, and date - not one free-form line.",
    start: "`remember()` in `twin.py` writes one dated line to `references/memory.md`. Give each entry fields, and make `examples/decide.py --remember` fill them in.",
    prompt: "Change remember() in twin.py so each memory entry records the decision, context, rule, outcome, confidence, and date instead of one free-form line. Keep the existing lines readable and update examples/decide.py --remember to fill in the new fields.",
  },
  {
    emoji: "🧪", color: "green", title: "Add evaluations",
    what: "Scenarios with the expected decision, the rule it should cite, the tone, and what it must never do.",
    start: "Write three scenarios in a small file, then a script that runs each one through `ask_json()` and prints pass or fail. Three is plenty - each call takes 20-60 seconds.",
    prompt: "Create evals/scenarios.json with three situations, each with the expected decision, the rule my twin should cite, the tone, and one thing it must never do. Then write evals/run.py that sends each situation to my twin with ask_json() and prints pass or fail for each check. Run it and show me the results.",
  },
  {
    emoji: "👍", color: "purple", title: "Add feedback commands",
    what: "Mark a decision correct, wrong, or partly right - and say why.",
    start: "Add a small `feedback.py` that appends your verdict and reason to `references/memory.md`, so the next call can learn from it.",
    prompt: "Add a feedback.py command that takes a past decision, a verdict (correct, wrong, or partly right), and a reason, and appends it as a new dated line in references/memory.md.",
  },
  {
    emoji: "📈", color: "teal", title: "Track outcomes",
    what: "Revisit past decisions and record whether the call actually worked.",
    start: "Read the dated entries in `references/memory.md` and ask what happened to each one. Memory is append-only, so record outcomes as new lines that point back to the original.",
    prompt: "Write outcomes.py that lists the decisions in references/memory.md, asks me whether each one worked, and records my answer as a new dated line that points back to the original entry - never edit existing lines.",
  },
  {
    emoji: "⚖️", color: "orange", title: "Handle contradictions",
    what: "Notice when a new preference clashes with an older one, and ask which should win.",
    start: "Before a new rule goes into `persona.md` or `standards.md`, have the twin check it against what's already there.",
    prompt: "Write a script that takes a new preference I want to add, asks my twin with ask_json() whether it conflicts with anything in persona.md or standards.md, and if it does, shows me both and asks which should win before saving anything.",
  },
  {
    emoji: "📚", color: "pink", title: "Add domain standards",
    what: "Separate references for code review, hiring, writing, prioritization, incident response, and planning.",
    start: "Split `standards.md` into one file per domain under `references/`, then update the skill's `SKILL.md` so the twin reads only the one that fits the task.",
    prompt: "Split references/standards.md into separate files for code review, writing, and prioritization, and update .github/skills/my-twin/SKILL.md so my twin reads only the file that matches the task.",
  },
  {
    emoji: "🔗", color: "teal", title: "Connect it to your real work (Work IQ)",
    what: "Point the twin at your actual mail, calendar, Teams, and files instead of the sample files.",
    start: "First swap Jordan for your own persona - run `python onboard.py` (the optional step in Setup), or Work IQ just feeds your real mail to a made-up engineer. Then add the Work IQ MCP server - an existing Microsoft server, nothing to build. See the Work IQ callout below the bubbles for the link.",
    prompt: "I've run onboard.py so the twin uses my own persona. Help me connect the Work IQ MCP server so it can read my real mail and calendar.",
  },
  {
    emoji: "😈", color: "orange", title: "A decision desk",
    what: "Takes a position on anything - or steel-mans the opposite, using your own rules.",
    start: "`examples/decide.py` returns position + rule as JSON. Add a second call that argues back before you commit.",
    prompt: "Extend examples/decide.py so that after my twin takes a position, a second call argues the opposite using the same rules. Print both side by side so I can choose.",
  },
  {
    emoji: "🔌", color: "pink", title: "An MCP server",
    what: "Your twin as a tool any agent can reach - GitHub Copilot in VS Code, the CLI, another twin.",
    start: "From the starter: `pip install -r requirements.txt`, then `python mcp_server.py`. Confirm VS Code sees it, then add one tool worth calling.",
    prompt: "Look at mcp_server.py and add a tool called draft_reply that takes a message and returns the reply my twin would send. Then show me how to add this server to VS Code.",
  },
  {
    emoji: "🎯", color: "gray", title: "Yours",
    what: "Anything that runs without a chat window, code or not.",
    start: "Write the command you wish existed, hard-code one input, and make that single case work end to end.",
    prompt: "I want a command that [describe what it does]. Build the smallest version that works for one hard-coded input, then we'll make it general.",
  },
];
</script>

<DirectionBubbles :items="directions" start-label="Where to start" />

<div class="callout-bubble">
<span class="callout-bubble-icon">🔗</span>

**Ground it in your real work with Work IQ.** The twin reads static files today, and it answers as Jordan until you run `python onboard.py` to swap in your own persona (the optional step in Setup) - do that first, or you're feeding your real mail to a made-up engineer. Then, to answer from your actual mail, calendar, Teams, and files, connect the [Work IQ MCP server](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview) - an existing Microsoft server, so there's nothing to build. It's the same Work IQ the Cowork and Scout altitudes use, reachable here as a tool. For other capabilities, the [MCP Registry](https://github.com/mcp) is worth a browse before you write a server of your own.

</div>

::: details Splitting the work across your table
Take one piece each that runs on its own, along the natural seams:

| Piece | Owns |
| --- | --- |
| **Trigger** | What starts it - a hook, a timer, a request |
| **Input** | What's gathered, and its bounds |
| **Call** | The prompt and the shape that comes back - where your rules get applied |
| **Output** | Where it lands - exit code, comment, file |

**Stub every seam first** - fake input, fake twin reply, fake output - so the whole thing runs end to end in five minutes. Then each person swaps one fake for the real thing.
:::

### Build in layers

Two constraints shape every build here: **a call takes 20-60 seconds** - a full agent turn, so bound what you read (one diff, one fixture) and never call per-file or in a loop - and **ask for JSON when a program reads the answer** (`ask_json()` returns a parsed object; prose is useless to a parser).

Then layer up: a skeleton on a stub, one real `ask()`, `ask_json()` for a parseable shape, your rules (make sure it cites `persona.md` or `standards.md`), a bound. Be specific - *"review this diff the way I would; apply my bar from standards.md; leave what my files don't cover"* beats *"review this code."*

::: details The worked example, if you want a running start

`examples/review_diff.py` reviews a diff against your `persona.md` and **exits 1 if your twin would block it**. The starter isn't a git repo yet, so make it one and commit the starting point - then edit a file, stage it, and review it:

```bash
git init
git add -A
git commit -m "starter"
# edit a file, then:
git add -A
python examples/review_diff.py --staged
```

If git asks who you are, run the two `git config` commands it prints, then commit again. That exit code is what makes it a hook rather than a chat:

```sh
# .git/hooks/pre-commit
#!/bin/sh
python examples/review_diff.py --staged || exit 1
```

Read it for the pattern - gather input, bound it, ask for JSON, act on the verdict - then build something else with it.
:::

::: warning You approve before anything goes out
Your twin drafts, flags and reports. Sending, committing and posting stay yours - whatever you build should hand the decision back.
:::

## After today

This is a starting point, not the finish line. You got a twin answering from code and built one headless thing on it - against fictional Jordan, so nothing of yours went into a shared exercise.

Making it yours is the next step, and there are two ways. Run `python onboard.py` for a short interview that writes your own `persona.md`, `voice.md`, and `standards.md` - or edit them by hand, pointing a Copilot surface that can see your mail and calendar at them and correcting what it drafts. Keep that local - nothing personal belongs in a shared repo; `DISCLAIMER.md` has the detail. Everything you built today runs against your own twin unchanged.

---

[← Back to start](/)
