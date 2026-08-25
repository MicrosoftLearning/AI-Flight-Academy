---
title: Ground on live data with Work IQ
---

<!-- markdownlint-disable MD013 MD025 -->

# Ground on live data with Work IQ

**Tool:** Work IQ + exported markdown

<!-- #region guide -->
Live work data is powerful. It is also the easiest place to lose the whole session. The goal is not to build a full Microsoft Graph integration. The goal is to ground your spec in evidence. New to Work IQ? See [what it can see](/bricks/work-iq) first.

::: warning Do not spend the hack on Graph auth
A real Graph path means Azure AD app registration, permissions, admin consent questions, MSAL, token cache, and paging. Budget 30-60 minutes. That is most of the hack. Use one of the paths below instead.
:::

## Steps

1. Choose a realistic data path.

   | Path | Use when | How |
   | --- | --- | --- |
   | A · Cowork Work IQ | You can use your own tenant data. | Ask Cowork to retrieve and summarize, then export the result. |
   | B · Snapshot, do not stream | You need repeatability. | Generate one markdown snapshot from ~30 days of calendar. Regenerate monthly. |
   | C · Provided data pack | You need safe demo data. | Use a scenario's data pack – e.g. the Avery Washington persona pack at `/Allfiles/scenario-1-digital-twin/persona-pack/`. |

2. Pull the evidence you need, not everything you can access.

   ```text
   Review the last 30 days of my calendar. Summarize time allocation by category, recurring vs one-off meetings, self-organized vs invited meetings, accept/decline/tentative ratios, and obvious gaps between stated priorities and calendar behavior. Do not include private meeting details in the final output.
   ```

3. Extract the parts self-report cannot reach.

   | Signal | Why it matters |
   | --- | --- |
   | Time allocation by category | Shows what the person actually funds with attention. |
   | Response latency by sender | Gives an honest stakeholder ranking. People answer what they truly prioritize. |
   | Accept / decline / tentative ratios | Reveals conflict style and boundary strength. |
   | Self-organized vs invited ratio | Shows whether the person drives work or absorbs work. |
   | Recurring meeting load | Shows fixed capacity before new work arrives. |

4. Write the result as a small markdown file.

   ```md
   # revealed.md

   ## Window
   - Source: calendar snapshot
   - Range: last 30 days
   - Generated: 2026-07-29

   ## Measured behavior
   - 42% of scheduled time is customer-facing.
   - 31% is internal alignment.
   - 18% is focus time.
   - 9% is admin or travel buffer.

   ## Calendar vs stated intent
   - Says: protects mornings for strategy.
   - Calendar shows: mornings are the most fragmented block.

   ## Stakeholder response pattern
   - Fastest responses go to launch owners and direct manager.
   - Slowest responses go to broad FYI threads.

   ## Capacity rule implied by evidence
   - If a same-day executive ask collides with a peer promise, cut scope before slipping the peer promise.
   ```

5. Keep the snapshot slow-moving. Working style changes over weeks, not minutes.

   ```text
   Regenerate revealed.md monthly, or after a role change. Do not stream live calendar data into every agent run unless the task truly needs today's schedule.
   ```

6. Strip personal details before demoing.

   - Replace names with roles.
   - Remove meeting titles that reveal confidential work.
   - Show percentages and patterns, not raw calendar entries.

**You'll know it worked when...** your spec contains at least one measured behavior that contradicts, sharpens, or limits what the person says about themselves.

## Apply it to your scenario

Use Work IQ to create the evidence layer. Your agent can only reason from stated preferences unless you add observed behavior. `revealed.md` is where the scenario becomes grounded instead of aspirational.
<!-- #endregion guide -->
