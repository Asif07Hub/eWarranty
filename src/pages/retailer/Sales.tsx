import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, QrCode, ShoppingCart, Calendar } from 'lucide-react';

export const Sales: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);

  const salesData = [
    { 
      id: 'SAL-001', 
      date: '2024-07-15', 
      customer: 'Muhammad Ali', 
      phone: '+92-300-1234567',
      product: 'VOLTA-VL120-45AH', 
      serialNumber: 'VL120230001',
      quantity: 1,
      unitPrice: 15000,
      total: 15000,
      warranty: '24 months',
      status: 'completed'
    },
    { 
      id: 'SAL-002', 
      date: '2024-07-15', 
      customer: 'Ayesha Khan', 
      phone: '+92-301-2345678',
      product: 'OSAKA-OS80-35AH', 
      serialNumber: 'OS80230002',
      quantity: 1,
      unitPrice: 12000,
      total: 12000,
      warranty: '18 months',
      status: 'completed'
    },
    { 
      id: 'SAL-003', 
      date: '2024-07-14', 
      customer: 'Ahmed Hassan', 
      phone: '+92-302-3456789',
      product: 'FUJIKA-FK65-28AH', 
      serialNumber: 'FK65230003',
      quantity: 2,
      unitPrice: 9500,
      total: 19000,
      warranty: '12 months',
      status: 'completed'
    }
  ];

  const filteredSales = salesData.filter(sale =>
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Management" 
        description="Process sales and manage customer transactions"
        action={
          <Dialog open={isNewSaleOpen} onOpenChange={setIsNewSaleOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Sale
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Process New Sale</DialogTitle>
                <DialogDescription>
                  Register a new battery sale with customer warranty activation
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Customer Name</Label>
                  <Input id="customer-name" placeholder="Enter customer name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-phone">Phone Number</Label>
                  <Input id="customer-phone" placeholder="+92-XXX-XXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="volta-120">VOLTA-VL120-45AH</SelectItem>
                      <SelectItem value="osaka-80">OSAKA-OS80-35AH</SelectItem>
                      <SelectItem value="fujika-65">FUJIKA-FK65-28AH</SelectItem>
                      <SelectItem value="saga-100">SAGA-SG100-40AH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serial-scan">Serial Number</Label>
                  <div className="flex gap-2">
                    <Input id="serial-scan" placeholder="Scan or enter serial" />
                    <Button variant="outline" size="icon">
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="1" defaultValue="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit-price">Unit Price</Label>
                  <Input id="unit-price" type="number" placeholder="15000" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewSaleOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewSaleOpen(false)}>
                  Complete Sale
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Sales History
            </CardTitle>
            <CardDescription>Complete record of all customer transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sales..."
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
                    <TableHead>Sale ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Warranty</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{sale.date}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{sale.customer}</p>
                          <p className="text-xs text-muted-foreground">{sale.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{sale.product}</TableCell>
                      <TableCell className="font-mono text-sm">{sale.serialNumber}</TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>₨ {sale.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{sale.warranty}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{sale.status}</Badge>
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