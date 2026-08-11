# Instructions for GitHub Copilot

This repo is the Advanced Microsoft hackathon starter for **The Greenlight**: a council of audience seats that score one subject in parallel, a judge that diffs them, and a greenlight loop that re-scores the fix.

## Concept

One reviewer holds one implied reader – an average of everyone, who exists nowhere – so it can never say *"excellent, and wrong for this room."* The council fixes that by seating many audiences, each defending a **different outcome**, each with its own verdict. The disagreement is the product.

Use the synthetic data in `../data-pack/` (five articles P1–P5, four audience cards AC-01–AC-04). Do not introduce real personal data.

## File layout

- `council/*.json` – the seats, as data. Each seat: `seat_id`, `audience`, `card`, `outcome`, `thresholds`, and `criteria` (each with `the_bar`, `protects_outcome`, `fatal`, 0–3 `anchors`, `watch_for`, and optional wired `checks`). `retail.example.json` is illustrative – copy it to `retail.json` to seat it.
- `dashboard/` – the live board (Node/Express). `server.js` seats the council from `council/*.json`, shells to the GitHub Copilot CLI to score each seat, and reconvenes a plan. This is the **canonical engine**.
- `checks.py` – deterministic checks (the countable half). Two work; one is a TODO stub.
- `check_content.py` – the bridge the board calls to run each seat's wired checks (a TODO stub).
- `mcp_server.py` – exposes the council as MCP tools (two work; `convene`/`greenlight` are TODOs) so other agents can call it.
- `greenlightlib.py` – loads seats, runs wired checks, validates evidence, builds the coverage matrix.
- `../the-greenlight/reference/solo-rubric.json` – the solo critic, the **control**. Read its `output_contract`; never edit it.

## The control is off-limits

`solo-rubric.json` is the "before" in the before/after. Editing it moves both sides of the comparison. Read it for the scale, the verdict gates, and the `output_contract` shape. The council reuses that shape and adds a `seat`, a `source`, and a `confidence` per score.

## Scorecard contracts

The board (and the MCP `convene`/`greenlight` tools) produce these shapes. Per-seat scoring returns one scorecard per seat, reusing `output_contract` plus seat/source/confidence:

```text
content_id, audience (the seat), verdict (SHIP|REVISE|REJECT), overall_score
criteria: [ { id, score (0-3 or INSUFFICIENT_CONTEXT), evidence (a direct quote),
             source, confidence (high|medium|low), fix (required when score <= 1) } ]
top_fixes: three ranked changes
```

The diff step returns:

```text
CONFLICTS: <same passage, opposite verdicts, quoted from each seat>
COVERAGE: <per piece — seats served vs seats abandoned>
```

The greenlight step returns, per rejected piece:

```text
ASSET: <what to build, format call included — "this shouldn't be a document" is allowed>
RE-SCORE: <the rejecting seat's SAME criteria, re-run against the asset>
VERDICT: <greenlit only when the seat that rejected the original now passes>
```

## House rules

1. **No quote, no score.** Every score carries a direct quote, a source, and a confidence. `Low` confidence on a fatal criterion → that seat abstains and escalates to a human. It does not guess.
2. A criterion that would score the same for **any** audience is a solo-critic criterion – it belongs to `solo-rubric.json`, not a seat.
3. A council of one is the solo critic with extra steps. Seat **at least two** audiences with different outcomes.
4. **The thing that wrote the plan is not allowed to merge it.** The council proposes; the gate blocks; a human approves.
5. Thresholds come from the card, not from code. A check that hardcodes "6 minutes" instead of reading it from the seat is wrong even when it passes.
