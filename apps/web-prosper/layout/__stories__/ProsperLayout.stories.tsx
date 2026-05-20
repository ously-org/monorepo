import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProsperLayout } from "../ProsperLayout";
import { Box, Typography } from "@ously/ui";
import { MockCard } from "../../components/MockCard";
const meta: Meta<typeof ProsperLayout> = {
  title: "Prosper/ProsperLayout",
  component: ProsperLayout,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: (
      <>
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
            icon: "phosphor.layout",
            isActive: true,
          },
          { title: "Campaigns", href: "/campaigns", icon: "phosphor.sparkle" },
          {
            title: "Analytics",
            href: "/analytics",
            icon: "phosphor.chart_pie",
          },
        ],
      },
      {
        label: "Management",
        items: [
          { title: "Team", href: "/team", icon: "phosphor.users" },
          { title: "Settings", href: "/settings", icon: "phosphor.gear" },
        ],
      },
    ],
    footerNav: [
      { title: "Logout", href: "/logout", icon: "phosphor.sign_out" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomNavigation: Story = {
  args: {
    navGroups: [
      {
        label: "Account",
        items: [
          { title: "Profile", href: "/profile", icon: "phosphor.users" },
          { title: "Preferences", href: "/prefs", icon: "phosphor.gear" },
        ],
      },
    ],
  },
};

export const NoContent: Story = {
  args: {
    children: <></>,
  },
};
