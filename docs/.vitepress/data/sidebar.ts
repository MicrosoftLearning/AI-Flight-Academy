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
} from "./paths";
import { pageHeadings, type Heading } from "./headings";

function suffix(trackId: string, scenarioId: string): string {
  const label = statusLabel[statusFor(trackId, scenarioId)];
  return label ? ` (${label})` : "";
}

export function isBuildPage(relativePath: string): boolean {
  return /^build\/(base|builder|advanced)-scenario-\d+\.md$/.test(relativePath);
}

/**
 * Nest h3 subsections under the h2 step they belong to, so a step with parts
 * reads as one entry you can expand — not as several siblings competing with
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
 * The sidebar is scoped to the choice you've made. Once you're in a scenario
 * the other scenarios disappear entirely — you see your scenario's three paths
 * and nothing else, with one link back out. Same for guides once you've picked
 * a track. Before you've chosen, everything is listed.
 *
 * On a build page the page's own steps are nested under your level, so the left
 * rail answers both "which path am I on" and "where am I in it".
 */
export function globalSidebar(
  opts: { scenario?: string; track?: string; steps?: boolean } = {}
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
          { text: "The brief", link: `/scenarios/${scenario.id}` },
          ...trackItems(scenario.id),
          { text: "↔ Switch scenario", link: CHOOSER },
        ],
      }
    : {
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
        // On a build page the guides are inlined into the page itself, so
        // these link to anchors rather than navigating away and back.
        text: `Guides for ${track.emoji} ${track.label}`,
        collapsed: true,
        items: track.guides.map((g) => ({
          text: g.text,
          link: opts.steps && opts.scenario
            ? `${buildLink(track.id, opts.scenario)}#g-${g.link.split("/").pop()}`
            : g.link,
        })),
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
      text: "AI Flight Academy",
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
 * you land. Keys with more path segments win, so specific routes beat "/".
 */
export function sidebars(): Record<string, ReturnType<typeof globalSidebar>> {
  const out: Record<string, any> = {};
  for (const s of scenarios) {
    for (const t of tracks) {
      out[buildLink(t.id, s.id)] = globalSidebar({
        scenario: s.id,
        track: t.id,
        steps: true,
      });
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
