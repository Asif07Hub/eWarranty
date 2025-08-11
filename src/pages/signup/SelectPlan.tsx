import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, ArrowLeft, Crown, Star, Zap } from 'lucide-react';

const SelectPlan = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [subdomain, setSubdomain] = useState('');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Free',
      period: '14-day trial',
      description: 'Perfect for small businesses getting started',
      icon: Star,
      color: 'bg-trust-blue',
      features: [
        'Up to 1,000 warranties',
        'Basic QR code generation',
        'Customer portal',
        'Email support',
        'Basic analytics',
        '1 admin user'
      ],
      limitations: [
        'Limited to 1 brand',
        'No custom branding',
        'Basic reporting only'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 'PKR 15,000',
      period: '/month',
      description: 'Most popular for growing businesses',
      icon: Zap,
      color: 'bg-battery-green',
      popular: true,
      features: [
        'Up to 10,000 warranties',
        'Advanced QR management',
        'Multi-portal system',
        'Priority support',
        'Advanced analytics',
        '5 admin users',
        'Custom branding',
        'API access',
        'Distributor management'
      ],
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations with complex needs',
      icon: Crown,
      color: 'bg-energy-yellow',
      features: [
        'Unlimited warranties',
        'Full platform access',
        'White-label solution',
        'Dedicated support',
        'Custom integrations',
        'Unlimited users',
        'Advanced security',
        'Custom features',
        'SLA guarantee'
      ],
      limitations: []
    }
  ];

  useEffect(() => {
    // Check if previous steps are completed
    const companyInfo = localStorage.getItem('companyInfo');
    const accountSetup = localStorage.getItem('accountSetup');
    const brandSetup = localStorage.getItem('brandSetup');
    
    if (!companyInfo || !accountSetup || !brandSetup) {
      navigate('/signup/company-info');
      return;
    }

    // Get subdomain
    const storedSubdomain = localStorage.getItem('selectedSubdomain');
    if (storedSubdomain) {
      setSubdomain(storedSubdomain);
    }

    // Load saved plan selection
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan) {
      setSelectedPlan(savedPlan);
    }
  }, [navigate]);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    localStorage.setItem('selectedPlan', planId);
  };

  const handleNext = () => {
    if (selectedPlan) {
      navigate('/signup/onboarding');
    }
  };

  const handleBack = () => {
    navigate('/signup/brand-setup');
  };

  return (
    <div className="min-h-screen bg-page-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-section-title font-heading text-card-foreground">
              Create Your Account
            </h1>
            <span className="text-body text-muted-foreground">
              Step 4 of 5
            </span>
          </div>
          <Progress value={80} className="h-2" />
        </div>

        {/* Subdomain Display */}
        <div className="text-center mb-8">
          <h2 className="text-card-title font-heading text-card-foreground mb-2">
            Choose Your Plan
          </h2>
          <p className="text-body text-muted-foreground">
            Setting up: <span className="font-medium text-trust-blue">{subdomain}.ewarranty.pk</span>
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <Card 
                key={plan.id}
                className={`relative cursor-pointer transition-all duration-200 hover:shadow-glow ${
                  isSelected ? 'ring-2 ring-battery-green shadow-glow' : 'shadow-elegant'
                } ${plan.popular ? 'border-battery-green' : 'border-border'}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-battery-green text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${plan.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-card-title font-heading">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="text-center">
                    <span className="text-section-title font-heading text-card-foreground">
                      {plan.price}
                    </span>
                    <span className="text-body text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  
                  <p className="text-body text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-body text-card-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-small text-muted-foreground mb-2">Limitations:</p>
                      <div className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                            </div>
                            <span className="text-small text-muted-foreground">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    className={`w-full mt-6 ${
                      isSelected 
                        ? 'bg-battery-green hover:bg-battery-green/90' 
                        : 'bg-trust-blue hover:bg-trust-blue/90'
                    }`}
                    variant={isSelected ? 'default' : 'outline'}
                  >
                    {isSelected ? 'Selected' : 'Select Plan'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
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
            disabled={!selectedPlan}
            className="bg-battery-green hover:bg-battery-green/90 flex items-center gap-2"
          >
            Continue to Onboarding
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;