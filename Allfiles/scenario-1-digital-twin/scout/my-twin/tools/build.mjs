// Renders the Command Center.
//
//   panels/<id>.md  ->  what to ask        (shareable, no personal data)
//   data/<id>.json  ->  what it last found (private, never leaves this machine)
//   command-center.html                    (a local file, opened from disk)
//
// No dependencies and no build step: `node tools/build.mjs` from the skill folder.
//
// Adding a panel means adding a file to panels/ - nothing here needs changing.

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const panelsDir = join(root, "panels");
const dataDir = join(root, "data");
const outFile = join(root, "command-center.html");

const ACCENTS = {
  amber: "#c77b1f",
  red: "#c0392b",
  blue: "#2b6cb0",
  green: "#2f7d4f",
  grey: "#5c6470",
};

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

function esc(s) {
  return String(s ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

function loadPanels() {
  if (!existsSync(panelsDir)) return [];
  return readdirSync(panelsDir)
    .filter((f) => f.endsWith(".md") && f !== "PANEL-CONTRACT.md")
    .map((f) => {
      const fm = parseFrontmatter(readFileSync(join(panelsDir, f), "utf8")) ?? {};
      const id = fm.id || basename(f, ".md");
      const emptyLine = readFileSync(join(panelsDir, f), "utf8").split(/^## Empty\s*$/m)[1];
      return {
        id,
        title: fm.title || id,
        accent: ACCENTS[fm.accent] || ACCENTS.grey,
        order: Number.isFinite(+fm.order) ? +fm.order : 50,
        empty: (emptyLine || "").trim().split(/\r?\n\r?\n/)[0]?.trim() || "Nothing here.",
        data: loadData(id),
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

function loadData(id) {
  const p = join(dataDir, `${id}.json`);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch (e) {
    return { error: `data/${id}.json is not valid JSON` };
  }
}

// A source reporting 0 is shown in warning colour: a panel that names a source
// in its Pull and never reads it looks identical to one that read it and found
// nothing, unless the page says so.
function renderSources(sources) {
  if (!sources || typeof sources !== "object") return "";
  const parts = Object.entries(sources).map(([k, v]) =>
    v ? `${esc(k)} ${v}` : `<span class="zero">${esc(k)} 0</span>`
  );
  return parts.length ? `<br>${parts.join(" · ")}` : "";
}

function renderItem(it) {
  const age =
    typeof it.age === "number"
      ? `<span class="age${it.age >= 7 ? " age-hot" : ""}">${it.age}d</span>`
      : "";
  const label = it.url
    ? `<a href="${esc(it.url)}">${esc(it.label)}</a>`
    : esc(it.label);
  return `<li><div class="row">${age}<span class="label">${label}</span></div>
        <div class="meta">${esc(it.meta ?? "")}</div></li>`;
}

function renderPanel(p) {
  const d = p.data;
  let body;
  let count = "";

  if (!d) {
    body = `<p class="note">Never run. Say <code>refresh my command center</code>.</p>`;
  } else if (d.error) {
    body = `<p class="note err">${esc(d.error)}</p>`;
  } else if (!d.items?.length) {
    body = `<p class="note">${esc(p.empty)}</p>`;
  } else {
    count = `<span class="count">${d.items.length}</span>`;
    body = `<ul>${d.items.map(renderItem).join("\n")}</ul>`;
  }

  const scope =
    d && !d.error
      ? `<footer>${esc(d.window ?? "")}${
          d.checked != null ? ` · ${d.checked} checked` : ""
        }${renderSources(d.sources)}</footer>`
      : "";

  return `<section class="panel" style="--accent:${p.accent}">
      <h2>${esc(p.title)}${count}</h2>
      ${body}
      ${scope}
    </section>`;
}

const panels = loadPanels();
const stamps = panels.map((p) => p.data?.generated).filter(Boolean).sort();
const built = stamps.length
  ? new Date(stamps[0]).toLocaleString(undefined, {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
    })
  : "never";

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Command Center</title>
<style>
  :root {
    --bg: #f7f7f5; --card: #fff; --ink: #1b1d21; --dim: #6b7280;
    --line: #e4e4e1; --hot: #c0392b;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#16181c; --card:#1e2126; --ink:#e8e8e6; --dim:#9aa1ab;
            --line:#2c3037; --hot:#e06c5c; }
  }
  * { box-sizing: border-box; }
  body { margin:0; padding:2.5rem 1.5rem; background:var(--bg); color:var(--ink);
    font:15px/1.5 ui-sans-serif,-apple-system,"Segoe UI",system-ui,sans-serif; }
  .wrap { max-width: 78rem; margin: 0 auto; }
  header.top { display:flex; align-items:baseline; gap:1rem; flex-wrap:wrap;
    margin-bottom:1.75rem; }
  h1 { font-size:1.45rem; margin:0; letter-spacing:-.01em; }
  .built { color:var(--dim); font-size:.82rem; }
  .grid { display:grid; gap:1.1rem; align-items:start;
    grid-template-columns:repeat(auto-fit,minmax(21rem,1fr)); }
  .panel { background:var(--card); border:1px solid var(--line);
    border-top:3px solid var(--accent); border-radius:10px; padding:1.1rem 1.25rem; }
  h2 { font-size:.94rem; margin:0 0 .85rem; display:flex; align-items:center;
    gap:.5rem; letter-spacing:.01em; }
  .count { background:var(--accent); color:#fff; border-radius:999px;
    padding:.05rem .5rem; font-size:.76rem; font-weight:600; }
  ul { list-style:none; margin:0; padding:0; }
  li { padding:.6rem 0; border-top:1px solid var(--line); }
  li:first-child { border-top:0; padding-top:0; }
  .row { display:flex; gap:.6rem; align-items:baseline; }
  .age { color:var(--dim); font-size:.78rem; font-variant-numeric:tabular-nums;
    min-width:2.2rem; }
  .age-hot { color:var(--hot); font-weight:600; }
  .label { flex:1; }
  .label a { color:inherit; }
  .meta { color:var(--dim); font-size:.8rem; margin-left:2.8rem; }
  .note { color:var(--dim); margin:0; font-size:.88rem; }
  .err { color:var(--hot); }
  footer { margin-top:.9rem; padding-top:.6rem; border-top:1px solid var(--line);
    color:var(--dim); font-size:.75rem; line-height:1.7; }
  .zero { color:var(--hot); }
  .foot { margin-top:2rem; color:var(--dim); font-size:.78rem; }
  .empty-deck { color:var(--dim); }
</style>
</head>
<body>
<div class="wrap">
  <header class="top">
    <h1>Command Center</h1>
    <span class="built">refreshed ${esc(built)}</span>
  </header>
  ${
    panels.length
      ? `<div class="grid">${panels.map(renderPanel).join("\n")}</div>`
      : `<p class="empty-deck">No panels yet. Add one to <code>panels/</code>.</p>`
  }
  <p class="foot">Local file. Nothing here is published, and nothing sends.</p>
</div>
</body>
</html>
`;

if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
writeFileSync(outFile, html, "utf8");
console.log(`command-center.html  ${panels.length} panel(s)`);
for (const p of panels) {
  const n = p.data?.error ? "error" : p.data ? `${p.data.items?.length ?? 0} items` : "never run";
  console.log(`  ${p.id.padEnd(20)} ${n}`);
}
// Printed with forward slashes so it can be handed straight to the user and
// opened. The skill folder moves with the Scout install, so never assume it.
console.log(`\nPAGE: ${outFile.replace(/\\/g, "/")}`);
