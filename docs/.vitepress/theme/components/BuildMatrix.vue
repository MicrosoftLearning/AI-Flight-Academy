<script setup lang="ts">
import { computed } from "vue";
import { withBase } from "vitepress";
import {
  tracks,
  scenarios,
  buildLink,
  statusFor,
  statusLabel,
} from "../../data/paths";

const props = withDefaults(
  defineProps<{
    /** Limit to one track, e.g. track="base". Omit to show all. */
    track?: string;
    /** Limit to one scenario, e.g. scenario="scenario-2". Omit to show all. */
    scenario?: string;
  }>(),
  { track: "", scenario: "" }
);

const shownTracks = computed(() =>
  props.track ? tracks.filter((t) => t.id === props.track) : tracks
);
const shownScenarios = computed(() =>
  props.scenario ? scenarios.filter((s) => s.id === props.scenario) : scenarios
);

function href(trackId: string, scenarioId: string) {
  return withBase(buildLink(trackId, scenarioId));
}
</script>

<template>
  <div class="build-matrix">
    <div v-for="s in shownScenarios" :key="s.id" class="build-matrix-group">
      <h3 class="build-matrix-heading">
        {{ s.emoji }} {{ s.label }} · {{ s.name }}
      </h3>
      <p class="build-matrix-sub">{{ s.sub }}</p>
      <ul class="build-matrix-list">
        <li v-for="t in shownTracks" :key="t.id">
          <a :href="href(t.id, s.id)">
            {{ t.emoji }} <strong>{{ t.label }}</strong> — {{ t.tool }}
          </a>
          <span
            v-if="statusLabel[statusFor(t.id, s.id)]"
            class="build-matrix-status"
          >
            {{ statusLabel[statusFor(t.id, s.id)] }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.build-matrix {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 1.25rem 0;
}

.build-matrix-heading {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  border-top: none;
  padding-top: 0;
}

.build-matrix-sub {
  margin: 0.15rem 0 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.build-matrix-list {
  margin: 0;
  padding-left: 1.1rem;
}

.build-matrix-list li {
  margin: 0.25rem 0;
}

.build-matrix-status {
  margin-left: 0.4rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}
</style>
