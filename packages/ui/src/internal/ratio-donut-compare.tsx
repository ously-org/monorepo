"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface CompareItemData {
  name: string;
  description?: string;
  iconId?: string;
  value: number;
  percentage: number;
  color: string;
  isOther?: boolean;
  subItems?: Pick<
    CompareItemData,
    "name" | "value" | "percentage" | "iconId" | "description"
  >[];
}

const textSizeMap = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

interface RatioDonutCompareInternalProps {
  segments: CompareItemData[];
  total: number;
  strokeWidth: number;
  showTotal?: boolean;
  showDetail?: boolean;
  textSize?: keyof typeof textSizeMap;
  prefix?: string;
  className?: string;
  sizeClass?: string;
  renderIcon?: (iconId: string) => React.ReactNode;
}

function RatioDonutCompareInternal({
  segments,
  total: grandTotal,
  strokeWidth,
  showTotal,
  showDetail,
  textSize = "md",
  prefix,
  className,
  sizeClass,
  renderIcon,
}: RatioDonutCompareInternalProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [svgWidth, setSvgWidth] = React.useState(200);
  const svgRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (svgRef.current) {
      setSvgWidth(svgRef.current.offsetWidth);
    }
  }, [segments]);

  const viewBox = 100;
  const radius = (viewBox - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = viewBox / 2;

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const hasSegments = segments.length > 0;

  const segmentData = React.useMemo(() => {
    const lengths = segments.map((s) => circumference * (s.percentage / 100));
    const offsets = lengths.map(
      (_, i) => -lengths.slice(0, i).reduce((a, b) => a + b, 0),
    );
    return { lengths, offsets };
  }, [segments, circumference]);

  const txt = textSizeMap[textSize];
  const txtXs =
    textSize === "xs"
      ? "text-[9px]"
      : textSize === "sm"
        ? "text-[10px]"
        : textSize === "lg"
          ? "text-xs"
          : "text-[11px]";

  const donutSection = (
    <div
      ref={svgRef}
      className="relative inline-flex shrink-0"
      onMouseMove={hasSegments && !showDetail ? handleMouseMove : undefined}
      onMouseLeave={hasSegments && !showDetail ? handleMouseLeave : undefined}
    >
      <svg
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        className={cn("size-full -rotate-90", sizeClass)}
      >
        {!hasSegments && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            style={{ stroke: "var(--muted)" }}
            className="opacity-30"
          />
        )}
        {segments.map((seg, i) => {
          const segLength = segmentData.lengths[i] ?? 0;
          const offset = segmentData.offsets[i] ?? 0;
          const isHovered = hoveredIndex === i;
          const isDimmed = hoveredIndex !== null && !isHovered;

          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeDasharray={`${Math.max(segLength, 0.5)} ${Math.max(circumference - segLength, 0.5)}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
              style={{ stroke: seg.color }}
              onMouseEnter={() => setHoveredIndex(i)}
              className={cn(
                "cursor-pointer transition-all duration-200",
                !isDimmed &&
                  "hover:opacity-100 hover:[filter:brightness(1.15)]",
                isDimmed && "opacity-20",
                isHovered && "opacity-100",
              )}
            />
          );
        })}
      </svg>
      {showTotal && hasSegments && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className={cn("font-medium text-foreground", txt)}>
            {prefix ?? ""}
            {grandTotal}
          </span>
        </div>
      )}
      {!showDetail && hoveredIndex !== null && segments[hoveredIndex] && (
        <div
          className="pointer-events-none absolute z-50"
          style={{
            left: Math.min(mousePos.x + 14, svgWidth - 180),
            top: mousePos.y,
            transform: "translateY(-50%)",
          }}
        >
          <div className="rounded-none bg-foreground px-3 py-2 text-xs text-background shadow-lg">
            <TooltipContent
              segment={segments[hoveredIndex]}
              total={grandTotal}
              renderIcon={renderIcon}
            />
          </div>
        </div>
      )}
    </div>
  );

  const detailSection =
    showDetail && hasSegments ? (
      <div
        className="flex flex-col gap-1.5 pt-1"
        onMouseLeave={handleMouseLeave}
      >
        <div className={cn("font-medium text-foreground", txt)}>
          {prefix ?? ""}
          {grandTotal}
        </div>
        {segments.map((seg, i) => {
          const isHovered = hoveredIndex === i;
          const isDimmed = hoveredIndex !== null && !isHovered;

          return (
            <div
              key={i}
              onMouseEnter={() => {
                setHoveredIndex(i);
                svgRef.current?.dispatchEvent(
                  new MouseEvent("mousemove", { bubbles: false }),
                );
              }}
              className={cn(
                "flex cursor-pointer items-center gap-2 transition-all duration-200",
                isDimmed && "opacity-30",
                isHovered && "opacity-100",
                txt,
              )}
            >
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              {seg.iconId && renderIcon && (
                <span className="text-muted-foreground">
                  {renderIcon(seg.iconId)}
                </span>
              )}
              <span className="text-foreground">{seg.name}</span>
              <span className={cn("ml-auto text-muted-foreground", txtXs)}>
                {Math.round(seg.percentage)}%
              </span>
            </div>
          );
        })}
      </div>
    ) : null;

  if (showDetail) {
    return (
      <div
        className={cn("flex items-start gap-6", className)}
        onMouseLeave={hasSegments ? handleMouseLeave : undefined}
      >
        {donutSection}
        {detailSection}
      </div>
    );
  }

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      {donutSection}
    </div>
  );
}

function TooltipContent({
  segment,
  total,
  renderIcon,
}: {
  segment: CompareItemData;
  total: number;
  renderIcon?: (iconId: string) => React.ReactNode;
}) {
  if (segment.isOther && segment.subItems && segment.subItems.length > 0) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 font-medium">
          <span>Other</span>
          <span className="text-background/60">
            {Math.round(segment.percentage)}%
          </span>
        </div>
        <div className="mt-0.5 flex flex-col gap-0.5 border-t border-background/20 pt-1">
          {segment.subItems.map((sub, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1">
                {sub.iconId && renderIcon && (
                  <span className="text-background/60">
                    {renderIcon(sub.iconId)}
                  </span>
                )}
                <span>{sub.name}</span>
              </div>
              <span className="text-background/60">
                {Math.round(sub.percentage)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5 font-medium">
        {segment.iconId && renderIcon && (
          <span>{renderIcon(segment.iconId)}</span>
        )}
        <span>{segment.name}</span>
      </div>
      {segment.description && (
        <span className="text-background/60">{segment.description}</span>
      )}
      <span className="mt-0.5 text-background/80">
        {segment.value} / {total} ({Math.round(segment.percentage)}%)
      </span>
    </div>
  );
}

export { RatioDonutCompareInternal };
