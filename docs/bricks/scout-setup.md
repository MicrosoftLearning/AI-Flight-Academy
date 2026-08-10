---
title: Set up Microsoft Scout
---

<!-- markdownlint-disable MD013 MD025 -->

# Set up Microsoft Scout

**Tool:** Microsoft Scout

<!-- #region guide -->
Scout is an agentic assistant that can read your work through Work IQ, run multi-step tasks, use skills, and build and run things on your machine. For a hack, that last part matters most: you describe what you want and Scout does the building.

## Steps

1. Open **Microsoft Scout**.
2. Confirm you're signed in — Scout works from what your account can already see, so nothing else needs connecting.
3. Start a **new session**. Skills are discovered when a session begins, so anything you install mid-session won't be visible until you start a fresh one.
4. Check the tools you'll need are working before you rely on them:
   - **GitHub Copilot CLI** — run `copilot --version`. If it's missing: `npm install -g @github/copilot`, then sign in.
   - **Node** — run `node --version`. Anything current is fine.
5. Ask Scout something small that touches your real work, to confirm grounding is live:

   ```text
   Summarize what I have on this week and what looks most time-sensitive.
   ```

**You'll know it worked when...** Scout answers using your actual calendar and mail rather than asking you to paste something in.

## What Scout can reach

Through **Work IQ**, with no setup and no connector: mail and sent mail, calendar, Teams chats and channels, OneDrive and SharePoint files, and people/org context.

It only ever sees what you can already see. Nothing is shared outward, and nothing leaves your tenant.

::: warning Keep private data private
If you're working from your own mail and calendar, keep it on your own screen. Don't paste real work content into a shared doc, a demo, or a screenshot.
:::

## Installing a skill

Skills give Scout a repeatable method. To add one:

1. Go to **Extensions** and choose **Import**.
2. Drag in the skill **folder** — the one containing `SKILL.md`, not the file on its own.
3. Start a **new session** so Scout picks it up.

**You'll know it worked when...** the skill shows up in your extensions list and Scout uses it when you name it in a request.

## Letting Scout build

The thing that separates Scout from a chat window: it can scaffold a working app, install what it needs, run it, and fix it when it breaks.

Two rules make this go well:

1. **Start small.** Get one thing working end to end before you ask for a second thing. A single large prompt tends to produce something that half-works in five places.
2. **Steer, don't restart.** When it overshoots, tell it what to change. Re-prompting from scratch throws away the parts that were right.

::: tip Steering is the skill
The build isn't "write the perfect prompt." It's the loop: describe, look at what came back, correct one thing, repeat. That's the transferable part.
:::

## Apply it to your scenario

Name the artifact you want at the end, then work backwards to the smallest version of it that could exist. Ask Scout for that first, confirm it runs, and add one capability at a time.
<!-- #endregion guide -->
