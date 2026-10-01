// Single source of truth for the hack's build matrix: tracks x scenarios.
// Imported by .vitepress/config.mts (nav + sidebar) and by the Vue components
// (PathPicker, BuildMatrix) so every entry point stays in sync automatically.

export type Status = "ready" | "wip" | "soon";

export interface Track {
  id: string;
  emoji: string;
  icon: string;
  label: string;
  tool: string;
  /** Preposition that fits the tool: you build *with* Cowork, *in* VS Code. */
  buildsVerb: string;
  /** Card copy. `**bold**` is rendered by PathPicker - keep it to tool names. */
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
    id: "cowork",
    emoji: "🟢",
    icon: "✨",
    label: "Cowork",
    tool: "Microsoft Copilot + Cowork",
    buildsVerb: "Builds with",
    desc: "**Microsoft Copilot Cowork** - just describe what you need. **Work IQ** pulls in your work context automatically.",
  },
  {
    id: "scout",
    emoji: "🔵",
    icon: "🧩",
    label: "Scout",
    tool: "Microsoft Scout",
    buildsVerb: "Builds with",
    desc: "**Microsoft Scout** - describe what you want and Scout builds it, grounded in your work through **Work IQ** and running against **GitHub Copilot CLI**.",
  },
  {
    id: "code",
    emoji: "🟣",
    icon: "🛰️",
    label: "Code",
    tool: "VS Code + GitHub Copilot",
    buildsVerb: "Builds in",
    desc: "**GitHub Copilot on the surface of your choice - VS Code, the Copilot CLI, or the GitHub Copilot app.** Write the agents yourself and enforce guardrails in the tool rather than the prompt.",
  },
];

/**
 * Scenario 0 is the pre-event readiness call, not a hack scenario. It has the
 * same page-per-track shape as the real scenarios - a brief plus one build page
 * per altitude - but it stays out of `scenarios` on purpose. That array drives
 * the home-page chooser and the hack scenario list, and Scenario 0 belongs in
 * neither.
 *
 * For Team Week it is also hidden from the "Start Building" dropdown and the
 * sidebar, so nobody lands in setup by mistake during the event. The pages are
 * still generated and still work when you navigate straight to them - restoring
 * the links after the event means adding it back in `navBuildItems` and the
 * unscoped branch of `globalSidebar` in sidebar.ts.
 */
export const SCENARIO_0: Scenario = {
  id: "scenario-0",
  emoji: "🛫",
  label: "Scenario 0",
  name: "Pre-Flight Checklist",
  sub: "Your pre-flight readiness check",
  status: "wip",
};

export const scenarios: Scenario[] = [  {
    id: "scenario-1",
    emoji: "🧬",
    label: "Scenario 1",
    name: "The Digital Twin",
    sub: "A portable spec of how you work",
    status: "wip",
  },
  {
    id: "scenario-2",
    emoji: "🎛️",
    label: "Scenario 2",
    name: "Dispatch",
    sub: "A room of teams that routes a skilling request",
    status: "wip",
  },
  {
    id: "scenario-3",
    emoji: "🎖️",
    label: "Scenario 3",
    name: "The Ambassador",
    sub: "Find who multiplies others, and show why",
    status: "wip",
  },
];

// Status of each track x scenario build page. Anything not listed is "soon".
export const buildStatus: Record<string, Status> = {
  "cowork-scenario-0": "ready",
  "scout-scenario-0": "ready",
  "code-scenario-0": "ready",
  "cowork-scenario-1": "wip",
  "scout-scenario-1": "wip",
  "code-scenario-1": "wip",
  "cowork-scenario-2": "wip",
  "scout-scenario-2": "wip",
  "code-scenario-2": "wip",
  "cowork-scenario-3": "wip",
  "scout-scenario-3": "wip",
  "code-scenario-3": "wip",
};

export const statusLabel: Record<Status, string> = {
  ready: "",
  wip: "",
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
  return [SCENARIO_0, ...scenarios].find((s) => s.id === scenarioId);
}


/** The single chooser lives on the home page. Everything points at it. */
export const CHOOSER = "/#start-here";
