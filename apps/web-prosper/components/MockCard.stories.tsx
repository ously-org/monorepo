import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MockCard } from "./MockCard";

const meta = {
  title: "Prosper/MockCard",
  component: MockCard,
  tags: ["autodocs"],
  args: {
    title: "Prosper Feature",
    description: "This is a mock component specific to the Prosper application.",
  },
} satisfies Meta<typeof MockCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
