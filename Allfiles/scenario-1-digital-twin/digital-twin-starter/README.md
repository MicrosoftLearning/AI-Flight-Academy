# Digital Twin Starter – Advanced Track

Build a portable **digital twin**: a compact spec for how someone works, plus agents that can reason over it.

This starter gives you the plumbing. You write the spec and the council agents.

## The test harness – start here

**Before you write anything**, seal your answers:

```powershell
python test/take_test.py
```

Fifteen forced-choice work dilemmas. Answer fast – what you *actually* did last time, not what you'd like to have done. It flags anything that took over 25 seconds, because a deliberated answer is an aspirational one.

That writes `test/sealed-answers.md`. Don't open it again until the end.

**At the end of the session**, have the twin answer the same fifteen cold:

```powershell
python test/compare.py
```

You get a line-by-line diff, and every mismatch names the `soul.md` field that dilemma was probing – so a miss points straight at the rule to fix.

There is deliberately **no score and no leaderboard**. Mismatches are the output. The useful ones are where the twin picked the sensible, well-adjusted answer and you wouldn't have.

## Quickstart

```powershell
cd Allfiles/scenario-1-digital-twin/digital-twin-starter
Copy-Item digital-twin/references/soul.template.md digital-twin/references/soul.md
Copy-Item digital-twin/references/voice.template.md digital-twin/references/voice.md
Copy-Item digital-twin/references/revealed.template.md digital-twin/references/revealed.md
python test/take_test.py
```

Then fill in `soul.md`, `voice.md`, and `revealed.md`; create the agent files described in `.github/agents/README.md`; and run:

```powershell
pwsh ./run.ps1 -Dilemma 1
python test/compare.py
```

## Check your MCP server

Once you implement `check_boundary`, verify another agent could actually call your twin:

```powershell
python test/mcp_smoke.py
```

It connects over stdio the same way VS Code does, lists your tools, and runs your guardrail. Verified timing: a full council run is roughly 70 seconds and 4 premium requests.

## What you build

- `digital-twin/references/soul.md` – how you decide.
- `digital-twin/references/voice.md` – how you write, grounded in 5–10 verbatim sent messages.
- `digital-twin/references/revealed.md` – what your calendar/response behavior says versus what you say.
- `.github/agents/*.agent.md` – a five-agent council that shares one `soul.md`.

## Council model

| Agent | Owner | Job | Returns |
|---|---|---|---|
| Ambition | teammate 1 | Argues for impact, leverage, growth, visibility | `POSITION / BECAUSE / COST IF IGNORED` |
| Obligation | teammate 2 | Argues for commitments, stakeholders, promises | `POSITION / BECAUSE / COST IF IGNORED` |
| Capacity | teammate 3 | Argues from time, energy, constraints, hidden load | `POSITION / BECAUSE / COST IF IGNORED` |
| Arbiter | teammate 4 | Applies `soul.md`, decides, drafts, publishes dissent | `DECISION / DRAFT / DISSENT / CONFIDENCE / GAP` |
| Critic | teammate 5 | Patches the spec after misses | `ROOT CAUSE / PATCH / NET LINES` |

## House rule

This is a starter, not a solution. Anything marked `TODO` is yours. Do not add fake preferences just to make the twin sound decisive.
