"""Compare the twin against sealed answers without scoring.

    python test/compare.py

This intentionally reports a comparison only: no percentage, no leaderboard.
Each mismatch names the soul.md field to inspect.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

from twinlib import run_copilot  # noqa: E402

REFS = ROOT / "digital-twin" / "references"
SEALED = ROOT / "test" / "sealed-answers.md"
DILEMMAS = ROOT / "test" / "dilemmas.md"


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8") if path.exists() else ""


def read_reference(stem: str) -> str:
    return read(REFS / f"{stem}.md") or read(REFS / f"{stem}.template.md")


def sealed() -> dict[int, tuple[str, str]]:
    out: dict[int, tuple[str, str]] = {}
    pattern = r"^\|\s*(\d+)\s*\|\s*\*\*([abcd])\*\*\s*\|.*?\|\s*`(.+?)`\s*\|"
    for match in re.finditer(pattern, read(SEALED), re.M):
        out[int(match.group(1))] = (match.group(2), match.group(3))
    return out


def main() -> None:
    mine = sealed()
    if not mine:
        sys.exit("No sealed answers found. Run: python test/take_test.py")

    prompt = f"""# TASK

You are a digital twin. Answer the 15 dilemmas as the person described by the specs.

Answer as they would actually answer, not as an ideal professional would. Where
measured behavior contradicts stated intent, trust the measurement. If the spec is
empty, still choose the best-supported answer and do not read sealed-answers.md.

Print exactly 15 lines and nothing else:

1:x
2:x
...
15:x

where x is a, b, c, or d.

--- soul.md ---
{read_reference('soul')}

--- voice.md ---
{read_reference('voice')}

--- revealed.md ---
{read_reference('revealed')}

--- dilemmas ---
{read(DILEMMAS)}
"""

    print("Running the twin over 15 dilemmas...\n")
    stdout = run_copilot(prompt)
    twin = {int(n): answer for n, answer in re.findall(r"^\s*(\d+)\s*[:.)]\s*([abcd])\b", stdout, re.M)}
    if not twin:
        sys.exit(f"Could not parse twin output:\n{stdout[:800]}")

    mismatches: list[tuple[int, str, str, str]] = []
    print(f"{'#':>3}  {'mine':^5} {'twin':^5}  result  probe")
    print("-" * 72)
    for n in sorted(mine):
        my_answer, probes = mine[n]
        twin_answer = twin.get(n, "?")
        result = "match" if my_answer == twin_answer else "mismatch"
        if result == "mismatch":
            mismatches.append((n, my_answer, twin_answer, probes))
        print(f"{n:>3}  {my_answer:^5} {twin_answer:^5}  {result:<8} {probes}")

    print("-" * 72)
    print("\nComparison complete. No score is reported for this event.")
    if mismatches:
        print("\nFields to inspect for mismatches:")
        for n, my_answer, twin_answer, probes in mismatches:
            print(f"  #{n}: you={my_answer} twin={twin_answer} -> {probes}")
    else:
        print("All sealed answers matched. Review the rationale anyway before trusting the twin.")


if __name__ == "__main__":
    main()
