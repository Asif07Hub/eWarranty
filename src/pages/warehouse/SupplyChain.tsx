import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Truck, Package, MapPin, Clock, TrendingUp, AlertTriangle,
  Search, Filter, Download, RefreshCw, Route, Warehouse
} from 'lucide-react';

export const SupplyChain: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  const supplyChainMetrics = [
    { label: 'Active Shipments', value: '234', icon: Truck, change: '+12 today' },
    { label: 'Avg Delivery Time', value: '2.3 days', icon: Clock, change: '-0.2 days' },
    { label: 'On-Time Delivery', value: '94.2%', icon: TrendingUp, change: '+2.1%' },
    { label: 'Pending Orders', value: '45', icon: Package, change: '-8 from yesterday' },
  ];

  const shipments = [
    {
      id: 'SH-2024-001',
      origin: 'Central Warehouse - Lahore',
      destination: 'Karachi Regional Hub',
      products: [
        { name: 'Volta 12V 100AH', quantity: 150 },
        { name: 'Osaka 12V 75AH', quantity: 100 }
      ],
      status: 'In Transit',
      progress: 65,
      estimatedDelivery: '2024-01-18T14:00:00Z',
      actualDelivery: null,
      carrier: 'National Logistics',
      trackingNumber: 'NL123456789',
      priority: 'High'
    },
    {
      id: 'SH-2024-002',
      origin: 'Central Warehouse - Lahore',
      destination: 'Islamabad Auto Parts Store',
      products: [
        { name: 'Fujika 12V 150AH', quantity: 75 },
        { name: 'Saga 6V 200AH', quantity: 50 }
      ],
      status: 'Delivered',
      progress: 100,
      estimatedDelivery: '2024-01-16T10:00:00Z',
      actualDelivery: '2024-01-16T09:45:00Z',
      carrier: 'Express Delivery Co.',
      trackingNumber: 'ED987654321',
      priority: 'Normal'
    },
    {
      id: 'SH-2024-003',
      origin: 'Regional Hub - Karachi',
      destination: 'Peshawar Battery Center',
      products: [
        { name: 'Volta 12V 65AH', quantity: 200 }
      ],
      status: 'Preparing',
      progress: 15,
      estimatedDelivery: '2024-01-20T16:00:00Z',
      actualDelivery: null,
      carrier: 'Fast Track Logistics',
      trackingNumber: 'FT456789123',
      priority: 'Low'
    },
    {
      id: 'SH-2024-004',
      origin: 'Central Warehouse - Lahore',
      destination: 'Multan Distribution Center',
      products: [
        { name: 'Osaka 12V 100AH', quantity: 120 },
        { name: 'Volta 12V 75AH', quantity: 80 }
      ],
      status: 'Delayed',
      progress: 30,
      estimatedDelivery: '2024-01-17T12:00:00Z',
      actualDelivery: null,
      carrier: 'Regional Transport',
      trackingNumber: 'RT789123456',
      priority: 'High'
    }
  ];

  const regions = [
    { 
      name: 'Karachi Region',
      activeShipments: 12,
      avgDeliveryTime: '2.1 days',
      onTimeRate: '96%',
      totalVolume: '1,234 units',
      status: 'excellent'
    },
    { 
      name: 'Lahore Region',
      activeShipments: 8,
      avgDeliveryTime: '1.8 days',
      onTimeRate: '98%',
      totalVolume: '987 units',
      status: 'excellent'
    },
    { 
      name: 'Islamabad Region',
      activeShipments: 15,
      avgDeliveryTime: '2.5 days',
      onTimeRate: '92%',
      totalVolume: '756 units',
      status: 'good'
    },
    { 
      name: 'Peshawar Region',
      activeShipments: 6,
      avgDeliveryTime: '3.2 days',
      onTimeRate: '87%',
      totalVolume: '432 units',
      status: 'needs-attention'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'in transit': return 'info';
      case 'preparing': return 'warning';
      case 'delayed': return 'error';
      default: return 'info';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'normal': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getRegionStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'info';
      case 'needs-attention': return 'warning';
      default: return 'info';
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Supply Chain Management"
        description="Monitor and manage product distribution, shipments, and regional performance"
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        }
      />

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {supplyChainMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.label}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="shipments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="shipments">Active Shipments</TabsTrigger>
          <TabsTrigger value="regions">Regional Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="shipments" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Shipment Tracking</CardTitle>
              <CardDescription>
                Monitor all active shipments and deliveries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by shipment ID, destination, or tracking number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="in transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Shipments List */}
          <div className="space-y-4">
            {filteredShipments.map((shipment) => (
              <Card key={shipment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{shipment.id}</Badge>
                          <StatusBadge 
                            status={shipment.status} 
                            variant={getStatusColor(shipment.status)}
                          />
                          <Badge variant={getPriorityColor(shipment.priority) as any}>
                            {shipment.priority} Priority
                          </Badge>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {shipment.origin} → {shipment.destination}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Tracking: {shipment.trackingNumber} • Carrier: {shipment.carrier}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Route className="h-4 w-4 mr-2" />
                        Track
                      </Button>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Delivery Progress</span>
                        <span>{shipment.progress}%</span>
                      </div>
                      <Progress value={shipment.progress} className="w-full" />
                    </div>

                    {/* Products */}
                    <div>
                      <h4 className="font-medium mb-2">Products ({shipment.products.length} types)</h4>
                      <div className="flex flex-wrap gap-2">
                        {shipment.products.map((product, index) => (
                          <Badge key={index} variant="secondary">
                            {product.name}: {product.quantity} units
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Estimated Delivery:</span>
                        <br />
                        {new Date(shipment.estimatedDelivery).toLocaleString()}
                      </div>
                      {shipment.actualDelivery && (
                        <div>
                          <span className="font-medium">Actual Delivery:</span>
                          <br />
                          {new Date(shipment.actualDelivery).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance Overview</CardTitle>
              <CardDescription>
                Distribution performance metrics by geographic region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {regions.map((region) => (
                  <Card key={region.name} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{region.name}</CardTitle>
                        <StatusBadge 
                          status={region.status.replace('-', ' ')} 
                          variant={getRegionStatusColor(region.status)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-primary">{region.activeShipments}</div>
                          <div className="text-muted-foreground">Active Shipments</div>
                        </div>
                        <div>
                          <div className="font-medium text-trust-blue">{region.avgDeliveryTime}</div>
                          <div className="text-muted-foreground">Avg Delivery</div>
                        </div>
                        <div>
                          <div className="font-medium text-success">{region.onTimeRate}</div>
                          <div className="text-muted-foreground">On-Time Rate</div>
                        </div>
                        <div>
                          <div className="font-medium">{region.totalVolume}</div>
                          <div className="text-muted-foreground">Total Volume</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Performance Trends</CardTitle>
                <CardDescription>
                  Monthly delivery performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                    <div>
                      <div className="font-medium">January 2024</div>
                      <div className="text-sm text-muted-foreground">1,247 deliveries</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-success">94.2%</div>
                      <div className="text-sm text-muted-foreground">On-time</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                    <div>
                      <div className="font-medium">December 2023</div>
                      <div className="text-sm text-muted-foreground">1,156 deliveries</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-warning">89.7%</div>
                      <div className="text-sm text-muted-foreground">On-time</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                    <div>
                      <div className="font-medium">November 2023</div>
                      <div className="text-sm text-muted-foreground">1,089 deliveries</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-success">91.3%</div>
                      <div className="text-sm text-muted-foreground">On-time</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization</CardTitle>
                <CardDescription>
                  Shipping cost analysis and optimization opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Average cost per delivery</span>
                    <span className="font-bold">₨ 450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cost per unit shipped</span>
                    <span className="font-bold">₨ 18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fuel efficiency improvement</span>
                    <span className="font-bold text-success">+12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Route optimization savings</span>
                    <span className="font-bold text-success">₨ 25,000/month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};