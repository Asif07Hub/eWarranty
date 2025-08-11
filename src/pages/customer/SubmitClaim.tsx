import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { QrCode, Camera, CheckCircle, ArrowLeft, Zap, Upload, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubmitClaim = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<{
    serialNumber: string;
    brand: string;
    model: string;
    registrationId: string;
    purchaseDate: string;
    warrantyStatus: string;
  } | null>(null);

  const [claimInfo, setClaimInfo] = useState({
    issueType: '',
    description: '',
    photos: [] as File[],
    customerContact: ''
  });

  const handleScan = () => {
    setIsScanning(true);
    // Simulate QR scan
    setTimeout(() => {
      setScannedData({
        serialNumber: 'VT24150089',
        brand: 'Volta',
        model: 'AGM 70Ah',
        registrationId: 'REG-1705123456',
        purchaseDate: '2024-01-10',
        warrantyStatus: 'Active'
      });
      setIsScanning(false);
      setStep(2);
    }, 2000);
  };

  const handleSubmit = () => {
    // Simulate claim submission
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

  const issueTypes = [
    'Battery not charging',
    'Battery drains quickly',
    'Physical damage',
    'Overheating',
    'Swelling/Bulging',
    'Other'
  ];

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
              <CardTitle className="text-2xl">Submit Warranty Claim</CardTitle>
              <p className="text-muted-foreground">
                Scan the QR code on your battery to start your warranty claim
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

        {/* Step 2: Claim Details */}
        {step === 2 && scannedData && (
          <Card className="bg-gradient-card shadow-elegant">
            <CardHeader>
              <CardTitle>Warranty Claim Details</CardTitle>
              <div className={`p-4 rounded-lg bg-gradient-to-r ${getBrandColor(scannedData.brand)} text-white`}>
                <div className="text-center">
                  <p className="font-bold text-lg">{scannedData.brand}</p>
                  <p className="text-sm opacity-90">{scannedData.model}</p>
                  <p className="text-xs opacity-75">Serial: {scannedData.serialNumber}</p>
                </div>
              </div>
              
              {/* Warranty Status */}
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">Warranty Status</span>
                </div>
                <span className="text-sm font-bold text-emerald-800">
                  {scannedData.warrantyStatus}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="issueType">Issue Type *</Label>
                <select
                  className="w-full p-2 border border-border rounded-md bg-background"
                  value={claimInfo.issueType}
                  onChange={(e) => setClaimInfo(prev => ({ ...prev, issueType: e.target.value }))}
                >
                  <option value="">Select issue type</option>
                  {issueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="description">Issue Description *</Label>
                <Textarea
                  id="description"
                  value={claimInfo.description}
                  onChange={(e) => setClaimInfo(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Please describe the issue in detail..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label htmlFor="contact">Contact Number *</Label>
                <Input
                  id="contact"
                  type="tel"
                  value={claimInfo.customerContact}
                  onChange={(e) => setClaimInfo(prev => ({ ...prev, customerContact: e.target.value }))}
                  placeholder="+92-XXX-XXXXXXX"
                />
              </div>
              
              <div>
                <Label>Photos (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload photos of the battery issue
                  </p>
                  <Button variant="outline" size="sm">
                    Choose Photos
                  </Button>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <div className="text-sm text-orange-800">
                    <p className="font-medium">Important:</p>
                    <p>Please ensure all information is accurate. False claims may void your warranty.</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleSubmit}
                className="w-full bg-gradient-primary hover:shadow-glow"
                disabled={!claimInfo.issueType || !claimInfo.description || !claimInfo.customerContact}
              >
                Submit Claim
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
                    Claim Submitted Successfully!
                  </h2>
                  <p className="text-muted-foreground">
                    Your warranty claim has been submitted and is under review.
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg text-left">
                  <h3 className="font-semibold mb-2">Claim Details:</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Claim ID:</span> CLM-{Date.now()}</p>
                    <p><span className="font-medium">Battery:</span> {scannedData.brand} {scannedData.model}</p>
                    <p><span className="font-medium">Issue:</span> {claimInfo.issueType}</p>
                    <p><span className="font-medium">Status:</span> Under Review</p>
                    <p><span className="font-medium">Expected Response:</span> 2-3 business days</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Next Steps:</span> Our team will review your claim and contact you within 2-3 business days. Keep your claim ID for reference.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate('/customer/status')}
                    className="w-full bg-gradient-primary hover:shadow-glow"
                  >
                    Check Claim Status
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

export default SubmitClaim;