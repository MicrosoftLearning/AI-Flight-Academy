---
title: Scenario 0 · Flight Clearance
---

<!-- markdownlint-disable MD013 MD025 MD033 -->

# Scenario 0 - Flight Clearance

::: warning 🚧 Draft — the video and the form aren't final yet
:::

<div class="brief">
<span class="brief-badge">Pre-flight checklist</span>

<p class="brief-lead">Build a skill, run it, and file your flight log.</p>

<p>A readiness gate, not a feature tour. You build on the altitude you'll use at Team Week, so any setup or access problem surfaces now instead of on the day.</p>

<ul class="brief-stats">
<li><strong>~45 min</strong> · one call</li>
<li><strong>1 skill</strong> · built and run</li>
<li><strong>1 flight log</strong> · filed either way</li>
</ul>

</div>

## What you need

Your altitude, set up and signed in. The [quick-start guide](/quick-start/) lists the exact requirements and a "you're ready when…" check for each one — run through it first if you haven't already.

Beyond that, all you need is **a work-safe idea** for your skill: something real enough to be useful, with nothing confidential in it.

**Keep your proof clean.** You'll screenshot your skill working — show only enough to prove it. No customer names, no personal data, no confidential content.

## Watch this first

🎬 *Pre-flight safety video — scripted, publishing soon. The embed lands here once it's live.*

## 1 · Pick your altitude

Pick where you can get something done today. This isn't a Team Week commitment — you can switch later.

<AltitudePicker />

**Code is validated here, not taught.** If your setup won't cooperate, don't burn the call on it. Switch to Cowork or Scout, build your skill, and flag the blocker on your flight log.

## 2 · Build your skill

A skill is three things: a **name**, a **description**, and **instructions**. Keep it small — one skill, one task.

Start from one of these everyday ideas, or bring your own:

| | |
| --- | --- |
| **Meeting recap assistant** | Turns notes into decisions, owners, next steps |
| **Event planning assistant** | Turns a date and audience into a task list |
| **Customer feedback analyzer** | Groups comments into themes |
| **Content reviewer** | Checks a draft against your team's voice |
| **Speaker bio generator** | Turns a role and history into a short bio |

**The description is what tells the agent when to use a skill** — write *when to use it*, not just what it does.

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

**Done when:** you start a fresh session, describe the task in your own words, the skill runs on its own, and you capture a screenshot showing it worked. Skills are discovered at the start of a session, so testing requires a new session.

### Finish early? Make it your own

A skill is complete with just `SKILL.md`. If you have time, two optional add-ons to push it further:

- **A reference file.** Drop a Markdown file beside your `SKILL.md` - a style guide, a glossary, an FAQ - and point to it from your instructions. The skill pulls it in when it runs, so you stop re-pasting the same context every prompt.
- **A script.** Put a script in the folder and tell `SKILL.md` when to run it. Use this when the skill needs to **do** something, not just read something.

Neither is required to be cleared.

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

::: details Run of show (45 min)

| Time | Segment | What you do |
| --- | --- | --- |
| 0:00 | Boarding | Welcome, name the finish line, point everyone at this page |
| 0:04 | Pick altitude | Explain the three, everyone opens one and confirms access |
| 0:10 | Build a skill | Coaches help with navigation and access, not skill design |
| 0:28 | Run it | Everyone starts a fresh session, runs their skill, and screenshots the proof. Point early finishers at the make-it-your-own add-ons |
| 0:36 | File the flight log | Open the form together |
| 0:42 | Clearance | Read the three statuses out loud, route blockers |

Call a time check at 0:20 and 0:35.

If someone is stuck for more than a few minutes, log the blocker and hand them a starter so they keep moving. Don't debug an environment in front of the room.

:::
