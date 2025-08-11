
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  allowedRoles
}) => {
  const { user, isLoading } = useAuth();
  const { currentTenant } = useTenant();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    // Store the attempted URL for redirect after login
    const redirectPath = location.pathname + location.search;
    const loginPath = `/login${currentTenant ? `?tenant=${currentTenant.subdomain}&redirect=${encodeURIComponent(redirectPath)}` : `?redirect=${encodeURIComponent(redirectPath)}`}`;
    
    return <Navigate to={loginPath} replace />;
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    switch (user.role) {
      case 'system-admin':
        return <Navigate to="/platform/dashboard" replace />;
      case 'brand-admin':
        return <Navigate to="/brandadmin/dashboard" replace />;
      case 'manufacturing-plant':
        return <Navigate to="/manufacturing/dashboard" replace />;
      case 'plant-warehouse':
        return <Navigate to="/warehouse/dashboard" replace />;
      case 'brand-distributor':
        return <Navigate to="/distributor/dashboard" replace />;
      case 'brand-retailer':
        return <Navigate to="/retailer/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
