
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Globe, X } from 'lucide-react';

interface SubdomainSelectorProps {
  onSelect?: (subdomain: string) => void;
  onClose?: () => void;
}

export const SubdomainSelector: React.FC<SubdomainSelectorProps> = ({ onSelect, onClose }) => {
  const [subdomain, setSubdomain] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const checkAvailability = async () => {
    if (!subdomain.trim()) return;
    
    setIsChecking(true);
    // Simulate API call with validation
    setTimeout(() => {
      const cleanSubdomain = subdomain.trim().toLowerCase();
      
      // Basic validation
      if (cleanSubdomain.length < 3) {
        setIsAvailable(false);
        setSuggestions([`${cleanSubdomain}corp`, `${cleanSubdomain}company`, `${cleanSubdomain}inc`]);
      } else if (cleanSubdomain === 'admin' || cleanSubdomain === 'api' || cleanSubdomain === 'www') {
        setIsAvailable(false);
        setSuggestions([`${cleanSubdomain}corp`, `${cleanSubdomain}company`, `my${cleanSubdomain}`]);
      } else {
        setIsAvailable(true);
        setSuggestions([]);
      }
      
      setIsChecking(false);
    }, 1000);
  };

  const handleGetStarted = () => {
    if (subdomain.trim()) {
      // Store subdomain in localStorage for the signup flow
      localStorage.setItem('selectedSubdomain', subdomain.trim());
      
      // Navigate to company info page
      window.location.href = `/signup/company-info?subdomain=${subdomain.trim()}`;
      
      if (onSelect) {
        onSelect(subdomain.trim());
      }
    }
  };

  return (
    <Card className="bg-card shadow-elegant border border-border max-w-lg mx-auto relative z-50">
      {onClose && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-8 w-8 p-0 hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-card-title font-heading text-card-foreground">
          Choose Your Subdomain
        </CardTitle>
        <p className="text-body text-muted-foreground">
          Get your custom warranty portal instantly
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="yourcompany"
              value={subdomain}
              onChange={(e) => {
                setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                setIsAvailable(null);
              }}
              className="text-center text-lg bg-input border-border"
            />
            <span className="text-body text-muted-foreground whitespace-nowrap">
              .ewarranty.pk
            </span>
          </div>
          {subdomain && (
            <div className="text-center">
              <p className="text-small text-muted-foreground">
                Your portal will be: <span className="font-medium text-trust-blue">
                  {subdomain}.ewarranty.pk
                </span>
              </p>
            </div>
          )}
        </div>

        {subdomain.trim() && (
          <div className="space-y-4">
            <Button
              onClick={checkAvailability}
              disabled={isChecking}
              className="w-full bg-trust-blue hover:bg-trust-blue/90 text-trust-blue-foreground"
            >
              <Globe className="mr-2 h-4 w-4" />
              {isChecking ? 'Checking...' : 'Check Availability'}
            </Button>

            {isAvailable === true && (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-body font-medium">Available!</span>
                </div>
                <Button
                  onClick={handleGetStarted}
                  className="w-full bg-energy-yellow text-energy-yellow-foreground hover:bg-energy-yellow/90"
                  size="lg"
                >
                  Get Started with {subdomain}.ewarranty.pk
                </Button>
              </div>
            )}

            {isAvailable === false && (
              <div className="space-y-4">
                <div className="text-center text-error">
                  <span className="text-body font-medium">Not available or invalid</span>
                  <p className="text-small text-muted-foreground mt-1">
                    Subdomains must be at least 3 characters and cannot be reserved words
                  </p>
                </div>
                {suggestions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-small text-muted-foreground text-center">Try these suggestions:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSubdomain(suggestion);
                            setIsAvailable(null);
                          }}
                          className="text-trust-blue border-trust-blue hover:bg-trust-blue/10"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
