---
title: Run the starter project
---

<!-- markdownlint-disable MD013 MD025 -->

# Run the starter project

**Tool:** VS Code + terminal

<!-- #region guide -->
Each Code scenario ships a **starter repo** - working plumbing with the interesting parts left as stubs. Get the stock version running first; build second. A running baseline is the thing you compare every later change against.

## Prerequisites

Install these once. On Windows, the fastest way is `winget` from an Administrator terminal:

```powershell
winget install OpenJS.NodeJS.LTS     # Node - runs the app
winget install Python.Python.3.12    # Python 3 - only if the scenario uses it
# reopen the terminal so Node is on PATH, then:
npm install -g @github/copilot       # GitHub Copilot CLI - the app calls it
```

Then run `copilot` once and sign in. Prefer installers? Grab [Node.js](https://nodejs.org/), [Python 3](https://www.python.org/downloads/), and the [GitHub Copilot CLI](https://www.npmjs.com/package/@github/copilot) directly.

## Steps

1. Download and unzip the scenario's starter **and any sibling packs** so they sit side by side in one folder - the code expects its data pack as a sibling.
2. Open the project's `.code-workspace` file in VS Code (it sets agent mode and the right extension recommendations).
3. In a terminal, install and start it - the build page names the exact folder and command:

   ```powershell
   cd <starter>/dashboard
   npm install
   npm start
   ```

4. Open the local URL it prints (often `http://localhost:4173`). The startup line confirms the Copilot CLI is found and signed in.

**You'll know it worked when...** the app loads in the browser and the startup line says the CLI is found.

::: warning If it won't start
- **CLI missing or not signed in** - install `@github/copilot`, run `copilot` to sign in, then restart.
- **`npm install` errors** - confirm `node --version` works; reopen the terminal after installing Node.
- **Can't find the data** - keep the starter and its packs side by side.
:::

## Apply it to your scenario

Get the stock starter running **unchanged** before you touch any code - that's your known-good baseline. Then finish the stubs one at a time.
<!-- #endregion guide -->
