# Council agents to create

Write five agent files in this folder. This README is the spec; the agent bodies are intentionally TODO for participants.

## Required files

- `ambition.agent.md`
- `obligation.agent.md`
- `capacity.agent.md`
- `arbiter.agent.md`
- `critic.agent.md`

## Required frontmatter

Each drive agent:

```yaml
---
name: ambition # or obligation, capacity
description: Argues one drive in the digital-twin council.
tools: ['read']
---
```

Arbiter:

```yaml
---
name: arbiter
description: Polls the three drives, applies soul.md, decides, drafts, and publishes dissent.
tools: ['read', 'agent']
agents: ['ambition', 'obligation', 'capacity']
---
```

Critic:

```yaml
---
name: critic
description: Diagnoses twin misses and proposes the smallest soul.md patch.
tools: ['read']
---
```

## Critical trap

The orchestrator will not delegate just because `agents:` is listed. The arbiter instructions must say:

> You MUST invoke each agent as a subagent before synthesizing.

## Output contracts

Drive agents return exactly:

```text
POSITION: <choice or recommendation>
BECAUSE: <specific soul.md rule or revealed.md evidence>
COST IF IGNORED: <concrete downside>
```

Arbiter returns exactly:

```text
DECISION: <final call>
DRAFT: <message if needed, otherwise none>
DISSENT: <losing drive + strongest argument + why overruled>
CONFIDENCE: high | medium | low
GAP: <missing soul.md field or none>
```

Critic returns exactly:

```text
ROOT CAUSE: <missing field, wrong rule, or overbroad rule>
PATCH: <minimal replacement or diff>
NET LINES: <must be <= +2>
```

## Suggested ownership

One teammate owns one agent. The team shares one `digital-twin/references/soul.md`.
