import * as React from "react";
import { cn } from "../lib/utils";

const Typography = React.forwardRef<
  HTMLElement,
  Omit<React.ComponentProps<"p">, "color"> & {
    as?: React.ElementType;
    text?: React.ReactNode;
  }
>(({ as, text, children, className, ...props }, ref) => {
  const Component = as ?? "p";

  return (
    <Component
      ref={ref}
      className={cn("text-foreground", className)}
      {...props}
    >
      {text ?? children}
    </Component>
  );
});
Typography.displayName = "Typography";

export { Typography };
