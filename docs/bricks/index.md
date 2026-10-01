---
title: Reference
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# Reference

Your build page has the steps for your scenario. This page is for looking things up - how the tools behave, and where the official documentation lives.

Nothing here is required reading. Use it if you want detail the build page doesn't cover, or if you're carrying something on past the session.

## How skills load

A **skill** is a set of instructions your agent follows. All three altitudes use the same idea, with different plumbing.

| | Where it lives | How to add one |
| --- | --- | --- |
| 🟢 **Cowork** | Your OneDrive, under `Documents/Cowork/skills/` | **Customize → Add ▾ → Upload**, then start a new task |
| 🔵 **Scout** | A skills directory on your machine | **Extensions → Import**, then start a new chat |
| 🟣 **Code** | `.github/skills/` in the folder you're working in | Nothing to register - the CLI finds it |

Two behaviours worth knowing, because neither is visible in the UI:

- **Skills are discovered when a session begins.** One added part-way through a session isn't picked up until you start a new one.
- **`SKILL.md` is the instructions, not the whole skill.** When a skill ships with a folder around it, that folder holds reference files the instructions point at - definitions, templates, playbooks. The exception is a skill that ships as a lone `.md`, which some do.

Cowork takes a `.zip` as it downloads. Scout wants it unzipped, and imports the folder.

**Docs:** [Upload a skill (Cowork)](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-customize#upload-a-skill) · [Manage skills (Scout)](https://learn.microsoft.com/microsoft-scout/use-microsoft-scout#manage-skills)

## Work IQ

**Work IQ** is the layer that grounds an agent in your Microsoft 365 work. Cowork and Scout reach it with no setup; from code you add it as an MCP server.

What it can reach is what **you** can already reach: mail and sent mail, calendar, Teams chats and channels, OneDrive and SharePoint files, and people and org context. It never sees more than your own account does.

If you want to check grounding is live before you rely on it, ask for something only your account could answer - *"what's on my calendar tomorrow?"*

**Docs:** [Work IQ overview](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq) · [Work IQ MCP server](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview) · [Work IQ CLI](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq/cli)

::: warning Keep your own work on your own screen
The scenarios run against your real mail and calendar. When you compare with your table, share the prompt rather than the output.
:::

## Running the Code starters

The Scenario starters are Python, and they call the GitHub Copilot CLI to do the agent work.

| | Check | If it's missing |
| --- | --- | --- |
| Python 3.10+ | `python --version` | `py --version` on Windows |
| Copilot CLI | `copilot --version` | `npm install -g @github/copilot`, then sign in |
| Skill visible | `copilot skill list` | The CLI reads `.github/skills/` in the current folder - `cd` into the starter |

Each call to the CLI is a full agent turn and takes roughly 20-60 seconds, so bound what you send it rather than calling per-file or in a loop. When a program needs to read the result, ask for JSON - the starters' `ask_json()` returns a parsed object.

**Docs:** [GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli) · [Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview) · [Agent mode](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode) · [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)

## All the documentation

| 🟢 Cowork | |
| --- | --- |
| [Use Copilot Cowork](https://learn.microsoft.com/microsoft-365/copilot/cowork/use-cowork) | What it does, and how skills fit |
| [Customize Cowork](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-customize) | Skills, plugins, uploading |
| [Common questions](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-faq) | FAQ |
| [What's new](https://learn.microsoft.com/microsoft-365/copilot/cowork/whats-new) | Release notes |

| 🔵 Scout | |
| --- | --- |
| [Get started](https://learn.microsoft.com/microsoft-scout/get-started) | Install, sign-in, settings |
| [Use Microsoft Scout](https://learn.microsoft.com/microsoft-scout/use-microsoft-scout) | Skills, shell commands, browser control |
| [Overview](https://learn.microsoft.com/microsoft-scout/overview) | What it is and what ships with it |
| [Common questions](https://learn.microsoft.com/microsoft-scout/faq) | Permissions, custom skills |
| [What's new](https://learn.microsoft.com/microsoft-scout/whats-new) | Release notes |

| 🟣 Code | |
| --- | --- |
| [GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli) | The CLI the starters call |
| [Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview) | Setup and features |
| [Agent mode](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode) | Letting Copilot edit across files |
| [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro) | The standard behind MCP servers |

## If you're stuck

The bottom of every build page has a **Stuck?** table for that scenario. Past that: ask your AI, then your table SME, then a coach in a yellow vest.
