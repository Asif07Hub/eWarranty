import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, ShoppingCart, Users, TrendingUp, Clock, DollarSign } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const retailerMetrics = [
    { label: 'Current Stock', value: '234', icon: Package, change: '+8.2%' },
    { label: 'Daily Sales', value: '18', icon: ShoppingCart, change: '+15.3%' },
    { label: 'Active Customers', value: '156', icon: Users, change: '+12%' },
    { label: 'Monthly Revenue', value: '₨ 125K', icon: DollarSign, change: '+22.7%' }
  ];

  const recentSales = [
    { id: 'SAL-001', customer: 'Muhammad Ali', product: 'VOLTA-VL120-45AH', amount: 15000, time: '2 hours ago' },
    { id: 'SAL-002', customer: 'Ayesha Khan', product: 'OSAKA-OS80-35AH', amount: 12000, time: '4 hours ago' },
    { id: 'SAL-003', customer: 'Ahmed Hassan', product: 'FUJIKA-FK65-28AH', amount: 9500, time: '6 hours ago' },
    { id: 'SAL-004', customer: 'Fatima Sheikh', product: 'SAGA-SG100-40AH', amount: 13500, time: '8 hours ago' }
  ];

  const lowStockItems = [
    { product: 'VOLTA-VL150-55AH', current: 5, minimum: 10, status: 'critical' },
    { product: 'OSAKA-OS100-40AH', current: 8, minimum: 15, status: 'low' },
    { product: 'FUJIKA-FK80-32AH', current: 12, minimum: 20, status: 'low' }
  ];

  const topProducts = [
    { name: 'VOLTA-VL120-45AH', sales: 45, revenue: '₨ 675,000' },
    { name: 'OSAKA-OS80-35AH', sales: 32, revenue: '₨ 384,000' },
    { name: 'FUJIKA-FK65-28AH', sales: 28, revenue: '₨ 266,000' },
    { name: 'SAGA-SG100-40AH', sales: 25, revenue: '₨ 337,500' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Retailer Dashboard" 
        description="Monitor sales performance and inventory levels"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {retailerMetrics.map((metric) => (
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
                  {' '}from last week
                </p>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Recent Sales
              </CardTitle>
              <CardDescription>Latest customer purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="font-medium">{sale.customer}</p>
                      <p className="text-sm text-muted-foreground">{sale.product}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{sale.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₨ {sale.amount.toLocaleString()}</p>
                      <Badge variant="secondary">{sale.id}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-warning" />
                Low Stock Alert
              </CardTitle>
              <CardDescription>Items requiring restocking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
                    <div className="space-y-1">
                      <p className="font-medium">{item.product}</p>
                      <p className="text-sm text-muted-foreground">
                        Current: {item.current} | Minimum: {item.minimum}
                      </p>
                    </div>
                    <Badge variant={item.status === 'critical' ? 'destructive' : 'default'}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
        </Card>
      </div>

      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Performing Products
            </CardTitle>
            <CardDescription>Best sellers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">#{index + 1}</span>
                    <Badge variant="outline">{product.sales} sold</Badge>
                  </div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-lg font-bold text-primary">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
};