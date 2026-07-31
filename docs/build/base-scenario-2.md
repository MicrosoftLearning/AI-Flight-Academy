---
title: The Greenlight — Cowork
---

# 🟢 The Greenlight

::: warning 🚧 Work in progress
Scenario 2 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::
**You'll build this in Cowork. No code, and no experience needed.**

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

1. Unzip `the-greenlight.zip` and find `SKILL.md` inside the `the-greenlight` folder.
2. Open Microsoft 365 Copilot and select the **Cowork** tab.
3. In the left menu, select **Customize**, then **Skills**.
4. Select the arrow next to **Add**, then **Upload skill**.
5. Choose the `SKILL.md` file you downloaded.

Start a **new** Cowork session after the upload. Cowork only looks for new skills when a session begins.

::: warning Two things that will trip you up
**Upload `SKILL.md`, not the zip.** Cowork does not use zipped skill uploads.

**Keep the content pack nearby.** You will attach its files to the Cowork session in the next step; Cowork cannot see them until you do.
:::

### Step 2 — Choose the content to review
📘 [Connect Cowork to a data source](/bricks/cowork-connect-source)

Use the provided content pack unless your team has a suitable piece of real content and an audience profile in mind.

Add the `data-pack` folder to a new Cowork session and then ask Greenlight to help you review the **executive summary (P4)**.

## 3 · See the starting point

Ask Greenlight to show you the solo critic's review of the five articles. This is your **baseline**: one general-purpose reviewer looking at each article as if it has one typical reader.

| Piece | Starting review |
|---|---|
| Training unit (P1) | Ready to use |
| How-to (P2) | Needs work |
| Blog post (P3) | Needs work |
| **Executive summary (P4)** | **Needs work** |
| Quickstart (P5) | Ready to use |

Look at P4. It is a careful, formal summary. The solo critic sees solid writing and says it needs a few changes. Your council will show why it can work for one audience and fail another.

> **Do not edit the solo critic.** It is the “before” you compare your council against.

## 4 · Add two audiences

Ask Greenlight to help you add two audiences to `THE-COUNCIL.md`. For each one, write:

- the result that audience needs from the content
- one or two things the content must do to get them there

Start with **Retail** and **Compliance** from the content pack. Retail needs practical steps it can use during a busy day. Compliance needs enough detail to make a responsible decision. They are a useful pair because they need different things from the same content.

::: tip Use a real audience when it helps
Cowork can use Work IQ to help you draft a profile from the work information you already have access to. Treat that as a first draft and correct it with what you know about the audience.
:::

## 5 · Review the executive summary

Ask Greenlight to review P4 for both audiences. It should show a separate result for each one.

| Audience | What a useful result might show |
| --- | --- |
| Retail | The article is too formal or too long to help someone who needs immediate steps. |
| Compliance | The same detail may be useful because it explains the decision and its limits. |

For the supplied pack, you should see a meaningful difference between the two audiences. With your own content, agreement can be valid too — as long as the council explains why.

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

## 8 · Compare, plan, and test again

Put the two audience reviews side by side. Find one passage that works for one audience and not the other. Discuss why, using the quote and the audience profiles rather than personal preference.

For an audience the original does not serve, ask Greenlight what to make instead. The answer might be a shorter guide, a checklist, a video, or a different format altogether. Then ask it to review that plan for the same audience. The plan is ready only when the audience it is meant to serve would accept it.

Try the council on another article from the pack, or add another audience. The goal is not to make every audience disagree; it is to understand when the same content can serve several audiences and when it needs different treatment. If your two audiences always agree, return to step 6 and make their needs more specific.

## 9 · Make it run without you
📘 [Re-run a skill on new inputs](/bricks/cowork-rerun-skill)

Once you trust the council, ask Cowork to run it on a schedule against a folder of draft content and send you the results.

::: warning Nothing sends on its own
Route results to a chat or channel you created for this exercise. Read the council's suggestions before sharing them with a real author.
:::

**Done when:** you receive a scheduled review without having to ask for it.

---

## Show it off

60–90 seconds. Show:

- [ ] The two audiences you added and what each needs
- [ ] One audience requirement you made more specific
- [ ] P4 reviewed from both points of view, with a quote for each
- [ ] One place the audiences agreed or disagreed, and why
- [ ] Your plan for content that did not serve an audience
- [ ] Your scheduled review, if you set one up

::: tip What to aim for in the demo
Show the moment the council changed your understanding of the content. That is more convincing than showing every feature.
:::

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Cowork ignores Greenlight | Start a **new** Cowork session — skills load at the start. |
| Upload seemed to do nothing | Upload `SKILL.md`, not the zip. |
| Cowork cannot see the articles | Attach the content-pack files to the session. |
| Both audiences give the same answer | Make their needs more specific, then review again. |
| A result has no evidence | Ask for the exact quote, source, and confidence. |

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-2)
