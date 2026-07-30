---
title: Downloads
---

# Downloads

Everything for **Scenario 1 · The Digital Twin**. Files download straight from this site — no GitHub account, no cloning.

## 🟢 Cowork

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/twin-forge-SKILL.md" download="SKILL.md">
    <span class="lab-card-emoji">⚡</span>
    <span class="lab-card-title">Twin Forge</span>
    <span class="lab-card-desc">Interviews you and drafts your first twin. Upload this file straight into Cowork.</span>
    <span class="lab-card-cta">Download SKILL.md →</span>
  </a>
  <a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/avery-persona-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Avery Washington</span>
    <span class="lab-card-desc">Synthetic persona — inbox, calendar, goals. Use instead of your own data.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**Installing Twin Forge:** Cowork → **Customize** → **Skills** → **Add ▾** → **Upload skill** → pick the downloaded `SKILL.md`. Then **start a new session** — skills are only discovered at session start.

::: warning Upload the .md, not a .zip
Tested on a live tenant: `.zip` skill uploads fail silently. `SKILL.md` is self-contained, so there's nothing else to bundle.
:::

## 🟣 Code

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/digital-twin-starter.zip" download>
    <span class="lab-card-emoji">📦</span>
    <span class="lab-card-title">Starter repo</span>
    <span class="lab-card-desc">Schema, MCP skeleton, council runner, test harness, and a VS Code workspace file.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/avery-persona-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Avery Washington</span>
    <span class="lab-card-desc">Synthetic persona data, same pack.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

Unzip, then open `digital-twin.code-workspace` in VS Code — it comes with agent mode and the right extension recommendations already set.

::: details One-line setup in a terminal
**PowerShell:**

```powershell
$u='https://microsoftlearning.github.io/Team-Week-Imagineer-Hack/downloads/digital-twin-starter.zip'
$z="$env:TEMP\dts.zip"; iwr $u -OutFile $z
Expand-Archive $z -DestinationPath "$HOME\digital-twin" -Force
code "$HOME\digital-twin\digital-twin-starter\digital-twin.code-workspace"
```

**macOS / Linux:**

```bash
curl -L -o /tmp/dts.zip https://microsoftlearning.github.io/Team-Week-Imagineer-Hack/downloads/digital-twin-starter.zip
unzip -q /tmp/dts.zip -d ~/digital-twin
code ~/digital-twin/digital-twin-starter/digital-twin.code-workspace
```
:::

## 🧑‍🏫 Facilitators

- [Facilitator kit](/facilitator/) — role cards, interview script, coach playbook
- [Run of show](/how-it-works/run-of-show)
- **Spoilers:** inside the persona pack, `calendar/summary-stats.md` gives away the planted contradictions. Hand it to stuck teams only.