import type { Config } from "tailwindcss";
import sharedConfig from "@ously/config-tailwind";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ods/src/**/*.{ts,tsx}",
  ],
  presets: [sharedConfig as any],
};
export default config;
