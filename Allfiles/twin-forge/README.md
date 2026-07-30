# Twin Forge Cowork skill

Twin Forge walks you through building a digital twin and emits three files: `soul.md`, `voice.md`, and `revealed.md`.

## Install by upload

1. Download the `twin-forge` folder.
2. Open M365 Copilot at `m365.cloud.microsoft`.
3. Go to **Cowork** → **Customize** → **Skills**.
4. Select **Add ▾** → **Upload skill**.
5. Upload `SKILL.md`, a `.zip`, or a `.skill` package. If you use the whole folder, zip it first so the `references/` files stay with the skill.
6. Start a **new Cowork session**.

## Install manually

Copy this folder to OneDrive:

```text
/Documents/Cowork/skills/twin-forge/
  SKILL.md
  references/
    soul-schema.md
    voice-schema.md
    interview-questions.md
```

Cowork discovers custom skills automatically at the start of each session.

## Invoke it

Say:

```text
Start Twin Forge and help me build a v0.1 digital twin.
```

Other trigger phrases: `build my digital twin`, `create my soul spec`, `create my voice spec`, or `build the Marcus Webb twin`.

## Troubleshooting

- If Cowork does not pick it up, start a **new** Cowork session. Skills are discovered at session start.
- Confirm the file is named `SKILL.md`.
- Confirm the frontmatter includes `name` and `description`.
- Confirm the folder path is `/Documents/Cowork/skills/twin-forge/`.
- If uploading, use **Cowork** → **Customize** → **Skills** → **Add ▾** → **Upload skill**.
