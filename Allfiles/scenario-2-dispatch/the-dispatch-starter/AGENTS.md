# Instructions for GitHub Copilot

This repo is the Code-track Microsoft hackathon starter for **The Dispatch**: a room of Global Skilling teams that routes an incoming skilling request. Each team takes a position; the room lands one routing decision.

## Concept

An intake queue with one triager holds one implied answer - where *they'd* send it - so it can never surface *"this means different work to different teams."* The room fixes that by seating many teams, each with a **different audience, output, and appetite**, each taking its own position. **Who fields the request is often agreed; the debate is the plan** - the shape, the audience, and especially the **deliverables**, because one team's deliverable is another team's reuse (build once, reuse across teams). That negotiation is the product.

Use the synthetic requests in `../dispatch-data/` (formed `RQ-…`, rough `IDEA-…`) and the real Global Skilling team cards (`teams/TC-…`, no individuals named). Do not introduce real personal data.

## File layout

- `council/*.json` - the seated teams, as data. Each: `team_id`, `team`, `card`, `owns`, `serves`, `produces`, `says_yes_when`, `says_no_when`, `format_bias`, `voice`. `team.example.json` is the copyable shape.
- `dashboard/` - the live board (Node/Express). `server.js` seats the room from `council/*.json`, shells to the GitHub Copilot CLI to have each team take a position, and reduces those into one routing decision. This is the **canonical engine**.
- `check_content.py` - the intake gate the board calls: is the request routable? (a TODO stub - the exercise).
- `dispatchlib.py` - parses a request into intake fields and defines `REQUIRED_FIELDS` (the "complete enough to route" bar).
- `mcp_server.py` - exposes the room as MCP tools (`list_room`, `check_routable`, `routing_rules` work; `dispatch` is a TODO) so other agents can call it.
- `../dispatch-data/policy/ROUTING-RULES.md` - the **contract**: the five-field decision and the guardrails. Read it; the check enforces it.

## The decision contract

The board (and the MCP `dispatch` tool) produce this shape:

```text
request_label, routable
positions: [ { team, interest (in|support|out), deliverable, reuse, effort (S|M|L),
              ownership (own|support|pass), disposition_lean, rationale } ]
decision: {
  owner (one primary team),
  audience [ who it's really for ],
  plan: [ { what, builder (a team), reused_by [teams], audience } ],   // build once, reuse across teams
  disposition (proceed-as-is|reshape|split|defer|decline-and-redirect),
  next_action (one concrete step with a team on it)
}
debate: the sharpest clash - usually about the plan or the reuse, not who owns it
```

## House rules

1. **Sharpen before you route.** A request missing its audience, topic, or desired outcome (a rough `IDEA-…`) is not routable - the honest disposition is `defer` or `decline-and-redirect`, never a confident route. The intake gate catches this; don't override it.
2. **One primary owner.** Zero owners, or two "primary" owners, is invalid.
3. **Build once, reuse across teams.** If two teams need the same thing, the plan says *build once, reused by* - never the same deliverable built twice. Make the reuse explicit.
4. **Cover the audience.** Every audience the decision names is served by at least one deliverable in the plan.
5. **A room of one is a triager with extra steps.** Seat **at least three** teams that want different things, or the room can't disagree - and the disagreement is the point.
6. **Certify only what's stable.** A credential/certification deliverable needs stable objectives; if the request flags churn, downgrade it or pair it with a revisit condition.
7. **The thing that decides is not allowed to act.** The room proposes the route; a human approves before anything is opened, posted, or sent.
