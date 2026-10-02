---
title: Glossary
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# Glossary

Terms you'll come across working with Copilot Cowork, Microsoft Scout, and GitHub Copilot, and where the official documentation lives.

## Skill

A set of plain-text instructions an agent loads and follows. Instructions live in a file called `SKILL.md`, which opens with a short description telling the agent when the skill applies.

A skill that needs more than instructions ships as a folder: `SKILL.md` plus reference files beside it - templates, definitions, examples - which the instructions point at.

`SKILL.md` follows the Agent Skills open standard, so the same folder works anywhere that supports it. Where each tool keeps them differs: Cowork stores them in OneDrive, Scout in directories on your machine, and GitHub Copilot reads `.github/skills/` in the folder it's working in.

| | |
| --- | --- |
| [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) | GitHub Docs · Concept |
| [Cowork skills](https://learn.microsoft.com/microsoft-365/copilot/cowork/use-cowork#cowork-skills) | Microsoft Learn · Documentation |
| [Upload a skill to Cowork](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-customize#upload-a-skill) | Microsoft Learn · How-to |
| [Manage skills in Scout](https://learn.microsoft.com/microsoft-scout/use-microsoft-scout#manage-skills) | Microsoft Learn · Documentation |
| [Add skills to Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills) | GitHub Docs · How-to |

## Session, task, and chat

Names for the same thing: one conversation with an agent. Cowork calls it a **task**, Scout a **chat** or **session**, and the Copilot CLI a **session**.

Skills are discovered when one begins. A skill installed partway through isn't picked up until the next one starts.

## Work IQ

The layer that grounds an agent in Microsoft 365 work - mail, calendar, Teams, files, and people and org context. It reaches only what the signed-in account can already reach.

Cowork and Scout have it built in. The GitHub Copilot surfaces install it: as a **plugin** in the CLI, the Copilot app, and the VS Code Agents window, or as a standalone **MCP server**. There's also a command-line interface.

| | |
| --- | --- |
| [Work IQ overview](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq) | Microsoft Learn · Documentation |
| [Work IQ MCP server](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview) | Microsoft Learn · Documentation |
| [Work IQ CLI](https://learn.microsoft.com/microsoft-365/copilot/extensibility/work-iq/cli) | Microsoft Learn · Reference |
| [Work IQ plugin marketplace](https://github.com/microsoft/work-iq) | GitHub · Repository |

## Grounding

Giving an agent real source material to answer from, rather than letting it answer from general knowledge. A grounded answer can be traced back to something specific - a message, a file, a record.

## Plugin

Two different things share the name, depending on the product.

In **GitHub Copilot** - the CLI, the Copilot app, and the VS Code Agents window - a plugin is a bundle of components installed as one unit: custom agents, skills, and MCP servers, described by a `plugin.json` manifest. Plugins are installed from a **marketplace**, which is a repository that hosts them.

In **Cowork**, a plugin is a connection to another service, letting Cowork act in that system rather than only read from it.

| | |
| --- | --- |
| [About plugins](https://docs.github.com/en/copilot/concepts/agents/about-plugins) | GitHub Docs · Concept |
| [Finding and installing plugins](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing) | GitHub Docs · How-to |
| [Plugin command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference) | GitHub Docs · Reference |
| [Manage your plugins (Cowork)](https://learn.microsoft.com/microsoft-365/copilot/cowork/cowork-customize#manage-your-plugins) | Microsoft Learn · How-to |

## Extension

Another name used two ways.

In **VS Code**, an extension is an add-on for the editor itself, installed from the Visual Studio Marketplace. GitHub Copilot is one.

In **Microsoft Scout**, Extensions is where imported skills are managed. Scout also discovers skills from directories on the machine it runs on.

| | |
| --- | --- |
| [Copilot extensibility in VS Code](https://code.visualstudio.com/docs/copilot/copilot-extensibility-overview) | VS Code · Documentation |
| [Manage skills in Scout](https://learn.microsoft.com/microsoft-scout/use-microsoft-scout#manage-skills) | Microsoft Learn · Documentation |

## MCP (Model Context Protocol)

An open standard for giving an agent tools it can call - reading from a live system, or acting in one.

An **MCP server** is one of those tool providers. Many already exist, including one for Work IQ, so connecting to a system is often configuration rather than development. A server can be added on its own, or arrive bundled inside a plugin.

| | |
| --- | --- |
| [Introduction to MCP](https://modelcontextprotocol.io/docs/getting-started/intro) | modelcontextprotocol.io · Specification |
| [MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) | VS Code · Documentation |
| [Extend Copilot Chat with MCP](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp/extend-copilot-chat-with-mcp) | GitHub Docs · How-to |
| [MCP Registry](https://github.com/mcp) | GitHub · Directory |

## Agent

Software that takes a goal, works out the steps, and uses tools to carry them out. Cowork and Scout are both agents in this sense.

In GitHub Copilot the word also names something narrower: a Markdown file - typically `*.agent.md` under `.github/agents/` - that gives Copilot a role and a model to use for a particular kind of work. It's a text file read at runtime, not a deployed service, and it can be shared on its own or inside a plugin.

| | |
| --- | --- |
| [Agent mode in VS Code](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode) | VS Code · Documentation |
| [About plugins](https://docs.github.com/en/copilot/concepts/agents/about-plugins) | GitHub Docs · Concept |
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
