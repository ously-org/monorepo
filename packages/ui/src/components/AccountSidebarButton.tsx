"use client";

import { Settings, LogOut, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "../internal/avatar";
import { Button } from "../internal/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../internal/dropdown-menu";
import { Box } from "./Box";
import { Typography } from "./Typography";

export interface AccountSidebarButtonProps {
  user: {
    name: string;
    email?: string;
    image?: string;
  };
  onSettings?: () => void;
  onLogout?: () => void;
  className?: string;
  settingsLabel?: string;
  logoutLabel?: string;
}

function AccountSidebarButton({
  user,
  onSettings,
  onLogout,
  className,
  settingsLabel = "Settings",
  logoutLabel = "Logout",
}: AccountSidebarButtonProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="default"
          data-slot="account-sidebar-button"
          className={cn(
            "flex peer/menu-button group/menu-button w-full gap-2 overflow-hidden p-2 text-left ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!",
            className,
          )}
        >
          <Avatar size="sm">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name} />
            ) : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <Typography
            as="span"
            variant="no-style"
            className="flex flex-col items-start gap-0 group-data-[collapsible=icon]:hidden min-w-0 flex-1"
          >
            <Typography
              as="span"
              variant="no-style"
              className="truncate text-xs font-medium text-sidebar-foreground"
            >
              {user.name}
            </Typography>
            {user.email && (
              <Typography
                as="span"
                variant="no-style"
                className="truncate text-[10px] text-sidebar-foreground/60"
              >
                {user.email}
              </Typography>
            )}
          </Typography>
          <ChevronsUpDown className="size-3 shrink-0 text-sidebar-foreground/40 group-data-[collapsible=icon]:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-48">
        <DropdownMenuLabel className="font-normal">
          <Box display="flex" direction="col" className="gap-0.5">
            <Typography as="span" className="text-sm font-medium">
              {user.name}
            </Typography>
            {user.email && (
              <Typography as="span" variant="muted" size="xs">
                {user.email}
              </Typography>
            )}
          </Box>
        </DropdownMenuLabel>
        {(onSettings || onLogout) && <DropdownMenuSeparator />}
        {onSettings && (
          <DropdownMenuItem onClick={onSettings}>
            <Settings className="size-4" />
            <Typography as="span" variant="no-style">
              {settingsLabel}
            </Typography>
          </DropdownMenuItem>
        )}
        {onSettings && onLogout && <DropdownMenuSeparator />}
        {onLogout && (
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="size-4" />
            <Typography as="span" variant="no-style">
              {logoutLabel}
            </Typography>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { AccountSidebarButton };
