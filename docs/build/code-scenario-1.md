---
title: The Digital Twin - Code
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🟣 The Digital Twin

::: warning 🚧 Work in progress
Scenario 1 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in code - VS Code, GitHub Copilot, and the Copilot CLI.**

## The problem

You already know how you work. Which trade-off you make when two things conflict, what you check before you commit, how the wording changes between a partner team and your own.

None of that is written down anywhere an agent can reach. So it only gets applied while you're sitting there applying it.

Today you write it down as plain files and call it from code. Once an agent can reach your twin, it can ask at commit time, on a schedule, or mid-task - and get back what you would have said.

## Objectives

Get a twin answering from a Python call, then build something real around it that runs **without a chat window** - a command, a hook, a server, a scheduled job, a local process. That's the bar, and it's the only rule.

By the end, you should have:

- **A twin answering from code** - `python twin.py "..."` returns a position and the `persona.md` rule behind it.
- **Something headless built on it** - a reviewer, a triage, a status drafter, an MCP server: one real thing that uses the twin and runs without you in a chat, the way you would.

## Setup

**Check the Copilot CLI is installed and signed in:**

```bash
copilot --version
```

Missing? `npm install -g @github/copilot`, then run `copilot` once to sign in. The starter also needs **Python 3.10+**; nothing else to install unless you build the MCP server.

::: warning The twin comes pre-populated with fictional data
You won't write a persona today. The starter ships as **Jordan Reyes**, a made-up engineer at a fictional company, so it answers on the first command and nothing of yours goes into a shared exercise. Everything you build runs against Jordan.

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

Unzip the starter and open the folder in VS Code. **Every command on this page runs from inside `twin-code-starter/`**, so open a terminal there:

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

**`.github/skills/` is the portable spot every surface reads**, so pick whichever you like: open the folder in **VS Code** and ask *"using my twin, ..."* in chat; run the examples from the **Copilot CLI**; or commit it and let the **GitHub coding agent** use the same twin. Nothing here is CLI-only.

### 3 · Ask your twin

```bash
python twin.py "Using my twin: a teammate is blocked on my review but I'm mid-migration. What do I do?"
```

You'll get a position and the rule from `persona.md` or `standards.md` that produced it. That's the whole loop - and it's not just code. The four examples show the range:

```bash
python examples/decide.py "should I take the on-call swap this weekend?"    # any call, as you
python examples/triage.py examples/inbox.sample.md                          # sort an inbox, draft replies
python examples/status.py --to manager "guard shipped; lantern slips to thu"  # a status in your voice
python examples/review_diff.py --staged                                     # review a diff, block on a hook
```

Change a rule to see it land: open `references/standards.md`, edit what Jordan blocks, and re-run `review_diff.py` - the verdict moves with the file.

<div class="callout-bubble">
<span class="callout-bubble-icon">🧬</span>

**Want it to be *you* instead of Jordan?** Run `python onboard.py` - a short interview that swaps in your own persona, voice, and standards in a few minutes. Jordan is backed up so you can compare.

</div>

## The hack

Now build something that runs headless - no chat window. Pick a direction with your table, split it into pieces, and build in small steps.

### Pick a direction

Take one, combine two, or build something specific to how you work.

| | What it is | Your first ten minutes |
| --- | --- | --- |
| 🔍 **A reviewer that reviews like you** · code | Your bar and your recurring notes, applied to a diff before anyone else sees it | `examples/review_diff.py` already does this. Run it on a real diff, then change a rule in `standards.md` and watch the verdict move |
| 📥 **A desk that clears your inbox** · non-code | Sorts what came in and drafts each reply the way you'd send it | `examples/triage.py` is the start. Point it at your own (work-safe) list, then add a bucket your job actually needs |
| ✍️ **A drafter in your voice** · non-code | Turns rough notes into the update, reply, or summary you'd have written | `examples/status.py` drafts a status. Fork it for the thing you write most - a PR description, a weekly note, a decline |
| 🧠 **A twin that remembers** | Reads what it did last time before it acts, so it gets sharper across a session | `decide.py --remember` and `review_diff.py` already log to `memory.md`. Build something that reads it first and changes its call because of it |
| 😈 **A decision desk** | Takes a position on anything - or steel-mans the opposite, using your own rules | `examples/decide.py` returns position + rule as JSON. Add a second call that argues back before you commit |
| 🔌 **An MCP server** | Your twin as a tool any agent can reach - GitHub Copilot in VS Code, the CLI, another twin | From the starter: `pip install -r requirements.txt`, then `python mcp_server.py`. Confirm VS Code sees it, then add one tool worth calling |
| 🎯 **Yours** | Anything that runs without a chat window, code or not | Write the command you wish existed, hard-code one input, and make that single case work end to end |

<div class="callout-bubble">
<span class="callout-bubble-icon">🔗</span>

**Ground it in your real work with Work IQ.** The twin reads static files today. To answer from your actual mail, calendar, Teams, and files, connect the [Work IQ MCP server](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview) - an existing Microsoft server, so there's nothing to build. It's the same Work IQ the Cowork and Scout altitudes use, reachable here as a tool. Needs a Microsoft 365 sign-in, so treat it as a stretch. For other capabilities, the [MCP Registry](https://github.com/mcp) is worth a browse before you write a server of your own.

</div>

### Split the work

Take one piece each that runs on its own, along the natural seams:

| Piece | Owns |
| --- | --- |
| **Trigger** | What starts it - a hook, a timer, a request |
| **Input** | What's gathered, and its bounds |
| **Call** | The prompt and the shape that comes back - where your rules get applied |
| **Output** | Where it lands - exit code, comment, file |

**Stub every seam first** - fake input, fake twin reply, fake output - so the whole thing runs end to end in five minutes. Then each person swaps one fake for the real thing.

### Build it in layers

Two constraints shape every build here: **a call takes 20-60 seconds** - a full agent turn, so bound what you read (one diff, one fixture) and never call per-file or in a loop - and **ask for JSON when a program reads the answer** (`ask_json()` returns a parsed object; prose is useless to a parser).

Then layer up: a skeleton on a stub, one real `ask()`, `ask_json()` for a parseable shape, your rules (make sure it cites `persona.md` or `standards.md`), a bound. Be specific - *"review this diff the way I would; apply my bar from standards.md; leave what my files don't cover"* beats *"review this code."*

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

## After today

This is a starting point, not the finish line. You got a twin answering from code and built one headless thing on it - against fictional Jordan, so nothing of yours went into a shared exercise.

Making it yours is the next step, and there are two ways. Run `python onboard.py` for a short interview that writes your own `persona.md`, `voice.md`, and `standards.md` - or edit them by hand, pointing a Copilot surface that can see your mail and calendar at them and correcting what it drafts. Keep that local - nothing personal belongs in a shared repo; `DISCLAIMER.md` has the detail. Everything you built today runs against your own twin unchanged.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)
