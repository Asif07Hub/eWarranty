import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Package, Zap, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

const ManufacturingDashboard = () => {
  const stats = [
    {
      title: 'Active Batches',
      value: '12',
      change: '+2 today',
      icon: Package,
      color: 'text-brand-volta'
    },
    {
      title: 'QR Codes Generated',
      value: '1,247',
      change: '+89 today',
      icon: QrCode,
      color: 'text-brand-osaka'
    },
    {
      title: 'Production Line Status',
      value: '92%',
      change: 'Efficiency',
      icon: Activity,
      color: 'text-brand-fujika'
    },
    {
      title: 'Quality Issues',
      value: '3',
      change: 'Pending review',
      icon: AlertTriangle,
      color: 'text-destructive'
    }
  ];

  const recentBatches = [
    {
      id: 'BT-2024-018',
      product: 'Volta 70Ah AGM',
      quantity: 150,
      status: 'In Production',
      startDate: '2024-01-15',
      qrGenerated: 89
    },
    {
      id: 'BT-2024-017',
      product: 'Osaka 100Ah Gel',
      quantity: 200,
      status: 'QR Generation',
      startDate: '2024-01-14',
      qrGenerated: 200
    },
    {
      id: 'BT-2024-016',
      product: 'Fujika 45Ah Lead',
      quantity: 100,
      status: 'Completed',
      startDate: '2024-01-13',
      qrGenerated: 100
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'In Production': 'bg-blue-100 text-blue-800',
      'QR Generation': 'bg-orange-100 text-orange-800',
      'Completed': 'bg-emerald-100 text-emerald-800',
      'Quality Check': 'bg-purple-100 text-purple-800'
    };
    return <Badge className={statusColors[status as keyof typeof statusColors]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manufacturing Dashboard"
        description="Monitor production lines, batch management, and QR code generation"
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              New Batch
            </Button>
            <Button>
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR Codes
            </Button>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gradient-card shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Production Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Production Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Production Efficiency Chart Placeholder
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Real-time Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Line 1 - Volta AGM</span>
                <Badge className="bg-emerald-100 text-emerald-800">Running</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Line 2 - Osaka Gel</span>
                <Badge className="bg-emerald-100 text-emerald-800">Running</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Line 3 - Fujika Lead</span>
                <Badge className="bg-orange-100 text-orange-800">Maintenance</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">QR Station</span>
                <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Batches */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardHeader>
          <CardTitle>Recent Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBatches.map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{batch.id}</p>
                    <p className="text-sm text-muted-foreground">{batch.product}</p>
                    <p className="text-xs text-muted-foreground">Started: {batch.startDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusBadge(batch.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    QR: {batch.qrGenerated}/{batch.quantity}
                  </p>
                  <p className="text-sm font-medium">Qty: {batch.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManufacturingDashboard;