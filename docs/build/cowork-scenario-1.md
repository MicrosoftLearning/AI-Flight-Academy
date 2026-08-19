---
title: The Digital Twin – Cowork
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🧬 The Digital Twin

::: warning 🚧 Work in progress
Scenario 1 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::

**You'll build this in Cowork. No code, and no experience needed.**

## What you're solving

Copilot already personalizes. It has memory, and **Work IQ** reads your mail, Teams and calendar. So it knows a surprising amount about how you work – you just can't see any of it, correct it, or take it anywhere else.

So each session you re-brief it from scratch, or fix the output by hand.

Today you point Work IQ at your own work, get what it finds written down as two files you can read and correct.

## What you'll walk out with

**A colleague who already knows how you work.** Not a chatbot you brief from scratch every time – something that carries an accurate memory of your job into every request.

You don't build it from scratch. **The twin works within minutes of installing it**, and the rest of the session is spent making it accurate and teaching it something it doesn't know.

It starts with two reference documents:

| File | Holds |
| --- | --- |
| **`persona.md`** | The memory. Who you are and how you decide – who you serve, what wins when priorities collide, what you check before committing, and what's live right now |
| **`voice.md`** | How you write, plus a few of your own messages kept verbatim, so what comes out sounds like you rather than like Copilot |

Both get written for you by **Work IQ**, from your own mail, Teams and calendar. **`persona.md` arrives filled in, built from what your work actually shows** – and some of it will need correcting, because your work proves what you did, not why you did it. Every line is tagged with how directly it knows, and going through those tags is step 2.

::: tip Nothing here is coding
Everything is a sentence typed into a chat box. Cowork writes and saves the files for you – you never open one.

Two things worth knowing before you start:

- **Nothing sends.** Your twin drafts and waits. It can't email anyone.
- **You can always look, and always start over.** *"Show me my persona.md"* prints it in the chat. *"Rebuild my twin"* does exactly that.
:::

## How this runs

Three steps. The first two are quick; the third is the build.

| | Step | You're done when |
| --- | --- | --- |
| **1** | **Let it read you** | It shows you two files built from your own work, and answers a real question the way you would |
| **2** | **Check what it learned** | The lines it drew from context say what you'd actually say, and a request you'd already run comes back different |
| **3** | **Teach it something it doesn't know** | Your table's reference works, and you can show an answer that changed because of it |

**Steps 1 and 2 you do on your own**, at your own pace. **Step 3 you do as a table**, and it's where the rest of the time goes.

Every step gives you a line you can paste. **Change it – it's a starting point, not the answer.**

::: tip When you get stuck, ask Cowork
Nobody expects you to already know how to do this. Cowork is the thing you're building with **and** the thing that helps you build it – use it both ways all day.

Any time you're unsure what to type, or something doesn't behave, say so in the chat.

There are coaches moving around the room and an SME at every table. Wave one over rather than stalling on something they'll fix fast.
:::

::: tip How your table works
**You each build your own**, and nobody has to show theirs. Yours reads your real mail and holds your real rules.

At each table check, bring **proof, not contents** – one thing that changed, one thing it got wrong, one thing you had to teach it. Nobody needs to see the email or the rule behind it.
:::

## Before you start

**Check you have this:** Microsoft 365 Copilot with a **Cowork** tab. Open [m365.cloud.microsoft](https://m365.cloud.microsoft) and look at the top of the left-hand menu – you should see **Chat** and **Cowork** side by side. No Cowork tab, tell a coach now.

**It uses your own mail and calendar.** It only ever sees what you can already see, and nothing you build is shared.

**Download this:**

<a class="lab-card" href="/AI-Flight-Academy/downloads/my-twin-SKILL.md" download="SKILL.md" style="max-width:30rem">
  <span class="lab-card-emoji">🧬</span>
  <span class="lab-card-title">Your twin</span>
  <span class="lab-card-desc">The skill that reads your work and builds itself. Saves as SKILL.md – leave it in your Downloads folder.</span>
  <span class="lab-card-cta">Download SKILL.md →</span>
</a>

::: tip Stuck on a mechanic?
The **[Guides](/bricks/)** in the top nav are short how-tos for the Cowork basics this scenario leans on – getting set up, connecting to your work, running something on a schedule. They're written for any scenario, not this one, so they won't repeat these steps. Open one in a new tab if a mechanic trips you up.
:::

## 1 · Let it read you

**Done when:** it has shown you `persona.md` and `voice.md` built from your own work, and answered a real question the way you would.

Install the skill you downloaded:

1. In Cowork, open **Customize** in the left menu.
2. Open the **Skills** tab.
3. Select the arrow next to **Add**, then **Upload skill**.
4. Choose the `SKILL.md` file from your Downloads folder.

![The twin showing under Your skills on the Cowork Customize page](/img/twin-forge-uploaded.png)

::: details How skills work, if you're curious
A skill is a plain text file with instructions in it. Cowork reads it and follows it. That's the whole idea.

The top few lines tell Cowork *when* to use the skill – it matches on the **description**, so that's where the phrases you'd actually type belong. Everything below is what to do.

Skills are saved in your OneDrive under `Documents/Cowork/skills/`. A skill can come with extra `.md` files in a `references/` folder – background it reads when it needs to. Those are its **references**, and that's exactly what your twin is about to write for itself.

Skills use an open standard, so the same files also work in VS Code Copilot without changing anything.
:::

Then **start a new task** – a task is one conversation, like a new chat – and say:

```text
Set up my twin.
```

It tells you what it's about to read and waits for a yes. Then it reads your sent mail, your Teams messages and about a month of calendar, and comes back with a draft of both files and the evidence behind each line.

**Your job here is to correct it.** It's working from what your mail proves, which is not the same as what you'd say about yourself.

When you're happy with it, it writes itself:

```text
Documents/Cowork/skills/my-twin/
  SKILL.md          ← the instructions. This is the file you uploaded
  references/
    persona.md      ← who you are and how you decide
    voice.md        ← how you write
    setup.md        ← how far it got, so it can pick up if you get pulled away
```

**A skill plus references – that's all a twin is.** Everything in `references/` gets read before it answers anything. Step 3 is about adding to that folder.

You never open any of these. Say *"show me my persona.md"* and it prints in the chat.

::: warning It tags how well it knows each line
Every line says where it came from. `[observed]` was found in your work. `[inferred]` is a reasonable read it can't point at directly. `[needs you]` means your work didn't cover it, so it wrote something to get you started.

The tags are the point. Step 2 is going through them.
:::

Try it on something real before you move on. Ask it a question rather than for a draft – you want to see whether it thinks like you, not just whether it writes like you:

```text
Using my twin, what should I do about [the thing you've been putting off]?
```

You'll get a position, not a list of options. Whether you agree with it is what step 2 is for.

::: tip Say the skill's name
Cowork only loads your twin when you name it – *"using my twin"*, *"ask my twin"*. Leave that out and you'll get an ordinary Copilot answer, not your twin's.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>What did it get right about you that you didn't expect? And what did it get badly wrong?</p>
  </div>
</div>

## 2 · Check what it learned

**Done when:** the lines it drew from your work context say what you'd actually say, and a request you'd already run comes back different.

Ask to see what it built:

```text
Show me my persona.md.
```

Fifteen sections, all filled from your real work, each tagged with how directly it knows:

| | |
| --- | --- |
| `[observed]` | It found this in your mail, chats or calendar, and can quote it |
| `[inferred]` | A reasonable read of what it found, but you never said it outright |
| `[needs you]` | Your work didn't cover this, so it wrote a starting point for you to react to |

**Start with `[inferred]` and `[needs you]`.** Those are the ones drawn furthest from the evidence. Some will land; a few won't – it can watch a month of your work and still not know what you'd refuse outright, or what actually drains you.

**Then thicken the `[observed]` ones.** They're accurate but thin: *"align with collaborators"* is true and doesn't know who, or when it matters. Leave the line and add underneath it:

> add: *"Check with Alex before I move anything he owns the concept for."*

**Save a request and its answer first**, so you've got something to compare against. Then correct the file in the chat, and run the same request again word for word.

::: tip What's worth adding, and how to find it
Anything that changes what it does – a name, a date, a threshold, something you'd never agree to without checking. *"I value collaboration"* doesn't: it's true, and it tells your twin nothing to do differently.

**Stuck on what to say? Ask it.** *"What don't you know about how I work that would change your answers?"* It's read a month of your work, so it can point at what it's still guessing on.
:::

::: details Nothing changed
Two likely reasons. The line is too vague – give it a specific action, not a description. Or your test didn't need it: a rule about slipping deadlines won't move an answer that has nothing to do with dates.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Name the <em>kind</em> of rule that changed an answer – a priority, a boundary, a check, a trade-off. Keep the actual people and dates to yourself.</p>
  </div>
</div>

## 3 · Teach it something it doesn't know

**Done when:** everyone at the table has built the same reference, and each of you can show an answer that changed because of it.

Your twin answers well now. It takes a position, it drafts in your voice, it stops when one of your rules says stop.

**But it only knows you.** It doesn't know the people around you, what's already been decided, or what any of this is in service of – so it can tell you what you'd do, and not what it'll cost you with the person waiting on the other thing.

**Decide as a group, then build together.** Start with one, add more if you've got time – the table works the same problem at the same time, so whatever one person figures out, everyone gets.

| Reference | What your twin gains | Start with |
| --- | --- | --- |
| **`people.md`** | Who it's talking to. What each person needs, who wants the answer first, who you soften bad news for | *"Add a people reference – who I work with most, what each one needs from me, and how I talk to them. Read it whenever a named person is involved."* |
| **`commitments.md`** | What you've already promised, so a new request lands against a real calendar rather than an empty one | *"Add a reference for what I've already committed to and when. Read it before you tell me to take anything else on."* |
| **`decisions.md`** | What's already settled, so it stops reopening things the team closed weeks ago | *"Add a reference for decisions we've already made and why. Read it before you propose changing an approach."* |
| **`goals.md`** | What the work is for, so it can tell you why something matters, not just what's next | *"Add a reference for what I'm actually trying to achieve this quarter. Read it when I ask what to prioritise."* |
| **Yours** | Whatever your table's work actually runs on. Better than anything on this list | *"I want my twin to know [what]. Work out what file that needs and when you should read it."* |

**Everything so far has been you correcting a file Cowork wrote.** This is the same move, pointed somewhere new: start with the line above, then argue with what comes back.

::: tip You don't have to wire it up
Your twin reads everything in its `references/` folder before it answers, so a new file counts the moment it's saved. There's nothing to switch on and no list to add it to.

What matters is the first line of the file – the one that says *when* to read it. That's what tells your twin the file applies to the question in front of it.
:::

**Use everything in the room.** Cowork is one tool – you've also got Copilot chat, the [Guides](/bricks/), an SME at your table, coaches walking around, and five other people solving the same problem. Nothing here is meant to be worked out alone.

**You'll know it worked when** it uses the new reference without you mentioning it. Re-run a request from earlier – if the answer changed, it's wired in.

::: details What a skill looks like
The instructions. There's one of these – `SKILL.md` – and it's the file you uploaded.

The top few lines tell Cowork **when** to load it. Everything below is what to do:

```md
---
name: my-twin
description: Use when the user says "using my twin", "triage what landed",
  or asks for a draft that sounds like them.
---

# My Twin

## Before every answer

Read everything in `references/` – persona.md first, then voice.md.

## Triage

When asked what landed, check mail and Teams, say how many items you
checked, then sort every one into Handled, Needs me, Blocked or Noise.
```
:::

::: details What a reference looks like
The knowledge. There can be as many of these as you like, and everything in `references/` gets read before your twin answers.

Here's a filled-in `people.md`, with made-up names:

```md
# People

Read this whenever a named person is involved, or when I'm deciding
who to tell first.

## Dana – my manager
Skims everything. Lead with the date and the ask, under five lines,
no preamble. Wants to hear about a slip the day I know, not the week
it lands. Never surprise her in a meeting with something I could have
sent on Tuesday.

## Sam – peer, finance
Wants the number first and the reasoning second. Hates hedging – "roughly"
and "should be" both get a follow-up. If I don't have the number yet,
say so and give a date.

## Priya – partner marketing
Blocked more often than she says. If she's asking, she's usually been
waiting a few days already, so answer before the polished work.
Two-line yes with a date beats a paragraph.

## The Northwind team – external
Careful and brief. Never commit to a date, a number, or anything about
roadmap without checking with Dana first. No internal context, no
shorthand, no names they wouldn't recognise.

## Anyone I'm delivering bad news to
Say the thing in the first line. Then what I'm doing about it, then
what I need. Never bury it under context.
```

Two things make it work: it says **when to read it** at the top, and every line says what to *do* rather than describing the person. "Sam is detail-oriented" changes nothing. "Number first, no hedging" changes the next draft.
:::

::: warning Nothing sends on its own
Whatever you build, keep it drafting and waiting. That's the difference between something you'd use on Monday and something you'd switch off.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Show the answer that changed once your reference was in. If it isn't working yet, say what you tried – someone else may have hit the same wall.</p>
  </div>
</div>

## Push it further

Pick the next thing you want to prove.

1. **Make it run without you** – *"Every weekday at 8, triage what landed overnight and have it waiting for me."*
2. **Give it a memory** – a reference it writes to as well as reads, tracking what you owe people and what they owe you.
3. **Make it stop** – give it a condition where it has to hand something back to you instead of drafting.
4. **Make it narrower** – swap the triage buckets for what your job actually runs on: approvals, escalations, renewals.
5. **Make it defend itself** – ask which file changed its answer, and why.
6. **Take it with you** – your twin is a folder of text files. The same folder runs unchanged in VS Code Copilot.

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)
