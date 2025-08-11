import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { TenantService } from '../../../services/tenant.service';
import { TenantConfig } from '../../../types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div class="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-trust-blue/10 rounded-full blur-3xl animate-pulse"></div>
      
      <!-- Header -->
      <header class="relative z-10 p-6">
        <div class="flex items-center justify-between max-w-6xl mx-auto">
          <a routerLink="/" class="flex items-center gap-3 group">
            <button mat-icon-button class="group-hover:bg-accent">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <mat-icon class="text-white text-sm">flash_on</mat-icon>
              </div>
              <span class="font-bold">eWarranty</span>
            </div>
          </a>
          
          <button mat-stroked-button routerLink="/signup">Create Account</button>
        </div>
      </header>

      <!-- Main Content -->
      <div class="relative z-10 flex items-center justify-center px-4 py-12">
        <mat-card class="w-full max-w-md bg-card/80 backdrop-blur-sm shadow-elegant">
          <mat-card-header class="text-center space-y-4 pb-6">
            <div class="flex items-center justify-center">
              <div class="w-12 h-12 rounded-full flex items-center justify-center shadow-glow"
                   [style.background-color]="(currentTenant$ | async)?.primaryColor || 'hsl(var(--trust-blue))'">
                <mat-icon class="text-white">login</mat-icon>
              </div>
            </div>
            <div class="space-y-2">
              <mat-card-title class="text-xl">
                Welcome to {{ (currentTenant$ | async)?.displayName || 'eWarranty' }}
              </mat-card-title>
              <p class="text-muted">Sign in to your warranty portal</p>
              <p *ngIf="currentTenant$ | async as tenant" class="text-sm text-muted opacity-75">
                {{ tenant.subdomain }}.ewarranty.pk
              </p>
            </div>
          </mat-card-header>

          <mat-card-content class="space-y-6">
            <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-4">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Email Address</mat-label>
                <input matInput 
                       type="email" 
                       [(ngModel)]="email" 
                       name="email"
                       placeholder="Enter your email"
                       required>
                <mat-icon matPrefix>mail</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Password</mat-label>
                <input matInput 
                       [type]="hidePassword ? 'password' : 'text'"
                       [(ngModel)]="password" 
                       name="password"
                       placeholder="Enter your password"
                       required>
                <mat-icon matPrefix>lock</mat-icon>
                <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                  <mat-icon>{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
                </button>
              </mat-form-field>

              <button mat-raised-button 
                      color="primary" 
                      type="submit"
                      class="w-full shadow-glow"
                      [disabled]="isLoading || !loginForm.valid">
                <div *ngIf="isLoading" class="flex items-center gap-2">
                  <mat-spinner diameter="16"></mat-spinner>
                  <span>Signing in...</span>
                </div>
                <span *ngIf="!isLoading">Sign In</span>
              </button>
            </form>

            <div class="text-center">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-border/50"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-3 bg-card text-muted">Or try demo</span>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <div class="grid grid-cols-2 gap-2">
                <button mat-stroked-button 
                        (click)="demoLogin('system-admin')"
                        [disabled]="isLoading"
                        class="text-xs">
                  System Admin
                </button>
                <button mat-stroked-button 
                        (click)="demoLogin('brand-admin')"
                        [disabled]="isLoading"
                        class="text-xs">
                  Brand Admin
                </button>
                <button mat-stroked-button 
                        (click)="demoLogin('manufacturing-plant')"
                        [disabled]="isLoading"
                        class="text-xs">
                  Manufacturing
                </button>
                <button mat-stroked-button 
                        (click)="demoLogin('brand-distributor')"
                        [disabled]="isLoading"
                        class="text-xs">
                  Distributor
                </button>
              </div>
              <button mat-stroked-button 
                      (click)="demoLogin('customer')"
                      [disabled]="isLoading"
                      class="w-full text-xs">
                Customer
              </button>
            </div>

            <div class="text-center text-sm text-muted">
              Don't have an account?
              <a routerLink="/signup" 
                 [queryParams]="(currentTenant$ | async)?.subdomain ? { tenant: (currentTenant$ | async)?.subdomain } : {}"
                 class="text-primary hover:underline font-medium ml-1">
                Sign up
              </a>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .bg-gradient-primary {
      background: var(--gradient-primary);
    }
    
    .bg-gradient-hero {
      background: var(--gradient-hero);
    }
    
    .shadow-elegant {
      box-shadow: var(--shadow-elegant);
    }
    
    .shadow-glow {
      box-shadow: var(--shadow-glow);
    }
  `]
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  hidePassword = true;
  isLoading = false;
  redirectTo = '/dashboard';
  currentTenant$: Observable<TenantConfig | null>;

  constructor(
    private authService: AuthService,
    private tenantService: TenantService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.currentTenant$ = this.tenantService.currentTenant$;
  }

  ngOnInit(): void {
    this.redirectTo = this.route.snapshot.queryParams['redirect'] || '/dashboard';
  }

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) return;

    this.isLoading = true;

    try {
      const currentTenant = this.tenantService.currentTenant;
      await this.authService.login(this.email, this.password, currentTenant?.subdomain);
      
      if (this.email === 'sysadmin@ewarranty.pk') {
        this.router.navigate(['/platform/dashboard']);
      } else {
        this.router.navigate([this.redirectTo]);
      }
    } catch (error) {
      this.snackBar.open('Invalid email or password', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    } finally {
      this.isLoading = false;
    }
  }

  async demoLogin(role: string): Promise<void> {
    this.isLoading = true;
    
    try {
      const demoCredentials: { [key: string]: { email: string; password: string } } = {
        'system-admin': { email: 'sysadmin@ewarranty.pk', password: 'demo123' },
        'brand-admin': { email: 'brandadmin@ewarranty.pk', password: 'demo123' },
        'manufacturing-plant': { email: 'plant@ewarranty.pk', password: 'demo123' },
        'brand-distributor': { email: 'distributor@ewarranty.pk', password: 'demo123' },
        'customer': { email: 'customer@ewarranty.pk', password: 'demo123' }
      };
      
      const credentials = demoCredentials[role];
      const currentTenant = this.tenantService.currentTenant;
      await this.authService.login(credentials.email, credentials.password, currentTenant?.subdomain);
      
      if (role === 'system-admin') {
        this.router.navigate(['/platform/dashboard']);
      } else {
        this.router.navigate([this.redirectTo]);
      }
    } catch (error) {
      this.snackBar.open('Demo login failed', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    } finally {
      this.isLoading = false;
    }
  }

  async checkAvailability(): Promise<void> {
    if (!this.subdomain.trim()) return;
    
    this.isLoading = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const cleanSubdomain = this.subdomain.trim().toLowerCase();
    
    if (cleanSubdomain.length < 3) {
      this.isAvailable = false;
      this.suggestions = [`${cleanSubdomain}corp`, `${cleanSubdomain}company`, `${cleanSubdomain}inc`];
    } else if (['admin', 'api', 'www'].includes(cleanSubdomain)) {
      this.isAvailable = false;
      this.suggestions = [`${cleanSubdomain}corp`, `${cleanSubdomain}company`, `my${cleanSubdomain}`];
    } else {
      this.isAvailable = true;
      this.suggestions = [];
    }
    
    this.isLoading = false;
  }

  getStarted(): void {
    if (this.subdomain.trim()) {
      localStorage.setItem('selectedSubdomain', this.subdomain.trim());
      this.router.navigate(['/signup/company-info'], { 
        queryParams: { subdomain: this.subdomain.trim() } 
      });
    }
  }
}