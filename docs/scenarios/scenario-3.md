---
title: Scenario 3 · The Ambassador
---

# Scenario 3 – The Ambassador

::: warning 🚧 Work in progress
This scenario is drafted and being tested. Details may change before the event.
:::

## The problem

A community program has a thousand people in it and one person trying to run it. The job is to work out who's earned recognition, who should be invited in, who's ready for something bigger, and who's gone quiet — then do something about each one.

That work happens in a spreadsheet today. So it happens on whoever's numbers are already being collected: delivery, reliability, visible leadership. Those numbers reward the people producing the most output.

The program isn't looking for the most output. It's looking for the people who **make other people better** — whose sessions get repeated, whose templates get reused, whose name comes up when someone explains how they got unstuck. That signal exists in the data. It's just not in the column anybody's ranking on.

Both groups produce impressive numbers. Only one produces ambassadors.

## What you start with

**A half-built program.** Somebody wired up the scoring and stopped. It runs, and it's confidently wrong:

- It scores on three columns — business impact, execution reliability, leadership signals — and ignores four more sitting in the same rows: peer support, knowledge sharing, community contribution, multiplier behavior.
- Nine data files ship with it. It reads one.
- Its own playbook has eight rules. Two of them aren't implemented at all.

Run it and someone with excellent delivery numbers and thin community evidence lands near the top — their own watchout line says *"limited evidence of peer enablement or community lift."* The top rung ends up holding 16 of 72 people.

Everything you need to fix it is already in the folder. Nothing tells you how.

## What 'done' looks like

Two things, and the second is the session.

**Make it find the right people.** Teach it to read the evidence it's been ignoring, and show your work — a change counts when you can name who moved because of it.

**Then build something worth opening.** A better ranking is still just a ranking. A shortlist someone acts on, a brief per manager, a watch list of who's gone quiet, an audit of whether the outcomes are defensible, a page you check on a Monday — that's the output.

There's no single right answer here, and tables that build the same thing have probably missed the point. The recognition ladder — Explorer, Connector, Multiplier, **Flight Lead**, Review Hold — and the eight rules are given. What counts as evidence, and what you build on top, is yours.

::: tip Everything stays local
Nothing here is hosted and nothing is sent. Invitations, nominations and recognition are drafted and held for a person to approve — that's **R-005**, and it's in the playbook. The program proposes; a human decides.
:::

## The data

**72 candidates and roughly 2,000 evidence records across nine files.** It's all fictional — invented people, invented scores, invented feedback. No real person is described and no real program is modeled, which is what makes it safe to argue about in a room.

The point of shipping it is speed: you skip building a pipeline and spend the session on the judgment instead.

| File | Rows | What it holds |
| --- | --- | --- |
| `CandidateProfiles.csv` | 72 | Seven scores per person, plus observed strengths and watchouts |
| `CommunityActivities.csv` | 866 | What they ran, for whom, at what quality and scope |
| `ProgramContributions.csv` | 390 | What they made, whether it was reused, how many teams reached |
| `PeerFeedback.csv` | 283 | Sentiment, theme, evidence depth, confidence |
| `LearningCredentials.csv` | 275 | Completed, facilitated, coached |
| `RecognitionHistory.csv` | 128 | Who's been recognized before — deliberately not a shortcut |
| `AmbassadorApplications.csv` | 41 | Who put their hand up, which isn't the same as who's ready |
| `PolicyRules.csv` | 8 | R-001 to R-008 |
| `RewardTiers.csv` | 5 | The ladder and the action at each rung |

Two of the eight rules are the ones to look at first — **R-004** (prior recognition isn't a reason to recognize again) and **R-006** (repeated activity with weak quality doesn't outrank quieter high-multiplier work). Neither is implemented. Either one changes the list.

## What each altitude starts from

| | You start with | You build |
| --- | --- | --- |
| **🟢 Cowork** | The half-built skill, uploaded | Teach it to read more files, then build the output your table would use |
| **🔵 Scout** | The same skill, imported | The same, plus somewhere for it to live — a board, a scheduled scan, a brief |
| **🟣 Code** | A starter that runs, with the data pre-wired | Replace the judgment, build something headless |

Same spine, harder as the tooling gets more capable. The playbook is plain text at every altitude, so the rules you write move between them unchanged.

::: info Team model
In Cowork and Scout, each person teaches the skill to read a different evidence file, then the table combines them and compares who surfaced.

In Code, the table builds one system: one person owns the scoring, others own a reader per evidence file, the output, and the fairness check.
:::

## Start building

Pick your altitude:

<!-- markdownlint-disable MD033 -->
<BuildMatrix scenario="scenario-3" />
