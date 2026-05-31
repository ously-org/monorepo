import type { Meta, StoryObj } from "@storybook/react";
import { NotFoundPage } from "../NotFoundPage";

const meta: Meta<typeof NotFoundPage> = {
  title: "Pages/NotFoundPage",
  component: NotFoundPage,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    title: { control: "text" },
    heading: { control: "text" },
    message: { control: "text" },
    actionLabel: { control: "text" },
    actionHref: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof NotFoundPage>;

export const Default: Story = {};

export const CustomContent: Story = {
  args: {
    title: "403",
    heading: "Access Denied",
    message: "You don't have permission to access this resource.",
    actionLabel: "Back to Dashboard",
    actionHref: "/dashboard",
  },
};

export const Minimal: Story = {
  args: {
    title: "500",
    heading: "Something went wrong",
    message: undefined,
    actionLabel: "Reload",
  },
};
