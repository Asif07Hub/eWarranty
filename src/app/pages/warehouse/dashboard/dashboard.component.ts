import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-warehouse-dashboard',
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
        title="Warehouse Dashboard" 
        description="Monitor inventory, shipments, and supply chain operations">
      </app-page-header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <app-metric-card
          *ngFor="let metric of warehouseMetrics"
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
              <mat-icon class="text-warning">warning</mat-icon>
              Shelf Life Alerts
            </mat-card-title>
            <mat-card-subtitle>Items requiring immediate attention</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let alert of recentAlerts" 
                   class="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div class="space-y-1">
                  <p class="font-medium">{{ alert.item }}</p>
                  <div class="flex items-center gap-2 text-sm text-muted">
                    <mat-icon class="text-xs">place</mat-icon>
                    <span>{{ alert.location }}</span>
                    <mat-icon class="text-xs ml-2">schedule</mat-icon>
                    <span>Expires: {{ alert.expiry }}</span>
                  </div>
                </div>
                <mat-chip [color]="getAlertSeverityColor(alert.severity)">
                  {{ alert.severity }}
                </mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon class="text-primary">local_shipping</mat-icon>
              Recent Shipments
            </mat-card-title>
            <mat-card-subtitle>Latest outbound deliveries</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let shipment of recentShipments" 
                   class="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div class="space-y-1">
                  <p class="font-medium">{{ shipment.id }}</p>
                  <p class="text-sm text-muted">{{ shipment.distributor }}</p>
                  <p class="text-xs text-muted">{{ shipment.items }} items</p>
                </div>
                <mat-chip [color]="getShipmentStatusColor(shipment.status)">
                  {{ shipment.status }}
                </mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class WarehouseDashboardComponent {
  warehouseMetrics = [
    { label: 'Total Inventory', value: '12,543', icon: 'inventory', change: '+5.2%' },
    { label: 'Pending Shipments', value: '89', icon: 'local_shipping', change: '-2.1%' },
    { label: 'Shelf Life Alerts', value: '23', icon: 'warning', change: '+12%' },
    { label: 'Monthly Throughput', value: '8,234', icon: 'trending_up', change: '+8.7%' }
  ];

  recentAlerts = [
    { id: 1, item: 'VOLTA-VL120-45AH', location: 'A-12-B', expiry: '2024-08-15', severity: 'high' },
    { id: 2, item: 'OSAKA-OS80-35AH', location: 'B-05-C', expiry: '2024-08-22', severity: 'medium' },
    { id: 3, item: 'FUJIKA-FK65-28AH', location: 'C-08-A', expiry: '2024-09-01', severity: 'low' }
  ];

  recentShipments = [
    { id: 'SH-001', distributor: 'Metro Distributors', items: 150, status: 'In Transit' },
    { id: 'SH-002', distributor: 'City Auto Parts', items: 89, status: 'Delivered' },
    { id: 'SH-003', distributor: 'Power Solutions', items: 234, status: 'Preparing' }
  ];

  getAlertSeverityColor(severity: string): string {
    switch (severity) {
      case 'high': return 'warn';
      case 'medium': return 'primary';
      case 'low': return 'accent';
      default: return 'primary';
    }
  }

  getShipmentStatusColor(status: string): string {
    switch (status) {
      case 'Delivered': return 'primary';
      case 'In Transit': return 'accent';
      case 'Preparing': return 'basic';
      default: return 'basic';
    }
  }
}