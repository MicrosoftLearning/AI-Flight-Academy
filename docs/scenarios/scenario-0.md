---
title: Scenario 0 · Flight Clearance
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# Scenario 0 - Flight Clearance

::: warning 🚧 Draft
This page is being built. The video and the form are not final.
:::

This is a readiness challenge, not a feature tour. Build one skill, prove it works, and file a flight log.

<div class="brief">
<span class="brief-badge">Your finish line</span>

<p class="brief-lead">One saved skill and one flight log filed.</p>

</div>

## What you need

| | |
| --- | --- |
| **One altitude you can open today** | Cowork, Scout, or Code |
| **A work-safe idea** | Something real enough to be useful, with nothing confidential in it |
| **Somewhere to save a `.md` file** | Your machine or OneDrive |

::: warning Keep your screenshots clean
You'll capture proof your skill works. Show only enough to prove it. No customer names, no personal data, no confidential content.
:::

## Watch this first

::: danger Video not linked yet
The pre-flight safety video is scripted but not yet published. This block gets the embed once the video exists.
:::

## 1 · Pick your altitude

Pick where you can get something done. This is not a commitment for Team Week, and you can switch later.

<AltitudePicker />

::: tip Code is validated here, not taught
If your Code setup isn't working, don't spend the call on it. Switch to Cowork or Scout, build your skill, and flag the blocker on your flight log.
:::

## 2 · Build a skill

::: tip Keep it small
You have plenty of time. Spend it on a skill that's genuinely useful, not a big one. A skill that does one thing well is the goal.
:::

A skill is a name, a description, and instructions. Start from one of these, or use your own:

| | |
| --- | --- |
| **Meeting recap assistant** | Turns notes into decisions, owners, next steps |
| **Event planning assistant** | Turns a date and audience into a task list |
| **Customer feedback analyzer** | Groups comments into themes |
| **Content reviewer** | Checks a draft against your team's voice |
| **Speaker bio generator** | Turns a role and history into a short bio |

The description is what makes a skill fire, so say when to use it, not just what it does.

<AltitudeOnly track="cowork">

1. Open **Customize → Skills**, then the arrow next to **Add**.
2. Choose **Create new**. Cowork asks what the skill should do and drafts it with you.
3. Name it in kebab-case, like `meeting-recap`.
4. Check the description says when to use it before you save.

**Start a new session before you test it.** Skills are discovered when a session begins.

</AltitudeOnly>

<AltitudeOnly track="scout">

Scout reads skills from `~/.copilot/skills/`. Have Scout write the file:

```text
Create a skill called meeting-recap in my skills folder. It should turn my
meeting notes into a summary with decisions, owners, and next steps. In the
description, say to use it when I ask to recap a meeting or write up notes.
```

That produces `~/.copilot/skills/meeting-recap/SKILL.md`:

```markdown
---
name: meeting-recap
description: Turns meeting notes into a summary with decisions, owners, and next steps. Use when asked to recap a meeting.
---

Read the notes and return three sections: Decisions, Owners, Next steps.
Keep each bullet to one line.
```

**Start a new session** so Scout picks it up, then ask it to use the skill by name.

</AltitudeOnly>

<AltitudeOnly track="code">

Do this in VS Code, in the Chat view with **Agent** selected. Copilot writes the skill for you:

```text
/create-skill a skill called meeting-recap that turns my meeting notes into
decisions, owners, and next steps. Use it when I ask to recap a meeting or
write up notes.
```

It asks a couple of questions, then creates `.github/skills/meeting-recap/SKILL.md` in your open folder:

```markdown
---
name: meeting-recap
description: Turns meeting notes into a summary with decisions, owners, and next steps. Use when asked to recap a meeting.
---

Read the notes and return three sections: Decisions, Owners, Next steps.
Keep each bullet to one line.
```

**Check it loaded:** type `/` in the chat box. Your skill appears in the list by name.

::: warning The name must match the folder
`name:` in the frontmatter has to equal the folder name exactly, lowercase with hyphens. If it doesn't, the skill fails to load and says nothing.
:::

Prefer the terminal? Put the same file in `~/.agents/skills/meeting-recap/SKILL.md` and run `/skills` in a Copilot CLI session.

</AltitudeOnly>

**Done when:** the skill is saved and its description says when to use it. Screenshot it.

### Want to go further?

A skill is complete with just `SKILL.md`. If you finish early, two optional add-ons, both real hack skills:

- **A reference file.** Put a Markdown file in the same folder as your `SKILL.md` - a style guide, a team glossary, an FAQ - and point to it from your instructions. The skill can pull it in when it runs, so you don't paste that context into every prompt.
- **A script.** Put a script in the folder and tell `SKILL.md` when to run it. Use this when the skill needs to *do* something, not just read something.

Neither is required to be cleared. They're here because the scenarios on the day lean on both.

## 3 · File your flight log

One short form. Your altitude, proof it works, and whether you're ready.

| Status | Pick this when |
| --- | --- |
| 🟢 **Cleared for takeoff** | You built and saved a skill and your altitude works |
| 🟡 **Taxiing** | You're close and have a small issue left |
| 🔴 **Needs ground crew support** | Something blocks you from using the tool at all |

**File it either way.** A blocked flight log is how you get help before Team Week.

<div class="form-embed">
  <iframe
    title="AI Flight Academy: Scenario 0 Flight Log"
    src="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR_Bd56YTwD1Gsu3sHRReLNdUQ0lPVkNOTEpaVkMxNkxHMkxXVEZOVVFXSy4u&embed=true"
    frameborder="0"
    marginwidth="0"
    marginheight="0"
    allowfullscreen>
  </iframe>
</div>

Form not loading? [Open the flight log in a new tab](https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR_Bd56YTwD1Gsu3sHRReLNdUQ0lPVkNOTEpaVkMxNkxHMkxXVEZOVVFXSy4u).

## Questions

::: details Do I need to be a developer?

No. Cowork is chat only and needs nothing installed. Scout describes and builds. Code is for people already working in VS Code.

:::

::: details Is this a test?

No. Nothing is scored and nothing is ranked. Filing the log is how you get help before Team Week.

:::

::: details What is Markdown?

Plain text with a bit of structure: `#` for a heading, `-` for a list item. A title and a few sections is all this needs.

:::

::: details Can I use a sample instead of my own work content?

Yes. Use one of the starter ideas above.

:::

::: details Can I change altitude before Team Week?

Yes. This records what you tested on the call, nothing more.

:::

::: details What if I can't finish?

File the flight log anyway and pick **Taxiing** or **Needs ground crew support**. That's the whole point of filing it.

:::

::: details Why a form?

So anything blocking you today gets fixed before Team Week, rather than on the day.

:::

## For facilitators

::: details Run of show

| Time | Segment | What you do |
| --- | --- | --- |
| 0:00 | Boarding | Welcome, name the finish line, point everyone at this page |
| 0:05 | Pick altitude | Explain the three, everyone opens one |
| 0:10 | Build a skill | Coaches help with navigation and access. Point early finishers at the reference file and script add-ons |
| 0:45 | File the flight log | Open the form together |
| 0:53 | Clearance | Read the three statuses, route blockers |

Call a time check at 0:30 and 0:45.

If someone is stuck for more than a few minutes, log the blocker and hand them a starter so they keep moving. Don't debug an environment in front of the room.

:::
