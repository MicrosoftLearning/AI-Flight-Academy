import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import Layout from "./components/Layout.vue";
import PathChooser from "./components/PathChooser.vue";
import PathPicker from "./components/PathPicker.vue";
import BuildMatrix from "./components/BuildMatrix.vue";
import ReadyCheck from "./components/ReadyCheck.vue";
import DirectionBubbles from "./components/DirectionBubbles.vue";
import DownloadPicker from "./components/DownloadPicker.vue";
import DownloadPane from "./components/DownloadPane.vue";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("PathChooser", PathChooser);
    app.component("PathPicker", PathPicker);
    app.component("BuildMatrix", BuildMatrix);
    app.component("ReadyCheck", ReadyCheck);
    app.component("DirectionBubbles", DirectionBubbles);
    app.component("DownloadPicker", DownloadPicker);
    app.component("DownloadPane", DownloadPane);
  },
} satisfies Theme;
