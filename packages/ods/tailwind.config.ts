import type { Config } from "tailwindcss";
import sharedConfig from "@ously/config-tailwind";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [sharedConfig as any],
};
export default config;
