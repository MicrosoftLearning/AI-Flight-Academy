# Routing rules — the shape of a valid decision

A Dispatch decision has exactly five parts. These rules keep a decision honest and checkable — they're what the deterministic checks (and the Code altitude's guardrail) enforce. They govern the *shape* of the decision, not which answer is "right"; the room still argues that out.

## The decision must have all five fields

| Field | What good looks like |
|---|---|
| **owner** | Exactly one *primary* team that fields and coordinates the request. Often the easy part — the room usually agrees who owns it. |
| **audience** | Who it's *really* for — may differ from the stated audience, and may be more than one. Never blank, never "everyone" without a primary. |
| **plan** | The deliverables that satisfy the request — **this is where the room debates.** One or more deliverables, each with **what** it is (shape), **who builds** it, **who reuses** it, and **which audience** it serves. |
| **disposition** | One of the five verbs below. |
| **next-action** | One concrete next step with a team attached — "open a WI for X", "go back to requester for Y", "brief Field & Partner". |

**Where the debate lives.** *Who fields it* is often quick — the room agrees on an owner. *What to make* is the argument: the shape, the audience, and especially the **deliverables**, because one team's deliverable is often another team's reuse. A good plan says "build once here, reuse there," so every team that needs the request is served without building the same thing twice.

## The five dispositions

| Disposition | Use when |
|---|---|
| `proceed-as-is` | The ask is clear, routable, and one owner can run with it now. |
| `reshape` | The right move differs from the request's assumed shape or audience — repoint it. |
| `split` | It's genuinely two deliverables (e.g., IT-pro track *and* end-user track). |
| `defer` | Not enough to route yet, or no capacity/motion — park it with a condition to revisit. |
| `decline-and-redirect` | Not Global Skilling's to own — send it where it belongs, or back to the requester. |

## Guardrails the check enforces

1. **Routable first.** If the request fails the intake-completeness check, the only valid dispositions are `defer` or `decline-and-redirect`. Routing an under-specified request is a fail.
2. **One primary owner.** A decision with zero owners, or two "primary" owners, is invalid.
3. **Audience is explicit.** "Everyone" or blank is invalid unless a primary audience is also named.
4. **Audience-team coherence.** If the decided audience is *partners*, Field & Partner must be the owner or on the next-action. If it's *IT pros*, MTTs or a technical owner must be involved. (Don't route a partner play with no partner team in the loop.)
5. **Certify only what's stable.** A `credential`/certification deliverable requires the topic to have stable objectives. If the request flags churn ("settings may shift", "product changes often"), a straight cert must be downgraded or paired with a revisit condition.
6. **Next-action is real.** Every decision names one concrete next step with a team on it. "TBD" is not a next-action.
7. **The plan has a builder.** At least one deliverable, and every deliverable names the team that builds it.
8. **Coverage.** Every audience the decision names is served by at least one deliverable in the plan.
9. **Reuse is explicit.** If two teams need the same thing, the plan says *build once, reused by* — never the same deliverable built twice.

> These are guardrails on the *form* of a good routing decision — the deterministic backbone under the room's judgment. The room decides *what*; these rules make sure the decision is complete, owned, and honest.
