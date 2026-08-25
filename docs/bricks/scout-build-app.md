---
title: Have Scout build you an app
---

<!-- markdownlint-disable MD013 MD025 -->

# Have Scout build you an app

**Tool:** Microsoft Scout + GitHub Copilot CLI

<!-- #region guide -->
Scout can scaffold a working local app, install what it needs, run it, and fix it when it breaks. You don't hand-write the code - you describe what you want and correct what comes back.

## Steps

1. Decide the **smallest version that would still be worth looking at**. Not the finished thing - the first thing that proves it works.
2. Describe it to Scout in one prompt: what it shows, where the data comes from, and what "running" means.
3. Let it scaffold and start. Expect the first run to fail somewhere; that's normal.
4. **Correct one thing at a time.** Tell it what's wrong, let it fix that, look again.
5. Once it runs, add capabilities **one per prompt**.

**You'll know it worked when...** you can start it with one command and see real output from your own data.

## A prompt shape that works

```text
Build me a local web app that <does one thing>.

Use a small Node web server that shells out to `copilot` for the reasoning,
with plain HTML/CSS/JS on the front end - no build step, minimal dependencies,
so it starts with one command.

Show <the specific thing you want to see>.

Start simple - I'll ask for more.
```

Three parts are doing the work:

- **"shells out to `copilot`"** - the CLI does the thinking, so you're not wiring up API keys
- **"no build step, minimal dependencies"** - keeps it startable on a machine you didn't configure
- **"start simple, I'll ask for more"** - stops it building nine features badly

## Why the CLI as the backend

Your app needs a model. The options are an API key (which you'd have to obtain, store, and not leak) or a tool that's already authenticated on the machine.

The Copilot CLI is already signed in. `copilot -p "<prompt>" --allow-all-tools` runs a prompt and returns the answer, so your server can just shell out to it.

::: warning Two things that will cost you time
**Approval prompts.** Without `--allow-all-tools` you'll sit clicking through permissions instead of building. Use it in your own working folder only.

**The Windows command line caps at 8191 characters.** Long prompts have to go via a file rather than an argument - write the prompt to a temp file and pass the path.
:::

## Layer, don't leap

Once one thing works, add the next. Each of these is its own prompt:

1. Get real output on the screen
2. Make it look like something
3. Add an input - drop a file, paste a link
4. Add a second view
5. Make it start in one step

Asking for all five at once usually gets you five things that are 70% done, and 70% doesn't run.

::: tip When it overshoots
Scout will occasionally build far more than you asked for. Don't start over - say what to remove. Steering it back is faster than re-describing from scratch, and it's the actual skill.
:::

## Make it easy to start

Finish by asking for a single start command - install once, then one command boots the server and opens the browser. If a teammate can't start it without you in the room, it isn't done.

## Apply it to your scenario

Name the thing you want to be able to *show* someone. Ask for the smallest version of that, get it running, then add one feature at a time until you run out of session.
<!-- #endregion guide -->
