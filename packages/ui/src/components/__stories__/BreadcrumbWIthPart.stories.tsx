import type { Meta, StoryObj } from "@storybook/react";
import { HeaderBreadcrumb } from "../BreadcrumbWIthPart";

const meta: Meta<typeof HeaderBreadcrumb> = {
  title: "ODS/Components/Layout/BreadcrumbWIthPart",
  component: HeaderBreadcrumb,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-4 border-b">
        <Story />
      </div>
    ),
  ],
  args: {
    pathname: "/docs/components/breadcrumb",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Home: Story = {
  args: {
    pathname: "/",
  },
};

export const DeepPath: Story = {
  args: {
    pathname: "/settings/billing/invoices/2024",
  },
};

export const NullPath: Story = {
  args: {
    pathname: null,
  },
};
