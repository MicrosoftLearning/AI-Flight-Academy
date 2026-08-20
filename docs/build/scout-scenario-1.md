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

## What you're solving

Copilot already personalizes. It has memory, and **Work IQ** reads your mail, Teams and calendar. So it knows a surprising amount about how you work – you just can't see any of it, correct it, or build anything on it.

Today you get that written down as files you can read and argue with, and then you build something that uses it.

## How this runs

| | Step | Time |
| --- | --- | --- |
| **1** | **Install it** – it reads your work and writes itself | 15 min |
| **2** | **Push on it** – see what it does, fix what's wrong | 10 min |
| **3** | **Build your thing** – pick a direction, split it across the table | 70 min |
| **4** | **Show it off** | 15 min |

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

**Done when:** it has read your work, written two files you've corrected, and run a real triage over your inbox.

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

Don't work through the tags now – step 2 does that with a reason.
:::

::: tip Running long?
Past 20 minutes, let the draft stand and move on. Step 2 is where the corrections that matter happen.
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
Which line in my persona made you say that?
```

Then fix that line, in the chat, and **re-run the same question word for word.** If the answer moved, you've found a rule that does work.

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

Six starting points. Take one, combine two, or ignore all of them.

| | What it is | Start with |
| --- | --- | --- |
| 📊 **A dashboard** | A page you open in the morning: what's waiting, what's slipping, what you owe. One ships as an example | *"Show me the command center example, then build me one with panels for [what you care about]."* |
| ⌨️ **A command** | `twin triage`, `twin draft` – your twin in the terminal, no chat window | *"Build me a CLI that runs my twin's triage and prints it in the terminal."* |
| 📬 **A morning briefing** | Runs before you're awake, leaves what needs you waiting | *"Every weekday at 7am, triage what landed overnight and leave it somewhere I can read it."* |
| 🤝 **Meeting prep** | Name a meeting, get who's in it, what you owe them, what got decided last time | *"Build me something that preps me for a meeting – who's attending, what I owe each of them, what we agreed last time."* |
| 🔌 **An MCP server** · ambitious | Your twin as a tool other agents can call. Take this if someone at your table writes code | *"Build the smallest MCP server that exposes one twin question as a tool."* |
| 🎯 **Yours** | Whatever your job actually runs on: approvals, escalations, renewals, handoffs | *"I want my twin to [what]. Work out what that needs and build the smallest version first."* |

**Pick by pain, not novelty** – something you forgot, chased, or redid by hand last week. Stuck between two, take the one you could demo in an hour. Stuck entirely, take the dashboard: there's a working example to edit.

### Split it across the table

Pick one direction, then **each person owns a slice that works on its own** – one panel, one briefing section, one command, one meeting-prep question. Everyone builds theirs against their own mail and you assemble at the end.

Split by question, not by layer: *"what's owed to me"*, *"what did I promise"*, *"what's gone quiet"*, *"what's on next week"* are four independent builds of the same thing.

Share the **prompt that worked** and **how you fixed it when it broke**. Never share output – that's your mailbox.

### Work in small pieces

::: warning Get something running in the first fifteen minutes
Make the first version do almost nothing, then add **one thing per prompt.**
:::

Three things worth saying to Scout as you go:

```text
Start simple – I'll ask for more.
```

```text
That works. Now add [one thing].
```

```text
How much is this reading every time it runs? Keep it under [a window] and cap it.
```

That last one matters – anything reading too much per run gets slow and brittle.

::: details What "working" looks like, per direction

| | You've got it when |
| --- | --- |
| **Dashboard** | You open the file and there's something on it you'd act on |
| **Command** | You run one word in a terminal and get useful output |
| **Briefing** | It ran without you and something was waiting |
| **Meeting prep** | You name a real meeting and recognise what comes back |
| **MCP server** | Another agent calls it and gets an answer from your twin |
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

## 4 · Show it off

Sixty to ninety seconds. Show:

- [ ] **What you built**, running – not a description of it
- [ ] **One thing it got right about you** that a generic assistant wouldn't have
- [ ] **The rule behind it** – which line in your files made that happen
- [ ] **What you'd build next** if you had another hour

## Push it further

1. **Give it a memory** – something it writes to as well as reads, tracking what it told you last time.
2. **Make it stop** – a rule where it hands something back to you instead of drafting, and something that shows when it did.
3. **Make it defend itself** – ask which file changed an answer, and why.
4. **Give it to someone else** – have a teammate ask your twin something and see if the answer sounds like you.
5. **Two twins** – yours and a teammate's, arguing the same decision.
6. **Take it with you** – it's a folder of text files. The same twin runs in Cowork and VS Code Copilot.

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Scout ignores the skill | Start a new session – skills load at the start |
| Import didn't take | Drag the **folder**, not `SKILL.md` alone |
| You get an ordinary Scout answer | Name the twin – *"using my twin"* |
| Setup is still reading after 10 minutes | Let it finish the pass, then skip deep correction and move on |
| It answers in general terms | Your rules aren't specific enough – go back to step 2 |
| It stopped loading after you renamed it | The folder name, `name:`, and the trigger phrases in `description:` all have to match. Ask Scout to check them |
| Drafts sound like a stranger | Your voice file is descriptions, not real samples. Get actual sent mail in it |
| Triage found almost nothing | Widen the window, and check it read Teams as well as mail |
| Your build is slow | It's reading too much per run. Bound the window and cap how many items it pulls |
| A scheduled run does nothing | Get it working manually first, then schedule that exact thing |
| You can't decide what to build | Take the dashboard. There's a working example, so you'll be editing rather than starting |
| It's 20 minutes in and nothing runs | Cut the scope in half. Get one thing working, then add back |

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)
