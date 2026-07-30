# CONTENT SET
## Five pieces · review all of them

Each piece declares who it was written for in its front matter. The audience cards are in `../audience-cards/`.

| ID | Genre | Declares | Words |
|---|---|:---:|---:|
| `P1-retail-learn-unit` | Learn module unit | AC-01 🛒 | ~480 |
| `P2-health-howto` | Docs how-to | AC-03 🏥 | ~450 |
| `P3-manufacturing-announce` | Blog post / announcement | AC-04 🏭 | ~430 |
| `P4-exec-summary` | Whitepaper — executive summary | AC-01 🛒 | ~480 |
| `P5-quickstart` | Lab / quickstart | AC-01 🛒 | ~400 |

---

## Before you start

| | |
|---|---|
| **Read the card first** | The Audience Card is the ground truth. A piece can be well-written and still wrong. |
| **A declaration is a claim, not a fact** | A piece that names AC-01 is not necessarily written for AC-01. |
| **Genre changes what "good" means** | A blog post is allowed enthusiasm. A how-to is not. A quickstart lives or dies on step order. Don't apply one tone standard to all five. |
| **Read to the end** | At least one piece is fine until it isn't. |

## What you're producing

For each piece, your reviewer must emit the output contract from the Content Rubric:

| Field | |
|---|---|
| `content_id` | which piece |
| `audience` | which card you applied |
| `verdict` | SHIP · REVISE · REJECT |
| `overall_score` | weighted average, one decimal |
| `criteria[]` | score · **evidence quote** · fix *(required at ≤ 1)* |
| `top_fixes` | the three highest-value changes, ranked |

> **No quote, no score.** Every score must point at the text that justifies it.

## The self-check before you submit

| # | |
|:---:|---|
| 1 | Run the same piece twice. Same verdict? If not, your criteria are too vague. |
| 2 | Did you SHIP anything a careful human would send back? That's a **false green** — the worst failure. |
| 3 | Did you REJECT anything genuinely good? That's a false red. |
| 4 | Does every score quote real text? |
| 5 | Could a non-expert read your output and act on it? |
