import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Crown,
  Upload,
  Palette
} from 'lucide-react';

interface BrandData {
  id: string;
  name: string;
  displayName: string;
  color: string;
  logo?: string;
  isPrimary: boolean;
}

const BrandSetup = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<BrandData[]>([
    {
      id: '1',
      name: '',
      displayName: '',
      color: '#00C853',
      isPrimary: true
    }
  ]);

  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    // Check if previous steps are completed
    const companyInfo = localStorage.getItem('companyInfo');
    const accountSetup = localStorage.getItem('accountSetup');
    
    if (!companyInfo || !accountSetup) {
      navigate('/signup/company-info');
      return;
    }

    // Get company name for context
    try {
      const company = JSON.parse(companyInfo);
      setCompanyName(company.companyName || 'Your Company');
    } catch (e) {
      console.error('Error parsing company info:', e);
    }

    // Load saved brand setup data
    const savedBrands = localStorage.getItem('brandSetup');
    if (savedBrands) {
      try {
        setBrands(JSON.parse(savedBrands));
      } catch (e) {
        console.error('Error parsing saved brands:', e);
      }
    }
  }, [navigate]);

  const updateBrand = (id: string, field: keyof BrandData, value: string | boolean) => {
    const updatedBrands = brands.map(brand => 
      brand.id === id ? { ...brand, [field]: value } : brand
    );
    
    // If setting a new primary, remove primary from others
    if (field === 'isPrimary' && value === true) {
      updatedBrands.forEach(brand => {
        if (brand.id !== id) brand.isPrimary = false;
      });
    }
    
    setBrands(updatedBrands);
    localStorage.setItem('brandSetup', JSON.stringify(updatedBrands));
  };

  const addBrand = () => {
    const newBrand: BrandData = {
      id: Date.now().toString(),
      name: '',
      displayName: '',
      color: '#3B82F6',
      isPrimary: false
    };
    
    const updatedBrands = [...brands, newBrand];
    setBrands(updatedBrands);
    localStorage.setItem('brandSetup', JSON.stringify(updatedBrands));
  };

  const removeBrand = (id: string) => {
    if (brands.length <= 1) return; // Must have at least one brand
    
    const brandToRemove = brands.find(b => b.id === id);
    let updatedBrands = brands.filter(brand => brand.id !== id);
    
    // If removing primary brand, make first remaining brand primary
    if (brandToRemove?.isPrimary && updatedBrands.length > 0) {
      updatedBrands[0].isPrimary = true;
    }
    
    setBrands(updatedBrands);
    localStorage.setItem('brandSetup', JSON.stringify(updatedBrands));
  };

  const handleNext = () => {
    if (isFormValid()) {
      navigate('/signup/select-plan');
    }
  };

  const handleBack = () => {
    navigate('/signup/account-setup');
  };

  const isFormValid = () => {
    return brands.every(brand => brand.name && brand.displayName) &&
           brands.some(brand => brand.isPrimary);
  };

  const handleLogoUpload = (brandId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateBrand(brandId, 'logo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateBrandName = (displayName: string) => {
    return displayName.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  return (
    <div className="min-h-screen bg-page-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-section-title font-heading text-card-foreground">
              Create Your Account
            </h1>
            <span className="text-body text-muted-foreground">
              Step 3 of 5
            </span>
          </div>
          <Progress value={60} className="h-2" />
        </div>

        <Card className="bg-card shadow-elegant border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-card-title font-heading">
              <Palette className="h-6 w-6 text-trust-blue" />
              Brand Configuration
            </CardTitle>
            <p className="text-body text-muted-foreground">
              Set up your brands for <span className="font-medium text-trust-blue">{companyName}</span>. 
              You can manage multiple brands or start with one.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Brands List */}
            <div className="space-y-6">
              {brands.map((brand, index) => (
                <div key={brand.id} className="p-6 border border-border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-card-title font-heading text-card-foreground">
                        Brand {index + 1}
                      </h3>
                      {brand.isPrimary && (
                        <Badge className="bg-battery-green text-white flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          Primary
                        </Badge>
                      )}
                    </div>
                    
                    {brands.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBrand(brand.id)}
                        className="text-error hover:bg-error/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`displayName-${brand.id}`}>Brand Display Name *</Label>
                      <Input
                        id={`displayName-${brand.id}`}
                        value={brand.displayName}
                        onChange={(e) => {
                          const displayName = e.target.value;
                          updateBrand(brand.id, 'displayName', displayName);
                          // Auto-generate brand name from display name
                          if (displayName) {
                            updateBrand(brand.id, 'name', generateBrandName(displayName));
                          }
                        }}
                        placeholder="e.g., Volta Batteries, Osaka Auto"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`name-${brand.id}`}>Brand Code *</Label>
                      <Input
                        id={`name-${brand.id}`}
                        value={brand.name}
                        onChange={(e) => updateBrand(brand.id, 'name', e.target.value)}
                        placeholder="e.g., volta, osaka"
                        className="font-mono"
                      />
                      <p className="text-small text-muted-foreground">
                        Used for URLs and internal identification
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`color-${brand.id}`}>Brand Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          id={`color-${brand.id}`}
                          value={brand.color}
                          onChange={(e) => updateBrand(brand.id, 'color', e.target.value)}
                          className="w-12 h-10 rounded border border-border"
                        />
                        <Input
                          value={brand.color}
                          onChange={(e) => updateBrand(brand.id, 'color', e.target.value)}
                          placeholder="#00C853"
                          className="font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`logo-${brand.id}`}>Brand Logo</Label>
                      <div className="flex items-center gap-4">
                        {brand.logo && (
                          <img 
                            src={brand.logo} 
                            alt={`${brand.displayName} Logo`} 
                            className="w-12 h-12 object-cover rounded border"
                          />
                        )}
                        <div className="flex-1">
                          <input
                            type="file"
                            id={`logo-${brand.id}`}
                            accept="image/*"
                            onChange={(e) => handleLogoUpload(brand.id, e)}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById(`logo-${brand.id}`)?.click()}
                            className="w-full flex items-center gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            Upload Logo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`primary-${brand.id}`}
                      checked={brand.isPrimary}
                      onCheckedChange={(checked) => updateBrand(brand.id, 'isPrimary', checked as boolean)}
                    />
                    <label htmlFor={`primary-${brand.id}`} className="text-body text-card-foreground cursor-pointer">
                      Make this the primary brand
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Brand Button */}
            <Button
              variant="outline"
              onClick={addBrand}
              className="w-full flex items-center gap-2 border-dashed"
            >
              <Plus className="h-4 w-4" />
              Add Another Brand
            </Button>

            {/* Examples */}
            <div className="p-4 bg-section-background rounded-lg">
              <h4 className="text-body font-medium text-card-foreground mb-2">Examples:</h4>
              <div className="space-y-2 text-small text-muted-foreground">
                <div><strong>Pak Accumulators:</strong> Volta, Osaka, Saga, Fujika</div>
                <div><strong>Daewoo Batteries:</strong> Daewoo (single brand)</div>
                <div><strong>Atlas Honda:</strong> Honda Motorcycles, Honda Parts</div>
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
                Continue to Plans
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandSetup;