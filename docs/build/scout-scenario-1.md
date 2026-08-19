---
title: The Digital Twin – Scout
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🔵 The Digital Twin

::: warning 🚧 Work in progress
Scenario 1 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in Microsoft Scout. Scout does the building – you won't hand-write the app.**

A twin that reads your work, and a page that tells you what's waiting on you.

## What you're solving

Copilot already personalizes. It has memory, and **Work IQ** reads your mail, Teams and calendar. So it knows a surprising amount about how you work – you just can't see any of it, correct it, or point it at a standing question.

And the standing questions are the ones that never get asked. What did I ask for that never came back. What did I promise that I haven't done. Nobody opens a chat window to ask those, so they rot.

Today you write the twin down as files, then give it a page that answers those questions before you've opened anything.

## What you'll walk out with

**A Command Center** – a page on your machine showing what's waiting on you, built from your own work by a twin that knows how you decide.

| | Holds |
| --- | --- |
| **`persona.md`** | How you decide. Who you serve, what wins when priorities collide, what you check before committing |
| **`voice.md`** | How you write, plus a few of your own messages verbatim |
| **`panels/`** | One file per standing question. **No personal data in them at all** – which is why you can swap them |
| **`command-center.html`** | The page. Built locally, from the panels plus what they found |

Work IQ writes the first two from your own mail, Teams and calendar. **The twin renders a working page about fifteen minutes in** – the rest of the session is spent making it accurate and building panels with your table.

::: warning It stays on your machine
You're building a local page, opened from a file. **Nothing is hosted and nothing is published**, and that's deliberate – we're not shipping a product this afternoon, we're building the muscle. Hosting it is a thing you can do next week, on your own time, once you know it's worth hosting.
:::

## How this runs

| | Step | You're done when | Time |
| --- | --- | --- | --- |
| **1** | **Land it** | A page is open on your screen with two panels on it | 15 min |
| **2** | **Argue with it** | The lines it guessed at say what you'd actually say | 20 min |
| **3** | **Build the deck** | Your table's panels are all running on *your* work | 40 min |
| **4** | **Make it fly itself** | It refreshes without you, and nothing sends | 15 min |

**Steps 1 and 2 you do alone.** **Step 3 is the table**, and it's where the rest of the time goes.

::: tip How the table works without sharing anything
You each run this against your own mail, so there's nothing to pool – and that's fine, because **you're not sharing data, you're sharing instruments.**

A panel is a plain text file holding a question and how to answer it, with no names, dates or quotes in it. You build one against your own inbox, paste the file into the table chat, and everyone runs it against theirs. Six panels get built in the time it takes one person to build one.
:::

::: tip When you get stuck, ask Scout
Scout is the thing you're building with **and** the thing that helps you build it. Any time you're unsure what to type, or something doesn't behave, say so in the chat.

There are coaches moving around the room and an SME at every table. Wave one over rather than stalling.
:::

## Before you start

**Check you have this:** Microsoft Scout, signed in, with Work IQ working. Ask it *"what's on my calendar tomorrow?"* – if you get an answer, you're set.

**And Node**, for the page. Check now: `node --version`. Anything 18 or above is fine. No Node means no page, but the twin still works.

**It uses your own mail and calendar.** It only ever sees what you can already see, and nothing you build leaves your machine.

**Download this:**

<a class="lab-card" href="/AI-Flight-Academy/downloads/my-twin-scout.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">🧬</span>
  <span class="lab-card-title">Your twin</span>
  <span class="lab-card-desc">The skill, two working panels, and the page renderer. Unzip it and import the folder.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

::: tip Stuck on a mechanic?
The **[Guides](/bricks/)** in the top nav are short how-tos for the Scout basics this scenario leans on – getting set up, connecting to your work, running something on a schedule. They're written for any scenario, so they won't repeat these steps. Open one in a new tab if a mechanic trips you up.
:::

---

## 1 · Land it

**Done when:** a page is open on your screen with two panels on it, built from your own work.

Install the skill:

1. Unzip the download. You'll get a folder called `my-twin`.
2. In Scout, go to **Extensions** → **Import** and drag in the **folder**.
3. Start a **new session** – skills load when a session begins.

::: warning Import the folder, not the file
The `SKILL.md` isn't the whole skill this time. The panels and the page renderer sit next to it, and dragging in the file alone leaves them behind.
:::

Then say:

```text
Set up my twin.
```

It tells you what it's about to read and waits for a yes. Then it reads your sent mail, your Teams messages and about a month of calendar, drafts two files, and **shows them to you with the evidence under each line.**

**It doesn't interview you.** It reads first and hands you a draft to correct, because people can't reliably describe how they work but can fix a wrong sentence in seconds. Correct what's wrong, once, and it writes:

```text
my-twin/
  references/
    persona.md      ← how you decide
    voice.md        ← how you write
    setup.md        ← how far it got, so it can pick up if you get pulled away
  panels/
    i-owe-them.md   ← ships working
    owed-to-me.md   ← ships working
  data/             ← what each panel last found
  command-center.html
```

Then it runs both panels and builds the page. **It'll give you a file path – open it.**

That's the deliverable, fifteen minutes in. Everything after this makes it better.

::: warning It tags how well it knows each line
Every line says where it came from. `[observed]` was found in your work. `[inferred]` is a reasonable read it can't point at directly. `[needs you]` means your work didn't cover it, so it wrote something to get you started.

The tags are the point. Step 2 is going through them.
:::

::: details No page? Keep going
If `node` isn't there or the render fails, the panels still ran – ask for the results in the chat. Get the page up if you can, but don't let it eat your session. Tell a coach and move on to step 2.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>How many items did each panel find? A wildly different count from the person next to you is interesting – it usually means one of you writes commitments down and the other doesn't.</p>
  </div>
</div>

## 2 · Argue with it

**Done when:** the lines it guessed at say what you'd actually say, and a request you'd already run comes back different.

Ask to see what it built:

```text
Show me my persona.md.
```

Fifteen sections, all filled from your real work, each tagged:

| | |
| --- | --- |
| `[observed]` | It found this in your mail, chats or calendar, and can quote it |
| `[inferred]` | A reasonable read of what it found, but you never said it outright |
| `[needs you]` | Your work didn't cover this, so it wrote a starting point for you to react to |

**Start with `[inferred]` and `[needs you]`.** Those reach furthest from the evidence. Some will land; a few won't – it can watch a month of your work and still not know what you'd refuse outright, or what actually drains you.

**Then thicken the `[observed]` ones.** They're accurate but thin: *"align with collaborators"* is true and doesn't know who, or when it matters. Leave the line and add underneath it:

> add: *"Check with Alex before I move anything he owns the concept for."*

**Save a request and its answer first**, so you've got something to compare against. Then correct the file in the chat, and run the same request again word for word.

::: tip What's worth adding
Anything that changes what it does – a name, a date, a threshold, something you'd never agree to without checking. *"I value collaboration"* doesn't: it's true, and it tells your twin nothing to do differently.

**Stuck on what to say? Ask it.** *"What don't you know about how I work that would change your answers?"*
:::

Then look at the page again with fresh eyes. **The two shipped panels are a starting point, not a spec** – if `Owed to me` is full of things you don't care about, its `Decide` section is wrong for you:

```text
Owed to me is picking up stuff I don't chase. Tighten it so it only counts
things where someone is actually blocked on me, then re-run it.
```

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Name the <em>kind</em> of rule that changed an answer – a priority, a boundary, a check, a trade-off. Keep the actual people and dates to yourself.</p>
  </div>
</div>

## 3 · Build the deck

**Done when:** your table's panels are all running against your own work, on your own page.

Two panels answer two questions. A deck answers four, and you're going to get there in the time it takes to build one – by splitting the work.

**Split now. One panel each, two people can double up.**

| Panel | Answers |
| --- | --- |
| **Going quiet** | Threads where I spoke last and nothing came back – the ones that die silently |
| **Ahead** | What's on next week that I've already committed against, and what should give |
| **Refused** | Things my twin declined to draft, and which of my own rules stopped it |
| **Yours** | Whatever your table's work actually runs on. Better than anything on this list |

**Read the contract first.** It's in the skill, and it's what makes the swap work:

```text
Show me the panel contract, then help me write a panel for [yours].
```

A panel holds a **Question**, a **Pull** (what to retrieve and how far back), a **Decide** (what qualifies and what's excluded), and an **Empty** line. **It holds no names, no dates and no quotes** – that's the rule that makes it portable, and the reason you can hand yours to five people.

Build it, run it, and get it rendering on your own page. Then:

**Paste the panel file into your table chat.** Everyone drops the others' panels into their own `panels/` folder and refreshes:

```text
Add this panel, run it, and rebuild my command center.
```

Four panels each, none of you having seen anyone else's inbox.

::: tip It's empty. What now?
Almost always a `Pull` that's too narrow – a 7-day window on a quiet week, or a **Decide** that only counts perfectly-phrased requests. Widen the window first, then loosen what qualifies. Ask your twin: *"why did this panel come back empty – was it the pull or the decide?"*
:::

::: warning A panel that only works for you isn't a panel
It's a note. The test is someone else running the same file against their own work and getting sensible items back. If yours only works on your inbox, it's got something specific baked into it – find it and take it out.
:::

::: details What a panel looks like

```md
---
id: going-quiet
title: Going quiet
accent: blue
order: 30
---

## Question

Which threads did I speak last on, and nothing came back?

## Pull

My sent mail, last 14 days, with the rest of each thread.

## Decide

Qualifies when my message was the last in the thread and it asked for
or offered something.

Exclude: threads closed with a thanks, anything under 3 days old,
newsletters, and anything where a meeting since covered it.

Order by age, oldest first.

## Item

- **label** – what the thread is about, under ten words
- **meta** – who's on it, and when I last wrote
- **age** – whole days since my last message
- **url** – the thread

## Empty

Nothing has gone quiet. Every thread you spoke last on came back.
```

No names, no projects, no dates. That's why it travels.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Everyone's page, four panels, at the same time. Then: whose panel found something on your work that you'd genuinely forgotten about?</p>
  </div>
</div>

## 4 · Make it fly itself

**Done when:** the page refreshes without you opening Scout, and nothing has sent.

A page you have to ask for is a page you'll stop asking for. Have Scout schedule the refresh:

```text
Every weekday at 7am, refresh my command center and let me know it's ready.
```

It reads, re-runs every panel, rebuilds the page, and stops. Then check it actually did:

```text
Show me what the scheduled run did this morning.
```

::: warning Nothing sends on its own
It reads and it renders. It never replies, posts or sends – not from a scheduled run, not ever. That's the difference between something you'd leave running and something you'd switch off by Thursday.
:::

## Push it further

Pick the next thing you want to prove.

1. **Give it a memory** – a panel that writes as well as reads, tracking what it told you last time so you can see what's been sitting there for three weeks.
2. **Make it stop** – a rule where the twin hands something back to you instead of drafting, and a panel showing when it did.
3. **Make it narrower** – swap the panels for what your job actually runs on: approvals, escalations, renewals.
4. **Make it defend itself** – ask which file changed a panel's output, and why.
5. **Host it** – you were told not to today. Now you know it's worth it, put it somewhere you'll see it every morning.
6. **Take it with you** – it's a folder of text files. The same twin runs in Cowork and VS Code Copilot.

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Scout ignores the skill | Start a new session – skills load at the start |
| Import didn't take | Drag the **folder**, not `SKILL.md` alone – the panels and renderer live beside it |
| The page won't build | Check `node --version`. Meanwhile ask for panel results in the chat |
| A panel is always empty | The `Pull` window is too short, or the `Decide` is too strict. Widen, then loosen |
| A panel finds everything | The opposite problem. Add exclusions to `Decide`, not filters to the page |
| Someone else's panel breaks on your work | It's got something specific baked in. Find the assumption and take it out |
| Drafts sound like a stranger | Your voice file is descriptions, not real samples. Get actual sent mail in it |
| It answers like a well-adjusted professional | That's the default. Your rules aren't specific enough – go back to step 2 |

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)
