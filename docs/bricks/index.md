---
title: The basics
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# The basics

Your build page has the steps for your scenario, and a **Stuck?** table at the bottom for when something goes wrong. This page covers the few things that trip people up on *every* scenario, whichever altitude you're flying.

If you're stuck on something not listed here: ask your AI first, then your table SME, then wave down a coach in a yellow vest.

## Skills load when a session starts

The single most common problem in the room. You install a skill, ask for it, and the agent answers as itself - no skill, no reference files, generic reply.

Skills are discovered **when a session begins**. One added mid-session stays invisible until you start a fresh one.

| | What to do |
| --- | --- |
| 🟢 **Cowork** | Install the skill, then start a **new task** |
| 🔵 **Scout** | Import the skill, then start a **new chat** |
| 🟣 **Code** | Run `copilot skill list` from inside the starter folder - the CLI reads `.github/skills/` in whatever folder your terminal is in, so it only appears when you've `cd`'d into the starter |

Then **name the skill in your request** - *"using my twin"*, *"using the ambassador skill"*. Drop the name and the agent often answers as itself.

## Install the whole thing, not just `SKILL.md`

`SKILL.md` is the instructions. The folder around it holds the reference files the skill reads - definitions, templates, playbooks, worked examples. Upload the file alone and the skill loads but can't reach any of them.

- 🟢 **Cowork** takes the archive **as it downloads**. Don't unzip it first. [Customize → Skills → Add ▾ → Upload skill](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-customize#upload-a-skill)
- 🔵 **Scout** needs it **unzipped**. **Extensions → Import**, then drag in the **folder** that contains `SKILL.md` - use the skill-folder drop zone, not the `.md` one.

The one exception: Scenario 1 on Cowork ships a single self-contained `SKILL.md` with nothing beside it, so there the file *is* the whole skill.

## Work IQ: what your agent can already see

**Work IQ** grounds your agent in your real Microsoft 365 work. There's nothing to connect and no auth to build - Cowork and Scout both reach it with no setup.

It can see what **you** can already see: mail and sent mail, calendar, Teams chats and channels, OneDrive and SharePoint files, and people and org context. It never sees more than you can, and nothing leaves your tenant.

**Quick check that grounding is live:** ask *"what's on my calendar tomorrow?"* A real answer means you're good. If it asks you to paste something in, grab a coach.

On 🟣 **Code**, Work IQ isn't automatic - you add it as an [MCP server](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview). It's an existing Microsoft server, so there's nothing to build.

::: warning Keep your own work on your own screen
You're each building against your real mail and calendar. When you compare with your table, share **the prompt that worked, not your mailbox**.
:::

## When it changes more than you asked

Expected, and recoverable. Ask what it changed and why, undo the parts you didn't want, then make **one change at a time**. Change three things at once and you won't know which one did it.

Same rule when an answer is wrong: ask which rule or file produced it, fix that one line, then ask again. If nothing moves, the line was too vague - name a person, a date, a hard no.

## Before you run anything on 🟣 Code

| Check | Command | If it fails |
| --- | --- | --- |
| Python 3.10+ | `python --version` | Try `py` on Windows |
| Copilot CLI | `copilot --version` | `npm install -g @github/copilot`, then sign in |
| Skill found | `copilot skill list` | `cd` into the starter folder first |

**A call takes 20-60 seconds.** That's a full agent turn, not a hang - don't cancel it, and never call in a loop or per-file. When a *program* reads the answer, ask for JSON: `ask_json()` returns a parsed object, and prose is useless to a parser.

## Going deeper

Official documentation, if you want more than the session covers:

| | |
| --- | --- |
| [Customize Copilot Cowork](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-customize) | Skills, plugins, and how to upload them |
| [Use Copilot Cowork](https://learn.microsoft.com/microsoft-365/copilot/cowork/use-cowork#cowork-skills) | What Cowork does and how skills fit |
| [Cowork FAQ](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-faq) | Common questions |
| [Get started with Microsoft Scout](https://learn.microsoft.com/microsoft-scout/get-started) | Install, sign-in, and settings |
| [Use Microsoft Scout](https://learn.microsoft.com/microsoft-scout/use-microsoft-scout#manage-skills) | Managing skills, including writing your own |
| [Microsoft Scout FAQ](https://learn.microsoft.com/microsoft-scout/faq) | Permissions, shell commands, custom skills |
| [Work IQ MCP server](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview) | Reaching your M365 work from code |
| [About GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli) | The CLI the Code starters call |
