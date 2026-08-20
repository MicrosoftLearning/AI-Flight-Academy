---
title: The Greenlight – Cowork
---

# 🟢 The Greenlight

::: warning 🚧 Work in progress
Scenario 2 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::
**You'll build this in Cowork. No code, and no experience needed.**

![In a dim screening room, a woman in a mustard cardigan sits alone beside four empty, unlit critic stations. Headline: "Start with a conversation."](/img/scenario-2-base-hero.png)

## What you're solving

Copilot can write a clean, accurate **asset** — a doc, a deck, an email, a policy, a post, a plan. What it cannot know by itself is whether that asset actually works for the people who have to use it.

A long, formal write-up might be exactly what a compliance team needs and completely impractical for a busy store manager. One general-purpose review misses that difference. Today you build a way to judge the same asset from more than one audience's point of view.

## What you'll walk out with

A reusable **council of audiences** that reviews any asset for the people it is meant to serve — and tells you what to fix, for whom.

| What you make | What it does |
| --- | --- |
| **Your council** | Names at least two audiences, what each needs, and what the asset must do for them. |
| **A review** | Shows what each audience thinks, with a quote from the asset and the reason behind it. |
| **A plan** | Turns any gaps into practical changes or a new format. |

The council lives in `THE-COUNCIL.md`. You can edit it, reuse it on new assets, and add real audiences later.

## How this runs

Three steps. The first is quick; the rest is the build.

| | Step | You're done when |
| --- | --- | --- |
| **1** | **See why one review isn't enough** | Greenlight is running on your assets and you've seen the solo critic's single flat verdict — your "before." |
| **2** | **Seat a council that disagrees** | Two audiences return *different*, quote-backed verdicts on the same asset. |
| **3** | **Close the loop** | An audience that rejected the asset would accept your rebuilt version — and you've turned the result into the next real step. |

**Step 1 you do on your own. Step 2 you do as a table** — each person seats one audience, then you combine them into one council. **Step 3** is where the rest of the time goes.

Every step gives you a line you can paste. **Change it — it's a starting point, not the answer.**

::: tip When you're stuck, ask Cowork
Cowork is the thing you're building with **and** the thing that helps you build it. Unsure what to type, or something misbehaves? Say so in the chat — or wave over a coach rather than stalling.
:::

## Before you start

Grab these now – you'll need them in the first few minutes.

<div class="lab-grid lab-grid-2">
	<a class="lab-card" href="/AI-Flight-Academy/downloads/the-greenlight.zip" download>
		<span class="lab-card-emoji">🟢</span>
		<span class="lab-card-title">Greenlight</span>
		<span class="lab-card-desc">The Cowork skill that guides the review and creates the council file.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
	<a class="lab-card" href="/AI-Flight-Academy/downloads/greenlight-data-pack.zip" download>
		<span class="lab-card-emoji">🗂️</span>
		<span class="lab-card-title">Content pack</span>
		<span class="lab-card-desc">Five articles, four audience profiles, and a style guide. Use it instead of real work data.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
</div>

::: tip Want a step spelled out?
The **[Guides](/bricks/)** in the top nav cover the general skills used here – setting up, connecting to your work, and running things on a schedule. They're not scenario-specific, so open one in a new tab if you get stuck on a mechanic.
:::

---

## 1 · See why one review isn't enough

**Done when:** Greenlight is running on your assets and you've seen the solo critic's single flat verdict — your "before."

Install the skill, load the data pack, and meet the reviewer you're about to replace.

1. In Cowork, open **Customize** → **Skills** → the arrow next to **Add** → **Upload skill**, and drag in the whole `the-greenlight.zip`.
2. Start a **new** Cowork session (skills only load at the start), drag in the `data-pack` zip, and say:

```text
Introduce yourself, then show me the solo critic's review of the data pack.
```

The **solo critic** is one general-purpose reviewer that judges every asset as if it has a single typical reader. It's your baseline — and it stays frozen so you can measure against it.

| Asset | Solo critic |
|---|---|
| Training unit (P1) | Ready to use |
| How-to (P2) | Needs work |
| Blog post (P3) | Needs work |
| **Executive summary (P4)** | **Needs work** |
| Quickstart (P5) | Ready to use |

Look at **P4** — a careful, formal summary. The solo critic sees clean writing and says "needs work." It can't tell you *who* it's for. That gap is what your council fills.

::: warning Two things that trip people up
Upload the whole `the-greenlight.zip`, not just `SKILL.md` — the zip carries the references and `THE-COUNCIL.md` the skill needs. And **don't edit the solo critic**; it's the fixed "before" you measure against.
:::

![The same woman gestures as four critics take their seats and their green verdict lamps light up. Headline: "Seat the council by talking."](/img/scenario-2-base-seating.png)

## 2 · Seat a council that disagrees

**Done when:** two audiences return *different* verdicts on the same asset.

A **seat** is one audience — who they are, the outcome they need, and the specific bars the asset has to clear *for them*. The goal isn't to list audiences; it's to seat ones that **disagree**.

As a table, each person seats one audience — start with **Retail** and **Compliance**, the sharpest pair — then combine them into one `THE-COUNCIL.md`. Ask Greenlight:

```text
Seat the Retail and Compliance audiences from the pack, then convene the council on the executive summary (P4).
```

You should get a separate, evidence-backed verdict per seat — and they should split: the detail and sources Compliance wants are exactly what buries a Retail floor lead who needs one action.

**Make each seat bite.** A criterion any reader would score the same is just "good writing" — the solo critic already covers that. Drop it or sharpen it:

| Too general | Specific to an audience |
| --- | --- |
| Is it clear? | Can a floor associate find the first action in two lines? |
| Is it accurate? | Does each claim carry the source a compliance reviewer needs? |

Every verdict needs a **quote**, a **source**, and a **confidence**. If a seat isn't sure, it says so instead of guessing.

::: tip Seat a real audience with Work IQ
Ask Cowork to draft an audience card from your own work — *"build an audience card about me from Work IQ"* — then correct it. Treat it as a first draft, not the answer.
:::

<div class="table-check">
  <div class="table-check-icon">👥</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Bring proof, not contents: one asset, two audiences, opposite verdicts — and the quote behind each call.</p>
  </div>
</div>

## 3 · Close the loop

**Done when:** an audience that rejected the asset would accept your rebuilt version — and you've turned the result into the next real step.

A verdict isn't the finish line. For an audience the asset fails, work the loop until it passes — then put it to work. You don't have to follow this word for word; let Greenlight guide you:

1. **Plan** — ask Greenlight what to make instead (a shorter guide, a checklist, a different format).
2. **Check the plan** — have the council review the plan *before* anything is written.
3. **Make it** — ask Cowork to draft it.
4. **Review again** — bring it back until the audience that rejected the original would accept the replacement.
5. **Put it to work** — once greenlit, have Cowork take the next real step: the email to the stakeholders who need to know, or the Teams message to the one person waiting on it.

That last step is the point: the review doesn't end in a verdict, it ends with an asset and a plan that moves the work forward. If your two audiences always agree, go back and make their needs more specific.

## Go further — make it run without you

Once you trust the council, ask Cowork to run it on a schedule so reviews happen without you. Point it at wherever your assets actually arrive — a folder of drafts, or email attachments.

The powerful version is a real trigger:

> "On a schedule, run the Greenlight council on any new email attachment whose subject contains **[your keyword]**, and send me the review."

Now an asset that lands in your inbox gets reviewed for every audience before you have even opened it — and you decide what to do with the result.

---

![The full council delivers green verdicts with no computer in sight as the woman looks on, satisfied. Headline: "No code. A real council."](/img/scenario-2-base-council.png)

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Cowork ignores Greenlight | Start a **new** Cowork session – skills load at the start. |
| Upload seemed to do nothing | Upload the whole `the-greenlight.zip`, not just `SKILL.md`. |
| Cowork cannot see the assets | Attach the data-pack files to the session. |
| Both audiences give the same answer | Make their needs more specific, then review again. |
| A result has no evidence | Ask for the exact quote, source, and confidence. |

::: details 🎬 Nobody nails it first try
![Her too-vague description filled the four critic seats with generic robots while she facepalms. Headline: "Careful what you ask for."](/img/scenario-2-base-blooper.png)

Feed the council a vague description and you get a row of generic bots instead of real audiences – that's not failure, it's feedback. Tell it what makes each audience different and run it again.
:::

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-2)

