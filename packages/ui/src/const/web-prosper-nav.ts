import type { NavGroup, NavItem } from "../layout/components/OuslySidebar";

export const defaultNavGroups: NavGroup[] = [
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
      { title: "Analytics", href: "/analytics", icon: "phosphor.chart_pie" },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Team", href: "/team", icon: "phosphor.users" },
      { title: "Settings", href: "/settings", icon: "phosphor.gear" },
    ],
  },
];

export const defaultFooterNav: NavItem[] = [
  { title: "Logout", href: "/logout", icon: "phosphor.sign_out" },
];
