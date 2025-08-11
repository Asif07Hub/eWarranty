import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';

@Component({
  selector: 'app-tenant-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    PageHeaderComponent
  ],
  template: `
    <div class="space-y-6">
      <app-page-header
        title="Tenant Management"
        description="Manage all tenant organizations on the platform">
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Add Tenant
        </button>
      </app-page-header>

      <mat-card class="shadow-elegant">
        <mat-card-header>
          <mat-card-title class="flex items-center gap-2">
            <mat-icon>business</mat-icon>
            All Tenants
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="space-y-4">
            <div *ngFor="let tenant of tenants" 
                 class="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <mat-icon class="text-primary">business</mat-icon>
                </div>
                <div class="space-y-1">
                  <h3 class="font-medium">{{ tenant.name }}</h3>
                  <p class="text-sm text-muted">{{ tenant.subdomain }}.ewarranty.pk</p>
                  <p class="text-xs text-muted">{{ tenant.industry }}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-6">
                <div class="text-center">
                  <div class="flex items-center gap-1 text-sm text-muted">
                    <mat-icon class="text-xs">people</mat-icon>
                    <span>{{ tenant.users }}</span>
                  </div>
                  <p class="text-xs text-muted">Users</p>
                </div>
                
                <div class="text-center">
                  <div class="flex items-center gap-1 text-sm text-muted">
                    <mat-icon class="text-xs">event</mat-icon>
                    <span>{{ tenant.createdAt }}</span>
                  </div>
                  <p class="text-xs text-muted">Created</p>
                </div>
                
                <div class="text-center">
                  <mat-chip [color]="tenant.status === 'Active' ? 'primary' : 'accent'">
                    {{ tenant.status }}
                  </mat-chip>
                  <p class="text-xs text-muted mt-1">{{ tenant.plan }}</p>
                </div>
                
                <button mat-stroked-button>Manage</button>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .shadow-elegant {
      box-shadow: var(--shadow-elegant);
    }
  `]
})
export class TenantManagementComponent {
  tenants = [
    {
      id: '1',
      name: 'PowerCell Industries',
      subdomain: 'powercell',
      status: 'Active',
      users: 45,
      plan: 'Enterprise',
      createdAt: '2024-01-15',
      industry: 'Automotive Batteries'
    },
    {
      id: '2',
      name: 'EnergyMax Solutions',
      subdomain: 'energymax',
      status: 'Active',
      users: 32,
      plan: 'Professional',
      createdAt: '2024-01-20',
      industry: 'Industrial Batteries'
    },
    {
      id: '3',
      name: 'BatteryTech Corp',
      subdomain: 'batterytech',
      status: 'Pending',
      users: 12,
      plan: 'Starter',
      createdAt: '2024-01-25',
      industry: 'Consumer Electronics'
    }
  ];
}