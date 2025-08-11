import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { BrandService } from '../../../services/brand.service';
import { User, Brand, UserRole } from '../../../types';

interface SidebarRoute {
  title: string;
  path: string;
  icon: string;
  roles: UserRole[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="h-full bg-card">
      <div class="p-4 border-b">
        <div *ngIf="user$ | async as user">
          <div *ngIf="isSystemAdmin; else brandHeader">
            <h2 class="text-lg font-bold">eWarranty Platform</h2>
            <p class="text-xs text-muted">System Administration</p>
          </div>
          
          <ng-template #brandHeader>
            <h2 class="text-lg font-bold">Pakistan Accumulators</h2>
            <div *ngIf="activeBrand$ | async as brand" class="flex items-center gap-2 mt-1">
              <div class="w-3 h-3 rounded-full" [style.background-color]="brand.color"></div>
              <span class="text-sm text-muted">{{ brand.displayName }}</span>
            </div>
          </ng-template>
          
          <p class="text-xs text-muted capitalize mt-1">{{ user.role.replace('-', ' ') }}</p>
        </div>
      </div>

      <mat-nav-list>
        <mat-list-item 
          *ngFor="let route of userRoutes" 
          [routerLink]="route.path"
          routerLinkActive="active-route"
          class="nav-item">
          <mat-icon matListItemIcon>{{ route.icon }}</mat-icon>
          <span matListItemTitle>{{ route.title }}</span>
        </mat-list-item>
      </mat-nav-list>
    </div>
  `,
  styles: [`
    .nav-item {
      margin: 4px 8px;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    
    .nav-item:hover {
      background-color: hsl(var(--accent));
    }
    
    .active-route {
      background-color: hsl(var(--primary)) !important;
      color: hsl(var(--primary-foreground)) !important;
    }
    
    .active-route .mat-icon {
      color: hsl(var(--primary-foreground)) !important;
    }
  `]
})
export class AppSidebarComponent implements OnInit {
  user$: Observable<User | null>;
  activeBrand$: Observable<Brand | null>;
  userRoutes: SidebarRoute[] = [];
  isSystemAdmin = false;

  private readonly routes: SidebarRoute[] = [
    // Platform Admin Routes
    { title: 'Platform Dashboard', path: '/platform/dashboard', icon: 'public', roles: ['system-admin'] },
    { title: 'Tenant Management', path: '/platform/tenants', icon: 'business', roles: ['system-admin'] },
    { title: 'Platform Analytics', path: '/platform/analytics', icon: 'analytics', roles: ['system-admin'] },
    { title: 'Brand Management', path: '/platform/brands', icon: 'settings', roles: ['system-admin'] },
    { title: 'Claims Management', path: '/platform/claims', icon: 'description', roles: ['system-admin'] },
    { title: 'Distributors Management', path: '/platform/distributors', icon: 'people', roles: ['system-admin'] },

    // Brand Admin Routes
    { title: 'Dashboard', path: '/brandadmin/dashboard', icon: 'dashboard', roles: ['brand-admin'] },

    // Manufacturing Routes
    { title: 'Dashboard', path: '/manufacturing/dashboard', icon: 'dashboard', roles: ['manufacturing-plant'] },
    { title: 'QR Generation', path: '/manufacturing/qr-generation', icon: 'qr_code', roles: ['manufacturing-plant'] },
    { title: 'Traceability', path: '/manufacturing/traceability', icon: 'track_changes', roles: ['manufacturing-plant'] },

    // Warehouse Routes
    { title: 'Dashboard', path: '/warehouse/dashboard', icon: 'dashboard', roles: ['plant-warehouse'] },
    { title: 'Inventory', path: '/warehouse/inventory', icon: 'inventory', roles: ['plant-warehouse'] },
    { title: 'Alerts', path: '/warehouse/alerts', icon: 'warning', roles: ['plant-warehouse'] },

    // Distributor Routes
    { title: 'Dashboard', path: '/distributor/dashboard', icon: 'dashboard', roles: ['brand-distributor'] },

    // Retailer Routes
    { title: 'Dashboard', path: '/retailer/dashboard', icon: 'dashboard', roles: ['brand-retailer'] },
    { title: 'Sales', path: '/retailer/sales', icon: 'shopping_cart', roles: ['brand-retailer'] },

    // Customer Routes
    { title: 'Register Battery', path: '/customer/register', icon: 'smartphone', roles: ['customer'] },
    { title: 'Submit Claim', path: '/customer/claim', icon: 'description', roles: ['customer'] },
    { title: 'Check Status', path: '/customer/status', icon: 'security', roles: ['customer'] }
  ];

  constructor(
    private authService: AuthService,
    private brandService: BrandService
  ) {
    this.user$ = this.authService.user$;
    this.activeBrand$ = this.brandService.activeBrand$;
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.isSystemAdmin = user.role === 'system-admin';
        this.userRoutes = this.routes.filter(route => 
          route.roles.includes(user.role)
        );
      }
    });
  }
}