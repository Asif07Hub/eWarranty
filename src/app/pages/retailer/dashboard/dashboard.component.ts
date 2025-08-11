import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-retailer-dashboard',
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
        title="Retailer Dashboard" 
        description="Monitor sales performance and inventory levels">
      </app-page-header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <app-metric-card
          *ngFor="let metric of retailerMetrics"
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
              <mat-icon class="text-primary">shopping_cart</mat-icon>
              Recent Sales
            </mat-card-title>
            <mat-card-subtitle>Latest customer purchases</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let sale of recentSales" 
                   class="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div class="space-y-1">
                  <p class="font-medium">{{ sale.customer }}</p>
                  <p class="text-sm text-muted">{{ sale.product }}</p>
                  <div class="flex items-center gap-1 text-xs text-muted">
                    <mat-icon class="text-xs">schedule</mat-icon>
                    <span>{{ sale.time }}</span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-medium">₨ {{ sale.amount | number }}</p>
                  <mat-chip>{{ sale.id }}</mat-chip>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon class="text-warning">inventory</mat-icon>
              Low Stock Alert
            </mat-card-title>
            <mat-card-subtitle>Items requiring restocking</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let item of lowStockItems" 
                   class="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
                <div class="space-y-1">
                  <p class="font-medium">{{ item.product }}</p>
                  <p class="text-sm text-muted">Current: {{ item.current }} | Minimum: {{ item.minimum }}</p>
                </div>
                <mat-chip [color]="item.status === 'critical' ? 'warn' : 'primary'">
                  {{ item.status }}
                </mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title class="flex items-center gap-2">
            <mat-icon class="text-primary">trending_up</mat-icon>
            Top Performing Products
          </mat-card-title>
          <mat-card-subtitle>Best sellers this month</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div *ngFor="let product of topProducts; let i = index" 
                 class="p-4 rounded-lg bg-muted/50 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium">#{{ i + 1 }}</span>
                <mat-chip>{{ product.sales }} sold</mat-chip>
              </div>
              <p class="font-medium text-sm">{{ product.name }}</p>
              <p class="text-lg font-bold text-primary">{{ product.revenue }}</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class RetailerDashboardComponent {
  retailerMetrics = [
    { label: 'Current Stock', value: '234', icon: 'inventory', change: '+8.2%' },
    { label: 'Daily Sales', value: '18', icon: 'shopping_cart', change: '+15.3%' },
    { label: 'Active Customers', value: '156', icon: 'people', change: '+12%' },
    { label: 'Monthly Revenue', value: '₨ 125K', icon: 'attach_money', change: '+22.7%' }
  ];

  recentSales = [
    { id: 'SAL-001', customer: 'Muhammad Ali', product: 'VOLTA-VL120-45AH', amount: 15000, time: '2 hours ago' },
    { id: 'SAL-002', customer: 'Ayesha Khan', product: 'OSAKA-OS80-35AH', amount: 12000, time: '4 hours ago' },
    { id: 'SAL-003', customer: 'Ahmed Hassan', product: 'FUJIKA-FK65-28AH', amount: 9500, time: '6 hours ago' },
    { id: 'SAL-004', customer: 'Fatima Sheikh', product: 'SAGA-SG100-40AH', amount: 13500, time: '8 hours ago' }
  ];

  lowStockItems = [
    { product: 'VOLTA-VL150-55AH', current: 5, minimum: 10, status: 'critical' },
    { product: 'OSAKA-OS100-40AH', current: 8, minimum: 15, status: 'low' },
    { product: 'FUJIKA-FK80-32AH', current: 12, minimum: 20, status: 'low' }
  ];

  topProducts = [
    { name: 'VOLTA-VL120-45AH', sales: 45, revenue: '₨ 675,000' },
    { name: 'OSAKA-OS80-35AH', sales: 32, revenue: '₨ 384,000' },
    { name: 'FUJIKA-FK65-28AH', sales: 28, revenue: '₨ 266,000' },
    { name: 'SAGA-SG100-40AH', sales: 25, revenue: '₨ 337,500' }
  ];
}