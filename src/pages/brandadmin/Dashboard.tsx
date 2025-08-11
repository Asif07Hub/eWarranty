import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/metric-card';
import { BarChart3, TrendingUp, Users, Package, AlertTriangle } from 'lucide-react';
import { useBrands } from '@/contexts/BrandContext';

const BrandAdminDashboard = () => {
  const { activeBrand } = useBrands();

  const stats = [
    {
      title: 'Active Warranties',
      value: '2,847',
      change: '+12.5% from last month',
      icon: Package,
      iconColor: 'text-primary'
    },
    {
      title: 'Claims This Month',
      value: '23',
      change: '-8.2% from last month',
      icon: AlertTriangle,
      iconColor: 'text-destructive'
    },
    {
      title: 'Distributors',
      value: '45',
      change: '+2 from last month',
      icon: Users,
      iconColor: 'text-success'
    },
    {
      title: 'Revenue',
      value: '₨12.4M',
      change: '+18.7% from last month',
      icon: TrendingUp,
      iconColor: 'text-info'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${activeBrand?.displayName || 'Brand'} Dashboard`}
        description="Monitor your brand's warranty performance and analytics"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <MetricCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            change={stat.change}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Warranty Claims Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Chart Component Placeholder
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Distributor Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Chart Component Placeholder
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: '2 hours ago', activity: 'New warranty claim submitted for battery #VT-2024-001' },
              { time: '4 hours ago', activity: 'Distributor ABC Electronics added 50 new batteries to inventory' },
              { time: '6 hours ago', activity: 'Quality inspection completed for batch #BT-2024-15' },
              { time: '1 day ago', activity: 'Claim #CL-2024-089 approved and processed' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">{item.activity}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandAdminDashboard;