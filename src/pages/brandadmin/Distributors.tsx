import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, MapPin, Phone, Mail, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const BrandDistributors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const distributors = [
    {
      id: 1,
      name: 'Elite Electronics',
      contact: 'Ahmed Hassan',
      phone: '+92-300-1234567',
      email: 'ahmed@eliteelectronics.pk',
      location: 'Lahore, Punjab',
      status: 'Active',
      performance: 92,
      lastOrder: '2024-01-15',
      totalSales: '₨2.4M'
    },
    {
      id: 2,
      name: 'Power Solutions Ltd',
      contact: 'Fatima Khan',
      phone: '+92-321-9876543',
      email: 'fatima@powersolutions.pk',
      location: 'Karachi, Sindh',
      status: 'Active',
      performance: 88,
      lastOrder: '2024-01-12',
      totalSales: '₨1.8M'
    },
    {
      id: 3,
      name: 'Tech Distributors',
      contact: 'Ali Raza',
      phone: '+92-333-5555555',
      email: 'ali@techdist.pk',
      location: 'Islamabad, ICT',
      status: 'Inactive',
      performance: 65,
      lastOrder: '2024-01-08',
      totalSales: '₨950K'
    }
  ];

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-emerald-100 text-emerald-800">Excellent</Badge>;
    if (score >= 80) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    if (score >= 70) return <Badge className="bg-orange-100 text-orange-800">Average</Badge>;
    return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
      : <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
  };

  const filteredDistributors = distributors.filter(distributor =>
    distributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    distributor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    distributor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Distributor Management"
        description="Manage and monitor your brand distributors"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Distributor
          </Button>
        }
      />

      {/* Search and Filters */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search distributors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Filter by Location
            </Button>
            <Button variant="outline">
              Filter by Performance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Distributors Table */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardHeader>
          <CardTitle>Distributor List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Distributor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDistributors.map((distributor) => (
                <TableRow key={distributor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{distributor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{distributor.name}</div>
                        <div className="text-sm text-muted-foreground">{distributor.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{distributor.contact}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {distributor.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {distributor.location}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(distributor.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{distributor.performance}%</span>
                      {getPerformanceBadge(distributor.performance)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{distributor.totalSales}</TableCell>
                  <TableCell className="text-muted-foreground">{distributor.lastOrder}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default BrandDistributors;