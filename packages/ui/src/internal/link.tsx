"use client";

import * as React from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { IconId } from "../const";
import { Icon } from "../components/Icon";
import { cn } from "../lib/utils";

const Link = React.forwardRef<
  HTMLAnchorElement,
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> &
    NextLinkProps & {
      icon?: IconId;
      title?: string;
      children?: React.ReactNode;
    }
>(({ className, icon, title, children, ...props }, ref) => {
  return (
    <NextLink
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {icon && <Icon id={icon} />}
      {title ? (
        <span className="group-data-[collapsible=icon]:hidden">{title}</span>
      ) : (
        children
      )}
    </NextLink>
  );
});
Link.displayName = "Link";

export { Link };
