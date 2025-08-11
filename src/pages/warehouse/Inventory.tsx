import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, Package, AlertTriangle } from 'lucide-react';

export const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');

  const inventoryItems = [
    { id: 'VOLTA-VL120-45AH', brand: 'Volta', capacity: '45AH', quantity: 450, location: 'A-12-B', expiry: '2024-08-15', status: 'critical' },
    { id: 'OSAKA-OS80-35AH', brand: 'Osaka', capacity: '35AH', quantity: 280, location: 'B-05-C', expiry: '2024-09-22', status: 'warning' },
    { id: 'FUJIKA-FK65-28AH', brand: 'Fujika', capacity: '28AH', quantity: 320, location: 'C-08-A', expiry: '2024-12-01', status: 'good' },
    { id: 'SAGA-SG100-40AH', brand: 'SAGA', capacity: '40AH', quantity: 150, location: 'D-03-B', expiry: '2024-11-15', status: 'good' },
    { id: 'VOLTA-VL150-55AH', brand: 'Volta', capacity: '55AH', quantity: 200, location: 'A-15-A', expiry: '2024-10-30', status: 'warning' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'warning': return 'default';
      case 'good': return 'secondary';
      default: return 'outline';
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === 'all' || item.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory Management" 
        description="Monitor and manage warehouse inventory levels"
        action={
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Current Inventory
          </CardTitle>
          <CardDescription>Real-time inventory status and locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by product ID or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterBrand} onValueChange={setFilterBrand}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                <SelectItem value="Volta">Volta</SelectItem>
                <SelectItem value="Osaka">Osaka</SelectItem>
                <SelectItem value="Fujika">Fujika</SelectItem>
                <SelectItem value="SAGA">SAGA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.capacity}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.expiry}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(item.status)}>
                        {item.status === 'critical' && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {item.status}
                      </Badge>
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