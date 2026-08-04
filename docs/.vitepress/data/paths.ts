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
    id: "base",
    emoji: "🟢",
    icon: "✨",
    label: "Base",
    sub: "Copilot-Crafted",
    tool: "Microsoft 365 Copilot + Cowork",
    desc: "Build with Microsoft 365 Copilot and Cowork. Turn a repetitive task into a reusable skill that runs itself. No code, all impact.",
    guidesLink: "/bricks/#cowork",
    guides: [
      { text: "Connect to a data source", link: "/bricks/cowork-connect-source" },
      { text: "Write a reusable skill", link: "/bricks/cowork-build-skill" },
      { text: "Produce a formatted output", link: "/bricks/cowork-formatted-output" },
      { text: "Re-run a skill on new inputs", link: "/bricks/cowork-rerun-skill" },
    ],
  },
  {
    id: "builder",
    emoji: "🔵",
    icon: "🧩",
    label: "Builder",
    sub: "Agent-Orchestrated",
    tool: "Copilot Studio / Scout",
    desc: "Wire up a little team of agents that hand off to each other, ground on real files, and fire an alert to Teams.",
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
    id: "advanced",
    emoji: "🟣",
    icon: "🛰️",
    label: "Advanced",
    sub: "Code-Extended",
    tool: "VS Code + GitHub Copilot",
    desc: "Build with Scout and GitHub Copilot. Add a custom connector, ground on live data with Work IQ, and put a guardrail on the output.",
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

/** The single chooser lives on the home page. Everything points at it. */
export const CHOOSER = "/#start-here";

/** "Start Building" nav dropdown: one group per scenario, one item per track. */
export function navBuildItems() {
  return [
    { text: "🧭 Pick your path", link: CHOOSER },
    ...scenarios.map((s) => ({
      text: `${s.emoji} ${s.label} · ${s.name}`,
      items: tracks.map((t) => ({
        text: `${t.emoji} ${t.label} — ${t.tool}${suffix(t.id, s.id)}`,
        link: buildLink(t.id, s.id),
      })),
    })),
  ];
}

/**
 * One sidebar for the whole site, organised by scenario. Each scenario expands
 * to its three paths, so the structure teaches the model of the hack: pick a
 * scenario, then pick how you build it. VitePress auto-expands the group
 * containing the current page and highlights it, so arriving from the top nav
 * lands you in the right place with the right branch already open.
 */
/**
 * The sidebar is scoped to the choice you've made. Once you're in a scenario,
 * the other scenarios disappear — you see your scenario's three paths and
 * nothing else, with one link back out. Same for guides once you've picked a
 * track. Before you've chosen, everything is listed.
 */
export function globalSidebar(opts: { scenario?: string; track?: string } = {}) {
  const scenario = opts.scenario ? getScenario(opts.scenario) : undefined;
  const track = opts.track ? getTrack(opts.track) : undefined;

  const scenarioSection = scenario
    ? {
        // Scoped: only the scenario you're in.
        text: `${scenario.emoji} ${scenario.name}`,
        items: [
          { text: "The brief", link: `/scenarios/${scenario.id}` },
          ...tracks.map((t) => ({
            text: `${t.emoji} ${t.label}${suffix(t.id, scenario.id)}`,
            link: buildLink(t.id, scenario.id),
          })),
          { text: "↔ Switch scenario", link: CHOOSER },
        ],
      }
    : {
        // Unscoped: browsing, so show them all.
        text: "Scenarios",
        items: scenarios.map((s) => ({
          text: `${s.emoji} ${s.name}`,
          collapsed: true,
          items: [
            { text: "The brief", link: `/scenarios/${s.id}` },
            ...tracks.map((t) => ({
              text: `${t.emoji} ${t.label}${suffix(t.id, s.id)}`,
              link: buildLink(t.id, s.id),
            })),
          ],
        })),
      };

  const guidesSection = track
    ? {
        text: `Guides for ${track.emoji} ${track.label}`,
        collapsed: true,
        items: track.guides,
      }
    : {
        text: "Guides",
        items: tracks.map((t) => ({
          text: `${t.emoji} ${t.label}`,
          collapsed: true,
          items: t.guides,
        })),
      };

  return [
    {
      text: "The Imagineer Hack",
      items: [
        { text: "Home", link: "/" },
        { text: "How the hack works", link: "/how-it-works/" },
        { text: "Run of show", link: "/how-it-works/run-of-show" },
        { text: "Which path is right for me?", link: "/levels/" },
      ],
    },
    scenarioSection,
    guidesSection,
    {
      text: "Finish line",
      items: [
        { text: "Downloads", link: "/resources/downloads" },
        { text: "Submit your project", link: "/submit/" },
        { text: "For facilitators", link: "/facilitator/" },
      ],
    },
  ];
}

/**
 * A sidebar per route, so what you see is already scoped to your choice when
 * you land — computed at build time rather than left to client-side state.
 * Keys with more path segments win, so specific routes beat the "/" default.
 */
export function sidebars(): Record<string, ReturnType<typeof globalSidebar>> {
  const out: Record<string, any> = {};
  for (const s of scenarios) {
    for (const t of tracks) {
      out[buildLink(t.id, s.id)] = globalSidebar({ scenario: s.id, track: t.id });
    }
    out[`/scenarios/${s.id}`] = globalSidebar({ scenario: s.id });
  }
  for (const t of tracks) {
    for (const g of t.guides) {
      out[g.link] = globalSidebar({ track: t.id });
    }
  }
  out["/"] = globalSidebar();
  return out;
}

/**
 * Build pages sit in the sidebar like everything else; nothing special needed.
 */
export function isBuildPage(relativePath: string): boolean {
  return /^build\/(base|builder|advanced)-scenario-\d+\.md$/.test(relativePath);
}
