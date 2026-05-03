"use client";

import * as React from "react";
import {
  OuslySidebar,
  type NavGroup,
  type NavItem,
  SidebarProvider,
  SidebarInset,
  TooltipProvider,
} from "@ously/ui";

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
    label: "Main Menu",
    items: [
      { title: "Dashboard", href: "/dashboard" },
      { title: "Campaigns", href: "/campaigns" },
      { title: "Analytics", href: "/analytics" },
    ],
  },
];

export function ProsperLayout({
  children,
  navGroups = defaultNavGroups,
  footerNav,
}: ProsperLayoutProps) {
  return (
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
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
