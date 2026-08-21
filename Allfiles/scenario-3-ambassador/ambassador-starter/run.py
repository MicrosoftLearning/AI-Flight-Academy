"""Run the program.

    python run.py                 # the shortlist
    python run.py --all           # every candidate
    python run.py --who "Alex Kim"
    python run.py --export out.csv

Everything it prints is a proposal. Nothing is sent, and no decision is recorded.
"""

from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from program.data import load  # noqa: E402
from program.evaluate import WEIGHTS, evaluate_all  # noqa: E402


def show(rec, verbose: bool = False) -> None:
    print(f"  {rec.score:5.1f}  {rec.rung:12}  {rec.name}")
    print(f"         -> {rec.next_action}")
    if verbose:
        print(f"         evidence: {', '.join(rec.evidence)}")
        if rec.unused_evidence:
            print(f"         NOT READ: {', '.join(rec.unused_evidence)}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--all", action="store_true", help="show every candidate, not just the top")
    parser.add_argument("--who", metavar="NAME", help="show one candidate in full")
    parser.add_argument("--export", metavar="FILE", help="write the full register to CSV")
    args = parser.parse_args()

    program = load()
    results = evaluate_all(program)

    print(f"\nAmbassador program - {len(program)} candidates assessed")
    print("Scored on: " + ", ".join(f"{f} x{w}" for f, w in WEIGHTS.items()))
    print()

    if args.who:
        match = [r for r in results if args.who.lower() in r.name.lower()]
        if not match:
            print(f"No candidate matching {args.who!r}.")
            return 1
        for rec in match:
            show(rec, verbose=True)
    else:
        shown = results if args.all else results[:10]
        for rec in shown:
            show(rec, verbose=args.all)
        if not args.all:
            print(f"\n  ... and {len(results) - len(shown)} more. --all to see them.")

        # In --who mode the per-candidate NOT READ line above already says this,
        # and results[0] is somebody the user never asked about.
        unread = results[0].unused_evidence if results else []
        if unread:
            print(
                "\nNote: this run read CandidateProfiles.csv only. For the top candidate alone it "
                f"ignored {', '.join(unread)}."
            )

    if args.export:
        rows = [r.as_row() for r in results]
        with open(args.export, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=list(rows[0]))
            writer.writeheader()
            writer.writerows(rows)
        print(f"\nWrote {len(rows)} rows to {args.export}")

    return 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    raise SystemExit(main())
