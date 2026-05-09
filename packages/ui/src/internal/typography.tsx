import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      ol: "my-6 ml-6 list-decimal [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      "no-style": "",
    },
    color: {
      primary: "text-primary",
      "primary-foreground": "text-primary-foreground",
      natural: "text-muted-foreground",
      none: "",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
  },
  compoundVariants: [
    {
      variant: "h1",
      color: "none",
      className: "text-primary",
    },
    {
      variant: ["lead", "muted"],
      color: "none",
      className: "text-muted-foreground",
    },
  ],
  defaultVariants: {
    variant: "p",
    color: "none",
  },
});

export interface TypographyProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color" | "size">,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  text?: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    { variant, color, weight, size, as, text, children, className, ...props },
    ref,
  ) => {
    const Component =
      as ||
      (() => {
        switch (variant) {
          case "ul":
            return "ul";
          case "ol":
            return "ol";
          case "inlineCode":
            return "code";
          case "blockquote":
            return "blockquote";
          case "no-style":
            return "span";
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return variant as React.ElementType;
          default:
            return "p";
        }
      })();

    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({ variant, color, weight, size }),
          className,
        )}
        {...props}
      >
        {text ?? children}
      </Component>
    );
  },
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
