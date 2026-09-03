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

/** "Start Building" nav dropdown: one group per scenario, one item per track. */
export function navBuildItems() {
  return [
    { text: "🧭 Pick your path", link: CHOOSER },
    {
      text: `${SCENARIO_0.emoji} ${SCENARIO_0.label} · ${SCENARIO_0.name}`,
      items: tracks.map((t) => ({
        text: `${t.emoji} ${t.label} - ${t.tool}${suffix(t.id, SCENARIO_0.id)}`,
        link: buildLink(t.id, SCENARIO_0.id),
      })),
    },
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
          {
            text: scenario.id === SCENARIO_0.id ? "Start here" : "The brief",
            link: `/scenarios/${scenario.id}`,
          },
          ...trackItems(scenario.id),
          ...(scenario.id === SCENARIO_0.id
            ? []
            : [{ text: "↔ Switch scenario", link: CHOOSER }]),
        ],
      }
    : {
        text: "Scenarios",
        items: [
          {
            text: `${SCENARIO_0.emoji} ${SCENARIO_0.name}`,
            collapsed: true,
            items: [
              { text: "Start here", link: `/scenarios/${SCENARIO_0.id}` },
              ...tracks.map((t) => ({
                text: `${t.emoji} ${t.label}${suffix(t.id, SCENARIO_0.id)}`,
                link: buildLink(t.id, SCENARIO_0.id),
              })),
            ],
          },
          ...scenarios.map((s) => ({
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
        ],
      };

  const guidesSection = track
    ? {
        // Guides live at /bricks/ and are reached from the top nav, so these
        // link out rather than to an on-page anchor.
        text: `Guides for ${track.emoji} ${track.label}`,
        collapsed: true,
        items: track.guides.map((g) => ({ text: g.text, link: g.link })),
      }
    : {
        text: "Guides",
        items: tracks.map((t) => ({
          text: `${t.emoji} ${t.label}`,
          collapsed: true,
          items: t.guides,
        })),
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
        { text: "How the hack works", link: "/how-it-works/" },
        { text: "Which altitude is right for me?", link: "/levels/" },
      ],
    },
    scenarioSection,
    guidesSection,
    {
      text: "Finish line",
      items: [
        { text: "Downloads", link: "/resources/downloads" },
        { text: "Submit your project", link: "/submit/" },
      ],
    },
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
    out[`/scenarios/${s.id}`] = globalSidebar({
      scenario: s.id,
      lean: s.id === SCENARIO_0.id,
    });
  }
  for (const t of tracks) {
    for (const g of t.guides) {
      out[g.link] = globalSidebar({ track: t.id });
    }
  }
  out["/"] = globalSidebar();
  return out;
}
