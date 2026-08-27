<script setup lang="ts">
/**
 * Shows its slot only when the page's altitude matches, or when nothing is
 * picked yet. Before a choice is made every block is visible, so the page
 * still reads top to bottom for anyone who never clicks.
 */
import { computed } from "vue";
import { altitude, ALTITUDES, type AltitudeId } from "./altitude";

const props = defineProps<{ track: AltitudeId }>();

const shown = computed(() => altitude.value === null || altitude.value === props.track);
const meta = computed(() => ALTITUDES.find((a) => a.id === props.track)!);
</script>

<template>
  <section v-show="shown" class="altitude-block" :class="`is-${track}`">
    <div class="altitude-block-tag">
      <span class="altitude-block-emoji">{{ meta.emoji }}</span>
      <span class="altitude-block-label">{{ meta.label }}</span>
    </div>
    <div class="altitude-block-body">
      <slot />
    </div>
  </section>
</template>
