
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

export const PlatformClaimsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tenantFilter, setTenantFilter] = useState('all');
  const [selectedClaim, setSelectedClaim] = useState<any>(null);

  const claims = [
    {
      id: 'CLM-001',
      date: '2024-07-15',
      customer: 'Muhammad Ali',
      phone: '+92-300-1234567',
      tenant: 'PowerCell Industries',
      brand: 'Volta',
      product: 'VL120-45AH',
      serialNumber: 'VL120230001',
      purchaseDate: '2023-05-15',
      issue: 'Battery not holding charge',
      status: 'pending',
      priority: 'high',
      retailer: 'AutoMart Central'
    },
    {
      id: 'CLM-002',
      date: '2024-07-14',
      customer: 'Ayesha Khan',
      phone: '+92-301-2345678',
      tenant: 'EnergyMax Solutions',
      brand: 'Osaka',
      product: 'OS80-35AH',
      serialNumber: 'OS80230002',
      purchaseDate: '2023-08-20',
      issue: 'Physical damage to terminals',
      status: 'approved',
      priority: 'medium',
      retailer: 'Power Zone Lahore'
    },
    {
      id: 'CLM-003',
      date: '2024-07-13',
      customer: 'Ahmed Hassan',
      phone: '+92-302-3456789',
      tenant: 'BatteryTech Corp',
      brand: 'Fujika',
      product: 'FK65-28AH',
      serialNumber: 'FK65230003',
      purchaseDate: '2024-01-10',
      issue: 'Overheating during use',
      status: 'rejected',
      priority: 'low',
      retailer: 'Battery World'
    },
    {
      id: 'CLM-004',
      date: '2024-07-12',
      customer: 'Fatima Sheikh',
      phone: '+92-303-4567890',
      tenant: 'PowerCell Industries',
      brand: 'SAGA',
      product: 'SG100-40AH',
      serialNumber: 'SG100230004',
      purchaseDate: '2023-12-05',
      issue: 'Sudden power loss',
      status: 'processing',
      priority: 'high',
      retailer: 'Tech Solutions'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'default';
      case 'processing': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return AlertTriangle;
      case 'approved': return CheckCircle;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    const matchesTenant = tenantFilter === 'all' || claim.tenant === tenantFilter;
    return matchesSearch && matchesStatus && matchesTenant;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Claims Management" 
        description="Process and manage warranty claims across all tenant organizations"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Claims</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{claims.length}</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {claims.filter(c => c.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {claims.filter(c => c.status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {claims.filter(c => c.status === 'rejected').length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Warranty Claims</CardTitle>
          <CardDescription>Review and process customer warranty claims across all tenants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search claims..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tenantFilter} onValueChange={setTenantFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
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
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => {
                  const StatusIcon = getStatusIcon(claim.status);
                  return (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{claim.customer}</p>
                          <p className="text-xs text-muted-foreground">{claim.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{claim.tenant}</p>
                          <p className="text-xs text-muted-foreground">{claim.brand}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{claim.product}</p>
                          <p className="text-xs text-muted-foreground font-mono">{claim.serialNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-48 truncate">{claim.issue}</TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(claim.priority)}>
                          {claim.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(claim.status)} className="flex items-center gap-1 w-fit">
                          <StatusIcon className="h-3 w-3" />
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedClaim(claim)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Claim Details - {selectedClaim?.id}</DialogTitle>
                              <DialogDescription>
                                Review and process warranty claim
                              </DialogDescription>
                            </DialogHeader>
                            {selectedClaim && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Customer</Label>
                                    <p>{selectedClaim.customer}</p>
                                    <p className="text-sm text-muted-foreground">{selectedClaim.phone}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Tenant</Label>
                                    <p>{selectedClaim.tenant}</p>
                                    <p className="text-sm text-muted-foreground">{selectedClaim.brand}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Product</Label>
                                    <p>{selectedClaim.product}</p>
                                    <p className="text-sm text-muted-foreground font-mono">{selectedClaim.serialNumber}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Purchase Date</Label>
                                    <p>{selectedClaim.purchaseDate}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Retailer</Label>
                                    <p>{selectedClaim.retailer}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Issue Description</Label>
                                  <p className="mt-1">{selectedClaim.issue}</p>
                                </div>
                                <div>
                                  <Label htmlFor="admin-notes">Platform Admin Notes</Label>
                                  <Textarea 
                                    id="admin-notes" 
                                    placeholder="Add platform-level notes about this claim..."
                                    className="mt-2"
                                  />
                                </div>
                                <div className="flex gap-2 pt-4">
                                  <Button variant="default">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button variant="destructive">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button variant="outline">
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    Request More Info
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
