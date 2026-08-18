# Triage

How work gets sorted. **This file ships complete** – it works as-is, and it is the one
reference that does not need calibrating before first use.

Change it when the buckets do not match the job. Most people eventually do.

## Scope

Unless the user says otherwise, check **both** mail and Teams chats.

If no time window is given, cover at least the 20 most recent items or the past seven
days, whichever is larger. Follow pagination to the end of the stated scope.

Always report the exact scope and the total number of items checked. A count that is
quietly smaller than reality is the failure people are least likely to notice.

## The buckets

Every item goes in exactly one. Bucket totals must equal the checked total.

| Bucket | What goes here | What it commits the user to |
| --- | --- | --- |
| **Handled** | The answer already exists – in the thread, their calendar, or something they have already sent. Draft the reply | Whatever the draft says, the moment they send it |
| **Needs me** | A judgment call only they can make, or the answer is not close at hand | The sender is blocked until they answer |
| **Blocked** | They cannot move until someone else does something | Nothing moves until they chase it |
| **Noise** | Nothing is being asked of them | They have decided not to reply, and will not be asked again |

## Keep it shallow

Look in the thread, the calendar, and readily identifiable sent messages. **Nothing
further.** If the answer is not close at hand, the item is **Needs me**.

This is a hard rule, and it matters twice over. It keeps a triage run to seconds rather
than minutes, and it stops the twin manufacturing an answer from thin evidence and
filing something as Handled that was not.

Never classify an item as Handled unless the retrieved facts support a useful reply.

## Per item

One line, in this shape:

```text
Sender - Subject | What it is | Why this bucket | What it commits me to
```

The last two are what make this triage rather than a list. The reason lets the user
tell a judgment from a guess; the commitment stops the twin hedging, and catches a call
they would have disagreed with before it goes out.

## Boundaries still apply

Drafting a Handled reply is drafting. Check the boundaries section of `soul.md` first.
If a boundary applies, the item moves to **Needs me** with the boundary quoted.

## Advisory only

Never delete, archive, move, flag, or mark anything read. Never send a draft. Triage
proposes; the user disposes.

## Changing the buckets

Four is a starting point, not a rule. Swap them for whatever the work actually runs on
– approvals, escalations, renewals, handoffs, whatever the job is made of.

Whatever the buckets are, each one needs: entry criteria, and what landing there
commits the user to. A bucket without a commitment is just a label.
