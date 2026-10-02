---
title: Dispatch - Scout
---

# Dispatch

First, you run the room in a chat. Then, you turn it into a live board that you can watch.

<div class="scene">

![A relaxed man slides a one-page skilling request toward a glowing blue agent console as the booth's blue lamps wake.](/img/scenario-2-dispatch-scout-hero.png)

<p class="scene-cap">Hand it to Scout.</p>

</div>

## Objectives

Skilling requests arrive all day. Usually, one person (the *triager*) reads each request and sends it to one team. But the same request can mean different work for different teams. For example, a request for agent governance training before a product launch could become a self-paced learning path, a live workshop, and a partner rollout. The best plan is to build it once and let every team reuse it.

In this activity, you build a **room of teams** that looks at each request together. Then you put the room on a live board, so you can see the plan. You work on your own, in four steps:

| | Step | You're done when |
| --- | --- | --- |
| **1** | **Import and load** | Scout has the Dispatch skill and the data pack loaded. |
| **2** | **Seat three teams, each with its own view** | Each of the three teams gives its own position on the same request, with a reason from its card, in the chat. Nothing is built yet. |
| **3** | **Put the room on a board** | You drop a request onto a live dashboard, and the teams light up with their positions and the reasons behind them. |
| **4** | **Make it start in one step** | You (or a teammate) can start the board with one command or on a schedule. |

Steps 3 and 4 are the main build. The single triager never changes, so you can compare your room against it. Most steps include a prompt you can paste. **Change it as you like. It's a starting point, not the answer.**

::: details Glossary

- **Triager:** the person who reads a request and decides which team gets it.
- **Route:** to send a request to the team (or teams) that will do the work.
- **Team card:** a short description of a team. It says what the team owns, who it serves, and what kind of work it wants. It's also called a *charter*.
- **Room:** a group of teams that looks at the same request together.
- **Seat:** one team's place in the room. To *seat* a team means to add it to the room.
- **Dispatch:** to send one request to every team in the room at the same time.
- **Position:** a team's answer to a request, based on its team card.
- **Rough idea:** a request that's missing important details. It needs to be *sharpened* (given more detail) before anyone routes it.

For more definitions, see the [Glossary](/glossary).

:::

## Before you start

Download both files and keep them in the same folder.

<div class="lab-grid lab-grid-2">
	<a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch.zip" download>
		<span class="lab-card-emoji">🔵</span>
		<span class="lab-card-title">Dispatch skill</span>
		<span class="lab-card-desc">How the room routes a request, plus the single triager's decisions. This is the "before" that you compare against, and it never changes.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
	<a class="lab-card" href="/AI-Flight-Academy/downloads/dispatch-data-pack.zip" download>
		<span class="lab-card-emoji">🗂️</span>
		<span class="lab-card-title">Data pack</span>
		<span class="lab-card-desc">Sample requests, the Global Skilling team cards, and the routing rules. Use these instead of real work data.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
</div>

Open Microsoft Scout. You'll add the Dispatch skill in Step 1. The dashboard in Step 3 also uses **GitHub Copilot CLI** and **Node**. Scout installs what the app needs, but you must make sure that the Copilot CLI is signed in and working.

---

## 1 · Import and load

**Done when:** Scout has the Dispatch skill and the data pack loaded.

1. Download `the-dispatch.zip` and unzip it. In Scout, go to **Extensions → Import**, and drag in the `the-dispatch` folder - the one with `SKILL.md` inside.

   ::: warning Unzip the-dispatch.zip first
   Unlike Cowork, Scout needs the unzipped Dispatch skill folder, not the zip.
   :::

   ![Screenshot of the Import Skill dialog window in Microsoft Scout.](./media/scout-import-skill-folder.png)

1. Start a **new chat** in Scout, and drag/drop or upload **dispatch-data-pack.zip** to the chat session. It is important to start a **new chat** in Scout for the skill files to load.

## 2 · Seat three teams, each with its own view

**Done when:** each of the three teams gives its own position on the same request, with a reason from that team's card. You do this in the chat, and you don't build anything yet.

Remember, a **seat** is one team in the room. Each seat says what the team owns, who it serves, and what makes the team want a request or turn it down. Your goal isn't only to *list* teams. Your goal is for each team to **reason from its own card**. When teams differ, the difference should come from their cards, not from being told to disagree. If a team would route every request the same way as another team, for the same reasons, it's a copy.

Start with these three teams, because their cards are the most different: **Content & Insights**, **Delivery & Program Operations**, and **Field & Partner**. Ask Scout to seat them in `THE-ROOM.md`, and then dispatch **Agent governance training before launch**. This request shows the difference clearly:

> *"Use Dispatch to seat Content & Insights, Delivery & Program Operations, and Field & Partner from the data pack, then dispatch the agent governance request."*

**Dispatching** is the most important part. Every team gives a position on the same request at the same time, based on its team card. Then the room makes one decision. The agent governance request is a good example. The room *agrees on the owner* (Content & Insights), and each team adds its own part of the plan. The plan is to build the learning path once, reuse it in live sessions and in the regions, and change the audience so that partners come first.

| Request | Single triager | The room |
|---|---|---|
| **Agent governance training before launch** | Send it to Content & Insights | **Content & Insights builds the path once · Delivery & Program Operations and Field & Partner reuse it · partners are the first audience** |

That result is the goal of this step: one request, one owner, three kinds of reuse, and every position based on a team card. You did the hard thinking in the chat, without installing anything. The next steps make the result visible and easy to repeat.

::: tip Seat a real team with Work IQ
Scout uses **Work IQ** to see your Microsoft 365 work. It only sees what you can already see. Ask Scout to draft a team card from that work. For example: *"Scout, draft a team card for [a team you work with] from Work IQ that mimics the cards in THE-ROOM.md."* Then check the card with people who know that team, and fix anything that's wrong. Treat the result as a first draft, not the final answer.
:::

<div class="scene scene--flip">

![Robotic arms assemble the dispatch board in blue light while the man reclines with his coffee.](/img/scenario-2-dispatch-scout-build.png)

<p class="scene-cap">Scout builds the board.</p>

</div>

## 3 · Put the room on a board

Now make the plan visible. Ask Scout to build a web dashboard that runs on your own computer. The dashboard uses **GitHub Copilot CLI as the backend** to run the Dispatch skill.

Tell Scout what you want:

- a card for each team that shows its position (in, support, or out) when you dispatch a request
- on each team's card, its one-line reason, and the part of its team card that the reason comes from
- on each team's card, the deliverable that the team suggests and the teams that reuse it
- a place to drop in a request or paste a rough idea
- the final routing decision (owner, audience, and the build-once, reuse-everywhere plan), easy to read at a glance
- a fun theme or a custom name for the room

Scout builds the app and connects it to the Copilot CLI. When you give the board a request, the CLI runs the room, and the cards update.

::: details Stuck on the prompt? Start with this one
Paste this prompt into Scout, and then change it as you need:

> Build me a local web dashboard for the Dispatch room. Use **GitHub Copilot CLI as the backend** to run the Dispatch skill: a small **Node** web server that shells out to `copilot`, with a plain HTML/CSS/JS front-end - no build step, minimal dependencies, so it starts with one command. Show a card for each team in `THE-ROOM.md` with its position (in / support / out), its one-line reason and the part of its team card that the reason comes from, its proposed deliverable, and any reuse. Add a place to drop a request or paste a rough idea, and a panel for the final routing decision - owner, audience, and the plan of deliverables with who builds and who reuses. Start simple - I'll ask for more.

The trick is to **start small and add one thing at a time**. First, get the team cards to show positions for one request. Then ask for one new feature at a time, like the decision panel, a reuse map, or a theme. Don't ask for everything in one prompt.
:::

::: warning If the app won't start
Every computer is set up differently. Node versions, missing packages, and CLI sign-in can all cause problems. If the dashboard won't run on your computer, continue in the Scout chat. The room still works there. Try to get the board running, but don't let it stop you from dispatching requests.
:::

**Done when:** you give the dashboard a request, and you see the teams light up with their positions and the reasons behind them.

## 4 · Make it start in one step

Make the dashboard easy to start, so a teammate can open the board without setting everything up again. Ask Scout for one of these options:

- a single **start command**: you install once, and then one command starts the server and opens your browser
- a **scheduled task** that starts the board for you, so it's always running

::: tip Not sure which one? Ask Scout!
Ask Scout which option is right for your situation. No single option is right for everyone, just like the teams in this exercise. Ironic, don't you think?
:::

**Done when:** you (or a teammate) can start the board in one step and drop in a new request.

## Go further - the bonus

When the board is running, you can add more features. Keep each feature small, and let Scout build it:

- an **intake gate** badge that marks a rough idea as "sharpen first" before the room routes it
- a **reuse map** that shows how one deliverable is built once and reused by other teams
- a history, so you can see how a request changes as it's sharpened and dispatched again
- a button that creates a work item for the decision's owner
- animations that play while the room is thinking

---

<div class="scene">

![The man waves and strolls out as the blue dispatch board runs itself.](/img/scenario-2-dispatch-scout-alwayson.png)

<p class="scene-cap">Always-on. Hands-off.</p>

</div>

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Scout ignores the skill | Start a new session. Skills load only when a session starts. |
| Every team gives the same position | Check each team's reason. If each reason comes from that team's card, agreement is a fine answer. If the reasons are vague or all the same, make the team cards more specific. |
| The dashboard won't start | Check that GitHub Copilot CLI is signed in and that Node is installed. While you fix it, keep dispatching in the Scout chat. |
| The board doesn't show anything | Check that the skill is imported. Then check that the CLI can run the skill on its own. |
| The room can't see the request | Give Scout the data pack, and point the board to the same files. |

::: details 🎬 Nobody gets it right the first time
<div class="scene scene--flip">

![He returns to find dozens of identical blue dispatch booths receding into the distance.](/img/scenario-2-dispatch-scout-blooper.png)

<p class="scene-cap">Maybe too hands-off.</p>

</div>

If you give Scout too much freedom, it might build you forty booths. When it does too much, steer it back and run it again. Steering the agent *is* the build.
:::

---

[← Back to start](/)
