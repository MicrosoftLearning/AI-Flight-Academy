# Ambassador starter

Picks people for the next cohort of an AI skilling ambassador program.

```text
cohort.py             the entry point
definition.md         what the program is looking for. Replace this
definitions/          three worked alternatives: reach, depth, rising
agent.py              ask() and ask_json(), over the GitHub Copilot CLI
program/
  data.py             loads the nine data files
program-data/         72 candidates, ~2,000 evidence records
PLAYBOOK.md           how the program describes itself
```

## Run it

```bash
python cohort.py
python cohort.py --who "Alex Kim"
python cohort.py --definition definitions/depth.md
```

Python 3.10+ and the GitHub Copilot CLI, signed in. No other dependencies.

## How it works

`cohort.py` reads `definition.md`, summarizes all 72 candidates, and sends both
to the model through `agent.py`. What comes back is a shortlist with a sentence
of reasoning and a proposed next step per person.

The definition is prose, not a formula. That is deliberate: no scoring function
evaluates "someone whose work gets reused by people they have never met."

## What it does not do

- **It reads `CandidateProfiles.csv` only.** `data.py` loads all nine files and
  attaches every activity, peer comment, contribution, credential, recognition
  record and application to its candidate. `cohort.py` sends the summary line.
- **Claims are not checked against rows.** The model is given summary counts, so
  it can say someone's work "gets reused across teams" without anything in
  `ProgramContributions.csv` supporting it. Nothing catches that.
- **A human cannot overrule it.** Run it twice and you get two lists. There is
  nowhere to record that you disagree.
- **Nothing is sent.** Everything printed is a proposal.

## Swap the definition

```bash
python cohort.py --definition definitions/reach.md    # work that travels
python cohort.py --definition definitions/depth.md    # helps individuals
python cohort.py --definition definitions/rising.md   # trajectory over standing
```

Three definitions, same 72 people, and the shortlists barely overlap. `depth.md`
and `rising.md` share two names out of eight, and each finds four people no
other definition surfaces.

Edit `definition.md` to say what your program is looking for, then re-run.
