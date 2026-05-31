"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { IconId } from "../const";
import { Link as InternalLink } from "../internal/link";
import { cn } from "../lib/utils";

const linkVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground hover:text-primary",
      primary: "text-primary hover:text-primary/80",
      muted: "text-muted-foreground hover:text-foreground",
      underline: "text-primary underline-offset-4 hover:underline",
      ghost: "hover:bg-accent hover:text-accent-foreground p-1 rounded-none",
      sidebar:
        "flex w-full items-center gap-2 overflow-hidden rounded-none p-2 text-left text-xs transition-[width,height,padding] group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! group-data-[collapsible=icon]:justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
    },
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-base",
    },
    display: {
      flex: "flex",
      "inline-flex": "inline-flex",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-5",
    },
    collapseBehavior: {
      "remove-padding": "group-data-[collapsible=icon]:p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    display: "inline-flex",
    align: "center",
    gap: "sm",
  },
});

export interface LinkProps extends VariantProps<typeof linkVariants> {
  href: string;
  icon?: IconId;
  title?: string;
  target?: React.ComponentProps<"a">["target"];
  rel?: React.ComponentProps<"a">["rel"];
  "data-active"?: boolean | string;
  onPointerDown?: React.PointerEventHandler<HTMLAnchorElement>;
  onPointerUp?: React.PointerEventHandler<HTMLAnchorElement>;
  onPointerMove?: React.PointerEventHandler<HTMLAnchorElement>;
  onPointerEnter?: React.PointerEventHandler<HTMLAnchorElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLAnchorElement>;
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
  onBlur?: React.FocusEventHandler<HTMLAnchorElement>;
  children?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant,
      size,
      collapseBehavior,
      display,
      align,
      justify,
      gap,
      icon,
      title,
      href,
      target,
      rel,
      ["data-active"]: dataActive,
      onPointerDown,
      onPointerUp,
      onPointerMove,
      onPointerEnter,
      onPointerLeave,
      onFocus,
      onBlur,
      children,
    },
    ref,
  ) => {
    return (
      <InternalLink
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        icon={icon}
        title={title}
        data-active={dataActive}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          linkVariants({
            variant,
            size,
            collapseBehavior,
            display,
            align,
            justify,
            gap,
          }),
        )}
      >
        {children}
      </InternalLink>
    );
  },
);
Link.displayName = "Link";

export { Link, linkVariants };
