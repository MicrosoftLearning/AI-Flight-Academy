---
title: Add a guardrail / output check
---

<!-- markdownlint-disable MD013 MD025 -->

# Add a guardrail / output check

**Tool:** Python + MCP + GitHub Copilot
**Source status:** Advanced guardrail

A guardrail is a tool call that runs before anything leaves the system. It returns `ALLOW`, `ASK_FIRST`, or `NEVER`, plus the rule that governed the decision.

::: tip Enforce at the tool boundary
Do not write "please be careful" in a prompt and call it a guardrail. Put the check in a callable tool. Then it still holds when the caller is an agent you did not write.
:::

## Steps

1. Write boundary rules in the spec.

   ```md
   ## Boundaries

   - Never disclose private calendar reasons. A decline says when I am free, not why I am unavailable.
   - Ask first before sending anything to an external customer, partner, or vendor.
   - Ask first before committing me to a delivery date.
   - Allow internal drafts when they are saved for review, not sent.
   ```

2. Expose a `check_boundary` tool.

   ```python
   @mcp.tool(
       description=(
           "Check whether an action is allowed before it is taken. "
           "Returns ALLOW, ASK_FIRST, or NEVER with the governing rule and source."
       )
   )
   def check_boundary(action: str, recipient: str = "") -> str:
       text = f"{action} {recipient}".lower()

       if any(k in text for k in ("calendar reason", "why unavailable", "private")):
           return (
               "NEVER\n"
               "rule: never disclose private calendar reasons\n"
               "source: soul.md > Boundaries"
           )

       if any(k in text for k in ("external", "customer", "partner", "vendor")):
           return (
               "ASK_FIRST\n"
               "rule: external communication requires approval\n"
               "source: soul.md > Boundaries"
           )

       if any(k in text for k in ("commit", "deadline", "promise", "delivery date")):
           return (
               "ASK_FIRST\n"
               "rule: committing to a delivery date requires approval\n"
               "source: soul.md > Boundaries"
           )

       return "ALLOW\nrule: no boundary matched\nsource: soul.md > Boundaries"
   ```

3. Call it before send, post, commit, decline, or external share.

   ```python
   decision = check_boundary("send launch update", "external customer")
   if decision.startswith("NEVER"):
       raise RuntimeError(decision)
   if decision.startswith("ASK_FIRST"):
       print(decision)
       print("Save a draft for human approval instead of sending.")
   ```

4. Return the rule, not just the verdict. The caller needs to know whether to revise, ask, or stop.

   ```text
   ASK_FIRST
   rule: external communication requires approval
   source: soul.md > Boundaries
   ```

5. Add a critic/self-patch pattern for misses.

   ```md
   ---
   name: critic
   description: Diagnoses why the spec caused a miss and proposes a small patch.
   tools: ['read', 'edit']
   ---

   Diagnose which field in soul.md caused the miss.
   Propose a unified diff for human approval.
   HARD CAP: net growth must be +2 lines or less.
   Prefer editing an existing rule over appending a new one.
   Never write the patch yourself.
   ```

6. Keep the patch small.

   ```diff
   --- a/soul.md
   +++ b/soul.md
   @@
   -- Be direct with stakeholders.
   +- Be direct in private first when correcting a peer; use public threads only for shared facts.
   ```

   The hard cap matters. Otherwise the critic will "fix" every miss by making the spec fatter and worse.

7. Cite the idea honestly if you explain it in your demo.

   - Reflexion (arXiv:2303.11366): agents improve future attempts through verbal feedback.
   - Self-Refine (arXiv:2303.17651): generate, critique, refine loops.
   - Constitutional AI: behavior is shaped by explicit principles.
   - MemGPT / Letta: memory is managed as external state.

   ::: warning Honest limit
   The file gets better. The model does not learn. Every future run must reload the improved file.
   :::

**You'll know it worked when...** a caller cannot send or share without first receiving `ALLOW`, `ASK_FIRST`, or `NEVER`, and the result names the rule and source.

## Apply it to your scenario

Put one real boundary in front of your scenario's highest-risk action. If your agent drafts messages, check before send. If it changes files, check before commit. If it exposes personal context, check before disclosure.
