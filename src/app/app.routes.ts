import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  // Public routes
  { path: '', loadComponent: () => import('./pages/index/index.component').then(m => m.IndexComponent) },
  { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
  
  // Signup Flow
  { path: 'signup', loadComponent: () => import('./pages/signup/select-subdomain/select-subdomain.component').then(m => m.SelectSubdomainComponent) },
  { path: 'signup/company-info', loadComponent: () => import('./pages/signup/company-info/company-info.component').then(m => m.CompanyInfoComponent) },
  { path: 'signup/account-setup', loadComponent: () => import('./pages/signup/account-setup/account-setup.component').then(m => m.AccountSetupComponent) },
  { path: 'signup/brand-setup', loadComponent: () => import('./pages/signup/brand-setup/brand-setup.component').then(m => m.BrandSetupComponent) },
  { path: 'signup/select-plan', loadComponent: () => import('./pages/signup/select-plan/select-plan.component').then(m => m.SelectPlanComponent) },
  { path: 'signup/onboarding', loadComponent: () => import('./pages/signup/onboarding/onboarding.component').then(m => m.OnboardingComponent) },
  
  // Dashboard redirect
  { 
    path: 'dashboard', 
    loadComponent: () => import('./components/dashboard-redirect/dashboard-redirect.component').then(m => m.DashboardRedirectComponent),
    canActivate: [AuthGuard]
  },
  
  // Platform Admin routes (System Admin only)
  {
    path: 'platform',
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['system-admin'] },
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/platform/dashboard/dashboard.component').then(m => m.PlatformDashboardComponent) },
      { path: 'tenants', loadComponent: () => import('./pages/platform/tenant-management/tenant-management.component').then(m => m.TenantManagementComponent) },
      { path: 'analytics', loadComponent: () => import('./pages/platform/analytics/analytics.component').then(m => m.PlatformAnalyticsComponent) },
      { path: 'brands', loadComponent: () => import('./pages/platform/brand-management/brand-management.component').then(m => m.PlatformBrandManagementComponent) },
      { path: 'claims', loadComponent: () => import('./pages/platform/claims-management/claims-management.component').then(m => m.PlatformClaimsManagementComponent) },
      { path: 'distributors', loadComponent: () => import('./pages/platform/distributors-management/distributors-management.component').then(m => m.PlatformDistributorsManagementComponent) }
    ]
  },

  // Brand Admin routes
  {
    path: 'brandadmin',
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['brand-admin'] },
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/brandadmin/dashboard/dashboard.component').then(m => m.BrandAdminDashboardComponent) }
    ]
  },

  // Manufacturing routes
  {
    path: 'manufacturing',
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['manufacturing-plant'] },
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/manufacturing/dashboard/dashboard.component').then(m => m.ManufacturingDashboardComponent) },
      { path: 'qr-generation', loadComponent: () => import('./pages/manufacturing/qr-generation/qr-generation.component').then(m => m.QrGenerationComponent) },
      { path: 'traceability', loadComponent: () => import('./pages/manufacturing/traceability/traceability.component').then(m => m.TraceabilityComponent) }
    ]
  },

  // Warehouse routes
  {
    path: 'warehouse',
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['plant-warehouse'] },
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/warehouse/dashboard/dashboard.component').then(m => m.WarehouseDashboardComponent) },
      { path: 'inventory', loadComponent: () => import('./pages/warehouse/inventory/inventory.component').then(m => m.InventoryComponent) },
      { path: 'alerts', loadComponent: () => import('./pages/warehouse/alerts/alerts.component').then(m => m.AlertsComponent) }
    ]
  },

  // Distributor routes
  {
    path: 'distributor',
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['brand-distributor'] },
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/distributor/dashboard/dashboard.component').then(m => m.DistributorDashboardComponent) }
    ]
  },

  // Retailer routes
  {
    path: 'retailer',
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['brand-retailer'] },
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/retailer/dashboard/dashboard.component').then(m => m.RetailerDashboardComponent) },
      { path: 'sales', loadComponent: () => import('./pages/retailer/sales/sales.component').then(m => m.SalesComponent) }
    ]
  },

  // Customer routes
  {
    path: 'customer',
    children: [
      { path: 'register', loadComponent: () => import('./pages/customer/register-battery/register-battery.component').then(m => m.RegisterBatteryComponent) },
      { path: 'claim', loadComponent: () => import('./pages/customer/submit-claim/submit-claim.component').then(m => m.SubmitClaimComponent) },
      { path: 'status', loadComponent: () => import('./pages/customer/check-status/check-status.component').then(m => m.CheckStatusComponent) }
    ]
  },

  // Catch all - redirect to home
  { path: '**', redirectTo: '' }
];