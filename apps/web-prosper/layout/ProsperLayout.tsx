"use client";

import * as React from "react";
import {
  OuslySidebar,
  type NavGroup,
  type NavItem,
  SidebarProvider,
  SidebarInset,
  TooltipProvider,
  Header,
} from "@ously/ui";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  PieChart,
  Sparkles,
} from "lucide-react";

// In a real application, we might import the SVG, but since this is a shared UI package
// we can pass the asset path or handle it based on the bundler. For Next.js/Vite compatibility,
// we can assume the consumer provides it, or we import it if it's within the monorepo.
import prosperIcon from "../../../asset/prosper-icon.svg";

export interface ProsperLayoutProps {
  children: React.ReactNode;
  navGroups?: NavGroup[];
  footerNav?: NavItem[];
}

const defaultNavGroups: NavGroup[] = [
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
];

const defaultFooterNav: NavItem[] = [
  { title: "Logout", href: "/logout", icon: LogOut },
];

export function ProsperLayout({
  children,
  navGroups = defaultNavGroups,
  footerNav = defaultFooterNav,
}: ProsperLayoutProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <OuslySidebar
          title="PROSPER"
          // In Next.js this would be an object with .src, in Vite it might be a string.
          // We'll safely use it whether it's an object or string.
          logoUrl={
            typeof prosperIcon === "string"
              ? prosperIcon
              : (prosperIcon as any)?.src || ""
          }
          logoAlt="Prosper Logo"
          navGroups={navGroups}
          footer={footerNav}
          variant="inset"
        />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
