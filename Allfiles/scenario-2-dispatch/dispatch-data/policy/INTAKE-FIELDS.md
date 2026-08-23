# Intake fields — what a request needs to be routable

Before the room can route a request, the request has to *say enough*. These are the fields the **intake-completeness check** looks for. A formed `RQ-…` has them all; a rough `IDEA-…` is missing several on purpose.

| Field | Required? | What "present" means |
|---|---|---|
| **Requester** | Required | A person or team to go back to |
| **Stated audience** | Required | Who it's for — even if the room later repoints it |
| **Topic** | Required | A real subject, not a placeholder like "AI stuff" |
| **Desired outcome** | Required | What success looks like for the audience — a capability or decision, not "a thing" |
| **Deadline / motion** | Recommended | A date or a trigger; its absence is a flag, not a blocker |
| **Trigger** | Recommended | Why now — a launch, a pain, a push |

## The rule the check enforces

- **All four required fields present** → the request is **routable**; the room can land a decision.
- **Any required field missing or a placeholder** → **not routable yet**; the room's job is to *sharpen* it first. A legitimate outcome is **defer** or **decline-and-redirect** ("go back to the requester for the missing piece").

> This is the honest gate: a room that confidently routes an under-specified request is guessing. Catching that is the point — the same way the Greenlight council catches a confident verdict with no evidence behind it.
