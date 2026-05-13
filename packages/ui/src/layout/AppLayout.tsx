"use client";

import * as React from "react";
import { OuslySidebar, type NavGroup, type NavItem } from "./components/OuslySidebar";
import { SidebarProvider, SidebarInset } from "../internal/sidebar";
import { TooltipProvider } from "../internal/tooltip";
import { Header } from "./components/Header";

export interface AppLayoutProps {
  children: React.ReactNode;
  navGroups?: NavGroup[];
  footerNav?: NavItem[];
  logoUrl?: string;
  logoAlt?: string;
  title?: string;
  sidebarVariant?: "all-the-way" | "inset";
}

export function AppLayout({
  children,
  navGroups,
  footerNav,
  logoUrl,
  logoAlt = "",
  title = "",
  sidebarVariant = "inset",
}: AppLayoutProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <OuslySidebar
          title={title}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
          navGroups={navGroups}
          footer={footerNav}
          variant={sidebarVariant}
        />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
