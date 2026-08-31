---
title: The Digital Twin - Scout
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🔵 The Digital Twin

::: warning 🚧 Work in progress
Scenario 1 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in Microsoft Scout. You describe what you want; Scout writes it.**

::: details New to Scout?
An agentic assistant that runs on your machine. Two things plug into it:

- **Microsoft 365**, through **Work IQ** - your mail, calendar, Teams, files and org context. Nothing to connect, and it only sees what you can already see.
- **GitHub Copilot CLI** - so it can write and run code locally.

That pairing is why this scenario works here: Scout can read your real work *and* build against it in the same conversation. Setup is in the **[Guides](/bricks/scout-setup)**.
:::

## The problem

Scout can already do your work - on your machine, across your repos, into your mail and calendar. Files, code, git, whatever the job needs. What it can't do is any of it **as you**: decide which of two priorities wins, hold back the thing you'd check first, shift its writing between your manager and a partner team.

So every session starts with you re-explaining yourself. Work IQ closes some of that by inference, but you can't read what it inferred, correct it, or take it anywhere.

Today you write it down as files you own, and get **an agent that works the way you do**.

## Objectives

Build a **digital twin** - a `SKILL.md` and a `references/` folder that hold how you work - then build something on top of it that runs on your machine. Scout writes the first version from your own mail, calendar, and Teams; you correct it, then point it at a real job.

| File | Holds |
| --- | --- |
| **`persona.md`** | Who you are and how you decide - who you serve, what wins when priorities collide, what you check before committing |
| **`voice.md`** | How you write, plus a few of your own messages kept verbatim, so output sounds like you |

By the end, you should have:

- **A twin that works like you** - it drafts in your voice and takes the positions you'd take, and you've corrected what it got wrong.
- **Something built on it that runs** - a brief, a catch-up, a dashboard, an MCP server: one real thing that uses the twin and that you'd open again tomorrow.

## Setup

**Check Scout is signed in and Work IQ is live.** Ask *"what's on my calendar tomorrow?"* - a real answer means you're ready. If not, grab a coach.

### 1 · Download your twin

<a class="lab-card" href="/AI-Flight-Academy/downloads/my-twin-scout.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">🧬</span>
  <span class="lab-card-title">Your twin</span>
  <span class="lab-card-desc">The skill, plus one worked example built on it. Unzip and import the folder.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

### 2 · Import it

1. Unzip the download. You'll get a folder called `my-twin`.
2. In Scout, open **Extensions** → **Import** and drag in the **folder**.

   ![Screenshot of the Import Skill dialog window in Microsoft Scout.](./media/scout-import-skill-folder.png)

3. Start a **new session** - skills load when a session begins.

::: warning Import the folder, not the file
`SKILL.md` isn't the whole skill. Templates and a worked example sit beside it, and dragging the file alone leaves them behind.
:::

### 3 · Build it

Start a new session and type in the following prompt:

```text
Set up my twin.
```

Your twin tells you what it's about to read and waits for a yes, then reads your sent mail, Teams messages, and about a month of calendar. **Its access is read-only** - it only sees what you can already see, and its files stay on your machine. It drafts two files with the evidence under each line, tagged by how directly it knows:

```text
my-twin/
  references/
    persona.md      ← who you are and how you work
    voice.md        ← how you write
    setup.md        ← how far setup got
```

It finishes by **triaging what actually landed** in your mail and Teams, so you leave setup having watched it work.

## The hack

Your twin works, but it's generic - built from what your work *proves*, which isn't the same as what you'd say about yourself. Two moves: correct it, then build something on it.

<div class="callout-bubble">
<span class="callout-bubble-icon">🔒</span>

**Keep it yours.** You each build your own twin on your real mail and rules. When you compare with your table, share the **prompt that worked, not your mailbox** - a prompt carries none of your inbox with it.

</div>

### Correct your twin

Use it for real - ask about something, don't just ask it to write:

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

Trigger the twin by name - *"using my twin"*, *"ask my twin"*, *"triage what landed"*, *"what am I forgetting"*. A generic answer usually means Scout didn't call it.

<div class="callout-bubble">
<span class="callout-bubble-icon">📎</span>

**Give it a name you'll actually use.** Say *"rename my twin to Clippy"*, then start a new session so Scout picks it up - and call it by that from now on.

</div>

**Fix the line behind an answer.** Take an answer you didn't like and trace it:

```text
Which line made you say that?
```

Fix that line in the chat, then **re-run the same question, word for word**. If the answer moves, you've found a rule that does real work. Then go looking for the rest:

```text
Show me my persona.md.
```

Its sections are drawn from your real work, each tagged:

| | |
| --- | --- |
| `[observed]` | Found in your mail, chats or calendar, and the twin can quote it |
| `[inferred]` | A reasonable read, but you never said it outright |
| `[needs you]` | Nothing in your work reached this, so it wrote a starting point |

**Start with `[inferred]` and `[needs you]`** - they reach furthest from the evidence, so they're likeliest to be wrong. You don't need to work through them all: fix whatever is costing you an answer and leave the rest.

A line earns its place when it changes what the twin does - a name, a date, a threshold, something you'd never agree to without checking. *"I value collaboration"* is true and changes nothing.

### Build on your twin

Now build something that uses the twin - pick a direction with your table, split it into pieces, and build in small steps.

#### Pick a direction

Take one as it is, combine two, or build something specific to how you work.

| | What it is | Start with |
| --- | --- | --- |
| 📬 **A morning brief** · easiest | Runs before you're awake and leaves what needs you waiting | *"Build a morning brief I can run once now, then schedule for weekdays at 7am. Triage what landed overnight and write the result somewhere local."* |
| 🏖️ **An out-of-office catch-up** | Ranks what arrived while you were away, so coming back is a list instead of 400 unread | *"Build an out-of-office catch-up for [dates I was away]. Read mail and Teams from that window, rank what needs me first, and write a local catch-up list."* |
| 💭 **A sounding board** | Think an idea through against your own rules, with something that pushes where you'd push | *"Build me something I can think out loud at - it should ask what I'd ask, and use my persona to challenge the idea rather than agree with it."* |
| 📊 **A dashboard** | A page you open in the morning: what's waiting, what's slipping, what you owe. One ships as an example | *"Show me the command center example, then build me one with panels for [what you care about]."* |
| 🔌 **Connect an MCP server** · advanced | Give your twin a real tool instead of building one. Point Scout at an existing MCP server from Microsoft's [catalog](https://learn.microsoft.com/en-us/connectors/connector-reference/connector-reference-mcpserver-connectors) so it can read from or act on a live system, then turn what it finds into a draft in your voice | *"Add the [system] MCP server to Scout, have my twin pull [my open items] through it, and draft [the weekly update] applying my persona and voice."* |
| 🗂️ **Grounded in your work** | Point your twin at a folder of your real material - past write-ups, project docs, current drafts - so it answers from your actual work, not just your rules | *"Point my twin at [a folder of my real work and past writing]. Read it when I ask about current projects, and match how those were written."* |
| ✨ **Your own** | Whatever your job runs on - approvals, escalations, renewals, handoffs - or a rework of the twin itself | *"I want my twin to [what]. Work out what that needs and build the smallest version first."* |

#### Build in layers

Get it running end to end, then add one thing at a time:

1. **Smallest version** - *"Build the smallest version that runs end to end."*
2. **Your rules** - *"Use my persona and voice so it takes a position and sounds like me."*
3. **One addition** - *"That works. Now add [one thing]."*
4. **A bound** - *"Cap this at [N days] and [N items] per run."*
5. **The runtime** - *"If this needs JavaScript, use Scout's bundled Node under `resources/node`, not a bare `node`."*

Be specific - *"a page with one panel: things I asked for in the last 21 days with no reply"* gets you further than *"build me a dashboard."*

::: warning You approve before anything goes out
Keep the last step yours. Whatever you build should draft, show you who it's addressed to and what it says, then wait for a yes.
:::

## After today

This is a starting point, not the finish line. In one session, alongside a table learning the same thing, you got a twin working and built one real thing on top of it - and practiced the skill that matters: describing what you want, watching Scout build it, and correcting from there.

What you made won't change the world, and it doesn't need to. The twin is yours to keep - `persona.md` and `voice.md` are plain text, so they move to another altitude unchanged - and whatever you built today, you can keep building tomorrow.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)
