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

Copilot guesses how you work from what you've already done. That guess is invisible – you can't read it, fix it, or move it to another tool.

So every session starts the same way: you re-explain yourself, or you skip it and rewrite the output by hand.

Today you write it down once – how you decide, how you write – and save it into Cowork.

## What you'll walk out with

An agent that works the way you do.

Hand it anything from your job and it finds its own context – your mail, Teams, calendar, files – then takes a position and drafts in your voice. It stops short of anything that isn't its call. It's available in every Cowork task from then on, including ones that run on a schedule.

Here's how you'll get there:

| Step | What happens | Time |
| --- | --- | --- |
| 1–3 | You answer questions. A skill called Twin Forge reads your sent mail, then turns your answers into two references: **soul** (how you work) and **voice** (how you write) | ~35 min |
| 4 | You try it on something real and find out what it's missing | ~10 min |
| 5 | **Build as a group.** Add what it doesn't know – your people, your commitments, where it has to stop and check with you | ~50 min |

Step 5 is most of the hack. The steps before it get you there with something worth improving.

::: tip Nothing here is coding
You answer yes/no questions, and everything else is a sentence typed into a chat box. Cowork writes and saves all the files for you – you never open one.
:::

::: tip When you get stuck, ask Cowork
Nobody expects you to already know how to do this. Cowork is the thing you're building with **and** the thing that helps you build it – use it both ways all day.

Any time you're unsure what to type, or something doesn't behave, say so in the chat.

There are coaches moving around the room and an SME at every table. Wave one over rather than losing ten minutes to something they'll fix in one.
:::

::: tip Stuck on a mechanic?
The **[Guides](/bricks/)** in the top nav are short how-tos for the Cowork basics this scenario leans on – getting set up, connecting to your work, running something on a schedule. They're written for any scenario, not this one, so they won't repeat these steps. Open one in a new tab if a mechanic trips you up.
:::

## Before you start

**Check you have this:** Microsoft 365 Copilot with a **Cowork** tab. Open [m365.cloud.microsoft](https://m365.cloud.microsoft) and look at the top of the left-hand menu – you should see **Chat** and **Cowork** side by side. No Cowork tab, tell your facilitator now.

**Download this:**

<a class="lab-card" href="/AI-Flight-Academy/downloads/twin-forge-SKILL.md" download="SKILL.md" style="max-width:30rem">
  <span class="lab-card-emoji">⚡</span>
  <span class="lab-card-title">Twin Forge</span>
  <span class="lab-card-desc">The skill that interviews you and builds your twin. Saves as SKILL.md – leave it in your Downloads folder.</span>
  <span class="lab-card-cta">Download SKILL.md →</span>
</a>

**Think of this now:** one unresolved thing at work – an email you haven't replied to, or a decision someone's waiting on. You'll use it in step 4, and it's easier to pick now than under time pressure.

**Choose your data.** Twin Forge asks you this in step 1:

| Option | What happens | Pick this if |
| --- | --- | --- |
| **Your own** | It reads your sent mail and calendar. It only ever sees what you can already see, and nothing is shared | You want a twin that's actually you – this makes a sharper one |
| **Avery Washington** | You use a made-up marketing manager's fake inbox and calendar instead | Your mail is sensitive, or you'd rather not |

Taking Avery? Download **[the persona pack](/AI-Flight-Academy/downloads/avery-persona-pack.zip)** now, right-click the `.zip` → **Extract All**. In step 1, answer **no** when asked about your own mail, then attach the extracted files with the **paperclip** button. Attach the files, not the zip.

::: tip How your table works
**Steps 1–4 you do on your own.** Everyone builds their own twin, on their own laptop, with their own data – or Avery's. Nobody waits for anybody.

**Step 5 you do as a group.** The table agrees on two or three add-on references, then you each build those same references filled with your own answers. That's where most of the hack is.
:::

---

## 1 · Install Twin Forge

**~10 minutes.**

Twin Forge is a skill – a set of instructions Cowork loads when you ask for it. You install it once.

1. Open [m365.cloud.microsoft](https://m365.cloud.microsoft) and select the **Cowork** tab.
2. In the left menu, select **Customize**.
3. Open the **Skills** tab.
4. Select the arrow next to **Add**, then **Upload skill**.
5. Choose the `SKILL.md` file from your Downloads folder.

![Twin Forge showing under Your skills on the Cowork Customize page](/img/twin-forge-uploaded.png)

Now go back to Cowork and **start a new task** – a task is one conversation, like a new chat. Type:

```text
Start Twin Forge and build my digital twin.
```

It replies by asking whether to use your own mail and calendar, or Avery. Answer, and it starts asking questions.

**Done when:** Twin Forge is asking you yes/no questions.

**Nothing happened?** Start another new task and ask again – that clears it most of the time. If a second task does nothing either, grab a coach or your table's SME instead of retrying a third time.

::: warning Two things that will trip you up
**Upload the `.md` file as it downloaded.** If the upload seems to do nothing, check whether your browser saved it as a `.zip` – right-click → **Extract All**, then upload the `SKILL.md` inside. Cowork does take zips, but only when `SKILL.md` sits at the root of the archive.

**You must start a new task after uploading.** Cowork looks for new skills only when a task begins, so a task you already have open won't find Twin Forge.

Then **stay in that same task through step 4.** Everything Twin Forge does happens in one conversation.
:::

::: details How skills work, if you're curious
A skill is a plain text file with instructions in it. Cowork reads it and follows it. That's the whole idea.

The top few lines tell Cowork *when* to use the skill. Everything below is what to do:

```md
---
name: meeting-brief
description: Use this when I ask for a meeting brief, prep notes, or a stakeholder summary.
---

# Meeting Brief

When this skill runs, you MUST:
1. Identify the meeting, attendees, and goal.
2. Pull relevant calendar, email, and file context.
3. Return the output in the shape below.

Never invent missing context. If evidence is thin, say what's missing.
```

Cowork chooses which skill to use by reading the **description**, so it holds the phrases you'd actually type.

Skills are saved in your OneDrive under `Documents/Cowork/skills/`. A skill can come with extra `.md` files in a `references/` folder – background it reads when it needs to. Those are its **references**, and that's exactly what your twin will be.

Skills use an open standard, so the same files also work in VS Code Copilot without changing anything.

:::

## 2 · Answer the questions

**~20 minutes.** This builds **soul** – how you work.

Twin Forge reads your recent sent mail first, then asks eight yes/no questions. Most of them quote something back at you:

> *On Aug 13 you declined a meeting and offered Monday instead. Do you always name an alternative when you move something?*

Answer fast, with what you actually do – not what you'd like to do. "Depends" is a fine answer.

The eight cover different ground on purpose: what you send back, what you argue for, how you start a piece of work, what specific people need from you, what experience taught you, what's on your plate, what you refuse, and what gives when the week is full.

Then it writes your soul reference and shows you the whole thing. Read it. This is where a twin is good or useless:

| ❌ Useless | ✅ Useful |
| --- | --- |
| I value accuracy. | When an unverified claim threatens a committed date, cut scope and hold the date. |
| I'm responsive to leadership. | When a senior stakeholder's ask collides with a peer promise, reply within the hour, protect the peer's date, offer a smaller version today. |
| I collaborate well. | When two people both say theirs is top priority, I decide and tell them. I don't escalate. |

An agent can't act on a value. It can act on a rule.

There's a second test worth applying: **could this line have been written about anyone?** If it could, it's not yours yet. Say so and Twin Forge will put something specific in it.

```text
That rule could describe anyone who answered the same way. Rewrite it using
something you actually found in my mail.
```

The reference also has a short **Boundaries** section. Skim it – that's what makes your twin stop and hand something back to you instead of drafting it, and you'll use it in step 5.

**Done when:** every line names a situation and a specific action, and at least a few could only be about you.

::: tip Keep it to one page
Short instructions beat long ones – models pay least attention to the middle of a long prompt. If your soul reference runs past a page, ask Twin Forge to cut it.
:::

## 3 · Let it read your writing

**~5 minutes.** This builds **voice** – how you write.

This step mostly runs itself. Twin Forge already read your mail in step 2 — it now pulls out the writing patterns: your signoff, how you open to a peer versus your manager, your punctuation habits, your usual length. It quotes the emails exactly, typos and all.

It reads instead of asking because nobody can list their own writing habits from memory.

Review the patterns it found and correct anything wrong. Then it saves your twin:

```text
Documents/Cowork/skills/my-twin/
  SKILL.md          ← this is what makes your twin load in every new task
  references/
    soul.md         ← how you work
    voice.md        ← how you write
```

You don't need to open any of these. It's worth seeing the shape, because step 5 is entirely about adding to that `references/` folder.

**A skill plus references – that's all a twin is.** `SKILL.md` holds the instructions. Everything in `references/` is background your twin reads before it answers anything. Soul and voice are the first two. Anything you add later gets read the same way.

Twin Forge finishes by showing you both files in full and naming **one place your answers didn't match your actual mail or calendar.** Read them — it's the only time you'll see them before the twin starts answering as you. Note the gap; it's a good first thing to fix in step 5.

Then it hands you the choice: keep going in this task, or start a fresh one. Either works.

**Done when:** Twin Forge says your twin is installed.

## 4 · Try it on something real

**~10 minutes.** The point of this step is to find out what your twin doesn't know.

Use the unresolved thing you picked earlier. Ask for it by name, in the same task:

```text
Using my twin: what do I do about the vendor renewal?
```

Replace *the vendor renewal* with whatever yours is actually called – the project name, the subject line, or the person waiting on you. **Don't paste the email in.** Your twin searches your mail first, then Teams, then your calendar, and your files if it needs one, stopping as soon as it finds a clear match. It only sees what you can already see.

**Say "my twin" every time.** Your twin only runs when you ask for it by name. Leave that out and you'll get an ordinary Copilot answer.

When it finds your thread and has something to write, the reply comes back in five parts:

```text
Found: 3 messages on the vendor renewal, most recent from your manager
Thursday, unanswered.

Decision: Confirm the renewal date today and flag the pricing question
separately, rather than holding the whole thread for one open item.

Draft: [a reply, written in your voice]

Cost: The pricing answer goes out a day later than if you'd waited and
sent one complete response.

Rule: "When part of an answer is blocked, send the part that isn't and
name the gap." — soul.md, Decision rules
```

Shorter replies are normal in other situations – if it can't find the thread, or one of your rules stops it, it says so instead.

Check four things:

- **Found** – did it pick the right thread?
- **Decision** – is it a position, not a list of considerations?
- **Draft** – read it out loud. Does it sound like you?
- **Cost** – real decisions give something up. Did it name one?

**Rule** tells you which line of your soul reference produced the answer. When something's wrong, that's what to fix.

::: warning Save this answer
Copy the whole reply into a scratch document, or leave this task open in a browser tab. **In step 5 you'll run the same request again and compare** – and without the original you can't tell whether anything improved.
:::

**Done when:** you've run it once, saved the answer, and written down one thing it missed.

::: tip Write down what it missed
It will miss things – the wrong tone for that person, no idea what else you've committed to, no sense of what it shouldn't be deciding on its own.

**That's what you bring to your table at the start of step 5.** Don't try to fix anything yet.
:::

::: details It grabbed the wrong thread
Give it the sender or a phrase from the subject line: *"Using my twin – I meant the thread from Dana about renewal pricing."*

If several threads matched, it should have listed them and asked you which. Pasting the message in still works for anything it genuinely can't find.
:::

## 5 · Make it yours

**~40 minutes. This is the build, and this is the part you do as a group.**

Your twin works, but it's thin: it knows how you work and how you write, and not much else about your job.

**As a table, first – take five minutes.** Everyone reads out the one thing their twin missed in step 4. Then agree on **two or three references you'll all build.** Same references for everyone; each person fills theirs with their own people, their own commitments.

Agreeing up front is what makes the remaining time fast – you're all solving the same problem at once, so whatever one person works out, the whole table gets.

**Then, on your own: start a new task.** Twin Forge is finished – it built your twin and handed it over. A fresh task keeps Forge out of the driver's seat, so what you say next goes to your twin instead of back into the interview.

::: warning Two different things you can say
This is the one thing to get right in step 5.

| You want to | Start your message with |
| --- | --- |
| **Ask your twin something** | *"Using my twin: …"* |
| **Change your twin** | *"Edit my twin skill: …"* |

Same twin, two different jobs – asking it a question, or changing how it works.
:::

### What to build

Pick these as a table, from what people said their twins missed in step 4. These work well:

| Reference | What it holds | So your twin can |
| --- | --- | --- |
| `stakeholders` | Each person you deal with, what they need, how you talk to them | Change tone by recipient instead of writing everyone the same |
| `projects` | What you're working on and the dates you've committed to | Know what a new request collides with |
| `escalation` | What has to be true before you pull someone else in | Tell you when to stop absorbing something |
| `meetings` | How you run the ones you own | Draft an agenda that looks like yours |
| `bad-week` | What you cut first when everything slips | Give you a triage order instead of sympathy |

Something specific to the work your table actually does beats anything on this list.

They're short. A `stakeholders` reference is about six lines:

```text
My manager — skims. Lead with the date, under five lines, no preamble.
Dana, peer in finance — wants the number first, hates hedging.
Partner team — external. Never commit to a date without checking with me.
```

### The rounds

Do this once per reference you add.

**a. Ask for the reference:**

```text
Edit my twin skill: add a reference that lists the people I work
with — each person, what they need from me, and how I talk to them. Ask me
questions to fill it in, then add it to the skill's reading list.
```

**b. Answer its questions.** Short answers, what you actually do.

**c. Confirm it's being read:**

```text
Edit my twin skill: check my new reference is on the reading list, and add it
if it isn't.
```

**d. Test it.** Run the *same request you saved in step 4*, word for word:

```text
Using my twin: what do I do about the vendor renewal?
```

**e. Compare the two answers.** Something should be visibly different – the tone, the length, what it prioritised. If nothing changed, go back to **c**, then make the reference's lines more specific.

**f. Correct it in chat.** *"Too long for my manager – she skims. Shorter, and lead with the date."* Then run the same request again.

### Getting the handback

A twin that stops, hands a call back to you, and quotes your own rule for doing it is the strongest thing you can show. Put the rule in your **soul** reference, where boundaries live:

```text
Edit my twin skill: add this to the Boundaries section of my soul reference —
never tell anyone why I'm out, only when I'm back.
```

Then ask your twin to break it:

```text
Using my twin: tell the partner team why I'm out next week.
```

A correct handback stops instead of drafting, names the rule, and says what it would need to go ahead:

```text
That one's yours to call. Your boundary says: "Never disclose the reason I'm
out; a decline says when I'm free, never why I'm not." — soul.md, Boundaries

I'd need your say-so to share the reason. I can send your availability
instead — want that?
```

If it drafts the message anyway, your boundary is too soft. Make it a flat "never", and try again.

### Requirements

Hit both:

- [ ] **Your twin knows something new about your job.** You've told it about your people, your deadlines, or your rules – and your step 4 request now answers differently because of it, without you mentioning the new information.
- [ ] **Your twin handed one call back to you**, quoting the rule that stopped it.

The first one is the real bar. If you can't see a difference between the step 4 answer and the one you're getting now, nothing you added is being used.

**Both done with time left?** Tell it something else about your job and do it again.

### Working as a table

You each build your own copies, but you build them at the same time – so don't build in silence.

| When | What |
| --- | --- |
| First 5 minutes | Agree the two or three references everyone will build |
| ~20 minutes in | Whoever's reference is working best reads theirs out. Copy the structure, not the content |
| Last 5 minutes | One person demos a handback, one demos a before/after |

When someone's reference changes nothing, say so out loud – somebody at the table has usually just hit and fixed the same thing.

**Done when:** your step 4 request answers differently, and your twin has handed something back to you.

::: warning Keep each reference short
Half a page. Long references get ignored in the middle – same reason soul stays at one page. Two sharp references beat one long one.
:::

::: details Nothing changed after you added a reference
Work through these in order, in the same task:

1. **Confirm it's on the list.** *"Edit my twin skill: check my new reference is on the reading list, and add it if it isn't."*
2. **Make it more specific.** Descriptions change nothing; instructions change behaviour. Try: *"Edit my twin skill: rewrite my stakeholders reference so every line says what to do. For example: 'With my manager, lead with the date and keep it under five lines.'"*
3. **Check your test needs it.** A reference about people won't change an answer that doesn't involve one. Test with a request that clearly should use it.
:::

::: warning If Cowork offers to widen the trigger
It may suggest making your twin respond to general phrases like *"what should I do"*. Say no – your twin would then take over ordinary requests and you'd lose normal Copilot.
:::

## Go further

- **Schedule it** – *"Every weekday at 9 AM, compare my calendar to my capacity rules and draft a focus plan."* Manage these at **Cowork → Scheduled**.
- **Trigger it** – on incoming mail or a Teams @mention. Cowork shows a **"Set up trigger?"** card to review before you arm it.
- **Take it with you** – the same folder runs unchanged in VS Code Copilot.
- **Trade with your table** – borrow someone's stakeholders structure and fill it with your own people.

::: warning Nothing sends on its own
Cowork drafts and waits for your approval. Keep it that way, and point at it in your demo.
:::

---

## Show it off

60–90 seconds. Lead with the before/after – it needs no explanation.

- [ ] Your step 4 request, answered before and after one of your references
- [ ] Your twin handing a call back to you, quoting your own rule
- [ ] **One decision rule** specific enough to be slightly embarrassing
- [ ] Which references you added, and what made you pick them

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Cowork ignores Twin Forge | Start a **new task** – skills load only when a task begins. Still nothing on the second try? Grab a coach |
| You don't know how to do something | Ask Cowork in the chat, in plain words. Then ask a coach or your table's SME |
| Upload seemed to do nothing | If the file is a `.zip`, extract it and upload the `SKILL.md` inside |
| Avery's data can't be found | Extract the zip first, then attach the files inside it – not the zip |
| Twin Forge is still asking questions | Expected through step 3. It's finished once it says your twin is installed |
| A new task doesn't know your twin | The `my-twin` folder isn't under `Documents/Cowork/skills/`. Move it, then start another task |
| Your twin doesn't answer as you | Say "Using my twin" – it only runs when you name it |
| It answered instead of editing your twin | Say "Edit my twin skill" to change it, "Using my twin" to ask it something |
| It can't find the thread | Give it the sender or a phrase from the subject line |
| It answered about the wrong thread | Say which you meant, and that it should ask when several match |
| Drafts sound like a stranger | Your voice reference has no real samples. Tell it to re-read your sent mail |
| It gives options instead of deciding | Your rules are values. Say what it should have decided; it rewrites the rule |
| It won't hand anything back | Your boundary is too soft. Make it a flat "never" in your soul reference's Boundaries |
| A reference you added changed nothing | See the troubleshooting box at the end of step 5 |

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)

