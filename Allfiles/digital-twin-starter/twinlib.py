"""Copilot CLI helper for large digital-twin prompts.

Windows cmd.exe caps command lines at 8191 characters. A twin prompt can include
soul.md, voice.md, revealed.md, and dilemmas, so this helper writes the prompt to
a scratch file and asks Copilot CLI to read it.
"""

from __future__ import annotations

import subprocess
import uuid
from pathlib import Path

ROOT = Path(__file__).parent
SCRATCH = ROOT / ".twin-scratch"


def run_copilot(prompt: str, timeout: int = 300) -> str:
    """Run a prompt of any size through GitHub Copilot CLI and return stdout."""
    SCRATCH.mkdir(exist_ok=True)
    prompt_file = SCRATCH / f"prompt-{uuid.uuid4().hex[:8]}.md"
    prompt_file.write_text(prompt, encoding="utf-8")
    rel = prompt_file.relative_to(ROOT).as_posix()

    instruction = (
        f"Read the file `{rel}` in this repository. It contains a task. "
        "Execute that task now and print its output directly in your final message. "
        "Do not summarize the file, do not describe it, do not ask for confirmation, "
        "and do not write the answer to another file."
    )

    try:
        result = subprocess.run(
            ["copilot", "-p", instruction, "--allow-all-tools"],
            capture_output=True,
            text=True,
            timeout=timeout,
            shell=True,
            cwd=str(ROOT),
            encoding="utf-8",
            errors="replace",
        )
        stdout = (result.stdout or "").strip()
        stderr = (result.stderr or "").strip()
        return stdout or f"[no output] {stderr[:400]}"
    except subprocess.TimeoutExpired:
        return f"[timeout after {timeout}s]"
    except FileNotFoundError:
        return "[GitHub Copilot CLI not found - install it before running council prompts]"
    finally:
        prompt_file.unlink(missing_ok=True)
