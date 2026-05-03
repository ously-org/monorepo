import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const boxVariants = cva("", {
  variants: {
    display: {
      flex: "flex",
      grid: "grid",
      block: "block",
      inline: "inline",
      "inline-flex": "inline-flex",
      "inline-grid": "inline-grid",
      "inline-block": "inline-block",
      hidden: "hidden",
    },
    direction: {
      row: "flex-row",
      col: "flex-col",
      "row-reverse": "flex-row-reverse",
      "col-reverse": "flex-col-reverse",
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
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
    padding: {
      none: "p-0",
      xs: "p-1",
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
      xl: "p-5",
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
      hide: "group-data-[collapsible=icon]:hidden",
      header:
        "h-16 shrink-0 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
    },
  },
  defaultVariants: {
    display: "block",
  },
});

export interface BoxProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "className">,
    VariantProps<typeof boxVariants> {
  asChild?: boolean;
}

/**
 * A versatile layout component that replaces generic div tags.
 * Supports common layout properties via props and follows ODS design tokens.
 */
const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      display,
      direction,
      align,
      justify,
      wrap,
      padding,
      gap,
      collapseBehavior,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(
          boxVariants({
            display,
            direction,
            align,
            justify,
            wrap,
            padding,
            gap,
            collapseBehavior,
          }),
        )}
        {...props}
      />
    );
  },
);
Box.displayName = "Box";

export { Box, boxVariants };
