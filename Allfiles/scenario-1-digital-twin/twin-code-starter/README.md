# Twin code starter

A digital twin, callable from code.

```text
.github/skills/my-twin/     the twin. The Copilot CLI finds it here automatically
  SKILL.md                  how it answers
  references/
    persona.md              how Jordan decides
    voice.md                how Jordan writes
twin.py                     ask the twin something, from Python
examples/
  review_diff.py            a worked example: reviews a diff, exits non-zero to block
mcp_server.py               expose the twin as MCP tools
DISCLAIMER.md               what's fictional, and how to make it yours later
```

Everything routes through `twin.py`. It shells out to the GitHub Copilot CLI, which
discovers the skill in `.github/skills/` and answers using the files in `references/`.

## The twin is fictional, on purpose

**Jordan Reyes** is a made-up engineer at Contoso, and the twin ships filled in. That
means the starter answers on the first command, and nothing personal goes into a shared
exercise.

Everything you build runs against Jordan. See `DISCLAIMER.md` for what's invented and how
to point the twin at your own work afterwards.

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
the reply — as-is, inside a code fence, then the outermost braces.

## Two things that will shape what you build

**A call takes 20 to 60 seconds.** It is a full agent turn, not a completion. Anything
that calls the twin in a loop needs a bound on how many times it runs — review one diff,
not forty files.

**Ask for JSON when a program reads the answer.** Prose is fine for a terminal and
useless to a parser.

## The worked example

```bash
python examples/review_diff.py --staged                     # staged changes
git diff main... | python examples/review_diff.py --stdin
```

Reviews a diff against `persona.md`, prints the notes, and **exits 1 if the twin would
block it** — which is what makes it work as a pre-commit hook or a CI step:

```sh
# .git/hooks/pre-commit
#!/bin/sh
python examples/review_diff.py --staged || exit 1
```

It is one example, not a template. Read it, copy it, or delete it.

## The MCP server

```bash
pip install -r requirements.txt
python mcp_server.py
```

Three tools: `persona()` and `voice()` read the local files instantly, `decide(situation)`
runs a full turn. `.vscode/mcp.json` points VS Code at it, so Copilot there can call the
twin directly.
