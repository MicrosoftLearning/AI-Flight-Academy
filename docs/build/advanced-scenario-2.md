---
title: The Greenlight — Code
---

# 🟣 The Greenlight

::: warning 🚧 Work in progress
Scenario 2 is still being built and tested. Steps, downloads, and screenshots may change before the event.
:::
**You'll build this in code — VS Code, GitHub Copilot, and the Copilot CLI.**

You get the contracts and the plumbing. You write the council.

## What you're solving

One review is not enough when different audiences need different things from the same content. A formal explainer might help a compliance officer make a careful decision and still be unusable for a store manager who needs one practical action during a busy shift.

This track solves a second problem too: a model is good at contextual judgement, but not simple, repeatable checks. Your system combines both. The model explains whether content works for an audience; code checks what is countable, such as reading time or a blocked prerequisite.

## What your team will have built

One system, not a collection of prompts. Every audience uses the same content and output contract.

| Piece | What it does |
| --- | --- |
| **The seats** | JSON files describing each audience, its outcome, and its criteria. |
| **The scorer** | Produces one evidence-backed scorecard for each audience. |
| **The judge** | Compares scorecards and reports conflicts and coverage. |
| **The checks** | Tests countable requirements using thresholds from the audience data. |
| **The gate** | Blocks a pull request until the plan serves every audience you chose to support. |

The solo critic remains unchanged. It is the baseline that gives one verdict; your council shows who the content serves and who it does not.

## Before you start

Download all three and unzip them into one folder. Keep `the-greenlight-starter`, `the-greenlight`, and `data-pack` **side by side**.

<div class="lab-grid lab-grid-3">
	<a class="lab-card" href="/Team-Week-Imagineer-Hack/downloads/the-greenlight-starter.zip" download>
		<span class="lab-card-emoji">📦</span>
		<span class="lab-card-title">Starter repo</span>
		<span class="lab-card-desc">Runner, two working checks, an example seat, three agent contracts, and a VS Code workspace.</span>
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

Open `the-greenlight.code-workspace` in VS Code. Then open Copilot Chat and confirm you can switch to **Agent** mode. If your organisation has disabled it, use the Copilot CLI instead; the starter's runner calls it directly.

::: tip Want every step spelled out?
This page gets you through the build. There are also **[full step-by-step guides](/bricks/)** for Scout setup, Work IQ, guardrails, and connectors.
:::

---

## 1 · Run the starter checks

Open a terminal in `the-greenlight-starter` and run:

```powershell
python checks.py
python checks.py --piece P4-exec-summary
```

Two checks already work: reading time and blocked prerequisites. One is left as a TODO. Read `checks.py` before changing it.

The important rule is already built in: thresholds come from an audience seat, not from code. A reading-time check gets its time budget from the audience data. Do not hardcode a universal number.

## 2 · Split the work

Four people can work in parallel. Fewer teams can combine roles; larger teams can add testing and demo ownership.

| Who | Owns | Starts in |
| --- | --- | --- |
| 1 | Two or more audience seats, with distinct outcomes and anchored criteria | `council/` |
| 2 | The per-seat scorer and its deterministic checks | `seat-scorer.agent.md`, `checks.py` |
| 3 | The judge that compares scorecards and reports coverage | `judge.agent.md` |
| 4 | The replacement-plan re-score and the PR gate | `greenlight.agent.md`, `run.ps1` |

All roles share the solo critic's output contract. Read it; never edit it.

## 3 · Add the audience seats
📘 [Ground on live data with Work IQ](/bricks/advanced-work-iq)

Copy the example Retail seat so it becomes a real seat:

```powershell
Copy-Item council/retail.example.json council/retail.json
```

Then add at least one more audience with a different outcome, such as Compliance. Each seat needs an outcome and criteria with 0–3 anchors. A criterion must be specific to that audience: “is it clear?” is too general; “can a floor associate find the first action in two lines?” is useful.

Use Work IQ to help draft a real internal audience profile when that helps. Treat it as a first draft and correct it with people who know that audience.

## 4 · Finish the three agents

The starter includes a scorer, judge, and greenlight agent. Their input and output contracts are already written. Each has one design decision left for you:

- decide how a failed deterministic check affects a scorer's judgement
- decide how the judge treats an audience that needs revision
- decide when a plan needs a different format rather than better wording

Keep their returns structured and short. The scorer returns one scorecard per seat; the judge compares them without re-scoring; the greenlight agent creates a replacement plan and checks it against the same audience criteria.

## 5 · Run the first review

Start with P4, the executive summary:

```powershell
pwsh ./run.ps1 -Piece P4-exec-summary
```

The runner loads every seated audience, runs deterministic checks, asks the scorer for one scorecard per audience, then asks the judge to compare them.

With the supplied pack, Retail and Compliance should reach different conclusions for good reasons. Every score needs a direct quote, source, and confidence rating. If information is missing, the score must say so rather than guess.

::: warning Leave the baseline alone
`the-greenlight/reference/solo-rubric.json` is the control. Editing it changes the before-and-after comparison. Read its output contract, but never change it.
:::

## 6 · Add checks the model should not do

Look for countable requirements on an audience seat, then add checks in `checks.py`. Examples:

- a time budget becomes a reading-time check
- an action the audience cannot perform becomes a blocked-prerequisite check
- a phone-reading constraint becomes a table-width check

Test every check against content that should fail. The starter already gives you two working examples and a `check_table_width` TODO; do not build a framework.

<details>
<summary>Stuck writing the Python?</summary>

Once you have chosen the countable requirement, ask Copilot in VS Code to write the check in `checks.py`. Include the audience seat and the content that should fail, and tell it to read the threshold from the seat data rather than hardcode it.

For example: **“Add the `check_table_width` TODO in `checks.py`. Read the maximum columns from the Retail seat data, not a fixed number. Then run it against the five supplied articles and show me one failure.”**
</details>

## 7 · Compare, plan, and re-score
📘 [Add a guardrail / output check](/bricks/advanced-guardrail)

Have the judge identify a passage two audiences treat differently. Then use the greenlight agent to write a replacement plan for an audience the original does not serve. The answer can be a shorter guide, checklist, video, or another format.

Re-score that plan using the same audience criteria. It is ready only when the audience that needed the replacement would accept it. Add validation using `greenlightlib.py` so a score without a quote, source, or confidence fails the run.

## 8 · Show the coverage

Run the council across all five articles and every seated audience. Use `coverage_matrix` in `greenlightlib.py` to show which audiences each article serves and which it leaves behind.

The goal is not to make every audience disagree. It is to make the system explicit about when one piece can serve several audiences and when it needs different treatment.

## 9 · Gate the pull request
📘 [Build a custom connector (MCP)](/bricks/advanced-mcp-connector) · [Add a guardrail / output check](/bricks/advanced-guardrail)

Wire the council into a pull-request check. The check should fail when an audience is left unserved and pass when the coverage plan addresses that gap.

The council can propose a change, but it cannot merge its own work. A human approves the result.

**Done when:** a pull request fails because the plan does not serve an audience, then passes after the fix.

---

## Show it off

60–90 seconds. Show:

- [ ] Two seats as data, with distinct outcomes and anchored criteria
- [ ] The runner producing a separate, evidence-backed scorecard for each seat
- [ ] One deterministic check that draws its threshold from an audience seat
- [ ] One passage where the judge explains why audiences agree or disagree
- [ ] A replacement plan re-scored by the audience it is meant to serve
- [ ] The coverage matrix and the pull-request check

::: tip What to aim for in the demo
Lead with the moment one piece of content looks right for one audience and wrong for another. That is the thing a single generic review cannot show.
:::

## Stuck?

| What you're seeing | What to do |
| --- | --- |
| The runner says there are not enough seats | Copy `retail.example.json` to `retail.json`, then add a second seat with a different outcome. |
| The runner cannot find the article or rubric | Keep `the-greenlight-starter`, `the-greenlight`, and `data-pack` side by side. |
| Every audience gets the same result | Make the audience criteria more specific to their outcomes. |
| A score has no evidence | Require a quote, source, and confidence; `greenlightlib.validate_scorecard` checks this. |
| A check always uses the same number | Move the threshold into the audience seat and pass it to the check. |
| Copilot asks too many approvals | Use `--allow-all-tools` only in your own exercise repo. |

---

[← Back to start](/) · [What this scenario is about](/scenarios/scenario-2)
