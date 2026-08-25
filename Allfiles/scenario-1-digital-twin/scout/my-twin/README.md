# My Twin - the Scout altitude

A digital twin that reads the participant's own work, writes what it learns to plain files, and
answers questions the way they would. **What gets built on top of it is up to them.**

## What's in here

```text
my-twin/
  SKILL.md                  activation contract, routing, setup, how to extend
  references/               written at setup - persona.md, voice.md, setup.md
  templates/                the persona structure, read once during setup
  extensions/
    command-center/         a worked example. Panels + a renderer -> a local HTML page
```

`references/` starts empty. Setup fills it.

## Installing

Scout → **Extensions** → **Import**, and drag in the **`my-twin` folder** - not `SKILL.md` on its
own, because the templates and the example extension have to come with it.

Then start a **new session** and say `set up my twin`.

## The design

**Setup does not interview.** It reads ~15 sent messages, ~30 days of calendar and recent Teams
messages, drafts `persona.md` and `voice.md` with every line tagged `[observed]`, `[inferred]` or
`[needs you]`, and presents them for correction. One round, then it writes.

**It ends by proving itself.** Setup finishes with a live triage over what actually landed - not a
description of what it could do. Roughly fifteen minutes, and the participant has something working
before they've decided what to build.

**Then it gets out of the way.** `EXTENDING THE TWIN` in `SKILL.md` says how to build whatever they
ask for and deliberately does not push one shape. The Command Center is shipped as an example so
there's a worked reference, not because a page is the goal.

## Out of the box

| Ask | It does |
| --- | --- |
| `triage what landed` | Sorts mail and Teams into needs-me / blocked / handled / noise, with drafts |
| `what do I do about…` | One retrieval, one position, one draft in their voice |
| `draft a reply to…` | Follows `voice.md`, including the parts that aren't tidy |
| `what am I forgetting` | Reads across mail, Teams and calendar together |
| `show me my persona.md` | Prints it in the chat - they never open a file |
| `rename my twin to…` | Renames the skill, folder and trigger phrases together |

## Facilitator notes

- **The pivot to watch for:** people will ask "what should I build?" The answer is whatever annoys
  them most on a Monday. If a table stalls, the idea menu on the build page is the unstick.
- **Setup ending in a real triage is load-bearing.** If that step gets skipped, participants start
  building on something they've never seen work.
- **Teams is where the cost is.** One call per chat, no cross-chat search. The skill caps it at ~15
  chats; if someone's build reads far more than that, expect slow runs and say so early.
- **`[needs you]` on the `Never:` line is correct.** The skill refuses to invent a boundary. It's
  the highest-value line a participant can fill in.
- **Scout ships its own Node**, under `resources/node/` in its install directory - participants
  don't need to install anything. The skill is told to resolve that rather than a bare `node`.
- Nothing goes out without an explicit approval, and a scheduled run never sends at all - there's
  nobody there to approve it.
