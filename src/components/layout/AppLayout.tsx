
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useBrands } from '@/contexts/BrandContext';
import { useTenant } from '@/contexts/TenantContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, LogOut, Building2, Zap, Globe } from 'lucide-react';
import { BrandSelector } from '@/components/BrandSelector';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { activeBrand } = useBrands();
  const { currentTenant, isSimulationMode } = useTenant();

  // Check if user is system admin (platform level)
  const isSystemAdmin = user?.role === 'system-admin';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Modern Header */}
          <header className="h-16 border-b border-border/50 bg-card/80 backdrop-blur-md shadow-elegant">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground transition-colors" />
                <div className="h-6 w-px bg-border/50" />
                
                <div className="flex items-center space-x-3">
                  {/* Show different branding based on user role */}
                  {isSystemAdmin ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-trust-blue flex items-center justify-center">
                        <Globe className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h1 className="text-lg font-semibold text-foreground font-heading">
                          eWarranty Platform
                        </h1>
                        <p className="text-xs text-muted-foreground">
                          System Administration
                        </p>
                      </div>
                    </div>
                  ) : isSimulationMode && currentTenant ? (
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center shadow-glow"
                          style={{ backgroundColor: currentTenant.primaryColor }}
                        >
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h1 className="text-lg font-semibold text-foreground font-heading">
                            {currentTenant.displayName}
                          </h1>
                          <p className="text-xs text-muted-foreground">
                            {currentTenant.subdomain}.ewarranty.pk
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs bg-accent/10">
                        {currentTenant.industry}
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <h1 className="text-lg font-semibold text-foreground font-heading">
                        Pakistan Accumulators
                      </h1>
                    </div>
                  )}
                  
                  {/* Only show brand info for non-system-admin users */}
                  {!isSystemAdmin && activeBrand && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <Badge 
                        className="text-white border-0 shadow-sm"
                        style={{ backgroundColor: activeBrand.color }}
                      >
                        {activeBrand.displayName}
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Brand Selector - only for non-system-admin users */}
                {!isSystemAdmin && <BrandSelector />}
                
                {user && (
                  <div className="flex items-center space-x-3">
                    <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-accent/50">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">
                          {user.name}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {user.role.replace('-', ' ')}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={logout}
                      className="text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">Sign Out</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-section-background/30">
            <div className="p-6 max-w-content mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
