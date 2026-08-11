# Instructions for GitHub Copilot

This repo is the Advanced Microsoft hackathon starter for a **digital twin**: a portable behavioral spec plus agents that run on that spec.

## Concept

The twin is not a chatbot persona. It is a small set of markdown files that capture how a person decides, writes, overcommits, protects boundaries, and resolves tradeoffs. Agents must read the spec, cite the governing rule, and admit gaps instead of inventing preferences.

Use the synthetic example name **Avery Washington** in examples. Do not introduce real personal data.

## File layout

- `digital-twin/references/soul.template.md` – schema for decision rules and boundaries.
- `digital-twin/references/voice.template.md` – schema for verbatim sent-message samples and inferred voice rules.
- `digital-twin/references/revealed.template.md` – schema for calendar/response behavior.
- `.github/agents/README.md` – assignment for the five council agents participants must write.
- `mcp_server.py` – MCP thin tools plus TODO thick-tool stubs.
- `twinlib.py` – Copilot CLI large-prompt helper.
- `run.ps1` – local council runner.
- `test/` – the sealed-answer harness. `take_test.py` records the human's gut answers to 15 dilemmas BEFORE the build; `compare.py` runs the twin over the same 15 at the end and diffs them, naming the soul.md field behind each mismatch. No score is produced, by design.

## Council output contracts

Drive agents (`ambition`, `obligation`, `capacity`) must return exactly:

```text
POSITION: <recommended choice>
BECAUSE: <soul.md rule or revealed.md evidence>
COST IF IGNORED: <specific downside>
```

The arbiter must return exactly:

```text
DECISION: <final call>
DRAFT: <message if needed, otherwise none>
DISSENT: <losing drive + strongest argument + why overruled>
CONFIDENCE: high | medium | low
GAP: <missing soul.md field or none>
```

The critic must return exactly:

```text
ROOT CAUSE: <missing/wrong/overbroad field>
PATCH: <minimal diff or replacement line>
NET LINES: <must be <= +2>
```

## House rules

1. Short specs beat long specs.
2. Never invent a preference not present in `soul.md` or evidenced in `revealed.md`.
3. If the spec is missing a rule, set `GAP` instead of guessing.
4. The arbiter must publish the dissent. A decision without cost is not a judgment.
5. Boundary rules override voice polish.
6. The orchestrator will not delegate unless its instructions say: **You MUST invoke each agent as a subagent before synthesizing.**
