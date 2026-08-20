# Command Center — a worked example

A local HTML page showing what's waiting on you, built from your twin.

**This is an example, not a requirement.** It ships so there's something working to read, copy, or
throw away. If a page isn't what you want from your twin, build something else — a command, a
briefing, a scheduled digest, a server. Nothing in the twin depends on this folder.

## How it works

```text
panels/<id>.md  ->  the twin runs it  ->  data/<id>.json  ->  build.mjs  ->  command-center.html
   the question                            what it found                      the page
```

Three parts, and the split is the interesting bit:

| | Holds | Personal data? |
| --- | --- | --- |
| `panels/*.md` | A standing question and how to answer it | **None** — that's the rule |
| `data/*.json` | What that question last returned | Yes. Stays local |
| `build.mjs` | Turns both into a page | No |

Because a panel holds no names, dates or quotes, **two people can swap panel files** and each get
answers from their own work. That's what makes it shareable — you're passing a question, not an
answer.

## Running it

Ask the twin to refresh it. If you want to run it by hand, use Scout's bundled Node – it lives in
Scout's installation directory under `resources/node/`, not on your `PATH`:

```powershell
cd extensions/command-center
& "<scout install>/resources/node/node.exe" build.mjs
```

Prints one line per panel and writes `command-center.html` beside it. Panels with no JSON render as
"never run" rather than failing, so the page always builds. No dependencies.

## What ships

| Panel | Question |
| --- | --- |
| `owed-to-me.md` | What have I asked for that never came back? |
| `i-owe-them.md` | What did I promise that I haven't delivered? |

`PANEL-CONTRACT.md` is the shape every panel has to follow. Read it before writing one.

## Worth knowing

- **A panel that comes back empty is usually a narrow `Pull`**, not an empty inbox. Widen the
  window first, then loosen what qualifies.
- **`checked` and `sources` are both on the page on purpose.** Three items out of 400 messages is a
  working panel; three out of six is a panel that didn't look. A source showing `0` means it wasn't
  read at all.
- **Reading Teams costs more than mail** — one call per chat. Keep the cap in the `Pull` sensible
  or the refresh gets slow enough that people stop running it.
