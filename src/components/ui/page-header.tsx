import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  className
}) => {
  return (
    <div className={cn('flex items-center justify-between pb-6 border-b border-border', className)}>
      <div className="space-y-1">
        <h1 className="text-page-title font-heading text-foreground">{title}</h1>
        {description && (
          <p className="text-body text-secondary-foreground">{description}</p>
        )}
      </div>
      {action && (
        <div className="flex items-center space-x-2">
          {action}
        </div>
      )}
    </div>
  );
};