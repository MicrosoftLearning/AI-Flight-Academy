# Scenario 1 - The Digital Twin

Everything participants download for Scenario 1.

::: warning 🚧 Work in progress
Still being built and tested. Contents may change before the event.
:::

| Folder | What it is | Who uses it |
| --- | --- | --- |
| `my-twin/` | The Cowork twin. Reads your mail, Teams and calendar through Work IQ, then writes and installs itself. Ships as a single `SKILL.md`, which is all it needs. | 🟢 Cowork |
| `scout/my-twin/` | The Scout twin. Same idea, plus an `extensions/` folder with one worked example of something built on top. Ships as a `.zip` because the folder matters. | 🔵 Scout |
| `twin-code-starter/` | The Code twin. One call that reaches it from Python, a worked example that runs headless, and an MCP server. The Copilot CLI discovers the skill from `.github/skills/`. | 🟣 Code |
| `persona-pack/` | Avery Washington - synthetic marketing manager with a fake inbox, calendar, and goals doc. Not used by a scenario 1 altitude any more; kept as safe demo data, and referenced by the Work IQ guide. | - |

## How these reach participants

Nobody browses this repo. `scripts/pack-downloads.mjs` zips these into `docs/public/downloads/` on every build, and the site serves them as direct downloads.

**So: edit the source here, and the downloads follow automatically.** Never edit anything under `docs/public/downloads/` - it's generated and gitignored.

## Adding a file

Drop it in the right folder. If it's a new top-level asset that participants download, add it to the `jobs` or `singles` array in `scripts/pack-downloads.mjs` and link it from `docs/resources/downloads.md`.
