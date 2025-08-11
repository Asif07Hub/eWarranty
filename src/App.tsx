
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { BrandProvider } from '@/contexts/BrandContext';
import { TenantProvider } from '@/contexts/TenantContext';
import { Toaster } from '@/components/ui/sonner';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AppLayout } from '@/components/layout/AppLayout';

// Public pages
import { Index } from '@/pages/Index';
import { Login } from '@/pages/auth/Login';
import CompanyInfo from '@/pages/signup/CompanyInfo';
import AccountSetup from '@/pages/signup/AccountSetup';
import BrandSetup from '@/pages/signup/BrandSetup';
import SelectPlan from '@/pages/signup/SelectPlan';
import Onboarding from '@/pages/signup/Onboarding';
import { SelectSubdomain } from '@/pages/signup/SelectSubdomain';
import NotFound from '@/pages/NotFound';

// Dashboard redirect component
import { DashboardRedirect } from '@/components/DashboardRedirect';

// Platform admin pages
import PlatformDashboard from '@/pages/platform/Dashboard';
import TenantManagement from '@/pages/platform/TenantManagement';
import { PlatformAnalytics } from '@/pages/platform/Analytics';
import PlatformBrandManagement from '@/pages/platform/BrandManagement';
import { PlatformClaimsManagement } from '@/pages/platform/ClaimsManagement';
import { PlatformDistributorsManagement } from '@/pages/platform/DistributorsManagement';

// Brand admin pages
import BrandAdminDashboard from '@/pages/brandadmin/Dashboard';

// Manufacturing pages
import ManufacturingDashboard from '@/pages/manufacturingunit/Dashboard';

// Warehouse pages
import { Dashboard as WarehouseDashboard } from '@/pages/warehouse/Dashboard';

// Distributor pages
import { Dashboard as DistributorDashboard } from '@/pages/distributor/Dashboard';

// Retailer pages
import { Dashboard as RetailerDashboard } from '@/pages/retailer/Dashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <TenantProvider>
            <BrandProvider>
              <div className="min-h-screen bg-background">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Signup Flow */}
                  <Route path="/signup" element={<SelectSubdomain />} />
                  <Route path="/signup/company-info" element={<CompanyInfo />} />
                  <Route path="/signup/account-setup" element={<AccountSetup />} />
                  <Route path="/signup/brand-setup" element={<BrandSetup />} />
                  <Route path="/signup/select-plan" element={<SelectPlan />} />
                  <Route path="/signup/onboarding" element={<Onboarding />} />
                  
                  {/* Smart dashboard redirect */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardRedirect />
                    </ProtectedRoute>
                  } />
                  
                  {/* Platform Admin routes (System Admin only) */}
                  <Route path="/platform/dashboard" element={
                    <ProtectedRoute allowedRoles={['system-admin']}>
                      <AppLayout>
                        <PlatformDashboard />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/platform/tenants" element={
                    <ProtectedRoute allowedRoles={['system-admin']}>
                      <AppLayout>
                        <TenantManagement />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/platform/analytics" element={
                    <ProtectedRoute allowedRoles={['system-admin']}>
                      <AppLayout>
                        <PlatformAnalytics />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/platform/brands" element={
                    <ProtectedRoute allowedRoles={['system-admin']}>
                      <AppLayout>
                        <PlatformBrandManagement />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/platform/claims" element={
                    <ProtectedRoute allowedRoles={['system-admin']}>
                      <AppLayout>
                        <PlatformClaimsManagement />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/platform/distributors" element={
                    <ProtectedRoute allowedRoles={['system-admin']}>
                      <AppLayout>
                        <PlatformDistributorsManagement />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  {/* Brand Admin routes */}
                  <Route path="/brandadmin/dashboard" element={
                    <ProtectedRoute allowedRoles={['brand-admin']}>
                      <AppLayout>
                        <BrandAdminDashboard />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  {/* Manufacturing routes */}
                  <Route path="/manufacturing/dashboard" element={
                    <ProtectedRoute allowedRoles={['manufacturing-plant']}>
                      <AppLayout>
                        <ManufacturingDashboard />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  {/* Warehouse routes */}
                  <Route path="/warehouse/dashboard" element={
                    <ProtectedRoute allowedRoles={['plant-warehouse']}>
                      <AppLayout>
                        <WarehouseDashboard />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  {/* Distributor routes */}
                  <Route path="/distributor/dashboard" element={
                    <ProtectedRoute allowedRoles={['brand-distributor']}>
                      <AppLayout>
                        <DistributorDashboard />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  {/* Retailer routes */}
                  <Route path="/retailer/dashboard" element={
                    <ProtectedRoute allowedRoles={['brand-retailer']}>
                      <AppLayout>
                        <RetailerDashboard />
                      </AppLayout>
                    </ProtectedRoute>
                  } />

                  {/* Catch all - redirect to home */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                <Toaster />
              </div>
            </BrandProvider>
          </TenantProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
