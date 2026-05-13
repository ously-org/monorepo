"use client";

import * as React from "react";
import Link from "next/link";
import { SidebarTrigger } from "../../internal/sidebar";
import { Separator } from "../../internal/separator";
import { usePathname } from "next/navigation";
import { Box } from "../../components/Box";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../internal/breadcrumb";

export interface HeaderProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "className"
> {
  pathname?: string;
}

function HeaderBreadcrumb({ pathname }: { pathname: string | null }) {
  if (!pathname) return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label =
            segment.charAt(0).toUpperCase() +
            segment.slice(1).replace(/-/g, " ");

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function Header({ pathname: manualPathname, ...props }: HeaderProps) {
  const currentPathname = usePathname();
  const pathname = manualPathname || currentPathname;
  return (
    <Box
      display="flex"
      align="center"
      gap="sm"
      className="h-16 shrink-0 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      {...props}
    >
      <Box display="flex" align="center" gap="sm">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <HeaderBreadcrumb pathname={pathname} />
      </Box>
    </Box>
  );
}
