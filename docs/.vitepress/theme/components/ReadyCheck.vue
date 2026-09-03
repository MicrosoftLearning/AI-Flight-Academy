<script setup lang="ts">
/**
 * A two-option selector for the Scenario 0 Code readiness check: pick the
 * surface you'll actually use - the Copilot CLI or the VS Code Agents window -
 * and see only that path. Content for each comes from named slots, so it stays
 * authored in Markdown.
 */
import { ref } from "vue";

type Option = "cli" | "app" | "vscode";
const active = ref<Option>("cli");
</script>

<template>
  <div class="ready-check">
    <div class="ready-check-tabs" role="tablist">
      <button
        type="button"
        role="tab"
        class="ready-check-tab"
        :class="{ active: active === 'cli' }"
        :aria-selected="active === 'cli'"
        @click="active = 'cli'"
      >
        GitHub Copilot CLI
      </button>
      <button
        type="button"
        role="tab"
        class="ready-check-tab"
        :class="{ active: active === 'app' }"
        :aria-selected="active === 'app'"
        @click="active = 'app'"
      >
        GitHub Copilot App
      </button>
      <button
        type="button"
        role="tab"
        class="ready-check-tab"
        :class="{ active: active === 'vscode' }"
        :aria-selected="active === 'vscode'"
        @click="active = 'vscode'"
      >
        VS Code Agents Window
      </button>
    </div>

    <div v-show="active === 'cli'" class="ready-check-panel" role="tabpanel">
      <slot name="cli" />
    </div>
    <div v-show="active === 'app'" class="ready-check-panel" role="tabpanel">
      <slot name="app" />
    </div>
    <div v-show="active === 'vscode'" class="ready-check-panel" role="tabpanel">
      <slot name="vscode" />
    </div>
  </div>
</template>

<style scoped>
.ready-check {
  margin: 1.25rem 0;
}

.ready-check-tabs {
  display: flex;
  gap: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.ready-check-tab {
  padding: 0.55rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.ready-check-tab:hover {
  color: var(--vp-c-text-1);
}

.ready-check-tab.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.ready-check-panel {
  padding-top: 1rem;
}

.ready-check-panel > :first-child {
  margin-top: 0;
}

.ready-check-panel > :last-child {
  margin-bottom: 0;
}
</style>
