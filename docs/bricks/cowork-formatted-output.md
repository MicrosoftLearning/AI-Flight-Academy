---
title: Produce a formatted output
---

<!-- markdownlint-disable MD013 MD025 -->

# Produce a formatted output

**Tool:** Cowork  
**Source status:** Mostly liftable from Agent Academy

<!-- #region guide -->
A good Cowork run should produce something you can reuse: a brief, a table, a document, a spreadsheet, a PDF, a draft email, or a checklist. The trick is to define the shape before Cowork writes.

## Steps

1. Decide the output format before you run the task: markdown, Word document, Excel table, PDF, email draft, or Teams-ready summary.
2. Add an **output contract** to your prompt or skill. Name the exact sections, fields, and order.
3. Tell Cowork what to do when data is missing. Use a rule like: `If unknown, write "unknown" and list what evidence would resolve it.`
4. Use built-in skills when they help:
   - **Word** for polished documents.
   - **Excel** for rows, comparisons, calculations, and tracking.
   - **PDF** for reading or packaging fixed documents.
   - **Email** for composing, replying, forwarding, sending, or saving drafts.
5. Ask for a first draft in markdown if you need to inspect the structure.
6. After the structure is right, ask Cowork to convert it: `Create this as a Word document` or `Put the table into Excel with one row per item`.
7. Save the output contract inside your reusable skill so every run returns the same shape.

**You'll know it worked when...** a second run produces the same sections in the same order, even when the input data changes.

## Example output contract

```md
## Output contract

Return exactly these sections:

1. Executive summary — 3 bullets max.
2. Evidence table — one row per source with date, source type, claim, and confidence.
3. Recommended action — one paragraph.
4. Risks — bullets, each with owner and mitigation.
5. Open questions — only questions that block action.

Formatting rules:
- Use markdown headings.
- Do not merge sections.
- If a field is missing, write "unknown".
- Keep the whole output under one page unless I ask for detail.
```

::: tip Stable shapes make agents useful
Re-running only works when the output shape is predictable. If yesterday's answer is a memo and today's answer is a poem, you cannot compare them.
:::

## Apply it to your scenario

Pick the artifact your scenario needs at demo time. Then define its contract in the skill: section names, field names, length limits, and missing-data behavior. Use Word, Excel, PDF, or Email only when that format makes the result easier to use.
<!-- #endregion guide -->
