---
title: Scenario 1 · The Digital Twin
---

# Scenario 1 – The Digital Twin

::: warning 🚧 Work in progress
This scenario is drafted and being tested. Details may change before the event.
:::

## The problem

Copilot personalizes already – memory, plus Work IQ across mail, calendar, and files. That gets a draft most of the way.

What it doesn't have is what you've explicitly decided: how you rank priorities that conflict, which commitments you protect, what you never send without checking. All of that is inferred from past activity. You can't inspect the inference, correct it, or carry it to another tool.

The result is a rewrite on most drafts, and the same context re-supplied every session.

## What 'done' looks like

A twin is a `SKILL.md` plus a `references/` folder – the **Agent Skills open standard**, so the same files run in Cowork, VS Code Copilot, and the GitHub Copilot CLI unmodified.

Inside `references/`:

- **`persona.md`** – who you are and how you work. Rules, boundaries, what's live, what gives in a bad week.
- **`voice.md`** – real sent-message samples and the style rules they imply.

**The twin writes those two itself**, from what Work IQ can see in your mail, Teams and calendar. **The rest of the hack is yours:** you correct what it got wrong, then add the files it has no way to know – the people you deal with, what you've already committed to, what's already been decided.

The Scout altitude turns the twin into whatever you want built on top of it – a dashboard, a command, a scheduled briefing, an MCP server. The Code altitude calls it from a program instead of a chat window: a git hook, a service, a daemon, a tool other agents can reach.

Done means the twin drafts in a way you'd recognise as yours, and you can point to the rule that produced it.

::: tip The proof is a real thread
Name something unresolved from your own inbox. The twin retrieves it and answers. If the answer isn't yours, you've found the missing rule.
:::

## The data

**Cowork and Scout** build the twin from your own Microsoft 365 data – sent mail, calendar, Teams. It only ever sees what you can already see, and the files stay in your tenant, on your screen.

**Code** ships a fictional twin instead. The starter arrives pre-populated with a made-up engineer at a made-up company, so the session is spent building rather than writing a persona, and nothing personal goes near a shared exercise. Making it yours is something you do afterwards, with a Copilot surface that can see your work.

## Build paths

<!-- markdownlint-disable MD033 -->
<BuildMatrix scenario="scenario-1" />

## Assembly maps

Use the building blocks for your altitude.

- **🟢 Cowork:**
  1. [Connect Cowork to a data source](/bricks/cowork-connect-source)
  2. [Write a reusable Cowork skill](/bricks/cowork-build-skill)
  3. [Produce a formatted output](/bricks/cowork-formatted-output)
  4. [Re-run a skill on new inputs](/bricks/cowork-rerun-skill)

- **🔵 Scout:**
  1. [Set up Microsoft Scout](/bricks/scout-setup)
  2. [Use Work IQ](/bricks/scout-work-iq)
  3. [Build an app with Scout](/bricks/scout-build-app)
  4. [Run it on a schedule](/bricks/scout-autonomy)

- **🟣 Code:**
  1. [Set up Scout / GitHub Copilot](/bricks/advanced-setup)
  2. [Build an MCP connector](/bricks/advanced-mcp-connector)
  3. [Use Work IQ](/bricks/advanced-work-iq)
  4. [Add a guardrail](/bricks/advanced-guardrail)

::: info Team model
In Cowork, everyone builds their own twin and the table converges on shape – compare rules, steal good tiebreakers.

In Scout, everyone installs their own twin, then the table picks one thing to build on it and splits the work – one on the build, one on what it reads, one on the rules that shape it, one on how it's triggered. You share prompts and files, never anything from your inbox.

In Code, everyone gets their twin answering from a program, then the table picks one thing to build and splits it by the seams that already exist – the trigger, the input, the call, the output. Each piece is testable against a stub, so nobody waits to start.
:::
