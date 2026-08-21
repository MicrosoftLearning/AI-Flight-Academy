---
name: ambassador
description: |
  Runs the Ambassador program. Reads candidate data and recommends who has earned recognition, what tier of the ladder they are on, what should happen next, and who needs to know. Use when the user says "run the ambassador program", "who should we recognize", "rank the candidates", "what tier is <name>", "who needs a next action", or asks about ambassador recognition, community champions, or the recognition ladder. Do NOT use for performance review, compensation, or anything about real employees.
cowork:
  category: productivity
  icon: PeopleTeam
---

# Ambassador

The AI Skilling Ambassador program, as far as it has been built.

**Read `references/PLAYBOOK.md` before answering anything.** It holds the ladder, the rules, and
what a recommendation has to contain. It is the authority - this file only says how to run.

## What this currently does

One thing. It reads `CandidateProfiles.csv`, sorts on the summary scores, and assigns a tier.

That is the whole implementation.

## How to run it

1. Read `references/PLAYBOOK.md`.
2. Read `CandidateProfiles.csv` from the data the user has attached or pointed you at. If you cannot
   find it, say so and ask for it rather than guessing.
3. For each candidate, take the summary scores and produce:
   - a **tier** from the ladder
   - a **next action**, from that tier
   - the **evidence** you used
   - **who needs to know**
4. Lead with the strongest recommendations. Say how many candidates you assessed.

## The scoring, as it stands

```text
overall = BusinessImpact          (weight 3)
        + ExecutionReliability    (weight 2)
        + LeadershipSignals       (weight 1)

>= 88 -> Flight Lead
>= 80 -> Multiplier
>= 72 -> Connector
>= 60 -> Explorer
else  -> Review Hold
```

Those were the three numbers already being reported, so those are the three it uses.

**Say the weights out loud when you present results**, so whoever is reading can see what drove
them - including which columns did not count.

## Known gaps

State these plainly whenever you produce a recommendation. Do not quietly work around them, and do
not pretend to evidence you have not read.

- **Only `CandidateProfiles.csv` is read.** Activities, peer feedback, contributions, credentials,
  recognition history and applications are all sitting there unused.
- **Four columns in that file are never scored** - `PeerSupport`, `KnowledgeSharing`,
  `CommunityContribution` and `MultiplierBehavior`. They are right there in the same rows.
- **The summary scores are somebody's earlier read**, not measurements. Nothing here checks them
  against what people actually did.
- **The weighting is asserted, not justified.** `BusinessImpact` carries three times the weight of
  community contribution, and nothing in the playbook supports that.
- **R-004 is not implemented** - prior recognition is not checked at all.
- **R-006 is not implemented** - activity volume and activity quality are indistinguishable here.
- **Nobody outside `CandidateProfiles.csv` can be found.** Anyone whose strength lives in the
  evidence files is invisible to this.

## Extending it

The user will ask for more. When they do:

- **A new rule or definition** goes in `references/PLAYBOOK.md`. The playbook is the program.
- **A new capability** - reading another data file, a new kind of check, a new output - goes in its
  own `references/*.md`, opening with one line saying when it applies.
- After any change, **re-run and say who moved**, by name. A change that surfaces someone new is the
  point; a change that only reorders the same names probably did not do much.

## Guardrails

- **Nothing is sent.** Invitations, nominations and recognition are drafted and held for a human.
- **Never invent** a person, a score, an activity or a quote. If the data does not show it, say so.
- **R-008 holds.** No sensitive personal detail, no claim the evidence does not support.
- **Say what you did not read.** An answer based on one file out of nine should say so.
