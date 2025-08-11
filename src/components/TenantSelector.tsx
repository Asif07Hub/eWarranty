
import React from 'react';
import { useTenant } from '@/contexts/TenantContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Building2, Palette, Code, Globe } from 'lucide-react';

export const TenantSelector: React.FC = () => {
  const { currentTenant, setCurrentTenant, isSimulationMode, availableTenants } = useTenant();

  if (!isSimulationMode) return null;

  const handleTenantChange = (tenantId: string) => {
    const tenant = availableTenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
      
      // Update URL parameter for easy sharing
      const url = new URL(window.location.href);
      url.searchParams.set('tenant', tenantId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const copyTenantUrl = () => {
    if (currentTenant) {
      const url = `${window.location.origin}?tenant=${currentTenant.id}`;
      navigator.clipboard.writeText(url);
      console.log(`📋 Copied tenant URL: ${url}`);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="bg-card/95 backdrop-blur-sm border border-border shadow-elegant w-80">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-title font-heading flex items-center">
              <Code className="mr-2 h-4 w-4 text-energy-yellow" />
              Dev Mode
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Multi-Tenant Simulator
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-small font-medium text-foreground">
              Active Tenant
            </label>
            <Select
              value={currentTenant?.id || ''}
              onValueChange={handleTenantChange}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select tenant..." />
              </SelectTrigger>
              <SelectContent>
                {availableTenants.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: tenant.primaryColor }}
                      />
                      <span>{tenant.displayName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentTenant && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-small text-muted-foreground">
                  {currentTenant.industry}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-small text-muted-foreground">
                  {currentTenant.subdomain}.ewarranty.pk
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center space-x-1">
                  <div 
                    className="w-4 h-4 rounded border border-border"
                    style={{ backgroundColor: currentTenant.primaryColor }}
                  />
                  <span className="text-small text-muted-foreground">
                    {currentTenant.primaryColor}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {currentTenant.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature.replace('-', ' ')}
                  </Badge>
                ))}
              </div>

              <Button 
                onClick={copyTenantUrl} 
                variant="outline" 
                size="sm" 
                className="w-full text-xs"
              >
                Copy Tenant URL
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
