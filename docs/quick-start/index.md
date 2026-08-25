---
title: Quick start
layout: page
navbar: false
sidebar: false
aside: false
footer: false
search: false
---

<!-- markdownlint-disable MD013 MD024 MD025 MD033 -->

<div class="standalone-page vp-doc">

# Quick start

AI Flight Academy is a hands-on agent build. You pick a scenario, pick the altitude you want to fly at, and leave with a working agent.

**Sort out access before you arrive.** You have two hours on the day, and all of it is meant for building.

## Pick your altitude

Every altitude produces the same portable spec. What changes is how much you build around it.

<div class="lab-grid lab-grid-3">
  <a class="lab-card" href="#cowork">
    <span class="lab-card-emoji">🟢</span>
    <span class="lab-card-title">Cowork</span>
    <span class="lab-card-desc">Build entirely in chat. You write instructions, not code.</span>
    <span class="lab-card-meta"><span class="lab-card-time">Nothing to install</span></span>
    <span class="lab-card-cta">What you need →</span>
  </a>
  <a class="lab-card" href="#scout">
    <span class="lab-card-emoji">🔵</span>
    <span class="lab-card-title">Scout</span>
    <span class="lab-card-desc">Describe what you want and Scout builds it, then runs it.</span>
    <span class="lab-card-meta"><span class="lab-card-time">EMU + Scout</span></span>
    <span class="lab-card-cta">What you need →</span>
  </a>
  <a class="lab-card" href="#code">
    <span class="lab-card-emoji">🟣</span>
    <span class="lab-card-title">Code</span>
    <span class="lab-card-desc">Write the agent yourself, in VS Code or the terminal.</span>
    <span class="lab-card-meta"><span class="lab-card-time">EMU + local tooling</span></span>
    <span class="lab-card-cta">What you need →</span>
  </a>
</div>

You can change your mind on the day.

## 🟢 Cowork {#cowork}

**You'll build with:** Microsoft 365 Copilot + Cowork

### What you need

Microsoft 365 Copilot with Cowork, at [copilot.cloud.microsoft/cowork](https://copilot.cloud.microsoft/cowork). Nothing to install, no account to request, no terminal.

The one mechanic to know is importing a skill. Your build page repeats this on the day:

1. In the left menu, choose **Customize → Skills**.
2. Select the arrow next to **Add**, then **Upload skill**, and drag the file in.
3. Start a **new session**, then name the skill in your first message.

![The Add a skill dialog in Cowork, with a drag and drop area that accepts .MD, .ZIP, or .SKILL files](/img/cowork-add-skill-upload.png)

::: warning Skills are discovered at session start
A skill you add mid-session stays invisible until you begin a fresh one. After uploading, start a new session before anything else.
:::

## Scout and Code both need a GitHub EMU account {#emu}

Scout and Code both run on GitHub Copilot, so both need Copilot access on your Microsoft **EMU** (Enterprise Managed User) account. Do this first. Without it, Scout's GitHub sign-in fails and `copilot` won't run.

Confirm your access at [aka.ms/copilot/explore](https://aka.ms/copilot/explore), signing in with your Microsoft account. Look under **Review your accounts**.

**You're ready when** it reads **GitHub Copilot enabled** for your Enterprise Managed User (EMU) account.

![The Copilot access page showing GitHub Copilot enabled for an Enterprise Managed User account](/img/copilot-emu-enabled.png)

To use a personal GitHub account instead, link it at [repos.opensource.microsoft.com](https://repos.opensource.microsoft.com/orgs/MicrosoftCopilot).

::: tip Nothing to do here if you're on Cowork
Cowork runs on your Microsoft 365 account and doesn't touch GitHub. You're already set.
:::

## 🔵 Scout {#scout}

**You'll build with:** Microsoft Scout

You describe what you want and Scout builds it, grounded in your real work. It can also run what it builds.

### What you need

| | |
| --- | --- |
| **GitHub EMU access** | [Covered above](#emu). Do this first |
| **Microsoft Scout** | [aka.ms/scout-internal](https://aka.ms/scout-internal) |

### Check you're ready

1. Install Scout and open it.
2. Sign in with **M365** first, then with your **EMU** GitHub account (or the personal account you linked).
3. Start a new session and ask:

```text
Summarize what I have on this week and what looks most time-sensitive.
```

**You're ready when** Scout answers from your actual calendar and mail instead of asking you to paste something in.

::: tip Scout only sees what you already see
Mail, calendar, Teams, OneDrive and SharePoint come through Work IQ with no connector to set up. Nothing is shared outward and nothing leaves your tenant.
:::

## 🟣 Code {#code}

**You'll build with:** VS Code + GitHub Copilot, or the Copilot CLI

You get a starter that runs and a contract to build against. You write the code.

### What you need

| | | Check with |
| --- | --- | --- |
| **GitHub EMU access** | [Covered above](#emu). Do this first | |
| **Node** | [nodejs.org](https://nodejs.org/) | `node --version` |
| **Python 3** | [python.org/downloads](https://www.python.org/downloads/) | `python --version` |
| **GitHub Copilot CLI** | `npm install -g @github/copilot` | `copilot --version` |
| **VS Code** | [code.visualstudio.com](https://code.visualstudio.com/) | Skip the next two rows if you'd rather stay in the terminal |
| **GitHub Copilot** extension | [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) | Listed under Extensions |
| **GitHub Copilot Chat** extension | [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) | Chat panel opens and is signed in |

The starters need Python 3.10 or later and the Copilot CLI. **No other dependencies**, nothing to `pip install`.

### Check you're ready

1. Run one prompt end to end:

   ```powershell
   copilot -p "Reply with the word ready and nothing else." --allow-all-tools
   ```

   **You're ready when** that returns `ready`. If it asks you to sign in, do that first and run it again.

2. If you plan to use VS Code, open **Settings**, search `chat.agent.enabled`, and confirm **Chat › Agent: Enabled** is checked.

   ![VS Code Settings filtered to chat.agent.enabled, with the Chat > Agent: Enabled checkbox ticked](/img/vscode-chat-agent-enabled.png)

::: tip Pick your own model
No scenario depends on a particular model. Use whichever one you have access to and like working with.
:::

</div>
