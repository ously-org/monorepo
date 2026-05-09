"use client";

import * as React from "react";
import { SidebarTrigger } from "../internal/sidebar";
import { Separator } from "../internal/separator";
import { usePathname } from "next/navigation";
import { HeaderBreadcrumb } from "./HeaderBreadcrumb";
import { Box } from "./Box";
import { cn } from "../lib/utils";

export interface HeaderProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "className"
> {
  pathname?: string;
}

export function Header({ pathname: manualPathname, ...props }: HeaderProps) {
  const currentPathname = usePathname();
  const pathname = manualPathname || currentPathname;
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
      )}
      {...props}
    >
      <Box display="flex" align="center" gap="sm">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <HeaderBreadcrumb pathname={pathname} />
      </Box>
    </header>
  );
}
