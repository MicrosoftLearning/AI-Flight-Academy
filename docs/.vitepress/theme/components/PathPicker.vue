<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, withBase } from "vitepress";
import {
  tracks,
  scenarios,
  buildLink,
  statusFor,
  statusLabel,
} from "../../data/paths";

const router = useRouter();

const track = ref<string | null>(null);
const scenario = ref<string | null>(null);

const ready = computed(() => track.value !== null && scenario.value !== null);

const chosenTrack = computed(() =>
  tracks.find((t) => t.id === track.value)
);
const chosenScenario = computed(() =>
  scenarios.find((s) => s.id === scenario.value)
);

const chosenStatus = computed(() =>
  ready.value ? statusLabel[statusFor(track.value!, scenario.value!)] : ""
);

function comboStatus(scenarioId: string) {
  if (!track.value) return "";
  return statusLabel[statusFor(track.value, scenarioId)];
}

function start() {
  if (!ready.value) return;
  router.go(withBase(buildLink(track.value!, scenario.value!)));
}

function reset() {
  track.value = null;
  scenario.value = null;
}

/**
 * Render `**bold**` in card copy. The source is a build-time constant in
 * paths.ts and never user input, so this is safe to pass to v-html.
 */
function bold(s: string) {
  return s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}
</script>

<template>
  <div class="path-picker">
    <!-- Step 1: Altitude -->
    <div class="picker-step">
      <div class="picker-step-head">
        <span class="picker-step-num" :class="{ done: track }">1</span>
        <span class="picker-step-label">Pick your altitude</span>
      </div>
      <div class="picker-options">
        <button
          v-for="a in tracks"
          :key="a.id"
          type="button"
          class="picker-bubble"
          :class="{ selected: track === a.id }"
          @click="track = a.id"
        >
          <span class="picker-bubble-emoji">{{ a.icon }}</span>
          <span class="picker-bubble-title">{{ a.emoji }} {{ a.label }}</span>
          <span class="picker-bubble-sub">{{ a.sub }}</span>
          <span class="picker-bubble-builds">{{ a.buildsVerb }}</span>
          <!-- eslint-disable-next-line vue/no-v-html -- build-time constant -->
          <span class="picker-bubble-desc" v-html="bold(a.desc)"></span>
        </button>
      </div>
    </div>

    <!-- Step 2: Scenario -->
    <div class="picker-step" :class="{ dimmed: !track }">
      <div class="picker-step-head">
        <span class="picker-step-num" :class="{ done: scenario }">2</span>
        <span class="picker-step-label">Pick your scenario</span>
      </div>
      <div class="picker-options">
        <button
          v-for="s in scenarios"
          :key="s.id"
          type="button"
          class="picker-bubble"
          :class="{ selected: scenario === s.id }"
          :disabled="!track"
          @click="scenario = s.id"
        >
          <span class="picker-bubble-emoji">{{ s.emoji }}</span>
          <span class="picker-bubble-title">{{ s.label }}</span>
          <span class="picker-bubble-sub">{{ s.name }}</span>
          <span class="picker-bubble-desc">{{ s.sub }}</span>
          <span v-if="comboStatus(s.id)" class="picker-bubble-status">
            {{ comboStatus(s.id) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Step 3: Launch -->
    <div class="picker-launch">
      <p v-if="ready" class="picker-summary">
        {{ chosenTrack?.emoji }} <strong>{{ chosenTrack?.label }}</strong>
        · {{ chosenScenario?.label }} ({{ chosenScenario?.name }})
        <span v-if="chosenStatus"> – {{ chosenStatus }}</span>
      </p>
      <div class="picker-actions">
        <button
          type="button"
          class="picker-go"
          :disabled="!ready"
          @click="start"
        >
          Start building →
        </button>
        <button
          v-if="track || scenario"
          type="button"
          class="picker-reset"
          @click="reset"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.path-picker {
  margin: 1.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  margin-bottom: 0.75rem;
}

.picker-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 0.85rem;
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
  font-size: 1.05rem;
}

.picker-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
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
  gap: 0.3rem;
  padding: 1.1rem 1.25rem;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
}

.picker-bubble:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
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

.picker-bubble-emoji {
  font-size: 1.6rem;
}

.picker-bubble-title {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}

.picker-bubble-sub {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.picker-bubble-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

/* "Builds with" / "Builds in" — the kicker above the tool line. */
.picker-bubble-builds {
  margin-top: 0.6rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.picker-bubble-desc :deep(strong) {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.picker-bubble-status {
  margin-top: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.picker-launch {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.picker-summary {
  margin: 0.5rem 0 0;
  color: var(--vp-c-text-2);
}

.picker-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.picker-go {
  padding: 0.7rem 1.4rem;
  border-radius: 20px;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  background: var(--vp-c-brand-1);
  cursor: pointer;
  transition: background 0.2s ease, opacity 0.2s ease;
}

.picker-go:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.picker-go:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.picker-reset {
  padding: 0.7rem 1rem;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.9rem;
}

.picker-reset:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}
</style>
