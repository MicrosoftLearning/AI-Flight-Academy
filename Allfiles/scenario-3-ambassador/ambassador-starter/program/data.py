"""Load the programme data.

Reads the CSVs in `program-data/` and gives you candidates with their evidence attached.
Nothing here makes a judgement - that's `evaluate.py`.

    from program.data import load

    prog = load()
    prog.candidates["CAND-001"].profile["CandidateName"]   # 'Avery Chen'
    prog.candidates["CAND-001"].feedback                    # [ {...}, ... ]
"""

from __future__ import annotations

import csv
from dataclasses import dataclass, field
from pathlib import Path

# The data sits beside this package when you unzip the starter, and one level up
# in the scenario repo. Check both rather than making the layout matter.
_HERE = Path(__file__).parent.parent
for _candidate in (_HERE / "program-data", _HERE.parent / "program-data"):
    if _candidate.exists():
        DATA_DIR = _candidate
        break
else:
    DATA_DIR = _HERE / "program-data"

# Every evidence file, and the column each one joins on. The profile file is the
# spine; the rest hang off it.
EVIDENCE = {
    "activities": "CommunityActivities.csv",
    "feedback": "PeerFeedback.csv",
    "contributions": "ProgramContributions.csv",
    "credentials": "LearningCredentials.csv",
    "recognition": "RecognitionHistory.csv",
    "applications": "AmbassadorApplications.csv",
}


@dataclass
class Candidate:
    """One person, with everything the programme knows about them."""

    id: str
    profile: dict
    activities: list = field(default_factory=list)
    feedback: list = field(default_factory=list)
    contributions: list = field(default_factory=list)
    credentials: list = field(default_factory=list)
    recognition: list = field(default_factory=list)
    applications: list = field(default_factory=list)

    @property
    def name(self) -> str:
        return self.profile.get("CandidateName", self.id)

    @property
    def applied(self) -> bool:
        return bool(self.applications)

    def score(self, field_name: str) -> int:
        """A summary score from the profile, or 0 if it is missing or unparseable."""
        try:
            return int(float(self.profile.get(field_name) or 0))
        except (TypeError, ValueError):
            return 0


@dataclass
class Programme:
    candidates: dict
    rules: list
    tiers: list

    def __iter__(self):
        return iter(self.candidates.values())

    def __len__(self):
        return len(self.candidates)


def read_csv(name: str) -> list[dict]:
    path = DATA_DIR / name
    if not path.exists():
        raise FileNotFoundError(
            f"{path} not found. The programme data should sit in program-data/ "
            "next to this package."
        )
    with path.open(encoding="utf-8-sig", newline="") as f:
        return [row for row in csv.DictReader(f) if any(v for v in row.values())]


def load() -> Programme:
    """Read every file and attach each evidence record to its candidate."""
    candidates = {
        row["CandidateId"]: Candidate(id=row["CandidateId"], profile=row)
        for row in read_csv("CandidateProfiles.csv")
    }

    for attr, filename in EVIDENCE.items():
        for row in read_csv(filename):
            candidate = candidates.get(row.get("CandidateId"))
            # A record pointing at an unknown candidate is dropped rather than
            # silently inventing a person - worth surfacing if you extend this.
            if candidate is not None:
                getattr(candidate, attr).append(row)

    return Programme(
        candidates=candidates,
        rules=read_csv("PolicyRules.csv"),
        tiers=read_csv("RewardTiers.csv"),
    )
