import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UserCog, ArrowRight, ArrowLeft, Upload, Eye, EyeOff } from 'lucide-react';

const AccountSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    companyLogo: '',
    primaryColor: '#00C853',
    timezone: 'Asia/Karachi',
    currency: 'PKR'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const timezones = [
    'Asia/Karachi',
    'Asia/Dubai',
    'Asia/Riyadh',
    'Europe/London',
    'America/New_York',
    'Asia/Singapore'
  ];

  const currencies = [
    'PKR - Pakistani Rupee',
    'USD - US Dollar', 
    'EUR - Euro',
    'GBP - British Pound',
    'AED - UAE Dirham',
    'SAR - Saudi Riyal'
  ];

  useEffect(() => {
    // Check if company info exists
    const companyInfo = localStorage.getItem('companyInfo');
    if (!companyInfo) {
      navigate('/signup/company-info');
      return;
    }

    // Load saved account setup data
    const savedData = localStorage.getItem('accountSetup');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    localStorage.setItem('accountSetup', JSON.stringify(updatedData));
  };

  const handleNext = () => {
    if (isFormValid()) {
      navigate('/signup/brand-setup');
    }
  };

  const handleBack = () => {
    navigate('/signup/company-info');
  };

  const isFormValid = () => {
    return formData.username && 
           formData.password && 
           formData.confirmPassword &&
           formData.password === formData.confirmPassword &&
           formData.password.length >= 8;
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a file service
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('companyLogo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
              Step 2 of 5
            </span>
          </div>
          <Progress value={40} className="h-2" />
        </div>

        <Card className="bg-card shadow-elegant border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-card-title font-heading">
              <UserCog className="h-6 w-6 text-trust-blue" />
              Account Setup
            </CardTitle>
            <p className="text-body text-muted-foreground">
              Configure your admin account and basic branding
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Admin Credentials */}
            <div className="space-y-4">
              <h3 className="text-card-title font-heading text-card-foreground">
                Admin Credentials
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="admin"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password (min 8 characters)"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-error text-small">Passwords do not match</p>
                  )}
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="space-y-4">
              <h3 className="text-card-title font-heading text-card-foreground">
                Basic Branding
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo">Company Logo</Label>
                  <div className="flex items-center gap-4">
                    {formData.companyLogo && (
                      <img 
                        src={formData.companyLogo} 
                        alt="Company Logo" 
                        className="w-12 h-12 object-cover rounded border"
                      />
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        id="logo"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('logo')?.click()}
                        className="w-full flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id="primaryColor"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-12 h-10 rounded border border-border"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      placeholder="#00C853"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <h3 className="text-card-title font-heading text-card-foreground">
                Preferences
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency.split(' ')[0]}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
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

export default AccountSetup;