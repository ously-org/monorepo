import * as React from "react";
import { cn } from "../lib/utils";

interface RatioDonutInternalProps {
  percentage: number;
  color: string;
  strokeWidth: number;
  showLabel?: boolean;
  viewBox?: number;
  className?: string;
  labelClassName?: string;
  children?: React.ReactNode;
}

function RatioDonutInternal({
  percentage,
  color,
  strokeWidth,
  showLabel = true,
  viewBox = 100,
  className,
  labelClassName,
  children,
}: RatioDonutInternalProps) {
  const radius = (viewBox - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset =
    circumference * (1 - Math.max(0, Math.min(percentage, 100)) / 100);
  const center = viewBox / 2;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        className="size-full -rotate-90"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          style={{ stroke: "var(--muted)" }}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ stroke: color }}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {(showLabel || children) && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children ?? (
            <span className={cn("font-medium text-foreground", labelClassName)}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { RatioDonutInternal, type RatioDonutInternalProps };
