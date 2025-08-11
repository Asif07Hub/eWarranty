
import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Building2, Plus, Users, Calendar } from 'lucide-react';

const TenantManagement = () => {
  const tenants = [
    {
      id: '1',
      name: 'PowerCell Industries',
      subdomain: 'powercell',
      status: 'Active',
      users: 45,
      plan: 'Enterprise',
      createdAt: '2024-01-15',
      industry: 'Automotive Batteries'
    },
    {
      id: '2',
      name: 'EnergyMax Solutions',
      subdomain: 'energymax',
      status: 'Active',
      users: 32,
      plan: 'Professional',
      createdAt: '2024-01-20',
      industry: 'Industrial Batteries'
    },
    {
      id: '3',
      name: 'BatteryTech Corp',
      subdomain: 'batterytech',
      status: 'Pending',
      users: 12,
      plan: 'Starter',
      createdAt: '2024-01-25',
      industry: 'Consumer Electronics'
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tenant Management"
        description="Manage all tenant organizations on the platform"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Tenant
          </Button>
        }
      />

      <Card className="bg-gradient-card shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>All Tenants</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tenants.map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{tenant.name}</h3>
                    <p className="text-sm text-muted-foreground">{tenant.subdomain}.ewarranty.pk</p>
                    <p className="text-xs text-muted-foreground">{tenant.industry}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{tenant.users}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Users</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{tenant.createdAt}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Created</p>
                  </div>
                  
                  <div className="text-center">
                    <StatusBadge status={tenant.status} />
                    <p className="text-xs text-muted-foreground mt-1">{tenant.plan}</p>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantManagement;
