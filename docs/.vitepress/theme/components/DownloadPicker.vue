<script setup lang="ts">
// Downloads page chooser. Same two-step shape as PathPicker on the home page,
// but it filters DownloadPane blocks in place instead of navigating away -
// participants land here mid-lab and shouldn't lose the page.
import { computed, onMounted, watch } from "vue";
import { tracks, scenarios } from "../../data/paths";
import { dlTrack, dlScenario, restore, persist } from "../downloadSelection";

const ready = computed(() => dlTrack.value !== null && dlScenario.value !== null);

const chosenTrack = computed(() => tracks.find((t) => t.id === dlTrack.value));
const chosenScenario = computed(() =>
  scenarios.find((s) => s.id === dlScenario.value)
);

// A build page can link straight here with the combo already chosen, e.g.
// /resources/downloads?track=scout&scenario=scenario-3.
onMounted(() => {
  restore();
  const q = new URLSearchParams(window.location.search);
  const t = q.get("track");
  const s = q.get("scenario");
  if (t && tracks.some((x) => x.id === t)) dlTrack.value = t;
  if (s && scenarios.some((x) => x.id === s)) dlScenario.value = s;
});

watch([dlTrack, dlScenario], persist);

function reset() {
  dlTrack.value = null;
  dlScenario.value = null;
}
</script>

<template>
  <div class="dl-picker">
    <div class="picker-step">
      <div class="picker-step-head">
        <span class="picker-step-num" :class="{ done: dlTrack }">1</span>
        <span class="picker-step-label">Pick your altitude</span>
      </div>
      <div class="picker-options">
        <button
          v-for="a in tracks"
          :key="a.id"
          type="button"
          class="picker-bubble"
          :class="{ selected: dlTrack === a.id }"
          @click="dlTrack = a.id"
        >
          <span class="picker-bubble-title">{{ a.emoji }} {{ a.label }}</span>
          <span class="picker-bubble-desc">{{ a.tool }}</span>
        </button>
      </div>
    </div>

    <div class="picker-step" :class="{ dimmed: !dlTrack }">
      <div class="picker-step-head">
        <span class="picker-step-num" :class="{ done: dlScenario }">2</span>
        <span class="picker-step-label">Pick your scenario</span>
      </div>
      <div class="picker-options">
        <button
          v-for="s in scenarios"
          :key="s.id"
          type="button"
          class="picker-bubble"
          :class="{ selected: dlScenario === s.id }"
          :disabled="!dlTrack"
          @click="dlScenario = s.id"
        >
          <span class="picker-bubble-title">{{ s.emoji }} {{ s.label }}</span>
          <span class="picker-bubble-desc">{{ s.name }}</span>
        </button>
      </div>
    </div>

    <p v-if="ready" class="dl-summary">
      Showing <strong>{{ chosenTrack?.emoji }} {{ chosenTrack?.label }}</strong>
      · <strong>{{ chosenScenario?.name }}</strong>
      <button type="button" class="dl-reset" @click="reset">Change</button>
    </p>
    <p v-else class="dl-empty">
      Pick an altitude and a scenario to see just the files you need.
    </p>
  </div>
</template>

<style scoped>
.dl-picker {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 1.5rem 0 0;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.picker-step {
  transition: opacity 0.25s ease;
}

.picker-step.dimmed {
  opacity: 0.5;
}

.picker-step-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.picker-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.picker-step-num.done {
  color: #fff;
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.picker-step-label {
  font-weight: 600;
}

.picker-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

@media (max-width: 640px) {
  .picker-options {
    grid-template-columns: 1fr;
  }
}

.picker-bubble {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s ease, transform 0.15s ease;
}

.picker-bubble:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.picker-bubble:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.picker-bubble.selected {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px var(--vp-c-brand-1) inset;
  background: var(--vp-c-brand-soft);
}

.picker-bubble-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.picker-bubble-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.dl-summary,
.dl-empty {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.dl-reset {
  margin-left: 0.6rem;
  padding: 0.15rem 0.7rem;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.8rem;
}

.dl-reset:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}
</style>
