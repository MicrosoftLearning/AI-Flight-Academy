---
title: The Digital Twin - Scout
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🔵 The Digital Twin

::: warning 🚧 Work in progress
Scenario 1 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in Microsoft Scout. You describe what you want; Scout writes it.**

Install a twin that reads how you work, correct what it got wrong, then build something on top of it.

::: details New to Scout?
An agentic assistant that runs on your machine. Two things plug into it:

- **Microsoft 365**, through **Work IQ** - your mail, calendar, Teams, files and org context. Nothing to connect, and it only sees what you can already see.
- **GitHub Copilot CLI** - so it can write and run code locally.

That pairing is why this scenario works here: Scout can read your real work *and* build against it in the same conversation. Setup is in the **[Guides](/bricks/scout-setup)**.
:::

## What you're solving

Scout can already do your work - on your machine, across your repos, into your mail and calendar. Files, code, git, whatever the job needs. What it can't do is any of it **as you**: decide which of two priorities wins, hold back the thing you'd check first, shift its writing between your manager and a partner team.

So every session starts with you re-explaining yourself. Work IQ closes some of that by inference, but you can't read what it inferred, correct it, or take it anywhere.

Today you write it down as files you own, and get **an agent that works the way you do**.

## How this runs

| | Step | Time |
| --- | --- | --- |
| **1** | **Install your twin** - it reads how you work and writes itself | 20 min |
| **2** | **Push on it** - ask it real questions, fix what's wrong | 15 min |
| **3** | **Build on it** - pick a direction, split the work across your table | 60 min |

You'll do steps 1 and 2 on your own. Step 3 is where the table works together, and it's most of the session.

## Before you start

**Check Scout is signed in and Work IQ is live.** Ask *"what's on my calendar tomorrow?"* - if you get a real answer back, you're ready to go.

**Your data stays yours.** Your twin only sees what you can already see, its files stay on your machine, and nothing goes out without your approval.

<a class="lab-card" href="/AI-Flight-Academy/downloads/my-twin-scout.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">🧬</span>
  <span class="lab-card-title">Your twin</span>
  <span class="lab-card-desc">The skill, plus one worked example built on it. Unzip and import the folder.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

::: tip Two places to get unstuck
Ask Scout - it's building with you, so describe what's wrong and let it fix it. For mechanics like scheduling or connecting to Microsoft 365, the **[Guides](/bricks/)** are short how-tos. Coaches are in the room and every table has an SME.
:::

---

## 1 · Install your twin

**Done when:** your twin has written two files you've corrected and triaged what actually landed in your mail and Teams.

1. Unzip the download. You'll get a folder called `my-twin`.
2. In Scout, open **Extensions** → **Import** and drag in the **folder**.
3. Start a **new session** - skills load when a session begins.

::: warning Import the folder, not the file
`SKILL.md` isn't the whole skill. Templates and a worked example sit beside it, and dragging the file alone leaves them behind.
:::

Then start it off:

```text
Set up my twin.
```

Your twin tells you what it's about to read and waits for a yes. It reads your sent mail, your Teams messages and about a month of calendar, then drafts two files - **with the evidence under each line**, tagged by how directly it knows.

**Skim, don't polish.** Fix what's plainly wrong - wrong role, wrong manager, a rule you'd never follow - and let your twin write the files:

```text
my-twin/
  references/
    persona.md      ← who you are and how you work
    voice.md        ← how you write
    setup.md        ← how far setup got
```

You'll fix the rest in step 2, once you've seen which lines actually change an answer. If you're still going at 25 minutes, let the draft stand and move on.

Your twin finishes by **triaging what actually landed** in your mail and Teams, so you leave this step having watched it work rather than having read about it.

## 2 · Push on it

**Done when:** you've asked three real questions and fixed the line behind an answer you didn't like.

### Ask it things

```text
Using my twin, what should I do about [the thing you've been putting off]?
```

You'll get a position and a draft, not a menu of options. Then try the rest of what your twin does:

| Ask | You get |
| --- | --- |
| *"Triage what landed today."* | Mail and Teams sorted into needs-me, blocked, handled and noise, with drafts |
| *"Draft a reply to [a real thread]."* | Something you could send, in your voice |
| *"What am I forgetting this week?"* | Your calendar and your commitments read together |
| *"What don't you know about how I work?"* | Its own gaps, named - it's read a month of your work |

::: tip Name the twin, or you'll get plain Scout
Trigger it with *"using my twin"*, *"ask my twin"*, *"triage what landed"* or *"what am I forgetting"*. If an answer comes back generic, that's usually why.

Prefer a different name? Say *"rename my twin to Ada"*, then start a new session so Scout picks it up.
:::

### Fix the line behind the answer

Take an answer you didn't like and trace where it came from:

```text
Which line made you say that?
```

Fix that line in the chat - wherever it turns out to live - then **re-run the same question, word for word**. If the answer moves, you've found a rule that does real work.

Once you've done one, go looking for the others:

```text
Show me my persona.md.
```

Fifteen sections drawn from your real work, each tagged:

| | |
| --- | --- |
| `[observed]` | Found in your mail, chats or calendar, and it can quote it |
| `[inferred]` | A reasonable read, but you never said it outright |
| `[needs you]` | Nothing in your work reached this, so it wrote a starting point |

**Start with `[inferred]` and `[needs you]`** - they reach furthest from the evidence, so they're the likeliest to be wrong. You don't need to work through all fifteen: fix whatever is costing you an answer and leave the rest for later.

A line earns its place when it changes what your twin does - a name, a date, a threshold, something you'd never agree to without checking first. *"I value collaboration"* is true and changes nothing.

## 3 · Build on it

**Done when:** something's running that uses your twin, and you'd open it again tomorrow.

::: tip 🎈 This is the fun part - keep it low-stress
Pick whatever direction sounds good and build it with your table. It doesn't have to be perfect, and it doesn't have to solve everything - the whole point is to explore your tool, trade ideas, and vibe-code something together. Use whatever you came here to learn, see how far you get, and have fun with it. You're here to learn by doing.
:::

### Pick a direction

Six starting points below. Take one as it is, combine two, or build something specific to how you work.

| | What it is | Start with |
| --- | --- | --- |
| 📬 **A morning brief** · easiest | Runs before you're awake and leaves what needs you waiting | *"Build a morning brief I can run once now, then schedule for weekdays at 7am. Triage what landed overnight and write the result somewhere local."* |
| 🏖️ **An out-of-office catch-up** | Ranks what arrived while you were away, so coming back is a list instead of 400 unread | *"Build an out-of-office catch-up for [dates I was away]. Read mail and Teams from that window, rank what needs me first, and write a local catch-up list."* |
| 💭 **A sounding board** | Think an idea through against your own rules, with something that pushes where you'd push | *"Build me something I can think out loud at - it should ask what I'd ask, and use my persona to challenge the idea rather than agree with it."* |
| 📊 **A dashboard** | A page you open in the morning: what's waiting, what's slipping, what you owe. One ships as an example | *"Show me the command center example, then build me one with panels for [what you care about]."* |
| 🔌 **An MCP server** · hardest | Your twin as a tool VS Code Copilot can call. Runs locally over stdio - nothing hosted, no URLs | *"Build the smallest MCP server that exposes one twin question as a tool, and give me the mcp.json to point VS Code at it."* |
| 🎯 **Yours** | Whatever your job runs on: approvals, escalations, renewals, handoffs | *"I want my twin to [what]. Work out what that needs and build the smallest version first."* |

**Pick by pain, not novelty** - something you forgot, chased, or redid by hand last week.

### Split the work

Pick one direction, then **take one standalone question each** - one panel, one section of the brief, one ranking rule, one challenge the sounding board makes. **If it can't run alone, it's too big.** Everyone builds against their own mail, and you assemble at the end.

Split by question, not by layer. *"What's owed to me"*, *"what did I promise"*, *"what's gone quiet"* and *"what's on next week"* are four independent builds of one thing.

Share the **prompt that worked** - that's the useful part, and it carries none of your mailbox with it. Keep the output to yourself.

### Build in layers

Get something running end to end before you make it good, then add one thing at a time:

1. **The smallest version** - *"Build the smallest version that runs end to end. Start simple."*
2. **Your rules** - *"Use my persona and voice files so the output takes a position and sounds like me."*
3. **One addition** - *"That works. Now add [one thing]."*
4. **A bound** - *"Cap this at [N days] and [N items] per run."*
5. **The runtime** - *"If this needs JavaScript, use Scout's bundled Node under `resources/node`, not a bare `node`."*

The more specific your prompt, the less you'll have to undo afterwards:

| Vague | Specific |
| --- | --- |
| *"Build me a dashboard"* | *"A page with one panel: things I asked for in the last 21 days that never got a reply, oldest first."* |
| *"Make it check Teams"* | *"Also read my 15 most recently active chats and count them separately from mail."* |
| *"Make it better"* | *"Show which of my rules decided each item."* |

::: details What "working" looks like, per direction

| | You've got it when |
| --- | --- |
| **Morning brief** | It ran without you and something useful was waiting |
| **OOO catch-up** | You point it at days you were away and the top of the list is what you'd have opened first |
| **Sounding board** | It pushes back the way you would, not the way a chatbot would |
| **Dashboard** | You open the file and something on it is worth acting on |
| **MCP server** | VS Code Copilot calls it and gets an answer from your twin |
| **Yours** | You'd use it again tomorrow without being told to |

:::

::: warning You approve before anything goes out
Keep the last step yours. Whatever you build should draft, show you who it's addressed to and what it says, then wait for a yes.
:::

## Push it further

1. **Give it a memory** - a file it writes to as well as reads, tracking what it told you last time.
2. **Make it stop** - a rule that hands something back to you instead of drafting, and a way to see when it fired.
3. **Make it defend itself** - ask which file changed an answer, and why.
4. **Swap the question, not the answer** - hand a teammate your prompt and have them run it against their own twin.
5. **Two prompts, one question** - compare how two people shaped the same ask, with neither mailbox leaving its machine.
6. **Take the rules with you** - `persona.md` and `voice.md` are plain text, so they move to another altitude unchanged.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)
