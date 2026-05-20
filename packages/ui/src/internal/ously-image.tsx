import * as React from "react";
import { cn } from "../lib/utils";

function OuslyImage({
  className,
  alt = "",
  ...props
}: React.ComponentProps<"img">) {
  return (
    <img className={cn("max-w-full h-auto", className)} alt={alt} {...props} />
  );
}

export { OuslyImage };
