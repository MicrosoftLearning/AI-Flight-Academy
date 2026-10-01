---
title: The Digital Twin - Cowork
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# The Digital Twin

## Objectives

Copilot can already read your mail, your calendar, and your files. What it can't do is any of it **as you** - decide which of two priorities wins, hold back the thing you'd check first, write differently to your manager than to a partner team. So every task starts with you re-briefing it, and you rewrite most of what comes back.

Your **digital twin** is exactly that, written down and saved as a skill. You don't write it from scratch: Cowork drafts it from your own mail, calendar, and Teams, and you correct what it got wrong. From then on, everything you create with Cowork starts already knowing you.

In this activity you set up a twin, correct what it got wrong, and put it to work on something real. Three steps:

| | Step | You're done when |
| --- | --- | --- |
| **1** | **Set it up** | Cowork has written `persona.md` and `voice.md` from your work, and answered a real question as you. |
| **2** | **Correct it** | You've changed two or three lines and watched an answer change because of it. |
| **3** | **Extend it** | The twin does something it couldn't before. |

Steps 1 and 2 are quick - about 20 minutes together. Step 3 is the main build, and it isn't one change: extend it, re-run, see what moved, then extend it again. Most cards include a prompt you can paste. **Change it as you like. It's a starting point, not the answer.**

**Your twin drafts. You send.** Whatever you create should show you who it's addressed to and what it says, then wait for a yes.

<div class="callout-bubble">
<span class="callout-bubble-icon">🔒</span>

**Your twin is yours.** It reads only what you can already see, and the files it writes stay in your own OneDrive. When you compare with your table, share **the prompt that worked, not your mailbox** - a prompt carries none of your inbox with it.

</div>

::: details Glossary

- **Digital twin:** what Cowork needs to know to act as you - how you decide, how you write, who you answer to. It lives in two text files you own and can edit.
- **Skill:** a plain-text file of instructions Cowork loads and follows. Your twin is one.
- **`persona.md`:** who you serve, what wins when priorities collide, what you check before committing.
- **`voice.md`:** how you write, plus a few of your own messages kept word for word.
- **Reference:** an extra file the twin reads when its instructions call for it. Step 3 is about adding these.

:::

## Before you start

**Open [Cowork](https://copilot.cloud.microsoft/cowork) and check it loads.** If it doesn't, grab a coach.

<a class="lab-card" href="/AI-Flight-Academy/downloads/my-twin-SKILL.md" download="SKILL.md" style="max-width:30rem">
  <span class="lab-card-emoji">🧬</span>
  <span class="lab-card-title">Your twin</span>
  <span class="lab-card-desc">The skill that reads your work and builds itself. Saves as SKILL.md - leave it in your Downloads folder.</span>
  <span class="lab-card-cta">Download SKILL.md →</span>
</a>

---

## 1 · Set it up

**Done when:** Cowork has written `persona.md` and `voice.md` from your work, and answered a real question as you.

1. In Cowork, open **Customize** in the left menu. Select the arrow next to **Add**, then **Upload**, and choose the `SKILL.md` file from your Downloads folder.

   ![The Cowork Customize page, with Customize in the left menu, the Add dropdown open, and Upload highlighted](/img/cowork-upload-skill.png)

1. Start a **new task**. Skills load when a task begins.

1. Ask it to set itself up.

   ```text
   Set up my twin.
   ```

   It tells you what it's about to read and waits for a yes, then reads your sent mail, Teams messages, and about a month of calendar. **Its access is read-only** - it can only see what you already have access to, and it has no permission to send or share anything.

   ::: tip Cowork asks before it changes anything
   When a prompt makes Cowork add or edit a file - your persona, a reference - it shows you the change and waits for you to approve or reject it. That's expected; approve to let it through.
   :::

   It comes back with a draft of both files and writes itself into your OneDrive:

   ```text
   Documents/Cowork/skills/my-twin/
     SKILL.md          ← the instructions. This is the file you uploaded
     references/
       persona.md      ← who you are and how you decide
       voice.md        ← how you write
       setup.md        ← how far it got, so it can pick up if you get pulled away
   ```

   Everything in `references/` is read automatically before the twin answers.

1. Test it with a real question.

   ```text
   Using my twin, what should I do about [the thing you've been putting off]?
   ```

   It should take the position you'd take. Lead with the twin's name - *"using my twin"* or *"ask my twin"* - or Cowork may not call the skill at all.

::: details How a skill works
A skill is a plain-text Markdown file, `SKILL.md`, containing instructions Cowork loads and follows.

The file opens with frontmatter - a `name` and a `description`. Cowork chooses which skill to load by matching your request against the `description`, so the description defines when the skill applies. The body below the frontmatter is the instructions.

Skills are saved in your OneDrive under `Documents/Cowork/skills/<name>/`. A skill can include a `references/` folder of additional `.md` files; the skill reads them when its instructions call for them. Your twin writes its own references there.

`SKILL.md` follows the Agent Skills open standard, so the same files run in other tools that support it, such as GitHub Copilot in VS Code.
:::

## 2 · Correct it

**Done when:** you've changed two or three lines and watched an answer change.

Your twin's first read of you is close, not right. It's built from what your work *proves*, which isn't the same as what you'd say about yourself.

1. **Look at what it built** - ask something like *"show me my persona.md."* Start with the lines tagged `[inferred]` or `[needs you]`; they're likeliest to be wrong.
1. **Fix two or three lines that change what it does** - a name, a date, a threshold, a hard no. *"Balance competing priorities"* changes nothing; *"when an internal deadline and a customer's collide, protect the customer's"* does.
1. **Test it, then move on.** Ask a question you asked earlier and see if the answer moves. If nothing changes, the line was too vague.

Don't try to finish this. You'll keep correcting it while you build.

::: tip 🏷️ Give it a name you'll actually use
Say *"rename my twin to Clippy"* - or whatever you want to call it - then start a new task so Cowork picks it up. You'll be talking to this thing all afternoon; "using my twin" gets old.
:::

::: details More things to try, and what the tags mean

Start every one of these with your twin's name. Drop the name and Cowork answers as itself.

| Ask something like | You get |
| --- | --- |
| *"Clippy, triage what landed today."* | Mail and Teams sorted into needs-me, blocked, handled and noise, with drafts |
| *"Clippy, draft a reply to [a real thread]."* | Something you could send, in your voice |
| *"Clippy, what am I forgetting this week?"* | Your calendar and your commitments read together |
| *"Clippy, what don't you know about how I work?"* | Its own gaps, named - it's read a month of your work |

Every section of your persona is tagged by how directly the twin knows it:

| | |
| --- | --- |
| `[observed]` | Found in your mail, chats or calendar, and the twin can quote it |
| `[inferred]` | A reasonable read, but you never said it outright |
| `[needs you]` | Nothing in your work reached this, so it wrote a starting point |

`[inferred]` and `[needs you]` are likeliest to be wrong. Start there.
:::

## 3 · Extend it

**Done when:** the twin does something it couldn't before.

Your twin now knows *you* - your judgment and your voice. What it doesn't know is the context around you: the people you work with, what's already been decided, what the work is for, and what you're actually on right now. You add that as **references**.

### Pick a direction

The cards below are **starters, not finished builds**. Use them for inspiration, or ignore them and add what your job actually needs.

<div class="skill-steps">
  <div class="skill-step">
    <div class="skill-step-num">1</div>
    <div class="skill-step-body">
      <span class="skill-step-title">Talk it through</span>
      <p>Scan the cards and decide where to start. Add as much as you want from there.</p>
    </div>
  </div>
  <div class="skill-step">
    <div class="skill-step-num">2</div>
    <div class="skill-step-body">
      <span class="skill-step-title">Sketch it</span>
      <p>Two minutes on what it should hold and when the twin should read it.</p>
    </div>
  </div>
  <div class="skill-step">
    <div class="skill-step-num">3</div>
    <div class="skill-step-body">
      <span class="skill-step-title">Create it by talking</span>
      <p>You bring the idea, Cowork does the writing. Describe what you want, look at what comes back, then tell it what to change. Ask it for options when you're stuck — <em>"what else belongs in this reference?"</em></p>
    </div>
  </div>
  <div class="skill-step">
    <div class="skill-step-num">4</div>
    <div class="skill-step-body">
      <span class="skill-step-title">Re-run</span>
      <p>Ask an earlier question again and see what changed. Change one thing at a time - if you change three at once, you won't know which one did it.</p>
    </div>
  </div>
</div>

<script setup>
const references = [
  {
    emoji: "👥", color: "blue", title: "People", tag: "easiest",
    what: "Who it's talking to - what each person needs, who wants the answer first, who you soften bad news for.",
    start: "Add a `people.md` reference and tell the twin to read it whenever a named person is involved.",
    prompt: "Add a reference for who I work with most, what each needs from me, and how I talk to them. Read it whenever a named person is involved.",
  },
  {
    emoji: "📅", color: "green", title: "Commitments",
    what: "What you've already promised, so a new ask lands against a real calendar, not an empty one.",
    start: "Add a reference of what you've committed to and when, read before you agree to more.",
    prompt: "Add a reference for what I've already committed to and when. Read it before telling me to take anything else on.",
  },
  {
    emoji: "✅", color: "purple", title: "Decisions",
    what: "What's already settled, so it stops reopening things the team closed weeks ago.",
    start: "Add a reference of decisions and why, read before it proposes a change of approach.",
    prompt: "Add a reference for decisions we've made and why. Read it before proposing a change of approach.",
  },
  {
    emoji: "🎯", color: "orange", title: "Goals",
    what: "What the work is for, so it weighs what matters, not just what's next.",
    start: "Add a reference for this quarter's goals, read when you ask what to prioritize.",
    prompt: "Add a reference for what I'm trying to achieve this quarter. Read it when I ask what to prioritize.",
  },
  {
    emoji: "🗂️", color: "teal", title: "Your working set",
    what: "The real material you're on now - briefs, drafts, past write-ups - so it grounds answers in your actual work, not just your rules.",
    start: "Point a reference at your current projects and a few past write-ups, read when you ask about current work.",
    prompt: "Add a reference capturing the projects I'm working on right now and a few of my own past write-ups. Read it when I ask about current work.",
  },
  {
    emoji: "✨", color: "gray", title: "Your own",
    what: "Anything the list doesn't cover - a reference your work actually needs, or a rethink of what the twin does.",
    start: "Describe what you want and let the twin work out the reference or skill change it needs. Start over from scratch if you want.",
    prompt: "I want my twin to [what]. Work out what it needs - a new reference or a change to the skill itself - and when to use it.",
  },
];
</script>

<DirectionBubbles :items="references" start-label="Where to start" />

**You'll know it worked when** the twin pulls the reference in on its own: re-run an earlier request and see if the answer changed.

Use everything in the room - Copilot chat, the [reference page](/bricks/), your SME, coaches, and the rest of your table.

::: tip 🎈 Start small
Nothing has to be perfect or finished. Get one reference working, then add another. Time is the real limit - so aim at something you can show, not something you can finish.
:::

::: details What a reference looks like
A file in `references/`; the twin can read as many as you like.

Here's a filled-in `people.md`, with made-up names:

```md
# People

Read this whenever a named person is involved, or when I'm deciding
who to tell first.

## Dana - my manager
Skims everything. Lead with the date and the ask, under five lines,
no preamble. Wants to hear about a slip the day I know, not the week
it lands. Never surprise her in a meeting with something I could have
sent on Tuesday.

## Sam - peer, finance
Wants the number first and the reasoning second. Hates hedging - "roughly"
and "should be" both get a follow-up. If I don't have the number yet,
say so and give a date.

## Priya - partner marketing
Blocked more often than she says. If she's asking, she's usually been
waiting a few days already, so answer before the polished work.
Two-line yes with a date beats a paragraph.

## The Northwind team - external
Careful and brief. Never commit to a date, a number, or anything about
roadmap without checking with Dana first. No internal context, no
shorthand, no names they wouldn't recognize.

## Anyone I'm delivering bad news to
Say the thing in the first line. Then what I'm doing about it, then
what I need. Never bury it under context.
```

Two things make it work: it says **when to read it** at the top, and every line says what to *do* rather than describing the person. "Sam is detail-oriented" changes nothing. "Number first, no hedging" changes the next draft.
:::

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Cowork ignores the twin | Start a new task. Skills load only when a task begins. Begin your request with *"using my twin"*. |
| Upload didn't work | Upload the `SKILL.md` file exactly as it downloaded - don't rename it or paste its contents into a new file. |
| Setup can't read your mail | Ask *"what's on my calendar tomorrow?"* and see if you get a real answer. If not, grab a coach. |
| The answers don't sound like you | Ask which rule made it say that, then fix that line. Vague lines change nothing - name a person, a date, a hard no. |
| It's writing about you, not as you | Your persona is describing rather than instructing. "Sam is detail-oriented" changes nothing; "number first, no hedging" changes the next draft. |
| It changed more than you asked | Ask what it changed and why. Undo the parts you didn't want, then make one change at a time. |

---

[← Back to start](/)
