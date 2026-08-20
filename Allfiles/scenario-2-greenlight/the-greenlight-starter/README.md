# The Greenlight Starter – Code Track

Build a **council** you can run: many audience seats scoring one subject at once on a live board, deterministic checks catching what the model can't, then a path that takes it further – a reusable MCP server or a greenlit pull request.

This starter gives you the plumbing and a working board. You write the seats, the checks, and your path.

> Seats are **data** (`council/*.json`). The checks are **code** (`checks.py`, `check_content.py`). The solo critic is the **control** (`../the-greenlight/reference/solo-rubric.json`) – you read it, never edit it.

## The deterministic checks

Run the countable half on its own:

```powershell
python checks.py                       # all five articles
python checks.py --piece P4-exec-summary
```

`checks.py` ships two working checks – reading time and forbidden-prerequisite – and one `TODO` stub. Every check pulls its threshold **from a seat's card, not a hardcoded value**: Retail's card says *"5–10 minutes, standing,"* so its reading budget is `6`, supplied by `council/retail.example.json`, not baked into the function.

A language model catches what's contextual. Code catches what's countable. These are the countable part – test them against an asset you know should fail.

## Start the board

```powershell
cd Allfiles/scenario-2-greenlight/the-greenlight-starter/dashboard
npm install
npm start
```

Open `http://localhost:4173` and drop a piece on the board – every seated audience scores it at once. The startup line confirms the GitHub Copilot CLI is found and signed in; the board shells out to it to run the council.

The board needs the sibling `../data-pack/` (articles + cards) and `../../the-greenlight/` (the skill + solo rubric). In the hack repo the folders sit side by side; keep them that way.

## What you build

- `council/*.json` – one seat per audience: an **outcome** and the criteria that protect it, with 0–3 anchors. Four sample seats ship; add the audiences you actually write for. `retail.example.json` is the copyable shape. **At least two seats with different outcomes** – or nothing can disagree.
- `check_content.py` – the bridge the board calls to run each seat's wired checks (a TODO stub; `greenlightlib` does the heavy lifting).
- Your own deterministic checks in `checks.py` – anything countable on a seat's card, threshold drawn from the card.
- Your path – `mcp_server.py` to make the council callable by other agents, or the PR submission route in `dashboard/server.js` to ship a greenlit plan.

## Council model

| Piece | Kind | Job |
|---|---|---|
| `council/*.json` | data | One audience seat – outcome + anchored criteria (checks may be wired in) |
| `dashboard/` | app | The live board – drop an asset, every seat scores it, a plan reconvenes until every audience is served |
| `checks.py` / `check_content.py` | code | The countable half – thresholds drawn from the card, shown next to each verdict |
| `mcp_server.py` | server | Exposes the council as MCP tools so other agents can convene it |

`greenlightlib.py` wires the checks to seats, validates that no score ships without evidence, and rolls the scorecards into a coverage matrix.

## The P4 tell

Run `P4-exec-summary` first. The solo critic returns **REVISE** – competent, wrong reader unseen. A council of ≥2 seats returns **REJECT for Retail + SHIP for Compliance** on the same document. That split is the whole point; a single reviewer structurally cannot produce it.

## House rule

This is a starter, not a solution. Anything marked `TODO` is yours. A criterion that would score the same for **any** audience belongs to the solo critic, not a seat – cut it. No quote, no source, no score.
