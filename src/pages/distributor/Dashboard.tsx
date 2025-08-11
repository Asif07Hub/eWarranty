import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, Store, TrendingUp, Users, AlertTriangle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const distributorMetrics = [
    { label: 'Current Stock', value: '3,456', icon: Package, change: '+12.3%' },
    { label: 'Retailers Served', value: '45', icon: Store, change: '+2' },
    { label: 'Monthly Sales', value: '2,134', icon: TrendingUp, change: '+18.5%' },
    { label: 'Active Orders', value: '23', icon: Truck, change: '-5%' }
  ];

  const topRetailers = [
    { name: 'AutoMart Central', orders: 45, revenue: '₨ 450,000', growth: '+15%' },
    { name: 'Power Zone Lahore', orders: 38, revenue: '₨ 380,000', growth: '+8%' },
    { name: 'Battery World', orders: 32, revenue: '₨ 320,000', growth: '+22%' },
    { name: 'Tech Solutions', orders: 29, revenue: '₨ 290,000', growth: '+5%' }
  ];

  const shelfLifeAlerts = [
    { product: 'VOLTA-VL120-45AH', quantity: 25, expiry: '2024-08-15', retailer: 'AutoMart Central' },
    { product: 'OSAKA-OS80-35AH', quantity: 15, expiry: '2024-08-22', retailer: 'Power Zone Lahore' },
    { product: 'FUJIKA-FK65-28AH', quantity: 12, expiry: '2024-09-01', retailer: 'Battery World' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Distributor Dashboard" 
        description="Monitor sales performance and retailer relationships"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {distributorMetrics.map((metric) => (
            <Card key={metric.label} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={metric.change.startsWith('+') ? 'text-success' : 'text-warning'}>
                    {metric.change}
                  </span>
                  {' '}from last month
                </p>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Top Performing Retailers
              </CardTitle>
              <CardDescription>Best retailers by sales volume this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRetailers.map((retailer, index) => (
                  <div key={retailer.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{retailer.name}</p>
                        <p className="text-sm text-muted-foreground">{retailer.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{retailer.revenue}</p>
                      <p className="text-sm text-success">{retailer.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Retailer Shelf Life Alerts
              </CardTitle>
              <CardDescription>Products requiring retailer attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shelfLifeAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
                    <div className="space-y-1">
                      <p className="font-medium">{alert.product}</p>
                      <p className="text-sm text-muted-foreground">
                        {alert.quantity} units at {alert.retailer}
                      </p>
                      <p className="text-xs text-warning font-medium">
                        Expires: {alert.expiry}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-warning text-warning">
                      Action Required
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};