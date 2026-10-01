# Allfiles

Participant assets, one folder per scenario.

| Folder | Scenario |
| --- | --- |
| `scenario-1-digital-twin/` | The Digital Twin |
| `scenario-2-dispatch/` | Dispatch |
| `scenario-3-ambassador/` | The Ambassador |

## How participants get these

**They never browse this repo.** `scripts/pack-downloads.mjs` runs before every
`npm run docs:dev` and `npm run docs:build`, zipping these folders into
`docs/public/downloads/`. The site then serves them as direct downloads.

That means:

- **Edit the source here** - downloads regenerate automatically.
- **Never edit `docs/public/downloads/`** - it's generated and gitignored.
- Nothing goes stale, because the zips are rebuilt from source on every build.

## Adding a scenario

1. Create `Allfiles/scenario-N-<short-name>/`.
2. Add a `README.md` describing what each folder is for.
3. Register the assets in `scripts/pack-downloads.mjs`:
   - folders that should be zipped go in `jobs`
   - single files that ship as-is go in `singles`
4. Link them from the relevant build page.

> **Single files vs zips.** Cowork accepts a `.md`, or a `.zip`/`.skill` archive
> with `SKILL.md` at its root plus companion files. Use `singles` when a skill is
> genuinely one self-contained file and a zip would add nothing; use `jobs` when
> it has references beside it.