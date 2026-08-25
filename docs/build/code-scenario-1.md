---
title: The Digital Twin - Code
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🟣 The Digital Twin

::: warning 🚧 Work in progress
Scenario 1 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in code - VS Code, GitHub Copilot, and the Copilot CLI.**

Get a twin answering from a Python call in ten minutes, then build something real around it.

## What you're solving

You already know how you work. Which trade-off you make when two things conflict, what you check before you commit, how the wording changes between a partner team and your own.

None of that is written down anywhere an agent can reach. So it only gets applied while you're sitting there applying it.

Today you write it down as plain files and call it from code. Once an agent can reach your twin, it can ask at commit time, on a schedule, or mid-task - and get back what you would have said.

## How this runs

**Whatever you build has to run without a chat window.** Your output is a command, a hook, a server, a scheduled job, or a local process - that's the bar, and it's the only rule.

| | Step | Time |
| --- | --- | --- |
| **1** | **Get your twin answering from code** | 10 min |
| **2** | **Build something that runs headless** - pick a direction, split it across your table | 90 min |

You'll do step 1 on your own. Step 2 is where the table works together, and it's most of the session.

## Before you start

::: warning The twin comes pre-populated with fictional data
You won't write a persona today. The starter ships as **Jordan Reyes**, a made-up engineer at a fictional company, so it answers on the first command and nothing of yours goes into a shared exercise. Everything you build runs against Jordan.

`DISCLAIMER.md` in the starter lists what's invented, and how to point the twin at your own work after the session.
:::

**Check the Copilot CLI is installed and signed in:**

```bash
copilot --version
```

Missing? `npm install -g @github/copilot`, then run `copilot` once to sign in.

**Python 3.10+** for the starter. Nothing to install unless you build the MCP server.

<a class="lab-card" href="/AI-Flight-Academy/downloads/twin-code-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">A fictional twin, ready to answer. One call that reaches it from Python, a worked example, and an MCP server.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

::: tip Two places to get unstuck
Ask Copilot - it's building with you, so paste the error and let it fix it. For mechanics like MCP or guardrails, the **[Guides](/bricks/)** are short how-tos. Coaches are in the room and every table has an SME.
:::

---

## 1 · Get your twin answering from code

**Done when:** `python twin.py "..."` comes back with a position and the rule behind it.

Unzip the starter and open the folder in VS Code. **Every command on this page runs from inside `twin-code-starter/`**, so open a terminal there:

```bash
cd twin-code-starter
copilot skill list
```

`my-twin` should appear under **Project skills** - that's the CLI finding `.github/skills/` in the current folder, so it only shows up when your terminal is in the starter. There's nothing to register.

```text
twin-code-starter/
  .github/skills/my-twin/     the twin. Found here automatically
    SKILL.md                  how it answers
    references/
      persona.md              how Jordan decides
      voice.md                how Jordan writes
  twin.py                     ask the twin, from Python
  examples/review_diff.py     a worked example that runs headless
  mcp_server.py               the twin as MCP tools
```

Ask it something:

```bash
python twin.py "Using my twin: a teammate is blocked on my review but I'm mid-migration. What do I do?"
```

You'll get a position and the rule from `persona.md` that produced it. That's the whole loop - everything in step 2 is a different way to ask.

::: tip Making it yours, after the hack
`persona.md` and `voice.md` are plain markdown in an open format. Point a Copilot surface that can see your mail and calendar at them, let it draft both from how you actually write and decide, then correct what it got wrong.

Keep that local - nothing personal belongs in a shared repo. `DISCLAIMER.md` has the detail.
:::

Try changing a rule to see it land. Open `references/persona.md`, edit section 12 (Jordan's bar), and re-run the same question - the answer moves with the file.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>One line each: what rule did your twin cite, and did the answer change when you edited it? Then decide what you're building before anyone writes code.</p>
  </div>
</div>

## 2 · Build something that runs headless

**Done when:** something runs without you typing into a chat, and it does it the way you would.

### Pick a direction

Six starting points, plus your own. Take one, combine two, or build something specific to how you work.

| | What it is | Your first ten minutes |
| --- | --- | --- |
| 🔍 **A reviewer that reviews like you** | Your standards and your recurring notes, applied to a diff before anyone else sees it | `examples/review_diff.py` already does this. Run it on a real diff, then change one rule in `persona.md` and watch the verdict move |
| 😈 **A devil's advocate** | Steel-mans the opposite of whatever you just decided, using your own rules | One script, one argument: `python advocate.py "I'm going to ship it Friday"`. Ask for JSON with `strongest_objection` and `rule` |
| ⏮️ **A time machine** | Replay a decision you made months ago, giving the twin only what you knew then | Write `decisions/one.json` with `known_then`, `what_i_did`. One call, then print the twin's call next to yours |
| 🔌 **An MCP server** | Your twin as a tool any agent can reach - VS Code Copilot, another twin | From the starter folder: `pip install -r requirements.txt`, then `python mcp_server.py`. Confirm VS Code sees it, then add one tool worth calling |
| 👻 **A daemon** | Watches a folder, a repo or a queue and flags what it finds, without being asked | One dry pass over one folder, five files maximum, findings written to a local file. Add the loop only once that works |
| 🥊 **Twin vs twin** | Two specs argue the same call and have to converge | Two `references/` folders, both synthetic. Each returns JSON with `position` and `rule`; a third call returns `agree` or `next_question` |
| 🎯 **Yours** | Anything that needs code and runs without a chat window | Write the command you wish existed, hard-code one input, and make that single case work end to end |

**Pick by pain, not novelty** - something you forgot, chased, or redid by hand last week.

::: warning Three of these can eat your session
**Twin vs twin** needs three agent turns per round, so a single iteration costs a few minutes. **The time machine** is only interesting if you already have a decision in mind and know how it turned out. **A daemon** that loops before it works once will burn the clock quietly.

All three are good builds. Just get one pass working before you add the second call, the second twin, or the loop.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Two minutes round the table: what are you building, and what does it run on - a hook, a timer, a request? Out loud, before anyone opens an editor.</p>
  </div>
</div>

### Split the work

Pick one direction, then **take one piece each that runs on its own**. The natural seams:

| Piece | Owns |
| --- | --- |
| **The trigger** | What starts it - the hook, the timer, the request |
| **The input** | What gets gathered and how much. Bounds, filters, what's noise |
| **The call** | The prompt and the shape that comes back. Where your rules get applied |
| **The output** | Where it lands - exit code, comment, file, notification |

**Stub the seams first** - fake input, a fake twin response, fake output - so the whole thing runs end to end in five minutes. Then each person replaces one fake with the real thing.

If your direction doesn't split cleanly that way, split by **case** instead: one person per test case, fixture or question, each independently runnable. Merge the best ones at the end.

Share the **prompt that worked** and the **shape you settled on** - you're all running against the same twin, so there's nothing to keep back.

### Two things that will shape the design

**A call takes 20 to 60 seconds.** It's a full agent turn, not a completion. Put the bound in the first version rather than the fifth - one diff, one fixture, one folder, one question. Anything that calls the twin per-file or in a poll loop will be slower than anyone will wait for.

**Ask for JSON when a program reads the answer.** `ask_json()` appends the instruction, strips a code fence if the model adds one, and gives you a parsed object:

```python
from twin import ask, ask_json

ask("Using my twin: should I take this on before Friday?")

ask_json("Using my twin: rate this change. Keys: verdict, reason.")
```

### Build in layers

1. **The skeleton** - trigger fires, calls a stub, writes something. No twin yet
2. **One real call** - swap the stub for `ask()`, print what comes back
3. **A shape** - move to `ask_json()` so the output is parseable
4. **Your rules** - make sure it's citing `persona.md` and not answering generically
5. **A bound** - cap what it reads and how often it runs

The more specific your prompt, the less you'll undo afterwards:

| Vague | Specific |
| --- | --- |
| *"Review this code"* | *"Review this diff the way I would. Apply my bar from persona.md. If my files don't cover something, leave it alone."* |
| *"Is this risky?"* | *"Return JSON: verdict (block/warn/ok), reason (one sentence), and the persona.md line behind it."* |
| *"Make it better"* | *"Cite which rule decided each note, so I can tell when it's guessing."* |

::: details The worked example, if you want a running start

`examples/review_diff.py` reviews a diff against your `persona.md` and **exits 1 if your twin would block it**. That exit code is what makes it a hook rather than a chat:

```bash
python examples/review_diff.py --staged
git diff main... | python examples/review_diff.py --stdin
```

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

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Halfway: is it running end to end, even badly? If not, cut it down until something works before adding anything back.</p>
  </div>
</div>

## Push it further

1. **Make it disagree with you** - have it flag where your own rules contradict each other.
2. **Give it a memory** - a file it appends to, so the next run knows what the last one found.
3. **Make it prove itself** - fixtures with known answers, so you can tell when a spec edit breaks something that used to work.
4. **Put it in CI** - a workflow step instead of a local hook.
5. **Let another agent call it** - wire `mcp_server.py` into VS Code and ask Copilot to consult your twin mid-task.
6. **Take the rules with you** - `persona.md` and `voice.md` are plain text, so they move to Cowork or Scout unchanged.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)
