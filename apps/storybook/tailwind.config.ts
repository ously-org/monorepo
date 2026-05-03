import type { Config } from "tailwindcss";
import sharedConfig from "@ously/ui/tailwind-preset";

const config: Config = {
  content: [
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
    "../web-main/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../web-prosper/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [sharedConfig as any],
  darkMode: ["class", '[data-mode="dark"]'],
};
export default config;
