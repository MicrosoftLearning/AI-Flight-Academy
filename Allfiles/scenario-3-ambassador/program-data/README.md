# Program data

Everything the AI Skilling Ambassador program has on its candidates: 72 people across nine regions
who run office hours, answer questions, mentor, coach, and write the guides other people reuse.
Nine files, ~2,000 rows.

| File | Rows | What it holds |
| --- | --- | --- |
| `CandidateProfiles.csv` | 72 | One row per person. Role, region, tenure, seven summary scores, plus an observed strength and a watchout |
| `CommunityActivities.csv` | 866 | What people actually did - office hours, guides, coaching, facilitation. Includes audience, quality signal, and how far the impact reached |
| `PeerFeedback.csv` | 283 | What colleagues said. Sentiment, theme, and **how well evidenced** the comment is |
| `ProgramContributions.csv` | 390 | What people left behind. Artifact type, whether it was adopted, reuse value, teams reached, and whether they created or maintained it |
| `LearningCredentials.csv` | 275 | Completions, and whether someone went on to facilitate or coach others |
| `RecognitionHistory.csv` | 128 | Who has been recognized before. **Not a shortcut** - see the playbook |
| `AmbassadorApplications.csv` | 41 | Who put themselves forward. Some strong candidates never did |
| `PolicyRules.csv` | 8 | The rules the program is meant to follow |
| `RewardTiers.csv` | 5 | The five tiers, and the action that goes with each one |

## The shape of it

`CandidateProfiles` is a **summary**. The seven scores are somebody's earlier read of each person,
not measurements - they are a starting point and they are not always right.

The other files are **evidence**. They join on `CandidateId`, and they are where the summary can be
confirmed, contradicted, or filled in.

A person can look strong in the summary and thin in the evidence. A person can look ordinary in the
summary and turn out to be holding a community together. Both exist in here.

## Two things worth knowing

**Volume is not the same as contribution.** Someone with forty activities and low quality signals is
not automatically ahead of someone with eight and a trail of unblocked people.

**Not everyone applied.** `AmbassadorApplications` has 41 rows against 72 candidates. A process that
starts from applications has already lost 31 of 72 people - more than 40% of the field.

## Where it came from

All of it is synthetic. See `DISCLAIMER.md`.
