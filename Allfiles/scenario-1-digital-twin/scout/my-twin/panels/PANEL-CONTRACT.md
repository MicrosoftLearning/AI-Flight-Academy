# The panel contract

A panel answers **one standing question** about the user's work, and it does it the same way every
time it runs.

Every panel is one file in `panels/`, named `<id>.md`. It holds a question and how to answer it, and
**no personal data whatsoever** – no names, no dates, no projects, no quotes.

That last rule is what makes a panel portable. Two people can swap panel files and each get answers
from their own work, because the file describes a question rather than an answer. Anything specific
to a person belongs in `references/`.

---

## Required shape

Copy this. Every heading is required, in this order.

```markdown
---
id: kebab-case-id
title: What the panel is called on the page
accent: amber
order: 10
---

## Question

One sentence, in the user's words. What they want to know every time they look.

## Pull

What to retrieve, and how far back. Be specific enough that two runs a week apart
are comparable.

## Decide

How to turn what was pulled into items. What qualifies, what gets excluded, and
what the tie-breaks are.

## Item

- **label** – the one line shown on the card
- **meta** – who and when, in a few words
- **age** – whole days since it started, or `null`
- **url** – a link back to the source, or `null`

## Empty

The exact sentence to print on the card when there are no items. Written for the
user to read, not as an instruction. Say what empty means here, not "no results".
```

### The fields

| Field | Rule |
| --- | --- |
| `id` | Kebab-case. Must match the filename and the JSON it writes |
| `title` | Plain words. What the user would call it |
| `accent` | One of `amber`, `red`, `blue`, `green`, `grey`. Colours the card header |
| `order` | Lower sorts first on the page. Optional, defaults to 50 |

### The Empty section is page copy

Everything above **Empty** tells the twin what to do. **Empty is different: it is printed on the
page word for word.** Write it as a sentence the user reads on a quiet Tuesday – not as a note to
whoever runs the panel.

> ✅ `Nothing outstanding. Every ask in the last three weeks came back.`
> ❌ `Say the window, and explain that this only sees written requests.`

---

## What it writes

Running a panel writes `data/<id>.json`. Nothing else writes to that file, and it is overwritten
on every run.

```json
{
  "id": "owed-to-me",
  "generated": "2026-08-19T07:00:00-04:00",
  "checked": 42,
  "window": "last 21 days",
  "items": [
    {
      "label": "Q3 budget line for the launch",
      "meta": "Priya · asked 6 Aug",
      "age": 13,
      "url": "https://outlook.office.com/mail/id/..."
    }
  ]
}
```

| Key | Rule |
| --- | --- |
| `generated` | ISO timestamp of the run |
| `checked` | How many items were examined. **Not** how many matched |
| `window` | The scope in plain words, so a stale panel is obvious |
| `items` | Array, newest problem first unless **Decide** says otherwise. `[]` is a valid answer |
| `error` | Only if the run failed. A one-line reason. Omit it otherwise |

`checked` matters. A panel showing three items after examining four hundred messages is doing
something very different from one that examined six, and the page shows both numbers.

---

## Rules

**One question per panel.** If the **Question** section needs an "and", it is two panels. A panel
that answers two things is one you cannot fix without breaking the other half.

**The Pull must be repeatable.** "Recent mail" is not a scope. "Sent mail, last 21 days" is. Two
runs a week apart should be comparable, and they only are if the window is written down.

**The Decide must be able to return nothing.** Write the exclusions, not just the matches. A panel
that can never be empty is a panel that pads, and a padded panel gets ignored by Thursday.

**Never name a person, project, date or team.** Describe the *kind* of thing – "anyone outside my
team", "a commitment with a date attached". Named panels stop being shareable, which defeats the
point of the contract.

**No panel sends anything.** Panels read and report. Drafting is the twin's job, and sending is
nobody's.

---

## Before you ship a panel

- [ ] Every required heading is present, in order
- [ ] `id` matches the filename
- [ ] The **Pull** names a window in days
- [ ] The **Decide** says what is excluded, not only what matches
- [ ] The **Empty** line reads as page copy, not as an instruction
- [ ] No name, date, project or quote appears anywhere in the file
- [ ] It has been run once and rendered
- [ ] Someone else ran the same file against their own work and got sensible items back

The last box is the real test. A panel that only works for its author is a note, not a panel.
