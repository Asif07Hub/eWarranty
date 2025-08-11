
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface TenantConfig {
  id: string;
  subdomain: string;
  companyName: string;
  displayName: string;
  primaryColor: string;
  logoUrl?: string;
  industry: string;
  features: string[];
  theme: 'light' | 'dark';
}

interface TenantContextType {
  currentTenant: TenantConfig | null;
  setCurrentTenant: (tenant: TenantConfig | null) => void;
  isSimulationMode: boolean;
  availableTenants: TenantConfig[];
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

// Demo tenant configurations for development/testing
const demoTenants: TenantConfig[] = [
  {
    id: 'techcorp',
    subdomain: 'techcorp',
    companyName: 'TechCorp Electronics',
    displayName: 'TechCorp',
    primaryColor: '#0D47A1', // Trust Blue
    industry: 'Electronics',
    features: ['advanced-analytics', 'multi-brand', 'api-access'],
    theme: 'light'
  },
  {
    id: 'autoparts',
    subdomain: 'autoparts',
    companyName: 'AutoParts Pakistan',
    displayName: 'AutoParts',
    primaryColor: '#00C853', // Battery Green
    industry: 'Automotive',
    features: ['basic-analytics', 'single-brand'],
    theme: 'light'
  },
  {
    id: 'homesolutions',
    subdomain: 'homesolutions',
    companyName: 'Home Solutions Ltd',
    displayName: 'Home Solutions',
    primaryColor: '#1B5E20', // Success Green
    industry: 'Home Appliances',
    features: ['advanced-analytics', 'multi-brand'],
    theme: 'light'
  },
  {
    id: 'industrialtech',
    subdomain: 'industrialtech',
    companyName: 'Industrial Tech Co',
    displayName: 'Industrial Tech',
    primaryColor: '#F9A825', // Warning/Energy Yellow
    industry: 'Industrial Equipment',
    features: ['enterprise-features', 'custom-integration'],
    theme: 'dark'
  }
];

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState<TenantConfig | null>(null);
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Check URL parameters for tenant simulation
    const urlParams = new URLSearchParams(window.location.search);
    const tenantParam = urlParams.get('tenant');
    
    if (tenantParam) {
      const tenant = demoTenants.find(t => t.id === tenantParam);
      if (tenant) {
        setCurrentTenant(tenant);
        setIsSimulationMode(true);
        console.log(`🏢 Tenant Simulation Mode: ${tenant.displayName}`);
      }
    } else {
      // Check if we're in development mode
      const isDev = import.meta.env.DEV;
      if (isDev) {
        setIsSimulationMode(true);
        // Default to first tenant in development
        setCurrentTenant(demoTenants[0]);
      }
    }
  }, []);

  // Apply tenant-specific CSS variables when tenant changes
  useEffect(() => {
    const root = document.documentElement;
    
    // System Admin should use platform default colors
    if (user?.role === 'system-admin') {
      // Reset to platform default colors (defined in index.css)
      root.style.removeProperty('--primary');
      document.title = 'eWarranty Platform - System Administration';
      console.log('🎨 Applied platform default theme for System Admin');
      return;
    }
    
    if (currentTenant) {
      // Convert hex to hsl for our design system
      const hexToHsl = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;
        
        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        
        return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
      };
      
      // Apply tenant-specific primary color
      root.style.setProperty('--primary', hexToHsl(currentTenant.primaryColor));
      
      // Update page title
      document.title = `${currentTenant.displayName} - eWarranty Platform`;
      console.log(`🎨 Applied theme for ${currentTenant.displayName}`);
    }
  }, [currentTenant, user?.role]);

  return (
    <TenantContext.Provider value={{
      currentTenant,
      setCurrentTenant,
      isSimulationMode,
      availableTenants: demoTenants
    }}>
      {children}
    </TenantContext.Provider>
  );
};
