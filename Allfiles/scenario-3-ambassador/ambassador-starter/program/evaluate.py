"""Score candidates and assign a tier.

    from program.data import load
    from program.evaluate import evaluate_all

    for rec in evaluate_all(load()):
        print(rec.name, rec.tier, rec.next_action)
"""

from __future__ import annotations

from dataclasses import dataclass, field

# First pass uses the three scores already on the quarterly report, so the
# output reconciles against numbers the program owner has seen before.
WEIGHTS = {
    "BusinessImpact": 3,
    "ExecutionReliability": 2,
    "LeadershipSignals": 1,
}

# In CandidateProfiles.csv, not scored yet.
IGNORED_COLUMNS = [
    "PeerSupport",
    "KnowledgeSharing",
    "CommunityContribution",
    "MultiplierBehavior",
]

BANDS = [
    (88, "Flight Lead", "Leadership circle or sponsor conversation"),
    (80, "Multiplier", "Nominate for the ambassador program"),
    (72, "Connector", "Offer a visible facilitation opportunity"),
    (60, "Explorer", "Invite to a structured community activity"),
    (0, "Review Hold", "Gather more evidence before recognizing"),
]


@dataclass
class Recommendation:
    """One candidate's proposed tier and next action."""

    candidate_id: str
    name: str
    tier: str
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
            "Tier": self.tier,
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
    for threshold, tier, action in BANDS:
        if score >= threshold:
            return tier, action
    return BANDS[-1][1], BANDS[-1][2]


def unused_for(candidate) -> list[str]:
    """Evidence loaded for this candidate that the score did not use.

    Recorded per R-005 so a reviewer can see what the recommendation is missing.
    """
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
    tier, action = band_for(score)

    evidence = [f"{f} {candidate.score(f)}" for f in WEIGHTS]

    return Recommendation(
        candidate_id=candidate.id,
        name=candidate.name,
        tier=tier,
        next_action=action,
        score=score,
        evidence=evidence,
        unused_evidence=unused_for(candidate),
    )


def evaluate_all(program) -> list[Recommendation]:
    results = [evaluate(c) for c in program]
    results.sort(key=lambda r: -r.score)
    return results
