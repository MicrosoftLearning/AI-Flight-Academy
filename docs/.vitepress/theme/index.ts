import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import PathChooser from "./components/PathChooser.vue";
import PathPicker from "./components/PathPicker.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("PathChooser", PathChooser);
    app.component("PathPicker", PathPicker);
  },
} satisfies Theme;
