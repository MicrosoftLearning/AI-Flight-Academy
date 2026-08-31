# Twin code starter

A digital twin - your judgment and your voice, in plain files any program can call. It
reviews a diff the way you would, triages a list the way you would, drafts in your voice,
and takes a position on anything. Code review is one use, not the point.

```text
.github/skills/my-twin/     the twin. Every Copilot surface finds it here automatically
  SKILL.md                  how it answers
  references/
    persona.md              how Jordan decides
    voice.md                how Jordan writes
    standards.md            Jordan's bar for judging work (swap for your domain)
    memory.md               a dated log the twin reads before recurring work, and writes after
twin.py                     ask the twin something, from Python
onboard.py                  make it yours: a short interview that replaces Jordan
examples/
  review_diff.py            code - reviews a diff, exits non-zero to block
  decide.py                 general - takes a position on anything, in text or JSON
  triage.py                 non-code - sorts an inbox and drafts each reply
  status.py                 non-code - turns rough bullets into a status update in your voice
mcp_server.py               expose the twin as MCP tools
DISCLAIMER.md               what's fictional, and how to make it yours
```

Everything routes through `twin.py`. It shells out to the GitHub Copilot CLI, which
discovers the skill in `.github/skills/` and answers using the files in `references/`.

## The twin is fictional, on purpose

**Jordan Reyes** is a made-up engineer at Contoso, and the twin ships filled in - so the
starter answers on the first command and nothing personal goes into a shared exercise.
Everything you build runs against Jordan. Run `python onboard.py` to swap in your own, or
see `DISCLAIMER.md`.

## Three ways to reach it

The skill lives in `.github/skills/my-twin/`, the portable spot every Copilot surface
reads. Use whichever you like:

- **VS Code** - open this folder; GitHub Copilot loads the skill. In chat, ask *"using my
  twin, ..."*. `.vscode/mcp.json` also wires up the MCP server so Copilot can call it as a tool.
- **Copilot CLI** - from this folder, `copilot skill list` shows `my-twin` under **Project
  skills**. `twin.py` and the examples use the CLI under the hood.
- **GitHub coding agent** - the same `.github/skills/` folder is what the coding agent on
  github.com reads, so a twin committed here travels with the repo.

## Setup

Run everything from this folder.

```bash
copilot --version                    # install: npm install -g @github/copilot
copilot skill list                   # my-twin appears under "Project skills"
python twin.py "what should I do about a review I've been sitting on?"
```

For `mcp_server.py` only: `pip install -r requirements.txt`

## Calling the twin

```python
from twin import ask, ask_json

ask("Using my twin: should I take this on before Friday?")

ask_json("Using my twin: rate this change. Keys: verdict, reason.")
```

`ask_json` appends the JSON instruction, then tries progressively harder to find JSON in
the reply - as-is, inside a code fence, then the outermost braces.

## Two things that will shape what you build

**A call takes 20 to 60 seconds.** It is a full agent turn, not a completion. Anything
that calls the twin in a loop needs a bound on how many times it runs - review one diff,
not forty files.

**Ask for JSON when a program reads the answer.** Prose is fine for a terminal and useless
to a parser.

## The four examples

Each is a different kind of work, same `ask()` underneath. Read one, copy it, or delete it.

```bash
# code: review a diff, exit 1 to block - works as a pre-commit hook or CI step
python examples/review_diff.py --staged
git diff main... | python examples/review_diff.py --stdin

# general: take a position on anything, text or JSON
python examples/decide.py "a teammate wants to ship Friday but the migration isn't reversible yet"
python examples/decide.py --json "should I take the on-call swap this weekend?"

# non-code: sort an inbox and draft each reply
python examples/triage.py examples/inbox.sample.md

# non-code: turn rough bullets into a status update in your voice
python examples/status.py --to manager "shipped the guard; lantern slips to thu; fabrikam holding"
```

`review_diff.py` as a pre-commit hook:

```sh
# .git/hooks/pre-commit
#!/bin/sh
python examples/review_diff.py --staged || exit 1
```

## Memory - the twin gets better than a bare persona

`references/memory.md` is a dated, append-only log. The twin reads it before a recurring
task, so the next review or triage starts from what the last one learned rather than from
nothing. `review_diff.py` and `decide.py --remember` write to it; the twin reads it. That
durable trace is the difference between a plausible one-off answer and one that remembers
what you care about.

## Make it yours

```bash
python onboard.py
```

A short interview that writes your own `persona.md`, `voice.md`, and `standards.md` from
your answers, backing Jordan up as `*.jordan.md`. Runs locally; the CLI isn't required.
Any section it can't fill is marked `TODO:` - open the file and ask Copilot to expand it.

## The MCP server

```bash
pip install -r requirements.txt
python mcp_server.py
```

Four tools: `persona()`, `voice()` and `standards()` read the local files instantly;
`decide(situation)` runs a full turn. `.vscode/mcp.json` points VS Code at it, so Copilot
there can call the twin directly.
