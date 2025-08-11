export interface Brand {
  id: string;
  name: string;
  displayName: string;
  color: string;
  logo?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  brandId?: string;
  company?: string;
  tenantId?: string;
  isActive: boolean;
}

export type UserRole = 
  | 'system-admin'
  | 'brand-admin'
  | 'manufacturing-plant'
  | 'plant-warehouse'
  | 'brand-distributor'
  | 'brand-retailer'
  | 'customer'
  | 'admin'
  | 'manager'
  | 'user';

export interface Product {
  id: string;
  brandId: string;
  name: string;
  model: string;
  batchNumber: string;
  serialNumber: string;
  qrCode: string;
  manufacturedDate: Date;
  warrantyPeriod: number; // in months
  status: 'manufactured' | 'in-warehouse' | 'distributed' | 'sold' | 'claimed';
}

export interface WarrantyClaim {
  id: string;
  productId: string;
  customerId: string;
  issueDescription: string;
  status: 'submitted' | 'under-review' | 'approved' | 'rejected' | 'completed';
  submittedAt: Date;
  resolvedAt?: Date;
}

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

export interface SignupData {
  name: string;
  email: string;
  password: string;
  company: string;
  tenantId?: string;
}