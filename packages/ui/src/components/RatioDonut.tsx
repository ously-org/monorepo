"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { RatioDonutInternal } from "../internal/ratio-donut";

const ratioDonutVariants = cva("", {
  variants: {
    size: {
      sm: "size-16",
      md: "size-24",
      lg: "size-32",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const COLOR_VARIANTS = [
  "primary",
  "destructive",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
] as const;

type RatioDonutColor = (typeof COLOR_VARIANTS)[number];

const colorToVar: Record<RatioDonutColor, string> = {
  primary: "var(--primary)",
  destructive: "var(--destructive)",
  "chart-1": "var(--chart-1)",
  "chart-2": "var(--chart-2)",
  "chart-3": "var(--chart-3)",
  "chart-4": "var(--chart-4)",
  "chart-5": "var(--chart-5)",
};

const sizeConfig = {
  sm: { thickness: 6, label: "text-xs" },
  md: { thickness: 8, label: "text-sm" },
  lg: { thickness: 10, label: "text-lg" },
} as const;

export interface RatioDonutProps extends VariantProps<
  typeof ratioDonutVariants
> {
  value: number;
  max?: number;
  color?: RatioDonutColor;
  showLabel?: boolean;
  thickness?: number;
  className?: string;
  children?: React.ReactNode;
}

function RatioDonut({
  value,
  max = 100,
  size = "md",
  color = "primary",
  showLabel = true,
  thickness,
  className,
  children,
}: RatioDonutProps) {
  const percentage = Math.max(0, Math.min((value / max) * 100, 100));
  const resolvedSize = size ?? "md";
  const cfg = sizeConfig[resolvedSize];
  const strokeWidth = thickness ?? cfg.thickness;

  return (
    <RatioDonutInternal
      percentage={percentage}
      color={colorToVar[color]}
      strokeWidth={strokeWidth}
      showLabel={showLabel}
      labelClassName={cfg.label}
      className={cn(ratioDonutVariants({ size }), className)}
    >
      {children}
    </RatioDonutInternal>
  );
}

export { RatioDonut, ratioDonutVariants, type RatioDonutColor, COLOR_VARIANTS };
