"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  RatioDonutCompareInternal,
  type CompareItemData,
} from "../internal/ratio-donut-compare";
import { Icon } from "./Icon";
import type { IconId } from "../const";

const ratioDonutCompareVariants = cva("", {
  variants: {
    size: {
      sm: "size-32",
      md: "size-40",
      lg: "size-48",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const sizeConfig = {
  sm: { thickness: 8 },
  md: { thickness: 10 },
  lg: { thickness: 12 },
} as const;

const barSizeConfig = {
  sm: 6,
  md: 10,
  lg: 14,
} as const;

export interface RatioDonutCompareItem {
  name: string;
  description?: string;
  iconId?: IconId;
  value: number;
}

export interface RatioDonutCompareProps
  extends VariantProps<typeof ratioDonutCompareVariants> {
  items: RatioDonutCompareItem[];
  smallPercentageThreshold?: number;
  barSize?: "sm" | "md" | "lg";
  showTotal?: boolean;
  showDetail?: boolean;
  textSize?: "xs" | "sm" | "md" | "lg";
  prefix?: string;
}

function processItems(
  items: RatioDonutCompareItem[],
  threshold: number,
): { segments: CompareItemData[]; total: number } {
  const sorted = [...items]
    .filter((i) => i.value > 0)
    .sort((a, b) => b.value - a.value);

  const total = sorted.reduce((sum, i) => sum + i.value, 0);
  if (total === 0) return { segments: [], total: 0 };

  const main: RatioDonutCompareItem[] = [];
  const small: RatioDonutCompareItem[] = [];

  for (const item of sorted) {
    const pct = (item.value / total) * 100;
    if (pct < threshold) {
      small.push(item);
    } else {
      main.push(item);
    }
  }

  const getColor = (index: number) =>
    CHART_COLORS[index % CHART_COLORS.length] || "var(--chart-1)";

  const segments: CompareItemData[] = main.map((item, i) => ({
    name: item.name,
    description: item.description,
    iconId: item.iconId,
    value: item.value,
    percentage: (item.value / total) * 100,
    color: getColor(i),
  }));

  if (small.length > 0) {
    const smallTotal = small.reduce((s, i) => s + i.value, 0);
    segments.push({
      name: "Other",
      value: smallTotal,
      percentage: (smallTotal / total) * 100,
      color: getColor(main.length),
      isOther: true,
      subItems: small.map((item) => ({
        name: item.name,
        description: item.description,
        iconId: item.iconId,
        value: item.value,
        percentage: (item.value / total) * 100,
      })),
    });
  }

  return { segments, total };
}

function RatioDonutCompare({
  items,
  size = "md",
  smallPercentageThreshold = 5,
  barSize,
  showTotal = true,
  showDetail = false,
  textSize = "md",
  prefix,
}: RatioDonutCompareProps) {
  const resolvedThreshold = Math.max(0, Math.min(smallPercentageThreshold, 20));

  const { segments, total } = React.useMemo(
    () => processItems(items, resolvedThreshold),
    [items, resolvedThreshold],
  );

  const resolvedSize = size ?? "md";
  const cfg = sizeConfig[resolvedSize];
  const strokeWidth = barSize ? barSizeConfig[barSize] : cfg.thickness;

  return (
    <RatioDonutCompareInternal
      segments={segments}
      total={total}
      strokeWidth={strokeWidth}
      showTotal={showTotal}
      showDetail={showDetail}
      textSize={textSize}
      prefix={prefix}
      sizeClass={ratioDonutCompareVariants({ size })}
      renderIcon={(iconId) => <Icon id={iconId as IconId} size="sm" />}
    />
  );
}

export { RatioDonutCompare, ratioDonutCompareVariants };
