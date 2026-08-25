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

You can change your mind on the day, and the setup below is worth doing for more than one altitude. Nothing here conflicts, so if you're between two, set up both.

## 🟢 Cowork {#cowork}

**You'll build with:** Microsoft 365 Copilot + Cowork

### What you need

Microsoft 365 Copilot with Cowork, at [copilot.cloud.microsoft/cowork](https://copilot.cloud.microsoft/cowork). Nothing to install, no account to request, no terminal.

**You're ready when** that link opens Cowork.

## Scout and Code both need a GitHub EMU account {#emu}

Scout and Code both run on GitHub Copilot, so both need Copilot access on your Microsoft **EMU** (Enterprise Managed User) account. Do this first. Without it, Scout's GitHub sign-in fails and `copilot` won't run.

1. Go to [aka.ms/copilot/explore](https://aka.ms/copilot/explore) and select **Continue**.

   ![The single sign-on screen for Microsoft EMU, with a green Continue button](/img/emu-sso-continue.png)

2. Sign in with your Microsoft account.

3. You land on **GitHub Copilot Access**. Seeing this page means the EMU account works.

   ![The GitHub Copilot Access organization page, headed Using GitHub Copilot at Microsoft](/img/emu-copilot-access-landing.png)

4. Go to [aka.ms/copilot](https://aka.ms/copilot). **You're ready when** it reads **GitHub Copilot enabled** for your Enterprise Managed User (EMU) account.

   ![The Copilot access page showing GitHub Copilot enabled for an Enterprise Managed User account](/img/copilot-emu-enabled.png)

### Using a personal GitHub account instead

Optional. On the same [aka.ms/copilot](https://aka.ms/copilot) page, select **Yes, show me how** and follow the linking steps.

![The optional prompt asking whether you would also like to use GitHub Copilot with your own personal GitHub account, with a Yes, show me how button](/img/copilot-personal-account-option.png)

Once it's linked, sign in as that personal account rather than your EMU one, go to [github.com/settings/copilot/features](https://github.com/settings/copilot/features), and set **Usage billed to** to **Microsoft Open Source**.

![The GitHub Copilot settings page with Usage billed to set to Microsoft Open Source](/img/copilot-billing-microsoft-open-source.png)

::: tip Nothing to do here if you're on Cowork
Cowork runs on your Microsoft 365 account and doesn't touch GitHub. You're already set.
:::

## The CLI and the chat panel are the same Copilot {#cli-vs-chat}

One subscription and one GitHub sign-in cover both. They run the same models, and the customization files carry across unchanged: an agent skill in `.github/skills/<name>/SKILL.md`, or a custom agent in `.github/agents/`, behaves the same whether Copilot reads it from a terminal or from VS Code. What differs is the surface. VS Code adds inline completions and awareness of the file you have open. The CLI adds everything that runs without a person at the keyboard: a prompt passed in with `-p`, piped input, scheduled runs.

The CLI is also more than a convenience. In VS Code you choose which engine runs an agent session, and the GitHub Copilot option runs on the Copilot SDK, which drives the same CLI underneath. That's why the CLI is in both Scout's and Code's setup. Scout runs it behind the apps it builds, and the Code starters call it directly, because the SDK is Node only and a Python program reaches Copilot by shelling out to `copilot`.

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

**You're ready when** both sign-ins complete and Scout opens a session.

::: tip Scout only sees what you already see
Mail, calendar, Teams, OneDrive and SharePoint come through Work IQ with no connector to set up. Nothing is shared outward and nothing leaves your tenant.
:::

## 🟣 Code {#code}

**You'll build with:** VS Code + GitHub Copilot, or the Copilot CLI

You get a starter that runs and a contract to build against. You write the code.

### What you need

The **Check with** commands run in any terminal: PowerShell, Command Prompt, Windows Terminal, or the built-in terminal in VS Code (**View → Terminal**). It makes no difference which.

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

1. In a terminal, confirm the Copilot CLI answers:

   ```powershell
   copilot -p "Reply with the word ready and nothing else." --allow-all-tools
   ```

   **You're ready when** that returns `ready`. If it asks you to sign in, do that first and run it again.

2. If you plan to use VS Code, open **Settings**, search `chat.agent.enabled`, and confirm **Chat › Agent: Enabled** is checked.

   ![VS Code Settings filtered to chat.agent.enabled, with the Chat > Agent: Enabled checkbox ticked](/img/vscode-chat-agent-enabled.png)

::: tip Leave the model on Auto
No scenario depends on a particular model. Auto routes each task based on what you're doing, current system health, and model performance. Switch only if you have a reason to.
:::

</div>
