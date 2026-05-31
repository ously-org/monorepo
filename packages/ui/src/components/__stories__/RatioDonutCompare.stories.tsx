import type { Meta, StoryObj } from "@storybook/react";
import { RatioDonutCompare } from "../RatioDonutCompare";

const meta: Meta<typeof RatioDonutCompare> = {
  title: "ODS/RatioDonutCompare",
  component: RatioDonutCompare,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    smallPercentageThreshold: {
      control: { type: "range", min: 0, max: 20, step: 1 },
    },
    barSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showTotal: {
      control: "boolean",
    },
    showDetail: {
      control: "boolean",
    },
    textSize: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    prefix: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RatioDonutCompare>;

const sampleItems = [
  { name: "Housing", description: "Monthly rent & utilities", iconId: "phosphor.house" as const, value: 40 },
  { name: "Food", description: "Groceries & dining", value: 25 },
  { name: "Transport", description: "Gas & transit", iconId: "phosphor.car" as const, value: 15 },
  { name: "Savings", description: "Emergency fund", iconId: "phosphor.coin" as const, value: 12 },
  { name: "Entertainment", description: "Streaming & hobbies", value: 5 },
  { name: "Other", value: 3 },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    size: "md",
  },
};

export const Small: Story = {
  args: {
    items: sampleItems,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    items: sampleItems,
    size: "lg",
  },
};

export const NoSmallThreshold: Story = {
  args: {
    items: sampleItems,
    smallPercentageThreshold: 0,
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { name: "Paid", description: "Invoices paid on time", iconId: "phosphor.check_circle" as const, value: 84 },
      { name: "Overdue", description: "Past due invoices", iconId: "phosphor.warning_circle" as const, value: 16 },
    ],
    size: "lg",
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      { name: "Complete", value: 100 },
    ],
  },
};

export const ManySmallSegments: Story = {
  args: {
    items: [
      { name: "Category A", value: 30 },
      { name: "Category B", value: 25 },
      { name: "Category C", value: 20 },
      { name: "Category D", value: 8 },
      { name: "Category E", value: 7 },
      { name: "Category F", value: 4 },
      { name: "Category G", value: 3 },
      { name: "Category H", value: 2 },
      { name: "Category I", value: 1 },
    ],
  },
};

export const CustomThreshold: Story = {
  args: {
    items: sampleItems,
    smallPercentageThreshold: 10,
  },
};

export const WithPrefix: Story = {
  args: {
    items: sampleItems.map((i) => ({ ...i, value: i.value * 100 })),
    prefix: "$",
  },
};

export const NoCenterTotal: Story = {
  args: {
    items: sampleItems,
    showTotal: false,
  },
};

export const ThickBar: Story = {
  args: {
    items: sampleItems,
    barSize: "lg",
  },
};

export const ThinBar: Story = {
  args: {
    items: sampleItems,
    barSize: "sm",
  },
};

export const WithDetail: Story = {
  args: {
    items: sampleItems,
    showDetail: true,
  },
};

export const DetailWithPrefix: Story = {
  args: {
    items: sampleItems.map((i) => ({ ...i, value: i.value * 100 })),
    showDetail: true,
    prefix: "$",
    textSize: "sm",
  },
};
