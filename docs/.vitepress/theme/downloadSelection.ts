// Shared selection for the downloads page. The picker and the panes are
// siblings in markdown, not parent and child, so provide/inject can't reach
// between them - a module-level ref is the simplest thing that does.
import { ref } from "vue";

export const dlTrack = ref<string | null>(null);
export const dlScenario = ref<string | null>(null);

const KEY = "afa-downloads-choice";

/** Restore the last choice so returning to the page doesn't reset it. */
export function restore() {
  if (typeof sessionStorage === "undefined") return;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return;
    const { t, s } = JSON.parse(raw);
    if (t) dlTrack.value = t;
    if (s) dlScenario.value = s;
  } catch {
    // A malformed entry just means no restore - never worth failing over.
  }
}

export function persist() {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(
      KEY,
      JSON.stringify({ t: dlTrack.value, s: dlScenario.value })
    );
  } catch {
    // Private-mode browsers can throw on write; the page works without it.
  }
}
