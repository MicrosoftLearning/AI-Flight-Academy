import { defineConfig } from "vitepress";
import { navBuildItems, sidebars, isBuildPage } from "./data/sidebar";

export default defineConfig({
  title: "AI Flight Academy",
  description:
    "A 2-hour hands-on agent-building hack for Global Skilling Team Week. Train, build, and take off with a working agent that's yours.",
  base: "/AI-Flight-Academy/",
  cleanUrls: true,
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
      { text: "How the Hack Works", link: "/how-it-works/" },
      {
        text: "Start Building",
        items: navBuildItems(),
      },
      { text: "Submit", link: "/submit/" },
      { text: "Guides", link: "/bricks/" },
      {
        text: "Resources",
        items: [
          { text: "Downloads", link: "/resources/downloads" },
          { text: "More", link: "/resources/" },
        ],
      },
    ],
    search: {
      provider: "local",
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
