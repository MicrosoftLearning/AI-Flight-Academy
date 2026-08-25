# Scenario 2 - The Greenlight

Everything participants download for Scenario 2.

::: warning 🚧 Work in progress
Still being built and tested. Contents may change before the event.
:::

| Folder | What it is | Who uses it |
| --- | --- | --- |
| `the-greenlight/` | A Cowork skill that seats a council of audience personas, scores the same content once per audience, debates the conflicts, and greenlights a transformation plan. Ships as `SKILL.md` plus its reference verbs. | 🟢 Cowork |
| `data-pack/` | Five content pieces (`P1`-`P5`), four audience cards (the council seats), and a style guide. The synthetic data for the no-personal-data path. | Both |
| `the-greenlight-starter/` | Council-runner skeleton and deterministic checks for the code path. The contract, not the solution. | 🟣 Code |


## How these reach participants

Nobody browses this repo. `scripts/pack-downloads.mjs` zips these into `docs/public/downloads/` on every build, and the site serves them as direct downloads.

**So: edit the source here, and the downloads follow automatically.** Never edit anything under `docs/public/downloads/` - it's generated and gitignored.

## Adding a file

Drop it in the right folder. If it's a new top-level asset that participants download, add it to the `jobs` or `singles` array in `scripts/pack-downloads.mjs` and link it from `docs/resources/downloads.md`.
