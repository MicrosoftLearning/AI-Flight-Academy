# Dispatch — Data Pack

Everything the room needs to route a real skilling request.

**Dispatch** seats a **room of real Global Skilling teams** — each with a different audience, output, and appetite — and drops an incoming **skilling request** in front of them. Each team says what it would do with the request; the room turns those positions into one **routing decision**: who fields it, who it's really for, the plan of deliverables (built once, reused across teams), and what happens next.

## What's in here

| Folder | What it is |
|---|---|
| `teams/` | The room — one card per Global Skilling team (needs, audience, output, appetite, and how they argue). Seat 3–5 of these. |
| `requests/` | Incoming skilling requests to route. Some are fully-formed briefs (`RQ-…`); two are deliberately-rough ideas (`IDEA-…`) the room has to sharpen first. |
| `policy/` | The intake rules — the fields a request needs to be routable, and the routing rules the deterministic check enforces. |

## The one idea

The same request means **different work to different teams**. One team sees a 20-minute lab; another sees a whole learning path; a third says "not us — send it to Partner." That disagreement isn't noise — it's the point. Routing isn't obvious; it's a negotiation, and Dispatch makes the negotiation visible.

## How to use it

1. **Seat the room** — pick 3–5 teams from `teams/` (start with ones that want *different* things).
2. **Drop a request** — start with `requests/RQ-01…`, or a rough `IDEA-…`.
3. **Let each team take a position** — want it? what would they make? how big? own it?
4. **Dispatch** — the room lands one decision: `owner · audience · plan · disposition · next-action`.

See `DISCLAIMER.md` for how to read the team cards.
