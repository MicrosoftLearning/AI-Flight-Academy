---
title: Downloads
---

# Downloads

Everything you need for **Scenario 1 · The Digital Twin**. Grab what your path needs — you can download a single folder without cloning the whole repo.

::: tip Fastest way to get a folder
Paste the folder's GitHub URL into [download-directory.github.io](https://download-directory.github.io/) and it hands you a `.zip`. Or clone the repo once and use the `Allfiles` folder locally.
:::

## 🟢 Base · Cowork

| What | Why you need it | Get it |
| --- | --- | --- |
| **Twin Forge skill** | Bootstraps a v0.1 twin in ~12 minutes. Upload it into Cowork and say *"Start Twin Forge."* | [SKILL.md](https://github.com/MicrosoftLearning/Team-Week-Imagineer-Hack/blob/main/Allfiles/twin-forge/SKILL.md) |
| **Marcus Webb persona pack** | Path B data if you'd rather not use your own. | [Allfiles/persona-pack](https://github.com/MicrosoftLearning/Team-Week-Imagineer-Hack/tree/main/Allfiles/persona-pack) |

**Installing Twin Forge:** Cowork → **Customize** → **Skills** → **Add ▾** → **Upload skill** → pick `SKILL.md`. Then **start a new session** — skills are discovered at session start.

::: warning Upload the .md on its own
Tested on a live tenant: `.zip` uploads silently fail. `SKILL.md` is fully self-contained, so there's nothing else to bundle.
:::

Or drop it in OneDrive at `/Documents/Cowork/skills/twin-forge/SKILL.md`.

## 🟣 Advanced · Scout / GitHub Copilot

| What | Why you need it | Get it |
| --- | --- | --- |
| **Starter repo** | Schema, MCP server skeleton, council runner, test harness. The contract — not the solution. | [Allfiles/digital-twin-starter](https://github.com/MicrosoftLearning/Team-Week-Imagineer-Hack/tree/main/Allfiles/digital-twin-starter) |
| **Marcus Webb persona pack** | Path B data. | [Allfiles/persona-pack](https://github.com/MicrosoftLearning/Team-Week-Imagineer-Hack/tree/main/Allfiles/persona-pack) |

```bash
git clone https://github.com/MicrosoftLearning/Team-Week-Imagineer-Hack.git
cd Team-Week-Imagineer-Hack/Allfiles/digital-twin-starter
```

::: warning Copy before you edit
Work in a copy of `digital-twin-starter`, not in the repo folder itself.
:::

## 🧑‍🏫 Facilitators

- [Facilitator kit](/facilitator/) — role cards, interview script, coach playbook
- [Run of show](/how-it-works/run-of-show)
- **Spoilers:** `Allfiles/persona-pack/calendar/summary-stats.md` gives away Marcus's planted contradictions. Hand it to stuck teams only.
