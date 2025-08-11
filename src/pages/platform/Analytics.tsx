
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Package, DollarSign, AlertTriangle,
  Download, Calendar, Filter, BarChart3, PieChart as PieChartIcon
} from 'lucide-react';

export const PlatformAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('3months');
  const [tenantFilter, setTenantFilter] = useState('all');

  // Sample data for platform-wide analytics
  const overviewMetrics = [
    { 
      label: 'Total Claims', 
      value: '12,847', 
      change: '+12.3%', 
      trend: 'up',
      icon: Package 
    },
    { 
      label: 'Active Users', 
      value: '28,945', 
      change: '+8.7%', 
      trend: 'up',
      icon: Users 
    },
    { 
      label: 'Platform Revenue', 
      value: '$527K', 
      change: '+15.2%', 
      trend: 'up',
      icon: DollarSign 
    },
    { 
      label: 'Pending Claims', 
      value: '456', 
      change: '+5.8%', 
      trend: 'up',
      icon: AlertTriangle 
    },
  ];

  const claimsData = [
    { month: 'Jan', approved: 1145, rejected: 123, pending: 67 },
    { month: 'Feb', approved: 1289, rejected: 154, pending: 89 },
    { month: 'Mar', approved: 1167, rejected: 128, pending: 75 },
    { month: 'Apr', approved: 1403, rejected: 181, pending: 92 },
    { month: 'May', approved: 1278, rejected: 131, pending: 88 },
    { month: 'Jun', approved: 1521, rejected: 198, pending: 104 },
  ];

  const tenantPerformance = [
    { name: 'PowerCell Industries', claims: 3247, revenue: 145200, satisfaction: 4.5 },
    { name: 'EnergyMax Solutions', claims: 2832, revenue: 128100, satisfaction: 4.3 },
    { name: 'BatteryTech Corp', claims: 1567, revenue: 78900, satisfaction: 4.1 },
    { name: 'AutoPower Systems', claims: 1201, revenue: 65800, satisfaction: 4.2 },
  ];

  const regionData = [
    { name: 'North America', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Europe', value: 28, color: 'hsl(var(--trust-blue))' },
    { name: 'Asia Pacific', value: 22, color: 'hsl(var(--energy-yellow))' },
    { name: 'Other', value: 5, color: 'hsl(var(--success))' },
  ];

  const platformTrends = [
    { month: 'Jan', tenants: 18, claims: 3145, users: 24567 },
    { month: 'Feb', tenants: 19, claims: 3289, users: 25234 },
    { month: 'Mar', tenants: 21, claims: 3167, users: 26789 },
    { month: 'Apr', tenants: 22, claims: 3403, users: 27456 },
    { month: 'May', tenants: 23, claims: 3278, users: 28123 },
    { month: 'Jun', tenants: 24, claims: 3521, users: 28945 },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Platform Analytics"
        description="Comprehensive analytics and insights across the entire eWarranty platform"
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Report
            </Button>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
        <Select value={tenantFilter} onValueChange={setTenantFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by tenant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tenants</SelectItem>
            <SelectItem value="powercell">PowerCell Industries</SelectItem>
            <SelectItem value="energymax">EnergyMax Solutions</SelectItem>
            <SelectItem value="batterytech">BatteryTech Corp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.label}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs flex items-center gap-1 ${
                metric.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {metric.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="claims" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="claims">Claims Analysis</TabsTrigger>
          <TabsTrigger value="tenants">Tenant Performance</TabsTrigger>
          <TabsTrigger value="regions">Regional Data</TabsTrigger>
          <TabsTrigger value="growth">Platform Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="claims" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Claims by Month
                </CardTitle>
                <CardDescription>
                  Monthly breakdown of approved, rejected, and pending claims across all tenants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={claimsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="approved" stackId="claims" fill="hsl(var(--success))" />
                      <Bar dataKey="rejected" stackId="claims" fill="hsl(var(--destructive))" />
                      <Bar dataKey="pending" stackId="claims" fill="hsl(var(--warning))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Claims Distribution
                </CardTitle>
                <CardDescription>
                  Current distribution of claim statuses across platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Approved', value: 78, color: 'hsl(var(--success))' },
                          { name: 'Under Review', value: 15, color: 'hsl(var(--warning))' },
                          { name: 'Rejected', value: 7, color: 'hsl(var(--destructive))' },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label
                      >
                        {[
                          { name: 'Approved', value: 78, color: 'hsl(var(--success))' },
                          { name: 'Under Review', value: 15, color: 'hsl(var(--warning))' },
                          { name: 'Rejected', value: 7, color: 'hsl(var(--destructive))' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tenants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Performance Comparison</CardTitle>
              <CardDescription>
                Claims volume, revenue impact, and customer satisfaction by tenant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {tenantPerformance.map((tenant) => (
                  <div key={tenant.name} className="flex items-center justify-between p-4 bg-card rounded-lg border">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{tenant.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {tenant.claims} claims • ${tenant.revenue.toLocaleString()} revenue
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{tenant.satisfaction}/5.0</div>
                      <div className="text-sm text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Distribution</CardTitle>
              <CardDescription>
                Platform usage distribution across different regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Growth Trends</CardTitle>
              <CardDescription>
                Monthly trends for tenants, claims, and user growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={platformTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stackId="1" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="claims" 
                      stackId="2" 
                      stroke="hsl(var(--trust-blue))" 
                      fill="hsl(var(--trust-blue))" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
