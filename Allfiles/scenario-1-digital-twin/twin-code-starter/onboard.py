"""Make the twin yours - a short interview that replaces the fictional Jordan.

Asks a handful of questions and writes your own `persona.md`, `voice.md`, and
`standards.md` from the answers. The fictional versions are backed up next to them
(`*.jordan.md`) so you can compare or restore. Runs entirely locally - nothing is sent
anywhere, and the CLI is not required.

    python onboard.py

It's a starting point, not the finished twin. Answer briefly; the files come out with
your words plus clearly marked spots to deepen later - and the fastest way to deepen them
is to open one and ask Copilot to expand a thin section from how you actually work.
"""

from __future__ import annotations

import shutil
import sys
from datetime import date
from pathlib import Path

REFERENCES = Path(__file__).parent / ".github" / "skills" / "my-twin" / "references"


def ask_line(prompt: str) -> str:
    try:
        return input(f"{prompt}\n> ").strip()
    except (EOFError, KeyboardInterrupt):
        print("\nStopped. Nothing was written.")
        raise SystemExit(1)


def ask_block(prompt: str) -> list[str]:
    """Collect several lines until a blank one."""
    print(f"{prompt}\n(one per line; blank line to finish)")
    lines = []
    while True:
        try:
            line = input("> ").strip()
        except (EOFError, KeyboardInterrupt):
            break
        if not line:
            break
        lines.append(line)
    return lines


def bullets(lines: list[str], placeholder: str) -> str:
    return "\n".join(f"- {line}" for line in lines) if lines else f"- _{placeholder}_"


def back_up(path: Path) -> None:
    if path.exists():
        shutil.copyfile(path, path.with_suffix(".jordan.md"))


def main() -> int:
    print(__doc__.strip())
    print("\n" + "=" * 70)
    print("This replaces the fictional twin with you. Jordan is backed up as *.jordan.md.")
    if ask_line("Continue? (y/N)").lower() not in ("y", "yes"):
        print("Left everything as it is.")
        return 0

    print("\n--- Who you are -------------------------------------------------")
    role = ask_line("Your role, in a line - what you own and who you serve.")
    deliverable = ask_line("What's the real deliverable of your job? (not your title - the outcome)")
    print("\nYour non-negotiables - the things you won't ship or agree to without checking.")
    nonneg = ask_block("What breaks a piece of work for you?")
    tiebreak = ask_line("When two priorities collide, what wins? (your tiebreaker)")

    print("\n--- How you write -----------------------------------------------")
    voice_rules = ask_block("Two or three rules for how you write (e.g. 'lead with the answer').")
    print("\nPaste two or three of your own short messages, exactly as you wrote them.")
    print("(These teach voice better than any rule. Keep them work-safe.)")
    samples = ask_block("A real message you sent:")

    print("\n--- Your bar ----------------------------------------------------")
    blocks = ask_block("What do you block / reject outright?")
    nits = ask_block("What do you comment on but let through?")

    stamp = date.today().isoformat()
    persona = f"""# Persona

*Written from your own answers on {stamp}. Deepen any section by opening it and asking
Copilot to expand it from how you actually work.*

## 1. Who I am

{role or "_TODO: your role_"}

## 2. What I'm trying to create

{deliverable or "_TODO: the real deliverable of your job_"}

## 3. My non-negotiables

{bullets(nonneg, "TODO: what breaks a piece of work for you")}

## 4. When priorities conflict

{tiebreak or "_TODO: what wins when two priorities collide_"}

## 5. The people I work with most

- _TODO: name a few people and what each needs from you_

## 6. What's live right now

- _TODO: what's in flight this week_
"""

    voice = f"""# Voice

*Written from your own answers on {stamp}.*

## Rules

{bullets(voice_rules, "TODO: how you write")}

## Samples

Messages kept exactly as written. In a real twin these are your own - three or four
unedited beats a page of rules.

{chr(10).join(f"> {s}" for s in samples) if samples else "> _TODO: paste a real message you sent_"}
"""

    standards = f"""# Standards

*Written from your own answers on {stamp}. This is your domain bar - swap it for whatever
your twin is asked to judge.*

## What I block

{bullets(blocks, "TODO: what you reject outright")}

## What I comment on, but approve

{bullets(nits, "TODO: what you flag but let through")}

## What I leave alone

- _TODO: what's not worth your attention_
"""

    for name, text in (("persona", persona), ("voice", voice), ("standards", standards)):
        path = REFERENCES / f"{name}.md"
        back_up(path)
        path.write_text(text, encoding="utf-8")

    print("\n" + "=" * 70)
    print("Done. Your twin now runs on your own persona.md, voice.md, and standards.md.")
    print("Jordan is saved beside them as *.jordan.md.\n")
    print("Next:")
    print("  1. Start a new session so the CLI reloads the skill.")
    print('  2. Try it:  python twin.py "using my twin, what should I focus on today?"')
    print("  3. Any section marked TODO: open the file and ask Copilot to expand it.")
    return 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    raise SystemExit(main())
