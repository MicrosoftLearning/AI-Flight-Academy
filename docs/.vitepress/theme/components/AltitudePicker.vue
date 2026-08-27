<script setup lang="ts">
/**
 * Altitude picker for Scenario 0. The selection is module-level state rather
 * than component state, so every AltitudePicker and AltitudeOnly on the page
 * moves together: pick once at the top and the whole page follows.
 */
import { altitude, ALTITUDES, type AltitudeId } from "./altitude";

function pick(id: AltitudeId) {
  altitude.value = altitude.value === id ? null : id;
}
</script>

<template>
  <div class="altitude-picker">
    <div class="altitude-bubbles">
      <button
        v-for="a in ALTITUDES"
        :key="a.id"
        type="button"
        class="altitude-bubble"
        :class="{ 'is-active': altitude === a.id }"
        :aria-pressed="altitude === a.id"
        @click="pick(a.id)"
      >
        <span class="altitude-bubble-emoji">{{ a.emoji }}</span>
        <span class="altitude-bubble-title">{{ a.label }}</span>
        <span class="altitude-bubble-desc">{{ a.desc }}</span>
        <span class="altitude-bubble-cta">
          {{ altitude === a.id ? "Showing your steps" : "Show my steps →" }}
        </span>
      </button>
    </div>

    <p v-if="!altitude" class="altitude-hint">
      Pick one and the rest of this page shows only your path.
    </p>
    <p v-else class="altitude-hint">
      Showing <strong>{{ ALTITUDES.find((a) => a.id === altitude)?.label }}</strong>.
      <button type="button" class="altitude-reset" @click="altitude = null">
        Show all three
      </button>
    </p>
  </div>
</template>
