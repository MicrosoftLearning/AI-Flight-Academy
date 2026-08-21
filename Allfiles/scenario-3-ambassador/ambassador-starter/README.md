# Ambassador starter

Half an ambassador programme. It runs, it produces recommendations, and it is wrong in
ways you can see.

```text
run.py                  the entry point
program/
  data.py               loads every CSV, attaches evidence to candidates
  evaluate.py           decides the rung. This is the half that was built
program-data/           72 candidates, ~2,000 evidence records
PLAYBOOK.md             the programme's rules and ladder
```

## Run it

```bash
python run.py                      # the shortlist
python run.py --all                # all 72, with what was ignored
python run.py --who "Alex Kim"     # one candidate in full
python run.py --export register.csv
```

No dependencies. Standard library only.

## What it does

Reads `CandidateProfiles.csv`, scores on three columns, assigns a rung from the ladder,
proposes a next action. Everything it prints is a proposal — nothing is sent and no
decision is recorded.

## What it does not do

`data.py` loads all nine files and attaches every evidence record to its candidate.
`evaluate.py` then uses **one** of them. Run `--all` and each line tells you what it
ignored for that person.

Specifically:

- Four columns in `CandidateProfiles.csv` are never read — `PeerSupport`,
  `KnowledgeSharing`, `CommunityContribution`, `MultiplierBehavior`
- 866 activity records, 283 peer comments, 390 contributions, 275 credentials, 128
  recognition events and 41 applications are all loaded and unused
- The weights in `evaluate.py` are asserted. Nothing in `PLAYBOOK.md` justifies
  `BusinessImpact` counting three times as much as anything else
- **R-004** and **R-006** from the playbook are not implemented at all

## Where to start

Run it and look at the top of the list. Then look up one of those people in the evidence
files and see whether the recommendation survives contact.

`evaluate.py` is about ninety lines. It is meant to be replaced.
