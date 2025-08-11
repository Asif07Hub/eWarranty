import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant,
  className
}) => {
  const getVariantStyles = () => {
    if (variant) {
      return {
        success: 'bg-success/10 text-success border-success/20',
        warning: 'bg-warning/10 text-warning border-warning/20',
        error: 'bg-destructive/10 text-destructive border-destructive/20',
        info: 'bg-primary/10 text-primary border-primary/20'
      }[variant];
    }

    // Auto-detect based on status text
    const statusLower = status.toLowerCase();
    if (statusLower.includes('approved') || statusLower.includes('active') || statusLower.includes('completed')) {
      return 'bg-success/10 text-success border-success/20';
    }
    if (statusLower.includes('pending') || statusLower.includes('review') || statusLower.includes('warning')) {
      return 'bg-warning/10 text-warning border-warning/20';
    }
    if (statusLower.includes('rejected') || statusLower.includes('failed') || statusLower.includes('error')) {
      return 'bg-destructive/10 text-destructive border-destructive/20';
    }
    return 'bg-muted/50 text-muted-foreground border-border';
  };

  return (
    <span className={cn(
      'inline-flex px-2 py-1 rounded-full text-xs font-medium border',
      getVariantStyles(),
      className
    )}>
      {status}
    </span>
  );
};