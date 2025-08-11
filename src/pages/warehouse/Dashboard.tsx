import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, AlertTriangle, TrendingUp, Clock, MapPin } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const warehouseMetrics = [
    { label: 'Total Inventory', value: '12,543', icon: Package, change: '+5.2%' },
    { label: 'Pending Shipments', value: '89', icon: Truck, change: '-2.1%' },
    { label: 'Shelf Life Alerts', value: '23', icon: AlertTriangle, change: '+12%' },
    { label: 'Monthly Throughput', value: '8,234', icon: TrendingUp, change: '+8.7%' }
  ];

  const recentAlerts = [
    { id: 1, item: 'VOLTA-VL120-45AH', location: 'A-12-B', expiry: '2024-08-15', severity: 'high' },
    { id: 2, item: 'OSAKA-OS80-35AH', location: 'B-05-C', expiry: '2024-08-22', severity: 'medium' },
    { id: 3, item: 'FUJIKA-FK65-28AH', location: 'C-08-A', expiry: '2024-09-01', severity: 'low' }
  ];

  const recentShipments = [
    { id: 'SH-001', distributor: 'Metro Distributors', items: 150, status: 'In Transit' },
    { id: 'SH-002', distributor: 'City Auto Parts', items: 89, status: 'Delivered' },
    { id: 'SH-003', distributor: 'Power Solutions', items: 234, status: 'Preparing' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
          title="Warehouse Dashboard" 
          description="Monitor inventory, shipments, and supply chain operations"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {warehouseMetrics.map((metric) => (
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
                <AlertTriangle className="h-5 w-5 text-warning" />
                Shelf Life Alerts
              </CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="font-medium">{alert.item}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>Expires: {alert.expiry}</span>
                      </div>
                    </div>
                    <Badge variant={
                      alert.severity === 'high' ? 'destructive' : 
                      alert.severity === 'medium' ? 'default' : 'secondary'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Recent Shipments
              </CardTitle>
              <CardDescription>Latest outbound deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentShipments.map((shipment) => (
                  <div key={shipment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="font-medium">{shipment.id}</p>
                      <p className="text-sm text-muted-foreground">{shipment.distributor}</p>
                      <p className="text-xs text-muted-foreground">{shipment.items} items</p>
                    </div>
                    <Badge variant={
                      shipment.status === 'Delivered' ? 'default' :
                      shipment.status === 'In Transit' ? 'secondary' : 'outline'
                    }>
                      {shipment.status}
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