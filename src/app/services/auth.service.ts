import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User, UserRole, SignupData } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public user$ = this.userSubject.asObservable();
  public isLoading$ = this.loadingSubject.asObservable();

  // Demo users for frontend-only simulation
  private readonly DEMO_USERS = [
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

  constructor(private router: Router) {
    this.checkAuth();
  }

  private checkAuth(): void {
    const storedUser = localStorage.getItem('auth_user');
    const sessionExpiry = localStorage.getItem('auth_expiry');
    
    if (storedUser && sessionExpiry) {
      const now = new Date().getTime();
      const expiry = parseInt(sessionExpiry);
      
      if (now < expiry) {
        this.userSubject.next(JSON.parse(storedUser));
      } else {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_expiry');
      }
    }
    
    this.loadingSubject.next(false);
  }

  async login(email: string, password: string, tenantId?: string): Promise<void> {
    this.loadingSubject.next(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check demo users
    const demoUser = this.DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (demoUser) {
      const { password: _, ...userWithoutPassword } = demoUser;
      const userWithTenant: User = {
        ...userWithoutPassword,
        tenantId: demoUser.role === 'system-admin' ? undefined : tenantId
      };
      
      // Set session (expires in 24 hours)
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('auth_user', JSON.stringify(userWithTenant));
      localStorage.setItem('auth_expiry', expiry.toString());
      
      this.userSubject.next(userWithTenant);
      this.loadingSubject.next(false);
      return;
    }

    // Check if user exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const existingUser = existingUsers.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const { password: _, ...userWithoutPassword } = existingUser;
      const userWithTenant: User = {
        ...userWithoutPassword,
        tenantId
      };
      
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('auth_user', JSON.stringify(userWithTenant));
      localStorage.setItem('auth_expiry', expiry.toString());
      
      this.userSubject.next(userWithTenant);
      this.loadingSubject.next(false);
      return;
    }
    
    this.loadingSubject.next(false);
    throw new Error('Invalid credentials');
  }

  async signup(data: SignupData): Promise<void> {
    this.loadingSubject.next(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const userExists = existingUsers.some((u: any) => u.email === data.email);
    
    if (userExists) {
      this.loadingSubject.next(false);
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
    const { password: _, ...userWithoutPassword } = newUser;
    const userForAuth: User = userWithoutPassword;
    
    const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
    localStorage.setItem('auth_user', JSON.stringify(userForAuth));
    localStorage.setItem('auth_expiry', expiry.toString());
    
    this.userSubject.next(userForAuth);
    this.loadingSubject.next(false);
  }

  logout(): void {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_expiry');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }
}