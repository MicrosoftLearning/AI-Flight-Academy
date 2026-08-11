---
title: Coach Playbook
---

# Coach Playbook

Use this when teams get stuck.

## Failure mode: they wrote down who they want to be

**What it looks like**

The spec is noble, generic, and wrong. It says things like "always escalate priority conflicts" or "never ship unverified work" even when the person's real behavior says otherwise.

**How to coach**

Let them hit it. It is the best learning moment of the day.

Ask the twin a sealed dilemma. When it misses, ask: "What real behavior would have predicted your answer?" Patch from that behavior.

## Failure mode: instruction interference

**What it looks like**

A small patch fixes one thing and breaks two others. One real example: adding the word "tentative" to explain a calendar pattern made the twin passive in unrelated decisions.

**How to coach**

Re-test old prompts after each meaningful edit. Keep patches local. Prefer a narrow rule over a broad adjective.

::: warning Watch adjectives
Words like tentative, aggressive, careful, strategic, and collaborative can bleed everywhere. Tie them to a situation.
:::

## Failure mode: the spec is too long

**What it looks like**

The team keeps adding principles, exceptions, and prose. The twin gets less consistent.

**Why it matters**

Anthropic [reported while building Constitutional AI](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback) that broad principles worked better than long, specific ones, and that the longer versions reduced effectiveness. ["Lost in the Middle"](https://arxiv.org/abs/2307.03172) (peer-reviewed, *Transactions of the ACL*) showed models attend worst to instructions buried mid-context.

**How to coach**

Ask for the one tiebreaker that matters. Move examples into references. Keep `soul.md` short enough to scan.

## Failure mode: they describe voice instead of proving it

**What it looks like**

`voice.md` says "warm, concise, executive-ready" but includes no real samples.

**Why it matters**

A description is the writer's *theory* of their own writing, and it's usually wrong – people can't see their own tells. The evidence is already sitting in their sent folder. Samples carry the specifics a description never will: the exact signoff, the punctuation habits, how the register shifts between an exec and a teammate.

**How to coach**

Have them paste 5–10 sent emails or use Avery Washington samples. Then extract rules the samples prove: opener, signoff, sentence length, punctuation, directness, and register by recipient.

## Failure mode: tooling eats the room

**What it looks like**

The team is debugging setup at 0:45 and has no working twin.

**How to coach**

Shrink the tool surface. Use Cowork and the Twin Forge skill. If needed, switch to the Avery Washington pack. The learning target is the portable spec, not a perfect integration.

## Failure mode: Code teams do not integrate

**What it looks like**

Each council owner builds a separate agent with separate rules. The final answer sounds like five opinions stapled together.

**How to coach**

Force one shared `soul.md`. The Arbiter owns tiebreakers. The Critic checks whether the final answer follows the shared spec.

## Timing rails

- **By 0:30:** v0.1 twin exists.
- **By 0:50:** first working draft exists.
- **By 1:20:** stop expanding; port or integrate.
- **By 1:40:** demo path is chosen.
- **By 2:00:** reveal is complete and each participant has one correction to make next.

::: tip Coach sentence
"Show me the last real example, then show me the smallest rule that would have predicted it."
:::

## Tooling traps (verified on a live tenant)

These are real, we hit them in testing. Call them out at the start of the Cowork altitude and you'll save the room twenty minutes.

| Symptom | Cause | Fix |
| --- | --- | --- |
| Uploaded a skill, nothing happened, no error | The upload was a `.zip`. It fails **silently** | Upload the `SKILL.md` file on its own |
| Skill installed but Cowork ignores it | The session was already open | Start a **new** Cowork session – skills load at session start |
| Agent says it can't find reference files | Companion files don't travel with a `.md` upload | Everything must be inline in `SKILL.md` |
| Path B: "persona pack isn't available" | The pack isn't in the Cowork workspace | Download it and **attach** the files to the session |

::: tip What a healthy run looks like
Twin Forge builds a 5-step plan, pulls sent mail and calendar through Work IQ, then asks behavioral questions one at a time. If it starts asking "what do you value?", it isn't running the skill – check that it actually loaded.
:::