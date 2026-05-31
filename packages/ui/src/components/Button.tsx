"use client";

import type { IconId } from "../const";
import { Icon } from "./Icon";
import { Button as InternalButton, buttonVariants } from "../internal/button";
import type { VariantProps } from "class-variance-authority";

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: IconId;
  type?: React.ComponentProps<"button">["type"];
  disabled?: React.ComponentProps<"button">["disabled"];
  onClick?: React.ComponentProps<"button">["onClick"];
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

function Button({
  variant = "default",
  size = "default",
  type,
  disabled,
  asChild,
  icon,
  children,
  onClick,
  style,
}: ButtonProps) {
  if (asChild) {
    return (
      <InternalButton asChild variant={variant} size={size} type={type} disabled={disabled} onClick={onClick}>
        {children}
      </InternalButton>
    );
  }

  return (
    <InternalButton variant={variant} size={size} type={type} disabled={disabled} onClick={onClick} style={style}>
      {icon && <Icon id={icon} data-icon="inline-start" />}
      {children}
    </InternalButton>
  );
}

export { Button, buttonVariants };
