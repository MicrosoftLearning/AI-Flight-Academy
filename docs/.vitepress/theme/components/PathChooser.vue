<script setup lang="ts">
import { ref } from "vue";

const selected = ref<"a" | "b" | null>(null);

function choose(path: "a" | "b") {
  selected.value = path;
}

function reset() {
  selected.value = null;
}
</script>

<template>
  <div class="path-chooser">
    <div v-if="selected === null" class="path-options">
      <button type="button" class="path-bubble" @click="choose('a')">
        <span class="path-bubble-emoji">🛠️</span>
        <span class="path-bubble-title">Path A &middot; Build Your Own Skill</span>
        <span class="path-bubble-desc">
          Teach Cowork to handle a task your way, every time. Use the guided
          builder to turn a quick back-and-forth into a reusable skill.
        </span>
        <span class="path-bubble-cta">Choose this path &rarr;</span>
      </button>

      <button type="button" class="path-bubble" @click="choose('b')">
        <span class="path-bubble-emoji">🚀</span>
        <span class="path-bubble-title">Path B &middot; Delegate the Whole Thing</span>
        <span class="path-bubble-desc">
          Hand Cowork a whole job and get a bundle of finished work back from a
          single brief, instead of asking for one thing at a time.
        </span>
        <span class="path-bubble-cta">Choose this path &rarr;</span>
      </button>
    </div>

    <div v-else class="path-panel">
      <button type="button" class="path-back" @click="reset">
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
