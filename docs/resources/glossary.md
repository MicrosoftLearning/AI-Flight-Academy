---
title: Glossary
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# Glossary

Terms you'll come across working with Copilot Cowork, Microsoft Scout, and GitHub Copilot, and where the official documentation lives.

## Skill

A set of plain-text instructions an agent loads and follows. Instructions live in a file called `SKILL.md`, which opens with a short description telling the agent when the skill applies.

A skill that needs more than instructions ships as a folder: `SKILL.md` plus reference files beside it - templates, definitions, examples - which the instructions point at.

`SKILL.md` follows the Agent Skills open standard, so the same files work across tools that support it.

| | |
| --- | --- |
| [Cowork skills](https://learn.microsoft.com/microsoft-365/copilot/cowork/use-cowork#cowork-skills) | Microsoft Learn · Documentation |
| [Upload a skill to Cowork](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-customize#upload-a-skill) | Microsoft Learn · How-to |
| [Manage skills in Scout](https://learn.microsoft.com/microsoft-scout/use-microsoft-scout#manage-skills) | Microsoft Learn · Documentation |
| [Can I create my own custom skills?](https://learn.microsoft.com/microsoft-scout/faq#can-i-create-my-own-custom-skills) | Microsoft Learn · FAQ |

## Session, task, and chat

Three names for the same thing: one conversation with an agent. Cowork calls it a **task**, Scout calls it a **chat** or a **session**.

Skills are discovered when one begins. A skill installed part-way through isn't picked up until the next one starts.

## Work IQ

The layer that grounds an agent in Microsoft 365 work - mail, calendar, Teams, files, and people and org context. Cowork and Scout reach it with no setup. From code, it's available as an MCP server.

It reaches only what the signed-in account can already reach.

| | |
| --- | --- |
| [Work IQ overview](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq) | Microsoft Learn · Documentation |
| [Work IQ MCP server](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview) | Microsoft Learn · Documentation |
| [Work IQ CLI](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq/cli) | Microsoft Learn · Reference |

## Grounding

Giving an agent real source material to answer from, rather than letting it answer from general knowledge. A grounded answer can be traced back to something specific - a message, a file, a record.

## Plugin

A connection between Cowork and another service, letting it act in that system rather than only read. A skill is instructions; a plugin is a connection.

| | |
| --- | --- |
| [Manage your plugins](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-customize#manage-your-plugins) | Microsoft Learn · How-to |

## Extension

Where Scout manages imported skills. Scout also discovers skills from directories on the machine it's running on.

| | |
| --- | --- |
| [Manage skills](https://learn.microsoft.com/microsoft-scout/use-microsoft-scout#manage-skills) | Microsoft Learn · Documentation |
| [Microsoft Scout overview](https://learn.microsoft.com/microsoft-scout/overview) | Microsoft Learn · Overview |

## MCP (Model Context Protocol)

An open standard for giving an agent tools it can call - reading from a live system, or acting in one.

An **MCP server** is one of those tool providers. Many already exist, including one for Work IQ, so connecting to a system is often configuration rather than development.

| | |
| --- | --- |
| [Introduction to MCP](https://modelcontextprotocol.io/docs/getting-started/intro) | modelcontextprotocol.io · Specification |
| [MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) | VS Code · Documentation |
| [MCP Registry](https://github.com/mcp) | GitHub · Directory |

## Agent

Software that takes a goal, works out the steps, and uses tools to carry them out. Cowork and Scout are both agents in this sense.

In GitHub Copilot the word also names something narrower: a Markdown file under `.github/agents/` that gives Copilot a role and a model to use for a particular kind of work. It's a text file read at runtime, not a deployed service.

| | |
| --- | --- |
| [Agent mode in VS Code](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode) | VS Code · Documentation |
| [Custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) | VS Code · Customization |

## GitHub Copilot CLI

GitHub Copilot in the terminal. It can be called directly or by other programs, which is how a script reaches an agent without a chat window. Each call is a full agent turn and takes longer than a chat reply.

| | |
| --- | --- |
| [About GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli) | GitHub Docs · Concept |
| [Use GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli) | GitHub Docs · How-to |

## The products

| | |
| --- | --- |
| [Copilot Cowork](https://copilot.cloud.microsoft/cowork) | Microsoft · Open it |
| [Use Copilot Cowork](https://learn.microsoft.com/microsoft-365/copilot/cowork/use-cowork) | Microsoft Learn · Documentation |
| [Cowork common questions](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-faq) | Microsoft Learn · FAQ |
| [Microsoft Scout overview](https://learn.microsoft.com/microsoft-scout/overview) | Microsoft Learn · Overview |
| [Get started with Microsoft Scout](https://learn.microsoft.com/microsoft-scout/get-started) | Microsoft Learn · How-to |
| [Microsoft Scout common questions](https://learn.microsoft.com/microsoft-scout/faq) | Microsoft Learn · FAQ |
| [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview) | VS Code · Documentation |
