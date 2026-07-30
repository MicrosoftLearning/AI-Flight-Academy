---
title: The Research
---

# The Research

Everything the Digital Twin scenario claims, and where it comes from. All open-access.

## Bootstrapping a persona is already solved

**[LLM Agents Grounded in Self-Reports Enable General-Purpose Simulation of Individuals](https://arxiv.org/abs/2411.10109)** · Park et al., 2024 · Stanford, n=1,052

Built agents of 1,052 real people and scored them against each person's *own* consistency answering the same questions two weeks apart.

| Agent built from | Match |
| --- | --- |
| Demographics only | 74% |
| A survey battery | 82% |
| A 2-hour interview | 83% |
| Both | 86% |

**Why it matters here:** the intake *method* barely moves the number. That's why we hand you Twin Forge instead of making you fill out a form — bootstrapping isn't the hard part, so we spend the session on what is.

It also gives us a floor. An agent that knows only your job title scores 74%. **A twin built from what you say you value can land below that.**

## Shorter specs work better

**[Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)** · Bai et al., 2022 · Anthropic

Broad principles outperformed long specific ones. In Anthropic's own words, longer and more specific principles "damaged or reduced generalization and effectiveness."

**[Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)** · Liu et al., 2023

Attention follows a U-curve. Content at the start or end of a prompt gets used; content in the middle gets missed. In one test, a model with the answer buried mid-context scored *below* the same model given no context at all.

**Why it matters here:** compression isn't tidying up. A shorter soul file is a **better** soul file, and that's counterintuitive enough that people need to be told.

## Show your writing, don't describe it

**[How Well Do LLMs Imitate Human Writing Style?](https://arxiv.org/abs/2509.24930)** · Jemama & Kumar, 2025

Across five models and four prompting strategies: few-shot prompting on real writing produced **up to 23.5× higher style-matching accuracy** than zero-shot description. Completion-style prompting reached 99.9% agreement with the original author. Prompting strategy mattered more than model size.

One honest caveat from the same paper: high-fidelity imitation isn't the same as sounding human. Real essays averaged a perplexity of 29.5; matched model output averaged 15.2. **The style transfers. The unpredictability doesn't.**

**Why it matters here:** "professional but warm" does nothing. Ten real emails do almost everything.

## Models default to a generic professional

**[Whose Opinions Do Language Models Reflect?](https://arxiv.org/abs/2303.17548)** · Santurkar et al., 2023

Left alone, model outputs converge on an aggregate consensus voice rather than any specific individual.

**Why it matters here:** this is exactly what you'll watch happen. Your first twin will pick the well-adjusted answer — escalate to your manager, slip the date, send the considerate status note — because that's the average. Your job is to overwrite the average with what you actually do.

## Agents that improve their own spec

For the 🟣 Advanced track's critic agent:

- **[Reflexion](https://arxiv.org/abs/2303.11366)** · Shinn et al., 2023 — an agent writes a verbal post-mortem of its failure and reads it back on the next attempt.
- **[Self-Refine](https://arxiv.org/abs/2303.17651)** · Madaan et al., 2023 — generate, critique your own output, revise. One model, three roles.
- **[MemGPT / Letta](https://arxiv.org/abs/2310.08560)** · Packer et al., 2023 — an agent that edits its own memory file as it runs. The closest prior art to a self-patching soul file.

::: warning The honest limit
The **file** gets better. The **model** doesn't learn. Every run reloads an improved file — that's a real and useful thing, and it isn't training. Say so in your demo.
:::
