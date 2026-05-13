"use client";

import * as React from "react";
import { AppLayout, type AppLayoutProps } from "@ously/ui/layout";
import { getImageUrl } from "@ously/ui/lib/image";
import prosperIcon from "../../../asset/prosper-icon.svg";
import { defaultNavGroups, defaultFooterNav } from "@ously/ui/const";

export type ProsperLayoutProps = Omit<
  AppLayoutProps,
  "logoUrl" | "logoAlt" | "title"
>;

export function ProsperLayout({
  children,
  navGroups = defaultNavGroups,
  footerNav = defaultFooterNav,
}: ProsperLayoutProps) {
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
