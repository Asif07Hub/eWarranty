import * as React from "react"
import { cn } from "@/lib/utils"

const GradientCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "glass" | "elevated" | "premium"
    interactive?: boolean
  }
>(({ className, variant = "default", interactive = false, ...props }, ref) => {
  const variants = {
    default: "bg-gradient-card border shadow-soft",
    glass: "glass shadow-medium",
    elevated: "bg-card border shadow-elegant hover:shadow-glow transition-shadow duration-300",
    premium: "bg-gradient-primary text-primary-foreground shadow-glow"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg p-6",
        variants[variant],
        interactive && "interactive cursor-pointer",
        className
      )}
      {...props}
    />
  )
})
GradientCard.displayName = "GradientCard"

const GradientCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-6", className)}
    {...props}
  />
))
GradientCardHeader.displayName = "GradientCardHeader"

const GradientCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("heading-4", className)}
    {...props}
  />
))
GradientCardTitle.displayName = "GradientCardTitle"

const GradientCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("body-small text-muted-foreground", className)}
    {...props}
  />
))
GradientCardDescription.displayName = "GradientCardDescription"

const GradientCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
GradientCardContent.displayName = "GradientCardContent"

const GradientCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-6", className)}
    {...props}
  />
))
GradientCardFooter.displayName = "GradientCardFooter"

export { 
  GradientCard, 
  GradientCardHeader, 
  GradientCardFooter, 
  GradientCardTitle, 
  GradientCardDescription, 
  GradientCardContent 
}