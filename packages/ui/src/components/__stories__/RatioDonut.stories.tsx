import type { Meta, StoryObj } from "@storybook/react";
import { RatioDonut, COLOR_VARIANTS } from "../RatioDonut";

const meta: Meta<typeof RatioDonut> = {
  title: "ODS/RatioDonut",
  component: RatioDonut,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current value",
    },
    max: {
      control: { type: "number", min: 1 },
      description: "Maximum value",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    color: {
      control: "select",
      options: COLOR_VARIANTS,
      description: "Arc color variant",
    },
    showLabel: {
      control: "boolean",
      description: "Show percentage label in center",
    },
    thickness: {
      control: { type: "number", min: 2, max: 20 },
      description: "Custom stroke width (overrides size default)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RatioDonut>;

export const Default: Story = {
  args: {
    value: 75,
    max: 100,
    size: "md",
    color: "primary",
    showLabel: true,
  },
};

export const Small: Story = {
  args: {
    value: 60,
    size: "sm",
    color: "chart-2",
  },
};

export const Large: Story = {
  args: {
    value: 33,
    size: "lg",
    color: "chart-4",
  },
};

export const NoLabel: Story = {
  args: {
    value: 90,
    showLabel: false,
  },
};

export const CustomCenter: Story = {
  args: {
    value: 42,
    color: "chart-5",
    children: (
      <span className="text-xs font-medium text-muted-foreground">
        42 / 100
      </span>
    ),
  },
};

export const Destructive: Story = {
  args: {
    value: 15,
    color: "destructive",
  },
};

export const ColorSwatch: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {COLOR_VARIANTS.map((c) => (
        <div key={c} className="flex flex-col items-center gap-2">
          <RatioDonut value={70} size="sm" color={c} />
          <span className="text-xs text-muted-foreground">{c}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <RatioDonut value={50} size="sm" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <RatioDonut value={70} size="md" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <RatioDonut value={90} size="lg" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
    </div>
  ),
};
