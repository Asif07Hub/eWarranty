
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardRedirect: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Route users to their appropriate dashboard based on role
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
    case 'customer':
      // For customers, we might want to redirect to a customer-specific page
      // For now, let's redirect to a general customer dashboard or home page
      return <Navigate to="/" replace />;
    default:
      // For any unknown roles, redirect to home
      return <Navigate to="/" replace />;
  }
};
