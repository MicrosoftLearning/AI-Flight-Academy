---
title: Where This Comes From
---

# Where This Comes From

The thinking behind the Digital Twin scenario, and how much weight each source can carry.

::: warning A note on sources
Most AI research circulates as **preprints** on arXiv — posted by the authors, not peer reviewed. That doesn't make it wrong, but it isn't settled science, and we don't build claims on it.

Below, anything stated as fact is either **peer reviewed** or **published by the lab that ran the work**. Everything else is listed as further reading, clearly marked, with no claims attached.
:::

## What we'll actually stand behind

### Where instructions sit in a prompt changes whether they're followed

**[Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)** · Liu et al.
*Peer reviewed — Transactions of the Association for Computational Linguistics.*

Model attention follows a U-curve. Content at the beginning or end of a prompt gets used; content in the middle is most likely to be missed — even when it's exactly what's needed.

**Why it matters here:** a long soul file buries its own best rules. Compression isn't tidying up, it's the work.

### Broad principles beat long, specific ones

**[Constitutional AI: Harmlessness from AI Feedback](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback)** · Anthropic
*Published by Anthropic on their own research site.*

While developing the technique, Anthropic reported that a short, broad principle worked notably well, and that writing longer and more specific versions tended to *reduce* effectiveness.

**Why it matters here:** the instinct to add one more clause is the instinct to make it worse.

## What we observed building it ourselves

Not research — one build, one person. Useful as a story, not as evidence:

The first twin we made was worse than no twin at all, because its author wrote down who they *wanted* to be. The spec said they escalated priority conflicts; in practice they just decided and told people after. It said they'd never ship anything unverified; in practice they cut scope and protected the date.

Rewriting those rules from what they actually did was the moment it started sounding like them. **That gap — between the self you describe and the self your calendar records — is the whole scenario.**

## Further reading

Preprints and project pages. Interesting, relevant, **not peer reviewed** — read them as ideas, not findings.

| | |
| --- | --- |
| [Reflexion](https://arxiv.org/abs/2303.11366) | An agent writes a plain-language post-mortem of its own failure and reads it back on the next attempt |
| [Self-Refine](https://arxiv.org/abs/2303.17651) | Generate, critique your own output, revise. One model, three roles |
| [MemGPT / Letta](https://arxiv.org/abs/2310.08560) | An agent that manages and edits its own memory as it runs |
| [Whose Opinions Do Language Models Reflect?](https://arxiv.org/abs/2303.17548) | Left alone, model output drifts toward an aggregate voice rather than any specific person |
| [Generative Agent Simulations of 1,000 People](https://arxiv.org/abs/2411.10109) | Building agents of real individuals from interviews and surveys, and measuring how closely they match |

These informed the 🟣 Advanced track's critic agent and the general shape of the scenario. None of them is doing any load-bearing work in what we claim.

## The honest limits

Say these out loud in your demo. They make it stronger, not weaker.

**The file gets better. The model doesn't learn.** A self-patching spec is real and genuinely useful, but every run simply reloads an improved file. Nothing is being trained.

**Sounding like you isn't being you.** A twin can match your phrasing closely and still be more predictable and less surprising than you are. It drafts. You decide.

**Your twin only knows what you've written down.** It can't infer what you've never done, what you're deliberately trying to change, or what you'd refuse outright — unless you tell it.
