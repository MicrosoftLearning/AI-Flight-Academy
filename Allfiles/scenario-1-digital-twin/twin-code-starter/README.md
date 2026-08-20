# Twin code starter

Your digital twin, callable from code.

```text
.github/skills/my-twin/     the twin. The Copilot CLI finds it here automatically
  SKILL.md                  how it answers
  references/
    persona.md              how you decide      ← replace with yours
    voice.md                how you write       ← replace with yours
twin.py                     ask your twin something, from Python
examples/
  review_diff.py            a worked example: reviews a diff, exits non-zero to block
mcp_server.py               expose the twin as MCP tools
```

Everything routes through `twin.py`. It shells out to the GitHub Copilot CLI, which
discovers the skill in `.github/skills/` and answers using the files in `references/`.

## Setup

```bash
copilot --version                    # install: npm install -g @github/copilot
copilot skill list                   # my-twin should appear under "Project skills"
python twin.py "what should I do about a review I've been sitting on?"
```

For `mcp_server.py` only: `pip install -r requirements.txt`

## Replace the example twin

`persona.md` and `voice.md` ship describing a **fictional engineer** so the starter runs
before you have written anything. Until you replace them, every answer is that person's.
Both files say so at the top, and the twin flags it in its own output.

Three ways to get your own, fastest first:

1. **Bring them.** If you built a twin in Cowork or Scout, copy your `persona.md` and
   `voice.md` straight into `references/`. Same format, no changes.
2. **Use the persona pack.** The Avery Washington pack gives you a synthetic inbox and
   calendar to write from, with no personal data involved.
3. **Write them.** Fifteen minutes, and the parts that change answers are sections 4, 5
   and 14 of `persona.md` — what you refuse, what wins when priorities collide, and how
   you handle the people you deal with most.

## Calling the twin

```python
from twin import ask, ask_json

ask("Using my twin: should I take this on before Friday?")

ask_json("Using my twin: rate this change. Keys: verdict, reason.")
```

`ask_json` appends the JSON instruction, strips a code fence if the model adds one, and
returns the parsed object.

## Two things that will shape what you build

**A call takes roughly 20 to 60 seconds.** It is a full agent turn, not a completion.
Anything that calls the twin in a loop needs a bound on how many times it runs — review
one diff, not forty files.

**Ask for JSON when a program reads the answer.** Prose is fine for a terminal and
useless to a parser. `ask_json` exists for this.

## The worked example

```bash
python examples/review_diff.py --staged      # review staged changes
git diff main... | python examples/review_diff.py -
```

Reviews a diff against your `persona.md`, prints the notes, and **exits 1 if your twin
would block it** — which is what makes it work as a pre-commit hook or a CI step:

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
runs a full turn. `.vscode/mcp.json` points VS Code at it, so Copilot there can call your
twin directly.
