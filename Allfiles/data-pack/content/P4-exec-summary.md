---
content_id: P4-exec-summary
genre: Whitepaper — executive summary
audience_card: AC-01
intent: Enable the reader to decide whether to proceed with Copilot summarization in their area
author_team: Contoso Enterprise Enablement
status: Draft for review
---

# Copilot Summarization in Microsoft Teams
## Control Posture and Readiness — Executive Summary

### Decision requested

Approve, approve with conditions, or defer expansion of Copilot meeting and chat summarization beyond the current pilot population. A decision is required before the next supervisory review cycle.

### What was assessed

Over an eight-week pilot, Enterprise Enablement and Platform Services jointly reviewed how Copilot-generated summaries are created, stored, retained, and surfaced. The assessment covered meeting recap, chat summarization, and generated action items. It did not cover any capability that produces outbound communication.

### Findings

| Control area | Status | Owner | Basis |
|---|---|---|---|
| **Retention** | Control exists | Records Management | Summaries inherit the retention policy applied to the underlying conversation. Verified against three retention configurations. |
| **Discoverability** | Control exists | Legal Hold Operations | Summaries are returned by existing search and hold processes. Verified on two closed matters. |
| **Attribution** | Control exists | Platform Services | Each summary is attributable to the user who requested it and carries the same identity signals as other content in the conversation. |
| **Data boundary** | Control exists | Platform Services | Processing remains within the existing tenant boundary. No change to the approved data-flow register. |
| **Supervisory review** | ⚠️ **No control** | *Unassigned* | Summaries are not currently routed into the supervisory review queue. They are retained and discoverable, but nothing surfaces them proactively for review. |
| **Client-facing use** | ⚠️ **No control** | *Unassigned* | Policy 4.2 does not address AI-assisted drafting of client communications. The policy predates the capability. |

### Where we do not have a control

Two gaps are material and should not be closed by guidance alone.

**Supervisory review.** A summary of a client-related conversation is a record, and it is retained — but it does not enter the queue. Anything that depends on a reviewer noticing it will not hold up under examination. This requires a routing rule, not a reminder.

**Client-facing use.** The pilot was scoped to internal use, and that scope was observed. Extending it without amending Policy 4.2 would create an unsupervised-communication exposure. Instructing users to "review output before sending" places the control on the individual and should not be recorded as a control.

### Recommendation

**Approve with conditions.**

1. Internal use only until Policy 4.2 is amended. Owner: Policy Governance. 
2. A routing rule places summaries of client-related conversations into the supervisory queue before the population is expanded. Owner: Surveillance Platform.
3. Reassess at the next quarterly control review, or on any change to the summarization scope — whichever comes first.

No attestation change is required for internal use under the current policy.

### Not in scope

Productivity measurement, licensing, training delivery, and adoption targets were excluded from this assessment and are addressed separately.
