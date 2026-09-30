---
title: Downloads
outline: false
aside: false
---

# Downloads

Everything for AI Flight Academy scenarios. Files download straight from this site - no GitHub account, no cloning.

<DownloadPicker />

<DownloadPane track="cowork" scenario="scenario-1">

## 🧬 The Digital Twin · 🟢 Cowork

A portable spec of how you work. It reads your mail, Teams and calendar through Work IQ, then writes and installs itself.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/my-twin-SKILL.md" download="SKILL.md">
    <span class="lab-card-emoji">🧬</span>
    <span class="lab-card-title">Your twin</span>
    <span class="lab-card-desc">Reads your mail, Teams and calendar through Work IQ, then writes and installs itself. Upload this file straight into Cowork.</span>
    <span class="lab-card-cta">Download SKILL.md →</span>
  </a>
</div>

**Installing it:** Cowork → **Customize** → **Skills** → **Add ▾** → **Upload skill** → pick the downloaded `SKILL.md`. Then **start a new task** - skills are only discovered when a task begins.

[Full walkthrough →](/build/cowork-scenario-1)

</DownloadPane>

<DownloadPane track="scout" scenario="scenario-1">

## 🧬 The Digital Twin · 🔵 Scout

A portable spec of how you work. It reads your mail, Teams and calendar through Work IQ, then writes and installs itself.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/my-twin-scout.zip" download>
    <span class="lab-card-emoji">🧬</span>
    <span class="lab-card-title">Your twin</span>
    <span class="lab-card-desc">The skill, plus one worked example of something built on it. Unzip and import the folder.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**Installing it:** unzip it - you'll get a folder called `my-twin`. Then Scout → **Extensions** → **Import** → drag in the **`my-twin` folder**. Then **start a new session** - skills are only discovered at session start. Say **`set up my twin`**.

::: warning Import the folder, not the file
The templates and the example extension sit next to `SKILL.md`. Dragging in the file on its own leaves them behind.
:::

The page needs **Node 18+** - check with `node --version`. Without it the twin still works; you just won't get the page.

[Full walkthrough →](/build/scout-scenario-1)

</DownloadPane>

<DownloadPane track="code" scenario="scenario-1">

## 🧬 The Digital Twin · 🟣 Code

A portable spec of how you work, reachable from Python and over MCP.

<a class="lab-card" href="/AI-Flight-Academy/downloads/twin-code-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">A fictional twin, ready to answer. One call that reaches it from Python, a worked example, and an MCP server.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

Unzip and open the `twin-code-starter` folder in VS Code. The Copilot CLI finds the twin in `.github/skills/` on its own - there is nothing to register.

**The twin arrives pre-populated with fictional data** - a made-up engineer at a made-up company - so it answers straight away and no personal data is involved. `DISCLAIMER.md` in the starter covers what's invented and how to point it at your own work afterwards.

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

[Full walkthrough →](/build/code-scenario-1)

</DownloadPane>

<DownloadPane track="cowork" scenario="scenario-2">

## 🎛️ Dispatch · 🟢 Cowork

Seat a **room of Global Skilling teams** over an incoming **skilling request** so the positions split, then have the room land one routing decision - who fields it, who it's for, and a plan of deliverables built once and reused across teams.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch.zip" download>
    <span class="lab-card-emoji">🎛️</span>
    <span class="lab-card-title">Dispatch</span>
    <span class="lab-card-desc">The Dispatch skill - the room that seats teams, takes positions, and lands one routing decision.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/dispatch-data-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Data pack</span>
    <span class="lab-card-desc">Sample requests, the Global Skilling team cards, and the routing policy.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**Installing it:** **Customize** → **Skills** → **Add ▾** → **Upload skill** → the whole `the-dispatch.zip`. Start a **new session**, attach the data pack, and say **`seat the room and dispatch the agent governance request.`**

::: warning Upload the zip as it downloads
Cowork takes the archive directly - there's no need to unzip it first.
:::

[Full walkthrough →](/build/cowork-scenario-2)

</DownloadPane>

<DownloadPane track="scout" scenario="scenario-2">

## 🎛️ Dispatch · 🔵 Scout

Seat a **room of Global Skilling teams** over an incoming **skilling request** so the positions split, then have the room land one routing decision - who fields it, who it's for, and a plan of deliverables built once and reused across teams.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch.zip" download>
    <span class="lab-card-emoji">🎛️</span>
    <span class="lab-card-title">Dispatch</span>
    <span class="lab-card-desc">The Dispatch skill - the room that seats teams, takes positions, and lands one routing decision.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/dispatch-data-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Data pack</span>
    <span class="lab-card-desc">Sample requests, the Global Skilling team cards, and the routing policy.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**Installing it:** unzip `the-dispatch.zip`, then **Extensions** → **Import** → drag in the `the-dispatch` **folder**. Start a new session and point it at the `dispatch-data` folder.

::: warning Unzip the-dispatch.zip first
Different than Cowork, you must unzip and import the Dispatch skill folder, not the zip.
:::

[Full walkthrough →](/build/scout-scenario-2)

</DownloadPane>

<DownloadPane track="code" scenario="scenario-2">

## 🎛️ Dispatch · 🟣 Code

The room, the intake gate, and a dashboard that shows the positions splitting. All three downloads share the same data pack.

<div class="lab-grid lab-grid-3">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch-starter.zip" download>
    <span class="lab-card-emoji">📦</span>
    <span class="lab-card-title">Starter repo</span>
    <span class="lab-card-desc">The dashboard, a seated room, the intake gate, and the MCP server.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/the-dispatch.zip" download>
    <span class="lab-card-emoji">🎛️</span>
    <span class="lab-card-title">The Dispatch skill</span>
    <span class="lab-card-desc">Same skill - the seat / dispatch verbs and the single-triager control.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/dispatch-data-pack.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Data pack</span>
    <span class="lab-card-desc">The requests the room routes.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

Unzip all three so `the-dispatch-starter`, `the-dispatch`, and `dispatch-data` sit **side by side** - the dashboard and `check_content.py` expect the data pack as a sibling. Then open `the-dispatch.code-workspace` in VS Code.

::: warning Watch for the folder inside the folder
Each zip already contains its own folder, so Windows **Extract All** wraps it in a second one - you end up with `the-dispatch-starter\the-dispatch-starter\`. Drag the inner folder out and delete the wrapper. All three have to sit side by side or the dashboard won't find the data.
:::

::: details One-line setup in a terminal
This lands all three as correct siblings for you - nothing to unzip by hand.

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

[Full walkthrough →](/build/code-scenario-2)

</DownloadPane>

<DownloadPane track="cowork" scenario="scenario-3">

## 🎖️ The Ambassador · 🟢 Cowork

A **working cohort picker** that ships nine data files and reads one of them. Find who multiplies others, and show why.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-skill.zip" download>
    <span class="lab-card-emoji">🎖️</span>
    <span class="lab-card-title">Ambassador</span>
    <span class="lab-card-desc">The skill, the definition it runs on, and three alternative definitions.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-program-data.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Program data</span>
    <span class="lab-card-desc">72 fictional candidates and ~2,000 evidence records across nine CSVs.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**Installing it:** **Customize** → **Skills** → **Add ▾** → **Upload skill** → the whole `ambassador-skill.zip`. Start a **new session**, attach all nine CSVs from `program-data`, and say **`using the ambassador skill, who should be in the next cohort?`**

::: warning Upload the folder, not just the SKILL.md
`SKILL.md` on its own won't work. `references/` sits beside it and holds the definition and the playbook.
:::

[Full walkthrough →](/build/cowork-scenario-3)

</DownloadPane>

<DownloadPane track="scout" scenario="scenario-3">

## 🎖️ The Ambassador · 🔵 Scout

A **working cohort picker** that ships nine data files and reads one of them. Find who multiplies others, and show why.

<div class="lab-grid lab-grid-2">
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-skill.zip" download>
    <span class="lab-card-emoji">🎖️</span>
    <span class="lab-card-title">Ambassador</span>
    <span class="lab-card-desc">The skill, the definition it runs on, and three alternative definitions.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
  <a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-program-data.zip" download>
    <span class="lab-card-emoji">🗂️</span>
    <span class="lab-card-title">Program data</span>
    <span class="lab-card-desc">72 fictional candidates and ~2,000 evidence records across nine CSVs.</span>
    <span class="lab-card-cta">Download .zip →</span>
  </a>
</div>

**Installing it:** unzip, then **Extensions** → **Import** → drag in the `ambassador` **folder**. Start a **new chat** and point it at the `program-data` folder.

::: warning Import the folder, not the file
`SKILL.md` on its own won't work. `references/` sits beside it and holds the definition and the playbook. Use the **skill folder** drop zone, not the `.md` one.
:::

[Full walkthrough →](/build/scout-scenario-3)

</DownloadPane>

<DownloadPane track="code" scenario="scenario-3">

## 🎖️ The Ambassador · 🟣 Code

A **working cohort picker** with the data already wired in.

<a class="lab-card" href="/AI-Flight-Academy/downloads/ambassador-starter.zip" download style="max-width:30rem">
  <span class="lab-card-emoji">📦</span>
  <span class="lab-card-title">Starter</span>
  <span class="lab-card-desc">A working cohort picker, three alternative definitions, and the nine data files.</span>
  <span class="lab-card-cta">Download .zip →</span>
</a>

Self-contained - the data ships inside it. Unzip, then open a terminal in the `ambassador-starter` folder:

```bash
cd ambassador-starter
python cohort.py
```

Python 3.10+, no dependencies. If `python` isn't found, try `py`.

[Full walkthrough →](/build/code-scenario-3)

</DownloadPane>
