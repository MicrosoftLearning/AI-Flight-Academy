# Dispatch — Live Routing Board

A live browser dashboard for the **Dispatch** room. It reads the seated teams from `council/*.json`, takes a dropped or pasted skilling request, runs the intake gate, and shells out to the GitHub Copilot CLI to have each team take a position — then shows the room's one routing decision.

## Run it

```powershell
cd Allfiles/scenario-2-dispatch/the-dispatch-starter/dashboard
npm install
npm start
```

Open `http://localhost:4173`. Drop or paste a request; the startup line confirms the GitHub Copilot CLI is found and signed in.

This dashboard ships inside `the-dispatch-starter/`. The seated room is **data** (`council/*.json`); the process references live in the sibling `../../the-dispatch` skill, and `../../dispatch-data` (teams, requests, policy) grounds the run.

## The flow

1. **Drop/paste a request** — a formed `RQ-…` or a rough `IDEA-…`.
2. **Intake gate** — `check_content.py` says whether it's routable or needs sharpening first.
3. **The room takes positions** — each team reacts through its own lens.
4. **The routing decision** — owner · audience · plan (deliverables + reuse) · disposition · next-action.
5. **Sharpen & re-dispatch** — edit the request and drop it again; there's no separate loop.

## Act on the decision (build path)

The **📤 Act on this decision** button is a stub (`501`). Wire `POST /api/dispatch/:id/act` in `server.js` to route a decision onward — open a work item, post to a channel, notify the owner.

## Environment overrides

| Var | Default | What |
|---|---|---|
| `PORT` | `4173` | Port |
| `DISPATCH_COUNCIL_DIR` | `../council` | The seated team `council/*.json` |
| `DISPATCH_SKILL_DIR` | `../../the-dispatch` | Where `reference/convene.md` and `reference/dispatch.md` live |
| `DISPATCH_DATA_PACK` | `../../dispatch-data` | Teams / requests / policy, for grounding |
| `COPILOT_BIN` | `copilot` | The GitHub Copilot CLI binary |
| `DISPATCH_MODEL` | `claude-sonnet-4.6` | Pinned model for every CLI call — cheap-ish and cost-predictable; set to `''` or `auto` to let the CLI pick |
| `DISPATCH_TIMEOUT_MS` | `360000` (6 min) | Kill the CLI if a run takes longer |
| `DISPATCH_PYTHON` | `python` | Python for the intake gate |
| `DISPATCH_ACT_TARGET` | `<your intake tracker or channel>` | Where the act path would route |

## API

- `GET /api/council` — the seated teams
- `POST /api/dispatch` — drop a `file` or paste `text` (+ optional `label`); returns `{ jobId, gate }`
- `GET /api/dispatch/:id` — poll a run (`positions` + `decision` + `debate`)
- `POST /api/dispatch/:id/act` — act on the decision (build-path stub)
- `GET /api/runs` — recent dispatches
