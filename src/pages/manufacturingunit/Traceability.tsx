import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, MapPin, Clock, Package, Truck, Factory, 
  QrCode, CheckCircle, AlertTriangle, Calendar, Route
} from 'lucide-react';

export const Traceability: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    {
      id: 'VLT-12V-100AH-001234',
      qrCode: 'QR123456789',
      brand: 'Volta',
      model: '12V 100AH Lead Acid',
      batchNumber: 'BT2024001',
      manufacturingDate: '2024-01-15',
      status: 'Active',
      currentLocation: 'Karachi Distributor - Zone A',
      warrantyStatus: 'Valid',
      warrantyExpiry: '2026-01-15',
      journey: [
        {
          stage: 'Manufacturing',
          location: 'Pakistan Accumulators Factory - Lahore',
          timestamp: '2024-01-15T08:00:00Z',
          status: 'completed',
          details: 'Battery manufactured and quality tested'
        },
        {
          stage: 'Quality Control',
          location: 'QC Department - Lahore',
          timestamp: '2024-01-15T14:00:00Z',
          status: 'completed',
          details: 'Passed all quality control tests'
        },
        {
          stage: 'Warehouse',
          location: 'Central Warehouse - Lahore',
          timestamp: '2024-01-16T09:00:00Z',
          status: 'completed',
          details: 'Stored in climate-controlled environment'
        },
        {
          stage: 'Distribution',
          location: 'Karachi Regional Hub',
          timestamp: '2024-01-18T11:00:00Z',
          status: 'completed',
          details: 'Shipped to regional distributor'
        },
        {
          stage: 'Retail',
          location: 'Karachi Distributor - Zone A',
          timestamp: '2024-01-20T15:30:00Z',
          status: 'current',
          details: 'Available for sale to customers'
        }
      ]
    },
    {
      id: 'OSK-12V-75AH-002456',
      qrCode: 'QR987654321',
      brand: 'Osaka',
      model: '12V 75AH Lead Acid',
      batchNumber: 'BT2024015',
      manufacturingDate: '2024-01-12',
      status: 'Sold',
      currentLocation: 'Customer - Registered',
      warrantyStatus: 'Valid',
      warrantyExpiry: '2026-01-12',
      journey: [
        {
          stage: 'Manufacturing',
          location: 'Pakistan Accumulators Factory - Lahore',
          timestamp: '2024-01-12T08:00:00Z',
          status: 'completed',
          details: 'Battery manufactured and quality tested'
        },
        {
          stage: 'Quality Control',
          location: 'QC Department - Lahore',
          timestamp: '2024-01-12T14:00:00Z',
          status: 'completed',
          details: 'Passed all quality control tests'
        },
        {
          stage: 'Warehouse',
          location: 'Central Warehouse - Lahore',
          timestamp: '2024-01-13T09:00:00Z',
          status: 'completed',
          details: 'Stored in climate-controlled environment'
        },
        {
          stage: 'Distribution',
          location: 'Islamabad Regional Hub',
          timestamp: '2024-01-14T11:00:00Z',
          status: 'completed',
          details: 'Shipped to regional distributor'
        },
        {
          stage: 'Retail',
          location: 'Islamabad Auto Parts Store',
          timestamp: '2024-01-16T10:00:00Z',
          status: 'completed',
          details: 'Received by retailer'
        },
        {
          stage: 'Customer',
          location: 'Customer Registration',
          timestamp: '2024-01-18T16:45:00Z',
          status: 'current',
          details: 'Sold to customer and warranty registered'
        }
      ]
    }
  ];

  const traceabilityStats = [
    { label: 'Tracked Products', value: '12,543', icon: Package, change: '+245 this week' },
    { label: 'Active Journeys', value: '3,456', icon: Route, change: 'Real-time tracking' },
    { label: 'Locations Mapped', value: '89', icon: MapPin, change: 'Nationwide coverage' },
    { label: 'Avg Transit Time', value: '3.2 days', icon: Clock, change: '-0.3 days vs target' },
  ];

  const filteredProducts = products.filter(product =>
    product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.qrCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageIcon = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'manufacturing': return <Factory className="h-4 w-4" />;
      case 'quality control': return <CheckCircle className="h-4 w-4" />;
      case 'warehouse': return <Package className="h-4 w-4" />;
      case 'distribution': return <Truck className="h-4 w-4" />;
      case 'retail': return <MapPin className="h-4 w-4" />;
      case 'customer': return <QrCode className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStageStatus = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'current': return 'info';
      case 'pending': return 'warning';
      default: return undefined;
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Product Traceability"
        description="Track products throughout their entire lifecycle from manufacturing to customer delivery"
        action={
          <Button className="gap-2">
            <QrCode className="h-4 w-4" />
            Scan QR Code
          </Button>
        }
      />

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {traceabilityStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="search" className="space-y-6">
        <TabsList>
          <TabsTrigger value="search">Product Search</TabsTrigger>
          <TabsTrigger value="journey">Journey Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>Find Product</CardTitle>
              <CardDescription>
                Search by Product ID, QR Code, or Batch Number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter Product ID, QR Code, or Batch Number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Results */}
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{product.id}</Badge>
                        <StatusBadge 
                          status={product.status} 
                          variant={product.status === 'Active' ? 'info' : 'success'}
                        />
                        <Badge variant="secondary">{product.brand}</Badge>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg">{product.model}</h3>
                        <p className="text-muted-foreground">QR Code: {product.qrCode}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Batch:</span>
                          <br />
                          {product.batchNumber}
                        </div>
                        <div>
                          <span className="font-medium">Manufactured:</span>
                          <br />
                          {new Date(product.manufacturingDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Current Location:</span>
                          <br />
                          {product.currentLocation}
                        </div>
                        <div>
                          <span className="font-medium">Warranty:</span>
                          <br />
                          {product.warrantyStatus} until {new Date(product.warrantyExpiry).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      View Journey
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && searchTerm && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground text-center">
                  No products match your search criteria. Please check the Product ID, QR Code, or Batch Number.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          {selectedProduct ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  Product Journey: {selectedProduct.id}
                </CardTitle>
                <CardDescription>
                  Complete tracking history from manufacturing to current location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {selectedProduct.journey.map((stage, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`p-2 rounded-full border-2 ${
                          stage.status === 'completed' ? 'bg-success border-success text-success-foreground' :
                          stage.status === 'current' ? 'bg-primary border-primary text-primary-foreground' :
                          'bg-muted border-muted text-muted-foreground'
                        }`}>
                          {getStageIcon(stage.stage)}
                        </div>
                        {index < selectedProduct.journey.length - 1 && (
                          <div className={`w-0.5 h-12 mt-2 ${
                            stage.status === 'completed' ? 'bg-success' : 'bg-border'
                          }`} />
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{stage.stage}</h3>
                          <StatusBadge 
                            status={stage.status} 
                            variant={getStageStatus(stage.status)}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-1 mb-1">
                            <MapPin className="h-3 w-3" />
                            {stage.location}
                          </div>
                          <div className="flex items-center gap-1 mb-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(stage.timestamp).toLocaleString()}
                          </div>
                          <p>{stage.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Route className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Product</h3>
                <p className="text-muted-foreground text-center">
                  Search for a product in the "Product Search" tab to view its complete journey.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};