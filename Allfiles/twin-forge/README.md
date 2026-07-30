# Twin Forge — a Cowork skill

Twin Forge interviews you and builds a **v0.1 digital twin** in about 12 minutes: `soul.md`, `voice.md`, and `revealed.md`.

::: tip Tested
Verified end to end on a live tenant — upload, trigger, Work IQ retrieval, behavioral interview.
:::

## Install

1. Download **`SKILL.md`** from this folder.
2. Open Microsoft 365 Copilot → the **Cowork** tab.
3. **Customize** → **Skills** → **Add ▾** → **Upload skill**.
4. Choose `SKILL.md`. You'll see **"Skill uploaded — twin-forge."**
5. **Start a new Cowork session.** Skills are discovered at session start, so an already-open session won't see it.

> ⚠️ **Upload the `.md` file on its own.** In testing, `.zip` uploads silently failed — the dialog closed and no skill appeared. Everything Twin Forge needs is inside `SKILL.md`, so there's nothing else to bundle.

**Alternative — OneDrive.** Copy `SKILL.md` to `/Documents/Cowork/skills/twin-forge/SKILL.md`, then start a new session.

## Run it

```text
Start Twin Forge and help me build a v0.1 digital twin.
```

Also triggers on: *build my digital twin*, *create my soul spec*, *forge my twin*, *build the Marcus Webb twin*.

## What happens

1. **Picks a path** — your own M365 data, or the Marcus Webb persona.
2. **Gathers evidence** — your last ~10 sent emails and ~30 days of calendar, via Work IQ. No setup, no auth.
3. **Interviews you** — ~8 behavioral questions, one at a time. Always *"what did you actually do last time?"*, never *"what do you value?"*
4. **Reconciles** — shows you the gap between what you said and what your calendar shows.
5. **Writes the three files.**

## Using Path B (Marcus Webb)

The persona pack **isn't in your Cowork workspace by default.** Download it from `Allfiles/persona-pack/` and **attach the files** to your session when Twin Forge asks. If you can't, take Path A instead.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Skill doesn't trigger | Start a **new** session — skills load at session start |
| Upload seems to do nothing | Use the `.md` file, not a `.zip` |
| Says it can't find reference files | You have an old version. `SKILL.md` is now fully self-contained |
| Path B can't find the persona | Attach the pack files to the session |

## What good output looks like

- **`soul.md`** ≈ one page, with real tiebreakers (*"when X conflicts with Y, choose Z"*) — not values like *"I value accuracy."*
- **`voice.md`** with **verbatim** samples. If it tidied up your punctuation, it's wrong — the quirks are the signal.
- **`revealed.md`** citing actual numbers from your calendar.

Twin Forge gets you to v0.1. **The compression is yours** — cut it hard.
