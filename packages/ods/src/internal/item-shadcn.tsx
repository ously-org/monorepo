import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const itemVariants = cva(
  "cn-item group/item flex w-full flex-wrap transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors",
  {
    variants: {
      variant: {
        default: "cn-item-variant-default",
        muted: "cn-item-variant-muted",
      },
      size: {
        default: "cn-item-size-default flex-col items-stretch",
        sm: "cn-item-size-sm items-center gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
)
Item.displayName = "Item"

const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-content"
    className={cn("cn-item-content flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none gap-1", className)}
    {...props}
  />
))
ItemContent.displayName = "ItemContent"

const ItemTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-title"
    className={cn("cn-item-title line-clamp-1 flex w-fit items-center", className)}
    {...props}
  />
))
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="item-description"
    className={cn("cn-item-description line-clamp-2 [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary text-xs font-medium tracking-wider text-muted-foreground uppercase", className)}
    {...props}
  />
))
ItemDescription.displayName = "ItemDescription"

export { Item, ItemContent, ItemTitle, ItemDescription }
