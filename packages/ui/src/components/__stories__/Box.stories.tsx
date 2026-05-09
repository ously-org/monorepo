import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";

const meta: Meta<typeof Box> = {
  title: "ODS/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    display: {
      control: "select",
      options: [
        "block",
        "flex",
        "grid",
        "inline",
        "inline-flex",
        "inline-grid",
        "hidden",
      ],
    },
    direction: {
      control: "select",
      options: ["row", "col", "row-reverse", "col-reverse"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "baseline", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    padding: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: "This is a Box component",
  },
};

export const FlexRow: Story = {
  args: {
    display: "flex",
    direction: "row",
    gap: "lg",
    align: "center",
    children: (
      <>
        <div className="w-12 h-12 bg-primary rounded-md" />
        <div className="w-12 h-12 bg-secondary rounded-md" />
        <div className="w-12 h-12 bg-accent rounded-md" />
      </>
    ),
  },
};

export const FlexColumn: Story = {
  args: {
    display: "flex",
    direction: "col",
    gap: "sm",
    children: (
      <>
        <div className="h-8 bg-primary rounded-md" />
        <div className="h-8 bg-secondary rounded-md" />
        <div className="h-8 bg-accent rounded-md" />
      </>
    ),
  },
};

export const Grid: Story = {
  args: {
    display: "grid",
    gap: "lg",
    children: (
      <>
        <div className="h-20 bg-primary rounded-md" />
        <div className="h-20 bg-secondary rounded-md" />
        <div className="h-20 bg-accent rounded-md" />
        <div className="h-20 bg-muted rounded-md" />
        <div className="h-20 bg-destructive rounded-md" />
        <div className="h-20 bg-card border rounded-md" />
      </>
    ),
  },
};

export const SemanticSpacing: Story = {
  render: () => (
    <div className="space-y-4">
      <Box padding="xs">Padding XS</Box>
      <Box padding="sm">Padding SM</Box>
      <Box padding="md">Padding MD</Box>
      <Box padding="lg">Padding LG</Box>
      <Box padding="xl">Padding XL</Box>
    </div>
  ),
};
