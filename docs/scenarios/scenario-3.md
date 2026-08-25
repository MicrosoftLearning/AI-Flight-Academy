---
title: Scenario 3 · The Ambassador
---

# Scenario 3 - The Ambassador

::: warning 🚧 Work in progress
This scenario is drafted and being tested. Details may change before the event.
:::

## The problem

The **AI Skilling Ambassador program** is how a company gets its people actually using the AI tools it rolled out. Ambassadors across nine regions do it on top of their real jobs: they run office hours, answer questions, mentor one-on-one, coach peers through a first agent build, and write the quickstart guides and localization aids everyone else leans on.

Nobody is paid for it, so the program runs on what it can offer back: an invitation in, a facilitation slot, a nomination, a sponsor conversation. Keeping the program staffed means getting those calls right. Last round five people withdrew and seven were passed over.

Those decisions get made in a spreadsheet, on whichever numbers are already collected: delivery, reliability, visible leadership. Those reward the people producing the most output.

An ambassador program doesn't run on the most output. It runs on the people who **make other people better**: whose sessions get repeated, whose templates get reused, whose name comes up when someone explains how they got unstuck. That signal is in the data. It just isn't in the column anybody's ranking on.

Both groups produce impressive numbers. Only one keeps a community going.

## What you start with

**A working cohort picker**, left behind by whoever ran the program last. It runs, it is confident, and it cannot show its work:

- It reads `DEFINITION.md`, a three-line description of what the program wants, and applies it to the candidates.
- Nine data files ship with it. It opens one.
- Nothing it says is checked against a record.

Run it and it returns eight names, a reason for each, and what to offer them. Some of those reasons rest on a summary score rather than anything anyone did.

Everything needed to fix that is in the folder. What counts as evidence, and how you check it, is your call.

## What 'done' looks like

Three conditions, and how you meet them is yours.

**Find someone it misses.** The definition is prose in a file, so change what the program is looking for and different people surface. Three worked alternatives ship with it.

**Show the evidence.** Every claim should point at a record that supports it, and say so when it can't.

**Let a person overrule it.** A disagreement that survives the next run is the difference between a tool and a one-off answer.

There's no single right answer here, and tables that build the same thing have probably missed the point.

::: tip Everything stays local
Nothing here is hosted and nothing is sent. Invitations and nominations are drafted and held for a person to approve.
:::

## The data

**72 candidates and roughly 2,000 evidence records across nine files.** It's all fictional: invented people, invented scores, invented feedback. No real person is described and no real program is modeled.

The point of shipping it is speed: you skip building a pipeline and spend the session on the judgment instead.

| File | Rows | What it holds |
| --- | --- | --- |
| `CandidateProfiles.csv` | 72 | Seven scores per person, plus observed strengths and watchouts |
| `CommunityActivities.csv` | 866 | What they ran, for whom, at what quality and scope |
| `ProgramContributions.csv` | 390 | What they made, whether it was reused, how many teams reached |
| `PeerFeedback.csv` | 283 | Sentiment, theme, evidence depth, confidence |
| `LearningCredentials.csv` | 275 | Completed, facilitated, coached |
| `RecognitionHistory.csv` | 128 | Who's been recognized before |
| `AmbassadorApplications.csv` | 41 | Who put their hand up, which isn't the same as who's ready |
| `PolicyRules.csv` | 8 | How the program says it makes calls |
| `RewardTiers.csv` | 5 | What the program can offer someone |

Only `CandidateProfiles.csv` is read. The other eight hold what an ambassador actually does: whose guide got reused, who unblocked somebody, whose name a peer brings up.

## What each altitude starts from

| | You start with | You build |
| --- | --- | --- |
| **🟢 Cowork** | The Ambassador skill, uploaded | Something that meets the three conditions, built in chat |
| **🔵 Scout** | The same skill, imported | The same, plus a fourth condition: it runs again without you |
| **🟣 Code** | `cohort.py`, a working picker | The same three, in code you own |

Same three conditions everywhere. The definition is plain text at every altitude, so what your table decides counts moves between them unchanged.

::: info Team model
Every altitude works to conditions rather than a plan. The table picks which one to go after, splits it, and shows one name their build found that the shipped version missed.
:::

## Start building

Pick your altitude:

<!-- markdownlint-disable MD033 -->
<BuildMatrix scenario="scenario-3" />
