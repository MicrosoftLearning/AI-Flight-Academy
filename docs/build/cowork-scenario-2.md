---
title: Dispatch - Cowork
---

# 🟢 Dispatch

::: warning 🚧 Work in progress
Scenario 2 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::
**You'll build this in Cowork. No code, and no experience needed.**

<div class="scene">

![In a dim ops room, a woman in a mustard cardigan stands beside four empty, unstaffed dispatch desks.](/img/scenario-2-dispatch-cowork-hero.png)

<p class="scene-cap">Start with a conversation.</p>

</div>

## What you're solving

Skilling requests come in all day - *"skill this audience on that topic by this date."* One person triaging the queue picks a team and sends it there. Clean, fast, and thin: it can't see that the **same request means different work to different teams**, or that one team's deliverable is another team's reuse.

Today you build a way to route a request through a *room* of teams - so the answer isn't one owner, it's a plan.

## What you'll walk out with

A reusable **room of teams** that routes any skilling request - and turns it into a decision you can act on.

| What you make | What it does |
| --- | --- |
| **Your room** | Seats three teams, what each owns, and what makes it want a request or pass. |
| **A dispatch** | Shows each team's position on the same request, grounded in its charter. |
| **A decision** | Owner, audience, and a plan of deliverables that builds once and reuses across teams. |

The room lives in `THE-ROOM.md`. You can edit it, reuse it on new requests, and seat real teams later.

## How this runs

Three steps. The first is quick; the rest is the build.

| | Step | You're done when |
| --- | --- | --- |
| **1** | **See why one triager isn't enough** | Dispatch is running on the requests and you've seen the single triager's one-owner take - your "before." |
| **2** | **Seat a room that splits** | Three teams return *different* positions on the same request - and split on the plan. |
| **3** | **Land the decision** | You've turned the positions into one routing decision - owner, audience, and a build-once/reuse plan - and named the next step. |

**Step 1 you do on your own. Step 2 you do as a table** - each person seats one team, then you combine them into one room. **Step 3** is where the rest of the time goes.

Every step gives you a line you can paste. **Change it - it's a starting point, not the answer.**

::: tip When you're stuck, ask Cowork
Cowork is the thing you're building with **and** the thing that helps you build it. Unsure what to type, or something misbehaves? Say so in the chat - or wave over a coach rather than stalling.
:::

## Before you start

Grab these now - you'll need them in the first few minutes.

<div class="lab-grid lab-grid-2">
	<a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch.zip" download>
		<span class="lab-card-emoji">🟢</span>
		<span class="lab-card-title">Dispatch</span>
		<span class="lab-card-desc">The Cowork skill that runs the room and creates the room file.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
	<a class="lab-card" href="/AI-Flight-Academy/downloads/dispatch-data-pack.zip" download>
		<span class="lab-card-emoji">🗂️</span>
		<span class="lab-card-title">Data pack</span>
		<span class="lab-card-desc">Sample requests, the Global Skilling team cards, and the routing policy. Use it instead of real work data.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
</div>

::: tip Want a step spelled out?
The **[Guides](/bricks/)** in the top nav cover the general skills used here - installing a skill, grounding on your work, and running things on a schedule. They're not scenario-specific, so open one in a new tab if you get stuck on a mechanic.
:::

---

## 1 · See why one triager isn't enough

**Done when:** Dispatch is running on the requests and you've seen the single triager's one-owner take - your "before."

Install the skill, load the data pack, and meet the triager you're about to out-think.

1. In Cowork, open **Customize** → **Skills** → the arrow next to **Add** → **Upload skill**, and drag in the whole `the-dispatch.zip`.
2. Start a **new** Cowork session (skills only load at the start), drag in the `dispatch-data` zip, and say:

```text
Introduce yourself, then show me the single triager's take on the sample requests.
```

The **single triager** is one person working the queue: one owner per request, no plan. It's your baseline - and it stays frozen so you can measure against it.

| Request | Single triager sends it to |
|---|---|
| Governance before GA (RQ-01) | Content & Insights |
| Partners misconfigure DLP (RQ-02) | "the training team" |
| All employees, agentic AI (RQ-03) | Content & Insights |
| Copilot Studio cert (RQ-05) | Credentials |
| Field agent-deploy lab (RQ-07) | "the labs team" |

Look at **RQ-01** - one owner, and it stops there. The triager can't see that the governance path should be built *once* by Content & Insights and reused live by Delivery and regionally by Field & Partner - or that partners are the real first audience. That gap is what your room fills.

::: warning Two things that trip people up
Upload the whole `the-dispatch.zip`, not just `SKILL.md` - the zip carries the references and `THE-ROOM.md` the skill needs. And **don't edit the single triager**; it's the fixed "before" you measure against.
:::

<div class="scene scene--flip">

![The woman gestures as team-dispatchers take their desks and light their status lamps.](/img/scenario-2-dispatch-cowork-seating.png)

<p class="scene-cap">Seat the room by talking.</p>

</div>

## 2 · Seat a room that splits

**Done when:** three teams return *different* positions on the same request - and split on the plan.

A **seat** is one team - what it owns, who it serves, and what makes it want a request or pass it on. The goal isn't to list teams; it's to seat ones that **disagree about the plan**.

As a table, each person seats one team - start with **Content & Insights**, **Delivery & Program Operations**, and **Field & Partner**, the sharpest trio - then combine them into one `THE-ROOM.md`. Ask Dispatch:

```text
Seat Content & Insights, Delivery & Program Operations, and Field & Partner from the pack, then dispatch RQ-01 (agent governance before GA).
```

You should get a separate, charter-backed position per team - and they should split: C&I wants to build an evergreen path once; DPO wants it live before the GA date; Field & Partner says the real audience is partners, who deploy governance in-tenant.

**Make each seat distinct.** A team that would route everything the same way as another is a duplicate - the room can't disagree. Give each a different instinct:

| Same as everyone | A distinct instinct |
| --- | --- |
| "We'd take this." | "Don't build a one-off - build the system." (Product) |
| "Send it to content." | "Who's the *real* audience? I think it's partners." (Field & Partner) |

Every position is grounded in the team's card - what it owns, who it serves. If a team wouldn't want a request, it says "not mine" instead of reaching for it.

::: tip Seat a real team with Work IQ
Ask Cowork to draft a team's charter from your own work - *"draft the Content & Insights charter from what you can see"* - then correct it. Treat it as a first draft, not the answer.
:::

<div class="table-check">
  <div class="table-check-icon">📨</div>
  <div class="table-check-body">
    <span class="table-check-label">Table check</span>
    <p>Bring proof, not contents: one request, three teams, three different positions - and the plan they split on.</p>
  </div>
</div>

## 3 · Land the decision

**Done when:** you've turned the positions into one routing decision - owner, audience, and a build-once/reuse plan - and named the next step.

The positions aren't the finish line - the decision is. Who *fields* it is often quick; the work is the plan. You don't have to follow this word for word; let Dispatch guide you:

1. **Owner** - pick the one team that fields and coordinates it (often the team most "in").
2. **Audience** - name who it's *really* for; a team may repoint it (Field & Partner: partners first).
3. **The plan** - the deliverables, each with a builder and who reuses it. **Build once, reuse across teams** - don't have two teams build the same thing.
4. **Disposition & next step** - proceed, reshape, split, defer, or decline-and-redirect; then one concrete next action with a team on it.

Then try a **rough idea** (an `IDEA-…`): it's missing its audience or outcome, so the honest move is to **sharpen it first** - not route it. That's the point: a good room refuses to guess.

If your three teams always land the same plan, go back and make their charters more distinct.

## Go further - make it run without you

Once you trust the room, ask Cowork to run it on new requests without you. Point it at wherever requests actually arrive - a folder, or email.

The powerful version is a real trigger:

> "On a schedule, run the Dispatch room on any new email whose subject contains **[your intake keyword]**, and send me the routing decision."

Now a request that lands in your inbox gets a room's plan - owner, audience, and reuse - before you've even opened it.

---

<div class="scene">

![The full room lands a plan with no computer in sight as the woman looks on, satisfied.](/img/scenario-2-dispatch-cowork-room.png)

<p class="scene-cap">No code. A real room.</p>

</div>

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Cowork ignores Dispatch | Start a **new** Cowork session - skills load at the start. |
| Upload seemed to do nothing | Upload the whole `the-dispatch.zip`, not just `SKILL.md`. |
| Cowork cannot see the requests | Attach the data-pack files to the session. |
| Every team gives the same position | Make their charters more distinct, then dispatch again. |
| It confidently routed a rough idea | Ask it to check the request is routable first - sharpen, don't guess. |

::: details 🎬 Nobody nails it first try
<div class="scene scene--flip">

![Her too-vague team descriptions filled the desks with identical generic clerks who all route to the same place; she facepalms.](/img/scenario-2-dispatch-cowork-blooper.png)

<p class="scene-cap">Careful what you ask for.</p>

</div>

Seat a room of look-alike teams and they all route the same way - that's not failure, it's feedback. Give each team a different instinct and run it again.
:::

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-2)
