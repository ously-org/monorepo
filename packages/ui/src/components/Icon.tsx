// ISSUE_#132 | 2026-05-13 | Create Icon component with phosphor icon map | opencode | deepseek-v4-flash

"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { IconId } from "../const";
import { cn } from "../lib/utils";
import { iconMap } from "../generated/icon-map";

const iconSizes = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
} as const;

const iconColors = {
  foreground: "text-foreground",
  background: "text-background",
  primary: "text-primary",
  muted: "text-muted-foreground",
} as const;

export type IconSize = keyof typeof iconSizes;
export type IconColor = keyof typeof iconColors;

export interface IconProps extends Omit<
  ComponentPropsWithoutRef<"svg">,
  "id" | "size" | "color"
> {
  id: IconId;
  size?: IconSize;
  color?: IconColor;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ id, size = "md", color, className, ...props }, ref) => {
    const Component = iconMap[id];
    if (!Component) {
      console.warn(`Icon not found: ${id}`);
      return null;
    }
    return (
      <Component
        ref={ref}
        className={cn(
          "shrink-0",
          iconSizes[size],
          color && iconColors[color],
          className,
        )}
        {...props}
      />
    );
  },
);
Icon.displayName = "Icon";

export { Icon };
