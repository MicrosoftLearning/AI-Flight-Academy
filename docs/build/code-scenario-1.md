---
title: The Digital Twin – Code
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🟣 The Digital Twin

::: warning 🚧 Work in progress
Scenario 1 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in code – VS Code, GitHub Copilot, and the Copilot CLI.**

Get a twin answering from a Python call in fifteen minutes, then build something real around it.

## What you're solving

Copilot can already do your work – across your repos, your files, your terminal. What it can't do is any of it **as you**: block the change you'd block, ask the question you always ask, write the message the way you'd write it.

Written down, that becomes something a program can call. And once a program can call it, your twin stops being a chat window and starts being a component – a hook, a service, a tool other agents can reach.

## What makes this the Code altitude

**Whatever you build has to run without a chat window.** A git hook, a scheduled job, an MCP server, a daemon, something another program shells out to. That one constraint is the whole difference: it rules out prompting nicely and forces you to design something.

## How this runs

| | Step | Time |
| --- | --- | --- |
| **1** | **Get your twin answering from code** | 15 min |
| **2** | **Build something that runs headless** – pick a direction, split it across your table | 85 min |

You'll do step 1 on your own. Step 2 is where the table works together, and it's most of the session.

## Before you start

**Check the Copilot CLI is installed and signed in:**

```bash
copilot --version
```

Missing? `npm install -g @github/copilot`, then run `copilot` once to sign in.

**Python 3.10+** for the starter. Only `mcp_server.py` needs a dependency.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/twin-code-starter.zip" download>
    <span class="lab-card-emoji">📦</span>
    <span class="lab-card-title">Starter</span>
    <span class="lab-card-desc">The twin, one call that reaches it from Python, a worked example, and an MCP server. Small on purpose.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/avery-persona-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Avery Washington</span>
    <span class="lab-card-desc">Optional. A made-up marketing manager with a fake inbox and calendar – use instead of your own data.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

::: tip Two places to get unstuck
Ask Copilot – it's building with you, so paste the error and let it fix it. For mechanics like MCP or guardrails, the **[Guides](/bricks/)** are short how-tos. Coaches are in the room and every table has an SME.
:::

---

## 1 · Get your twin answering from code

**Done when:** `python twin.py "..."` comes back with something you'd recognise as yours.

Unzip the starter and open the folder in VS Code. Then confirm the CLI can see the twin:

```bash
copilot skill list
```

`my-twin` should appear under **Project skills**. The CLI discovers skills from `.github/skills/` automatically – there's nothing to register.

```text
twin-code-starter/
  .github/skills/my-twin/     the twin. Found here automatically
    SKILL.md                  how it answers
    references/
      persona.md              how you decide      ← replace with yours
      voice.md                how you write       ← replace with yours
  twin.py                     ask your twin, from Python
  examples/review_diff.py     a worked example that runs headless
  mcp_server.py               your twin as MCP tools
```

Ask it something:

```bash
python twin.py "Using my twin: a teammate is blocked on my review but I'm mid-migration. What do I do?"
```

### Make it yours

`persona.md` and `voice.md` ship describing a **fictional engineer**, so the starter answers before you've written anything. Until you swap them, every answer is that person's – the twin says so in its own output.

Fastest first:

1. **Bring them.** Built a twin in Cowork or Scout this morning? Copy your `persona.md` and `voice.md` into `references/`. Same format, no changes needed.
2. **Use the persona pack.** Write from Avery's synthetic inbox and calendar, with no personal data involved.
3. **Write them.** Sections 4, 5 and 14 do most of the work – what you refuse, what wins when priorities collide, and how you handle the people you deal with most. The rest can stay rough.

Re-run the same question afterwards. If the answer moved, the file is doing its job.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Everyone's twin answering from a terminal before anyone starts building. Whoever's is still the fictional engineer, say so now.</p>
  </div>
</div>

## 2 · Build something that runs headless

**Done when:** something runs without you typing into a chat, and it does it the way you would.

### Pick a direction

Six starting points. Take one, combine two, or build something specific to how you work.

| | What it is | Where to start |
| --- | --- | --- |
| 🔍 **A reviewer that reviews like you** | Your standards, your recurring nit, the thing you'd block on – running on a diff | `examples/review_diff.py` already does this. Read it, then make it yours |
| ⏮️ **A time machine** | Replay a decision you made months ago, giving the twin only what you knew then. Compare its call to what you actually did | Write the situation as a fixture, feed it in, diff the two |
| 🥊 **Twin vs twin** | Two specs argue the same call and have to converge. Yours and a teammate's | Two `references/` folders, two calls, one referee prompt |
| 🔌 **An MCP server** | Your twin as a tool any agent can reach – VS Code Copilot, another twin | `mcp_server.py` runs already. Add tools worth calling |
| 👻 **A daemon** | Watches a folder, a repo or a queue and acts unattended | A loop, a bound, and somewhere local to write what it found |
| 😈 **A devil's advocate** | Steel-mans the opposite of whatever you just decided, using your own rules | One call, inverted prompt, your persona as the source of the counter-argument |
| 🎯 **Yours** | Anything that needs code and runs without a chat window | – |

**Pick by pain, not novelty** – something you forgot, chased, or redid by hand last week.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Two minutes round the table: what are you building, and what does it run on – a hook, a timer, a request? Out loud, before anyone opens an editor.</p>
  </div>
</div>

### Split the work

Pick one direction, then **take one piece each that runs on its own**. The natural seams:

| Piece | Owns |
| --- | --- |
| **The trigger** | What starts it – the hook, the timer, the request. Runs before anything else works |
| **The input** | What gets gathered and how much. Bounds, filters, what's noise |
| **The call** | The prompt and the shape that comes back. Where the twin's rules get applied |
| **The output** | Where it lands – exit code, comment, file, notification |

Each of those is testable against a stub, so nobody waits on anyone else to start.

Share the **prompt that worked** and the **shape you settled on**. Never share output – that's your mailbox.

### Two things that will shape the design

**A call takes 20 to 60 seconds.** It's a full agent turn, not a completion. Anything that loops needs a bound – review one diff, not forty files. Get the bound in early, because it changes the architecture rather than the tuning.

**Ask for JSON when a program reads the answer.** `ask_json()` appends the instruction, strips a code fence if the model adds one, and gives you a parsed object:

```python
from twin import ask, ask_json

ask("Using my twin: should I take this on before Friday?")

ask_json("Using my twin: rate this change. Keys: verdict, reason.")
```

### Build in layers

1. **The skeleton** – trigger fires, calls a stub, writes something. No twin yet
2. **One real call** – swap the stub for `ask()`, print what comes back
3. **A shape** – move to `ask_json()` so the output is parseable
4. **Your rules** – make sure it's citing `persona.md` and not answering generically
5. **A bound** – cap what it reads and how often it runs

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
git diff main... | python examples/review_diff.py -
```

```sh
# .git/hooks/pre-commit
#!/bin/sh
python examples/review_diff.py --staged || exit 1
```

Read it for the pattern – gather input, bound it, ask for JSON, act on the verdict – then build something else with it.
:::

::: warning Nothing goes out without you
Your twin drafts, blocks, flags and reports. Sending, committing and posting stay yours – whatever you build should hand the decision back.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Halfway: is it running end to end, even badly? If not, cut it down until something works before adding anything back.</p>
  </div>
</div>

## Push it further

1. **Make it disagree with you** – have it flag where your own rules contradict each other.
2. **Give it a memory** – a file it appends to, so the next run knows what the last one found.
3. **Make it prove itself** – fixtures with known answers, so you can tell when a spec edit breaks something that used to work.
4. **Put it in CI** – a workflow step instead of a local hook.
5. **Let another agent call it** – wire `mcp_server.py` into VS Code and ask Copilot to consult your twin mid-task.
6. **Take the rules with you** – `persona.md` and `voice.md` are plain text, so they move to Cowork or Scout unchanged.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)
