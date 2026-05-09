"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../internal/sidebar";
import { Skeleton } from "../internal/skeleton";
import { Box } from "./Box";
import { Typography } from "./Typography";
import { Link } from "./Link";
import { OuslyImage } from "./OuslyImage";

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  tooltip?: string;
  isActive?: boolean;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export interface NavHeaderProps {
  logoUrl?: string;
  logoAlt?: string;
  title?: string;
  href?: string;
}

export function NavHeader({
  logoUrl,
  logoAlt = "",
  title = "PROSPER",
  href = "/",
}: NavHeaderProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          asChild
          className="justify-center data-[slot=sidebar-menu-button]:p-1.5! group-data-[collapsible=icon]:p-0!"
        >
          <Link
            href={href}
            display="flex"
            align="center"
            justify="center"
            gap="xs"
            collapseBehavior="remove-padding"
          >
            {logoUrl ? (
              <OuslyImage src={logoUrl} alt={logoAlt} variant="sidebar-logo" />
            ) : (
              <Skeleton className="h-10 w-10 aspect-square transition-all group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8" />
            )}
            <Box className="group-data-[collapsible=icon]:hidden">
              <Typography variant="h4" weight="bold" color="primary">
                {title}
              </Typography>
            </Box>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export interface OuslySidebarProps extends Omit<
  React.ComponentProps<typeof Sidebar>,
  "variant" | "className"
> {
  logoUrl?: string;
  logoAlt?: string;
  title?: string;
  footer?: NavItem[];
  navGroups?: NavGroup[];
  children?: React.ReactNode;
  variant?: "all-the-way" | "inset";
}

export function OuslySidebar({
  logoUrl,
  logoAlt,
  title,
  footer,
  navGroups,
  children,
  variant = "all-the-way",
  ...props
}: OuslySidebarProps) {
  const sidebarVariant = variant === "inset" ? "inset" : "sidebar";
  const collapsible = variant === "inset" ? "icon" : "offcanvas";

  return (
    <Sidebar variant={sidebarVariant} collapsible={collapsible} {...props}>
      <SidebarHeader>
        <NavHeader logoUrl={logoUrl} logoAlt={logoAlt} title={title} />
      </SidebarHeader>
      <SidebarContent>
        {navGroups?.map((group, index) => (
          <SidebarGroup key={group.label || index}>
            {group.label && (
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      tooltip={item.tooltip || item.title}
                    >
                      <Link
                        href={item.href}
                        icon={item.icon}
                        title={item.title}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        {children}
      </SidebarContent>
      {footer && (
        <SidebarFooter>
          <SidebarMenu>
            {footer.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={item.isActive}
                  tooltip={item.tooltip || item.title}
                >
                  <Link href={item.href} icon={item.icon} title={item.title} />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
