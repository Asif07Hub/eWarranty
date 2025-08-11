import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Package, QrCode, Eye, Calendar } from 'lucide-react';

const BatchManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const batches = [
    {
      id: 'BT-2024-018',
      product: 'Volta 70Ah AGM',
      brand: 'Volta',
      quantity: 150,
      status: 'In Production',
      startDate: '2024-01-15',
      expectedCompletion: '2024-01-20',
      qrGenerated: 89,
      serialRange: 'VT24150001-VT24150150'
    },
    {
      id: 'BT-2024-017',
      product: 'Osaka 100Ah Gel',
      brand: 'Osaka',
      quantity: 200,
      status: 'QR Generation',
      startDate: '2024-01-14',
      expectedCompletion: '2024-01-18',
      qrGenerated: 200,
      serialRange: 'OS24100001-OS24100200'
    },
    {
      id: 'BT-2024-016',
      product: 'Fujika 45Ah Lead',
      brand: 'Fujika',
      quantity: 100,
      status: 'Completed',
      startDate: '2024-01-13',
      expectedCompletion: '2024-01-17',
      qrGenerated: 100,
      serialRange: 'FJ24045001-FJ24045100'
    },
    {
      id: 'BT-2024-015',
      product: 'SAGA 85Ah Hybrid',
      brand: 'SAGA',
      quantity: 120,
      status: 'Quality Check',
      startDate: '2024-01-12',
      expectedCompletion: '2024-01-16',
      qrGenerated: 120,
      serialRange: 'SG24085001-SG24085120'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'In Production': 'bg-blue-100 text-blue-800',
      'QR Generation': 'bg-orange-100 text-orange-800',
      'Completed': 'bg-emerald-100 text-emerald-800',
      'Quality Check': 'bg-purple-100 text-purple-800',
      'Planning': 'bg-gray-100 text-gray-800'
    };
    return <Badge className={statusColors[status as keyof typeof statusColors]}>{status}</Badge>;
  };

  const getBrandColor = (brand: string) => {
    const brandColors = {
      'Volta': 'text-brand-volta',
      'Osaka': 'text-brand-osaka',
      'Fujika': 'text-brand-fujika',
      'SAGA': 'text-brand-saga'
    };
    return brandColors[brand as keyof typeof brandColors] || 'text-primary';
  };

  const filteredBatches = batches.filter(batch =>
    batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Batch Management"
        description="Create and manage production batches with SAP integration"
        action={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Batch
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Production Batch</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="volta">Volta</SelectItem>
                        <SelectItem value="osaka">Osaka</SelectItem>
                        <SelectItem value="fujika">Fujika</SelectItem>
                        <SelectItem value="saga">SAGA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product">Product Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agm">AGM Battery</SelectItem>
                        <SelectItem value="gel">Gel Battery</SelectItem>
                        <SelectItem value="lead">Lead Acid</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity (Ah)</Label>
                    <Input id="capacity" placeholder="e.g., 70" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" placeholder="e.g., 150" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sapIntegration">SAP Integration</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Package className="h-4 w-4 mr-2" />
                      Pull from SAP
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Production
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    Create Batch
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Search and Filters */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search batches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Brand</Button>
            <Button variant="outline">Filter by Status</Button>
          </div>
        </CardContent>
      </Card>

      {/* Batches Table */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardHeader>
          <CardTitle>Production Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>QR Progress</TableHead>
                <TableHead>Serial Range</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBatches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium">{batch.id}</TableCell>
                  <TableCell>{batch.product}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getBrandColor(batch.brand)}`}>
                      {batch.brand}
                    </span>
                  </TableCell>
                  <TableCell>{batch.quantity}</TableCell>
                  <TableCell>{getStatusBadge(batch.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(batch.qrGenerated / batch.quantity) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm">{batch.qrGenerated}/{batch.quantity}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-mono">{batch.serialRange}</TableCell>
                  <TableCell className="text-sm">{batch.expectedCompletion}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchManagement;