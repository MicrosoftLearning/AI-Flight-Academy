<script setup lang="ts">
import { computed } from "vue";
import { useRoute, withBase } from "vitepress";
import { getTrack, getScenario, statusFor, statusLabel } from "../../data/paths";

const route = useRoute();

// Route looks like /Team-Week-Imagineer-Hack/build/base-scenario-2
const parsed = computed(() => {
  const m = route.path.match(/\/build\/([a-z]+)-(scenario-\d+)/);
  if (!m) return null;
  const track = getTrack(m[1]);
  const scenario = getScenario(m[2]);
  if (!track || !scenario) return null;
  return { track, scenario, status: statusLabel[statusFor(m[1], m[2])] };
});
</script>

<template>
  <div v-if="parsed" class="build-badge">
    <span class="build-badge-part">
      {{ parsed.scenario.emoji }} {{ parsed.scenario.label }} ·
      <strong>{{ parsed.scenario.name }}</strong>
    </span>
    <span class="build-badge-sep">/</span>
    <span class="build-badge-part">
      {{ parsed.track.emoji }} <strong>{{ parsed.track.label }}</strong>
      <span class="build-badge-tool">{{ parsed.track.tool }}</span>
    </span>
    <span v-if="parsed.status" class="build-badge-status">{{ parsed.status }}</span>
    <a class="build-badge-switch" :href="withBase('/build/')">Switch path →</a>
  </div>
</template>

<style scoped>
.build-badge {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 1.5rem;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.build-badge-part {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.build-badge-part strong {
  color: var(--vp-c-text-1);
}

.build-badge-tool {
  color: var(--vp-c-text-3);
}

.build-badge-sep {
  color: var(--vp-c-divider);
}

.build-badge-status {
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: var(--vp-c-default-soft);
  font-size: 0.75rem;
}

.build-badge-switch {
  margin-left: auto;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  white-space: nowrap;
}

.build-badge-switch:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .build-badge-switch {
    margin-left: 0;
  }
}
</style>
