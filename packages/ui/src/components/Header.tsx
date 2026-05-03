"use client";

import * as React from "react";
import { SidebarTrigger } from "../internal/sidebar";
import { Separator } from "../internal/separator";
import { HeaderBreadcrumb } from "./BreadcrumbWIthPart";
import { cn } from "../lib/utils";
import { Box } from "./Box";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  pathname: string | null;
}

export function Header({ pathname }: HeaderProps) {
  return (
    <Box
      asChild
      display="flex"
      align="center"
      gap="sm"
      collapseBehavior="header"
    >
      <header>
        <Box display="flex" align="center" gap="sm">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <HeaderBreadcrumb pathname={pathname} />
        </Box>
      </header>
    </Box>
  );
}
