// Single source of truth for the hack's build matrix: tracks x scenarios.
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
  /** Preposition that fits the tool: you build *with* Cowork, *in* VS Code. */
  buildsVerb: string;
  /** Card copy. `**bold**` is rendered by PathPicker - keep it to tool names. */
  desc: string;
  /** Section of /bricks/ holding the step-by-step guides for this track. */
  guidesLink: string;
  /** The guides themselves, for the sidebar. */
  guides: { text: string; link: string }[];
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
    sub: "Copilot-Crafted",
    tool: "Microsoft 365 Copilot + Cowork",
    buildsVerb: "Builds with",
    desc: "**Microsoft 365 Copilot Cowork** – just describe what you need. **Work IQ** pulls in your work context automatically.",
    guidesLink: "/bricks/#cowork",
    guides: [
      { text: "Connect to a data source", link: "/bricks/cowork-connect-source" },
      { text: "Write a reusable skill", link: "/bricks/cowork-build-skill" },
      { text: "Produce a formatted output", link: "/bricks/cowork-formatted-output" },
      { text: "Re-run a skill on new inputs", link: "/bricks/cowork-rerun-skill" },
    ],
  },
  {
    id: "scout",
    emoji: "🔵",
    icon: "🧩",
    label: "Scout",
    sub: "Agent-Orchestrated",
    tool: "Microsoft Scout",
    buildsVerb: "Builds with",
    desc: "**Microsoft Scout** – describe what you want and Scout builds it, grounded in your work through **Work IQ** and running against **GitHub Copilot CLI**.",
    guidesLink: "/bricks/#copilot-studio",
    guides: [
      { text: "Create an agent + solution", link: "/bricks/studio-create-agent" },
      { text: "Add a topic with a trigger", link: "/bricks/studio-topic-trigger" },
      { text: "Ground on a knowledge source", link: "/bricks/studio-knowledge-grounding" },
      { text: "Two agents that hand off", link: "/bricks/studio-multi-agent" },
      { text: "Add an agent flow", link: "/bricks/studio-agent-flow" },
      { text: "Adaptive Card to Teams", link: "/bricks/studio-adaptive-card" },
      { text: "Publish your agent", link: "/bricks/studio-publish" },
    ],
  },
  {
    id: "code",
    emoji: "🟣",
    icon: "🛰️",
    label: "Code",
    sub: "Code-Extended",
    tool: "VS Code + GitHub Copilot",
    buildsVerb: "Builds in",
    desc: "**VS Code with GitHub Copilot and the Copilot CLI**. Write the agents yourself and enforce guardrails in the tool rather than the prompt.",
    guidesLink: "/bricks/#code",
    guides: [
      { text: "Set up Scout / GitHub Copilot", link: "/bricks/advanced-setup" },
      { text: "Build a custom connector (MCP)", link: "/bricks/advanced-mcp-connector" },
      { text: "Ground on live data with Work IQ", link: "/bricks/advanced-work-iq" },
      { text: "Add a guardrail / output check", link: "/bricks/advanced-guardrail" },
    ],
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
    sub: "An audience council that reviews any work asset",
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


/** The single chooser lives on the home page. Everything points at it. */
export const CHOOSER = "/#start-here";
