<script setup lang="ts">
// One track x scenario slice of the downloads page. The slot holds ordinary
// markdown, so the copy stays in downloads.md where it can be edited without
// touching Vue.
import { computed } from "vue";
import { dlTrack, dlScenario } from "../downloadSelection";

const props = defineProps<{ track: string; scenario: string }>();

const shown = computed(
  () => dlTrack.value === props.track && dlScenario.value === props.scenario
);
</script>

<template>
  <div v-show="shown" class="download-pane">
    <slot />
  </div>
</template>

<style scoped>
.download-pane {
  margin-top: 1.5rem;
}
</style>
