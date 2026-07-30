# The Greenlight Starter — Advanced Track

Build a **council** in a repo: many audience seats scoring one subject in parallel, a judge that diffs them, a transformation plan re-scored on the same rubric, and a PR gate that stays red until every seated audience is served.

This starter gives you the plumbing. You write the seats, the agents, and the scoring.

> Seats are **data** (`council/*.json`). Agents are **code** (`.github/agents/`). The solo critic is the **control** (`../the-greenlight/reference/solo-rubric.json`) — you read it, never edit it.

## The deterministic checks — start here

**Before you wire any model scoring**, run the countable half:

```powershell
python checks.py                       # all five articles
python checks.py --piece P4-exec-summary
```

`checks.py` ships two working checks — reading time and forbidden-prerequisite — and one `TODO` stub. Every check pulls its threshold **from a seat's card, not a hardcoded value**: Retail's card says *"5–10 minutes, standing,"* so its reading budget is `6`, supplied by `council/retail.example.json`, not baked into the function.

A language model catches what's contextual. Code catches what's countable. These are the countable part — test them against content you know should fail.

## Quickstart

```powershell
cd Allfiles/scenario-2-greenlight/the-greenlight-starter
Copy-Item council/retail.example.json council/retail.json   # seat Retail for real
# now seat at least ONE more audience with a DIFFERENT outcome (e.g. Compliance)
# then write the three agents described in .github/agents/README.md
python checks.py --piece P4-exec-summary
pwsh ./run.ps1 -Piece P4-exec-summary
```

The runner needs the sibling `../data-pack/` (articles + cards) and `../the-greenlight/` (the skill + solo rubric). In the hack repo the three folders sit side by side; keep them that way.

## What you build

- `council/*.json` — one seat per audience: an **outcome** and the criteria that protect it, with 0–3 anchors. Copy `retail.example.json`, then add more. **At least two seats with different outcomes** — or nothing can disagree.
- `.github/agents/*.agent.md` — the three agents that score, judge, and greenlight. Bodies are yours; see `.github/agents/README.md`.
- Your own deterministic checks in `checks.py` — anything countable on a seat's card, threshold drawn from the card.

## Council model

| Piece | Kind | Job |
|---|---|---|
| `council/*.json` | data | One audience seat — outcome + anchored criteria (checks may be wired in) |
| `seat-scorer.agent.md` | agent | Score one article against **one seat's** criteria; emit a per-seat scorecard with quote + source + confidence |
| `judge.agent.md` | agent | Diff the scorecards — report conflicts (same passage, opposite verdicts) and coverage |
| `greenlight.agent.md` | agent | Spec the replacement asset for each rejected piece, then re-run that seat's same criteria against it |

`greenlightlib.py` wires the checks to seats, validates that no score ships without evidence, and rolls the scorecards into a coverage matrix.

## The P4 tell

Run `P4-exec-summary` first. The solo critic returns **REVISE** — competent, wrong reader unseen. A council of ≥2 seats returns **REJECT for Retail + SHIP for Compliance** on the same document. That split is the whole point; a single reviewer structurally cannot produce it.

## House rule

This is a starter, not a solution. Anything marked `TODO` is yours. A criterion that would score the same for **any** audience belongs to the solo critic, not a seat — cut it. No quote, no source, no score.
