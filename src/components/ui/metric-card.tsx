
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor = 'text-primary',
  change,
  trend = 'neutral',
  className = ''
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className={cn(
      'group relative overflow-hidden bg-gradient-card shadow-elegant border-border/50 hover:shadow-glow transition-all duration-300 hover-scale',
      className
    )}>
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-small font-medium text-muted-foreground">
              {title}
            </p>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground font-heading">
                {value}
              </p>
              {change && (
                <div className="flex items-center space-x-1">
                  <span className={cn('text-small font-medium', getTrendColor())}>
                    {change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-3 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 group-hover:scale-110 transition-transform duration-300">
                <Icon className={cn('h-6 w-6', iconColor)} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </CardContent>
    </Card>
  );
};
