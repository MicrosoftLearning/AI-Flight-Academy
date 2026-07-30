# Council agents

Three agents drive the council. They ship as **skeletons** — the frontmatter, the method, and the output contract are already written, because the audiences you score live in `../../council/*.json` (data), not in these files. Each agent leaves **one real design decision as a TODO**. Sharpen those; the runner (`../../run.ps1`) wires them.

| Agent | Job |
|---|---|
| `seat-scorer.agent.md` | Score one article against one seat's criteria → a per-seat scorecard |
| `judge.agent.md` | Diff the scorecards → conflicts + coverage (does not re-score) |
| `greenlight.agent.md` | Spec the replacement asset for a rejected piece, then re-score it |

Why they ship written and the *seats* don't: the machinery is the same for every audience — the thing that changes team to team is **who you seat**. So the audiences are yours to author (`../../council/`), and the agents just operate on them.

## What's actually yours — the TODO in each

- **seat-scorer** — how a wired deterministic check (`checks.py`) combines with the model's score: a hard cap, or an overridable input?
- **judge** — where REVISE falls in coverage: served or abandoned? That's your quorum — keep it consistent with the PR gate.
- **greenlight** — what earns a *format* change versus a wording fix.

## The one rule they all share

**No quote, no source, no score.** `Low` confidence on a **fatal** criterion means the seat abstains and escalates — it does not guess. `run.ps1` and `greenlightlib.validate_scorecard()` refuse a scorecard that ships a score without evidence.

One teammate can own each agent; the whole team shares the roster in `../../council/`.
