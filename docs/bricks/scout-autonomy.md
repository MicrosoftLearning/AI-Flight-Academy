---
title: Make it run without you
---

<!-- markdownlint-disable MD013 MD025 -->

# Make it run without you

**Tool:** Microsoft Scout

<!-- #region guide -->
A thing you have to remember to run is a thing you'll stop running. This is how it starts itself — and how you keep it from doing anything you didn't approve.

## Steps

1. Get the manual version working properly first. Automating something unreliable just makes it unreliable on a schedule.
2. Decide what should start it:
   - **A schedule** — a fixed time, for anything you'd want waiting for you
   - **An event** — something arriving, for anything that should react
3. Describe it to Scout in plain language.
4. Review what it proposes — especially the permissions — before you arm it.
5. Watch the first run.

**You'll know it worked when...** it produces something useful without you asking, and it stops for approval before anything leaves.

## Scheduled

```text
Every weekday at 8am, read what's landed overnight and give me a short read
on what needs me today.
```

## Event-driven

```text
When something arrives that's addressed to me and asks for a decision,
prepare a draft response and hold it for my review.
```

::: warning Draft and approve, always
Anything that sends, posts, books, or commits should prepare the action and wait. Not because the agent is untrustworthy — because *you* are the one accountable for what goes out under your name.

Keep it that way for the whole session, and be able to point at it in your demo.
:::

## One-step start

For anything you run rather than schedule, make it a single command: install once, then one command boots it and opens it.

Ask Scout to write that, then test it the honest way — **close everything, open a fresh terminal, and run it.** If it needs a step you'd have to explain, it isn't one step yet.

## What "without you" should actually mean

Not "it decides for me." The useful version:

| It does | You do |
| --- | --- |
| Reads what arrived | Decide what matters |
| Drafts the likely response | Send, or don't |
| Flags what it can't judge | Judge it |
| Refuses anything outside its boundaries | Approve the exception |

It removes the cold start. It doesn't remove you.

## Apply it to your scenario

Find the moment your scenario repeats — every morning, before every meeting, whenever something specific arrives. Automate that one moment, keep approval on anything outbound, and leave the rest alone.
<!-- #endregion guide -->
