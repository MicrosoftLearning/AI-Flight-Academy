# The Greenlight — Live Council Dashboard

A live browser dashboard for the **Greenlight** council. It reads the seated
council straight from `council/*.json` in the starter (the same seats the
runner and checks use — no hardcoded audiences), lets you drag a document or
paste a link for the council to convene on, and shells out to the **GitHub
Copilot CLI** to run the review — then shows each audience's verdict on its own
card, in real time.

```
council/*.json  ──read at every request──▶  dashboard cards (one per seat)
                                                     │
        drop a file / paste a link                  │
                     │                               ▼
                     ▼                    "deliberating…" (pulsing blue)
        server spawns: copilot -p "<review prompt>" --allow-all-tools
                     │
                     ▼
        JSON verdict parsed back  ──▶  card flips to Ship / Revise / Reject
                                        (green / amber / red), deal-breaker ⚠,
                                        expandable scorecard: quote + reason +
                                        confidence + fix, per criterion
```

This dashboard ships inside `the-greenlight-starter/`. It's the Advanced
track's starting point — you wire it to **your** Copilot CLI, add your own
audiences, and take it further.

## Run it

```powershell
cd dashboard
npm install
npm start
```

Then open **http://localhost:4173**.

Requires the **GitHub Copilot CLI** (`copilot`) installed and signed in — the
dashboard calls it non-interactively with `--allow-all-tools` so it can read
the council, the reference files, and the dropped content without a prompt.

By default it reads the council from `../council` (the starter's seated
`council/*.json`) and the review-process references from `../the-greenlight`.
Both are discovered relative to the starter, so it works on any machine;
override with the environment variables below.

## How a run works

1. **Reload council** (or just load the page) re-reads every `council/*.json`
   (skipping `*.example.json`) and draws one card per seat — its emoji, name,
   profile ID (the `card`), and goal (the `outcome`). Nothing about the
   audiences is hardcoded in this app; edit or add a seat file and reload.
2. **Drop a file** (multipart upload) or **paste a link** (fetched
   server-side, HTML stripped to text) to give the council something to review.
3. The server builds one prompt that embeds each seat's criteria (the bar,
   the 0–3 anchors, deal-breakers) and asks the Copilot CLI to run the
   Greenlight `convene` process against every seat independently, with a quote +
   reason + confidence + fix per criterion, returning a single JSON verdict.
4. While the CLI thinks, every card shows a pulsing "deliberating…" state, then
   flips to its own verdict color (Ship = green, Revise = amber, Reject = red),
   flags deal-breaker hits, and gets an expandable scorecard.
5. A results panel summarizes who's served vs. not, and calls out the sharpest
   disagreement between audiences on the same passage.
6. Runs are kept in `runs/*.json` so "Past runs" survives a server restart.

## Greenlight it — remediation plan + reconvene loop

If any audience didn't ship the piece, a **🚦 Greenlight it** button appears. It
runs the skill's "plan" step over the Copilot CLI:

1. Seats that shipped are marked **Keep as-is**.
2. For seats that didn't, it writes an honest build order (why it failed, the
   format call, what to make, what to include/leave out) **and drafts the actual
   replacement content**.
3. **🔄 Reconvene on the plan** re-scores each drafted replacement against the
   one audience it was built for, on the same criteria. Cards flip to **PASS** /
   **FAIL**.
4. A failing draft gets an **✏️ Iterate** button that redrafts using the failed
   check's fixes, then re-checks automatically.
5. The plan is **GREEN** once every audience — kept or newly drafted — passes.

Plans persist to `plans/*.json`, and a green plan can be exported as Markdown or
JSON from the dashboard.

## Configuration

| Env var | Default | Purpose |
|---|---|---|
| `PORT` | `4173` | Dashboard port |
| `GREENLIGHT_COUNCIL_DIR` | `../council` | Where the seated `council/*.json` seats live |
| `GREENLIGHT_SKILL_DIR` | `../../the-greenlight` | Where `reference/convene.md` and `reference/greenlight.md` (the review process) live |
| `GREENLIGHT_DATA_PACK` | `../../data-pack` | Optional audience-card detail used to ground the plan step |
| `COPILOT_BIN` | `copilot` | Path to the GitHub Copilot CLI binary |
| `GREENLIGHT_MODEL` | _(empty — CLI auto-picks)_ | `--model` for every CLI call. Left empty so the Copilot CLI chooses; set a model id to pin one. |
| `GREENLIGHT_TIMEOUT_MS` | `360000` (6 min) | Kill the CLI if a review takes longer than this |

## Notes

- The council is re-read from `council/*.json` at the start of every review, so
  edits show up on the next "Convene" without a manual reload.
- The dashboard never edits the council — it's read-only from here. Add or
  change seats by editing `council/*.json` (or generating new ones), then hit
  **Reload council**.
- Runs on `localhost` only; dropped files and fetched links are stored under
  `uploads/` so the CLI subprocess can read them — nothing is sent anywhere
  external. Keep this in your own exercise repo, since `--allow-all-tools` lets
  the CLI act.
- The `../data-pack` content pieces (P1–P5) make good first test drops — **P4**
  is the sharpest split (Compliance ships it, the operational audiences reject
  it).
