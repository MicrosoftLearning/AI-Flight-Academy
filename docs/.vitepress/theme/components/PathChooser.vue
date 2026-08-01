<script setup lang="ts">
import { ref } from "vue";

withDefaults(
  defineProps<{
    aEmoji?: string;
    aTitle?: string;
    aDesc?: string;
    bEmoji?: string;
    bTitle?: string;
    bDesc?: string;
  }>(),
  {
    aEmoji: "🛠️",
    aTitle: "Path A · Build Your Own Skill",
    aDesc:
      "Teach Cowork to handle a task your way, every time. Use the guided builder to turn a quick back-and-forth into a reusable skill.",
    bEmoji: "🚀",
    bTitle: "Path B · Delegate the Whole Thing",
    bDesc:
      "Hand Cowork a whole job and get a bundle of finished work back from a single brief, instead of asking for one thing at a time.",
  }
);

const selected = ref<"a" | "b" | null>(null);
</script>

<template>
  <div class="path-chooser">
    <div v-if="selected === null" class="path-options">
      <button type="button" class="path-bubble" @click="selected = 'a'">
        <span class="path-bubble-emoji">{{ aEmoji }}</span>
        <span class="path-bubble-title">{{ aTitle }}</span>
        <span class="path-bubble-desc">{{ aDesc }}</span>
        <span class="path-bubble-cta">Choose this path &rarr;</span>
      </button>

      <button type="button" class="path-bubble" @click="selected = 'b'">
        <span class="path-bubble-emoji">{{ bEmoji }}</span>
        <span class="path-bubble-title">{{ bTitle }}</span>
        <span class="path-bubble-desc">{{ bDesc }}</span>
        <span class="path-bubble-cta">Choose this path &rarr;</span>
      </button>
    </div>

    <div v-else class="path-panel">
      <button type="button" class="path-back" @click="selected = null">
        &larr; Choose a different path
      </button>

      <div v-show="selected === 'a'" class="path-body">
        <slot name="pathA" />
      </div>
      <div v-show="selected === 'b'" class="path-body">
        <slot name="pathB" />
      </div>
    </div>
  </div>
</template>
