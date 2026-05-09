import type { Meta, StoryObj } from "@storybook/react";
import { AccountSidebarButton } from "../AccountSidebarButton";
import {
  SidebarProvider,
  SidebarFooter,
  Sidebar,
} from "../../internal/sidebar";
import { TooltipProvider } from "../../internal/tooltip";

const meta: Meta<typeof AccountSidebarButton> = {
  title: "ODS/Layout/AccountSidebarButton",
  component: AccountSidebarButton,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-svh">
            <Sidebar collapsible="icon">
              <div className="flex flex-1 flex-col" />
              <SidebarFooter>
                <Story />
              </SidebarFooter>
            </Sidebar>
            <main className="flex-1 p-6">
              <h1 className="text-2xl font-bold mb-4">Content Area</h1>
              <p className="text-muted-foreground">
                Click the account button in the sidebar footer to open the
                dropdown menu.
              </p>
            </main>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AccountSidebarButton>;

export const WithImage: Story = {
  name: "With image and email",
  args: {
    user: {
      name: "Jane Doe",
      email: "jane@example.com",
      image: "https://github.com/shadcn.png",
    },
    onSettings: () => console.log("Settings clicked"),
    onLogout: () => console.log("Logout clicked"),
  },
};

export const Fallback: Story = {
  name: "Fallback initials, no email",
  args: {
    user: {
      name: "John Smith",
    },
    onSettings: () => console.log("Settings clicked"),
    onLogout: () => console.log("Logout clicked"),
  },
};

export const Minimal: Story = {
  name: "Minimal (no callbacks)",
  args: {
    user: {
      name: "Alex Kim",
      email: "alex@ously.dev",
    },
  },
};

export const Collapsed: Story = {
  name: "In collapsed sidebar",
  args: {
    user: {
      name: "Jane Doe",
      email: "jane@example.com",
      image: "https://github.com/shadcn.png",
    },
    onSettings: () => console.log("Settings clicked"),
    onLogout: () => console.log("Logout clicked"),
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-svh">
            <Sidebar collapsible="icon">
              <div className="flex flex-1 flex-col" />
              <SidebarFooter>
                <Story />
              </SidebarFooter>
            </Sidebar>
            <main className="flex-1 p-6" />
          </div>
        </SidebarProvider>
      </TooltipProvider>
    ),
  ],
};
