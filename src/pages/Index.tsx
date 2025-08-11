
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SubdomainSelector } from '@/components/SubdomainSelector';
import { 
  Shield, 
  QrCode, 
  BarChart3, 
  Users, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Lock,
  Car,
  Laptop,
  Home,
  Factory
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Warranty Protection',
    description: 'Comprehensive warranty management with instant claim processing and verification across all industries.',
    color: 'text-primary'
  },
  {
    icon: QrCode,
    title: 'Product Traceability',
    description: 'Track every product from manufacturing to end-user with secure QR codes and digital certificates.',
    color: 'text-trust-blue'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time insights into warranty claims, performance metrics, and industry trends.',
    color: 'text-energy-yellow'
  },
  {
    icon: Users,
    title: 'Multi-Tenant Platform',
    description: 'Separate, secure environments for different brands and organizations across industries.',
    color: 'text-success'
  }
];

const benefits = [
  'Reduce warranty fraud by 90%',
  'Instant claim verification',
  'Complete supply chain visibility',
  'Automated compliance reporting',
  'Customer self-service portal',
  'Real-time inventory tracking'
];

const stats = [
  { value: '1M+', label: 'Products Tracked' },
  { value: '99.9%', label: 'Uptime' },
  { value: '30s', label: 'Avg. Claim Time' },
  { value: '24/7', label: 'Support' }
];

const industries = [
  {
    icon: Car,
    name: 'Automotive',
    description: 'Parts & Components'
  },
  {
    icon: Laptop,
    name: 'Electronics',
    description: 'Consumer Devices'
  },
  {
    icon: Home,
    name: 'Appliances',
    description: 'Home & Kitchen'
  },
  {
    icon: Factory,
    name: 'Industrial',
    description: 'Equipment & Machinery'
  }
];

export const Index: React.FC = () => {
  const [showSubdomainSelector, setShowSubdomainSelector] = useState(false);

  const handleGetStarted = () => {
    setShowSubdomainSelector(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <header className="relative z-50 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-heading font-bold text-foreground">
                eWarranty Platform
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link to="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
                Benefits
              </Link>
              <Link to="#industries" className="text-muted-foreground hover:text-foreground transition-colors">
                Industries
              </Link>
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button onClick={handleGetStarted} className="shadow-glow">
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-trust-blue/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <Badge className="inline-flex items-center space-x-1 bg-primary/10 text-primary border-primary/20">
              <Star className="h-3 w-3" />
              <span>Trusted by Leading Manufacturers Worldwide</span>
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
              The Future of
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Product Warranty
              </span>
              Management
            </h1>
            
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
              Secure, traceable, and automated warranty solutions for modern manufacturing. 
              From QR code generation to claim processing, manage your entire warranty ecosystem 
              across all industries with enterprise-grade security and real-time analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={handleGetStarted} className="shadow-glow hover-scale inline-flex items-center">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">
                  <Globe className="mr-2 h-4 w-4" />
                  View Demo
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-small text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-24 bg-section-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-section-title font-heading font-semibold text-foreground mb-4">
              Trusted Across Industries
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              From automotive to electronics, our platform adapts to your industry's 
              specific warranty requirements and compliance standards.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 hover-scale border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-card mb-4">
                    <industry.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-card-title font-heading font-semibold text-foreground mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-small text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-section-title font-heading font-semibold text-foreground mb-4">
              Powerful Features Built for Scale
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage warranties across your entire supply chain, 
              from manufacturing to end-customer.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 hover-scale border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-card mb-4">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-card-title font-heading font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-small text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-section-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-section-title font-heading font-semibold text-foreground mb-6">
                Transform Your Warranty Operations
              </h2>
              <p className="text-body text-muted-foreground mb-8 leading-relaxed">
                Join leading manufacturers across industries who have revolutionized their warranty 
                management with our comprehensive platform.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-body text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button size="lg" onClick={handleGetStarted} className="mt-8 shadow-glow inline-flex items-center">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-xl"></div>
              <Card className="relative bg-gradient-card shadow-elegant border-border/50">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-primary" />
                      <span className="text-body font-medium text-foreground">
                        Enterprise Security
                      </span>
                    </div>
                    <div className="text-small text-muted-foreground">
                      Bank-grade encryption, SOC 2 compliance, and multi-factor authentication 
                      ensure your warranty data is always protected across all industries.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-trust-blue/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-section-title font-heading font-semibold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-body text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of manufacturers who trust our platform for their warranty management. 
            Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={handleGetStarted} className="shadow-glow hover-scale inline-flex items-center">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Subdomain Selection Modal */}
      {showSubdomainSelector && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <SubdomainSelector onClose={() => setShowSubdomainSelector(false)} />
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-small text-muted-foreground">
            <p>&copy; 2024 eWarranty Platform. Built for the future of warranty management.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
