"""Write the case for one candidate, from their evidence.

`evaluate.py` produces a number and a tier. That is not something a program
owner can act on, or defend to the person who did not make the list. This turns
the same evidence into prose someone can read.

    python examples/brief.py "Avery Chen"

Code decides the tier. The model writes the case, and is given only what the
data actually contains.
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from agent import ask  # noqa: E402
from program.data import load  # noqa: E402
from program.evaluate import IGNORED_COLUMNS, WEIGHTS, evaluate  # noqa: E402

# One agent turn takes 20-60 seconds, so a brief per candidate over 72 people is
# an hour. Bound how much evidence goes into a single call as well.
MAX_RECORDS = 8


def evidence_block(candidate) -> str:
    """Everything known about this person, as text the model can read."""
    lines = [f"CANDIDATE: {candidate.name} ({candidate.id})"]

    profile = candidate.profile
    for key in ("Role", "Org", "Region", "YearsInRole", "RecentScope"):
        if profile.get(key):
            lines.append(f"{key}: {profile[key]}")

    scored = ", ".join(f"{f} {candidate.score(f)}" for f in WEIGHTS)
    unscored = ", ".join(f"{c} {candidate.score(c)}" for c in IGNORED_COLUMNS)
    lines += [f"\nSCORED BY THE PROGRAM: {scored}", f"NOT SCORED: {unscored}"]

    for key in ("ObservedStrengths", "Watchouts"):
        if profile.get(key):
            lines.append(f"{key}: {profile[key]}")

    for label, records, fields in (
        ("PEER FEEDBACK", candidate.feedback, ("Theme", "Sentiment", "EvidenceDepth")),
        ("CONTRIBUTIONS", candidate.contributions, ("ArtifactType", "ReuseValue", "TeamsReached")),
        ("ACTIVITIES", candidate.activities, ("ActivityType", "Audience", "ImpactSummary")),
        ("RECOGNITION", candidate.recognition, ("RecognitionType", "RecognitionReason", "Period")),
    ):
        if not records:
            continue
        lines.append(f"\n{label} ({len(records)} records, showing up to {MAX_RECORDS}):")
        for record in records[:MAX_RECORDS]:
            parts = [f"{f}={record[f]}" for f in fields if record.get(f)]
            lines.append("  - " + ", ".join(parts))

    return "\n".join(lines)


def brief(candidate, recommendation) -> str:
    prompt = f"""You are writing the case for one ambassador candidate, for the
person who runs the program. They will act on it, and may have to defend it to
the candidate.

{evidence_block(candidate)}

The program scored them {recommendation.score:.1f} and placed them in
{recommendation.tier}, proposing: {recommendation.next_action}

Write four short paragraphs:
1. What this person actually does for other people. Cite specific evidence.
2. The case for the proposed next action.
3. The case against it, or what is thin. If the tier looks wrong given the
   unscored columns, say so plainly.
4. What you would need to see to be more confident.

Rules: use only the evidence above, never invent a record or a quote, and do not
repeat back a score without saying what it is evidence of. No sensitive personal
detail. This is a draft for a human to approve, not a decision."""
    return ask(prompt)


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    wanted = " ".join(sys.argv[1:]).strip()
    if not wanted:
        print(__doc__)
        return 2

    program = load()
    matches = [c for c in program if wanted.lower() in c.name.lower()]
    if not matches:
        print(f"No candidate matching {wanted!r}.")
        return 1

    candidate = matches[0]
    recommendation = evaluate(candidate)

    print(f"\n{candidate.name} - {recommendation.tier} ({recommendation.score:.1f})")
    print(f"Proposed: {recommendation.next_action}\n")
    print("Asking for the case (20-60 seconds)...\n")
    print(brief(candidate, recommendation))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
