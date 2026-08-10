---
title: The Digital Twin — Cowork
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🧬 The Digital Twin

::: warning 🚧 Work in progress
Scenario 1 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::
**You'll build this in Cowork. No code, and no experience needed.**

## What you're solving

Copilot already personalizes. It has memory, and Work IQ reads your mail, calendar, and files. That covers a lot.

What it doesn't have is anything you've explicitly **decided**. How you rank priorities when two of them collide. Which promises you protect. What you'd never send without checking first. That gets inferred from what you've already done — you can't inspect it, you can't correct it, and it doesn't move with you when you switch tools.

So you re-supply the same context every session, and rewrite the output when you don't.

Today you write it down once, in a file you control — and put it somewhere it does work: **a first line of defense** that reads what came in and gives you an opening position before you've touched it.

## What you'll walk out with

A one-page spec of how you work, in plain text, that any AI tool can read.

| File | What it holds |
| --- | --- |
| **soul** | How you decide. Your priorities, and what you do when two of them collide. |
| **voice** | How you write. Real emails of yours, and the patterns inside them. |
| **revealed** | What your calendar shows about how you actually spend time. |

It's yours, you can edit it, and it works in Cowork, VS Code, and 30+ other AI tools without changing anything.

## Before you start

Grab these now — you'll need the first one in about two minutes.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/twin-forge-SKILL.md" download="SKILL.md">
    <span class="lab-card-emoji">⚡</span>
    <span class="lab-card-title">Twin Forge</span>
    <span class="lab-card-desc">A skill that interviews you and drafts your first twin. Downloads as SKILL.md — upload that file straight into Cowork.</span>
    <span class="lab-card-cta">Download SKILL.md →</span>
  </a>
  <a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/avery-persona-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Avery Washington</span>
    <span class="lab-card-desc">Optional. A made-up marketing manager with a fake inbox and calendar — use them instead of your own data.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

::: tip Want every step spelled out?
This page gets you through the build, with the essentials expandable in place. There are also **[full step-by-step guides](/bricks/)** covering every click and setting — open one in a new tab and keep it beside this page.
:::

---

## 1 · Seal your answers

**Do this before you build anything.** Four minutes, and you can't do it later.

<a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/twin-test.md" download style="max-width:28rem">
  <span class="lab-card-emoji">📝</span>
  <span class="lab-card-title">The Twin Test</span>
  <span class="lab-card-desc">Fifteen forced-choice work situations. Answer them, then set it aside.</span>
  <span class="lab-card-cta">Download →</span>
</a>

Answer each one with what you **actually did last time** — not what you'd like to have done. Fast, under 30 seconds each. If you're deliberating, you're constructing an answer instead of recalling one.

Then put it away. At the end of the session your twin answers the same fifteen cold and you compare.

**Done when:** fifteen answers written down and set aside.

::: tip This is not a score
There's no percentage and no leaderboard. The mismatches are the useful part — each one is a rule you wrote down that doesn't match how you actually work.
:::

## 2 · Install Twin Forge

1. Open Microsoft 365 Copilot and click the **Cowork** tab.
2. In the left menu, click **Customize**.
3. Click the **Skills** tab.
4. Click the arrow next to **Add**, then **Upload skill**.
5. Choose the `SKILL.md` file you downloaded.

You'll see **"Skill uploaded — twin-forge."**

![Twin Forge showing under Your skills on the Cowork Customize page](/img/twin-forge-uploaded.png)

**Done when:** you see *Skill uploaded — twin-forge* and a new session picks it up.

::: warning Two things that will trip you up
**Upload the file on its own.** Don't zip it. Zipped uploads fail silently — nothing appears and you get no error.

**Start a new Cowork session afterwards.** Cowork only looks for new skills when a session begins, so an already-open one won't see it.
:::

::: details How skills work, if you're curious
A Cowork skill is one markdown file: a bit of YAML at the top telling Cowork *when* to load it, then plain instructions.

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

Cowork decides which skill to load by reading the **description** — so put the phrases you'd actually type in there.

Skills live in OneDrive at `/Documents/Cowork/skills/{name}/`. A skill can carry a `references/` folder (loaded into context when needed) and a `scripts/` folder (executed, not read).

**The reason this matters:** it's the [Agent Skills open standard](https://github.com/MicrosoftLearning/Team-Week-Imagineer-Hack/blob/main/Allfiles/scenario-1-digital-twin/twin-forge/SKILL.md). The same file is read by VS Code Copilot, Claude Code, Gemini CLI, Cursor and 30+ other tools. You're not writing something trapped in one product.

**Want to make your own later?** Cowork → Customize → Skills → **Add ▾** → **Create new** walks you through it. Or just say *"build me a skill that…"* in chat and it'll draft one with you.

<a href="/Team-Week-Imagineer-Hack/bricks/cowork-build-skill" target="_blank" rel="noreferrer">📖 Write a reusable Cowork skill — full guide (opens in a new tab) ↗</a>

:::

## 3 · Pick your data

Start a **new** Cowork session and say:

```text
Start Twin Forge and help me build a v0.1 digital twin.
```

It'll ask which you want:

**Your own data** — Twin Forge reads your sent mail and calendar. Nothing is set up, nothing is shared, and it only sees what you can already see. This makes the better twin, because it's really you.

**Avery Washington** — the made-up marketing manager. Pick this if you'd rather not use your own work data. Download their pack and **attach the files** when Twin Forge asks; it can't see them otherwise.

## 4 · Get your first draft

Twin Forge takes it from here, about 12 minutes:

- reads your last ~10 sent emails and ~30 days of calendar
- asks you around 8 quick questions, one at a time
- shows you where what you *said* and what your calendar *shows* disagree
- writes your three files

::: tip Answer honestly, not aspirationally
Every question is *"what did you actually do last time?"* — not *"what do you value?"* If you describe your best self, you'll get a twin of someone else.
:::

**Done when:** three files exist, and the one about how you decide is roughly a page.

**You now have a v0.1 twin. Everything from here is you making it good — and that's the actual hack.**

---

## 5 · Make it shorter

Your first draft is too long. Cut it to about one page.

Cutting is the highest-value thing you'll do here. Longer is not better. Anthropic [found while building Constitutional AI](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback) that broad principles worked better than long, specific ones — the longer versions actually reduced effectiveness. And ["Lost in the Middle"](https://arxiv.org/abs/2307.03172) (peer-reviewed, *Transactions of the ACL*) showed models pay least attention to whatever sits in the middle of a long prompt.

**Cut anything that isn't a rule you'd actually apply.**

**Done when:** it fits on one screen without scrolling.

## 6 · Give it your voice

Open your voice file. If it *describes* your writing — "professional but friendly" — replace that with **actual emails you sent.** Five to ten, pasted exactly as you wrote them.

Do not tidy them up. The dropped apostrophes, the dash habits, the signoff — those are the specifics a description would lose.

Most people cannot accurately describe their own writing. The openers, the sentence length, the punctuation habits — you use them without deciding to, so you cannot list them from memory. Your sent folder already contains them.

::: details Getting good samples out of Cowork
There's nothing to connect and no auth to set up — Cowork already reaches your mail, calendar, Teams, files and org chart through Work IQ. It only ever sees what you can see.

The trick is asking for a shape you can reuse, not a summary:

```text
Find my last 10 sent emails. Return one row per email with: date, recipient,
subject, the exact greeting, the exact signoff, and three verbatim phrases
that sound like me. Do not summarize before returning the table.
```

Then for the behavioral half:

```text
Summarize my calendar for the last 30 days. Group time by category, and give me
the percentage I marked tentative, the percentage I organized myself, and my
typical response time by sender.
```

**Two rules:** ask for *one* source at a time, and tell it not to summarize before returning. Summaries lose exactly the detail you need.

Keep the prompts that work — you'll want to run them again.

<a href="/Team-Week-Imagineer-Hack/bricks/cowork-connect-source" target="_blank" rel="noreferrer">📖 Connect Cowork to a data source — full guide (opens in a new tab) ↗</a>

:::


## 7 · Give it judgment

Your twin needs to know what you do when two good things collide. Most first drafts have values where rules should be.

| ❌ This is a value | ✅ This is a rule |
| --- | --- |
| I value accuracy. | When an unverified claim threatens a committed date, cut scope and hold the date. |
| I'm responsive to leadership. | When an exec ask conflicts with a peer promise, reply to the exec within the hour, protect the peer's deadline, offer a smaller same-day version. |
| I collaborate well. | When two people both say theirs is top priority, I decide and tell them. I don't escalate it. |

A value cannot be applied. A rule can.

**Done when:** every line in your rules section says what to *do*, not what you care about.

## 8 · Compare with your team

Ten minutes, together. Everyone built their own twin — now build a better *shape* for all of them.

Each person shows **one rule that worked** and **one that's still vague.** Copy what works. Agree on what belongs in a soul file. Keep your own answers; share the structure.

## 9 · ⚡ The twist

Your facilitator will hand this out partway through. Give it to your twin:

```text
A senior executive wants a new customer narrative by 3 PM today.
You already promised a peer their launch review notes by 4 PM.
Use my twin: what do I do, what do I say to each of them, and what gets cut?
```

You are checking one thing: does it make **your** tradeoff, and can it state what it gave up?

If it can't, you've found your next missing rule. Add it and run it again.

## 10 · Make it run without you

Pick one and set it up:

**On a schedule** — *"Every weekday at 9 AM, compare my calendar to my capacity rules and draft a focus plan."*

**On a trigger** — fires when an email arrives or someone @mentions you in Teams.

::: warning Nothing sends on its own
Cowork drafts and waits for your approval. Keep it that way today.
:::

## 11 · The reveal

Pull out the Twin Test you sealed at the start. Ask your twin to answer the same fifteen, cold:

```text
Using my twin, answer these fifteen dilemmas as I would actually answer them —
not as I'd like to, and not as a well-adjusted professional would.
Reply with just the numbers and letters.
```

Fill in the bottom two rows of the table and compare.

For every mismatch, look at the field named under that dilemma — that's the part of your soul file that's wrong. **The interesting misses are where the twin picked the sensible answer and you wouldn't have.**

Fix one and ask it again if you have time.

::: details Setting up a schedule or a trigger
**Schedule** — just describe it in chat:

```text
Send me a focus plan every weekday at 9 AM.
```

Manage them at **Cowork → Scheduled**, which has a **Runs** tab and a **Manage schedules** tab. You get up to five.

**Trigger** — describe the event instead:

```text
When my manager emails me about the launch, draft a reply in my voice.
```

Cowork proposes a **"Set up trigger?"** card showing *When*, *Run in*, *What it does*, and the permissions it needs. Review it, then arm it.

Triggers fire on incoming email or a Teams message/@mention, and the default is **draft-and-approve** — it prepares the action and asks first. Leave that on.

**Before you arm anything:** run the skill manually on new input once and check the output still holds up. Automating something unreliable just makes it unreliable on a schedule.

<a href="/Team-Week-Imagineer-Hack/bricks/cowork-rerun-skill" target="_blank" rel="noreferrer">📖 Re-run a skill on new inputs — full guide (opens in a new tab) ↗</a>

:::

---

<a href="/Team-Week-Imagineer-Hack/bricks/cowork-formatted-output" target="_blank" rel="noreferrer">📖 Produce a formatted output — full guide (opens in a new tab) ↗</a>
## Show it off

60–90 seconds. Hit these:

- [ ] Whose twin — yours or Avery's
- [ ] Your soul file, about a page
- [ ] Your voice file, with real samples in it
- [ ] **One thing your calendar revealed that surprised you**
- [ ] The exec-vs-peer conflict, and what your twin decided
- [ ] Your scheduled prompt or trigger`r`n- [ ] **One dilemma your twin got wrong**, and the rule you'd add because of it

::: tip What to aim for in the demo
Someone who knows you reads a draft your twin wrote and recognises it. That lands harder than showing more features.
:::

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Cowork ignores Twin Forge | Start a **new** session — skills only load at the start |
| Upload seemed to do nothing | Upload the `.md` file, not a zip |
| "I can't find the reference files" | You've got an old copy — re-download it |
| Avery's data can't be found | Attach the pack files to the session |
| Twin sounds like a stranger | Your voice file is descriptions, not real emails. Go back to step 7 |
| Twin gives wishy-washy answers | Your soul file has values, not rules. Go back to step 7 |

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1)

## Guides for this track {#guides}

<!--@include: ../.vitepress/partials/guides-base.md-->
