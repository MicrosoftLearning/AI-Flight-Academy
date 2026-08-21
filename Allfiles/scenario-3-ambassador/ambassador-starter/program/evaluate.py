"""Decide what each candidate has earned.

This is the half of the program that was actually built, and it only looks at the
seven summary scores in CandidateProfiles.csv. Everything in `program-data/` other than
that one file is loaded and then ignored.

The weights below are asserted, not justified. `BusinessImpact` counts three times as
much as community contribution, which is not something the playbook supports - it is
just what somebody typed first.

Every recommendation carries `unused_evidence` so the gap is visible in the output
rather than only in this docstring.
"""

from __future__ import annotations

from dataclasses import dataclass, field

# What the score is built from.
#
# This is where the program started: impact and reliability were the numbers
# already being reported, so those are the numbers it scored on. The four
# community-shaped columns sit in the same file, unread.
WEIGHTS = {
    "BusinessImpact": 3,
    "ExecutionReliability": 2,
    "LeadershipSignals": 1,
}

# Columns that exist in CandidateProfiles.csv and are not used above.
IGNORED_COLUMNS = [
    "PeerSupport",
    "KnowledgeSharing",
    "CommunityContribution",
    "MultiplierBehavior",
]

# Where the rungs sit. Also asserted.
BANDS = [
    (88, "Flight Lead", "Leadership circle or sponsor conversation"),
    (80, "Multiplier", "Nominate for the ambassador program"),
    (72, "Connector", "Offer a visible facilitation opportunity"),
    (60, "Explorer", "Invite to a structured community activity"),
    (0, "Review Hold", "Gather more evidence before recognizing"),
]


@dataclass
class Recommendation:
    """What the program proposes for one person. A proposal, not a decision."""

    candidate_id: str
    name: str
    rung: str
    next_action: str
    score: float
    evidence: list = field(default_factory=list)
    unused_evidence: list = field(default_factory=list)
    needs_human: bool = False
    why_human: str = ""

    def as_row(self) -> dict:
        return {
            "CandidateId": self.candidate_id,
            "Name": self.name,
            "Rung": self.rung,
            "NextAction": self.next_action,
            "Score": round(self.score, 1),
            "Evidence": " | ".join(self.evidence),
            "NotRead": " | ".join(self.unused_evidence),
            "NeedsHuman": "yes" if self.needs_human else "",
            "WhyHuman": self.why_human,
        }


def weighted_score(candidate) -> float:
    total = sum(candidate.score(f) * w for f, w in WEIGHTS.items())
    return total / sum(WEIGHTS.values())


def band_for(score: float) -> tuple[str, str]:
    for threshold, rung, action in BANDS:
        if score >= threshold:
            return rung, action
    return BANDS[-1][1], BANDS[-1][2]


def unused_for(candidate) -> list[str]:
    """Name the evidence this evaluation loaded and then did not look at."""
    unread = [f"{len(IGNORED_COLUMNS)} unused score columns"]
    for label, records in (
        ("activities", candidate.activities),
        ("peer feedback", candidate.feedback),
        ("contributions", candidate.contributions),
        ("credentials", candidate.credentials),
        ("recognition history", candidate.recognition),
        ("application", candidate.applications),
    ):
        if records:
            unread.append(f"{len(records)} {label}")
    return unread


def evaluate(candidate) -> Recommendation:
    score = weighted_score(candidate)
    rung, action = band_for(score)

    evidence = [f"{f} {candidate.score(f)}" for f in WEIGHTS]

    return Recommendation(
        candidate_id=candidate.id,
        name=candidate.name,
        rung=rung,
        next_action=action,
        score=score,
        evidence=evidence,
        unused_evidence=unused_for(candidate),
    )


def evaluate_all(program) -> list[Recommendation]:
    results = [evaluate(c) for c in program]
    results.sort(key=lambda r: -r.score)
    return results
