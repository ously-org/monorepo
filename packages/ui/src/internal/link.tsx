"use client";

import * as React from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { cn } from "../lib/utils";
import { Typography } from "./typography";
import { type VariantProps, cva } from "class-variance-authority";

const linkVariants = cva(
  "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-foreground hover:text-primary",
        primary: "text-primary hover:text-primary/80",
        muted: "text-muted-foreground hover:text-foreground",
        underline: "text-primary underline-offset-4 hover:underline",
        ghost: "hover:bg-accent hover:text-accent-foreground p-1 rounded-none",
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
  },
);

export interface LinkProps
  extends
    Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof NextLinkProps | "className"
    >,
    NextLinkProps,
    VariantProps<typeof linkVariants> {
  icon?: React.ElementType;
  title?: string;
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
      icon: Icon,
      title,
      children,
      ...props
    },
    ref,
  ) => {
    const isSmall = size === "sm";

    return (
      <NextLink
        ref={ref}
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
        {...props}
      >
        {Icon && <Icon className="size-4 shrink-0" />}
        {title ? (
          <span className="group-data-[collapsible=icon]:hidden">
            <Typography
              variant="no-style"
              as="span"
              size={isSmall ? "xs" : undefined}
            >
              {title}
            </Typography>
          </span>
        ) : (
          children
        )}
      </NextLink>
    );
  },
);
Link.displayName = "Link";

export { Link, linkVariants };
