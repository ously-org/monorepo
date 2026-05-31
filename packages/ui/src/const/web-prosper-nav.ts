import type { NavGroup, NavItem } from "../layout/components/OuslySidebar";

export const defaultNavGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Home", href: "/", icon: "phosphor.house" },
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: "phosphor.layout",
        isActive: true,
      },
    ],
  },
  {
    label: "Financial",
    items: [
      { title: "Accounts", href: "/accounts", icon: "phosphor.bank" },
      {
        title: "Transactions",
        href: "/transactions",
        icon: "phosphor.arrow_clockwise",
      },
      { title: "Assets", href: "/assets", icon: "phosphor.chart_line_up" },
    ],
  },
  {
    label: "Sandbox",
    items: [{ title: "Branches", href: "/branches", icon: "phosphor.stack" }],
  },
];

export const defaultFooterNav: NavItem[] = [
  { title: "Account", href: "/account", icon: "phosphor.user_circle" },
  { title: "Settings", href: "/settings", icon: "phosphor.gear" },
];
