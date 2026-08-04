import { defineConfig } from "vitepress";
import { navBuildItems, sidebars, isBuildPage } from "./data/sidebar";

export default defineConfig({
  title: "The Imagineer Hack",
  description:
    "A 2-hour hands-on agent-building hack for Global Skilling Team Week. Pick your altitude, snap together the building blocks, ship a working agent.",
  base: "/Team-Week-Imagineer-Hack/",
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
      { rel: "icon", href: "/Team-Week-Imagineer-Hack/favicon.png" },
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
          { text: "For facilitators", link: "/facilitator/" },
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
        link: "https://github.com/MicrosoftLearning/Team-Week-Imagineer-Hack/",
      },
    ],
    footer: {
      copyright: "© 2026 Microsoft. All rights reserved.",
    },
  },
});
