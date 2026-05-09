"use client";

import * as React from "react";
import { Button as InternalButton, buttonVariants } from "../internal/button";

export interface ButtonProps extends React.ComponentProps<
  typeof InternalButton
> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, _ref) => {
    // Note: InternalButton currently doesn't support ref, but we wrap it here
    // to follow Rule 26 and provide a stable public API.
    return <InternalButton {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
