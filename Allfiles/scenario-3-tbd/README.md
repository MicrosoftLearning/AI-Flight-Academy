# Scenario 3 — TBD

Placeholder. Participant downloads for Scenario 3 go here once the scenario is locked.

## Suggested shape

Mirror Scenario 1 so the structure stays predictable:

```text
scenario-3-tbd/
  <skill-or-starter>/     what participants build from
  <data-pack>/           synthetic data for the no-personal-data path
  <test-or-worksheet>/   anything printed or filled in during the session
  README.md              this file, describing what each folder is
```

## When you add files here

1. Rename this folder to `scenario-3-<short-name>`.
2. Add the folder to the `jobs` array in `scripts/pack-downloads.mjs` so it gets zipped into the site's downloads.
3. Link it from `docs/resources/downloads.md`.
4. Replace this README with one describing the actual contents.

Participants never browse this repo — everything reaches them as a download from the site.