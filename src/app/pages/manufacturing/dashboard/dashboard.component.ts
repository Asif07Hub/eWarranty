import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-manufacturing-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    PageHeaderComponent,
    MetricCardComponent
  ],
  template: `
    <div class="space-y-6">
      <app-page-header
        title="Manufacturing Dashboard"
        description="Monitor production lines, batch management, and QR code generation">
        <div class="flex gap-2">
          <button mat-stroked-button>
            <mat-icon>inventory</mat-icon>
            New Batch
          </button>
          <button mat-raised-button color="primary">
            <mat-icon>qr_code</mat-icon>
            Generate QR Codes
          </button>
        </div>
      </app-page-header>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <app-metric-card
          *ngFor="let stat of stats"
          [title]="stat.title"
          [value]="stat.value"
          [icon]="stat.icon"
          [iconColor]="stat.color"
          [change]="stat.change">
        </app-metric-card>
      </div>

      <!-- Production Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <mat-card class="shadow-elegant">
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon class="text-primary">trending_up</mat-icon>
              Production Efficiency
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="h-64 flex items-center justify-center text-muted">
              Production Efficiency Chart Placeholder
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="shadow-elegant">
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon class="text-primary">flash_on</mat-icon>
              Real-time Monitoring
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let line of productionLines" 
                   class="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span class="text-sm font-medium">{{ line.name }}</span>
                <mat-chip [color]="line.status === 'Running' ? 'primary' : 'warn'">
                  {{ line.status }}
                </mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Recent Batches -->
      <mat-card class="shadow-elegant">
        <mat-card-header>
          <mat-card-title>Recent Batches</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="space-y-4">
            <div *ngFor="let batch of recentBatches" 
                 class="flex items-center justify-between p-4 border rounded-lg">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <mat-icon class="text-primary">inventory</mat-icon>
                </div>
                <div>
                  <p class="font-medium">{{ batch.id }}</p>
                  <p class="text-sm text-muted">{{ batch.product }}</p>
                  <p class="text-xs text-muted">Started: {{ batch.startDate }}</p>
                </div>
              </div>
              <div class="text-right">
                <mat-chip [color]="getStatusColor(batch.status)">
                  {{ batch.status }}
                </mat-chip>
                <p class="text-sm text-muted mt-1">
                  QR: {{ batch.qrGenerated }}/{{ batch.quantity }}
                </p>
                <p class="text-sm font-medium">Qty: {{ batch.quantity }}</p>
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
export class ManufacturingDashboardComponent implements OnInit {
  stats = [
    { title: 'Active Batches', value: '12', change: '+2 today', icon: 'inventory', color: 'text-brand-volta' },
    { title: 'QR Codes Generated', value: '1,247', change: '+89 today', icon: 'qr_code', color: 'text-brand-osaka' },
    { title: 'Production Line Status', value: '92%', change: 'Efficiency', icon: 'speed', color: 'text-brand-fujika' },
    { title: 'Quality Issues', value: '3', change: 'Pending review', icon: 'warning', color: 'text-destructive' }
  ];

  productionLines = [
    { name: 'Line 1 - Volta AGM', status: 'Running' },
    { name: 'Line 2 - Osaka Gel', status: 'Running' },
    { name: 'Line 3 - Fujika Lead', status: 'Maintenance' },
    { name: 'QR Station', status: 'Running' }
  ];

  recentBatches = [
    {
      id: 'BT-2024-018',
      product: 'Volta 70Ah AGM',
      quantity: 150,
      status: 'In Production',
      startDate: '2024-01-15',
      qrGenerated: 89
    },
    {
      id: 'BT-2024-017',
      product: 'Osaka 100Ah Gel',
      quantity: 200,
      status: 'QR Generation',
      startDate: '2024-01-14',
      qrGenerated: 200
    },
    {
      id: 'BT-2024-016',
      product: 'Fujika 45Ah Lead',
      quantity: 100,
      status: 'Completed',
      startDate: '2024-01-13',
      qrGenerated: 100
    }
  ];

  ngOnInit(): void {}

  getStatusColor(status: string): string {
    switch (status) {
      case 'In Production': return 'primary';
      case 'QR Generation': return 'accent';
      case 'Completed': return 'primary';
      default: return 'primary';
    }
  }
}