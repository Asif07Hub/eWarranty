import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  CheckCircle,
  QrCode, 
  Users, 
  BarChart3, 
  Smartphone,
  Package,
  Settings
} from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [sampleDataOptions, setSampleDataOptions] = useState({
    sampleProducts: false,
    sampleCustomers: false,
    sampleWarranties: false,
    sampleClaims: false
  });

  const onboardingSteps = [
    {
      title: 'Welcome to eWarranty!',
      description: 'Let\'s get you familiar with the platform',
      icon: CheckCircle,
      content: (
        <div className="space-y-6 text-center">
          <div className="w-24 h-24 bg-battery-green rounded-full mx-auto flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <div>
            <h3 className="text-card-title font-heading text-card-foreground mb-4">
              You're all set up!
            </h3>
            <p className="text-body text-muted-foreground mb-6">
              Your warranty management platform is ready to use. Let's take a quick tour of the key features.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Multi-Portal System',
      description: 'Understand your different user portals',
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="text-body font-medium text-card-foreground mb-2">Admin Portal</h4>
              <p className="text-small text-muted-foreground">Manage brands, users, and system settings</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="text-body font-medium text-card-foreground mb-2">Brand Manager</h4>
              <p className="text-small text-muted-foreground">Oversee distributors and warranty policies</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="text-body font-medium text-card-foreground mb-2">Manufacturing</h4>
              <p className="text-small text-muted-foreground">Generate QR codes and manage batches</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="text-body font-medium text-card-foreground mb-2">Customer Portal</h4>
              <p className="text-small text-muted-foreground">Register warranties and submit claims</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'QR Code Management',
      description: 'Learn about QR code generation and tracking',
      icon: QrCode,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <QrCode className="h-16 w-16 text-trust-blue mx-auto mb-4" />
            <h4 className="text-card-title font-heading text-card-foreground mb-2">
              Smart QR System
            </h4>
            <p className="text-body text-muted-foreground mb-6">
              Generate unique QR codes for each product, enabling instant warranty registration for customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-border rounded-lg">
              <Package className="h-8 w-8 text-battery-green mx-auto mb-2" />
              <h5 className="text-body font-medium mb-1">Generate</h5>
              <p className="text-small text-muted-foreground">Create QR codes in batches</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <Smartphone className="h-8 w-8 text-battery-green mx-auto mb-2" />
              <h5 className="text-body font-medium mb-1">Scan</h5>
              <p className="text-small text-muted-foreground">Customers scan to register</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <BarChart3 className="h-8 w-8 text-battery-green mx-auto mb-2" />
              <h5 className="text-body font-medium mb-1">Track</h5>
              <p className="text-small text-muted-foreground">Monitor usage and analytics</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Sample Data Setup',
      description: 'Add sample data to explore the platform',
      icon: Settings,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Settings className="h-16 w-16 text-trust-blue mx-auto mb-4" />
            <h4 className="text-card-title font-heading text-card-foreground mb-2">
              Explore with Sample Data
            </h4>
            <p className="text-body text-muted-foreground">
              Add sample data to better understand how the platform works
            </p>
          </div>
          
          <div className="space-y-4">
            {Object.entries({
              sampleProducts: 'Sample Products (Electronics, Automotive)',
              sampleCustomers: 'Sample Customer Accounts',
              sampleWarranties: 'Sample Warranty Registrations',
              sampleClaims: 'Sample Warranty Claims'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <Checkbox
                  id={key}
                  checked={sampleDataOptions[key as keyof typeof sampleDataOptions]}
                  onCheckedChange={(checked) => 
                    setSampleDataOptions(prev => ({ ...prev, [key]: checked }))
                  }
                />
                <label htmlFor={key} className="text-body text-card-foreground cursor-pointer flex-1">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    // Check if previous steps are completed
    const companyInfo = localStorage.getItem('companyInfo');
    const accountSetup = localStorage.getItem('accountSetup');
    const brandSetup = localStorage.getItem('brandSetup');
    const selectedPlan = localStorage.getItem('selectedPlan');
    
    if (!companyInfo || !accountSetup || !brandSetup || !selectedPlan) {
      navigate('/signup/company-info');
      return;
    }
  }, [navigate]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save sample data preferences and proceed to welcome dashboard
      localStorage.setItem('sampleDataOptions', JSON.stringify(sampleDataOptions));
      navigate('/dashboard/welcome');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/signup/select-plan');
    }
  };

  const currentStepData = onboardingSteps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-page-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-section-title font-heading text-card-foreground">
              Platform Onboarding
            </h1>
            <span className="text-body text-muted-foreground">
              Step {currentStep + 1} of {onboardingSteps.length}
            </span>
          </div>
          <Progress value={((currentStep + 1) / onboardingSteps.length) * 100} className="h-2" />
        </div>

        <Card className="bg-card shadow-elegant border border-border">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-trust-blue rounded-full mx-auto mb-4 flex items-center justify-center">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-card-title font-heading">
              {currentStepData.title}
            </CardTitle>
            <p className="text-body text-muted-foreground">
              {currentStepData.description}
            </p>
          </CardHeader>
          
          <CardContent className="min-h-[400px] flex flex-col justify-between">
            <div className="flex-1">
              {currentStepData.content}
            </div>

            <div className="flex justify-between pt-6 mt-6 border-t border-border">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {currentStep === 0 ? 'Back to Plans' : 'Previous'}
              </Button>
              
              <div className="flex items-center gap-4">
                {currentStep === 0 && (
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Watch Quick Demo
                  </Button>
                )}
                
                <Button 
                  onClick={handleNext}
                  className="bg-battery-green hover:bg-battery-green/90 flex items-center gap-2"
                >
                  {currentStep === onboardingSteps.length - 1 ? 'Complete Setup' : 'Next'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;