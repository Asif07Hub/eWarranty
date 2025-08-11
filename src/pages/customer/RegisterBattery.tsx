import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Camera, CheckCircle, ArrowLeft, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterBattery = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<{
    serialNumber: string;
    brand: string;
    model: string;
    capacity: string;
  } | null>(null);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    purchaseDate: '',
    dealerName: ''
  });

  const handleScan = () => {
    setIsScanning(true);
    // Simulate QR scan
    setTimeout(() => {
      setScannedData({
        serialNumber: 'VT24150089',
        brand: 'Volta',
        model: 'AGM 70Ah',
        capacity: '70Ah'
      });
      setIsScanning(false);
      setStep(2);
    }, 2000);
  };

  const handleSubmit = () => {
    // Simulate registration
    setStep(3);
  };

  const getBrandColor = (brand: string) => {
    const colors = {
      'Volta': 'from-yellow-400 to-yellow-600',
      'Osaka': 'from-orange-400 to-orange-600',
      'Fujika': 'from-purple-400 to-purple-600',
      'SAGA': 'from-green-400 to-green-600'
    };
    return colors[brand as keyof typeof colors] || 'from-blue-400 to-blue-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
          className="text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Pakistan Accumulators</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= stepNum 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > stepNum ? <CheckCircle className="h-4 w-4" /> : stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`w-8 h-1 mx-2 ${step > stepNum ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Step 1: QR Scan */}
        {step === 1 && (
          <Card className="bg-gradient-card shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Register Your Battery</CardTitle>
              <p className="text-muted-foreground">
                Scan the QR code on your battery to start registration
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                {!isScanning ? (
                  <>
                    <div className="w-48 h-48 border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-primary" />
                    </div>
                    <Button 
                      onClick={handleScan}
                      className="w-full bg-gradient-primary hover:shadow-glow"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Scan QR Code
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="w-48 h-48 border-2 border-primary rounded-lg flex items-center justify-center animate-pulse">
                      <Camera className="h-16 w-16 text-primary animate-bounce" />
                    </div>
                    <p className="text-center text-muted-foreground">
                      Scanning QR code...
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Customer Information */}
        {step === 2 && scannedData && (
          <Card className="bg-gradient-card shadow-elegant">
            <CardHeader>
              <CardTitle>Battery Information</CardTitle>
              <div className={`p-4 rounded-lg bg-gradient-to-r ${getBrandColor(scannedData.brand)} text-white`}>
                <div className="text-center">
                  <p className="font-bold text-lg">{scannedData.brand}</p>
                  <p className="text-sm opacity-90">{scannedData.model}</p>
                  <p className="text-xs opacity-75">Serial: {scannedData.serialNumber}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+92-XXX-XXXXXXX"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Your complete address"
                  />
                </div>
                
                <div>
                  <Label htmlFor="purchaseDate">Purchase Date *</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={customerInfo.purchaseDate}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, purchaseDate: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="dealerName">Dealer/Shop Name</Label>
                  <Input
                    id="dealerName"
                    value={customerInfo.dealerName}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, dealerName: e.target.value }))}
                    placeholder="Where did you purchase this battery?"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSubmit}
                className="w-full bg-gradient-primary hover:shadow-glow"
                disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.purchaseDate}
              >
                Register Battery
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Success */}
        {step === 3 && scannedData && (
          <Card className="bg-gradient-card shadow-elegant">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-emerald-600" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Registration Successful!
                  </h2>
                  <p className="text-muted-foreground">
                    Your {scannedData.brand} battery has been registered successfully.
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg text-left">
                  <h3 className="font-semibold mb-2">Registration Details:</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Registration ID:</span> REG-{Date.now()}</p>
                    <p><span className="font-medium">Serial Number:</span> {scannedData.serialNumber}</p>
                    <p><span className="font-medium">Brand:</span> {scannedData.brand}</p>
                    <p><span className="font-medium">Model:</span> {scannedData.model}</p>
                    <p><span className="font-medium">Purchase Date:</span> {customerInfo.purchaseDate}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate('/customer/claim')}
                    className="w-full bg-gradient-primary hover:shadow-glow"
                  >
                    Submit Warranty Claim
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="w-full"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RegisterBattery;