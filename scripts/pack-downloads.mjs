// Packages the Allfiles folders into docs/public/downloads/ so the site serves
// them directly - participants never touch GitHub or run git clone.
//
// Runs automatically before docs:dev and docs:build, so the downloads can't
// drift from the source files.
//
// No dependencies: uses PowerShell's Compress-Archive on Windows and `zip`
// elsewhere, both of which ship with the platform / CI image.

import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = join(root, "docs", "public", "downloads");
const isWin = process.platform === "win32";

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

function zipFolder(srcDir, zipPath) {
  if (isWin) {
    execFileSync(
      "powershell",
      [
        "-NoProfile",
        "-Command",
        `$ProgressPreference='SilentlyContinue'; Compress-Archive -Path '${srcDir}' -DestinationPath '${zipPath}' -Force`,
      ],
      { stdio: "pipe" }
    );
  } else {
    // zip from the parent so the archive contains the folder itself
    const parent = join(srcDir, "..");
    const name = srcDir.split(/[\\/]/).pop();
    execFileSync("zip", ["-qr", zipPath, name], { cwd: parent, stdio: "pipe" });
  }
}

const jobs = [
  { src: join(root, "Allfiles", "digital-twin-starter"), zip: "digital-twin-starter.zip" },
  { src: join(root, "Allfiles", "persona-pack"), zip: "avery-persona-pack.zip" },
];

for (const j of jobs) {
  if (!existsSync(j.src)) {
    console.warn(`  skip (missing): ${j.src}`);
    continue;
  }
  const dest = join(out, j.zip);
  zipFolder(j.src, dest);
  console.log(`  ${j.zip.padEnd(28)} ${(statSync(dest).size / 1024).toFixed(1)} KB`);
}

// Twin Forge ships as a single .md - Cowork's skill upload rejects .zip.
const forge = join(root, "Allfiles", "twin-forge", "SKILL.md");
if (existsSync(forge)) {
  const dest = join(out, "twin-forge-SKILL.md");
  copyFileSync(forge, dest);
  console.log(`  ${"twin-forge-SKILL.md".padEnd(28)} ${(statSync(dest).size / 1024).toFixed(1)} KB`);
}

console.log("packaged -> docs/public/downloads/");
