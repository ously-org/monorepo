"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { OuslyImage as InternalOuslyImage } from "../internal/ously-image";
import { cn } from "../lib/utils";

const imageVariants = cva(
  "aspect-square object-contain transition-all group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface OuslyImageProps extends VariantProps<typeof imageVariants> {
  src: string;
  alt: string;
  width?: React.ComponentProps<"img">["width"];
  height?: React.ComponentProps<"img">["height"];
  loading?: React.ComponentProps<"img">["loading"];
  decoding?: React.ComponentProps<"img">["decoding"];
  className?: string;
}

const OuslyImage = React.forwardRef<HTMLImageElement, OuslyImageProps>(
  ({ size, className, src, alt, width, height, loading, decoding }, ref) => {
    return (
      <InternalOuslyImage
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        className={cn(imageVariants({ size }), className)}
      />
    );
  },
);
OuslyImage.displayName = "OuslyImage";

export { OuslyImage, imageVariants };
