// Packages participant assets from Allfiles/<scenario>/ into
// docs/public/downloads/ so the site serves them directly - participants never
// touch GitHub or run git clone.
//
// Adding a scenario: add its folders to jobs (zipped) or singles (copied
// as-is), then link them from docs/resources/downloads.md.
//
// Runs automatically before docs:dev and docs:build, so the downloads can't
// drift from the source files.
//
// No dependencies: uses PowerShell's Compress-Archive on Windows and `zip`
// elsewhere, both of which ship with the platform / CI image.

import { execFileSync } from "node:child_process";
import { copyFileSync, cpSync, existsSync, mkdirSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = join(root, "docs", "public", "downloads");
const isWin = process.platform === "win32";

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

function zipFolder(srcDir, zipPath, exclude = []) {
  // When excluding subpaths, stage a filtered copy under the folder's own name
  // so the archive still contains a correctly-named top-level folder.
  let toZip = srcDir;
  let stageParent = null;
  if (exclude.length) {
    stageParent = mkdtempSync(join(tmpdir(), "pack-"));
    toZip = join(stageParent, basename(srcDir));
    cpSync(srcDir, toZip, { recursive: true });
    for (const rel of exclude) {
      rmSync(join(toZip, rel), { recursive: true, force: true });
    }
  }
  try {
    if (isWin) {
      execFileSync(
        "powershell",
        [
          "-NoProfile",
          "-Command",
          `$ProgressPreference='SilentlyContinue'; Compress-Archive -Path '${toZip}' -DestinationPath '${zipPath}' -Force`,
        ],
        { stdio: "pipe" }
      );
    } else {
      // zip from the parent so the archive contains the folder itself
      const parent = join(toZip, "..");
      const name = toZip.split(/[\\/]/).pop();
      execFileSync("zip", ["-qr", zipPath, name], { cwd: parent, stdio: "pipe" });
    }
  } finally {
    if (stageParent) rmSync(stageParent, { recursive: true, force: true });
  }
}

const jobs = [
  {
    src: join(root, "Allfiles", "scenario-1-digital-twin", "digital-twin-starter"),
    zip: "digital-twin-starter.zip",
  },
  {
    src: join(root, "Allfiles", "scenario-1-digital-twin", "persona-pack"),
    zip: "avery-persona-pack.zip",
  },
  {
    src: join(root, "Allfiles", "scenario-2-greenlight", "the-greenlight-starter"),
    zip: "the-greenlight-starter.zip",
    // The dashboard's deps and runtime output are regenerated (npm install /
    // at runtime), never shipped. Same for Python bytecode caches.
    exclude: [
      "dashboard/node_modules",
      "dashboard/uploads",
      "dashboard/runs",
      "dashboard/plans",
      "dashboard/submissions",
      "__pycache__",
    ],
  },
  {
    // Ships the skill without facilitator/ - that folder holds the grading
    // rubric and design brief, which participants must not see.
    src: join(root, "Allfiles", "scenario-2-greenlight", "the-greenlight"),
    zip: "the-greenlight.zip",
    exclude: ["facilitator"],
  },
  {
    src: join(root, "Allfiles", "scenario-2-greenlight", "data-pack"),
    zip: "greenlight-data-pack.zip",
  },
];

for (const j of jobs) {
  if (!existsSync(j.src)) {
    console.warn(`  skip (missing): ${j.src}`);
    continue;
  }
  const dest = join(out, j.zip);
  zipFolder(j.src, dest, j.exclude ?? []);
  console.log(`  ${j.zip.padEnd(28)} ${(statSync(dest).size / 1024).toFixed(1)} KB`);
}

// Twin Forge ships as a single .md - Cowork's skill upload rejects .zip.
const singles = [
  {
    src: join(root, "Allfiles", "scenario-1-digital-twin", "twin-forge", "SKILL.md"),
    name: "twin-forge-SKILL.md",
  },
  {
    src: join(root, "Allfiles", "scenario-1-digital-twin", "twin-test", "twin-test.md"),
    name: "twin-test.md",
  },
];

for (const s of singles) {
  if (!existsSync(s.src)) {
    console.warn(`  skip (missing): ${s.src}`);
    continue;
  }
  const dest = join(out, s.name);
  copyFileSync(s.src, dest);
  console.log(`  ${s.name.padEnd(28)} ${(statSync(dest).size / 1024).toFixed(1)} KB`);
}

console.log("packaged -> docs/public/downloads/");
