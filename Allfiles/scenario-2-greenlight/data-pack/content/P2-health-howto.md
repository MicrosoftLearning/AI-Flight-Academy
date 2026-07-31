---
content_id: P2-health-howto
genre: Docs how-to
audience_card: AC-03
intent: Enable a clinical informatics manager to allow meeting summarization on a clinical unit without creating a PHI exposure
author_team: Contoso Enterprise Enablement
status: Published
---

# Summarize a clinical meeting without exposing patient information

This article covers meeting summarization in Teams for meetings held on or about a clinical unit. It applies to huddles, safety briefs, and operational meetings. It does not apply to any meeting where care is being delivered or documented.

## What must never be entered

Do not enter identifiable patient information into a Copilot prompt. This includes name, MRN, date of birth, admission date, room and bed, and any free text that would identify a patient to someone reading it.

This restriction applies to what you type. It does not change what is already in a meeting.

## What happens to a meeting summary

A summary of a recorded meeting is generated from the meeting content and stored in the tenant. It inherits the retention policy applied to the meeting itself and is returned by existing search and hold processes.

Access is logged. Anyone retrieving a summary that contains patient information is subject to the same minimum-necessary rules and the same audit review as any other access to that information.

## Before you enable it on a unit

Confirm all four:

1. The meeting series has been reviewed by Clinical Governance. Summarization on a clinical unit is a change to the clinical environment, not an IT setting.
2. The meeting is not used to document care.
3. Participants have been told the meeting will be summarized, at the meeting, not by email.
4. A named owner reviews the summary before it is shared beyond the participants.

If any of these is not true, do not enable it yet.

## During a downtime event

Summarization depends on the same connectivity as the rest of Teams. During a downtime event, assume it is unavailable and fall back to the paper handoff procedure for the unit. Do not wait to see whether it recovers.

## Reviewing the output

A summary reflects what was said, including anything said in error. It does not distinguish a confirmed finding from a comment. Anything from a summary that reaches a chart must be verified against the source first.

Where a meeting has included patient-identifiable discussion, run Copilot's PHI Redaction Preview against the summary before it is shared outside the participant group. The preview flags identifiers for removal and produces a version safe for wider distribution.

## What to hand a clinician

Clinicians do not need this article. They need three sentences: the meeting will be summarized, do not type patient details into Copilot, and check anything you plan to act on. If they need more than that, the workflow is wrong.
