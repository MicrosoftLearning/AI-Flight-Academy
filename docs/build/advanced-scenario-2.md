---
title: The Greenlight — Code
---

# 🟣 The Greenlight

::: warning 🚧 Work in progress
Scenario 2 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::
**You'll build this in code — VS Code, GitHub Copilot, and the Copilot CLI.**

![An engineer at a modular patch bay behind glass runs purple cables to four empty critic seats below. Headline: "Get behind the board."](/img/scenario-2-advanced-hero.png)

You start from a working council dashboard. You make it yours, prove the code catches what the model can't, then pick a path to take it further.

![Screenshot of the starter project - The Greenlight Dashboard.](./media/the-greenlight-dashboard.png)

## What you're solving

A single review from a single perspective is not enough when different audiences need so many different things from the same content. A formal explainer might help a compliance officer make a careful decision and still be unusable for a store manager who needs one practical action during a busy shift.

This track solves a second problem too: a model is good at contextual judgement, but it can also make things up. Your council pairs both — the model explains whether content works for an audience, and code checks what is countable, so a hallucinated verdict gets caught.

## What your team will have built

| Piece | What it does |
| --- | --- |
| **The board** (provided) | A live dashboard: drop content, every seated audience reviews it, and a plan reconvenes until every audience is served. |
| **Your council** | Your real audiences as `council/*.json` — the room reviewing your content. |
| **The checks** | Deterministic checks (`checks.py`) shown next to each verdict — code catching what the model might wave through. |
| **Your path** | Either a **live seat editor** on the board, or a **PR submission** that ships the greenlit plan for approval. |

## Before you start

Download all three and unzip them into one folder. Keep `the-greenlight-starter`, `the-greenlight`, and `data-pack` **side by side**.

<div class="lab-grid lab-grid-3">
	<a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/the-greenlight-starter.zip" download>
		<span class="lab-card-emoji">📦</span>
		<span class="lab-card-title">Starter repo</span>
		<span class="lab-card-desc">The dashboard, a seated council, the checks, and the MCP server — with the build paths left as TODOs.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
	<a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/the-greenlight.zip" download>
		<span class="lab-card-emoji">🟢</span>
		<span class="lab-card-title">Greenlight skill</span>
		<span class="lab-card-desc">The audience-review method and the unchanged solo-critic baseline.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
	<a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/greenlight-data-pack.zip" download>
		<span class="lab-card-emoji">🗂️</span>
		<span class="lab-card-title">Content pack</span>
		<span class="lab-card-desc">Five articles, four audience profiles, and a style guide. Use it instead of real work data.</span>
		<span class="lab-card-cta">Download .zip →</span>
	</a>
</div>

You'll need three tools installed. On Windows the fastest way is `winget` from a privileged (Administrator) terminal:

```powershell
winget install OpenJS.NodeJS.LTS     # Node — runs the board
winget install Python.Python.3.12    # Python 3 — runs the checks
# reopen your terminal so Node is on PATH, then:
npm install -g @github/copilot       # GitHub Copilot CLI — the board calls it
```

Prefer installers? Grab [Node.js](https://nodejs.org/), [Python 3](https://www.python.org/downloads/), and the [GitHub Copilot CLI](https://www.npmjs.com/package/@github/copilot). Then run `copilot` once and sign in.

**Node** is required to start the board; **Python 3** is only needed once you wire the checks in Step 4 (until then the board runs and the checks show "not wired"). Open the **the-greenlight-starter** project in VS Code.

---

## The starting point

Now that you have the project downloaded, it's time to get started on the build.

::: tip The board points out what to build
Anywhere the board shows an amber **“not wired”** marker — the checks column, **Submit to hack repo**, and **Manage council seats** — that's a build path. The two buttons even offer a **📋 Copy prompt for Copilot Chat** that hands you a ready-made prompt to build the feature.
:::

### 1 · Start the board

Open a terminal and navigate to the folder where you extracted your zip files.

```powershell
cd the-greenlight-starter/dashboard
npm install
npm start
```

Open `http://localhost:4173`. The startup line confirms your Copilot CLI is found and signed in. If it isn't, install it and sign in, then restart.

### 2 · Convene the council

Drop the executive summary (`data-pack/content/P4-exec-summary.md`) onto the board. A single general-purpose reviewer — the **solo critic**, whose scores ship recorded in the pack — could only call this one flat *REVISE*. Your council splits it instead: Retail rejects it outright as an unusable wall of prose, while Compliance ships it — that same control detail is exactly the audit rigor they need. Each verdict comes with a quote and a confidence. Iterate on a remediation plan until the whole council greenlights it, then copy your plan to work on later.

No code yet — one flat verdict becomes a room that disagrees.

### 3 · Seat an audience that bites

A **seat** is one audience, written as a small JSON file in `council/`. It names who they are, what they need from the content (`outcome`), and the specific bars the content has to clear for *them* (`criteria`).

Four sample seats ship. Add one for an audience *you* write for. The trick is the criteria: write bars that are true for **your** audience but not for everyone — that's what makes your seat *disagree* with another on the same piece. (A bar any audience would score the same is just "good writing," and that belongs to the solo critic, not a seat.)

A seat looks like this — trimmed here; `council/retail.example.json` is the full shape:

```json
{
  "seat_id": "execs",
  "audience": "📊 Leadership reader",
  "outcome": "Can skim it in two minutes and know what decision it's asking for.",
  "criteria": [
    {
      "id": "decision_up_front",
      "the_bar": "The ask is in the first two sentences, not buried on page two.",
      "fatal": true,
      "anchors": { "0": "No clear ask anywhere", "3": "Opens with the decision and why now" }
    }
  ]
}
```

- **`outcome`** — what this reader needs the content to *do* for them.
- **`criteria`** — the bars that protect that outcome. `fatal: true` means a score of 0 on it forces a Reject, whatever the average.
- **`anchors`** — what a 0 versus a 3 looks like, so anyone would score it the same way.

You don't have to write this by hand. Open **Copilot**, **Cowork**, or **Scout** — something that knows *you* — and give it `retail.example.json` so it can match the shape — and ask it:

> Create `my-audience.json` for _[your audience]_, in the same shape as `retail.example.json` — an `outcome` and two `criteria` with anchors, one marked `fatal`.

Place the new audience file in the `/council` folder. Pick any name that isn't already in `council/` so you add a seat instead of overwriting one, then hit **Reload council** on the board.

**Done when:** your seat returns a different verdict than another seat on the same piece.

![The engineer patches purple cables into channels labelled Retail, Compliance, Clinical and Manufacturing beside a guardrail switch. Headline: "Code the council."](/img/scenario-2-advanced-wiring.png)

### 4 · Wire the deterministic checks

The model judges context, **but** it can also make things up. Deterministic checks are the countable half — reading time, blocked steps, table width — things that *code* can prove. This step lights up a **check result on each seat, right next to the model's verdict**. Two parts: connect the checks to the board, then add one of your own.

**a) Connect the checks — `check_content.py`**

The board runs this file and reads the JSON it prints. It's a stub right now. It has to load the seats, run each seat's wired checks against the dropped content, and print this shape:

```json
{
  "seats": [
    {
      "seat_id": "retail",
      "audience": "🛒 Retail Store Operations Lead",
      "checks": [
        { "criterion": "actionable_standing_up", "check": "check_reading_time",
          "passed": false, "detail": "1240 words is about 6.2 min (budget 6 min)" }
      ]
    }
  ]
}
```

`greenlightlib` already loads the seats and runs the checks — you're mostly reshaping its output:

```python
import greenlightlib as g
from pathlib import Path

def check_file(content_path):
    text = Path(content_path).read_text(encoding="utf-8")
    seats = []
    for seat in g.load_seats():                       # reads council/*.json
        results = g.run_checks_for_seat(seat, text)   # runs the wired checks
        seats.append({
            "seat_id":  seat["seat_id"],
            "audience": seat["audience"],
            "checks": [
                {"criterion": r["criterion"], "check": r["check"],
                 "passed": r["passed"], "detail": r["detail"]}
                for r in results
            ],
        })
    return {"seats": seats}
```

The stub's docstring has the exact contract and the `print(...)` wrapper that hands this to the board.

**b) Add a check of your own — `checks.py`**

A check is just a function: it takes the content and a threshold **from the seat's card**, and returns `passed` plus a one-line `detail`. `check_reading_time` is the pattern to copy:

```python
def check_reading_time(text, minutes_budget, wpm=200):
    words = _word_count(text)
    minutes = round(words / wpm, 1)
    return {
        "passed": minutes <= minutes_budget,
        "detail": f"{words} words is about {minutes} min (budget {minutes_budget} min)",
    }
```

Finish the `check_table_width` TODO the same way — count each markdown table's columns and fail any wider than `max_cols` (which comes from the card, never hardcoded). Then wire it onto an audience by adding it to a criterion's `checks` in that seat's `council/*.json`:

```json
"checks": [ { "fn": "check_table_width", "args": { "max_cols": 4 } } ]
```

Reload the board and the new check shows up next to that seat's verdict.

Stuck on either half? **Open GitHub Copilot Chat in VS Code** and build it together — it can see `greenlightlib.py`, `checks.py`, and `check_content.py`, so point it at the stub's docstring or the `check_table_width` TODO and let it draft the code with you.

**Done when:** you drop a piece and a code-caught FAIL shows next to a model verdict.

---

## Pick a path

You've got a working, checked council seated with your own audiences. Now take it further. **Completing either path — A or B — is your finish line.**

- **Path A is front-end** (a UI in the browser — JS and a little Node).
- **Path B is back-end** (Node, git, and the `gh` CLI). Both are scaffolded, and the board hands you a one-click Copilot prompt for each.

Pick the one that matches how you like to build; the bonus is for teams who want to push further.

<PathChooser
  a-emoji="🪑"
  a-title="Path A · Edit the council from the board"
  a-desc="Build a seat editor in the browser — add, edit, and remove audiences live, no hand-editing JSON. Front-end (JS + a little Node)."
  b-emoji="🏁"
  b-title="Path B · Ship it as a PR"
  b-desc="Turn a greenlit plan into a governed pull request into the hack submission repo. The council proposes; a human approves. Back-end (Node, git, gh)."
>

<template #pathA>

### Path A — edit the council from the board

Right now, seating an audience means hand-editing `council/*.json`. This path builds a small **seat editor** into the board so anyone can add, edit, and remove audiences live.

There are two pieces. The **endpoints** are the small part — sanitize the id, then write (or delete) the seat file:

```js
// dashboard/server.js — POST /api/council/seat (stubbed)
const id = String(req.body.seat_id).replace(/[^a-z0-9-_]/gi, "");   // stay inside the folder
fs.writeFileSync(path.join(COUNCIL_DIR, `${id}.json`), JSON.stringify(req.body, null, 2));
```

The **editor UI** is the real work — a form for the seat shape (outcome, thresholds, a list of criteria) that POSTs to those endpoints. Don't hand-build it: click **✎ Manage council seats** on the board for a one-click Copilot prompt that scaffolds the whole dialog, then reload.

**Done when:** you add a new audience from the browser and it reviews the next piece.

</template>

<template #pathB>

### Path B — ship the plan as a pull request

A greenlit plan should land somewhere real. This path wires the board's **🏁 Submit** button to open a pull request into the hack submission repo — the council proposes, a human approves (never auto-merge).

A green plan already holds the drafted assets and a coverage summary; assemble them and open the PR with `gh`:

```js
// dashboard/server.js — POST /api/plan/:planId/submit (stubbed)
const assets = plan.items.filter(i => i.status === "make_new");   // the drafted replacements
// ...write each asset to a branch, use composePlanMarkdown(plan) as the PR body...
spawn(GH_BIN, ["pr", "create", "--repo", SUBMISSION_REPO, "--base", SUBMISSION_BASE,
               "--title", title, "--body-file", bodyPath]);
```

`SUBMISSION_REPO` is a placeholder — keep it safe: only push when a real repo is configured, otherwise write the ready-to-push bundle. Click **🏁 Submit** on a green plan for a one-click Copilot prompt to build it.

**Done when:** a green plan opens a PR (or writes the bundle) into the submission repo, with the coverage summary as the description.

</template>

</PathChooser>

---

## Bonus — make the council callable by other agents (MCP)

The board is one surface. An **MCP server** exposes the council as tools so your *other* agents — Cowork, Scout, a VS Code chat agent — can convene it too. The starter ships `mcp_server.py` with the thin tools (`list_council`, `run_checks`, `solo_baseline`) already working and two left as TODOs.

- **Run it:** `python mcp_server.py` (stdio) or `python mcp_server.py --http`, then call `list_council` / `run_checks` from an MCP client to prove the plumbing with no model needed.
- **Implement `convene(content_path)`** (score every seat) and **`greenlight(review)`** (plan, then re-score) — the tips point to the same Copilot-CLI pattern the board uses in `dashboard/server.js`.
- **Wire it into Cowork or Scout** and convene your council from *another* agent.

![The engineer leans back in command as the purple council runs and a green-pass, red-block guardrail gate works. Headline: "Seat to verdict — yours."](/img/scenario-2-advanced-running.png)

## Show it off

60–90 seconds. Show:

- [ ] Your own audiences seated on the board, with distinct goals
- [ ] The same piece: the solo critic's one flat verdict, then your council splitting it — each seat with a quote
- [ ] A code-caught check FAIL sitting next to a model verdict
- [ ] Your path: adding a seat live from the board (A), or a green plan opening a PR (B)
- [ ] Bonus: another agent convening your council through MCP

::: tip What to aim for in the demo
Lead with the moment one piece of content looks right for one audience and wrong for another — then show the code catching what the model missed.
:::

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| The board won't start | Check Node is installed and run `npm install` in `dashboard/` first. |
| Startup says the CLI is missing | Install the GitHub Copilot CLI and sign in, then restart the server. |
| The board can't find the council | Keep `the-greenlight-starter`, `the-greenlight`, and `data-pack` side by side. |
| Every audience gets the same result | Make the audience criteria more specific to their outcomes. |
| Seats show “code checks · not wired” | Expected until you implement `check_content.py` — that wires the deterministic checks onto each verdict. |
| Copilot asks too many approvals | Use `--allow-all-tools` only in your own exercise repo. |

::: details 🎬 Nobody nails it first try
![Sparks fly, screens flash red errors, a seat glitches, and she winces holding a sparking cable. Headline: "It compiles. Mostly."](/img/scenario-2-advanced-blooper.png)

First wiring rarely compiles. Errors aren't the end — read the trace, fix a seat, run it again. Shipping is just the last retry that worked.
:::

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-2)

## Guides for this track {#guides}

<!--@include: ../.vitepress/partials/guides-advanced.md-->
