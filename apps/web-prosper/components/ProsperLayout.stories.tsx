import type { Meta, StoryObj } from "@storybook/react";
import { ProsperLayout } from "./ProsperLayout";
import { Header, Box, Typography } from "@ously/ui";
import { MockCard } from "./MockCard";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  PieChart,
  Sparkles,
} from "lucide-react";
import { TooltipProvider } from "@ously/ui";

const meta = {
  title: "Prosper/ProsperLayout",
  component: ProsperLayout,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={0}>
        <Story />
      </TooltipProvider>
    ),
  ],
  args: {
    children: (
      <>
        <Header pathname="/dashboard" />
        <Box padding="lg" display="flex" direction="col" gap="md">
          <Typography variant="h1">Dashboard Overview</Typography>
          <Typography variant="p">
            Welcome to your Prosper dashboard. Here you can see your latest
            analytics and manage your campaigns.
          </Typography>
          <Box display="grid" gap="md" columns="responsive-cards">
            {Array.from({ length: 6 }).map((_, i) => (
              <MockCard
                key={i}
                title={`Stat Card ${i + 1}`}
                description="Some descriptive text about this metric."
              />
            ))}
          </Box>
        </Box>
      </>
    ),
    navGroups: [
      {
        label: "Platform",
        items: [
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
          },
          { title: "Campaigns", href: "/campaigns", icon: Sparkles },
          { title: "Analytics", href: "/analytics", icon: PieChart },
        ],
      },
      {
        label: "Management",
        items: [
          { title: "Team", href: "/team", icon: Users },
          { title: "Settings", href: "/settings", icon: Settings },
        ],
      },
    ],
    footerNav: [{ title: "Logout", href: "/logout", icon: LogOut }],
  },
} satisfies Meta<typeof ProsperLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomNavigation: Story = {
  args: {
    navGroups: [
      {
        label: "Account",
        items: [
          { title: "Profile", href: "/profile", icon: Users },
          { title: "Preferences", href: "/prefs", icon: Settings },
        ],
      },
    ],
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <>
        <Header pathname="/reports/analytics/detailed" />
        <Box padding="lg" display="flex" direction="col" gap="md">
          <Typography variant="h1">Long Page Content</Typography>
          {Array.from({ length: 20 }).map((_, i) => (
            <Typography key={i} variant="p">
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Typography>
          ))}
        </Box>
      </>
    ),
  },
};
