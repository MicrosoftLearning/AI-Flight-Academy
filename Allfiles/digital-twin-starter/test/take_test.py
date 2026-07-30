"""Take the Twin Test.

    python test/take_test.py

Presents 15 forced-choice dilemmas, records gut answers, and writes
test/sealed-answers.md. Answers taking more than 25 seconds are flagged as
deliberated.
"""

from __future__ import annotations

import re
import time
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).parent.parent
DILEMMAS = ROOT / "test" / "dilemmas.md"
OUT = ROOT / "test" / "sealed-answers.md"
VALID = {"a", "b", "c", "d"}


def parse() -> list[dict]:
    text = DILEMMAS.read_text(encoding="utf-8")
    items = []
    for match in re.finditer(
        r"\*\*(\d+)\.\*\*\s*(.+?)\n(\(a\).+?)\n›\s*\*probes:\s*(.+?)\*",
        text,
        re.S,
    ):
        n, prompt, options, probes = match.groups()
        choices = re.findall(
            r"\(([abcd])\)\s*(.+?)(?=\s*&nbsp;\s*\(|$)",
            options.strip(),
            re.S,
        )
        items.append(
            {
                "n": int(n),
                "prompt": " ".join(prompt.split()),
                "choices": [(key, " ".join(value.split())) for key, value in choices],
                "probes": " ".join(probes.split()),
            }
        )
    return sorted(items, key=lambda item: item["n"])


def ask(item: dict) -> tuple[str, float]:
    print(f"\n\033[96m{item['n']}/15\033[0m  {item['prompt']}")
    for key, value in item["choices"]:
        print(f"   \033[93m({key})\033[0m {value}")
    started = time.time()
    while True:
        answer = input("\n   > ").strip().lower()
        if answer in VALID:
            return answer, round(time.time() - started, 1)
        print("   a, b, c, or d.")


def main() -> None:
    items = parse()
    if len(items) != 15:
        raise SystemExit(f"Parsed {len(items)} dilemmas, expected 15. Check test/dilemmas.md formatting.")

    print("\n" + "=" * 66)
    print("  THE TWIN TEST — sealed baseline")
    print("=" * 66)
    print("\n  15 questions. Gut answers. Do not deliberate.")
    print("  There are no right answers — only your answer.\n")
    input("  Press Enter to start. ")

    answers: dict[int, str] = {}
    times: dict[int, float] = {}
    started = time.time()
    for item in items:
        answers[item["n"]], times[item["n"]] = ask(item)
    total = round(time.time() - started)
    slow = [n for n, seconds in times.items() if seconds > 25]

    rows = "\n".join(
        f"| {item['n']} | **{answers[item['n']]}** | | | {times[item['n']]}s | `{item['probes']}` |"
        for item in items
    )
    slow_note = (
        "Deliberated answers (>25s): " + ", ".join(f"#{n}" for n in slow)
        if slow
        else "All answers under 25s — good gut signal."
    )

    OUT.write_text(
        f"""# Sealed answers

**Sealed {datetime.now():%Y-%m-%d %H:%M}.** Total time {total}s.

Do not re-read until the twin has answered.

| # | Mine | Twin | Match | Time | Probes |
|---|---|---|---|---|---|
{rows}

{slow_note}

Next: `python test/compare.py`
""",
        encoding="utf-8",
    )

    print("\n" + "=" * 66)
    print(f"  Sealed. {total}s total.")
    if slow:
        print(f"  Deliberated (>25s): {', '.join(f'#{n}' for n in slow)}")
    print(f"  -> {OUT.relative_to(ROOT)}")
    print("\n  Now run: python test/compare.py")
    print("=" * 66 + "\n")


if __name__ == "__main__":
    main()
