import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TenantConfig } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private currentTenantSubject = new BehaviorSubject<TenantConfig | null>(null);
  private isSimulationModeSubject = new BehaviorSubject<boolean>(false);

  public currentTenant$ = this.currentTenantSubject.asObservable();
  public isSimulationMode$ = this.isSimulationModeSubject.asObservable();

  // Demo tenant configurations
  private readonly demoTenants: TenantConfig[] = [
    {
      id: 'techcorp',
      subdomain: 'techcorp',
      companyName: 'TechCorp Electronics',
      displayName: 'TechCorp',
      primaryColor: '#0D47A1',
      industry: 'Electronics',
      features: ['advanced-analytics', 'multi-brand', 'api-access'],
      theme: 'light'
    },
    {
      id: 'autoparts',
      subdomain: 'autoparts',
      companyName: 'AutoParts Pakistan',
      displayName: 'AutoParts',
      primaryColor: '#00C853',
      industry: 'Automotive',
      features: ['basic-analytics', 'single-brand'],
      theme: 'light'
    },
    {
      id: 'homesolutions',
      subdomain: 'homesolutions',
      companyName: 'Home Solutions Ltd',
      displayName: 'Home Solutions',
      primaryColor: '#1B5E20',
      industry: 'Home Appliances',
      features: ['advanced-analytics', 'multi-brand'],
      theme: 'light'
    },
    {
      id: 'industrialtech',
      subdomain: 'industrialtech',
      companyName: 'Industrial Tech Co',
      displayName: 'Industrial Tech',
      primaryColor: '#F9A825',
      industry: 'Industrial Equipment',
      features: ['enterprise-features', 'custom-integration'],
      theme: 'dark'
    }
  ];

  constructor() {
    this.initializeTenant();
  }

  private initializeTenant(): void {
    // Check URL parameters for tenant simulation
    const urlParams = new URLSearchParams(window.location.search);
    const tenantParam = urlParams.get('tenant');
    
    if (tenantParam) {
      const tenant = this.demoTenants.find(t => t.id === tenantParam);
      if (tenant) {
        this.setCurrentTenant(tenant);
        this.isSimulationModeSubject.next(true);
        console.log(`🏢 Tenant Simulation Mode: ${tenant.displayName}`);
      }
    } else {
      // Check if we're in development mode
      const isDev = !environment.production;
      if (isDev) {
        this.isSimulationModeSubject.next(true);
        this.setCurrentTenant(this.demoTenants[0]);
      }
    }
  }

  setCurrentTenant(tenant: TenantConfig | null): void {
    this.currentTenantSubject.next(tenant);
    this.applyTenantTheme(tenant);
  }

  private applyTenantTheme(tenant: TenantConfig | null): void {
    const root = document.documentElement;
    
    if (tenant) {
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
      root.style.setProperty('--primary', hexToHsl(tenant.primaryColor));
      
      // Update page title
      document.title = `${tenant.displayName} - eWarranty Platform`;
      console.log(`🎨 Applied theme for ${tenant.displayName}`);
    }
  }

  get currentTenant(): TenantConfig | null {
    return this.currentTenantSubject.value;
  }

  get availableTenants(): TenantConfig[] {
    return this.demoTenants;
  }

  get isSimulationMode(): boolean {
    return this.isSimulationModeSubject.value;
  }
}

// Environment placeholder - will be replaced by Angular CLI
const environment = { production: false };