# Instructions for GitHub Copilot

This repo is the Code-track Microsoft hackathon starter for **The Ambassador**: a picker that
shortlists candidates for the next cohort of a fictional AI Skilling Ambassador program.

## Concept

Contoso's ambassador program is run by volunteers who help colleagues use the company's AI tools -
office hours, mentoring, answering questions, and the guides other people reuse - on top of their day
jobs. Each round the program brings in eight new ambassadors, chosen from people already doing some
of this informally.

`cohort.py` makes that choice today. It reads `definition.md`, applies it to every candidate, and
returns eight names with a reason for each. It is fast and confident and **it cannot show its work** -
nobody can say why one name is on the list and another isn't. Closing that gap is the exercise.

The data is **synthetic**. Invented people, invented scores, invented feedback. See
`program-data/DISCLAIMER.md`. Do not introduce real personal data, and do not help a participant
point this at real colleagues, HR exports, or people lists.

## File layout

- `cohort.py` - the entry point. `--who` assesses one person, `--definition` swaps the criteria,
  `--limit` changes how many come back.
- `definition.md` - what the program is looking for, in plain text. **This is the file that drives
  the result.** Editing it is the cheapest way to change the shortlist.
- `definitions/` - three worked alternatives: `reach.md`, `depth.md`, `rising.md`. Each encodes a
  different value system and produces a visibly different shortlist.
- `agent.py` - `ask()` and `ask_json()`. A thin wrapper that shells out to the GitHub Copilot CLI.
  Despite the filename this is **not** an agent definition; it is the model call.
- `program/data.py` - loads the nine CSVs and joins them on `CandidateId`.
- `program-data/` - 72 candidates and ~2,000 evidence records across nine files.
- `PLAYBOOK.md` - how the program describes itself, including what counts as evidence.
- `.github/agents/` - role files. Each is Markdown with a `model:` in its front matter and
  instructions in the body. `cohort.py --challenge` loads `challenger.agent.md` and runs it
  as a second pass on its own model. Adding a role means writing another file and calling it
  the same way - see `role()` and `challenge()` in `cohort.py`.

## The shape of the data

`CandidateProfiles.csv` is a **summary** - seven scores that are somebody's earlier read of each
person, not measurements. The other eight files are **evidence**: what people actually ran, what
colleagues said, what they left behind, what they completed, who has been recognized before, and who
applied.

`cohort.py` currently sends the model one summary line per person and ignores the evidence files. A
person can look strong in the summary and thin in the evidence, or ordinary in the summary and be
holding a community together. Both exist in the data.

## What "better" means here

The shortlist is a **proposal for a human**, not a decision. When a participant asks for help
extending this, bias toward changes that make the human's job easier:

1. **Cite the record.** A claim about a person should point at the file and row behind it. If the
   evidence isn't there, say so rather than asserting it.
2. **Read past the summary.** The eight evidence files are the point. A change that opens them and
   surfaces someone the summary missed has done something real.
3. **Leave a way to overrule it.** A human correction should survive into the next run.
4. **Say what you didn't read.** A shortlist built on one file out of nine should admit that.
5. **Volume is not impact.** Forty low-signal activities do not outrank eight that changed how a team
   works. Prior recognition is not a reason to recognize someone again.
6. **Never invent.** No invented people, scores, quotes, or activity. If the data doesn't show it,
   say the data doesn't show it.

## House rules

- **The picker proposes; a person decides.** Don't build anything that takes the final
  call, and don't help a participant remove the human from the loop.
- **Bound the reads.** A call takes 20-60 seconds and is a full agent turn. Anything
  that calls per-candidate across 72 people needs a cap - batch instead, or slice the
  field first.
- **Ask for JSON when a program reads the answer.** `ask_json()` handles the parsing
  and copes with a model that adds a code fence anyway. Prose is useless to a parser.
- **Keep it small.** Get the smallest version running before adding to it. One change
  at a time, then re-run and compare - if three things change at once, nothing
  explains the shortlist moving.
- **Everything is local except the model call.** The CSVs stay on the participant's
  disk; the prompt built from them goes to the model over the Copilot CLI. There is
  nothing to deploy.
