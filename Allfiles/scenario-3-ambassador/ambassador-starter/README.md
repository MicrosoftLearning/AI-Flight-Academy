# Ambassador starter

Scores AI Skilling Ambassador candidates and proposes a tier and a next action
for each one.

```text
run.py                  the entry point
program/
  data.py               loads every CSV, attaches evidence to candidates
  evaluate.py           scoring and tier assignment
program-data/           72 candidates, ~2,000 evidence records
PLAYBOOK.md             the program's rules and tiers
```

## Run it

```bash
python run.py                      # the shortlist
python run.py --all                # all 72, with what was ignored
python run.py --who "Alex Kim"     # one candidate in full
python run.py --export register.csv
```

No dependencies. Standard library only.

## How it scores

`data.py` reads all nine files and attaches every activity, comment,
contribution, credential, recognition record and application to its candidate.

`evaluate.py` scores on three columns from `CandidateProfiles.csv` -
`BusinessImpact` x3, `ExecutionReliability` x2, `LeadershipSignals` x1 - and
bands the result into a tier.

Everything it prints is a proposal. Nothing is sent, and no decision is recorded.

## Known gaps

Carried over from the first pass. Each recommendation lists its own unused
evidence per **R-005**, so these show up in the output as well as here.

- Four columns in `CandidateProfiles.csv` are loaded but not scored:
  `PeerSupport`, `KnowledgeSharing`, `CommunityContribution`,
  `MultiplierBehavior`
- The evidence files are attached to each candidate but do not affect the score:
  866 activities, 283 peer comments, 390 contributions, 275 credentials, 128
  recognition records, 41 applications
- The weights in `evaluate.py` predate the playbook and have not been
  reconciled against it
- **R-004** (prior recognition is not a reason to recognize again) and **R-006**
  (repeated activity with weak quality should not outrank quieter
  high-multiplier work) are not implemented

## Where to start

Run it, then look up someone near the top in the evidence files and check
whether the recommendation holds. `evaluate.py` is about ninety lines.
