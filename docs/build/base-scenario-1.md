---
title: The Digital Twin — Cowork
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🧬 The Digital Twin

**You'll build this in Cowork. No code, and no experience needed.**

## Why

AI can write any email. It can't write *your* email.

It knows everything about your company and nothing about you — so every draft needs a rewrite, and the time you saved disappears in the last mile.

**The last mile is you.** Today you're going to write that part down.

## What you'll walk out with

A one-page spec of how you actually work — and any AI tool can read it.

| File | What it holds |
| --- | --- |
| **soul** | How you decide. Your priorities, and what you do when two of them collide. |
| **voice** | How you write. Real emails of yours, and the patterns inside them. |
| **revealed** | What your calendar says about you — versus what you say about you. |

It's plain text, it's yours, and it works in Cowork, VS Code, and 30+ other AI tools without changing a thing.

## Before you start

Grab these now — you'll need the first one in about two minutes.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="https://github.com/MicrosoftLearning/Team-Week-Imagineer-Hack/blob/main/Allfiles/twin-forge/SKILL.md">
    <span class="lab-card-emoji">⚡</span>
    <span class="lab-card-title">Twin Forge</span>
    <span class="lab-card-desc">A skill we built that interviews you and drafts your first twin. Download the file, then click Raw → Save.</span>
    <span class="lab-card-cta">Get it →</span>
  </a>
  <a class="lab-card" href="https://github.com/MicrosoftLearning/Team-Week-Imagineer-Hack/tree/main/Allfiles/persona-pack">
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Avery Washington</span>
    <span class="lab-card-desc">Optional. A made-up marketing manager with a fake inbox and calendar — use them instead of your own data.</span>
    <span class="lab-card-cta">Get it →</span>
  </a>
</div>

---

## 1 · Install Twin Forge

1. Open Microsoft 365 Copilot and click the **Cowork** tab.
2. In the left menu, click **Customize**.
3. Click the **Skills** tab.
4. Click the arrow next to **Add**, then **Upload skill**.
5. Choose the `SKILL.md` file you downloaded.

You'll see **"Skill uploaded — twin-forge."**

![Twin Forge showing under Your skills on the Cowork Customize page](/img/twin-forge-uploaded.png)

::: warning Two things that will trip you up
**Upload the file on its own.** Don't zip it. Zipped uploads fail silently — nothing appears and you get no error.

**Start a new Cowork session afterwards.** Cowork only looks for new skills when a session begins, so an already-open one won't see it.
:::

## 2 · Pick your data

Start a **new** Cowork session and say:

```text
Start Twin Forge and help me build a v0.1 digital twin.
```

It'll ask which you want:

**Your own data** — Twin Forge reads your sent mail and calendar. Nothing is set up, nothing is shared, and it only sees what you can already see. This makes the better twin, because it's really you.

**Avery Washington** — the made-up marketing manager. Pick this if you'd rather not use your own work data. Download their pack and **attach the files** when Twin Forge asks; it can't see them otherwise.

## 3 · Get your first draft

Twin Forge takes it from here, about 12 minutes:

- reads your last ~10 sent emails and ~30 days of calendar
- asks you around 8 quick questions, one at a time
- shows you where what you *said* and what your calendar *shows* disagree
- writes your three files

::: tip Answer honestly, not aspirationally
Every question is *"what did you actually do last time?"* — not *"what do you value?"* If you describe your best self, you'll get a twin of someone else.
:::

**You now have a v0.1 twin. Everything from here is you making it good — and that's the actual hack.**

---

## 4 · Make it shorter

Your first draft is too long. Cut it to about one page.

This feels wrong and it's the single highest-value thing you'll do. Longer isn't better. Anthropic [found while building Constitutional AI](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback) that broad principles worked better than long, specific ones — the longer versions actually reduced effectiveness. And ["Lost in the Middle"](https://arxiv.org/abs/2307.03172) (peer-reviewed, *Transactions of the ACL*) showed models pay least attention to whatever sits in the middle of a long prompt.

**Cut anything that isn't a rule you'd actually apply.**

<small>Want the mechanics of editing a skill? [Full guide →](/bricks/cowork-build-skill)</small>

## 5 · Give it your voice

Open your voice file. If it *describes* your writing — "professional but friendly" — replace that with **actual emails you sent.** Five to ten, pasted exactly as you wrote them.

Don't tidy them up. The dropped apostrophes, the dashes, the way you sign off — that's the whole signal.

When you write, you make hundreds of small choices you've never consciously noticed — how you open, whether you bullet or run on, what you do with dashes, how you sign off. You can't list them. But they're all sitting there in your sent folder.

Showing beats describing.

<small>[Full guide →](/bricks/cowork-connect-source)</small>

## 6 · Give it judgment

Your twin needs to know what you do when two good things collide. Most first drafts have values where rules should be.

| ❌ This is a value | ✅ This is a rule |
| --- | --- |
| I value accuracy. | When an unverified claim threatens a committed date, cut scope and hold the date. |
| I'm responsive to leadership. | When an exec ask conflicts with a peer promise, reply to the exec within the hour, protect the peer's deadline, offer a smaller same-day version. |
| I collaborate well. | When two people both say theirs is top priority, I decide and tell them. I don't escalate it. |

A value tells an agent nothing. **A rule tells it what to do.**

## 7 · Compare with your team

Ten minutes, together. Everyone built their own twin — now build a better *shape* for all of them.

Each person shows **one rule that worked** and **one that's still vague.** Steal shamelessly. Agree on what belongs in a good soul file. Keep your own answers; share the structure.

## 8 · ⚡ The twist

Your facilitator will hand this out partway through. Give it to your twin:

```text
A senior executive wants a new customer narrative by 3 PM today.
You already promised a peer their launch review notes by 4 PM.
Use my twin: what do I do, what do I say to each of them, and what gets cut?
```

The goal isn't a polite answer. It's whether your twin makes **your** tradeoff — and can say what it gave up.

If it can't, you've found your next missing rule. Add it and run it again.

## 9 · Make it run without you

Pick one and set it up:

**On a schedule** — *"Every weekday at 9 AM, compare my calendar to my capacity rules and draft a focus plan."*

**On a trigger** — fires when an email arrives or someone @mentions you in Teams.

::: warning Nothing sends on its own
Cowork drafts and waits for your approval. Keep it that way today.
:::

<small>[Full guide →](/bricks/cowork-rerun-skill)</small>

---

## Show it off

60–90 seconds. Hit these:

- [ ] Whose twin — yours or Avery's
- [ ] Your soul file, about a page
- [ ] Your voice file, with real samples in it
- [ ] **One thing your calendar revealed that surprised you**
- [ ] The exec-vs-peer conflict, and what your twin decided
- [ ] Your scheduled prompt or trigger

::: tip The best demo isn't the most complex one
It's the one where someone reads a draft your twin wrote and says *"yeah, that sounds like you."*
:::

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Cowork ignores Twin Forge | Start a **new** session — skills only load at the start |
| Upload seemed to do nothing | Upload the `.md` file, not a zip |
| "I can't find the reference files" | You've got an old copy — re-download it |
| Avery's data can't be found | Attach the pack files to the session |
| Twin sounds like a stranger | Your voice file is descriptions, not real emails. Go back to step 5 |
| Twin gives wishy-washy answers | Your soul file has values, not rules. Go back to step 6 |

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-1) · [Where this comes from](/resources/research)
