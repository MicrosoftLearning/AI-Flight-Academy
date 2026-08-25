"""Pick candidates for the next ambassador cohort.

    python cohort.py                    the current shortlist
    python cohort.py --who "Alex Kim"   one candidate
    python cohort.py --definition my.md use a different definition

Reads definition.md, applies it to the candidate data, and writes a shortlist
with a short case for each person. Nothing is sent.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from agent import ask, AgentError  # noqa: E402
from program.data import load  # noqa: E402

HERE = Path(__file__).parent

# How many candidates go into one call. The whole set fits in a large context
# window, but a smaller slice comes back faster while you are iterating.
BATCH = 72


def summarize(candidate) -> str:
    """One candidate, compressed to the lines a reader would skim."""
    p = candidate.profile
    scores = " ".join(
        f"{k}={p.get(k)}"
        for k in (
            "BusinessImpact",
            "PeerSupport",
            "KnowledgeSharing",
            "LeadershipSignals",
            "CommunityContribution",
            "ExecutionReliability",
            "MultiplierBehavior",
        )
    )
    return (
        f"{p['CandidateName']} ({candidate.id}) "
        f"{p.get('Role')}, {p.get('Region')}, {p.get('YearsInRole')}y in role\n"
        f"  scores: {scores}\n"
        f"  scope: {p.get('RecentScope')}\n"
        f"  strengths: {p.get('ObservedStrengths')}\n"
        f"  watchouts: {p.get('Watchouts')}\n"
        f"  counts: {len(candidate.activities)} activities, "
        f"{len(candidate.feedback)} peer comments, "
        f"{len(candidate.contributions)} contributions, "
        f"{len(candidate.credentials)} credentials, "
        f"{len(candidate.recognition)} recognition records, "
        f"{'applied' if candidate.applied else 'did not apply'}"
    )


def definition_text(path: Path) -> str:
    if not path.exists():
        raise SystemExit(f"No definition at {path}. See definition.md.")
    return path.read_text(encoding="utf-8").strip()


def shortlist(program, definition: str, limit: int = 8) -> str:
    people = "\n".join(summarize(c) for c in list(program)[:BATCH])
    prompt = (
        "You are picking people for the next cohort of an AI skilling ambassador "
        "program.\n\n"
        f"WHAT WE ARE LOOKING FOR:\n{definition}\n\n"
        f"Pick the {limit} strongest matches. For each one give the name, one "
        "sentence on why they match, and the next step you would propose.\n"
        "Lead with the strongest. Be decisive.\n\n"
        f"CANDIDATES:\n{people}"
    )
    return ask(prompt)


def one(program, definition: str, name: str) -> str:
    matches = [c for c in program if name.lower() in c.name.lower()]
    if not matches:
        raise SystemExit(f"No candidate matching {name!r}.")
    c = matches[0]
    prompt = (
        "You are assessing one person for the next cohort of an AI skilling "
        "ambassador program.\n\n"
        f"WHAT WE ARE LOOKING FOR:\n{definition}\n\n"
        f"CANDIDATE:\n{summarize(c)}\n\n"
        "Say whether they belong in the cohort, why, and what you would propose "
        "as a next step."
    )
    return ask(prompt)


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--who", help="assess one candidate by name")
    ap.add_argument("--definition", default="definition.md", help="which definition to apply")
    ap.add_argument("--limit", type=int, default=8, help="how many to shortlist")
    args = ap.parse_args()

    definition = definition_text(HERE / args.definition)
    program = load()

    print(f"\n{len(program)} candidates. Using {args.definition}.")
    print("Thinking (20-60 seconds)...\n")

    try:
        print(one(program, definition, args.who) if args.who
              else shortlist(program, definition, args.limit))
    except AgentError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
