import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "../Link";

const meta: Meta<typeof Link> = {
  title: "ODS/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "muted", "underline", "ghost"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "#",
    title: "Link Text",
  },
};

export const WithIcon: Story = {
  args: {
    href: "#",
    title: "Home",
    icon: "phosphor.house",
  },
};

export const CustomChildren: Story = {
  args: {
    href: "#",
    children: (
      <div className="flex flex-col border p-2 rounded hover:bg-muted">
        <span className="font-bold">Complex Link</span>
        <span className="text-xs text-muted-foreground">
          Click to learn more
        </span>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link
        href="#"
        variant="default"
        title="Default Variant"
        icon="phosphor.house"
      />
      <Link
        href="#"
        variant="primary"
        title="Primary Variant"
        icon="phosphor.user"
      />
      <Link
        href="#"
        variant="muted"
        title="Muted Variant"
        icon="phosphor.gear"
      />
      <Link href="#" variant="underline" title="Underline Variant" />
      <Link
        href="#"
        variant="ghost"
        title="Ghost Variant"
        icon="phosphor.gear"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#" size="lg" title="Large Link" icon="phosphor.house" />
      <Link
        href="#"
        size="default"
        title="Default Link"
        icon="phosphor.house"
      />
      <Link href="#" size="sm" title="Small Link" icon="phosphor.house" />
    </div>
  ),
};
