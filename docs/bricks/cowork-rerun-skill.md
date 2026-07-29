---
title: Re-run a skill on new inputs
---

<!-- markdownlint-disable MD013 MD025 -->

# Re-run a skill on new inputs

**Tool:** Cowork  
**Source status:** Author from scratch (short)

A reusable skill gets more valuable when you run it again: on a new file, a new meeting, a new email, a new week, or a new trigger.

## Steps

1. Start a new Cowork task.
2. Use the same trigger phrase you put in the skill description, such as `Run the weekly briefing skill` or `Use my launch-review skill on this file`.
3. Point Cowork at the new input: attach a file, paste a link, name a meeting, name a sender, or give a time window.
4. Ask Cowork to keep the same output contract: `Use the same sections and field names as last time.`
5. Compare the new output with the previous run. Look for what changed, what stayed stable, and what needs a rule update.
6. If the task should run on a schedule, describe it in chat: `Send me a daily briefing every morning at 9 AM.`
7. Manage scheduled prompts on **Cowork** → **Scheduled**. The page has **Runs** and **Manage schedules** tabs. You can have up to 5 scheduled prompts.
8. If the task should react to work, use an event-driven task. Cowork can trigger on incoming email or a Teams message/@mention.
9. When Cowork proposes a **Set up trigger?** card, review **When**, **Run in**, **What it does**, and the permissions needed.
10. Keep the default **draft-and-approve** flow for actions that send messages. Cowork prepares the action and asks before sending.

**You'll know it worked when...** the same skill runs on fresh input without rewriting the instructions, and any scheduled or event-driven run still asks before sending externally visible messages.

::: warning Autonomy has guardrails
For event-driven tasks, Cowork's default is draft-and-approve. It can prepare an email or Teams response, but nothing sends without approval unless you explicitly configure otherwise.
:::

## Apply it to your scenario

Choose one moment where your scenario should repeat. It might be every morning, before every meeting, when a customer email arrives, or when someone @mentions you. Re-run the skill manually first. Then arm one schedule or trigger only after the output is reliable.
