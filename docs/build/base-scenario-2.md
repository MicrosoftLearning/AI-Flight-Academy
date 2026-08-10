---
title: The Greenlight — Cowork
---

# 🟢 The Greenlight

::: warning 🚧 Work in progress
Scenario 2 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::
**You'll build this in Cowork. No code, and no experience needed.**

![In a dim screening room, a woman in a mustard cardigan sits alone beside four empty, unlit critic stations. Headline: "Start with a conversation."](/img/scenario-2-base-hero.png)

## What you're solving

Copilot can write clear, accurate content. What it cannot know by itself is whether that content works for the people who need to use it.

A long, formal write-up might be exactly what a compliance team needs and completely impractical for a busy store manager. One general-purpose review can miss that difference. Today you build a way to review the same content from more than one audience's point of view.

## What you'll walk out with

A reusable council that reviews content for the audiences it is meant to serve.

| What you make | What it does |
| --- | --- |
| **Your council** | Names at least two audiences, what each needs, and what the content must do for them. |
| **A review** | Shows what each audience thinks, with a quote from the content and the reason behind it. |
| **A plan** | Turns any gaps into practical changes or a new format. |

The council lives in `THE-COUNCIL.md`. You can edit it, reuse it on new content, and add real audiences later.

## Before you start

Grab these now — you'll need them in the first few minutes.

<div class="lab-grid lab-grid-2">
	<a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/the-greenlight.zip" download>
		<span class="lab-card-emoji">🟢</span>
		<span class="lab-card-title">Greenlight</span>
		<span class="lab-card-desc">The Cowork skill that guides the review and creates the council file.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
	<a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/greenlight-data-pack.zip" download>
		<span class="lab-card-emoji">🗂️</span>
		<span class="lab-card-title">Content pack</span>
		<span class="lab-card-desc">Five articles, four audience profiles, and a style guide. Use it instead of real work data.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
</div>

::: tip Want every step spelled out?
This page gets you through the build. There are also **[full step-by-step guides](/bricks/)** covering Cowork skills, data sources, and scheduled runs.
:::

---

## 1 · Install Greenlight

1. Open Microsoft 365 Copilot and select the **Cowork** tab.
2. In the left menu, select **Customize**, then **Skills**.
3. Select the arrow next to **Add**, then **Upload skill**.
4. Drag in the whole `the-greenlight.zip` file you downloaded.

Start a **new** Cowork session after the upload. Cowork only looks for new skills when a session begins.

::: warning Two things that will trip you up
**Upload the whole `the-greenlight.zip`, not just `SKILL.md`.** The zip carries the reference files and `THE-COUNCIL.md` the skill needs; a lone `SKILL.md` cannot see them.

**Keep the content pack nearby.** You will attach its files to the Cowork session in the next step; Cowork cannot see them until you do.
:::

## 2 · Choose the content to review
📘 [Connect Cowork to a data source](/bricks/cowork-connect-source)

Use the provided content pack unless your team has a suitable piece of real content and an audience profile in mind.

Drag or upload the `data-pack` zip to a new Cowork session and then ask **Greenlight** to introduce itself.

## 3 · See the starting point

Ask Greenlight to show you the **solo critic's** review of the five articles. This is your **baseline**: one general-purpose reviewer looking at each article as if it has one typical reader.

| Piece | Starting review |
|---|---|
| Training unit (P1) | Ready to use |
| How-to (P2) | Needs work |
| Blog post (P3) | Needs work |
| **Executive summary (P4)** | **Needs work** |
| Quickstart (P5) | Ready to use |

Look at P4. It is a careful, formal summary. The solo critic sees solid writing and says it needs a few changes. Your council will show why it can work for one audience and fail another.

> **Do not edit the solo critic.** It is the “before” you compare your council against.

![The same woman gestures as four critics take their seats and their green verdict lamps light up. Headline: "Seat the council by talking."](/img/scenario-2-base-seating.png)

## 4 · Add two audiences

Ask Greenlight to help you add two audiences to `THE-COUNCIL.md`. For each one, write:

- the result that audience needs from the content
- one or two things the content must do to get them there

Start with **Retail** and **Compliance** from the content pack. Retail needs practical steps it can use during a busy day. Compliance needs enough detail to make a responsible decision. They are a useful pair because they need different things from the same content.

::: tip Use a real audience when it helps
Cowork can use Work IQ to help you draft a profile from the work information you already have access to.  Build a profile on yourself or an audience you serve. Treat that as a first draft and correct it with what you know about the audience. Say - "Cowork - build an audience card about me from WorkIQ."
:::

## 5 · Convene the council

Ask Greenlight to review P4 for both audiences. It should show a separate result for each one.

| Audience | What a useful result might show |
| --- | --- |
| Retail | The article is too formal or too long to help someone who needs immediate steps. |
| Compliance | The same detail may be useful because it explains the decision and its limits. |

For the supplied pack, you should see a meaningful difference between the two audiences. With your own content, agreement can be valid too — as long as the council explains why.

::: tip Give it somethign real
Attach a real document you're working on, point it to a Microsoft product announcement, video transcript, or training module.
:::

## 6 · Make the audiences specific

Read the items in `THE-COUNCIL.md`. Each one should protect a real audience need, not general writing quality.

| Too general | Specific to an audience |
| --- | --- |
| Is it clear? | Can a floor associate find the first action in two lines? |
| Is it accurate? | Does each important claim include the source a compliance reviewer needs? |

Ask yourself: **would this give the same result for every audience?** If so, remove it or make it more specific.

## 7 · Check the evidence

Every result needs three things:

- a **quote** from the content
- a **source** for the audience need, such as its profile or the style guide
- a **confidence** rating

If the information is missing, say so. Do not make the council guess.

::: tip A useful prompt
Ask Greenlight: “For each audience result, show the exact quote, the audience need behind it, and how confident you are.”
:::

## 8 · Close the loop

You have a review. Now turn it into something you can use. This is a loop, not a single step — keep going until every audience is served, then put the result to work.

The path looks like this. You don't have to follow it word for word; let Greenlight guide you:

1. **Plan.** For an audience the content does not serve, ask Greenlight what to make instead. The answer might be a shorter guide, a checklist, a video, or a different format altogether.
2. **Check the plan.** Ask the council to review that plan for the same audience, before anything is written.
3. **Make it.** Ask Cowork to draft the asset the plan describes.
4. **Review it again.** Bring the new draft back to the council. Keep going until the audience that rejected the original would accept its replacement.
5. **Put it to work.** Once everything is greenlit, ask Cowork to take the next real step — draft the emails to the stakeholders who need to know, or a Teams message to the one person waiting on it.

That last step is the point of the whole exercise: the review does not end in a verdict, it ends in the content and the messages that move the work forward.

When you want to go further, try the council on another article from the pack, or add another audience. The goal is not to make every audience disagree; it is to understand when the same content can serve several audiences and when it needs different treatment. If your two audiences always agree, return to step 6 and make their needs more specific.

## 9 · Make it run without you
📘 [Re-run a skill on new inputs](/bricks/cowork-rerun-skill)

Once you trust the council, ask Cowork to run it on a schedule so reviews happen without you. Point it at whatever your content actually arrives in — a folder of drafts, or email attachments.

The powerful version is a real trigger. Try something like:

> "On a schedule, run the Greenlight council on any new email attachment whose subject contains **[your keyword]**, and send me the review."

Now a draft that lands in your inbox gets reviewed for every audience before you have even opened it — and you decide what to do with the result.

**Done when:** a new file shows up through your trigger and you get the council's review back without asking.

---

![The full council delivers green verdicts with no computer in sight as the woman looks on, satisfied. Headline: "No code. A real council."](/img/scenario-2-base-council.png)

## Show it off

60–90 seconds. Show:

- [ ] The two audiences you added and what each needs
- [ ] One audience requirement you made more specific
- [ ] P4 reviewed from both points of view, with a quote for each
- [ ] One place the audiences agreed or disagreed, and why
- [ ] An asset you rebuilt for an audience and got greenlit
- [ ] The email or Teams message you turned the result into
- [ ] Your scheduled review, if you set one up

::: tip What to aim for in the demo
Show the moment the council changed your understanding of the content. That is more convincing than showing every feature.
:::

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Cowork ignores Greenlight | Start a **new** Cowork session — skills load at the start. |
| Upload seemed to do nothing | Upload the whole `the-greenlight.zip`, not just `SKILL.md`. |
| Cowork cannot see the articles | Attach the content-pack files to the session. |
| Both audiences give the same answer | Make their needs more specific, then review again. |
| A result has no evidence | Ask for the exact quote, source, and confidence. |

::: details 🎬 Nobody nails it first try
![Her too-vague description filled the four critic seats with generic robots while she facepalms. Headline: "Careful what you ask for."](/img/scenario-2-base-blooper.png)

Feed the council a vague description and you get a row of generic bots instead of real audiences — that's not failure, it's feedback. Tell it what makes each audience different and run it again.
:::

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-2)

## Guides for this track {#guides}

<!--@include: ../.vitepress/partials/guides-base.md-->
