---
title: Downloads
---

# Downloads

::: warning 🚧 Work in progress
These files are still being tested and may be updated before the event. Re-download on the day.
:::

Everything for AI Flight Academy scenarios. Files download straight from this site – no GitHub account, no cloning.

## Scenario 1 · The Digital Twin

### 🟢 Cowork

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/twin-forge-SKILL.md" download="SKILL.md">
    <span class="lab-card-emoji">⚡</span>
    <span class="lab-card-title">Twin Forge</span>
    <span class="lab-card-desc">Interviews you, reads your sent mail, and installs your twin. Upload this file straight into Cowork.</span>
    <span class="lab-card-cta">Download SKILL.md →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/avery-persona-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Avery Washington</span>
    <span class="lab-card-desc">Synthetic persona – inbox, calendar, goals. Use instead of your own data.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**Installing Twin Forge:** Cowork → **Customize** → **Skills** → **Add ▾** → **Upload skill** → pick the downloaded `SKILL.md`. Then **start a new session** – skills are only discovered at session start.

::: warning Upload the .md, not a .zip
Tested on a live tenant: `.zip` skill uploads fail silently. `SKILL.md` is self-contained, so there's nothing else to bundle.
:::

### 🟣 Code

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/digital-twin-starter.zip" download>
    <span class="lab-card-emoji">📦</span>
    <span class="lab-card-title">Starter repo</span>
    <span class="lab-card-desc">Schema, MCP skeleton, council runner, test harness, and a VS Code workspace file.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/avery-persona-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Avery Washington</span>
    <span class="lab-card-desc">Synthetic persona data, same pack.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

Unzip, then open `digital-twin.code-workspace` in VS Code – it comes with agent mode and the right extension recommendations already set.

::: details One-line setup in a terminal
**PowerShell:**

```powershell
$u='https://microsoftlearning.github.io/AI-Flight-Academy/downloads/digital-twin-starter.zip'
$z="$env:TEMP\dts.zip"; iwr $u -OutFile $z
Expand-Archive $z -DestinationPath "$HOME\digital-twin" -Force
code "$HOME\digital-twin\digital-twin-starter\digital-twin.code-workspace"
```

**macOS / Linux:**

```bash
curl -L -o /tmp/dts.zip https://microsoftlearning.github.io/AI-Flight-Academy/downloads/digital-twin-starter.zip
unzip -q /tmp/dts.zip -d ~/digital-twin
code ~/digital-twin/digital-twin-starter/digital-twin.code-workspace
```
:::

## Scenario 2 · Greenlight

Seat a **council of audiences** over a piece of content so the verdicts split, then have the room decide what to build. All three altitudes share the same **data pack** – five articles, four example audience cards, and a style guide.

### 🟢 Cowork

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/the-greenlight.zip" download>
    <span class="lab-card-emoji">🟢</span>
    <span class="lab-card-title">Greenlight</span>
    <span class="lab-card-desc">The Greenlight skill with a council that seats new audiences, convenes for reviews, and greenlights content.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/greenlight-data-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Data pack</span>
    <span class="lab-card-desc">Five types of content, four audience cards, and a style guide. The content the council scores.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**Installing Greenlight:** Cowork → **Customize** → **Skills** → **Add ▾** → **Upload skill** → pick the downloaded `SKILL.md`. Then **start a new session** – skills are only discovered at session start. Then point Cowork to the data pack and say **`seat the council and review P4.`**

### 🟣 Code

<div class="lab-grid lab-grid-3">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/the-greenlight-starter.zip" download>
    <span class="lab-card-emoji">📦</span>
    <span class="lab-card-title">Starter repo</span>
    <span class="lab-card-desc">Council runner, deterministic checks, seat-as-data example, and a VS Code workspace file.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/the-greenlight.zip" download>
    <span class="lab-card-emoji">🟢</span>
    <span class="lab-card-title">The Greenlight skill</span>
    <span class="lab-card-desc">Same skill – the seat / convene / greenlight verbs and the solo-critic control.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/greenlight-data-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Data pack</span>
    <span class="lab-card-desc">The content the council scores.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

Unzip all three so `the-greenlight-starter`, `the-greenlight`, and `data-pack` sit **side by side** – the runner and `checks.py` expect the data pack as a sibling. Then open `the-greenlight.code-workspace` in VS Code.

::: details One-line setup in a terminal
**PowerShell:**

```powershell
$base='https://microsoftlearning.github.io/AI-Flight-Academy/downloads'
$dest="$HOME\the-greenlight"
foreach ($n in 'the-greenlight-starter','the-greenlight','greenlight-data-pack') {
  $z="$env:TEMP\$n.zip"; iwr "$base/$n.zip" -OutFile $z
  Expand-Archive $z -DestinationPath $dest -Force
}
code "$dest\the-greenlight-starter\the-greenlight.code-workspace"
```

**macOS / Linux:**

```bash
base=https://microsoftlearning.github.io/AI-Flight-Academy/downloads
dest=~/the-greenlight
for n in the-greenlight-starter the-greenlight greenlight-data-pack; do
  curl -L -o /tmp/$n.zip $base/$n.zip
  unzip -q /tmp/$n.zip -d $dest
done
code $dest/the-greenlight-starter/the-greenlight.code-workspace
```
:::

## 🧑‍🏫 Facilitators

- [Facilitator kit](/facilitator/) – role cards, interview script, coach playbook
- [Run of show](/how-it-works/run-of-show)
- **Spoilers:** inside the persona pack, `calendar/summary-stats.md` gives away the planted contradictions. Hand it to stuck teams only.