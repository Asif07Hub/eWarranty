import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-distributor-dashboard',
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
        title="Distributor Dashboard" 
        description="Monitor sales performance and retailer relationships">
      </app-page-header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <app-metric-card
          *ngFor="let metric of distributorMetrics"
          [title]="metric.label"
          [value]="metric.value"
          [icon]="metric.icon"
          [change]="metric.change">
        </app-metric-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <mat-card>
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon class="text-primary">people</mat-icon>
              Top Performing Retailers
            </mat-card-title>
            <mat-card-subtitle>Best retailers by sales volume this month</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let retailer of topRetailers; let i = index" 
                   class="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-sm font-medium text-primary">#{{ i + 1 }}</span>
                  </div>
                  <div>
                    <p class="font-medium">{{ retailer.name }}</p>
                    <p class="text-sm text-muted">{{ retailer.orders }} orders</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-medium">{{ retailer.revenue }}</p>
                  <p class="text-sm text-success">{{ retailer.growth }}</p>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon class="text-warning">warning</mat-icon>
              Retailer Shelf Life Alerts
            </mat-card-title>
            <mat-card-subtitle>Products requiring retailer attention</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let alert of shelfLifeAlerts" 
                   class="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
                <div class="space-y-1">
                  <p class="font-medium">{{ alert.product }}</p>
                  <p class="text-sm text-muted">{{ alert.quantity }} units at {{ alert.retailer }}</p>
                  <p class="text-xs text-warning font-medium">Expires: {{ alert.expiry }}</p>
                </div>
                <mat-chip color="warn">Action Required</mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class DistributorDashboardComponent {
  distributorMetrics = [
    { label: 'Current Stock', value: '3,456', icon: 'inventory', change: '+12.3%' },
    { label: 'Retailers Served', value: '45', icon: 'store', change: '+2' },
    { label: 'Monthly Sales', value: '2,134', icon: 'trending_up', change: '+18.5%' },
    { label: 'Active Orders', value: '23', icon: 'local_shipping', change: '-5%' }
  ];

  topRetailers = [
    { name: 'AutoMart Central', orders: 45, revenue: '₨ 450,000', growth: '+15%' },
    { name: 'Power Zone Lahore', orders: 38, revenue: '₨ 380,000', growth: '+8%' },
    { name: 'Battery World', orders: 32, revenue: '₨ 320,000', growth: '+22%' },
    { name: 'Tech Solutions', orders: 29, revenue: '₨ 290,000', growth: '+5%' }
  ];

  shelfLifeAlerts = [
    { product: 'VOLTA-VL120-45AH', quantity: 25, expiry: '2024-08-15', retailer: 'AutoMart Central' },
    { product: 'OSAKA-OS80-35AH', quantity: 15, expiry: '2024-08-22', retailer: 'Power Zone Lahore' },
    { product: 'FUJIKA-FK65-28AH', quantity: 12, expiry: '2024-09-01', retailer: 'Battery World' }
  ];
}