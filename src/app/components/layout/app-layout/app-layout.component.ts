import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { BrandService } from '../../../services/brand.service';
import { TenantService } from '../../../services/tenant.service';
import { User, Brand, TenantConfig } from '../../../types';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { BrandSelectorComponent } from '../../brand-selector/brand-selector.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    AppSidebarComponent,
    BrandSelectorComponent
  ],
  template: `
    <mat-sidenav-container class="min-h-screen">
      <mat-sidenav #sidenav mode="side" opened class="w-64">
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      
      <mat-sidenav-content>
        <!-- Header -->
        <mat-toolbar class="h-16 border-b shadow-elegant">
          <div class="flex items-center justify-between w-full px-6">
            <div class="flex items-center gap-4">
              <button mat-icon-button (click)="sidenav.toggle()">
                <mat-icon>menu</mat-icon>
              </button>
              
              <div class="flex items-center gap-3">
                <div *ngIf="isSystemAdmin; else tenantBranding" class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <mat-icon class="text-white">public</mat-icon>
                  </div>
                  <div>
                    <h1 class="text-lg font-semibold">eWarranty Platform</h1>
                    <p class="text-xs text-muted">System Administration</p>
                  </div>
                </div>
                
                <ng-template #tenantBranding>
                  <div *ngIf="currentTenant$ | async as tenant; else defaultBranding" class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-glow"
                         [style.background-color]="tenant.primaryColor">
                      <mat-icon class="text-white">business</mat-icon>
                    </div>
                    <div>
                      <h1 class="text-lg font-semibold">{{ tenant.displayName }}</h1>
                      <p class="text-xs text-muted">{{ tenant.subdomain }}.ewarranty.pk</p>
                    </div>
                    <mat-chip-set>
                      <mat-chip>{{ tenant.industry }}</mat-chip>
                    </mat-chip-set>
                  </div>
                  
                  <ng-template #defaultBranding>
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                        <mat-icon class="text-white">flash_on</mat-icon>
                      </div>
                      <h1 class="text-lg font-semibold">Pakistan Accumulators</h1>
                    </div>
                  </ng-template>
                </ng-template>
                
                <div *ngIf="!isSystemAdmin && (activeBrand$ | async) as brand" class="flex items-center gap-2">
                  <span class="text-muted">•</span>
                  <mat-chip [style.background-color]="brand.color" class="text-white">
                    {{ brand.displayName }}
                  </mat-chip>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <app-brand-selector *ngIf="!isSystemAdmin"></app-brand-selector>
              
              <div *ngIf="user$ | async as user" class="flex items-center gap-3">
                <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/50">
                  <mat-icon class="text-muted">person</mat-icon>
                  <div class="text-right">
                    <div class="text-sm font-medium">{{ user.name }}</div>
                    <div class="text-xs text-muted capitalize">{{ user.role.replace('-', ' ') }}</div>
                  </div>
                </div>
                <button mat-icon-button [matMenuTriggerFor]="userMenu" class="text-muted">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #userMenu="matMenu">
                  <button mat-menu-item (click)="logout()">
                    <mat-icon>logout</mat-icon>
                    <span>Sign Out</span>
                  </button>
                </mat-menu>
              </div>
            </div>
          </div>
        </mat-toolbar>

        <!-- Main Content -->
        <main class="flex-1 overflow-auto bg-section-background/30">
          <div class="p-6 max-w-content mx-auto">
            <ng-content></ng-content>
          </div>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .max-w-content {
      max-width: 1240px;
    }
    
    .bg-gradient-primary {
      background: var(--gradient-primary);
    }
    
    .shadow-elegant {
      box-shadow: var(--shadow-elegant);
    }
    
    .shadow-glow {
      box-shadow: var(--shadow-glow);
    }
  `]
})
export class AppLayoutComponent implements OnInit {
  user$: Observable<User | null>;
  activeBrand$: Observable<Brand | null>;
  currentTenant$: Observable<TenantConfig | null>;
  isSystemAdmin = false;

  constructor(
    private authService: AuthService,
    private brandService: BrandService,
    private tenantService: TenantService
  ) {
    this.user$ = this.authService.user$;
    this.activeBrand$ = this.brandService.activeBrand$;
    this.currentTenant$ = this.tenantService.currentTenant$;
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.isSystemAdmin = user?.role === 'system-admin';
    });
  }

  logout(): void {
    this.authService.logout();
  }
}