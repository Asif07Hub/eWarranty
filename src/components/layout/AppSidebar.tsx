
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Settings,
  LayoutDashboard,
  Users,
  Package,
  Truck,
  Store,
  FileText,
  Shield,
  BarChart3,
  Factory,
  Warehouse,
  Zap,
  ShoppingCart,
  Smartphone,
  Building2,
  Globe,
  Server
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useBrands } from '@/contexts/BrandContext';
import { UserRole } from '@/types';

interface SidebarRoute {
  title: string;
  path: string;
  icon: React.ComponentType<any>;
  roles: UserRole[];
}

const routes: SidebarRoute[] = [
  // Platform Admin Routes (System Admin)
  {
    title: 'Platform Dashboard',
    path: '/platform/dashboard',
    icon: Globe,
    roles: ['system-admin']
  },
  {
    title: 'Tenant Management',
    path: '/platform/tenants',
    icon: Building2,
    roles: ['system-admin']
  },
  {
    title: 'Platform Analytics',
    path: '/platform/analytics',
    icon: BarChart3,
    roles: ['system-admin']
  },
  {
    title: 'Brand Management',
    path: '/platform/brands',
    icon: Settings,
    roles: ['system-admin']
  },
  {
    title: 'Claims Management',
    path: '/platform/claims',
    icon: FileText,
    roles: ['system-admin']
  },
  {
    title: 'Distributors Management',
    path: '/platform/distributors',
    icon: Users,
    roles: ['system-admin']
  },
  {
    title: 'System Health',
    path: '/platform/health',
    icon: Server,
    roles: ['system-admin']
  },

  // Brand Admin Routes
  {
    title: 'Dashboard',
    path: '/brandadmin/dashboard',
    icon: LayoutDashboard,
    roles: ['brand-admin']
  },
  {
    title: 'Analytics',
    path: '/brandadmin/analytics',
    icon: BarChart3,
    roles: ['brand-admin']
  },
  {
    title: 'Distributors',
    path: '/brandadmin/distributors',
    icon: Users,
    roles: ['brand-admin']
  },

  // Manufacturing Plant Routes
  {
    title: 'Dashboard',
    path: '/manufacturingunit/dashboard',
    icon: LayoutDashboard,
    roles: ['manufacturing-plant']
  },
  {
    title: 'Batch Management',
    path: '/manufacturingunit/batches',
    icon: Package,
    roles: ['manufacturing-plant']
  },
  {
    title: 'QR Generation',
    path: '/manufacturingunit/qr-generation',
    icon: Zap,
    roles: ['manufacturing-plant']
  },
  {
    title: 'Traceability',
    path: '/manufacturingunit/traceability',
    icon: Shield,
    roles: ['manufacturing-plant']
  },

  // Warehouse Routes
  {
    title: 'Dashboard',
    path: '/warehouse/dashboard',
    icon: LayoutDashboard,
    roles: ['plant-warehouse']
  },
  {
    title: 'Inventory',
    path: '/warehouse/inventory',
    icon: Package,
    roles: ['plant-warehouse']
  },
  {
    title: 'Supply Chain',
    path: '/warehouse/supply-chain',
    icon: Truck,
    roles: ['plant-warehouse']
  },
  {
    title: 'Shelf Life Alerts',
    path: '/warehouse/alerts',
    icon: FileText,
    roles: ['plant-warehouse']
  },

  // Distributor Routes
  {
    title: 'Dashboard',
    path: '/distributor/dashboard',
    icon: LayoutDashboard,
    roles: ['brand-distributor']
  },
  {
    title: 'Inventory',
    path: '/distributor/inventory',
    icon: Package,
    roles: ['brand-distributor']
  },
  {
    title: 'Supply Chain',
    path: '/distributor/supply-chain',
    icon: Truck,
    roles: ['brand-distributor']
  },
  {
    title: 'Retailer Alerts',
    path: '/distributor/alerts',
    icon: FileText,
    roles: ['brand-distributor']
  },

  // Retailer Routes
  {
    title: 'Dashboard',
    path: '/retailer/dashboard',
    icon: LayoutDashboard,
    roles: ['brand-retailer']
  },
  {
    title: 'Inventory',
    path: '/retailer/inventory',
    icon: Package,
    roles: ['brand-retailer']
  },
  {
    title: 'Supply Chain',
    path: '/retailer/supply-chain',
    icon: Truck,
    roles: ['brand-retailer']
  },
  {
    title: 'Sales',
    path: '/retailer/sales',
    icon: ShoppingCart,
    roles: ['brand-retailer']
  },

  // Customer Routes
  {
    title: 'Register Battery',
    path: '/customer/register',
    icon: Smartphone,
    roles: ['customer']
  },
  {
    title: 'Submit Claim',
    path: '/customer/claim',
    icon: FileText,
    roles: ['customer']
  },
  {
    title: 'Check Status',
    path: '/customer/status',
    icon: Shield,
    roles: ['customer']
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { user } = useAuth();
  const { activeBrand } = useBrands();
  const location = useLocation();

  const userRoutes = routes.filter(route => 
    user?.role && route.roles.includes(user.role)
  );

  const isActive = (path: string) => location.pathname === path;

  const getNavClassName = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-accent hover:text-accent-foreground transition-colors";
  };

  // Check if user is system admin
  const isSystemAdmin = user?.role === 'system-admin';

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-gradient-to-b from-card to-card/95">
        <div className="p-4 border-b border-border">
          {!collapsed && (
            <div className="space-y-2">
              {isSystemAdmin ? (
                <>
                  <h2 className="text-lg font-bold text-foreground">
                    eWarranty Platform
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    System Administration
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-foreground">
                    Pakistan Accumulators
                  </h2>
                  {activeBrand && (
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: activeBrand.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {activeBrand.displayName}
                      </span>
                    </div>
                  )}
                </>
              )}
              {user && (
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role.replace('-', ' ')}
                </p>
              )}
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            {isSystemAdmin ? 'Platform Management' : 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userRoutes.map((route) => {
                const Icon = route.icon;
                return (
                  <SidebarMenuItem key={route.path}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={route.path} 
                        className={getNavClassName(route.path)}
                      >
                        <Icon className="h-4 w-4" />
                        {!collapsed && <span>{route.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
