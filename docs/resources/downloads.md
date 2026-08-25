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

<a class="lab-card" href="/AI-Flight-Academy/downloads/twin-code-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">A fictional twin, ready to answer. One call that reaches it from Python, a worked example, and an MCP server.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

Unzip and open the folder in VS Code. The Copilot CLI finds the twin in `.github/skills/` on its own – there is nothing to register.

**The twin arrives pre-populated with fictional data** – a made-up engineer at a made-up company – so it answers straight away and no personal data is involved. `DISCLAIMER.md` in the starter covers what's invented and how to point it at your own work afterwards.

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
## Scenario 2 · Dispatch

Seat a **room of Global Skilling teams** over an incoming **skilling request** so the positions split, then have the room land one routing decision — who fields it, who it's for, and a plan of deliverables built once and reused across teams. All three altitudes share the same **data pack** — sample requests, the team cards, and the routing policy.

### 🟢 Cowork · 🔵 Scout

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch.zip" download>
    <span class="lab-card-emoji">🟢</span>
    <span class="lab-card-title">Dispatch</span>
    <span class="lab-card-desc">The Dispatch skill — the room that seats teams, takes positions, and lands one routing decision.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/dispatch-data-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Data pack</span>
    <span class="lab-card-desc">Sample requests, the Global Skilling team cards, and the routing policy.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**Cowork:** **Customize** → **Skills** → **Add ▾** → **Upload skill** → the whole `the-dispatch.zip`. Start a **new session**, attach the data pack, and say **`seat the room and dispatch RQ-01.`**

**Scout:** unzip, then **Extensions** → **Import** → drag in the `the-dispatch` **folder**. Start a new session and point it at the `dispatch-data` folder.

### 🟣 Code

<div class="lab-grid lab-grid-3">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch-starter.zip" download>
    <span class="lab-card-emoji">📦</span>
    <span class="lab-card-title">Starter repo</span>
    <span class="lab-card-desc">The dashboard, a seated room, the intake gate, and the MCP server.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch.zip" download>
    <span class="lab-card-emoji">🟢</span>
    <span class="lab-card-title">The Dispatch skill</span>
    <span class="lab-card-desc">Same skill – the seat / dispatch verbs and the single-triager control.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/dispatch-data-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Data pack</span>
    <span class="lab-card-desc">The requests the room routes.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

Unzip all three so `the-dispatch-starter`, `the-dispatch`, and `dispatch-data` sit **side by side** – the dashboard and `check_content.py` expect the data pack as a sibling. Then open `the-dispatch.code-workspace` in VS Code.

::: details One-line setup in a terminal
**PowerShell:**

```powershell
$base='https://microsoftlearning.github.io/AI-Flight-Academy/downloads'
$dest="$HOME\the-dispatch"
foreach ($n in 'the-dispatch-starter','the-dispatch','dispatch-data-pack') {
  $z="$env:TEMP\$n.zip"; iwr "$base/$n.zip" -OutFile $z
  Expand-Archive $z -DestinationPath $dest -Force
}
code "$dest\the-dispatch-starter\the-dispatch.code-workspace"
```

**macOS / Linux:**

```bash
base=https://microsoftlearning.github.io/AI-Flight-Academy/downloads
dest=~/the-dispatch
for n in the-dispatch-starter the-dispatch dispatch-data-pack; do
  curl -L -o /tmp/$n.zip $base/$n.zip
  unzip -q /tmp/$n.zip -d $dest
done
code $dest/the-dispatch-starter/the-dispatch.code-workspace
```
:::

## Scenario 3 · The Ambassador

A **half-built recognition program** that runs, ships nine data files, and reads one of them. Cowork and Scout share the same skill; Code gets a starter with the data already wired in.

### 🟢 Cowork · 🔵 Scout

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-skill.zip" download>
    <span class="lab-card-emoji">🎖️</span>
    <span class="lab-card-title">Ambassador</span>
    <span class="lab-card-desc">The half-built skill, plus <code>references/PLAYBOOK.md</code> — the ladder, the eight rules, and what a recommendation has to contain.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-program-data.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Program data</span>
    <span class="lab-card-desc">72 fictional candidates and ~2,000 evidence records across nine CSVs.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**Cowork:** **Customize** → **Skills** → **Add ▾** → **Upload skill** → the whole `ambassador-skill.zip`. Start a **new session**, attach `CandidateProfiles.csv`, and say **`run the ambassador program`**.

**Scout:** unzip, then **Extensions** → **Import** → drag in the `ambassador` **folder**. Start a new session and point it at the `program-data` folder.

### 🟣 Code

<a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">Runs on the first command. Data and playbook included — nothing else to download.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

Self-contained. Unzip, then:

```bash
cd ambassador-starter
python run.py
```

Python 3.10+, no dependencies.

