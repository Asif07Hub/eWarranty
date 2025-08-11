import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Phone, Mail, MapPin, TrendingUp } from 'lucide-react';

export const Retailers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const retailers = [
    { 
      id: 'RT001', 
      name: 'AutoMart Central', 
      contact: 'Ahmad Khan', 
      phone: '+92-300-1234567', 
      email: 'ahmad@automart.pk',
      location: 'Lahore',
      status: 'active',
      monthlyOrders: 45,
      totalRevenue: 450000,
      performance: 'excellent'
    },
    { 
      id: 'RT002', 
      name: 'Power Zone Lahore', 
      contact: 'Sara Ali', 
      phone: '+92-301-2345678', 
      email: 'sara@powerzone.pk',
      location: 'Lahore',
      status: 'active',
      monthlyOrders: 38,
      totalRevenue: 380000,
      performance: 'good'
    },
    { 
      id: 'RT003', 
      name: 'Battery World', 
      contact: 'Hassan Sheikh', 
      phone: '+92-302-3456789', 
      email: 'hassan@batteryworld.pk',
      location: 'Karachi',
      status: 'active',
      monthlyOrders: 32,
      totalRevenue: 320000,
      performance: 'good'
    },
    { 
      id: 'RT004', 
      name: 'Tech Solutions', 
      contact: 'Fatima Malik', 
      phone: '+92-303-4567890', 
      email: 'fatima@techsol.pk',
      location: 'Islamabad',
      status: 'inactive',
      monthlyOrders: 12,
      totalRevenue: 120000,
      performance: 'poor'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      default: return 'outline';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'poor': return 'destructive';
      default: return 'outline';
    }
  };

  const filteredRetailers = retailers.filter(retailer =>
    retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    retailer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    retailer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Retailer Management" 
        description="Manage relationships with retail partners"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Retailer
          </Button>
        }
      />

      <Card>
          <CardHeader>
            <CardTitle>Retail Partners</CardTitle>
            <CardDescription>Monitor and manage your retail network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search retailers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Retailer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Monthly Orders</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRetailers.map((retailer) => (
                    <TableRow key={retailer.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{retailer.name}</p>
                          <p className="text-sm text-muted-foreground">{retailer.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{retailer.contact}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{retailer.phone}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span>{retailer.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{retailer.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-primary" />
                          <span>{retailer.monthlyOrders}</span>
                        </div>
                      </TableCell>
                      <TableCell>₨ {retailer.totalRevenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getPerformanceColor(retailer.performance)}>
                          {retailer.performance}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(retailer.status)}>
                          {retailer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
    </div>
  );
};