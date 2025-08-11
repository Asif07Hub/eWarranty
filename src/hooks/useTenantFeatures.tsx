
import { useTenant } from '@/contexts/TenantContext';

export const useTenantFeatures = () => {
  const { currentTenant } = useTenant();

  const hasFeature = (feature: string): boolean => {
    if (!currentTenant) return false;
    return currentTenant.features.includes(feature);
  };

  const getTenantTheme = () => {
    return currentTenant?.theme || 'light';
  };

  const getTenantBranding = () => {
    return {
      primaryColor: currentTenant?.primaryColor || '#00C853',
      companyName: currentTenant?.companyName || 'eWarranty Platform',
      displayName: currentTenant?.displayName || 'eWarranty',
      logoUrl: currentTenant?.logoUrl,
      subdomain: currentTenant?.subdomain || 'demo'
    };
  };

  const isPlanType = (planType: 'starter' | 'professional' | 'enterprise'): boolean => {
    if (!currentTenant) return false;
    
    const featureMap = {
      starter: ['basic-analytics', 'single-brand'],
      professional: ['advanced-analytics', 'multi-brand', 'api-access'],
      enterprise: ['enterprise-features', 'custom-integration']
    };
    
    return featureMap[planType].some(feature => currentTenant.features.includes(feature));
  };

  return {
    hasFeature,
    getTenantTheme,
    getTenantBranding,
    isPlanType,
    currentTenant
  };
};
