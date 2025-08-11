import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  QrCode, Download, Plus, Package, Calendar, Hash, 
  Factory, Zap, CheckCircle, Clock, AlertTriangle 
} from 'lucide-react';

export const QRGeneration: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const brands = [
    { id: 'volta', name: 'Volta', color: 'hsl(146, 100%, 39%)' },
    { id: 'osaka', name: 'Osaka', color: 'hsl(15, 85%, 55%)' },
    { id: 'fujika', name: 'Fujika', color: 'hsl(265, 85%, 55%)' },
    { id: 'saga', name: 'Saga', color: 'hsl(135, 85%, 45%)' },
  ];

  const productTypes = [
    { id: '12v-65ah', name: '12V 65AH Lead Acid Battery' },
    { id: '12v-75ah', name: '12V 75AH Lead Acid Battery' },
    { id: '12v-100ah', name: '12V 100AH Lead Acid Battery' },
    { id: '12v-150ah', name: '12V 150AH Lead Acid Battery' },
    { id: '6v-200ah', name: '6V 200AH Deep Cycle Battery' },
  ];

  const recentBatches = [
    {
      id: 'BT2024001',
      brand: 'Volta',
      product: '12V 100AH',
      quantity: 500,
      generated: 500,
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: 'BT2024002',
      brand: 'Osaka',
      product: '12V 75AH',
      quantity: 300,
      generated: 180,
      date: '2024-01-14',
      status: 'in-progress',
    },
    {
      id: 'BT2024003',
      brand: 'Fujika',
      product: '12V 150AH',
      quantity: 250,
      generated: 250,
      date: '2024-01-13',
      status: 'completed',
    },
    {
      id: 'BT2024004',
      brand: 'Saga',
      product: '6V 200AH',
      quantity: 150,
      generated: 75,
      date: '2024-01-12',
      status: 'in-progress',
    },
  ];

  const qrStats = [
    { label: 'Total Generated', value: '45,678', icon: QrCode, change: '+2,345 this month' },
    { label: 'Active Batches', value: '8', icon: Package, change: '3 completing today' },
    { label: 'Brands Served', value: '4', icon: Factory, change: 'All brands active' },
    { label: 'Success Rate', value: '99.8%', icon: CheckCircle, change: '0.2% error rate' },
  ];

  const handleGeneration = async () => {
    if (!selectedBrand || !selectedProduct || !batchNumber || !quantity || !manufacturingDate) {
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate QR code generation progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-warning" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'failed': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="QR Code Generation"
        description="Generate unique QR codes for battery products to enable warranty tracking and authentication"
        action={
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Template
          </Button>
        }
      />

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {qrStats.map((stat) => (
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* QR Generation Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Generate New QR Batch
            </CardTitle>
            <CardDescription>
              Create QR codes for a new production batch
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: brand.color }}
                        />
                        {brand.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Product Type</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="batch">Batch Number</Label>
                <Input
                  id="batch"
                  placeholder="e.g., BT2024005"
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="e.g., 500"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="manufacturing-date">Manufacturing Date</Label>
              <Input
                id="manufacturing-date"
                type="date"
                value={manufacturingDate}
                onChange={(e) => setManufacturingDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions or notes for this batch..."
                rows={3}
              />
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Generating QR codes...</span>
                  <span>{generationProgress}%</span>
                </div>
                <Progress value={generationProgress} className="w-full" />
              </div>
            )}

            <Button 
              onClick={handleGeneration}
              disabled={!selectedBrand || !selectedProduct || !batchNumber || !quantity || !manufacturingDate || isGenerating}
              className="w-full gap-2"
            >
              <QrCode className="h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Generate QR Codes'}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Batches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Recent Batches
            </CardTitle>
            <CardDescription>
              Recently generated QR code batches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBatches.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-4 bg-card rounded-lg border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{batch.id}</Badge>
                      {getStatusIcon(batch.status)}
                    </div>
                    <div className="font-medium">{batch.brand} - {batch.product}</div>
                    <div className="text-sm text-muted-foreground">
                      {batch.generated}/{batch.quantity} codes generated
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(batch.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant={getStatusBadge(batch.status) as any}>
                      {batch.status.replace('-', ' ')}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Code Preview */}
      {generationProgress === 100 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Generation Complete
            </CardTitle>
            <CardDescription>
              QR codes have been successfully generated for batch {batchNumber}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
              <div>
                <div className="font-medium text-success">
                  {quantity} QR codes generated successfully
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Batch: {batchNumber} • Brand: {brands.find(b => b.id === selectedBrand)?.name}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download ZIP
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Zap className="h-4 w-4" />
                  Print Labels
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};