// Single source of truth for the hack's build matrix: tracks (altitudes) x scenarios.
// Imported by .vitepress/config.mts (nav + sidebar) and by the Vue components
// (PathPicker, BuildMatrix) so every entry point stays in sync automatically.

export type Status = "ready" | "wip" | "soon";

export interface Track {
  id: string;
  emoji: string;
  icon: string;
  label: string;
  sub: string;
  tool: string;
  desc: string;
}

export interface Scenario {
  id: string;
  emoji: string;
  label: string;
  name: string;
  sub: string;
  status: Status;
}

export const tracks: Track[] = [
  {
    id: "base",
    emoji: "🟢",
    icon: "✨",
    label: "Base",
    sub: "Copilot-Crafted",
    tool: "Microsoft 365 Copilot + Cowork",
    desc: "Build with Microsoft 365 Copilot and Cowork. Turn a repetitive task into a reusable skill that runs itself. No code, all impact.",
  },
  {
    id: "builder",
    emoji: "🔵",
    icon: "🧩",
    label: "Builder",
    sub: "Agent-Orchestrated",
    tool: "Copilot Studio / Scout",
    desc: "Wire up a little team of agents that hand off to each other, ground on real files, and fire an alert to Teams.",
  },
  {
    id: "advanced",
    emoji: "🟣",
    icon: "🛰️",
    label: "Advanced",
    sub: "Code-Extended",
    tool: "VS Code + GitHub Copilot",
    desc: "Build with Scout and GitHub Copilot. Add a custom connector, ground on live data with Work IQ, and put a guardrail on the output.",
  },
];

export const scenarios: Scenario[] = [
  {
    id: "scenario-1",
    emoji: "🧬",
    label: "Scenario 1",
    name: "The Digital Twin",
    sub: "A portable spec of how you work",
    status: "wip",
  },
  {
    id: "scenario-2",
    emoji: "🚦",
    label: "Scenario 2",
    name: "The Greenlight",
    sub: "An audience council that reviews content",
    status: "wip",
  },
  {
    id: "scenario-3",
    emoji: "🎯",
    label: "Scenario 3",
    name: "TBD",
    sub: "Still being locked with the LT",
    status: "soon",
  },
];

// Status of each track x scenario build page. Anything not listed is "soon".
export const buildStatus: Record<string, Status> = {
  "base-scenario-1": "wip",
  "builder-scenario-1": "soon",
  "advanced-scenario-1": "wip",
  "base-scenario-2": "wip",
  "builder-scenario-2": "wip",
  "advanced-scenario-2": "wip",
  "base-scenario-3": "soon",
  "builder-scenario-3": "soon",
  "advanced-scenario-3": "soon",
};

export const statusLabel: Record<Status, string> = {
  ready: "",
  wip: "🚧",
  soon: "Coming soon",
};

export function buildId(trackId: string, scenarioId: string): string {
  return `${trackId}-${scenarioId}`;
}

export function buildLink(trackId: string, scenarioId: string): string {
  return `/build/${buildId(trackId, scenarioId)}`;
}

export function statusFor(trackId: string, scenarioId: string): Status {
  return buildStatus[buildId(trackId, scenarioId)] ?? "soon";
}

export function getTrack(trackId: string): Track | undefined {
  return tracks.find((t) => t.id === trackId);
}

export function getScenario(scenarioId: string): Scenario | undefined {
  return scenarios.find((s) => s.id === scenarioId);
}

function suffix(trackId: string, scenarioId: string): string {
  const label = statusLabel[statusFor(trackId, scenarioId)];
  return label ? ` (${label})` : "";
}

/** "Start Building" nav dropdown: one group per scenario, one item per track. */
export function navBuildItems() {
  return [
    { text: "All build pages", link: "/build/" },
    ...scenarios.map((s) => ({
      text: `${s.emoji} ${s.label} · ${s.name}`,
      items: tracks.map((t) => ({
        text: `${t.emoji} ${t.label} — ${t.tool}${suffix(t.id, s.id)}`,
        link: buildLink(t.id, s.id),
      })),
    })),
  ];
}

/** Sidebar shown on every /build/ page so you can hop scenarios and tracks. */
export function buildSidebar() {
  return [
    {
      text: "Build pages",
      items: [{ text: "Pick your path", link: "/build/" }],
    },
    ...scenarios.map((s) => ({
      text: `${s.emoji} ${s.label} · ${s.name}`,
      collapsed: false,
      items: tracks.map((t) => ({
        text: `${t.emoji} ${t.label}${suffix(t.id, s.id)}`,
        link: buildLink(t.id, s.id),
      })),
    })),
  ];
}
