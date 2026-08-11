# Allfiles

Participant assets, one folder per scenario.

| Folder | Scenario | Status |
| --- | --- | --- |
| `scenario-1-digital-twin/` | The Digital Twin | 🚧 Work in progress |
| `scenario-2-greenlight/` | The Greenlight | 🚧 Work in progress |
| `scenario-3-tbd/` | TBD | Placeholder |

## How participants get these

**They never browse this repo.** `scripts/pack-downloads.mjs` runs before every
`npm run docs:dev` and `npm run docs:build`, zipping these folders into
`docs/public/downloads/`. The site then serves them as direct downloads.

That means:

- **Edit the source here** – downloads regenerate automatically.
- **Never edit `docs/public/downloads/`** – it's generated and gitignored.
- Nothing goes stale, because the zips are rebuilt from source on every build.

## Adding a scenario

1. Create `Allfiles/scenario-N-<short-name>/`.
2. Add a `README.md` describing what each folder is for.
3. Register the assets in `scripts/pack-downloads.mjs`:
   - folders that should be zipped go in `jobs`
   - single files that ship as-is go in `singles`
4. Link them from `docs/resources/downloads.md` and the relevant build page.

::: tip Single files vs zips
Some assets can't be zipped. Cowork's skill upload silently rejects `.zip`, so
`SKILL.md` files must ship on their own – that's what `singles` is for.
:::