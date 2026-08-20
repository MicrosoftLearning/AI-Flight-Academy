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
  <a class="lab-card" href="/AI-Flight-Academy/downloads/my-twin-SKILL.md" download="SKILL.md">
    <span class="lab-card-emoji">🧬</span>
    <span class="lab-card-title">Your twin</span>
    <span class="lab-card-desc">Reads your mail, Teams and calendar through Work IQ, then writes and installs itself. Upload this file straight into Cowork.</span>
    <span class="lab-card-cta">Download SKILL.md →</span>
  </a>
</div>

**Installing it:** Cowork → **Customize** → **Skills** → **Add ▾** → **Upload skill** → pick the downloaded `SKILL.md`. Then **start a new task** – skills are only discovered when a task begins.

::: warning Upload the .md, not a .zip
Tested on a live tenant: `.zip` skill uploads fail silently. `SKILL.md` is self-contained, so there's nothing else to bundle.
:::

### 🔵 Scout

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/my-twin-scout.zip" download>
    <span class="lab-card-emoji">🧬</span>
    <span class="lab-card-title">Your twin</span>
    <span class="lab-card-desc">The skill, plus one worked example of something built on it. Unzip and import the folder.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**Installing it:** unzip it, then Scout → **Extensions** → **Import** → drag in the **`my-twin` folder**. Then **start a new session** – skills are only discovered at session start. Say **`set up my twin`**.

::: warning Import the folder, not the file
The templates and the example extension sit next to `SKILL.md`. Dragging in the file on its own leaves them behind.
:::

The page needs **Node 18+** – check with `node --version`. Without it the twin still works; you just won't get the page.

### 🟣 Code

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/twin-code-starter.zip" download>
    <span class="lab-card-emoji">📦</span>
    <span class="lab-card-title">Starter</span>
    <span class="lab-card-desc">The twin, one call that reaches it from Python, a worked example, and an MCP server.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/avery-persona-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Avery Washington</span>
    <span class="lab-card-desc">Synthetic persona data, same pack.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

Unzip and open the folder in VS Code. The Copilot CLI finds the twin in `.github/skills/` on its own – there is nothing to register.

::: details One-line setup in a terminal
**PowerShell:**

```powershell
$u='https://microsoftlearning.github.io/AI-Flight-Academy/downloads/twin-code-starter.zip'
$z="$env:TEMP\tcs.zip"; iwr $u -OutFile $z
Expand-Archive $z -DestinationPath "$HOME\twin-code" -Force
code "$HOME\twin-code\twin-code-starter"
```

**macOS / Linux:**

```bash
curl -L -o /tmp/tcs.zip https://microsoftlearning.github.io/AI-Flight-Academy/downloads/twin-code-starter.zip
unzip -q /tmp/tcs.zip -d ~/twin-code
code ~/twin-code/twin-code-starter
```
:::
## Scenario 2 · Greenlight

Seat a **council of audiences** over an **asset** so the verdicts split, then have the room decide what to build. All three altitudes share the same **data pack** – five sample assets, four example audience cards, and a style guide.

### 🟢 Cowork

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/the-greenlight.zip" download>
    <span class="lab-card-emoji">🟢</span>
    <span class="lab-card-title">Greenlight</span>
    <span class="lab-card-desc">The Greenlight skill with a council that seats new audiences, convenes for reviews, and greenlights assets.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/greenlight-data-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Data pack</span>
    <span class="lab-card-desc">Five sample assets, four audience cards, and a style guide. The assets the council scores.</span>
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
    <span class="lab-card-desc">The assets the council scores.</span>
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
