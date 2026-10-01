// Navigation builders. Node-only: this reads markdown off disk to pull each
// build page's steps into the sidebar, so it must never be imported by a Vue
// component or it will drag node:fs into the browser bundle.

import {
  tracks,
  scenarios,
  buildId,
  buildLink,
  statusFor,
  statusLabel,
  getTrack,
  getScenario,
  CHOOSER,
  SCENARIO_0,
} from "./paths";
import { pageHeadings, type Heading } from "./headings";

function suffix(trackId: string, scenarioId: string): string {
  const label = statusLabel[statusFor(trackId, scenarioId)];
  return label ? ` (${label})` : "";
}

export function isBuildPage(relativePath: string): boolean {
  return /^build\/(cowork|scout|code)-scenario-\d+\.md$/.test(relativePath);
}

/**
 * Nest h3 subsections under the h2 step they belong to, so a step with parts
 * reads as one entry you can expand - not as several siblings competing with
 * the numbered steps. An h3 appearing before any h2 stays top level.
 */
function nestSteps(steps: Heading[], link: string) {
  const toItem = (h: Heading) => ({ text: h.text, link: `${link}#${h.anchor}` });
  const out: any[] = [];

  for (const h of steps) {
    if (h.level === 3 && out.length) {
      const parent = out[out.length - 1];
      (parent.items ??= []).push(toItem(h));
      parent.collapsed = true;
      continue;
    }
    out.push(toItem(h));
  }

  return out;
}

/**
 * "Start Building" nav dropdown: one group per scenario, one item per track.
 *
 * Scenario 0 is deliberately absent. It's the pre-event readiness gate, and
 * during the event a stray click on it drops someone into setup instead of the
 * hack. Its pages still build and stay reachable by URL - see the SCENARIO_0
 * comment in paths.ts for how to put the links back afterwards.
 */
export function navBuildItems() {
  return [
    { text: "🧭 Pick your path", link: CHOOSER },
    ...scenarios.map((s) => ({
      text: `${s.emoji} ${s.label} · ${s.name}`,
      items: tracks.map((t) => ({
        text: `${t.emoji} ${t.label} - ${t.tool}${suffix(t.id, s.id)}`,
        link: buildLink(t.id, s.id),
      })),
    })),
  ];
}

/**
 * The sidebar is scoped to the choice you've made. Once you're in a scenario
 * the other scenarios disappear entirely - you see your scenario's three paths
 * and nothing else, with one link back out. Same for guides once you've picked
 * a track. Before you've chosen, everything is listed.
 *
 * On a build page the page's own steps are nested under your level, so the left
 * rail answers both "which path am I on" and "where am I in it".
 */
export function globalSidebar(
  opts: { scenario?: string; track?: string; steps?: boolean; lean?: boolean } = {}
) {
  const scenario = opts.scenario ? getScenario(opts.scenario) : undefined;
  const track = opts.track ? getTrack(opts.track) : undefined;

  const trackItems = (scenarioId: string) =>
    tracks.map((t) => {
      const link = buildLink(t.id, scenarioId);
      const item: any = {
        text: `${t.emoji} ${t.label}${suffix(t.id, scenarioId)}`,
        link,
      };
      if (opts.steps && track && t.id === track.id) {
        const steps = pageHeadings(`build/${buildId(t.id, scenarioId)}.md`);
        if (steps.length) {
          item.items = nestSteps(steps, link);
          item.collapsed = false;
        }
      }
      return item;
    });

  const scenarioSection = scenario
    ? {
        text: `${scenario.emoji} ${scenario.name}`,
        items: [
          ...(scenario.id === SCENARIO_0.id
            ? [{ text: "Start here", link: `/scenarios/${scenario.id}` }]
            : []),
          ...trackItems(scenario.id),
          ...(scenario.id === SCENARIO_0.id
            ? []
            : [{ text: "↔ Switch scenario", link: CHOOSER }]),
        ],
      }
    : {
        text: "Scenarios",
        items: [
          ...scenarios.map((s) => ({
            text: `${s.emoji} ${s.name}`,
            collapsed: true,
            items: [
              ...tracks.map((t) => ({
                text: `${t.emoji} ${t.label}${suffix(t.id, s.id)}`,
                link: buildLink(t.id, s.id),
              })),
            ],
          })),
        ],
      };

  // One page now, so there's nothing to scope per track - just a link to it.
  const guidesSection = {
    text: "Reference",
    items: [{ text: "The basics", link: "/bricks/" }],
  };

  // A lean rail is just "where am I in this path" - nothing else. Scenario 0 is
  // the pre-event readiness gate, so the site-wide links, guides, and finish
  // line would only be noise on its pages.
  if (opts.lean) {
    return [scenarioSection];
  }

  return [
    {
      text: "AI Flight Academy",
      items: [
        { text: "Home", link: "/" },
        { text: "Which altitude is right for me?", link: "/levels/" },
      ],
    },
    scenarioSection,
    guidesSection,
  ];
}

/**
 * A sidebar per route, so what you see is already scoped to your choice when
 * you land. Keys with more path segments win, so specific routes beat "/".
 */
export function sidebars(): Record<string, ReturnType<typeof globalSidebar>> {
  const out: Record<string, any> = {};
  for (const s of [SCENARIO_0, ...scenarios]) {
    for (const t of tracks) {
      out[buildLink(t.id, s.id)] = globalSidebar({
        scenario: s.id,
        track: t.id,
        steps: true,
        lean: s.id === SCENARIO_0.id,
      });
    }
    if (s.id === SCENARIO_0.id) {
      out[`/scenarios/${s.id}`] = globalSidebar({
        scenario: s.id,
        lean: true,
      });
    }
  }
  out["/bricks/"] = globalSidebar();
  out["/"] = globalSidebar();
  return out;
}
