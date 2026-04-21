import * as React from "react"
import { cn } from "../lib/utils"

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty"
    className={cn(
      "cn-empty flex w-full min-w-0 flex-1 flex-col items-center justify-center text-center text-balance p-4",
      className
    )}
    {...props}
  />
))
Empty.displayName = "Empty"

const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-icon"
    className={cn(
      "cn-empty-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0 cn-empty-media-icon",
      className
    )}
    {...props}
  />
))
EmptyMedia.displayName = "EmptyMedia"

const EmptyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-header"
    className={cn("cn-empty-header flex max-w-sm flex-col items-center", className)}
    {...props}
  />
))
EmptyHeader.displayName = "EmptyHeader"

const EmptyTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-title"
    className={cn("cn-empty-title font-heading text-lg font-semibold", className)}
    {...props}
  />
))
EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="empty-description"
    className={cn(
      "cn-empty-description text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary text-sm",
      className
    )}
    {...props}
  />
))
EmptyDescription.displayName = "EmptyDescription"

const EmptyContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-content"
    className={cn(
      "cn-empty-content flex w-full max-w-sm min-w-0 flex-col items-center text-balance mt-4",
      className
    )}
    {...props}
  />
))
EmptyContent.displayName = "EmptyContent"

export { Empty, EmptyMedia, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent }
