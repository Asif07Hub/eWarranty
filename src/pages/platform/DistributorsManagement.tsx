
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, Edit, Trash2, Users, MapPin, Phone, Mail, Building2 } from 'lucide-react';

export const PlatformDistributorsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tenantFilter, setTenantFilter] = useState('all');
  const [isAddDistributorOpen, setIsAddDistributorOpen] = useState(false);

  const distributors = [
    {
      id: 'DIST-001',
      name: 'Metro Auto Distributors',
      contact: 'Tariq Ahmad',
      phone: '+92-300-1234567',
      email: 'tariq@metroauto.pk',
      location: 'Lahore',
      tenant: 'PowerCell Industries',
      brands: ['Volta', 'Osaka'],
      status: 'active',
      retailers: 25,
      monthlyVolume: 2500,
      performance: 'excellent'
    },
    {
      id: 'DIST-002',
      name: 'Power Solutions Hub',
      contact: 'Sadia Khan',
      phone: '+92-301-2345678',
      email: 'sadia@powersolutions.pk',
      location: 'Karachi',
      tenant: 'EnergyMax Solutions',
      brands: ['Fujika', 'SAGA'],
      status: 'active',
      retailers: 18,
      monthlyVolume: 1800,
      performance: 'good'
    },
    {
      id: 'DIST-003',
      name: 'Elite Battery Network',
      contact: 'Hassan Ali',
      phone: '+92-302-3456789',
      email: 'hassan@elitebattery.pk',
      location: 'Islamabad',
      tenant: 'BatteryTech Corp',
      brands: ['Volta', 'Fujika', 'Osaka', 'SAGA'],
      status: 'active',
      retailers: 32,
      monthlyVolume: 3200,
      performance: 'excellent'
    },
    {
      id: 'DIST-004',
      name: 'City Auto Parts',
      contact: 'Fatima Sheikh',
      phone: '+92-303-4567890',
      email: 'fatima@cityauto.pk',
      location: 'Faisalabad',
      tenant: 'PowerCell Industries',
      brands: ['Osaka'],
      status: 'inactive',
      retailers: 8,
      monthlyVolume: 400,
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

  const filteredDistributors = distributors.filter(distributor => {
    const matchesSearch = distributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         distributor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         distributor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         distributor.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTenant = tenantFilter === 'all' || distributor.tenant === tenantFilter;
    return matchesSearch && matchesTenant;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Distributors Management" 
        description="Manage distributor network across all tenant organizations"
        action={
          <Dialog open={isAddDistributorOpen} onOpenChange={setIsAddDistributorOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Distributor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Distributor</DialogTitle>
                <DialogDescription>
                  Register a new distributor to the platform network
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="dist-name">Company Name</Label>
                  <Input id="dist-name" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input id="contact-person" placeholder="Contact person name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+92-XXX-XXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="email@company.pk" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenant">Tenant Organization</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="powercell">PowerCell Industries</SelectItem>
                      <SelectItem value="energymax">EnergyMax Solutions</SelectItem>
                      <SelectItem value="batterytech">BatteryTech Corp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lahore">Lahore</SelectItem>
                      <SelectItem value="karachi">Karachi</SelectItem>
                      <SelectItem value="islamabad">Islamabad</SelectItem>
                      <SelectItem value="faisalabad">Faisalabad</SelectItem>
                      <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDistributorOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDistributorOpen(false)}>
                  Add Distributor
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Distributors</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{distributors.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {distributors.filter(d => d.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently operating</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Retailers</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {distributors.reduce((sum, d) => sum + d.retailers, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Network reach</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Volume</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {distributors.reduce((sum, d) => sum + d.monthlyVolume, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Units distributed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Distributor Network</CardTitle>
          <CardDescription>Manage distributor partnerships and performance across all tenants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search distributors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={tenantFilter} onValueChange={setTenantFilter}>
              <SelectTrigger className="w-48">
                <Building2 className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by tenant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tenants</SelectItem>
                <SelectItem value="PowerCell Industries">PowerCell Industries</SelectItem>
                <SelectItem value="EnergyMax Solutions">EnergyMax Solutions</SelectItem>
                <SelectItem value="BatteryTech Corp">BatteryTech Corp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Distributor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Brands</TableHead>
                  <TableHead>Retailers</TableHead>
                  <TableHead>Monthly Volume</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDistributors.map((distributor) => (
                  <TableRow key={distributor.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{distributor.name}</p>
                        <p className="text-sm text-muted-foreground">{distributor.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{distributor.contact}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{distributor.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{distributor.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <span>{distributor.tenant}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>{distributor.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {distributor.brands.map((brand) => (
                          <Badge key={brand} variant="outline" className="text-xs">
                            {brand}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{distributor.retailers}</TableCell>
                    <TableCell>{distributor.monthlyVolume.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getPerformanceColor(distributor.performance)}>
                        {distributor.performance}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(distributor.status)}>
                        {distributor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
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
