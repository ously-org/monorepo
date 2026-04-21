import * as React from "react"
import { 
  Card as ShadcnCard, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "../internal/card-shadcn"
import { cn } from "../lib/utils"

export interface CardProps extends React.ComponentProps<typeof ShadcnCard> {
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: "default" | "sm"
  className?: string
}

/**
 * Flexible Card component for ODS.
 * If title, description, or footer is provided, it uses the "simple" layout.
 * Otherwise, it acts as a container for its children.
 */
export const Card = ({ title, description, children, footer, size = "default", className, ...props }: CardProps) => {
  const isSimpleLayout = title || description || footer

  return (
    <ShadcnCard size={size} className={cn(className)} {...props}>
      {isSimpleLayout ? (
        <>
          {(title || description) && (
            <CardHeader>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
          )}
          <CardContent>{children}</CardContent>
          {footer && <CardFooter>{footer}</CardFooter>}
        </>
      ) : (
        children
      )}
    </ShadcnCard>
  )
}

export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
