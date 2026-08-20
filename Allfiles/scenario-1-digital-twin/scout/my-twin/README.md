# My Twin – the Scout altitude

A digital twin that reads the participant's own work, writes what it learns to plain files, and
renders a local **Command Center** page from panels they can swap with each other.

Same idea as the Cowork twin, plus three things Cowork cannot do: it writes a real folder on disk,
runs a real build script, and can schedule itself.

## What's in here

```text
my-twin/
  SKILL.md                    activation contract, routing, setup, panel protocol
  references/                 written at setup - persona.md, voice.md, setup.md
  panels/
    PANEL-CONTRACT.md         the shape every panel must have
    i-owe-them.md             ships working
    owed-to-me.md             ships working
  data/                       one JSON per panel, rewritten on every refresh
  tools/build.mjs             renders panels + data -> command-center.html
```

`references/` and `data/` start empty. The skill fills them.

## Installing

Scout → **Extensions** → **Import**, and drag in the **`my-twin` folder** – not the `SKILL.md` on
its own, because the panels and the renderer have to come with it.

Then start a **new session** and say `set up my twin`.

## The design, in one page

**Setup does not interview.** It reads ~15 sent messages, ~30 days of calendar and recent Teams
messages, drafts `persona.md` and `voice.md` with every line tagged `[observed]`, `[inferred]` or
`[needs you]`, and presents them for correction. One round, then it writes.

**Then it renders immediately.** Setup ends with the two shipped panels run and a page on screen –
roughly fifteen minutes in. Everything after that is improvement, not construction.

**A panel is the unit of collaboration.** One file, one standing question, and *no personal data at
all*, enforced by `PANEL-CONTRACT.md`. Each person builds one panel against their own private
inbox, swaps the plain-text files, and everyone ends up with a full deck running on their own work.
Nobody sees anybody's mail.

```text
panels/<id>.md  ->  run it  ->  data/<id>.json  ->  build.mjs  ->  command-center.html
   shareable                       private                          local only
```

**Everything is local.** The page is a file opened from disk. There is no server and no host, and
the skill is told never to publish it.

## Running the renderer by hand

```powershell
cd my-twin
node tools/build.mjs
```

It prints one line per panel and writes `command-center.html` next to `SKILL.md`. Panels with no
JSON render as "never run" rather than failing, so the page always builds.

No dependencies – plain Node, no install step.

## Facilitator notes

- **Watch for panels that only run on their author's work.** The last checkbox in the
  contract – someone else ran the same file and got sensible items back – is the one worth
  enforcing at a table check.
- **Empty panels are usually a narrow `Pull`, not an empty inbox.** First thing to check when
  someone says it isn't working.
- **`checked` vs. item count.** The page shows both on purpose. Three items out of four hundred
  messages is a working panel; three out of six is a panel that didn't look.
- **If `node` is missing**, the skill is told to show panel results in the chat instead. The
  thinking still works; only the page is missing. Don't let it block the session.
- Nothing sends, at any point, including from a scheduled run.
