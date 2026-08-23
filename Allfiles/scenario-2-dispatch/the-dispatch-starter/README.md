# The Dispatch Starter – Code Track

Build a **routing room** you can run: a council of Global Skilling teams that takes a skilling request, each team says what it would do with it, and the room lands one decision — who fields it, who it's really for, and the plan of deliverables (built once, reused across teams). A live board, an intake gate that catches an under-specified request before the room guesses, and a path that takes it further.

This starter gives you the plumbing and a working board. You write the teams, the intake gate, and your path.

> Teams are **data** (`council/*.json`). The intake gate is **code** (`check_content.py`, `dispatchlib.py`). The routing rules are the **contract** (`../dispatch-data/policy/ROUTING-RULES.md`) — you read them, the check enforces them.

## The intake gate

Before the room routes a request, one countable question: **is it even routable?** A formed request (`RQ-…`) has its fields; a rough idea (`IDEA-…`) is missing some — and should be *sharpened*, not confidently routed.

```powershell
python check_content.py ../dispatch-data/requests/RQ-01-agent-governance-before-ga.md
python check_content.py ../dispatch-data/requests/IDEA-01-seller-copilot-roi.md
```

`check_content.py` ships as a `TODO` stub — building it is the exercise. `dispatchlib.py` does the parsing (`parse_request`, `field_value`, `is_placeholder`); you decide present vs missing against `REQUIRED_FIELDS` and return `{routable, present, missing, detail}`. A language model catches what's contextual; code catches what's countable — whether the request has enough in it to route is countable.

## Start the board

```powershell
cd Allfiles/scenario-2-dispatch/the-dispatch-starter/dashboard
npm install
npm start
```

Open `http://localhost:4173` and drop (or paste) a request — every seated team takes a position, and the room lands one routing decision. The startup line confirms the GitHub Copilot CLI is found and signed in; the board shells out to it to run the room.

The board needs the sibling `../dispatch-data/` (teams + requests + policy) and `../../the-dispatch/` (the skill). In the hack repo the folders sit side by side; keep them that way.

## What you build

- `council/*.json` – one seat per team: what it **owns**, who it **serves**, what makes it **say yes/no**, its **format bias**, its **voice**. Five core teams ship; `team.example.json` is the copyable shape. **At least three teams that want different things** – or the room can't disagree.
- `check_content.py` – the intake gate the board calls (a `TODO` stub; `dispatchlib` does the parsing).
- Your path – `mcp_server.py` to make the room callable by other agents, or the "act on the decision" route in `dashboard/server.js` to route a decision onward (open a work item, post to a channel).

## The starter at a glance

| Piece | Kind | Job |
|---|---|---|
| `council/*.json` | data | One team seat – owns / serves / says-yes / says-no / format bias / voice |
| `dashboard/` | app | The live board – drop a request, every team takes a position, the room lands one decision |
| `check_content.py` / `dispatchlib.py` | code | The intake gate – is the request routable? (the countable half) |
| `mcp_server.py` | server | Exposes the room as MCP tools (`list_room`, `check_routable`, `routing_rules`, and a `dispatch` TODO) |
| `../dispatch-data/policy/ROUTING-RULES.md` | contract | The shape of a valid decision and the guardrails the check enforces |

## The split tell

Run **RQ-01** (agent governance before GA) first. Who *fields* it, the room often agrees on. The **plan** is the argument: one team sees an evergreen learning path, another a live workshop, another an ASN journey, and Field & Partner says the real audience is partners. That split — and the reuse it forces (build once, reuse across teams) — is the whole point; a single triager structurally can't produce it.

## House rule

This is a starter, not a solution. Anything marked `TODO` is yours. *Who fields it* is often easy; the debate is the **plan** — the deliverables, the audience, and the reuse. A request that's missing its audience, topic, or outcome isn't routed — it's sharpened.
