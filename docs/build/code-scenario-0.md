---
title: Flight Clearance - Code
navbar: false
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# 🛫 Flight Clearance

::: warning 🚧 Draft - the video and the form aren't final yet
:::

This guide gets you ready to fly the **Code altitude** for our AI Flight Academy session during Team Week. It assumes you're starting fresh: you'll set up your tools, then run a short test flight that proves everything works against your real Microsoft 365 work. At the end you'll take a screenshot and fill out a quick form to get certified.

Two parts:

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="#set-up-github-copilot">
    <span class="lab-card-emoji">🛠️</span>
    <span class="lab-card-title">1 · Systems check</span>
    <span class="lab-card-desc">Confirm your GitHub sign-in, install the tools, and check you're ready in the Copilot CLI or the VS Code Agents window.</span>
    <span class="lab-card-cta">Start the systems check →</span>
  </a>
  <a class="lab-card" href="#weekly-status-report-with-work-iq">
    <span class="lab-card-emoji">🎯</span>
    <span class="lab-card-title">2 · Test flight</span>
    <span class="lab-card-desc">Install the Work IQ plugin, then use it to build a weekly status report from your real Microsoft 365 work.</span>
    <span class="lab-card-cta">Start the test flight →</span>
  </a>
</div>

<div class="callout-bubble">
<span class="callout-bubble-icon">⚡</span>

**Already a GitHub guru?** Skim the prerequisites to verify your setup, then [skip ahead to the test flight](#weekly-status-report-with-work-iq).

</div>

## Set up GitHub Copilot

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

### Prerequisites

Install each prerequisite for the AI Flight Academy Code altitude, then confirm it with the command in **Check with** - run in any terminal (PowerShell, Command Prompt, Windows Terminal, or VS Code's built-in terminal via **View → Terminal**).

| Requirement | Get it from | Check with |
| --- | --- | --- |
| **GitHub account with GitHub Copilot access** | [Above](#emu). Do this first | |
| **Node** | [nodejs.org](https://nodejs.org/) | `node --version` |
| **Python 3** | [python.org/downloads](https://www.python.org/downloads/) | `python --version` |
| **Git** | [git-scm.com](https://git-scm.com/install/windows) | `git --version` |
| **GitHub Copilot CLI** | `npm install -g @github/copilot` | `copilot --version` |
| **VS Code** | [code.visualstudio.com](https://code.visualstudio.com/) | `code --version` |
| **GitHub Copilot app** | [github.com/features/ai/github-app](https://github.com/features/ai/github-app) | |

### Check you're ready

Pick the GitHub Copilot surface that fits your workflow. You're not limited to the ones below either - prefer working in the VS Code editor? Go for it.

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

::: info Coming soon
Steps for the GitHub Copilot app are on the way. For now, use the GitHub Copilot CLI or the VS Code Agents window.
:::

</template>
<template #vscode>

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

   ![The VS Code Agents window replying with the word ready](/img/app-ready-response.png)

**You're ready when** it replies `ready`.

</template>
</ReadyCheck>

::: tip Leave the model on Auto
No scenario depends on a particular model. Auto routes each task based on what you're doing, current system health, and model performance. You can change it any time - by typing `/model` in the CLI, or by selecting a model from within the prompt window in the VS Code Agents window - but we recommend leaving it on Auto unless you have a reason to switch.
:::

## Weekly status report with Work IQ

The test flight: install the Work IQ plugin, then use it to pull a week of your real meetings, email, and Teams activity and turn it into a status report you could actually send.

::: info The minimum to get certified
Install the plugin (step 1), run one prompt against Work IQ, and screenshot the response (step 2). Steps 3 to 6 are extra - they turn that response into a full weekly status report.
:::

### 1 · Install the Work IQ plugin

Work IQ grounds Copilot in your real Microsoft 365 work - mail, calendar, Teams, and files. Install it as a plugin, then confirm it loaded.

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

::: info Coming soon
Work IQ install steps for the GitHub Copilot app are on the way. For now, use the GitHub Copilot CLI or the VS Code Agents window.
:::

</template>
<template #vscode>

1. In the VS Code Agents window, select **Plugins**.

   ![The VS Code Agents window with the Plugins option selected](/img/app-workiq-plugins.png)

2. In **Search plugin marketplace…**, type `workiq`.

3. Select **Install** next to the **workiq** plugin.

   ![The plugin marketplace with the workiq plugin and its Install button](/img/app-workiq-install.png)

   > **Note:** If you hit an error like `Failed to install plugin 'workiq': spawn git ENOENT`, make sure you've installed [Git](https://git-scm.com/install/windows).

4. In the **Trust plugins…** message that pops up, select **Trust**.

   ![The Trust plugins confirmation message with the Trust button](/img/app-workiq-trust.png)

5. Navigate back to **Plugins** - workiq should now show as installed.

   ![The Plugins list showing workiq installed and enabled](/img/app-workiq-enabled.png)

> **Note:** Installing Work IQ through the VS Code Agents window also makes it available in the GitHub Copilot Chat harness in VS Code - the same plugin works in both.

</template>
</ReadyCheck>

### 2 · Gather your week's meetings

Start a new session and pull the data your status report is built on. Ask Work IQ about your meetings from the past week:

```text
Summarize all my meetings from the past 7 days. For each meeting, include the title, date, attendees, and key discussion points or decisions made.
```

Review what Copilot returns. This is the foundation of your status report - it captures what you discussed, decided, and committed to throughout the week.

> **Note:** If you're running in the VS Code Agents window after installing Work IQ for the first time, you may get a prompt to authenticate. Select the **authenticate** hyperlink and sign in with your Microsoft account.

![The VS Code Agents window prompt with an authenticate hyperlink to sign in](/img/app-workiq-authenticate.png)

> **Tip:** Work IQ pulls from your Microsoft 365 meeting data when available. Meetings without notes or summaries show basic calendar info only.

<div class="callout-bubble is-important">
<span class="callout-bubble-icon">🎖️</span>
<div>

**That's the bar - get your Pilot Certification.** You've run a prompt against Work IQ and have a response on screen. Screenshot it as your proof - that's all you need to be certified. Everything below is extra.

<a class="callout-bubble-cta" href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR_Bd56YTwD1Gsu3sHRReLNdUQ0lPVkNOTEpaVkMxNkxHMkxXVEZOVVFXSy4u" target="_blank" rel="noreferrer">Upload your proof and get certified →</a>

</div>
</div>

Want the full report? Keep going.

### 3 · Pull email highlights

Next, gather the important email threads from the week:

```text
What are the most important email threads I was involved in over the past 7 days? Focus on threads where decisions were made, actions were assigned to me, or I was asked to follow up on something.
```

This surfaces the email conversations that matter - not every newsletter or notification, but the threads with real work content.

### 4 · Check Teams discussions

Pull relevant Teams activity to capture what happened in your channels:

```text
Summarize any important Teams messages or channel discussions I was part of in the past 7 days. Highlight anything where I was mentioned, action items were assigned, or key decisions were made.
```

### 5 · Generate your weekly status report

Now bring it all together. Ask Copilot to synthesize everything into a structured report:

```text
Based on everything we just gathered from my meetings, emails, and Teams discussions this past week, create a weekly status report with these sections: 1) Key Accomplishments - what was completed or decided. 2) In Progress - work that's actively underway. 3) Action Items - things I need to follow up on, with owners and due dates if mentioned. 4) Risks or Blockers - anything flagged as a concern. 5) Next Week Focus - what I should prioritize based on what's coming up. Format it professionally so I could share it with my manager or stakeholders.
```

Review the report Copilot generates. It should be a clean, organized summary drawn from your actual work data - not a generic template.

### 6 · Save it as a reusable prompt

This is something you'll want every week, so save it as a reusable prompt file you can run with a single command. Create `weekly-status.prompt.md` in your `.github/prompts/` directory (or wherever your team stores prompt files):

```text
Create a file called weekly-status.prompt.md with the following content: A prompt that queries Work IQ for the past 7 days of meetings, emails, and Teams discussions, then synthesizes a weekly status report with sections for Key Accomplishments, In Progress, Action Items, Risks/Blockers, and Next Week Focus. Format it as a reusable Copilot prompt file.
```

Now every Friday you can run this prompt to generate your status report in minutes instead of assembling it by hand.
