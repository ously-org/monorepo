"use client";
// ISSUE_#none | 2026-05-31 | Rename /login to /signin in layout | antigravity | gemini-3.5-flash

import * as React from "react";
import { usePathname } from "next/navigation";
import { AppLayout, type AppLayoutProps } from "@ously/ui/layout";
import { getImageUrl } from "@ously/ui/lib/image";
import prosperIcon from "../../../asset/prosper-icon.svg";
import { defaultNavGroups, defaultFooterNav } from "@ously/ui/const";

const AUTH_ROUTES = ["/signin"];

export type ProsperLayoutProps = Omit<
  AppLayoutProps,
  "logoUrl" | "logoAlt" | "title"
>;

export function ProsperLayout({
  children,
  navGroups = defaultNavGroups,
  footerNav = defaultFooterNav,
}: ProsperLayoutProps) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <AppLayout
      title="PROSPER"
      logoUrl={getImageUrl(prosperIcon)}
      logoAlt="Prosper Logo"
      navGroups={navGroups}
      footerNav={footerNav}
      sidebarVariant="inset"
    >
      {children}
    </AppLayout>
  );
}
