import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const docsDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

// Mirrors @mdit-vue/shared's slugify, which VitePress bundles and uses to
// generate heading ids. Kept in step with it by validating the output of this
// function against the ids in the built HTML (see scripts/check-anchors.mjs).
const rControl = /[\u0000-\u001f]/g;
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g;
const rCombining = /[\u0300-\u036F]/g;

export function slugify(str: string): string {
  return str
    .normalize("NFKD")
    .replace(rCombining, "")
    .replace(rControl, "")
    .replace(rSpecial, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/^(\d)/, "_$1")
    .toLowerCase();
}

/** Strip the inline markdown VitePress would render away before slugifying. */
function plainText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

export interface Heading {
  level: number;
  text: string;
  anchor: string;
}

/**
 * Pull the h2/h3 headings out of a page so they can be nested into the
 * sidebar under the page you're on. Fenced code blocks are skipped so a
 * comment like "# install" inside a shell sample isn't mistaken for a heading.
 */
export function pageHeadings(relativePath: string, levels = [2, 3]): Heading[] {
  let raw: string;
  try {
    raw = readFileSync(resolve(docsDir, relativePath), "utf-8");
  } catch {
    return [];
  }

  const out: Heading[] = [];
  let inFence = false;
  let fenceMarker = "";
  let componentDepth = 0;

  for (const line of raw.split(/\r?\n/)) {
    const fence = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fence[1][0];
      } else if (fence[1][0] === fenceMarker) {
        inFence = false;
      }
      continue;
    }
    if (inFence) continue;

    // Headings inside a custom component (e.g. <PathChooser>) live in slots
    // that may be hidden behind a v-if, so they aren't reliably in the DOM.
    // Linking to them from the sidebar would produce a dead anchor.
    const open = line.match(/^\s*<([A-Z][A-Za-z0-9]*)(?![^>]*\/>)/);
    const close = line.match(/^\s*<\/([A-Z][A-Za-z0-9]*)>/);
    if (open) componentDepth++;
    if (close) componentDepth = Math.max(0, componentDepth - 1);
    if (componentDepth > 0) continue;

    const m = line.match(/^(#{2,3})\s+(.*?)\s*$/);
    if (!m) continue;

    const level = m[1].length;
    if (!levels.includes(level)) continue;

    let text = m[2];
    let anchor: string | null = null;

    // Explicit anchor: "## Title {#custom-id}"
    const custom = text.match(/\s*\{#([^}]+)\}\s*$/);
    if (custom) {
      anchor = custom[1];
      text = text.slice(0, custom.index).trim();
    }

    text = plainText(text);
    out.push({ level, text, anchor: anchor ?? slugify(text) });
  }

  return out;
}
