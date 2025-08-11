
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Starter',
    price: 'PKR 15,000',
    period: '/month',
    description: 'Perfect for small businesses getting started with warranty management',
    badge: null,
    features: [
      'Up to 1,000 products',
      'Basic QR code generation',
      'Customer portal',
      'Email support',
      'Standard analytics',
      'Custom subdomain'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Professional',
    price: 'PKR 35,000',
    period: '/month',
    description: 'Ideal for growing businesses with advanced warranty needs',
    badge: 'Most Popular',
    features: [
      'Up to 10,000 products',
      'Advanced QR features',
      'Multi-brand support',
      'API integration',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'Mobile app access'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'Tailored solutions for large enterprises with complex requirements',
    badge: null,
    features: [
      'Unlimited products',
      'White-label solution',
      'Custom integrations',
      'Dedicated support',
      'Advanced security',
      'Custom workflows',
      'SLA guarantee',
      'On-premise option'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export const PricingSection: React.FC = () => {
  return (
    <section className="py-16 bg-section-background">
      <div className="container max-w-content px-spacing-component">
        <div className="text-center mb-12">
          <h2 className="text-section-title font-heading text-text-primary mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial with no setup fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`bg-surface shadow-elegant hover:shadow-glow transition-all duration-300 border-0 relative ${
                tier.popular ? 'scale-105 ring-2 ring-trust-blue' : ''
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="trustBlue" className="px-4 py-1">
                    <Star className="mr-1 h-3 w-3" />
                    {tier.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-card-title font-heading text-text-primary mb-2">
                  {tier.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-section-title font-heading text-text-primary">
                    {tier.price}
                  </span>
                  <span className="text-body text-text-secondary">
                    {tier.period}
                  </span>
                </div>
                <p className="text-small text-text-secondary">
                  {tier.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-body text-text-secondary">
                      <CheckCircle className="h-4 w-4 text-battery-green mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full h-11 ${
                    tier.popular 
                      ? 'bg-energy-yellow text-energy-yellow-foreground hover:bg-energy-yellow/90' 
                      : 'bg-trust-blue hover:bg-trust-blue/90'
                  }`}
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-body text-text-secondary mb-4">
            All plans include 99.9% uptime SLA and 24/7 customer support
          </p>
          <p className="text-small text-text-secondary">
            Need a custom solution? <button className="text-trust-blue hover:underline font-medium">Contact our sales team</button>
          </p>
        </div>
      </div>
    </section>
  );
};
