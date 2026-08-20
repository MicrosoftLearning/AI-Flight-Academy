---
title: The Greenlight – Scout
---

# 🔵 The Greenlight

::: warning 🚧 Work in progress
Scenario 2 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::
**You'll build this in Microsoft Scout, with GitHub Copilot CLI running the council behind a live dashboard. Scout does the building – you won't hand-write the app.**

You run the council, then turn it into something you can watch.

![A relaxed man slides a one-page brief toward a glowing blue agent console as the booth's blue lamps wake. Headline: "Hand it to Scout."](/img/scenario-2-builder-hero.png)

## What you're solving

One review is not enough when different audiences need different things from the same **asset** – a doc, a deck, an email, a policy, a post, a plan. A formal explainer might help a compliance officer make a careful decision and still be unusable for a store manager who needs one practical action during a busy shift.

A single reviewer pictures one average reader and misses that gap. Here you seat a council of audiences, review the same asset from each point of view, and put the whole room on a live board so the disagreement is something you can see.

## What you'll walk out with

| What you make | What it does |
| --- | --- |
| **Your council** | Two or more audiences and what each one needs, in `THE-COUNCIL.md`. |
| **A review** | Shows what each audience thinks, with a quote, a source, and a confidence. |
| **A live dashboard** | Each seat lights up with its verdict as you feed the board an asset. |
| **A one-step run** | A simple way to start the board – a command or a scheduled task. |

The solo critic stays unchanged – the one-verdict "before" you compare against.

## How this runs

Four steps. The first two are quick; the board is the build.

| | Step | You're done when |
| --- | --- | --- |
| **1** | **Import & load** | Scout has the Greenlight skill and the data pack loaded. |
| **2** | **Seat a council that disagrees** | Two seats return *different*, quote-backed verdicts on the same asset – proven in conversation, nothing built yet. |
| **3** | **Put the room on a board** | You drop an asset on a live dashboard and the seats light up with their verdicts. |
| **4** | **Make it one-step to run** | You can start the board with one command or a schedule. |

**Step 2 you do as a table** – each person seats one audience, then you combine them into one council. Steps 3–4 are the build.

Every step gives you a line you can paste. **Change it – it's a starting point, not the answer.**

## Before you start

Download both and keep them side by side.

<div class="lab-grid lab-grid-2">
	<a class="lab-card" href="/AI-Flight-Academy/downloads/the-greenlight.zip" download>
		<span class="lab-card-emoji">🔵</span>
		<span class="lab-card-title">Greenlight skill</span>
		<span class="lab-card-desc">The council method and the unchanged solo-critic baseline.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
	<a class="lab-card" href="/AI-Flight-Academy/downloads/greenlight-data-pack.zip" download>
		<span class="lab-card-emoji">🗂️</span>
		<span class="lab-card-title">Content pack</span>
		<span class="lab-card-desc">Five articles, four audience profiles, and a style guide. Use it instead of real work data.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
</div>

Open Microsoft Scout and add the Greenlight skill. The dashboard step later also uses **GitHub Copilot CLI** and **Node** – Scout installs what the app needs, but the CLI has to be signed in and working.

---

## 1 · Import & load

**Done when:** Scout has the Greenlight skill and the data pack loaded.

1. Extract `the-greenlight.zip` and, in Scout, go to **Extensions → Import** and drag the extracted skill **folder** in.

   ![Screenshot of the Import Skill dialog window in Microsoft Scout.](./media/scout-import-skill-folder.png)
1. Start a new chat in Scout and upload **data-pack.zip**.

## 2 · Seat a council that disagrees

**Done when:** two seats return *different*, quote-backed verdicts on the same asset – proven in conversation, with nothing built yet.

A **seat** is one audience – who they are, the outcome they need from the asset, and the specific bars it has to clear for *them*. The goal isn't to *list* audiences – it's to seat ones that **disagree**: a bar any reader would score the same is just "good writing," and the solo critic already covers that.

As a table, each person seats one audience – start with **Retail** and **Compliance**, the sharpest pair – then combine them into one `THE-COUNCIL.md`. Ask Scout to seat them, then convene on the **executive summary (P4)**, the piece chosen to prove the point:

> *"Use Greenlight to seat the Retail and Compliance audiences from the data pack, then convene the council on the executive summary (P4)."*

**Convening** is the heart of it: every seat judges the same asset against *its own* criteria at once and returns a verdict – Ship, Revise, or Reject – backed by a **quote**, a **source**, and a **confidence**. A seat that isn't sure says so. P4 is exactly what a Compliance reader wants and unusable for a Retail floor lead who needs one action – so the room splits where a single reviewer could only average it into a mushy "needs work":

| Piece | Solo critic | Council |
|---|---|---|
| **Executive summary (P4)** | Needs work (one verdict) | **Reject for Retail · Ship for Compliance** |

That split – the same document, opposite verdicts, each evidence-backed – *is* the result of this step. The thinking is done here, with nothing installed; everything after just makes it visible and repeatable.

::: tip Seat a real audience with Work IQ
Scout is grounded in your Microsoft 365 work through **Work IQ** – it only ever sees what you already can. Ask it to draft an audience card from those real signals – *"Scout, build an audience card for [a role you write for] from Work IQ that mimics the audiences in THE-COUNCIL.md"* – then correct it with people who know that audience. Treat it as a first draft, not the answer.
:::

![Robotic arms assemble the council booth in blue light while the man reclines with his coffee. Headline: "Scout builds the booth."](/img/scenario-2-builder-build.png)

## 3 · Put the room on a board

Now make the disagreement visible. Ask Scout to build a local web dashboard for the council, using **GitHub Copilot CLI as the backend** that runs the Greenlight skill.

Describe what you want:

- a card or avatar for each seat that lights up with its verdict – green for ship, amber for revise, red for reject
- the quote and confidence behind each seat's call, on its card
- a place to drop in a document or paste a link for the council to review
- the conflicts and who's served, at a glance
- a creative theme for the council or a custom name

Scout scaffolds the app and wires it to the Copilot CLI backend. When you feed the board a piece, the CLI runs the council and the cards update.

::: details Stuck on the prompt? Start with this
Paste this into Scout, then adjust from there:

> Build me a local web dashboard for the Greenlight council. Use **GitHub Copilot CLI as the backend** to run the Greenlight skill: a small **Node** web server that shells out to `copilot`, with a plain HTML/CSS/JS front-end – no build step, minimal dependencies, so it starts with one command. Show a card for each seat in `THE-COUNCIL.md` that lights up with its verdict (green = ship, amber = revise, red = reject) and shows that seat's quote and confidence. Add a place to drop in a document or paste a link, and a summary of the conflicts and who's served. Start simple – I'll ask for more.

The real trick is to **start small and layer on**: get the cards lighting up on one piece first, then ask for one addition at a time (a theme, a coverage view, animations) instead of everything in a single prompt.
:::

::: warning If the app won't start
Setups vary – Node versions, dependencies, CLI sign-in. If the dashboard won't run on your machine, keep going in the Scout conversation; the council still works there. Get the board up if you can, but don't let it block the review.
:::

**Done when:** you feed the dashboard a piece and watch the seats light up with their verdicts.

## 4 · Make it one-step to run

Turn the dashboard into something you start in one step, so a teammate can open the board without wiring it up again. Ask Scout for either:

- a single **start command** – install once, then one command boots the server and opens the browser, or
- a **scheduled task** that launches it so the board is always there.

::: tip Unsure how? Ask Scout!
Ask Scout what the right option is for your situation. One solution doesn't fit everyone's needs, much like the different audiences in this exercise. Ironic, don't you think?
:::

**Done when:** you (or a teammate) can start the board in one step and drop in a new asset.

## Go further – the bonus

Once the board runs, the bonus is adding features to it. Keep each one small and let Scout build it:

- drag a document or paste a link straight onto the board to convene without the conversation
- a coverage view – every asset by every audience, at a glance
- a history, so you can watch a piece improve after a rebuild
- a button that sends the greenlit plan to a person
- animations for when the council is deliberating or different verdicts

---

![The man waves and strolls out as the blue council booth and its dashboard run themselves. Headline: "Always-on. Hands-off."](/img/scenario-2-builder-alwayson.png)

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Scout ignores the skill | Start a new session – skills load at the start. |
| Both seats give the same verdict | Give them different goals and make their needs specific. |
| The dashboard won't start | Check that GitHub Copilot CLI is signed in and Node is available; meanwhile, convene in the Scout conversation. |
| The board shows nothing back | Confirm the skill is imported and the CLI can run it on its own first. |
| The council can't see the asset | Give Scout the content pack, and point the board at the same files. |

::: details 🎬 Nobody nails it first try
![He returns to find dozens of identical blue booths receding into the distance with printouts everywhere. Headline: "Maybe too hands-off."](/img/scenario-2-builder-blooper.png)

Let Scout off the leash and it might build you forty booths. When it overshoots, rein it in and re-run – steering the agent *is* the build.
:::

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-2)

