import * as React from "react";
import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const imageVariants = cva("max-w-full h-auto", {
  variants: {
    variant: {
      default: "",
      "sidebar-logo":
        "h-10 w-10 aspect-square object-contain transition-all group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface OuslyImageProps
  extends
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, "className">,
    VariantProps<typeof imageVariants> {}

/**
 * A standard image component for the Ously Design System.
 * Wraps the native img tag with default styling and ODS consistency.
 */
export const OuslyImage = React.forwardRef<HTMLImageElement, OuslyImageProps>(
  ({ variant, alt = "", ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={cn(imageVariants({ variant }))}
        alt={alt}
        {...props}
      />
    );
  },
);

OuslyImage.displayName = "OuslyImage";
