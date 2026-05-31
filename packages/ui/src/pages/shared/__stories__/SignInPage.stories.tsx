import type { Meta, StoryObj } from "@storybook/react";
import { SignInPage } from "../SignInPage";

const ouslyLogoSvg = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="8" fill="#6366f1"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif" font-weight="bold">O</text>
</svg>`)}`;

const prosperLogoSvg = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="8" fill="#059669"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="white" font-size="16" font-family="sans-serif" font-weight="bold">P</text>
</svg>`)}`;

const meta: Meta<typeof SignInPage> = {
  title: "Pages/SignInPage",
  component: SignInPage,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    signInUrl: { control: "text" },
    logoImage: { control: "text" },
    logoAlt: { control: "text" },
    appName: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SignInPage>;

export const Default: Story = {
  args: {
    signInUrl: "/auth/google",
    logoImage: ouslyLogoSvg,
    logoAlt: "Ously Logo",
    appName: "Ously",
  },
};

export const WithProsperLogo: Story = {
  args: {
    signInUrl: "/auth/google",
    logoImage: prosperLogoSvg,
    logoAlt: "Prosper Logo",
    appName: "Prosper",
  },
};
