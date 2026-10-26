import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "Software-System.Design UI",
    brandUrl: "https://software-system.design",
    brandImage: "./software-system-design-logo.png",
    brandTarget: "_blank",
    colorPrimary: "#0055ff",
    colorSecondary: "#94baff",
    appBg: "#090e19",
    appContentBg: "#111927",
    appBorderColor: "#2a374b",
    textColor: "#eef3fc",
    barBg: "#111927",
    barTextColor: "#a4b2c9",
    barSelectedColor: "#94baff",
    inputBg: "#172234",
    inputTextColor: "#eef3fc",
  }),
});
