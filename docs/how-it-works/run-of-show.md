---
title: Run of Show
---

# Run of Show

Facilitator-facing agenda for the two-hour hack.

| Time | Segment | What happens |
| ---- | ------- | ------------ |
| 0:00–0:05 | Welcome | Frame the problem: Copilot personalizes by inference, which you cannot inspect, correct, or carry between tools. Teams write that layer explicitly. |
| 0:05–0:15 | Setup and path | Upload Twin Forge, start a new task. Participants choose their own data or Avery Washington's synthetic persona pack. Reinforce privacy. |
| 0:15–0:35 | Build `soul.md` | Twin Forge asks 8 yes/no situational questions and writes the file. Facilitators watch for values instead of tiebreakers — that's the coaching moment. |
| 0:35–0:50 | Build `voice.md` | Twin Forge reads ~10 real sent emails and extracts the style rules. Check that samples are verbatim, not tidied. Twin is installed by the end of this block. |
| 0:50–1:00 | First real run | Participants name an unresolved thread; the twin retrieves it and drafts. **Have them write down what it got wrong** — that list becomes their build backlog. |
| 1:00–1:40 | **Build — the main event** | New task per person. They add reference documents to their twin: stakeholders, projects, boundaries, whatever their run exposed. Bar is two new documents on the reading list, with visible before/after and one refusal. Two prefixes do the work: **"Using my twin:"** to ask it something, **"Edit my twin skill:"** to change it. |
| ~1:05 | Table round-robin | Two minutes: each person says what they're adding. Ideas spread fast here — don't skip it. |
| ~1:20 | Halfway share | Whoever has the best-working file reads it aloud. Others copy the structure. |
| 1:40–1:50 | Port or extend | Same folder in VS Code Copilot or the CLI, or add a schedule/trigger. Advanced teams integrate council agents against one shared `soul.md`. |
| 1:50–2:00 | Demos + close | Before/after on one prompt, a refusal citing their own rule, and which files they chose. |

::: warning Timing rails
By 0:50 every participant needs a working twin — if they're still tuning `soul.md` at 0:55, tell them to move on and fix it later. **Protect 1:00–1:40.** That block is where the learning is, and it's the first thing that gets eaten when earlier steps run long.
:::

::: info Facilitator notes
**The most common failure is a soul file full of values** — "I value accuracy" — which produces a twin that returns balanced options instead of decisions. The fix is always: ask what it *should* have decided, then have Cowork rewrite the line as "when X conflicts with Y, choose Z."

**In the build block, the failure mode is vague files.** If someone adds a file and nothing changes, it's one of three things: it isn't wired into `SKILL.md`, the routing line is too general, or the file describes instead of instructs. Check in that order.

**Watch for the trigger collision.** If a participant says "add a document to my twin", Cowork may answer *as* the twin instead of editing it. The fix is the prefix: **"Edit my twin skill:"** for changes, **"Using my twin:"** for questions. It's on the page, but it's the thing people skip.

**Watch for convergence.** Most tables independently land on stakeholders and boundaries. Call that out at the close — the room found the shape of a twin rather than being handed it.

**Optional pressure test** around 1:15: a senior stakeholder ask collides with a peer promise. Not a new objective — pressure on what they've built.
:::
