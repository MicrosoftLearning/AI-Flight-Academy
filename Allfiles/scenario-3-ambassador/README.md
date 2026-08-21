# Scenario 3 - The Ambassador

Everything participants download for Scenario 3.

| Folder | What it is | Who uses it |
| --- | --- | --- |
| `ambassador/` | The half-built skill. Reads candidate profiles, assigns a tier, proposes a next action. Ships with `PLAYBOOK.md` in its references. | 🟢 Cowork, 🔵 Scout |
| `ambassador-starter/` | The half-built program as code. Loads all nine data files, evaluates using one of them. | 🟣 Code |
| `program-data/` | 72 candidates, ~2,000 evidence records across nine CSVs. Synthetic. | All three |

## How these reach participants

`scripts/pack-downloads.mjs` zips these into `docs/public/downloads/` on every build, and the
site serves them as direct downloads. Edit the source here and the downloads follow.

The Code starter ships **with a copy of `program-data/`** so it runs straight out of the zip.
That copy is made at pack time, so there is only one copy in the repo.

## The data

Synthetic, and built with deliberate traps - see `program-data/DISCLAIMER.md`. The one that
matters: **Alex Kim** has near-top output numbers and the thinnest community evidence behind them.
Any naive scoring puts Alex near the top, and the data contains four independent ways to notice.
