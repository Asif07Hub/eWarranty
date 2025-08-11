import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Clock, Package, Search, Filter, Bell, CheckCircle, XCircle } from 'lucide-react';

export const Alerts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const alerts = [
    {
      id: 'ALT-001',
      type: 'Shelf Life',
      priority: 'High',
      status: 'Active',
      productCode: 'VLT-12V-100AH',
      batchNumber: 'BT2024001',
      message: 'Products nearing expiry date (7 days remaining)',
      quantity: 45,
      location: 'Warehouse A - Zone 3',
      createdAt: '2024-01-15T10:30:00Z',
      dueDate: '2024-01-22T00:00:00Z',
    },
    {
      id: 'ALT-002',
      type: 'Low Stock',
      priority: 'Medium',
      status: 'Active',
      productCode: 'OSK-12V-75AH',
      batchNumber: 'BT2024015',
      message: 'Stock level below minimum threshold (20 units)',
      quantity: 15,
      location: 'Warehouse B - Zone 1',
      createdAt: '2024-01-14T15:45:00Z',
      dueDate: '2024-01-20T00:00:00Z',
    },
    {
      id: 'ALT-003',
      type: 'Temperature',
      priority: 'High',
      status: 'Resolved',
      productCode: 'FJK-12V-150AH',
      batchNumber: 'BT2024008',
      message: 'Storage temperature exceeded safe limits',
      quantity: 120,
      location: 'Warehouse C - Zone 2',
      createdAt: '2024-01-13T08:20:00Z',
      dueDate: '2024-01-16T00:00:00Z',
    },
    {
      id: 'ALT-004',
      type: 'Quality Check',
      priority: 'Low',
      status: 'Pending',
      productCode: 'SGA-6V-200AH',
      batchNumber: 'BT2024022',
      message: 'Scheduled quality inspection due',
      quantity: 80,
      location: 'Warehouse A - Zone 1',
      createdAt: '2024-01-12T14:10:00Z',
      dueDate: '2024-01-19T00:00:00Z',
    },
    {
      id: 'ALT-005',
      type: 'Shelf Life',
      priority: 'Critical',
      status: 'Active',
      productCode: 'VLT-12V-65AH',
      batchNumber: 'BT2024003',
      message: 'Products expired - require immediate attention',
      quantity: 28,
      location: 'Warehouse B - Zone 3',
      createdAt: '2024-01-11T09:30:00Z',
      dueDate: '2024-01-11T00:00:00Z',
    },
  ];

  const alertSummary = [
    { label: 'Critical Alerts', value: '3', icon: AlertTriangle, variant: 'destructive' as const },
    { label: 'High Priority', value: '8', icon: Clock, variant: 'warning' as const },
    { label: 'Medium Priority', value: '12', icon: Package, variant: 'default' as const },
    { label: 'Resolved Today', value: '5', icon: CheckCircle, variant: 'success' as const },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'warning';
      case 'resolved': return 'success';
      case 'pending': return 'info';
      default: return undefined;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || alert.priority.toLowerCase() === priorityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Warehouse Alerts"
        description="Monitor and manage warehouse alerts, shelf life notifications, and quality checks"
        action={
          <Button className="gap-2">
            <Bell className="h-4 w-4" />
            Mark All Read
          </Button>
        }
      />

      {/* Alert Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {alertSummary.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.label}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Alert Management</CardTitle>
          <CardDescription>
            Filter and manage warehouse alerts by priority and status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts by product code, batch, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <Badge variant={getPriorityColor(alert.priority) as any}>
                      {alert.priority}
                    </Badge>
                    <StatusBadge 
                      status={alert.status} 
                      variant={getStatusVariant(alert.status)}
                    />
                    <span className="text-sm text-muted-foreground">
                      Alert ID: {alert.id}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{alert.type} Alert</h3>
                    <p className="text-muted-foreground">{alert.message}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Product:</span>
                      <br />
                      {alert.productCode}
                    </div>
                    <div>
                      <span className="font-medium">Batch:</span>
                      <br />
                      {alert.batchNumber}
                    </div>
                    <div>
                      <span className="font-medium">Quantity:</span>
                      <br />
                      {alert.quantity} units
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <br />
                      {alert.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      Created: {new Date(alert.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      Due: {new Date(alert.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  {alert.status === 'Active' && (
                    <>
                      <Button size="sm" variant="default">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Resolve
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </>
                  )}
                  {alert.status === 'Pending' && (
                    <>
                      <Button size="sm" variant="trustBlue">
                        Take Action
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </>
                  )}
                  {alert.status === 'Resolved' && (
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
            <p className="text-muted-foreground text-center">
              No alerts match your current filter criteria. Try adjusting your search or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};