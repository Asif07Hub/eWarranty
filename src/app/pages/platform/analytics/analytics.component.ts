import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-platform-analytics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    PageHeaderComponent,
    MetricCardComponent
  ],
  template: `
    <div class="space-y-8">
      <app-page-header
        title="Platform Analytics"
        description="Comprehensive analytics and insights across the entire eWarranty platform">
        <div class="flex gap-2">
          <button mat-stroked-button>
            <mat-icon>download</mat-icon>
            Export Report
          </button>
          <button mat-stroked-button>
            <mat-icon>schedule</mat-icon>
            Schedule Report
          </button>
        </div>
      </app-page-header>

      <!-- Filters -->
      <div class="flex flex-col md:flex-row gap-4">
        <mat-form-field appearance="outline" class="w-48">
          <mat-label>Time Range</mat-label>
          <mat-select [(ngModel)]="timeRange">
            <mat-option value="1month">Last Month</mat-option>
            <mat-option value="3months">Last 3 Months</mat-option>
            <mat-option value="6months">Last 6 Months</mat-option>
            <mat-option value="1year">Last Year</mat-option>
          </mat-select>
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="w-48">
          <mat-label>Filter by Tenant</mat-label>
          <mat-select [(ngModel)]="tenantFilter">
            <mat-option value="all">All Tenants</mat-option>
            <mat-option value="powercell">PowerCell Industries</mat-option>
            <mat-option value="energymax">EnergyMax Solutions</mat-option>
            <mat-option value="batterytech">BatteryTech Corp</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <!-- Overview Metrics -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <app-metric-card
          *ngFor="let metric of overviewMetrics"
          [title]="metric.label"
          [value]="metric.value"
          [icon]="metric.icon"
          [change]="metric.change">
        </app-metric-card>
      </div>

      <!-- Analytics Tabs -->
      <mat-tab-group>
        <mat-tab label="Claims Analysis">
          <div class="grid gap-6 md:grid-cols-2 mt-6">
            <mat-card>
              <mat-card-header>
                <mat-card-title class="flex items-center gap-2">
                  <mat-icon>bar_chart</mat-icon>
                  Platform Claims by Month
                </mat-card-title>
                <mat-card-subtitle>
                  Monthly breakdown of approved, rejected, and pending claims across all tenants
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="h-[300px] flex items-center justify-center text-muted">
                  Claims Chart Placeholder
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card>
              <mat-card-header>
                <mat-card-title class="flex items-center gap-2">
                  <mat-icon>pie_chart</mat-icon>
                  Claims Distribution
                </mat-card-title>
                <mat-card-subtitle>
                  Current distribution of claim statuses across platform
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="h-[300px] flex items-center justify-center text-muted">
                  Distribution Chart Placeholder
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Tenant Performance">
          <mat-card class="mt-6">
            <mat-card-header>
              <mat-card-title>Tenant Performance Comparison</mat-card-title>
              <mat-card-subtitle>
                Claims volume, revenue impact, and customer satisfaction by tenant
              </mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-6">
                <div *ngFor="let tenant of tenantPerformance" 
                     class="flex items-center justify-between p-4 bg-card rounded-lg border">
                  <div class="space-y-1">
                    <h3 class="font-semibold">{{ tenant.name }}</h3>
                    <p class="text-sm text-muted">
                      {{ tenant.claims }} claims • ${{ tenant.revenue | number }} revenue
                    </p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold">{{ tenant.satisfaction }}/5.0</div>
                    <div class="text-sm text-muted">Satisfaction</div>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="Regional Data">
          <mat-card class="mt-6">
            <mat-card-header>
              <mat-card-title>Regional Distribution</mat-card-title>
              <mat-card-subtitle>Platform usage distribution across different regions</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="h-[400px] flex items-center justify-center text-muted">
                Regional Chart Placeholder
              </div>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="Platform Growth">
          <mat-card class="mt-6">
            <mat-card-header>
              <mat-card-title>Platform Growth Trends</mat-card-title>
              <mat-card-subtitle>Monthly trends for tenants, claims, and user growth</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="h-[400px] flex items-center justify-center text-muted">
                Growth Trends Chart Placeholder
              </div>
            </mat-card-content>
          </mat-card>
        </mat-tab>
      </mat-tab-group>
    </div>
  `
})
export class PlatformAnalyticsComponent {
  timeRange = '3months';
  tenantFilter = 'all';

  overviewMetrics = [
    { label: 'Total Claims', value: '12,847', change: '+12.3%', icon: 'inventory' },
    { label: 'Active Users', value: '28,945', change: '+8.7%', icon: 'people' },
    { label: 'Platform Revenue', value: '$527K', change: '+15.2%', icon: 'attach_money' },
    { label: 'Pending Claims', value: '456', change: '+5.8%', icon: 'warning' }
  ];

  tenantPerformance = [
    { name: 'PowerCell Industries', claims: 3247, revenue: 145200, satisfaction: 4.5 },
    { name: 'EnergyMax Solutions', claims: 2832, revenue: 128100, satisfaction: 4.3 },
    { name: 'BatteryTech Corp', claims: 1567, revenue: 78900, satisfaction: 4.1 },
    { name: 'AutoPower Systems', claims: 1201, revenue: 65800, satisfaction: 4.2 }
  ];
}