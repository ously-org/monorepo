"use client";
// ISSUE_#none | 2026-05-31 | Darker checkbox border when unchecked in light mode and lighter in dark mode | antigravity | gemini-3.5-flash

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cn } from "../lib/utils";

export interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  variant?: "default" | "important";
}

function Checkbox({
  id,
  checked,
  onCheckedChange,
  variant = "default",
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "peer size-4 shrink-0 rounded-none border-2 border-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        variant === "default" &&
          "bg-muted data-[state=unchecked]:hover:bg-accent",
        variant === "important" &&
          "bg-[color-mix(in_oklch,var(--primary)_20%,transparent)] data-[state=unchecked]:hover:bg-[color-mix(in_oklch,var(--primary)_30%,transparent)]",
      )}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 6L5 8L9 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
