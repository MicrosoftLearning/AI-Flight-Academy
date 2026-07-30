# Council agents to create

Write three agent files in this folder. This README is the spec; the agent bodies are intentionally TODO for participants.

Seats are **data** (`../../council/*.json`), not agents. These agents *operate on* the seats.

## Required files

- `seat-scorer.agent.md`
- `judge.agent.md`
- `greenlight.agent.md`

## Required frontmatter

```yaml
---
name: seat-scorer
description: Scores one article against one seat's criteria and emits a per-seat scorecard.
tools: ['read']
---
```

```yaml
---
name: judge
description: Diffs the per-seat scorecards — reports conflicts and coverage. Does not re-score.
tools: ['read']
---
```

```yaml
---
name: greenlight
description: Specs the replacement asset for a rejected piece and re-runs the rejecting seat's criteria against it.
tools: ['read']
---
```

## Output contracts

`seat-scorer` returns one scorecard, reusing the `output_contract` from `../../../the-greenlight/reference/solo-rubric.json` **plus** a seat, a source, and a confidence per score:

```text
content_id: <which piece>
audience:   <the seat id / name>
verdict:    SHIP | REVISE | REJECT
overall_score: <weighted average, one decimal>
criteria:
  - id: <criterion id>
    score: <0-3 or INSUFFICIENT_CONTEXT>
    evidence: <a direct quote from the article>
    source: <where the bar comes from — the seat card line>
    confidence: high | medium | low
    fix: <required when score <= 1>
top_fixes: <three ranked changes>
```

`judge` returns:

```text
CONFLICTS: <same passage, opposite verdicts — quote both seats>
COVERAGE:  <per piece: seats served vs seats abandoned>
```

`greenlight` returns, per rejected piece:

```text
ASSET:    <what to build; include the format call — "not a document" is a valid answer>
RE-SCORE: <re-run the rejecting seat's SAME criteria against the asset>
VERDICT:  <greenlit only when the seat that rejected the original now passes it>
```

## Critical trap

A score with no evidence is not a score. The `seat-scorer` MUST attach a direct quote, a source, and a confidence to every criterion. `Low` confidence on a **fatal** criterion means the seat **abstains** and escalates to a human — it does not emit a guessed verdict. `run.ps1` and `greenlightlib.validate_scorecard()` will refuse a scorecard that ships a score without evidence.

## Suggested ownership

One teammate owns one agent. The whole team shares the roster in `../../council/`.
