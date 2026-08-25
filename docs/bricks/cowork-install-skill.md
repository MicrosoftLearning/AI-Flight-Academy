---
title: Install a provided skill
---

<!-- markdownlint-disable MD013 MD025 -->

# Install a provided skill

**Tool:** Cowork

<!-- #region guide -->
Every Cowork scenario starts the same way: you download a skill and get it running. A **skill** is a set of instructions Cowork follows – it ships either as a single `SKILL.md` or as a `.zip` folder, and you upload it once.

## Steps

1. Download the skill from the scenario's build page. Leave it exactly as it downloads – a `.md` file, or a `.zip` (don't unzip it).
2. Open **M365 Copilot** at `m365.cloud.microsoft` and select the **Cowork** tab.
3. In the left menu, choose **Customize → Skills**.
4. Select the arrow next to **Add**, then **Upload skill**, and drag in the file the build page gave you.
5. Start a **new session** – Cowork only discovers skills when a session begins.
6. Name the skill in your first message so Cowork loads it, for example: *"Introduce yourself."*

**You'll know it worked when...** the skill appears under **Your skills** on the Customize page, and it responds when you name it.

::: warning The two things that trip everyone up
- **If it's a `.zip`, upload the whole zip** – not the `SKILL.md` inside it. The zip carries the reference files the skill needs; a lone `SKILL.md` from inside a zip can't see them.
- **Start a new session after installing.** A skill added mid-session stays invisible until you begin a fresh one.
:::

## Apply it to your scenario

The build page names the skill to install and the first thing to say once it's loaded. Install it, start a new session, and say hello before anything else.
<!-- #endregion guide -->
