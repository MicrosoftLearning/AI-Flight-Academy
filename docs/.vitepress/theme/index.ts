import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import Layout from "./components/Layout.vue";
import PathChooser from "./components/PathChooser.vue";
import PathPicker from "./components/PathPicker.vue";
import BuildMatrix from "./components/BuildMatrix.vue";
import AltitudePicker from "./components/AltitudePicker.vue";
import AltitudeOnly from "./components/AltitudeOnly.vue";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("PathChooser", PathChooser);
    app.component("PathPicker", PathPicker);
    app.component("BuildMatrix", BuildMatrix);
    app.component("AltitudePicker", AltitudePicker);
    app.component("AltitudeOnly", AltitudeOnly);
  },
} satisfies Theme;
