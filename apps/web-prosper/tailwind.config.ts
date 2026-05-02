import type { Config } from "tailwindcss";
import sharedConfig from "@ously/ui/tailwind-preset";
import path from "path";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    path.join(path.dirname(require.resolve("@ously/ui/package.json")), "src/**/*.{ts,tsx}"),
  ],
  presets: [sharedConfig as any],
};
export default config;
