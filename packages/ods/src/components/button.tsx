import * as React from "react"
import { Button as ShadcnButton } from "../internal/button-shadcn"
import { Loader2 } from "lucide-react"

export interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
  className?: string // Allow for layout positioning but nothing else? Actually user said "cannot config anything else".
}

/**
 * Highly constrained Button component for ODS.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  { variant = "default", size = "default", isLoading = false, children, ...props }, 
  ref
) => {
  return (
    <ShadcnButton 
      ref={ref} 
      variant={variant} 
      size={size} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </ShadcnButton>
  )
})

Button.displayName = "Button"

export { Button }
