---
title: Glossary
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# Glossary

Words you'll hear during the session, and where the official documentation lives.

Each build page has its own glossary for that scenario's vocabulary - *triager*, *cohort*, *shortlist* and so on. This page covers the product terms the scenarios share.

## Skill

A set of plain-text instructions an agent loads and follows. Skills are how every scenario in this hack ships - you install one, then name it in your request.

The instructions live in a file called `SKILL.md`. When a skill needs more than that, it ships as a folder with reference files beside `SKILL.md` - templates, definitions, playbooks - and the instructions point at them.

| | |
| --- | --- |
| [Cowork skills](https://learn.microsoft.com/microsoft-365/copilot/cowork/use-cowork#cowork-skills) | Microsoft Learn · Documentation |
| [Upload a skill to Cowork](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-customize#upload-a-skill) | Microsoft Learn · How-to |
| [Manage skills in Scout](https://learn.microsoft.com/microsoft-scout/use-microsoft-scout#manage-skills) | Microsoft Learn · Documentation |
| [Can I create my own custom skills?](https://learn.microsoft.com/microsoft-scout/faq#can-i-create-my-own-custom-skills) | Microsoft Learn · FAQ |

## Session, task, and chat

The same idea under three names: one conversation with an agent. Cowork calls it a **task**, Scout calls it a **chat** or **session**.

It matters because **skills are discovered when one begins**. A skill installed part-way through isn't picked up until you start a new one.

## Work IQ

The layer that grounds an agent in your Microsoft 365 work - mail, calendar, Teams, files, and people. Cowork and Scout reach it with no setup; from code you add it as an MCP server.

It can only reach what your own account can reach.

| | |
| --- | --- |
| [Work IQ overview](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq) | Microsoft Learn · Documentation |
| [Work IQ MCP server](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview) | Microsoft Learn · Documentation |
| [Work IQ CLI](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq/cli) | Microsoft Learn · Reference |

## Grounding

Giving an agent real context to answer from, rather than letting it generalise. In this hack that's usually Work IQ - your own mail and calendar - or a data pack of sample files.

A quick way to check grounding is live: ask something only your own account could answer, like *"what's on my calendar tomorrow?"*

## Plugin

A connection between Cowork and another service, so it can act in that system as well as read from it. Distinct from a skill: a skill is instructions, a plugin is a connection.

| | |
| --- | --- |
| [Manage your plugins](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-customize#manage-your-plugins) | Microsoft Learn · How-to |

## Extension

What Scout calls the place you import a skill - **Extensions → Import**. Scout also discovers skills from folders on your machine.

| | |
| --- | --- |
| [Use Microsoft Scout](https://learn.microsoft.com/microsoft-scout/use-microsoft-scout#manage-skills) | Microsoft Learn · Documentation |
| [Microsoft Scout overview](https://learn.microsoft.com/microsoft-scout/overview) | Microsoft Learn · Overview |

## MCP (Model Context Protocol)

An open standard for giving an agent tools it can call - reading from a live system, or acting in one. An **MCP server** is one of those tool providers. Several already exist, including Work IQ's, so connecting one is usually a configuration step rather than something you build.

| | |
| --- | --- |
| [Introduction to MCP](https://modelcontextprotocol.io/docs/getting-started/intro) | modelcontextprotocol.io · Specification |
| [MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) | VS Code · Documentation |
| [MCP Registry](https://github.com/mcp) | GitHub · Directory |

## Agent

Used two ways in this hack, so worth separating:

- **The general sense** - software that takes a goal, decides the steps, and uses tools to get there. Cowork and Scout are both agents in this sense.
- **The Code sense** - a Markdown file under `.github/agents/` that gives Copilot a named role and a model to use. It's a text file, not a service; nothing is deployed.

| | |
| --- | --- |
| [Agent mode in VS Code](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode) | VS Code · Documentation |
| [Custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) | VS Code · Customization |

## GitHub Copilot CLI

Copilot in the terminal. The Code starters call it behind the scenes to do the agent work, and Scout uses it too. Each call is a full agent turn, so expect roughly 20-60 seconds.

| | |
| --- | --- |
| [About GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli) | GitHub Docs · Concept |
| [Use GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli) | GitHub Docs · How-to |

## The products themselves

| | |
| --- | --- |
| [Copilot Cowork](https://copilot.cloud.microsoft/cowork) | Microsoft · Open it |
| [Use Copilot Cowork](https://learn.microsoft.com/microsoft-365/copilot/cowork/use-cowork) | Microsoft Learn · Documentation |
| [Cowork common questions](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-faq) | Microsoft Learn · FAQ |
| [Get started with Microsoft Scout](https://learn.microsoft.com/microsoft-scout/get-started) | Microsoft Learn · How-to |
| [Microsoft Scout common questions](https://learn.microsoft.com/microsoft-scout/faq) | Microsoft Learn · FAQ |
| [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview) | VS Code · Documentation |
