# AI Flight Academy

A two-hour hands-on agent-building session for Global Skilling Team Week.

Three scenarios, each buildable at three altitudes, so everyone works on the same problem at the level that suits them.

| | Scenario | What you build |
| --- | --- | --- |
| 🧬 | **The Digital Twin** | A portable spec of how you work, saved as a skill |
| 🎛️ | **Dispatch** | A room of teams that routes a skilling request |
| 🎖️ | **The Ambassador** | A cohort picker that shows the evidence behind its choices |

| | Altitude | Built with |
| --- | --- | --- |
| 🟢 | **Cowork** | Microsoft Copilot + Cowork |
| 🔵 | **Scout** | Microsoft Scout |
| 🟣 | **Code** | VS Code + GitHub Copilot, or the Copilot CLI |

## The site

<https://microsoftlearning.github.io/AI-Flight-Academy/>

Built with [VitePress](https://vitepress.dev/) and deployed to GitHub Pages by `.github/workflows/deploy-vitepress.yml` on every push to `main`.

```bash
npm install
npm run docs:dev      # local, hot-reloads
npm run docs:build    # production build into docs/.vitepress/dist
npm run docs:preview  # serve the production build
```

## Layout

```text
docs/
  index.md              home page, with the altitude x scenario picker
  glossary.md           product terms, linked to the official docs
  build/                one page per altitude x scenario - the session content
  levels/               which altitude is right for me
  scenarios/            Scenario 0, the pre-event readiness brief
  public/               images, and generated downloads (gitignored)
  .vitepress/
    config.mts          nav, theme, site config
    data/paths.ts       single source of truth for tracks x scenarios
    data/sidebar.ts     nav and sidebar builders
    theme/              custom components and CSS

Allfiles/               participant assets, one folder per scenario
scripts/
  pack-downloads.mjs    zips Allfiles into docs/public/downloads before a build
```
