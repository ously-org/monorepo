import * as React from "react"
import { Button as ShadcnButton } from "../internal/button-shadcn"
import { Loader2, LucideIcon } from "lucide-react"
import { cn } from "../lib/utils"

export interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
  className?: string
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
}

/**
 * Premium ODS Button component.
 * Wraps Shadcn UI with micro-interactions and standardized icon support.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  { 
    variant = "default", 
    size = "default", 
    isLoading = false, 
    children, 
    className,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    ...props 
  }, 
  ref
) => {
  return (
    <ShadcnButton 
      ref={ref} 
      variant={variant} 
      size={size} 
      disabled={isLoading || props.disabled}
      className={cn(
        "active:scale-[0.98] transition-all duration-200 font-medium",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        LeftIcon && <LeftIcon className="mr-2 h-4 w-4" />
      )}
      {children}
      {!isLoading && RightIcon && <RightIcon className="ml-2 h-4 w-4" />}
    </ShadcnButton>
  )
})

Button.displayName = "Button"

export { Button }
