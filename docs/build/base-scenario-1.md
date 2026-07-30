---
title: 🟢 Base · Copilot-Crafted — Scenario 1
---

<!-- markdownlint-disable MD013 MD025 -->

# 🟢 Base · Copilot-Crafted

## Scenario 1 — Digital Twin

**Building with:** Microsoft 365 Copilot + Cowork

::: tip Get the files
Twin Forge, the Marcus Webb persona pack, and the starter repo are all on the [Downloads page](/resources/downloads).
:::

You will build a small, portable digital twin: a one-page spec of how you work, plus a Cowork skill that can run against it.

## 1 · Your mission

Create a digital twin that captures how a person decides, writes, and actually spends time. Then use Cowork to run that twin on a realistic work conflict.

Your twin has three files:

1. `soul.md` — how the person decides: identity, priority stack, decision rules, stakeholders, boundaries, capacity, and blind spots.
2. `voice.md` — how the person writes: 5-10 real sent emails or synthetic samples, quoted verbatim, plus the style rules those samples imply.
3. `revealed.md` — what the calendar shows versus what the person says about themselves.

You can build from either data path:

- **Path A — Your own data:** use Work IQ through Cowork to pull your sent mail, calendar, Teams, files, and people context.
- **Path B — Marcus Webb persona:** use the synthetic marketing manager pack at `/Allfiles/persona-pack/`.

::: tip Team model
Each person builds their own twin. The team collaborates on the schema: what belongs in `soul.md`, what makes a useful tiebreaker, and what a good blind spot looks like.
:::

## 2 · What you'll demonstrate

You will demonstrate the Base altitude functions from the [🟢 Base · Copilot-Crafted level page](/levels/base/):

- Pull from a data source.
- Author a reusable Cowork skill.
- Produce a clean, formatted output.
- Re-run it on new inputs.

By the end, you should be able to show Cowork using your twin to handle a conflict: an executive ask collides with a promise to a peer.

## 3 · Assembly map — snap these blocks together

### Step 0 — Install Twin Forge

1. Download or open the provided skill folder at `/Allfiles/twin-forge/`.
2. In Cowork, go to **Customize** → **Skills** → **Add ▾** → **Upload skill**.
3. Upload the Twin Forge skill package, or manually copy it to OneDrive at `/Documents/Cowork/skills/twin-forge/`.
4. Start a **new Cowork session**.
5. Say: `Start Twin Forge and help me build a v0.1 digital twin.`
6. Choose Path A or Path B when asked.

Goal: a v0.1 twin in about 12 minutes.

### Step 1 — Connect the evidence

Use [Connect Cowork to a data source](/bricks/cowork-connect-source).

Ask Cowork for:

1. Last ~10 sent emails for voice evidence.
2. Last ~30 days of calendar for revealed behavior.
3. Relevant Teams or file context only if it helps explain the work.

### Step 2 — Build or edit the skill

Use [Write a reusable Cowork skill](/bricks/cowork-build-skill).

Twin Forge bootstraps the first pass. You improve it by making the rules shorter, clearer, and more testable.

### Step 3 — Format the twin

Use [Produce a formatted output](/bricks/cowork-formatted-output).

Keep the three files stable:

1. `soul.md`
2. `voice.md`
3. `revealed.md`

### Step 4 — Attack surface: COMPRESS

Cut `soul.md` hard. A good version is about one page.

Why: Anthropic's Constitutional AI work found that longer, more specific principles can damage or reduce generalization and effectiveness. Liu et al.'s "Lost in the Middle" work also shows that instructions buried in the middle of context are attended to worst. Short specs travel better.

### Step 5 — Attack surface: VOICE

Replace description with evidence.

Why: Jemama & Kumar (2025) found few-shot examples from real writing can be up to 23.5x more accurate for style matching than zero-shot descriptions. In plain English: describing your voice does almost nothing; pasting 10 real emails does almost everything.

### Step 6 — Attack surface: JUDGMENT

Add decision rules that resolve conflicts.

Bad rule: `I value accuracy.`

Good rule: `When an unverified claim threatens a committed date, cut scope and hold the date.`

### Step 7 — Team checkpoint

At about the halfway point, meet as a team for 10 minutes.

1. Each person shows one field from `soul.md` that helped.
2. Each person shows one weak or vague rule.
3. Steal the best fields from each other.
4. Agree on the shared schema your team will use.
5. Keep the instances individual.

### Step 8 — Mid-build twist

At about 55 minutes, test this conflict:

```text
A senior executive asks for a new customer narrative by 3 PM today. You already promised a peer that you would finish launch review notes by 4 PM. Use my twin to decide what to do, what to say to each person, and what scope to cut.
```

The point is not to be "nice." The point is to see whether your twin can make a grounded tradeoff.

### Step 9 — Re-run and arm one trigger

Use [Re-run a skill on new inputs](/bricks/cowork-rerun-skill).

Pick one:

1. **Scheduled prompt:** `Every weekday at 9 AM, compare today's calendar to my soul.md capacity rules and draft a focus plan.`
2. **Event-driven task:** trigger when an incoming email or Teams @mention asks for urgent help. Keep the default draft-and-approve flow.

::: warning Approval matters
Cowork may draft a response, but nothing should send without your approval during this hack.
:::

## 4 · The data

Choose one path.

### Path A — Your own Microsoft 365 data

Use Cowork's Work IQ grounding. It can reason over your mail, sent mail, calendar, Teams chats and channels, OneDrive and SharePoint files, and people/org chart context. It only sees what you can see.

Use safe prompts:

```text
Find my last 10 sent emails. Quote the relevant style samples verbatim. Do not include confidential content in the final demo.
```

```text
Summarize my last 30 days of calendar by category, organizer, tentative percentage, self-organized percentage, and recurring meetings.
```

### Path B — Marcus Webb persona pack

Use the synthetic data at `/Allfiles/persona-pack/`. Marcus Webb is a fictional marketing manager. Use this path if you do not want to use your own work data or if you need a clean demo dataset.

::: info Research note
Park et al. (2024, arXiv:2411.10109, n=1,052) found interview-built agents reached 83%, survey-built agents 82%, combined agents 86%, and demographics-only agents 74%. Bootstrapping is not the hard part. The hard part is refining what the first pass misses.
:::

## 5 · Demo checklist

Show these in 60-90 seconds:

- [ ] Which data path you used: your own data or Marcus Webb.
- [ ] Your `soul.md`, trimmed to about one page.
- [ ] Your `voice.md`, with verbatim samples and inferred rules.
- [ ] Your `revealed.md`, including one gap between stated behavior and calendar evidence.
- [ ] The executive-versus-peer conflict and Cowork's recommended tradeoff.
- [ ] One re-run on new input.
- [ ] One armed scheduled prompt or event-driven trigger, with draft-and-approve explained.

[← Back to start](/) · [Scenario 1 brief](/scenarios/scenario-1)
