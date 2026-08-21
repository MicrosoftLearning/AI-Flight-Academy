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
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = join(root, "docs", "public", "downloads");
const isWin = process.platform === "win32";

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

function zipFolder(srcDir, zipPath, exclude = [], purge = [], copyInto = []) {
  // When excluding subpaths, stage a filtered copy under the folder's own name
  // so the archive still contains a correctly-named top-level folder.
  let toZip = srcDir;
  let stageParent = null;
  if (exclude.length || purge.length || copyInto.length) {
    stageParent = mkdtempSync(join(tmpdir(), "pack-"));
    toZip = join(stageParent, basename(srcDir));
    cpSync(srcDir, toZip, { recursive: true });
    for (const rel of exclude) {
      rmSync(join(toZip, rel), { recursive: true, force: true });
    }
    // Pull in shared assets that live outside the folder, so a starter can ship
    // self-contained without the repo carrying a second copy.
    for (const { from, to } of copyInto) {
      cpSync(from, join(toZip, to), { recursive: true });
    }
    if (purge.length) purgeFiles(toZip, purge);
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

// Deletes matching FILES anywhere in the staged tree while leaving directories
// (and their .gitkeep) intact - a skill folder needs its empty folders to
// survive, but must never ship whatever the packager's own run wrote into them.
//
// Patterns are matched against the forward-slash path relative to the staged
// root; `*` matches within a segment, `**` across segments. A pattern ending in
// `/` removes the matching DIRECTORY and everything under it.
function purgeFiles(dir, patterns, rel = "") {
  const toRegExp = (p) =>
    new RegExp(
      "^" +
        p
          .replace(/[.+^${}()|[\]\\]/g, "\\$&")
          .replace(/\*\*/g, "\u0000")
          .replace(/\*/g, "[^/]*")
          .replace(/\u0000/g, ".*") +
        "$"
    );
  const dirPatterns = patterns.filter((p) => p.endsWith("/")).map((p) => toRegExp(p.slice(0, -1)));
  const filePatterns = patterns.filter((p) => !p.endsWith("/")).map(toRegExp);

  const walk = (abs, prefix) => {
    for (const e of readdirSync(abs, { withFileTypes: true })) {
      const r = prefix ? `${prefix}/${e.name}` : e.name;
      if (e.isDirectory()) {
        if (dirPatterns.some((x) => x.test(r))) {
          rmSync(join(abs, e.name), { recursive: true, force: true });
        } else {
          walk(join(abs, e.name), r);
        }
      } else if (filePatterns.some((x) => x.test(r))) {
        rmSync(join(abs, e.name), { force: true });
      }
    }
  };
  walk(dir, rel);
}

const jobs = [
  {
    src: join(root, "Allfiles", "scenario-1-digital-twin", "twin-code-starter"),
    zip: "twin-code-starter.zip",
    // Python bytecode and the scratch dir twin.py uses for oversized prompts are
    // both produced by running it locally, and neither belongs in a download.
    // Nested, so these have to match at any depth.
    purge: ["**/__pycache__/", ".twin-scratch/"],
  },
  {
    src: join(root, "Allfiles", "scenario-1-digital-twin", "persona-pack"),
    zip: "avery-persona-pack.zip",
  },
  {
    src: join(root, "Allfiles", "scenario-1-digital-twin", "scout", "my-twin"),
    zip: "my-twin-scout.zip",
    // Everything below is produced by running the twin and is personal to
    // whoever ran it. The zip ships the skill, never anyone's own twin - and
    // the folders themselves must survive, because the skill writes into them.
    purge: [
      "references/*.md",
      "extensions/**/data/*.json",
      "extensions/**/*.html",
    ],
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
    src: join(root, "Allfiles", "scenario-2-greenlight", "the-greenlight"),
    zip: "the-greenlight.zip",
  },
  {
    src: join(root, "Allfiles", "scenario-2-greenlight", "data-pack"),
    zip: "greenlight-data-pack.zip",
  },
  {
    src: join(root, "Allfiles", "scenario-3-ambassador", "ambassador"),
    zip: "ambassador-skill.zip",
  },
  {
    src: join(root, "Allfiles", "scenario-3-ambassador", "program-data"),
    zip: "ambassador-program-data.zip",
  },
  {
    src: join(root, "Allfiles", "scenario-3-ambassador", "ambassador-starter"),
    zip: "ambassador-starter.zip",
    // The starter ships self-contained: the data and the playbook are copied in
    // at pack time so the repo keeps one copy of each.
    copyInto: [
      {
        from: join(root, "Allfiles", "scenario-3-ambassador", "program-data"),
        to: "program-data",
      },
      {
        from: join(root, "Allfiles", "scenario-3-ambassador", "ambassador", "references", "PLAYBOOK.md"),
        to: "PLAYBOOK.md",
      },
    ],
    purge: ["**/__pycache__/"],
  },
];

for (const j of jobs) {
  if (!existsSync(j.src)) {
    console.warn(`  skip (missing): ${j.src}`);
    continue;
  }
  const dest = join(out, j.zip);
  zipFolder(j.src, dest, j.exclude ?? [], j.purge ?? [], j.copyInto ?? []);
  console.log(`  ${j.zip.padEnd(28)} ${(statSync(dest).size / 1024).toFixed(1)} KB`);
}

// The Cowork skills ship as a single .md - Cowork's skill upload rejects .zip.
// `inline` folds reference files into that one file, so the repo keeps a single
// source of truth and Cowork still gets everything the skill needs.
const singles = [
  {
    src: join(root, "Allfiles", "scenario-1-digital-twin", "my-twin", "SKILL.md"),
    name: "my-twin-SKILL.md",
  },
  {
    src: join(root, "Allfiles", "scenario-3-ambassador", "ambassador", "SKILL.md"),
    name: "ambassador-SKILL.md",
    inline: [
      {
        path: join(root, "Allfiles", "scenario-3-ambassador", "ambassador", "references", "PLAYBOOK.md"),
        // What the skill body tells the model to go and read.
        replaces: "references/PLAYBOOK.md",
        // Other folder-shaped paths that make no sense in a single-file upload.
        alsoRewrite: [{ from: "`references/*.md`", to: "its own section" }],
        heading: "Playbook",
      },
    ],
  },
];

for (const s of singles) {
  if (!existsSync(s.src)) {
    console.warn(`  skip (missing): ${s.src}`);
    continue;
  }
  const dest = join(out, s.name);
  if (s.inline?.length) {
    let body = readFileSync(s.src, "utf8");
    for (const ref of s.inline) {
      if (!existsSync(ref.path)) {
        throw new Error(`inline source missing: ${ref.path}`);
      }
      if (!body.includes(ref.replaces)) {
        throw new Error(`${s.name}: nothing references ${ref.replaces}`);
      }
      // Point the model at the inlined section instead of a file that won't exist.
      const pointer = `the "${ref.heading}" section below`;
      body = body.replaceAll(`\`${ref.replaces}\``, pointer);
      body = body.replaceAll(ref.replaces, pointer);
      for (const { from, to } of ref.alsoRewrite ?? []) {
        if (!body.includes(from)) {
          throw new Error(`${s.name}: nothing to rewrite for ${from}`);
        }
        body = body.replaceAll(from, to);
      }
      const text = readFileSync(ref.path, "utf8").replace(/^#\s+.*\r?\n/, "");
      body += `\n\n---\n\n# ${ref.heading}\n\n${text.trim()}\n`;
    }
    writeFileSync(dest, body);
  } else {
    copyFileSync(s.src, dest);
  }
  console.log(`  ${s.name.padEnd(28)} ${(statSync(dest).size / 1024).toFixed(1)} KB`);
}

console.log("packaged -> docs/public/downloads/");
