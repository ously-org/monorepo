import type { Meta, StoryObj } from "@storybook/react";
import { OuslySidebar } from "../OuslySidebar";
import { SidebarProvider, SidebarInset } from "../../../internal/sidebar";
import { TooltipProvider } from "../../../internal/tooltip";
import { Header } from "../Header";

const meta: Meta<typeof OuslySidebar> = {
  title: "ODS/Layout/OuslySidebar",
  component: OuslySidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <SidebarProvider>
          <Story />
          <SidebarInset>
            <Header pathname="/dashboard/settings" />
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Content Area</h1>
              <p className="text-muted-foreground">
                This is where the main content of the application would reside.
                The sidebar and header provide the navigation context.
              </p>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OuslySidebar>;

export const Default: Story = {
  args: {
    title: "OUSLY",
    logoUrl: "https://github.com/shadcn.png",
    navGroups: [
      {
        label: "Platform",
        items: [
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: "phosphor.layout",
            isActive: true,
          },
          {
            title: "Search",
            href: "/search",
            icon: "phosphor.magnifying_glass",
          },
        ],
      },
      {
        label: "Management",
        items: [
          {
            title: "Users",
            href: "/users",
            icon: "phosphor.users",
            tooltip: "Manage your users",
          },
          {
            title: "Notifications",
            href: "/notifications",
            icon: "phosphor.bell",
          },
        ],
      },
      {
        label: "Settings",
        items: [
          {
            title: "General",
            href: "/settings",
            icon: "phosphor.gear",
          },
        ],
      },
    ],
    footer: [
      {
        title: "John Doe",
        href: "/profile",
        icon: "phosphor.user",
        tooltip: "User Profile",
      },
      {
        title: "Help",
        href: "/help",
        icon: "phosphor.question",
        tooltip: "Help & Support",
      },
    ],
  },
};

export const Minimal: Story = {
  args: {
    title: "OUSLY",
    navGroups: [
      {
        items: [
          {
            title: "Home",
            href: "/",
            icon: "phosphor.house",
          },
        ],
      },
    ],
  },
};

export const InsetWithLogo: Story = {
  args: {
    ...Default.args,
    variant: "inset",
  },
};
