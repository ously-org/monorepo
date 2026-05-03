import * as React from "react";
import { cn } from "../lib/utils";

export interface OuslyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // We can extend this later if we want to support next/image or other optimized loaders
}

/**
 * A standard image component for the Ously Design System.
 * Wraps the native img tag with default styling and ODS consistency.
 */
export const OuslyImage = React.forwardRef<HTMLImageElement, OuslyImageProps>(
  ({ className, alt = "", ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={cn("max-w-full h-auto", className)}
        alt={alt}
        {...props}
      />
    );
  }
);

OuslyImage.displayName = "OuslyImage";
