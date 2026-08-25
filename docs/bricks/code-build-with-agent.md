---
title: Build against a contract with Copilot
---

<!-- markdownlint-disable MD013 MD025 -->

# Build against a contract with Copilot

**Tool:** VS Code + GitHub Copilot (agent mode)

<!-- #region guide -->
The Code altitude hands you a **contract, not a solution**: stubs, `TODO`s, and docstrings that say *what* to build, not *how*. Your job is to finish them - and the fastest way is to let Copilot agent mode write the code with you.

## Steps

1. Open the stub the build page points you at. Read the note at the top - it spells out, in plain English, exactly what it must take in and hand back.
2. Open **Copilot Chat in agent mode** in VS Code. It can see the whole repo - the stub, the library it calls, and the examples nearby.
3. Point it at that one stub and ask it to finish it:

   ```text
   Finish check_content.py so it matches the contract in its docstring.
   Use the existing helpers; don't invent new ones.
   ```

4. Run it. Read what came back **against the contract** - does it produce the shape the app expects?
5. Fix one thing at a time. Correct the prompt or the code, re-run, repeat.

**You'll know it worked when...** the stub is done and the app uses it - a "not wired" marker turns into a real result.

::: tip Layers, not one big prompt
Get one stub working end to end before the next. Small, verifiable steps beat a single prompt that half-works in five places.
:::

## Apply it to your scenario

Decide *what* each piece should prove or produce; let Copilot handle the syntax. Keep guardrails in the code - a check that fails loudly - not just in the prompt.
<!-- #endregion guide -->
