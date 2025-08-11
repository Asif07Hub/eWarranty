import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '@/types';

interface SignupData {
  name: string;
  email: string;
  password: string;
  company: string;
  tenantId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, tenantId?: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Demo users for frontend-only simulation with actual business roles
const DEMO_USERS = [
  {
    id: '1',
    email: 'sysadmin@ewarranty.pk',
    password: 'demo123',
    name: 'System Administrator',
    role: 'system-admin' as UserRole,
    company: 'eWarranty Platform',
    isActive: true
  },
  {
    id: '2',
    email: 'brandadmin@ewarranty.pk',
    password: 'demo123',
    name: 'Brand Administrator',
    role: 'brand-admin' as UserRole,
    company: 'PowerCell Industries',
    brandId: 'brand-1',
    isActive: true
  },
  {
    id: '3',
    email: 'plant@ewarranty.pk',
    password: 'demo123',
    name: 'Manufacturing Plant Manager',
    role: 'manufacturing-plant' as UserRole,
    company: 'PowerCell Manufacturing',
    brandId: 'brand-1',
    isActive: true
  },
  {
    id: '4',
    email: 'distributor@ewarranty.pk',
    password: 'demo123',
    name: 'Brand Distributor',
    role: 'brand-distributor' as UserRole,
    company: 'PowerCell Distribution',
    brandId: 'brand-1',
    isActive: true
  },
  {
    id: '5',
    email: 'customer@ewarranty.pk',
    password: 'demo123',
    name: 'End Customer',
    role: 'customer' as UserRole,
    company: 'Personal',
    isActive: true
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('auth_user');
      const sessionExpiry = localStorage.getItem('auth_expiry');
      
      if (storedUser && sessionExpiry) {
        const now = new Date().getTime();
        const expiry = parseInt(sessionExpiry);
        
        if (now < expiry) {
          setUser(JSON.parse(storedUser));
        } else {
          // Session expired
          localStorage.removeItem('auth_user');
          localStorage.removeItem('auth_expiry');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, tenantId?: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check demo users
    const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (demoUser) {
      const { password, ...userWithoutPassword } = demoUser;
      const userWithTenant: User = {
        ...userWithoutPassword,
        tenantId: demoUser.role === 'system-admin' ? undefined : tenantId
      };
      
      // Set session (expires in 24 hours)
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('auth_user', JSON.stringify(userWithTenant));
      localStorage.setItem('auth_expiry', expiry.toString());
      
      setUser(userWithTenant);
      setIsLoading(false);
      return;
    }

    // Check if user exists in localStorage (for previously signed up users)
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const existingUser = existingUsers.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const { password, ...userWithoutPassword } = existingUser;
      const userWithTenant: User = {
        ...userWithoutPassword,
        tenantId
      };
      
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('auth_user', JSON.stringify(userWithTenant));
      localStorage.setItem('auth_expiry', expiry.toString());
      
      setUser(userWithTenant);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
    throw new Error('Invalid credentials');
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const userExists = existingUsers.some((u: any) => u.email === data.email);
    
    if (userExists) {
      setIsLoading(false);
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: data.email,
      password: data.password,
      name: data.name,
      role: 'user' as UserRole,
      company: data.company,
      tenantId: data.tenantId,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
    
    // Auto-login the new user
    const { password, ...userWithoutPassword } = newUser;
    const userForAuth: User = userWithoutPassword;
    
    const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
    localStorage.setItem('auth_user', JSON.stringify(userForAuth));
    localStorage.setItem('auth_expiry', expiry.toString());
    
    setUser(userForAuth);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_expiry');
    setUser(null);
    navigate('/');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isLoading, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
