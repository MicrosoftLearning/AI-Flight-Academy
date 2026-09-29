"""Pick candidates for the next ambassador cohort.

    python cohort.py                    the current shortlist
    python cohort.py --challenge        shortlist, then argue against it
    python cohort.py --who "Alex Kim"   one candidate
    python cohort.py --definition my.md use a different definition

Reads definition.md, applies it to the candidate data, and writes a shortlist
with a short case for each person. Nothing is sent.

`--challenge` is the worked example of a role file. It loads
`.github/agents/challenger.agent.md`, reads the model named in that file's front
matter, and runs a second pass whose only job is to argue against the first.
Two calls, two roles, two models, one script. Add a third role the same way.
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


def playbook_text() -> str:
    """How the program runs. These rules hold whatever the definition says.

    The Cowork and Scout versions of this skill read PLAYBOOK.md too. Without it
    the picker judges on the definition alone and loses the program's own
    guardrails - output is not impact, activity is not contribution, and a
    recommendation is not a decision.
    """
    path = HERE / "PLAYBOOK.md"
    return path.read_text(encoding="utf-8").strip() if path.exists() else ""


def role(name: str) -> tuple[str, str | None]:
    """Load a role file from .github/agents/ and return (instructions, model).

    A role file is Markdown with YAML front matter. The body is what the model
    should do; `model:` in the front matter says which model to do it on. This
    is deliberately simple - a role is a text file, not a service.
    """
    path = HERE / ".github" / "agents" / f"{name}.agent.md"
    if not path.exists():
        raise SystemExit(f"No role file at {path}.")

    text = path.read_text(encoding="utf-8")
    model = None
    if text.startswith("---"):
        front, _, body = text[3:].partition("---")
        for line in front.splitlines():
            key, sep, value = line.partition(":")
            if sep and key.strip() == "model":
                model = value.strip() or None
        text = body
    return text.strip(), model


def challenge(shortlist_text: str, people: str) -> str:
    """Second pass: a different role, on a different model, arguing back."""
    instructions, model = role("challenger")
    prompt = (
        f"{instructions}\n\n"
        f"THE SHORTLIST YOU ARE CHALLENGING:\n{shortlist_text}\n\n"
        f"THE SAME CANDIDATES THE PICKER SAW:\n{people}"
    )
    return ask(prompt, model=model)


def people_text(program) -> str:
    """Every candidate, summarized. The picker and the challenger see the same set."""
    return "\n".join(summarize(c) for c in list(program)[:BATCH])


def shortlist(program, definition: str, limit: int = 8) -> str:
    playbook = playbook_text()
    prompt = (
        "You are picking people for the next cohort of an AI skilling ambassador "
        "program.\n\n"
        f"HOW THE PROGRAM RUNS:\n{playbook}\n\n"
        f"WHAT WE ARE LOOKING FOR:\n{definition}\n\n"
        f"Propose the {limit} strongest matches for a person to review. For each "
        "one give the name, one sentence on why they match, and the next step you "
        "would propose.\n"
        "Say which evidence you did and did not read. A person makes the final "
        "call, so give them something they can check.\n\n"
        f"CANDIDATES:\n{people_text(program)}"
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
        f"HOW THE PROGRAM RUNS:\n{playbook_text()}\n\n"
        f"WHAT WE ARE LOOKING FOR:\n{definition}\n\n"
        f"CANDIDATE:\n{summarize(c)}\n\n"
        "Say whether you would put them forward, why, and what you would propose "
        "as a next step. Name the evidence you could not check."
    )
    return ask(prompt)


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--who", help="assess one candidate by name")
    ap.add_argument("--definition", default="definition.md", help="which definition to apply")
    ap.add_argument("--limit", type=int, default=8, help="how many to shortlist")
    ap.add_argument("--challenge", action="store_true",
                    help="run the challenger role against the shortlist afterwards")
    args = ap.parse_args()

    definition = definition_text(HERE / args.definition)
    program = load()

    print(f"\n{len(program)} candidates. Using {args.definition}.")
    print("Thinking (20-60 seconds)...\n")

    try:
        if args.who:
            print(one(program, definition, args.who))
            return 0

        picked = shortlist(program, definition, args.limit)
        print(picked)

        if args.challenge:
            _, model = role("challenger")
            print(f"\n{'-' * 60}")
            print(f"Now the challenger{f' ({model})' if model else ''} argues back...\n")
            print(challenge(picked, people_text(program)))
            print(f"\n{'-' * 60}")
            print("Two roles disagreed. Neither one decides - you do.")
    except AgentError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
