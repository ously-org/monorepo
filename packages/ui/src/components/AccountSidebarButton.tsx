"use client";

import { Settings, LogOut, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "../internal/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../internal/dropdown-menu";

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
        <button
          type="button"
          data-slot="account-sidebar-button"
          className={cn(
            "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 text-left text-xs ring-sidebar-ring outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!",
            className,
          )}
        >
          <Avatar size="sm">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name} />
            ) : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="flex flex-col items-start gap-0 group-data-[collapsible=icon]:hidden min-w-0 flex-1">
            <span className="truncate text-xs font-medium text-sidebar-foreground">
              {user.name}
            </span>
            {user.email && (
              <span className="truncate text-[10px] text-sidebar-foreground/60">
                {user.email}
              </span>
            )}
          </span>
          <ChevronsUpDown className="size-3 shrink-0 text-sidebar-foreground/40 group-data-[collapsible=icon]:hidden" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-48">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{user.name}</span>
            {user.email && (
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        {(onSettings || onLogout) && <DropdownMenuSeparator />}
        {onSettings && (
          <DropdownMenuItem onClick={onSettings}>
            <Settings className="size-4" />
            <span>{settingsLabel}</span>
          </DropdownMenuItem>
        )}
        {onSettings && onLogout && <DropdownMenuSeparator />}
        {onLogout && (
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="size-4" />
            <span>{logoutLabel}</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { AccountSidebarButton };
