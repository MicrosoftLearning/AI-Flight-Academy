---
title: Scenario 0 · Flight Clearance
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# Scenario 0 - Flight Clearance

::: warning 🚧 Draft
This page is being built. The video and the form are not final.
:::

This is a readiness challenge, not a feature tour. Three missions, then one form.

<div class="brief">
<span class="brief-badge">Your finish line</span>

<p class="brief-lead">One saved skill, one Markdown flight plan, one artifact made from both, and one flight log filed.</p>

</div>

## What you need

| | |
| --- | --- |
| **One altitude you can open today** | Cowork, Scout, or Code |
| **A work-safe idea** | Something real enough to be useful, with nothing confidential in it |
| **Somewhere to save a `.md` file** | Your machine or OneDrive |

::: warning Keep your screenshots clean
You'll capture proof of each mission. Show only enough to prove it worked. No customer names, no personal data, no confidential content.
:::

## Watch this first

::: danger Video not linked yet
The pre-flight safety video is scripted but not yet published. This block gets the embed once the video exists.
:::

## 1 · Pick your altitude

Pick where you can get something done in the next fifty minutes. This is not a commitment for Team Week, and you can switch later.

<AltitudePicker />

::: tip Code is validated here, not taught
If your Code setup isn't working, don't spend the call on it. Switch to Cowork or Scout, finish the missions, and flag the blocker on your flight log.
:::

## 2 · Mission 1 - Earn your pilot certification

::: info 12 minutes
Create and save one skill. Keep it small.
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

## 3 · Mission 2 - File your flight plan

::: info 10 minutes
Write a Markdown file that gives AI context it can reuse.
:::

The skill is the method. The flight plan is the subject it works on: the facts about your team, your event, your customer. Keeping them apart is the point, because you can point the same skill at a different flight plan next week without touching the skill.

It's a separate file. You are not editing the skill or adding anything to its folder.

A title and a few sections is enough. Pick a pattern or write your own:

| Flight plan | Sections |
| --- | --- |
| **Team FAQ** | Key contacts, common questions, processes |
| **Event checklist** | Before, during, after |
| **Customer persona** | Role, goals, challenges |
| **Content review guide** | Voice, accuracy, accessibility |
| **Launch plan** | Audience, milestones, risks |

```markdown
# Event Checklist

## Before
- Confirm room and AV two weeks out
- Send the pre-read on the Friday before

## During
- Start the recording
- Capture questions you cannot answer live

## After
- Send notes within 24 hours
- Log follow-ups with owners
```

**Done when:** the `.md` file has a title, sections, and content you'd open again next week. Screenshot it.

## 4 · Mission 3 - Ready for departure

::: info 15 minutes
Use the skill and the flight plan together to produce one artifact.
:::

Attach the flight plan file to your message, or paste it in, then type one of these:

```text
Using my flight plan and my saved skill, create an action plan I can use next week.
```

```text
Read this flight plan, name the top gaps or risks, and recommend the next three actions.
```

```text
Using this flight plan as context, create a reusable checklist for this work.
```

::: tip Blocked? Use a sample and keep moving
If your own content is sensitive or something won't load, use one of the flight plan patterns above. Finishing the workflow is the point.
:::

**Done when:** you have an output on screen that you made from your own context. Screenshot it.

## 5 · File your flight log

One form, once, at the end. No separate submission per mission, and no screenshot scavenger hunt.

| Status | Pick this when |
| --- | --- |
| 🟢 **Cleared for takeoff** | You finished all three missions and your altitude works |
| 🟡 **Taxiing** | You finished most of it and have a small issue left |
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

Yes. Use one of the flight plan patterns above.

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
| 0:10 | Mission 1 | Coaches help with navigation and access |
| 0:22 | Mission 2 | Point at the flight plan patterns |
| 0:32 | Mission 3 | Point at the prompts |
| 0:47 | File the flight log | Open the form together |
| 0:55 | Clearance | Read the three statuses, route blockers |

Call a time check at 0:22, 0:32, and 0:47.

If someone is stuck for more than a few minutes, log the blocker and hand them a sample so they keep moving. Don't debug an environment in front of the room.

:::
