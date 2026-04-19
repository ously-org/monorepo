import * as React from "react"
import { 
  Card as ShadcnCard, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "../internal/card-shadcn"

export interface CardProps {
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: "default" | "sm"
}

/**
 * Highly constrained Card component for ODS.
 * Only exposes title, description, children, footer, and size.
 */
export const Card = ({ title, description, children, footer, size = "default" }: CardProps) => (
  <ShadcnCard size={size}>
    {(title || description) && (
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    )}
    <CardContent>{children}</CardContent>
    {footer && <CardFooter>{footer}</CardFooter>}
  </ShadcnCard>
)
