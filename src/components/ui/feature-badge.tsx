import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const featureBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 body-small font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success: "border-transparent bg-accent-success text-white",
        warning: "border-transparent bg-accent-warning text-white",
        error: "border-transparent bg-accent-error text-white",
        outline: "border-border text-foreground hover:bg-accent hover:text-accent-foreground",
        gradient: "border-transparent bg-gradient-primary text-primary-foreground shadow-glow",
        glass: "glass border-border/50 text-foreground backdrop-blur-sm",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface FeatureBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureBadgeVariants> {
  icon?: React.ReactNode
}

function FeatureBadge({ className, variant, size, icon, children, ...props }: FeatureBadgeProps) {
  return (
    <div className={cn(featureBadgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </div>
  )
}

export { FeatureBadge, featureBadgeVariants }