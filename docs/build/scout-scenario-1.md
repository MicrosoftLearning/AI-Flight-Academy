---
title: The Digital Twin – Scout
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🔵 The Digital Twin

::: warning 🚧 Work in progress
Scenario 1 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in Microsoft Scout. Scout does the building – you won't hand-write the app.**

You write down how you work, then turn it into a console that reads what's landed and tells you what you'd do about it.

## What you're solving

Things arrive all day – a request from your manager, a peer asking for something by Friday, a customer question you can't quite answer yet. Every one of them starts cold. You read it, work out what you think, and only then start writing.

Copilot personalizes already. It has memory, and Work IQ reads your mail and calendar. What it doesn't have is anything you've explicitly **decided**: how you rank priorities that conflict, which commitments you protect, what you'd never send without checking.

So here you write that down, and put it somewhere it can do work: **a first line of defense** that reads what came in and gives you the opening position before you've touched it.

## What you'll walk out with

| What you make | What it does |
| --- | --- |
| **Your spec** | How you decide, how you write, and what your calendar says you actually do |
| **A council** | Three drives that argue a call – and one that decides and says what it overruled |
| **A live console** | Three inputs, one council: what landed, what's ahead, who you're facing |
| **A one-step run** | A command or a schedule, so it's there without you setting it up again |

The console runs the same council over three kinds of input:

| Input | What comes back |
| --- | --- |
| **What landed** – paste an email or a request | A position, a draft, and what got overruled |
| **What's ahead** – your next week | What you protect, what you cut, what you move |
| **Who I'm facing** – a name or a meeting | How you handle them, and what you'd never put in writing |

The generic assistant stays available – that's the "before" you compare against.

## Before you start

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/twin-forge-SKILL.md" download="SKILL.md">
    <span class="lab-card-emoji">⚡</span>
    <span class="lab-card-title">Twin Forge</span>
    <span class="lab-card-desc">Interviews you and drafts your first spec. One file – import the folder it's in.</span>
    <span class="lab-card-cta">Download SKILL.md →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/avery-persona-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Avery Washington</span>
    <span class="lab-card-desc">A made-up marketing manager with a fake inbox and calendar. Use them instead of your own data.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

Open Microsoft Scout. The console step later also uses **GitHub Copilot CLI** and **Node** – Scout installs what the app needs, but the CLI has to be signed in and working. Check now: `copilot --version`.

::: tip Want a step spelled out?
The **[Guides](/bricks/)** in the top nav cover the general skills used here – setting up, connecting to your work, and running things on a schedule. They're not scenario-specific, so open one in a new tab if you get stuck on a mechanic.
:::

---

## 1 · See the starting point

Before you build anything, get the "before" on the record. Ask Scout, with no spec and no council:

```text
An exec wants a new customer narrative by 3pm today. I already promised a peer
their review notes by 4pm. What should I do, and what should I say to each?
```

Keep the answer. It'll be reasonable, balanced, and generic – it will suggest talking to both, or negotiating, or working late. It has no idea which of those *you'd* actually do.

**Done when:** you have a saved generic answer to compare against later.

## 2 · Install Twin Forge and draft your spec

1. Download `SKILL.md` above and put it in a folder called `twin-forge`.
2. In Scout, go to **Extensions** → **Import** and drag in the **folder**.
3. Start a **new session** – skills load when a session begins.
4. Say: `Start Twin Forge and help me build a v0.1 digital twin.`
5. Choose your path when asked:
   - **Your own data** – Scout reads your sent mail and calendar. Nothing is shared, and it only sees what you already can.
   - **Avery Washington** – the synthetic persona. Attach the pack files when asked.

Twin Forge interviews you for about eight questions and writes three files: how you decide, how you write, and what your calendar shows.

::: tip Answer honestly, not aspirationally
Every question is *"what did you actually do last time?"* – not *"what do you value?"* Describe your best self and you'll get a twin of someone else.
:::

**Done when:** you have three files, and the one about how you decide is roughly a page.

## 3 · Seat the council

One spec, three drives that want different things. This is the step that makes it more than a prompt.

| Drive | Argues for |
| --- | --- |
| **Ambition** | The visible, strategic, reusable work |
| **Obligation** | Promises already made and people waiting |
| **Capacity** | What your calendar says you can actually absorb |

Plus an **Arbiter** that decides using your rules – and has to publish what it overruled.

Ask Scout to set them up:

> *"Using my spec, set up three drives – ambition, obligation and capacity – that each argue their own corner, and an arbiter that decides using my decision rules and states which drive it overruled and why."*

::: warning Biased on purpose
If all three agree, you've built one voice with three names. Ambition shouldn't be balanced. Neither should the other two. The Arbiter is where the nuance goes – the drives are meant to pull hard in different directions.
:::

**Done when:** the same situation produces three genuinely different positions.

## 4 · Run the conflict

Give the council the same dilemma from step 1:

```text
An exec wants a new customer narrative by 3pm today. I already promised a peer
their review notes by 4pm. Run the council and give me the call, the draft,
and what got overruled.
```

Now compare:

| | Generic assistant | Your council |
|---|---|---|
| **Exec vs. peer conflict** | One balanced suggestion | **A call in your voice, plus the argument it beat** |

That contrast is the point of the whole exercise. Everything after this is making it visible and repeatable.

**Done when:** the council's answer is one you'd actually act on, and the dissent names something real it gave up.

## 5 · Build the console

Now make it something you'd use on a Monday. Ask Scout to build a local web console, with **GitHub Copilot CLI as the backend** running your spec.

Describe what you want:

- a place to drop in something that landed – an email, a message, a request
- a card for each drive, showing its position and how strongly it argues it
- the arbiter's call, in your voice, with a draft you could send
- **what it overruled** – visible, not buried
- a boundary check that shows when the twin refuses to act without you

Get that working on one input first. Then add the other two modes – they run the same council, only the question changes:

- **What's ahead** – paste next week's calendar, get what to protect, cut, and move
- **Who I'm facing** – name a person or meeting, get how you handle them and what you'd never put in writing

::: details Stuck on the prompt? Start with this
Paste this into Scout, then adjust:

> Build me a local web console for my digital twin. Use **GitHub Copilot CLI as the backend** to do the reasoning: a small **Node** web server that shells out to `copilot`, with plain HTML/CSS/JS on the front end – no build step, minimal dependencies, so it starts with one command.
>
> There's a box where I paste something that landed – an email or a request. When I submit it, show a card for each drive (ambition, obligation, capacity) with its position, then the arbiter's decision and a draft reply in my voice, and clearly show which drive got overruled. Read my spec files for the voice and the rules.
>
> Start simple – I'll ask for more.

Then layer: get the cards appearing on one input first, then add the draft, then the dissent, then a boundary check. **One addition per prompt.**
:::

::: warning If the app won't start
Setups vary – Node versions, dependencies, CLI sign-in. If the console won't run on your machine, keep going in the Scout conversation. The council still works there. Get the board up if you can, but don't let it block the thinking.
:::

**Done when:** you paste in something real, and watch the drives disagree before the twin gives you a draft.

## 6 · Add the boundary

A first line of defense has to know what it must not touch. Ask Scout to add a check that runs before anything is drafted for sending:

```text
ALLOW      — go ahead
ASK_FIRST  — draft it, but I approve before it goes
NEVER      — refuse, and say which rule
```

Point it at the boundaries in your spec. Then test it with something it should refuse:

> *"Tell the partner team why I'm out next week."*

It should come back **NEVER**, and name the rule – a decline says *when* you're free, never *why* you're not.

::: tip This is the moment worth demoing
Anyone can show an agent doing something. Showing one **refusing**, and citing your own rule for it, is what makes it a first line of defense rather than a text generator.
:::

**Done when:** the console refuses something and tells you which rule stopped it.

## 7 · Make it easy to run

Turn it into something you start in one step, so it's there on Monday without you rebuilding it. Ask Scout for either:

- a single **start command** – install once, then one command boots it and opens the browser, or
- a **scheduled task** that reads what landed overnight and has a first pass waiting at 8am

::: warning Nothing sends on its own
It drafts. You send. Keep it that way for the whole session and be able to point at it in your demo.
:::

**Done when:** you can start it in one step, or it starts itself and something useful is waiting.

## Go further – the bonus

Once it runs, keep each addition small and let Scout build it:

- pull from your actual inbox instead of pasting, so it triages what's really there
- a history, so you can see how its calls change as you fix your spec
- a "correct it" button – you tell it what you'd really have done, and it proposes the one line to change
- let a teammate ask it something and see what your twin says back
- a second twin, so two people's specs can be compared on the same decision

---

## Show it off

60–90 seconds. Show:

- [ ] The generic answer from step 1, then your council's answer to the same thing
- [ ] The three drives disagreeing, each with its own position
- [ ] The arbiter's call, **and what it overruled**
- [ ] A draft in your voice you'd actually send
- [ ] One of the other two modes – the week plan, or the person prep
- [ ] The console refusing something, citing your rule
- [ ] Started in one step – a command or a schedule

::: tip What to aim for in the demo
Someone who knows you reads a draft your twin wrote and recognises it. That lands harder than any feature.
:::

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Scout ignores the skill | Start a new session – skills load at the start |
| Import didn't take | Drag the **folder** containing `SKILL.md`, not the file alone |
| All three drives agree | They're too balanced. Give each a narrower thing to defend |
| The arbiter never mentions dissent | Tell it explicitly: it must state which drive it overruled and why |
| The console won't start | Check `copilot --version` and Node; meanwhile keep going in the conversation |
| Drafts sound like a stranger | Your voice file is descriptions, not real samples. Put actual sent emails in it |
| It answers like a well-adjusted professional | That's the default. Your rules aren't specific enough – go back to step 2 |

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)

