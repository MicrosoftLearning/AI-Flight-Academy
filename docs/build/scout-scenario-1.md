---
title: The Digital Twin – Scout
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🔵 The Digital Twin

::: warning 🚧 Work in progress
Scenario 1 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in Microsoft Scout. You describe what you want; Scout writes it.**

Install a twin that already knows how you work. Then build whatever you want on top of it.

::: details New to Scout?
An agentic assistant that runs on your machine. Two things plug into it:

- **Microsoft 365**, through **Work IQ** – your mail, calendar, Teams, files and org context. Nothing to connect; it only ever sees what you can already see.
- **GitHub Copilot CLI** – so it can write and run code locally.

That combination is why this scenario works here: it can read your real work *and* build something with it, in the same conversation. Setup is in the **[Guides](/bricks/scout-setup)**.
:::

## What you're solving

Scout can already do your work – on your machine, across your repos, into your real mail and calendar. Files, code, git, whatever the job needs. What it can't do is any of it **as you**: decide which of two priorities wins, refuse to send the thing you'd check first, shift its writing from your manager to a partner team.

So every session starts with you re-explaining yourself. Work IQ closes some of that gap by inference, but you can't read what it inferred, correct it, or take it anywhere.

Today you write that down as files you own. **Less an assistant than a second you** – an agent that works the way you do: decides which of two priorities wins, writes in your voice, and checks what you'd check before anything goes out.

## How this runs

| | Step | Time |
| --- | --- | --- |
| **1** | **Install it** – it reads your work and writes itself | 20 min |
| **2** | **Push on it** – see what it does, fix what's wrong | 15 min |
| **3** | **Build your thing** – pick a direction, split it across the table | 60 min |

Steps 1 and 2 alone. Step 3 as a table.

::: tip Ask Scout when you're stuck
It's the thing you're building with and the thing that helps you build it. Coaches are in the room and there's an SME at every table.
:::

## Before you start

**Check you have this:** Microsoft Scout, signed in, with Work IQ working. Ask it *"what's on my calendar tomorrow?"* – if you get an answer, you're set.

**It uses your own mail and calendar.** It only ever sees what you can already see, the files your twin writes stay on your machine, and nothing sends unless you send it yourself.

**Download this:**

<a class="lab-card" href="/AI-Flight-Academy/downloads/my-twin-scout.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">🧬</span>
  <span class="lab-card-title">Your twin</span>
  <span class="lab-card-desc">The skill, plus one worked example of something built on it. Unzip and import the folder.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

::: tip Stuck on a mechanic?
The **[Guides](/bricks/)** in the top nav are short how-tos for the Scout basics this scenario leans on – getting set up, connecting to your work, running something on a schedule. Open one in a new tab if a mechanic trips you up.
:::

---

## 1 · Install it

**Done when:** it has read your work, written two files you've corrected, and run a real triage over what landed in mail and Teams.

1. Unzip the download. You'll get a folder called `my-twin`.
2. In Scout, go to **Extensions** → **Import** and drag in the **folder**.
3. Start a **new session** – skills load when a session begins.

::: warning Import the folder, not the file
`SKILL.md` isn't the whole skill. The templates and the example extension sit next to it, and dragging in the file alone leaves them behind.
:::

Then say:

```text
Set up my twin.
```

It tells you what it's about to read and waits for a yes. Then it reads your sent mail, your Teams messages and about a month of calendar, and comes back with a draft of two files – **with the evidence under each line.**

**Skim it – don't polish it.** Fix what's wrong (wrong role, wrong manager, a rule you'd never follow) and let it write. You'll fix the rest in step 2, once you've seen which lines change an answer.

```text
my-twin/
  references/
    persona.md      ← who you are and how you work
    voice.md        ← how you write
    setup.md        ← what it's done so far
```

Then it runs a **live triage over what actually landed** – so you finish this step having watched it work.

::: warning It tags how well it knows each line
`[observed]` was found in your work. `[inferred]` is a reasonable read it can't point at directly. `[needs you]` means your work didn't cover it, so it wrote a starting point.

Don't work through the tags now – step 2 is where you fix the ones that change an answer.
:::

::: tip Running long?
Past 25 minutes, let the draft stand and move on. Step 2 is where the corrections that matter happen.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>What did it get right that you didn't expect? And what did it get wrong?</p>
  </div>
</div>

## 2 · Push on it

**Done when:** you've asked it three things, and fixed the line behind an answer you didn't like.

### Ask it things

```text
Using my twin, what should I do about [the thing you've been putting off]?
```

You'll get a position and a draft, not a list of options. Then try the rest of what it does:

| Ask it | You get |
| --- | --- |
| *"Triage what landed today."* | Mail and Teams sorted into needs-me, blocked, handled, noise – with drafts |
| *"Draft a reply to [a real thread]."* | Something you could send, in your voice |
| *"What am I forgetting this week?"* | It reads your calendar and your commitments together |
| *"What don't you know about how I work?"* | It's read a month of your work, so it can name its own gaps |

::: tip Say the skill's name
Use a twin trigger phrase – *"using my twin"*, *"ask my twin"*, *"triage what landed"*, or *"what am I forgetting"*. If Scout answers generically, name the twin explicitly.

**Don't like "my twin"?** Rename it – *"rename my twin to Ada"* – and call it that from then on. Start a new session afterwards so Scout picks up the new name.
:::

### Fix the line behind it

**Take an answer you didn't like** and find what caused it:

```text
Which line made you say that?
```

Then fix that line in the chat – whether it came from `persona.md`, `voice.md` or another reference – and **re-run the same question word for word.** If the answer moved, you've found a rule that does work.

Once you've done one, go looking:

```text
Show me my persona.md.
```

Fifteen sections from your real work, each tagged:

| | |
| --- | --- |
| `[observed]` | Found in your mail, chats or calendar, and it can quote it |
| `[inferred]` | A reasonable read, but you never said it outright |
| `[needs you]` | Your work didn't cover this, so it wrote a starting point |

**`[inferred]` and `[needs you]` reach furthest from the evidence**, so they're the likeliest to be wrong. You don't have to work through all fifteen – fix what's actually costing you an answer and leave the rest.

::: tip What's worth adding
Anything that changes what it does – a name, a date, a threshold, something you'd never agree to without checking. *"I value collaboration"* gives it nothing to do differently.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Name the <em>kind</em> of rule that changed an answer – a priority, a boundary, a check, a trade-off. Keep the actual people and dates to yourself.</p>
  </div>
</div>

## 3 · Build your thing

**Done when:** you've got something running that uses your twin, and you'd open it again tomorrow.

### Pick a direction

Six starting points. Take one, combine two, or build something completely custom to how you work.

| | What it is | Start with |
| --- | --- | --- |
| 📬 **A morning brief** · easiest | Runs before you're awake and leaves what needs you waiting | *"Build a morning brief I can run once now, then schedule for weekdays at 7am. Triage what landed overnight and write the result somewhere local."* |
| 🏖️ **An out-of-office catch-up** | Sorts what arrived while you were away by what'll actually need you, so coming back is a list instead of 400 unread | *"Build an out-of-office catch-up for [dates I was away]. Read mail and Teams from that window, rank what needs me first, and write a local catch-up list."* |
| 💭 **A sounding board** | Talk an idea through with something that argues from your own rules and pushes where you'd push | *"Build me something I can think out loud at – it should ask what I'd ask, and use my persona to challenge the idea rather than agree with it."* |
| 📊 **A dashboard** | A page you open in the morning: what's waiting, what's slipping, what you owe. One ships as an example | *"Show me the command center example, then build me one with panels for [what you care about]."* |
| 🔌 **An MCP server** · hardest | Your twin as a tool VS Code Copilot can call. It runs locally over stdio – nothing hosted, no URLs | *"Build the smallest MCP server that exposes one twin question as a tool, and give me the mcp.json to point VS Code at it."* |
| 🎯 **Yours** | Whatever your job actually runs on: approvals, escalations, renewals, handoffs | *"I want my twin to [what]. Work out what that needs and build the smallest version first."* |

**Pick by pain, not novelty** – something you forgot, chased, or redid by hand last week.

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Two minutes, round the table: what are you building, and what pain is it fixing? Say it out loud before anyone opens Scout.</p>
  </div>
</div>

### Split it across the table

Pick one direction, then **each person owns one standalone question** – one panel, one section of the brief, one ranking rule, one challenge the sounding board makes. **If it can't run on its own, it's too big.** Everyone builds theirs against their own mail and you assemble at the end.

Split by question, not by layer: *"what's owed to me"*, *"what did I promise"*, *"what's gone quiet"*, *"what's on next week"* are four independent builds of the same thing.

Share the **prompt that worked**. Never share output – that's your mailbox.

### Build it in layers

Get something running first, then add one thing at a time:

1. **The smallest version** – *"Build the smallest version that runs end to end. Start simple."*
2. **Your rules** – *"Use my persona and voice files so the output takes a position and sounds like me."*
3. **One addition** – *"That works. Now add [one thing]."*
4. **A bound** – *"Cap this at [N days] and [N items] per run."*
5. **The runtime** – *"If this needs JavaScript, use Scout's bundled Node under `resources/node`, not a bare `node`."*

| Vague | Specific |
| --- | --- |
| *"Build me a dashboard"* | *"A page with one panel: things I asked for in the last 21 days that never got a reply, oldest first."* |
| *"Make it check Teams"* | *"Also read my 15 most recently active chats and count them separately from mail."* |
| *"Make it better"* | *"Show which of my rules decided each item."* |

::: details What "working" looks like, per direction

| | You've got it when |
| --- | --- |
| **Morning brief** | It ran without you and something useful was waiting |
| **OOO catch-up** | You point it at a few days you were away and the top of the list is the thing you'd have opened first |
| **Sounding board** | It pushes back on an idea the way you would, not the way a chatbot would |
| **Dashboard** | You open the file and there's something on it you'd act on |
| **MCP server** | VS Code Copilot calls it and gets an answer from your twin |
| **Yours** | You'd use it again tomorrow without being told to |

:::

::: warning Nothing sends
Whatever you build, keep it drafting and waiting.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Halfway: is it running yet? If not, cut what it does in half and get <em>something</em> working before you add anything back.</p>
  </div>
</div>

## Push it further

1. **Give it a memory** – something it writes to as well as reads, tracking what it told you last time.
2. **Make it stop** – a rule where it hands something back to you instead of drafting, and something that shows when it did.
3. **Make it defend itself** – ask which file changed an answer, and why.
4. **Swap the question, not the answer** – hand a teammate your prompt or panel and have them run it against their own twin.
5. **Two prompts, one question** – compare how two people shaped the same question, without either mailbox leaving its machine.
6. **Take the rules with you** – `persona.md` and `voice.md` are plain text, so the same rules move to another altitude.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)
