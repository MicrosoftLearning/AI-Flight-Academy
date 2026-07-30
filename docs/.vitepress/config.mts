import { defineConfig } from "vitepress";

export default defineConfig({
  title: "The Imagineer Hack",
  description:
    "A 2-hour hands-on agent-building hack for Global Skilling Team Week. Pick your altitude, snap together the building blocks, ship a working agent.",
  base: "/Team-Week-Imagineer-Hack/",
  cleanUrls: true,
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
        text: "Levels",
        items: [
          { text: "🟢 Base · Copilot-Crafted", link: "/levels/base/" },
          { text: "🔵 Builder · Agent-Orchestrated", link: "/levels/builder/" },
          { text: "🟣 Advanced · Code-Extended", link: "/levels/advanced/" },
        ],
      },
      { text: "Building Blocks", link: "/bricks/" },
      { text: "Scenarios", link: "/scenarios/" },
      { text: "Facilitators", link: "/facilitator/" },
      { text: "Submit", link: "/submit/" },
      {
        text: "Resources",
        items: [
          { text: "Overview", link: "/resources/" },
          { text: "⬇ Downloads", link: "/resources/downloads" },
          { text: "The Research", link: "/resources/research" },
        ],
      },
    ],
    search: {
      provider: "local",
    },
    sidebar: {
      "/levels/": [
        {
          text: "Pick Your Altitude",
          items: [
            { text: "Overview", link: "/levels/" },
            { text: "🟢 Base · Copilot-Crafted", link: "/levels/base/" },
            { text: "🔵 Builder · Agent-Orchestrated", link: "/levels/builder/" },
            { text: "🟣 Advanced · Code-Extended", link: "/levels/advanced/" },
          ],
        },
      ],
      "/bricks/": [
        {
          text: "Building Blocks",
          items: [{ text: "Overview", link: "/bricks/" }],
        },
        {
          text: "🟢 Base · Cowork",
          items: [
            { text: "Connect Cowork to a data source", link: "/bricks/cowork-connect-source" },
            { text: "Write a reusable Cowork skill", link: "/bricks/cowork-build-skill" },
            { text: "Produce a formatted output", link: "/bricks/cowork-formatted-output" },
            { text: "Re-run a skill on new inputs", link: "/bricks/cowork-rerun-skill" },
          ],
        },
        {
          text: "🔵 Builder · Copilot Studio",
          items: [
            { text: "Create an agent + solution", link: "/bricks/studio-create-agent" },
            { text: "Add a topic with a trigger", link: "/bricks/studio-topic-trigger" },
            { text: "Ground on a knowledge source", link: "/bricks/studio-knowledge-grounding" },
            { text: "Build two agents that hand off", link: "/bricks/studio-multi-agent" },
            { text: "Add an agent flow", link: "/bricks/studio-agent-flow" },
            { text: "Send an Adaptive Card to Teams", link: "/bricks/studio-adaptive-card" },
            { text: "Publish your agent", link: "/bricks/studio-publish" },
          ],
        },
        {
          text: "🟣 Advanced · Scout / GitHub Copilot",
          items: [
            { text: "Set up Scout / GitHub Copilot", link: "/bricks/advanced-setup" },
            { text: "Build a custom connector (MCP)", link: "/bricks/advanced-mcp-connector" },
            { text: "Ground on live data with Work IQ", link: "/bricks/advanced-work-iq" },
            { text: "Add a guardrail / output check", link: "/bricks/advanced-guardrail" },
          ],
        },
      ],
      "/scenarios/": [
        {
          text: "Scenarios",
          items: [
            { text: "Overview", link: "/scenarios/" },
            { text: "Scenario 1 · The Digital Twin", link: "/scenarios/scenario-1" },
            { text: "Scenario 2 (TBD)", link: "/scenarios/scenario-2" },
            { text: "Scenario 3 (TBD)", link: "/scenarios/scenario-3" },
          ],
        },
      ],
      "/how-it-works/": [
        {
          text: "How the Hack Works",
          items: [
            { text: "Overview", link: "/how-it-works/" },
            { text: "Run of Show", link: "/how-it-works/run-of-show" },
            { text: "Scoring & Judging", link: "/how-it-works/scoring" },
          ],
        },
      ],
      "/facilitator/": [
        {
          text: "Facilitator Kit",
          items: [
            { text: "Overview", link: "/facilitator/" },
            { text: "Role Cards", link: "/facilitator/role-cards" },
            { text: "Interview Script", link: "/facilitator/interview-script" },
            { text: "Coach Playbook", link: "/facilitator/coach-playbook" },
            { text: "Run of Show", link: "/how-it-works/run-of-show" },
          ],
        },
      ],
    },
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
