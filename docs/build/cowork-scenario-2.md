---
title: Dispatch - Cowork
---

# Dispatch

<div class="scene">

![In a dim ops room, a woman in a mustard cardigan stands beside four empty, unstaffed dispatch desks.](/img/scenario-2-dispatch-cowork-hero.png)

<p class="scene-cap">Start with a conversation.</p>

</div>

## Objectives

Skilling requests arrive all day. Usually, one person (the *triager*) reads each request and sends it to one team. That's fast, but it misses things. The same request can mean different work for different teams, and one team's deliverable might be something that another team can reuse.

In this activity, you build a **room of teams** that looks at each request together. Instead of one owner, you get a plan. You work on your own, in three steps:

| | Step | You're done when |
| --- | --- | --- |
| **1** | **See why one triager isn't enough** | Dispatch is running, and you've seen the single triager pick only one owner for each request. This is your "before." |
| **2** | **Seat three teams, each with its own view** | Each of the three teams gives its own position on the same request, with a reason from its card. |
| **3** | **Make the decision** | You have one routing decision (owner, audience, and a build-once, reuse-everywhere plan) and a next step. |

Step 3 takes most of your time. Your room is saved in `THE-ROOM.md`, so you can edit it and use it again for new requests. Most steps include a prompt you can paste. **Change it as you like. It's a starting point, not the answer.** If you get stuck, tell Cowork in the chat, or ask your table SME or a coach.

::: details Glossary

- **Triager:** the person who reads a request and decides which team gets it.
- **Route:** to send a request to the team (or teams) that will do the work.
- **Team card:** a short description of a team. It says what the team owns, who it serves, and what kind of work it wants. It's also called a *charter*.
- **Room:** a group of teams that looks at the same request together.
- **Seat:** one team's place in the room. To *seat* a team means to add it to the room.
- **Dispatch:** to send one request to every team in the room at the same time.
- **Position:** a team's answer to a request, based on its team card.
- **Rough idea:** a request that's missing important details. It needs to be *sharpened* (given more detail) before anyone routes it.

:::

## Before you start

Download these two files now. You'll need them in the first few minutes.

<div class="lab-grid lab-grid-2">
	<a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch.zip" download>
		<span class="lab-card-emoji">🟢</span>
		<span class="lab-card-title">Dispatch</span>
		<span class="lab-card-desc">The Cowork skill that runs the room and creates your room file.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
	<a class="lab-card" href="/AI-Flight-Academy/downloads/dispatch-data-pack.zip" download>
		<span class="lab-card-emoji">🗂️</span>
		<span class="lab-card-title">Data pack</span>
		<span class="lab-card-desc">Sample requests, the Global Skilling team cards, and the routing rules. Use these instead of real work data.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
</div>

::: tip Want more detail on a task?
The **[Guides](/bricks/)** in the top menu explain the basic tasks on this page: how to install a skill, how to connect Cowork to your own work, and how to run things on a schedule. The guides work for every scenario. If you get stuck on one of these tasks, open the guide in a new tab.
:::

---

## 1 · See why one triager isn't enough

**Done when:** Dispatch is running on the sample requests, and you've seen how the single triager picks only one owner. This is your "before."

In this step, you install the skill, load the data pack, and meet the triager that you're going to outsmart.

1. In Cowork, open **Customize** → **Skills**. Select the arrow next to **Add**, and then select **Upload skill**. Drag in the whole `the-dispatch.zip` file.
	::: warning Two common mistakes
	Upload the whole `the-dispatch.zip` file, not only `SKILL.md`. The zip file includes `THE-ROOM.md` and other reference files that the skill needs. Also, **don't edit the single triager**. It's the fixed "before" that you compare against.
	:::
	
2. Start a **new** Cowork chat session. (Skills load only when a session starts.) Drag in the `dispatch-data` zip file, and then enter this prompt:

```text
Introduce yourself, then show me the single triager's take on the sample requests.
```

The **single triager** is one person who handles every request. The triager picks one owner for each request and doesn't make a plan. This is your starting point. It never changes, so you can compare your room's results to it.

| Request | Single triager sends it to |
|---|---|
| Agent governance training before launch | Content & Insights |
| Partners keep setting up data protection wrong | "the training team" |
| AI agents explained to every employee in 30 minutes | Content & Insights |
| A certification for Copilot Studio agent builders | Credentials |
| A hands-on agent deployment lab for sellers | "the labs team" |

Look at **Agent governance training before launch**. Product Marketing wants customers to learn how to control Copilot agents before the feature launches. The triager picks one owner and stops there. The triager doesn't see the bigger plan:

- Content & Insights should build the governance learning path *once*.
- Delivery should reuse it in live sessions.
- Field & Partner should reuse it in their regions.
- Partners are the audience who need it first.

Your room fills that gap.

<div class="scene scene--flip">

![The woman gestures as team-dispatchers take their desks and light their status lamps.](/img/scenario-2-dispatch-cowork-seating.png)

<p class="scene-cap">Seat the room by talking.</p>

</div>

## 2 · Seat three teams, each with its own view

**Done when:** each of the three teams gives its own position on the same request, and each position gives a reason from that team's card.

Remember, a **seat** is one team in the room. Each seat says what the team owns, who it serves, and what makes the team want a request or turn it down. Your goal isn't only to list teams. Your goal is for each team to **reason from its own card**. When teams differ, the difference should come from their cards, not from being told to disagree.

Start with these three teams, because their cards are the most different: **Content & Insights**, **Delivery & Program Operations**, and **Field & Partner**. Ask Dispatch to seat all three in your `THE-ROOM.md` file and dispatch the first request:

```text
Seat Content & Insights, Delivery & Program Operations, and Field & Partner from the pack, then dispatch the agent governance request.
```

You should get a separate position from each team, and each position should be based on that team's card. Where the teams differ, you can see why:

- **Content & Insights** wants to build a learning path once and keep it available.
- **Delivery & Program Operations** wants to teach it live before the launch date.
- **Field & Partner** says the real audience is partners, because partners set up governance in their own tenants.

**Make each team different.** If a team would route every request the same way as another team, it's a copy. A room full of copies gives the same answer in different words. Give each team its own point of view:

| Sounds like every other team | Has its own point of view |
| --- | --- |
| "We'd take this." | "Don't build a one-off - build the system." (Product) |
| "Send it to content." | "Who's the *real* audience? I think it's partners." (Field & Partner) |

Every position comes from the team's card: what the team owns and who it serves. If a request isn't a good fit for a team, the team says "not mine." It doesn't take the request anyway.

::: tip Seat a real team with Work IQ
Work IQ lets Cowork use your Microsoft 365 work: the mail, meetings, chats, and files that you can already see, and nothing more. Ask Cowork to draft a team's card from that work. For example: *"draft the Content & Insights charter from what you can see."* Then fix anything that's wrong. Treat the result as a first draft, not the final answer.
:::

## 3 · Make the decision

**Done when:** you've turned the positions into one routing decision (owner, audience, and a build-once, reuse-everywhere plan) and named the next step.

The positions aren't the finish line. The decision is. Choosing the owner is usually quick. The real work is the plan. You don't need to follow these steps exactly. Let Dispatch guide you.

1. **Owner:** Choose the one team that takes the request and coordinates the work. This is often the team that wants the request the most.
2. **Audience:** Name who the work is *really* for. A team might change the audience. For example, Field & Partner says partners come first.
3. **The plan:** List each deliverable, the team that builds it, and the teams that reuse it. **Build once, and reuse across teams.** Don't let two teams build the same thing.
4. **What happens next:** Decide what to do with the request. You can go ahead, reshape it, split it, delay it, or decline it and send it to someone else. Then name one clear next step and the team that owns it.

Next, try a **rough idea** (a file whose name starts with `rough-idea-`). A rough idea is missing its audience or its outcome. The honest answer is to **sharpen it first**, not to route it. That's the point: a good room doesn't guess.

If your three teams always agree on the same plan, check their reasons. If each reason comes from that team's card, agreement is fine. If the reasons are vague or all the same, make the team cards more specific.

## Go further - make it run without you

When you trust your room, ask Cowork to run it on new requests for you. Point it at the place where your requests really arrive, like a folder or your email.

The most useful version runs automatically:

> "On a schedule, run the Dispatch room on any new email whose subject contains **[your intake keyword]**, and send me the routing decision."

Now, when a request arrives in your inbox, the room has already made a plan (owner, audience, and reuse) before you even open the email.

---

<div class="scene">

![The full room lands a plan with no computer in sight as the woman looks on, satisfied.](/img/scenario-2-dispatch-cowork-room.png)

<p class="scene-cap">No code. A real room.</p>

</div>

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| Cowork ignores Dispatch | Start a **new** Cowork session. Skills load only when a session starts. |
| The upload seemed to do nothing | Upload the whole `the-dispatch.zip` file, not only `SKILL.md`. |
| Cowork can't see the requests | Attach the data pack files to the session. |
| Every team gives the same position | Check each team's reason. If each reason comes from that team's card, agreement is a fine answer. If the reasons are vague or all the same, make the team cards more specific. Then dispatch again. |
| Cowork confidently routed a rough idea | Ask it to check whether the request has enough detail to route. Sharpen first. Don't guess. |

::: details 🎬 Nobody gets it right the first time
<div class="scene scene--flip">

![Her too-vague team descriptions filled the desks with identical generic clerks who all route to the same place; she facepalms.](/img/scenario-2-dispatch-cowork-blooper.png)

<p class="scene-cap">Careful what you ask for.</p>

</div>

If you seat teams that all look the same, they'll all route the same way. That isn't a failure. It's feedback. Give each team its own point of view, and run it again.
:::

---

[← Back to start](/)
