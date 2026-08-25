---
title: Scenario 2 · Dispatch
---

# Scenario 2 – Dispatch

::: warning 🚧 Work in progress
This scenario is drafted and being tested. Details may change before the event.
:::

<div class="scene">

![A lone dispatcher sits at an old switchboard in a dim ops room, smugly plugging every incoming call into the same single socket labelled "just send it somewhere"; four dark, unstaffed dispatch desks sit beside him.](/img/scenario-2-dispatch-opener.png)

<p class="scene-cap">One queue. One guess.</p>

</div>

## The problem

Skilling requests pour in — *"we need to skill this audience on that topic before this date."* Someone triages the queue: they pick the team that seems the best fit and send it there. Clean hand-off, next request.

What that misses is that **the same request means different work to different teams.** One team sees a 20-minute lab; another sees a whole learning path; a third says *"not us — the real audience is partners."* A single triager can't hold all of that at once, so requests get routed thin, built twice by teams who didn't know the other was building it, or aimed at the wrong audience entirely.

Here's what one triager can't do: look at a governance-before-GA request and say *"Content & Insights builds the path once, Delivery reuses it live, and Field & Partner reuses it for partners — who are the real first audience."* That's not a hand-off. That's a plan.

## What 'done' looks like

You build a **room of Global Skilling teams** and use it to route a real skilling request — deciding who fields it, who it's really for, and the **plan of deliverables** that satisfies it.

In **Cowork**, the part you build is one file:

- **`THE-ROOM.md`** – the teams you seat. For each one, write what it **owns**, who it **serves**, and what makes it want a request or pass it on.

The provided skill has each team take a position on the same request, then lands **one routing decision**. *Who fields it* is often agreed; the debate is the **plan** — the shape, the audience, and especially the deliverables, because one team's deliverable is another team's reuse. **Scout** and **Code** teams take that further — a live board, an intake gate, up to a decision wired to a real action.

<div class="scene scene--flip">

![A room of five team-dispatchers at their own desks argue over the same incoming request — some plugging it into "build once," others into "reuse," one repointing the wire to a desk marked "partners."](/img/scenario-2-dispatch-split.png)

<p class="scene-cap">Same request. Different plan.</p>

</div>

With the supplied pack, the same request should split the room — agreement on *who owns it*, a real argument about *the plan and the reuse*. With your own request, the room shows whether the obvious owner is really the whole answer. Every position points to the team's charter behind it. And a rough idea gets **sharpened**, not routed.

::: tip There's a "before" to measure against
The kit includes a **single triager** — one person routing the queue, one owner per request, no plan. Its decisions are already recorded, and you never change it. Compare your room against this one-owner "before." A governance request is simply *"send it to Content & Insights"* to the triager; the room shows the build-once-reuse plan hiding underneath.
:::

## The data

The kit gives you a working skill and everything the room needs to route. Choose one path for the request and the teams.

### Path A – Use the pack that comes with the kit

Use the pack included with the scenario: sample **requests** (formed briefs *and* deliberately-rough ideas), the real **Global Skilling team cards**, and the **routing policy** (what a request needs to be routable, and what a valid decision looks like).

This is the recommended path. The requests are designed to split the room, and none of it is personal data.

Use:

- the requests in `dispatch-data/requests/` as the intake to route
- the team cards in `dispatch-data/teams/` as your room's members
- the rules in `dispatch-data/policy/` as the bar for a routable request and a valid decision

### Path B – Bring your own request and teams

Route a real skilling request your org actually gets — a customer ask, a field request, a leadership push — through the teams you actually work with.

Pick this if you'd rather work with something real. Work IQ can draft a team's charter from the work signals you have access to; correct it with people who know that team. It's available in both Cowork and Scout. Keep data in your own tenant and out of shared spaces.

## Assembly maps

Use the building blocks for your altitude.

- **🟢 Cowork:**
  1. [Install a provided skill](/bricks/cowork-install-skill)
  2. [Write a reusable Cowork skill](/bricks/cowork-build-skill)
  3. [Produce a formatted output](/bricks/cowork-formatted-output)
  4. [Re-run a skill on new inputs](/bricks/cowork-rerun-skill)

- **🔵 Scout (Microsoft Scout):**
  1. Import the Dispatch skill and seat your teams
  2. Dispatch a request and watch the positions split
  3. Have Scout build a live dashboard, run by GitHub Copilot CLI
  4. Make it a one-command app or a scheduled task

- **🟣 Code:**
  1. [Set up VS Code + GitHub Copilot](/bricks/code-setup)
  2. [Run the starter project](/bricks/code-run-starter)
  3. [Add a guardrail](/bricks/code-guardrail)
  4. [Build an MCP connector](/bricks/code-mcp-connector)

::: info Team model
In Cowork and Scout, each person seats a different team, then the group combines them into one room and dispatches a request together.

In Code, the team builds one system. Each person owns a team's position, the routing reducer, or the intake gate.
:::

## Start building

Pick your altitude:

<!-- markdownlint-disable MD033 -->
<BuildMatrix scenario="scenario-2" />

<div class="scene">

![The room of five team-dispatchers has settled: one central wire runs from "build once" and fans out to three desks marked "reuse," with a partners desk lit first. Everyone's nodding.](/img/scenario-2-dispatch-conclusion.png)

<p class="scene-cap">Build once. Route it everywhere it's needed.</p>

</div>

::: details 🎬 Blooper reel
<div class="scene scene--flip">

![One dispatcher has fallen asleep at the switchboard, tangled in cables, while a request rings unanswered and the others facepalm.](/img/scenario-2-dispatch-blooper.png)

<p class="scene-cap">Even a good room drops a call now and then.</p>

</div>

Even the best room drops a call now and then — which is exactly why you seat more than one team.
:::
