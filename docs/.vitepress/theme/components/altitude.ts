// Shared altitude selection for the Scenario 0 page. Module-level so every
// picker and gated block on the page reads the same value.

import { ref } from "vue";

export type AltitudeId = "cowork" | "scout" | "code";

export const ALTITUDES: {
  id: AltitudeId;
  emoji: string;
  label: string;
  desc: string;
}[] = [
  {
    id: "cowork",
    emoji: "🟢",
    label: "Cowork",
    desc: "Build in chat. Nothing to install.",
  },
  {
    id: "scout",
    emoji: "🔵",
    label: "Scout",
    desc: "Describe it and Scout builds it.",
  },
  {
    id: "code",
    emoji: "🟣",
    label: "Code",
    desc: "Work in VS Code or a terminal.",
  },
];

export const altitude = ref<AltitudeId | null>(null);
