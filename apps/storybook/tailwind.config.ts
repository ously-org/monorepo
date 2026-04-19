import type { Config } from "tailwindcss";
import sharedConfig from "@ously/config-tailwind/tailwind.config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ods/src/**/*.{ts,tsx}"
  ],
  presets: [sharedConfig],
};

export default config;
