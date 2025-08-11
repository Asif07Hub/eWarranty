import React from 'react';
import { Check, ChevronDown, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useBrands } from '@/contexts/BrandContext';
import { useAuth } from '@/contexts/AuthContext';

interface BrandSelectorProps {
  className?: string;
}

export const BrandSelector: React.FC<BrandSelectorProps> = ({ className }) => {
  const { brands, activeBrand, setActiveBrand } = useBrands();
  const { user } = useAuth();

  // Filter brands based on user role
  const getAvailableBrands = () => {
    if (!user) return [];
    
    // System admins and company admins can see all brands
    if (user.role === 'system-admin' || user.role === 'brand-admin') {
      return brands;
    }
    
    // Brand-specific users only see their assigned brand
    if (user.brandId) {
      return brands.filter(brand => brand.id === user.brandId);
    }
    
    return brands;
  };

  const availableBrands = getAvailableBrands();

  // Don't show selector if user has access to only one brand
  if (availableBrands.length <= 1) {
    return null;
  }

  const handleBrandSelect = (brand: typeof activeBrand) => {
    setActiveBrand(brand);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button 
          variant="outline" 
          className="h-9 px-3 flex items-center gap-2 border-border"
        >
          {activeBrand && (
            <>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: activeBrand.color }}
              />
              <span className="text-body font-medium">
                {activeBrand.displayName}
              </span>
            </>
          )}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <p className="text-small text-muted-foreground mb-2">Switch Brand</p>
          
          {availableBrands.map((brand) => (
            <DropdownMenuItem
              key={brand.id}
              onClick={() => handleBrandSelect(brand)}
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-section-background rounded-md"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: brand.color }}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-body font-medium">
                      {brand.displayName}
                    </span>
                    {brand.id === '1' && ( // Assuming first brand is primary
                      <Badge className="bg-battery-green text-white flex items-center gap-1 text-xs">
                        <Crown className="h-2 w-2" />
                        Primary
                      </Badge>
                    )}
                  </div>
                  <span className="text-small text-muted-foreground">
                    @{brand.name}
                  </span>
                </div>
              </div>
              
              {activeBrand?.id === brand.id && (
                <Check className="h-4 w-4 text-battery-green" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-small"
            onClick={() => {
              // Navigate to brand management
              window.location.href = '/platform/brands';
            }}
          >
            Manage Brands
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};