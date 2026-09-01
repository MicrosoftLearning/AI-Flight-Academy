---
title: Flight Clearance - Code
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🛫 Flight Clearance

::: warning 🚧 Draft - the video and the form aren't final yet
:::

**Planning to fly the Code altitude?** Follow this guide and its short exercises to get set up and warmed up before Team Week.

Here's what we'll do:

1. Confirm your GitHub sign-in.
2. Install the tools - VS Code, the Copilot CLI, and a few requirements.
3. Check you're ready in the Copilot CLI or the GitHub Copilot app.
4. Install the **Work IQ** MCP and put it to work against your real Microsoft 365 work.

<a id="emu"></a>

:::: details Don't know your GitHub login? Confirm your account

The Code altitude relies on GitHub Copilot, so it needs Copilot access on your Microsoft **EMU** (Enterprise Managed User) account. Do this first - without it, `copilot` won't run.

1. Go to [aka.ms/copilot/explore](https://aka.ms/copilot/explore) and select **Continue**.

   ![The single sign-on screen for Microsoft EMU, with a green Continue button](/img/emu-sso-continue.png)

2. Sign in with your Microsoft account.

3. You land on **GitHub Copilot Access**. Seeing this page means the EMU account works.

   ![The GitHub Copilot Access organization page, headed Using GitHub Copilot at Microsoft](/img/emu-copilot-access-landing.png)

4. Your username should be `<alias>_Microsoft`. Make note of this - you'll sign in with it.

::: details Using a personal GitHub account instead (optional)

On [aka.ms/copilot](https://aka.ms/copilot), under **"Optional: Would you also like to use GitHub Copilot with your own personal GitHub account?"**, select **Yes, show me how** and follow the linking steps.

![The optional prompt asking whether you would also like to use GitHub Copilot with your own personal GitHub account, with a Yes, show me how button](/img/copilot-personal-account-option.png)

Once linked, navigate to [github.com/settings/copilot/features](https://github.com/settings/copilot/features). Make sure you're signed in with your personal GitHub account, then set **Usage billed to** to **Microsoft Open Source**.

![The GitHub Copilot settings page with Usage billed to set to Microsoft Open Source](/img/copilot-billing-microsoft-open-source.png)

:::

::::

## Set up VS Code + Copilot

The **Check with** commands run in any terminal: PowerShell, Command Prompt, Windows Terminal, or the built-in terminal in VS Code (**View → Terminal**). It makes no difference which.

| Requirement | Get it from | Check with |
| --- | --- | --- |
| **GitHub EMU access** | [Above](#emu). Do this first | |
| **Node** | [nodejs.org](https://nodejs.org/) | `node --version` |
| **Python 3** | [python.org/downloads](https://www.python.org/downloads/) | `python --version` |
| **Git** | [git-scm.com](https://git-scm.com/install/windows) | `git --version` |
| **GitHub Copilot CLI** | `npm install -g @github/copilot` | `copilot --version` |
| **VS Code** | [code.visualstudio.com](https://code.visualstudio.com/) | Skip the next two rows if you'd rather stay in the terminal |
| **GitHub Copilot** extension | [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) | Listed under Extensions |
| **GitHub Copilot Chat** extension | [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) | Chat panel opens and is signed in |

The table above is the complete list - once those are installed, there's nothing extra to `pip install` or set up.

**Check you're ready:** pick the surface you'll use.

<ReadyCheck>
<template #cli>

1. Open a terminal and run `copilot`.

2. In the prompt box, type `/login`.

   ![The Copilot CLI prompt box with /login entered](/img/cli-login.png)

3. At **What account do you want to log into?**, choose:
   - **Option 1** - your org account, for your **EMU** login.
   - **Option 2** - a linked personal account.

   ![The Copilot CLI login prompt asking which account type to log into, with the org and linked-account options](/img/cli-account-type.png)

4. At **How do you want to sign in?**, select **Sign in with your browser (recommended)**.

   If you're prompted to sign in to your **EMU** account, enter your address like `<alias>_Microsoft`.

5. If prompted **Do you trust the files in this folder?**, select either option 1 or 2.

   ![The Copilot CLI prompt asking whether you trust the files in this folder](/img/cli-folder-trust.png)

6. Press <kbd>Esc</kbd> to start a new session.

7. At the prompt, enter:

   ```text
   Reply with the word ready and nothing else
   ```

   ![The Copilot CLI replying with the word ready](/img/cli-prompt-response.png)

**You're ready when** it replies `ready`.

</template>
<template #app>

1. Open VS Code.

2. Select the **user icon** in the bottom-left corner, then **Sign in to use GitHub Copilot**.

   ![The VS Code account menu with "Sign in to use GitHub Copilot" highlighted](/img/app-sign-in.png)

3. Sign in based on your account type:
   - **EMU account** - enter your `<alias>_Microsoft` address, then select **Sign in with your identity provider**.
   - **Personal account** - enter your GitHub credentials.

4. In the top-right corner, select **Open in Agents**.

   ![The VS Code toolbar with the Open in Agents button highlighted](/img/app-open-in-agents.png)

5. Choose a workspace. We recommend **Local** to start - you can change this later.

6. Select **Select…** to pick a folder location.

   ![The workspace picker with the Select button for choosing a folder](/img/app-select-folder.png)

   If you chose Local, we recommend one of these folders:
   - `C:\Users\<user>\Documents`
   - `C:\Users\<user>\OneDrive - Microsoft\Documents`

7. When prompted, select **Trust folder & Continue**.

   ![The Trust folder & Continue prompt](/img/app-trust-folder.png)

8. In the prompt window, enter:

   ```text
   Reply with the word ready and nothing else
   ```

   ![The GitHub Copilot app replying with the word ready](/img/app-ready-response.png)

**You're ready when** it replies `ready`.

</template>
</ReadyCheck>

::: tip Leave the model on Auto
No scenario depends on a particular model. Auto routes each task based on what you're doing, current system health, and model performance. You can change it any time - by typing `/model` in the CLI, or by selecting a model from within the prompt window in the GitHub Copilot app - but we recommend leaving it on Auto unless you have a reason to switch.
:::

## Install the Work IQ MCP

Work IQ grounds Copilot in your real Microsoft 365 work - mail, calendar, Teams, and files. Install it as an MCP plugin, then try it out.

<ReadyCheck>
<template #cli>

1. Start a new session.

2. Add the Work IQ marketplace:

   ```text
   /plugin marketplace add microsoft/work-iq
   ```

3. Install the plugin:

   ```text
   /plugin install workiq@work-iq
   ```

4. Confirm the skill installed:

   ```text
   /skills list
   ```

5. Scroll down and look for **workiq** under **plugin**.

   ![The Copilot CLI skills list showing workiq listed under plugin](/img/workiq-confirm.png)

</template>
<template #app>

1. In the GitHub Copilot app, select **Plugins**.

   ![The GitHub Copilot app with the Plugins option selected](/img/app-workiq-plugins.png)

2. In **Search plugin marketplace…**, type `workiq`.

3. Select **Install** next to the **workiq** plugin.

   ![The plugin marketplace with the workiq plugin and its Install button](/img/app-workiq-install.png)

   > **Note:** If you hit an error like `Failed to install plugin 'workiq': spawn git ENOENT`, make sure you've installed [Git](https://git-scm.com/install/windows).

4. In the **Trust plugins…** message that pops up, select **Trust**.

   ![The Trust plugins confirmation message with the Trust button](/img/app-workiq-trust.png)

5. Navigate back to **Plugins** - workiq should now show as installed.

   ![The Plugins list showing workiq installed and enabled](/img/app-workiq-enabled.png)

</template>
</ReadyCheck>

## Now put Work IQ to work

With **workiq** installed, start a new session and try a prompt. For example:

```text
Look at my meetings for the rest of this week. For each one, tell me who the key attendee is, find the most recent email thread with that person, and flag any meeting where I owe someone a reply before we meet.
```

Or:

```text
Build me a single-page HTML dashboard of my week: meetings by day, who I'm meeting most, and unread email count by sender. Save it and open it.
```

From here, take it any direction you like - with Work IQ installed, Copilot is usable against Git and any of your repos, grounded in your real Microsoft 365 work.

<div class="callout-bubble is-important">
<span class="callout-bubble-icon">🎖️</span>
<div>

**Last step - get your Pilot Certification.** Once it works, take a screenshot of a prompt you ran against Work IQ (or something you built with it) as your proof.

<a class="callout-bubble-cta" href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR_Bd56YTwD1Gsu3sHRReLNdUQ0lPVkNOTEpaVkMxNkxHMkxXVEZOVVFXSy4u" target="_blank" rel="noreferrer">Upload your proof and get certified →</a>

</div>
</div>
