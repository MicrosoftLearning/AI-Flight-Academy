import { defineConfig } from "vitepress";
import { navBuildItems, sidebars, isBuildPage } from "./data/sidebar";

export default defineConfig({
  title: "AI Flight Academy",
  description:
    "A 2-hour hands-on agent-building session for Global Skilling Team Week. Train, build, and take off with a working agent that's yours.",
  base: "/AI-Flight-Academy/",
  cleanUrls: true,
  // Dark by default - the scenario art and the altitude colours were built
  // against it. The toggle still works for anyone who prefers light.
  appearance: "dark",
  // Build pages carry their steps in the sidebar, under the level you're on,
  // so the right-hand outline would just be a second copy of the same list.
  transformPageData(pageData) {
    if (isBuildPage(pageData.relativePath)) {
      pageData.frontmatter.aside = false;
    }
  },
  head: [
    [
      "link",
      { rel: "icon", type: "image/svg+xml", href: "/AI-Flight-Academy/favicon.svg" },
    ],
  ],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Start Building",
        items: navBuildItems(),
      },
      {
        text: "Glossary",
        link: "/glossary",
      },
    ],
    search: {
      provider: "local",
    },
    // The prev/next footer walks sidebar order, which isn't a reading order
    // here - it sent people from a Scout guide to a Code build page, and from
    // Downloads to "Next page: Home". Every page ends with its own way back.
    docFooter: {
      prev: false,
      next: false,
    },
    outline: { level: [2, 3] },
    sidebar: sidebars(),
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/MicrosoftLearning/AI-Flight-Academy/",
      },
    ],
    footer: {
      copyright: "© 2026 Microsoft. All rights reserved.",
    },
  },
});
