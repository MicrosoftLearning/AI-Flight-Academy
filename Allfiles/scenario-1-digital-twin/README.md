# Scenario 1 – The Digital Twin

Everything participants download for Scenario 1.

::: warning 🚧 Work in progress
Still being built and tested. Contents may change before the event.
:::

| Folder | What it is | Who uses it |
| --- | --- | --- |
| `twin-forge/` | A Cowork skill that interviews you, reads your sent mail, and installs your twin. Ships as a single `SKILL.md` – Cowork's skill upload rejects `.zip`. | 🟢 Cowork |
| `digital-twin-starter/` | Schema, MCP server skeleton, council runner, and test harness. The contract, not the solution. | 🟣 Code |
| `persona-pack/` | Avery Washington – synthetic marketing manager with a fake inbox, calendar, and goals doc. For anyone not using their own data. | Both |

## How these reach participants

Nobody browses this repo. `scripts/pack-downloads.mjs` zips these into `docs/public/downloads/` on every build, and the site serves them as direct downloads.

**So: edit the source here, and the downloads follow automatically.** Never edit anything under `docs/public/downloads/` – it's generated and gitignored.

## Adding a file

Drop it in the right folder. If it's a new top-level asset that participants download, add it to the `jobs` or `singles` array in `scripts/pack-downloads.mjs` and link it from `docs/resources/downloads.md`.
