---
title: Ground Scout in your work with Work IQ
---

<!-- markdownlint-disable MD013 MD025 -->

# Ground Scout in your work with Work IQ

**Tool:** Microsoft Scout

<!-- #region guide -->
Scout can already reach your mail, calendar, Teams, files, and org chart. There's nothing to connect. The skill is asking for the *right slice*, in a shape you can reuse.

## Steps

1. Start a new Scout session.
2. Ask for **one source at a time**. Mixing sources in a single request tends to produce a summary of everything and evidence of nothing.
3. Tell it **not to summarize** before returning. Summaries throw away exactly the detail you need.
4. Name the shape you want back - a table, a list of rows, specific fields.
5. Keep the prompt that worked. You'll want to run it again next month.

**You'll know it worked when...** what comes back is specific enough that you could paste it straight into a file without editing it by hand.

## Prompts that return usable evidence

For how someone writes:

```text
Find my last 10 sent emails. Return one row per email with: date, recipient,
subject, the exact greeting, the exact signoff, and three verbatim phrases.
Do not summarize before returning the table.
```

For how someone actually spends time:

```text
Summarize my calendar for the last 30 days. Give me time by category, the
percentage I marked tentative, the percentage I organized myself, and my
typical response time by sender. Use percentages.
```

For what's landing on someone:

```text
Find the threads from the last two weeks where someone was waiting on me.
For each: who, what they asked for, how long it sat, and whether I replied.
```

## The part self-report can't reach

Ask a person how they work and you get their intent. The signals below give you their behavior, and the two rarely match:

| Signal | What it actually tells you |
| --- | --- |
| Response latency by sender | The real stakeholder ranking, whatever the org chart says |
| Accept / decline / tentative ratio | Whether they decide or defer |
| Self-organized vs. invited | Whether they drive or react |
| Time by category vs. stated priorities | Where the gap between intent and reality sits |

That gap is usually the most useful thing you'll find, and it's the part nobody can tell you about themselves.

## Snapshot, don't stream

You don't need a live connection. How someone works changes over months, not hours.

Pull the evidence once, write it into a file, and regenerate it monthly or after a role change. That keeps it inspectable, reviewable, and portable - none of which is true of an inference you can't see.

::: warning Don't build a Graph integration for this
Azure AD app registration plus MSAL is 30–60 minutes and it will eat your session. Scout already has the access. Use it.
:::

## Apply it to your scenario

Decide what evidence your scenario needs, ask Scout for that and nothing else, and write the result to a file your agents can read. Facts in a file beat vibes in a prompt.
<!-- #endregion guide -->
