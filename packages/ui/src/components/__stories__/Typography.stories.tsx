import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../Typography";

const meta = {
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "blockquote",
        "ul",
        "ol",
        "inlineCode",
        "lead",
        "large",
        "small",
        "muted",
      ],
    },
    as: {
      control: "text",
    },
    text: {
      control: "text",
    },
  },
  args: {
    text: "The quick brown fox jumps over the lazy dog",
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    variant: "h1",
    text: "Taxing Laughter: The Joke Tax Chronicles",
  },
};

export const H2: Story = {
  args: {
    variant: "h2",
    text: "The King's Plan",
  },
};

export const H3: Story = {
  args: {
    variant: "h3",
    text: "The Joke Tax",
  },
};

export const H4: Story = {
  args: {
    variant: "h4",
    text: "People are unhappy",
  },
};

export const Paragraph: Story = {
  args: {
    variant: "p",
    text:
      "The king, seeing how much people enjoyed laughing, decided to levy a tax on jokes. But he soon realized that the more jokes people told, the less they worked. So he decided to tax the silence too.",
  },
};

export const Blockquote: Story = {
  args: {
    variant: "blockquote",
    text:
      "\"After all,\" he said, \"everyone can be quiet for a little while, but no one can be quiet forever.\"",
  },
};

export const List: Story = {
  args: {
    variant: "ul",
    as: "ul",
    children: (
      <>
        <li>1st level of jokes: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of jokes: 20 gold coins</li>
      </>
    ),
  },
};

export const InlineCode: Story = {
  args: {
    variant: "inlineCode",
    text: "npm install @ously/ui",
  },
};

export const Lead: Story = {
  args: {
    variant: "lead",
    text:
      "A fast and simple way to build beautiful user interfaces.",
  },
};

export const Large: Story = {
  args: {
    variant: "large",
    text: "Are you sure you want to exit?",
  },
};

export const Small: Story = {
  args: {
    variant: "small",
    text: "Email address",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    text: "Enter your email address to receive updates.",
  },
};
