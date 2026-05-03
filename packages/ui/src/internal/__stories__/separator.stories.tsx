import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../separator";

const meta = {
  title: "ODS/Primitive/Separator",
  component: Separator,
  tags: ["autodocs"],
  args: {
    orientation: "horizontal",
    decorative: true,
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-full">
      <div className="text-sm font-medium">Separator Example</div>
      <p className="text-xs text-muted-foreground">This is some content above the separator.</p>
      <Separator {...args} className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-xs">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="flex h-5 items-center space-x-4 text-xs">
      <div>Left</div>
      <Separator {...args} />
      <div>Right</div>
    </div>
  ),
};
