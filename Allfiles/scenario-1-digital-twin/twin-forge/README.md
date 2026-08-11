# Twin Forge – a Cowork skill

Twin Forge builds a digital twin in two passes, installs it as a skill, and hands off. Participants extend it themselves afterwards.

```text
Pass 1 → soul.md   how they decide   (yes/no interview)
Pass 2 → voice.md  how they write    (reads their sent mail)
```

Everything after that – stakeholders, boundaries, projects – is the participant's own build, in a task of their own.

## Install

1. Download **`SKILL.md`** from this folder.
2. Open Microsoft 365 Copilot → the **Cowork** tab.
3. **Customize** → **Skills** → **Add ▾** → **Upload skill**.
4. Choose `SKILL.md`. You'll see **"Skill uploaded – twin-forge."**
5. **Start a new Cowork task.** Skills are discovered when a task begins, so an already-open one won't see it.

> ⚠️ **Upload the `.md` file on its own.** In testing, `.zip` uploads silently failed – the dialog closed and no skill appeared. Everything Twin Forge needs is inside `SKILL.md`, so there's nothing else to bundle.

**Alternative – OneDrive.** Copy `SKILL.md` to `/Documents/Cowork/skills/twin-forge/SKILL.md`, then start a new task.

## Run it

```text
Start Twin Forge and build my digital twin.
```

Also triggers on the phrases listed in the `description` field of `SKILL.md` – that frontmatter is the source of truth.

## What it produces

```text
/Documents/Cowork/skills/my-twin/
  SKILL.md          loads the twin in every new task
  references/
    soul.md         decision rules, boundaries, capacity, blind spots
    voice.md        verbatim samples + the rules they imply
```

Participants add more files here themselves – `stakeholders.md`, `boundaries.md`, `projects.md` – in a task of their own. Nobody opens a file directly; changes happen by asking in chat.

## The generated twin

The `SKILL.md` Twin Forge writes is scored by Cowork out of 100 (publish bar 70), across four dimensions worth 25 each:

| Dimension | How the template meets it |
| --- | --- |
| **Switches on at the right time** | Many phrasings, all of them the user explicitly naming the twin – plus an explicit instruction not to fire on general requests |
| **Knows what to do** | One numbered `## Procedure`, seven steps, every branch stating what happens next |
| **Stays in its lane** | Explicit "if they haven't named the twin, this skill should not be active" |
| **Handles surprises safely** | `## When you can't` gives exactly one required response per failure case; `## Never` blocks sending |

**"Knows what to do" is the one that scores low** in practice. It measures repeatability – same input, same result. Skills lose points for describing stages rather than numbering them, and for leaving branches implicit ("search their mail and Teams" doesn't say what happens when nothing matches). The template numbers every step and resolves every branch.

The template also carries an `## Extending this skill` section, because participants add reference files to it later and Cowork needs to know where they go – and which sections not to touch.

**Retrieval matters most in practice.** The user names a topic – *"the vendor renewal"* – and the twin searches mail, then Teams, then calendar, states what it found in one line, and answers about that. Nothing gets pasted.

**Explicit invocation is deliberate.** The twin only fires when the user asks it something by name. A broad description would hijack ordinary Cowork requests, which is worse than it not firing.

**The description also excludes maintenance wording.** Phrases like "add a reference document to my twin" contain "my twin" and would otherwise run the twin instead of editing it. The description carries an explicit negative for add/edit/extend/check, and names the participant-facing prefix *"Edit my twin skill"* as always-maintenance. The guide teaches two prefixes – *"Using my twin:"* to ask, *"Edit my twin skill:"* to change. Both halves are needed; the trigger collision is the single most likely way step 5 goes wrong.

## Where Twin Forge stops

Twin Forge builds `soul.md` and `voice.md`, installs the twin, and has the participant run it once. **Then it's done.**

Adding further reference files is deliberately *not* Twin Forge's job:

- It's the main event of the hack – 40 minutes of the two hours – and it should feel like the participant building, not an interview continuing.
- In testing, once a session moved into testing prompts it never cleanly returned to an interview phase.
- Doing it in a fresh task is the honest workflow: `Edit my twin skill: add a reference document that…`, and Cowork writes it.

## Design rules it follows

These are the constraints that keep it usable for non-technical participants:

- **Every question is yes or no.** No menus, no ranking, no essays. "Depends" counts as a no.
- **One question at a time.** Never batched.
- **Situations, not values.** "Have you ever…", never "Do you value…".
- **Role labels only** – peer, manager, senior stakeholder, customer. Never personal names, never the word "exec".
- **The user never edits a file.** Twin Forge makes every change itself.
- **One task, start to finish.** The only new task is the first one after upload.
- **No test, no quiz, no reveal.** The proof is a real thread from the participant's own mailbox, retrieved by the twin.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Skill doesn't trigger | Start a **new task** – skills load when a task begins |
| Upload seems to do nothing | Use the `.md` file, not a `.zip` |
| Says it can't find reference files | You have an old version. `SKILL.md` is fully self-contained |
| Avery path can't find the persona | Attach the pack files to the task |
| A new task doesn't know the twin | The `my-twin` folder isn't under `/Documents/Cowork/skills/`. Move it and start another task |
| It asks open-ended questions | Old version. Every question should be yes/no |
| It keeps interviewing after the twin works | Old version. Twin Forge hands off once the twin has run |

## What good output looks like

- **`soul.md`** ≈ one page, with real tiebreakers (*"when X conflicts with Y, choose Z"*) – not values like *"I value accuracy."*
- **`voice.md`** with **verbatim** samples. If it tidied up the punctuation, it's wrong – the quirks are the signal.
- **A `SKILL.md`** that retrieves through Work IQ, follows the numbered procedure, and clears the launch bar.
