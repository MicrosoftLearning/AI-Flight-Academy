---
title: Connect Cowork to a data source
---

<!-- markdownlint-disable MD013 MD025 -->

# Connect Cowork to a data source

**Tool:** Cowork  
**Source status:** Liftable from Agent Academy — Cowork Collective

<!-- #region guide -->
Cowork is already grounded in your Microsoft 365 work through **Work IQ**. There is no connector to install and no custom auth to build. Cowork can use what the signed-in user can already access: mail, sent mail, calendar, Teams chats and channels, OneDrive and SharePoint files, and people/org chart data.

::: tip Why this matters
The hard part is not connecting the data. The hard part is asking for the slice you need in a shape you can reuse.
:::

## Steps

1. Open **M365 Copilot** at `m365.cloud.microsoft`.
2. In the left rail, select the **Cowork** tab at the top, next to **Chat**.
3. Start a **New task**.
4. Ask for one specific source first. Good starter prompts:
   - `Find my last 10 sent emails. Return sender, recipient, date, subject, and the exact body text.`
   - `Summarize my calendar for the last 30 days. Group time by meeting category, organizer, and attendee count.`
   - `Find Teams messages where I was @mentioned last week. Return who asked, what they asked, and whether I replied.`
5. Ask Cowork to return the data in a structured shape. Use a table when you will inspect it. Use JSON or markdown headings when another skill will consume it.
6. To use a OneDrive or SharePoint file, attach it in the Cowork message or paste the file link. Then say exactly how it should be used, for example: `Use this file as the source of truth. Do not infer missing fields.`
7. Narrow the range if the answer is too broad. Ask for `last 30 days`, `last 10 sent emails`, `only meetings I organized`, or `only messages from my manager`.
8. Copy the useful prompt into your notes or skill instructions so you can run the same pull again.

**You'll know it worked when...** Cowork returns real work data that you recognize, with enough structure that you could paste it into a document, table, or skill input without cleaning it by hand.

## Ask for extractable data

Use prompts like this:

```text
Pull [source] for [time window]. Return one row per item with these columns: [columns]. If a field is unknown, write "unknown". Do not summarize before returning the table.
```

Example:

```text
Find my last 10 sent emails. Return one row per email with: date, recipient, subject, exact greeting, exact signoff, average sentence length, and three verbatim phrases that sound like me.
```

::: warning Keep the boundary clear
Cowork only sees what the signed-in user can see. Do not add credentials, secrets, or personal data that does not belong in the hack.
:::

## Apply it to your scenario

For any scenario, start by naming the evidence you need. Ask Cowork to pull that evidence from Work IQ, return it in a stable shape, and keep the raw examples available so your skill can reason from facts instead of vibes.
<!-- #endregion guide -->
