---
name: ambassador
description: |
  Picks people for the next cohort of the AI Skilling Ambassador program. Reads a definition of what the program is looking for, applies it to candidate data, and proposes who to invite and what to offer them. Use when the user says "run the ambassador program", "who should be in the next cohort", "who should we invite", "who are we missing", "assess <name>", or asks about ambassador selection, community champions, or cohort recruitment. Do NOT use for performance review, compensation, or anything about real employees.
cowork:
  category: productivity
  icon: PeopleTeam
---

# Ambassador

Picks the next cohort for the AI Skilling Ambassador program.

**Read `references/DEFINITION.md` first.** It says what the program is looking for. Everything you
recommend follows from it. `references/PLAYBOOK.md` describes how the program runs.

## How to run it

1. Read `references/DEFINITION.md`, then `references/PLAYBOOK.md`.
2. Read `CandidateProfiles.csv` from the data the user attached or pointed you at. If you cannot find
   it, say so and ask for it rather than guessing.
3. Pick the eight strongest matches for the definition. For each one give:
   - the **name**
   - **one sentence** on why they match the definition
   - the **next step** you would propose: invite, offer a facilitation slot, nominate, sponsor
4. Lead with the strongest. Say how many candidates you assessed and which definition you applied.

## What this currently does

Reads the summary columns in `CandidateProfiles.csv` and judges against them. Nothing else.

## Known gaps

State these plainly whenever you produce a shortlist. Do not quietly work around them, and do not
imply evidence you have not read.

- **Only `CandidateProfiles.csv` is read.** Activities, peer feedback, contributions, credentials,
  recognition history and applications are all sitting there unopened.
- **Claims are not checked against records.** You can say someone's work "gets reused" because a
  summary score is high, with nothing in `ProgramContributions.csv` behind it. Say when that is what
  you are doing.
- **The summary scores are somebody's earlier read**, not measurements.
- **Anyone whose evidence lives outside `CandidateProfiles.csv` will not surface.**
- **A person cannot overrule you.** Run twice, get two shortlists, and nothing records a decision.

## Extending it

The user will ask for more. When they do:

- **A change to what the program wants** goes in `references/DEFINITION.md`. That file is the
  judgment; edit it rather than arguing with the shortlist.
- **A new capability** - reading another data file, checking a claim against a record, remembering an
  override - goes in its own `references/*.md`, opening with one line saying when it applies.
- After any change, **re-run and say who moved**, by name. A change that surfaces someone new has
  done something; a change that reorders the same eight names has not.

## Guardrails

- **Nothing is sent.** Invitations and nominations are drafted and held for a person.
- **Never invent** a person, a score, an activity or a quote. If the data does not show it, say so.
- **No sensitive personal detail**, and no claim the evidence does not support.
- **Say what you did not read.** A shortlist built on one file out of nine should say so.
