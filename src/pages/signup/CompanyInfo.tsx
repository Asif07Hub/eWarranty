import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Building2, ArrowRight, ArrowLeft } from 'lucide-react';

const CompanyInfo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [subdomain, setSubdomain] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    contactPerson: '',
    email: '',
    phone: '',
    companySize: '',
    expectedVolume: ''
  });

  const industries = [
    'Electronics',
    'Automotive', 
    'Home Appliances',
    'Industrial Equipment',
    'Consumer Goods',
    'Technology',
    'Healthcare',
    'Manufacturing',
    'Other'
  ];

  const companySizes = [
    'Small (1-50 employees)',
    'Medium (51-200 employees)', 
    'Large (201-1000 employees)',
    'Enterprise (1000+ employees)'
  ];

  const expectedVolumes = [
    'Low (< 1,000 warranties/year)',
    'Medium (1,000 - 10,000 warranties/year)',
    'High (10,000 - 100,000 warranties/year)',
    'Enterprise (100,000+ warranties/year)'
  ];

  useEffect(() => {
    const urlSubdomain = searchParams.get('subdomain');
    const storedSubdomain = localStorage.getItem('selectedSubdomain');
    
    if (urlSubdomain) {
      setSubdomain(urlSubdomain);
      localStorage.setItem('selectedSubdomain', urlSubdomain);
    } else if (storedSubdomain) {
      setSubdomain(storedSubdomain);
    } else {
      // Redirect back to landing if no subdomain
      navigate('/');
    }

    // Load saved form data
    const savedData = localStorage.getItem('companyInfo');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [searchParams, navigate]);

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    localStorage.setItem('companyInfo', JSON.stringify(updatedData));
  };

  const handleNext = () => {
    if (isFormValid()) {
      navigate('/signup/account-setup');
    }
  };

  const isFormValid = () => {
    return formData.companyName && 
           formData.industry && 
           formData.contactPerson && 
           formData.email && 
           formData.phone;
  };

  return (
    <div className="min-h-screen bg-page-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-section-title font-heading text-card-foreground">
              Create Your Account
            </h1>
            <span className="text-body text-muted-foreground">
              Step 1 of 5
            </span>
          </div>
          <Progress value={20} className="h-2" />
        </div>

        <Card className="bg-card shadow-elegant border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-card-title font-heading">
              <Building2 className="h-6 w-6 text-trust-blue" />
              Company Information
            </CardTitle>
            <p className="text-body text-muted-foreground">
              Setting up: <span className="font-medium text-trust-blue">{subdomain}.ewarranty.pk</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="Full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="admin@yourcompany.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+92 300 1234567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedVolume">Expected Warranty Volume</Label>
              <Select value={formData.expectedVolume} onValueChange={(value) => handleInputChange('expectedVolume', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select expected warranty volume" />
                </SelectTrigger>
                <SelectContent>
                  {expectedVolumes.map((volume) => (
                    <SelectItem key={volume} value={volume}>
                      {volume}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!isFormValid()}
                className="bg-battery-green hover:bg-battery-green/90 flex items-center gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyInfo;