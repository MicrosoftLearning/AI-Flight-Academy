<script setup lang="ts">
import { ref } from "vue";

type Direction = {
  emoji: string;
  title: string;
  tag?: string;
  what: string;
  start: string;
  prompt: string;
  color?: "blue" | "green" | "purple" | "orange" | "pink" | "teal" | "gray";
};

const props = defineProps<{ items: Direction[]; startLabel?: string }>();

const open = ref<number | null>(null);
const copied = ref<number | null>(null);

function toggle(i: number) {
  open.value = open.value === i ? null : i;
}

// Only page-authored copy reaches here; escape it, then turn `code` into <code>.
function inline(text: string) {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
}

async function copy(i: number) {
  try {
    await navigator.clipboard.writeText(props.items[i].prompt);
    copied.value = i;
    setTimeout(() => {
      if (copied.value === i) copied.value = null;
    }, 1500);
  } catch {
    copied.value = null;
  }
}
</script>

<template>
  <div class="direction-bubbles">
    <div
      v-for="(d, i) in items"
      :key="d.title"
      class="direction-bubble"
      :class="[`is-${d.color ?? 'blue'}`, { 'is-open': open === i }]"
    >
      <button
        type="button"
        class="direction-bubble-head"
        :aria-expanded="open === i"
        @click="toggle(i)"
      >
        <span class="direction-bubble-emoji">{{ d.emoji }}</span>
        <span class="direction-bubble-text">
          <span class="direction-bubble-title">
            {{ d.title }}
            <span v-if="d.tag" class="direction-bubble-tag">{{ d.tag }}</span>
          </span>
          <span class="direction-bubble-what">{{ d.what }}</span>
        </span>
        <span class="direction-bubble-toggle" aria-hidden="true">{{ open === i ? "−" : "+" }}</span>
      </button>

      <div v-if="open === i" class="direction-bubble-body">
        <p class="direction-bubble-start">
          <strong>{{ startLabel ?? "Your first ten minutes" }}:</strong>{{ " " }}
          <span v-html="inline(d.start)" />
        </p>
        <div class="direction-bubble-prompt-label">Try saying something like</div>
        <div class="direction-bubble-prompt">
          <p>{{ d.prompt }}</p>
          <button type="button" class="direction-bubble-copy" @click="copy(i)">
            {{ copied === i ? "Copied" : "Copy" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
