import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-platform-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    PageHeaderComponent,
    MetricCardComponent
  ],
  template: `
    <div class="space-y-6">
      <app-page-header
        title="Platform Management"
        description="Manage the eWarranty platform and all tenant organizations">
      </app-page-header>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <app-metric-card
          *ngFor="let stat of stats"
          [title]="stat.title"
          [value]="stat.value"
          [icon]="stat.icon"
          [iconColor]="stat.iconColor">
        </app-metric-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Tenants -->
        <mat-card class="shadow-elegant">
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon>business</mat-icon>
              Recent Tenants
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let tenant of recentTenants" 
                   class="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div class="space-y-1">
                  <p class="font-medium text-sm">{{ tenant.name }}</p>
                  <p class="text-xs text-muted">{{ tenant.subdomain }}.ewarranty.pk</p>
                </div>
                <div class="text-right space-y-1">
                  <mat-chip [color]="tenant.status === 'Active' ? 'primary' : 'accent'">
                    {{ tenant.status }}
                  </mat-chip>
                  <p class="text-xs text-muted">{{ tenant.users }} users</p>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- System Health -->
        <mat-card class="shadow-elegant">
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon>security</mat-icon>
              System Status
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let service of systemServices" 
                   class="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-success"></div>
                  <span class="font-medium">{{ service.name }}</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-muted">
                  <mat-icon class="text-sm">trending_up</mat-icon>
                  <span>{{ service.status }}</span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .shadow-elegant {
      box-shadow: var(--shadow-elegant);
    }
    
    .bg-gradient-primary {
      background: var(--gradient-primary);
    }
  `]
})
export class PlatformDashboardComponent implements OnInit {
  stats = [
    { title: 'Active Tenants', value: '24', icon: 'business', iconColor: 'text-primary' },
    { title: 'Total Users', value: '1,247', icon: 'people', iconColor: 'text-success' },
    { title: 'Global Claims', value: '5,832', icon: 'public', iconColor: 'text-warning' },
    { title: 'System Health', value: '99.9%', icon: 'computer', iconColor: 'text-info' }
  ];

  recentTenants = [
    { id: '1', name: 'PowerCell Industries', subdomain: 'powercell', status: 'Active', users: 45 },
    { id: '2', name: 'EnergyMax Solutions', subdomain: 'energymax', status: 'Active', users: 32 },
    { id: '3', name: 'BatteryTech Corp', subdomain: 'batterytech', status: 'Pending', users: 12 }
  ];

  systemServices = [
    { name: 'Database', status: 'Operational' },
    { name: 'API Services', status: 'Operational' },
    { name: 'Storage', status: 'Operational' }
  ];

  ngOnInit(): void {}
}