<script setup lang="ts">
import { computed } from "vue";
import { useRoute, withBase } from "vitepress";
import { getTrack, getScenario, statusFor, statusLabel, CHOOSER, SCENARIO_0 } from "../../data/paths";

const route = useRoute();

// Route looks like /AI-Flight-Academy/build/cowork-scenario-2
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
  <div v-if="parsed" class="build-bar">
    <div class="build-bar-context">
      <span class="build-bar-scenario">
        {{ parsed.scenario.emoji }} {{ parsed.scenario.name }}
      </span>
      <span class="build-bar-track">
        {{ parsed.track.emoji }} {{ parsed.track.label }}
      </span>
      <span v-if="parsed.status" class="build-bar-status">{{ parsed.status }}</span>
    </div>
    <nav v-if="parsed.scenario.id !== SCENARIO_0.id" class="build-bar-links">
      <a :href="withBase(CHOOSER)">Switch path</a>
    </nav>
  </div>
</template>

<style scoped>
.build-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin: 0 0 2rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
}

.build-bar-context {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-2);
}

.build-bar-scenario {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.build-bar-track::before {
  content: "·";
  margin-right: 0.5rem;
  color: var(--vp-c-divider);
}

.build-bar-status {
  opacity: 0.7;
}

.build-bar-links {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.build-bar-links a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
}

.build-bar-links a:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .build-bar-links {
    margin-left: 0;
    gap: 0.85rem;
  }
}
</style>
