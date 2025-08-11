
import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/metric-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Building2, Users, Globe, TrendingUp, Server, Shield } from 'lucide-react';

const PlatformDashboard = () => {
  const stats = [
    {
      title: 'Active Tenants',
      value: '24',
      icon: Building2,
      iconColor: 'text-primary',
    },
    {
      title: 'Total Users',
      value: '1,247',
      icon: Users,
      iconColor: 'text-success',
    },
    {
      title: 'Global Claims',
      value: '5,832',
      icon: Globe,
      iconColor: 'text-warning',
    },
    {
      title: 'System Health',
      value: '99.9%',
      icon: Server,
      iconColor: 'text-info',
    },
  ];

  const recentTenants = [
    { id: '1', name: 'PowerCell Industries', subdomain: 'powercell', status: 'Active', users: 45 },
    { id: '2', name: 'EnergyMax Solutions', subdomain: 'energymax', status: 'Active', users: 32 },
    { id: '3', name: 'BatteryTech Corp', subdomain: 'batterytech', status: 'Pending', users: 12 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Management"
        description="Manage the eWarranty platform and all tenant organizations"
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
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tenants */}
        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Recent Tenants</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTenants.map((tenant) => (
                <div key={tenant.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{tenant.name}</p>
                    <p className="text-xs text-muted-foreground">{tenant.subdomain}.ewarranty.pk</p>
                  </div>
                  <div className="text-right space-y-1">
                    <StatusBadge status={tenant.status} />
                    <p className="text-xs text-muted-foreground">{tenant.users} users</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="font-medium">Database</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="font-medium">API Services</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="font-medium">Storage</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>Operational</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformDashboard;
