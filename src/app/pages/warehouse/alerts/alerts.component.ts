import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    PageHeaderComponent,
    MetricCardComponent
  ],
  template: `
    <div class="space-y-8">
      <app-page-header
        title="Warehouse Alerts"
        description="Monitor and manage warehouse alerts, shelf life notifications, and quality checks">
        <button mat-raised-button color="primary">
          <mat-icon>notifications</mat-icon>
          Mark All Read
        </button>
      </app-page-header>

      <!-- Alert Summary Cards -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <app-metric-card
          *ngFor="let metric of alertSummary"
          [title]="metric.label"
          [value]="metric.value"
          [icon]="metric.icon">
        </app-metric-card>
      </div>

      <!-- Filters -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Alert Management</mat-card-title>
          <mat-card-subtitle>Filter and manage warehouse alerts by priority and status</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="space-y-4">
          <div class="flex flex-col md:flex-row gap-4">
            <mat-form-field appearance="outline" class="flex-1">
              <mat-label>Search</mat-label>
              <input matInput 
                     [(ngModel)]="searchTerm"
                     placeholder="Search alerts by product code, batch, or message...">
              <mat-icon matPrefix>search</mat-icon>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="w-48">
              <mat-label>Priority</mat-label>
              <mat-select [(ngModel)]="priorityFilter">
                <mat-option value="all">All Priorities</mat-option>
                <mat-option value="critical">Critical</mat-option>
                <mat-option value="high">High</mat-option>
                <mat-option value="medium">Medium</mat-option>
                <mat-option value="low">Low</mat-option>
              </mat-select>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="w-48">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="statusFilter">
                <mat-option value="all">All Status</mat-option>
                <mat-option value="active">Active</mat-option>
                <mat-option value="pending">Pending</mat-option>
                <mat-option value="resolved">Resolved</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Alerts List -->
      <div class="space-y-4">
        <mat-card *ngFor="let alert of filteredAlerts" class="hover:shadow-md transition-shadow">
          <mat-card-content class="p-6">
            <div class="flex items-start justify-between">
              <div class="space-y-3 flex-1">
                <div class="flex items-center gap-3">
                  <mat-chip [color]="getPriorityColor(alert.priority)">{{ alert.priority }}</mat-chip>
                  <mat-chip [color]="getStatusChipColor(alert.status)">{{ alert.status }}</mat-chip>
                  <span class="text-sm text-muted">Alert ID: {{ alert.id }}</span>
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold">{{ alert.type }} Alert</h3>
                  <p class="text-muted">{{ alert.message }}</p>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><span class="font-medium">Product:</span><br>{{ alert.productCode }}</div>
                  <div><span class="font-medium">Batch:</span><br>{{ alert.batchNumber }}</div>
                  <div><span class="font-medium">Quantity:</span><br>{{ alert.quantity }} units</div>
                  <div><span class="font-medium">Location:</span><br>{{ alert.location }}</div>
                </div>
                
                <div class="flex items-center gap-4 text-sm text-muted">
                  <span>Created: {{ alert.createdAt | date }}</span>
                  <span>Due: {{ alert.dueDate | date }}</span>
                </div>
              </div>
              
              <div class="flex flex-col gap-2 ml-4">
                <button *ngIf="alert.status === 'Active'" mat-raised-button color="primary">
                  <mat-icon>check_circle</mat-icon>
                  Resolve
                </button>
                <button *ngIf="alert.status === 'Pending'" mat-raised-button color="accent">
                  Take Action
                </button>
                <button mat-stroked-button>View Details</button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card *ngIf="filteredAlerts.length === 0">
        <mat-card-content class="flex flex-col items-center justify-center py-12">
          <mat-icon class="text-6xl text-muted mb-4">warning</mat-icon>
          <h3 class="text-lg font-semibold mb-2">No alerts found</h3>
          <p class="text-muted text-center">
            No alerts match your current filter criteria. Try adjusting your search or filters.
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class AlertsComponent {
  searchTerm = '';
  priorityFilter = 'all';
  statusFilter = 'all';

  alertSummary = [
    { label: 'Critical Alerts', value: '3', icon: 'warning' },
    { label: 'High Priority', value: '8', icon: 'schedule' },
    { label: 'Medium Priority', value: '12', icon: 'inventory' },
    { label: 'Resolved Today', value: '5', icon: 'check_circle' }
  ];

  alerts = [
    {
      id: 'ALT-001',
      type: 'Shelf Life',
      priority: 'High',
      status: 'Active',
      productCode: 'VLT-12V-100AH',
      batchNumber: 'BT2024001',
      message: 'Products nearing expiry date (7 days remaining)',
      quantity: 45,
      location: 'Warehouse A - Zone 3',
      createdAt: '2024-01-15T10:30:00Z',
      dueDate: '2024-01-22T00:00:00Z'
    },
    {
      id: 'ALT-002',
      type: 'Low Stock',
      priority: 'Medium',
      status: 'Active',
      productCode: 'OSK-12V-75AH',
      batchNumber: 'BT2024015',
      message: 'Stock level below minimum threshold (20 units)',
      quantity: 15,
      location: 'Warehouse B - Zone 1',
      createdAt: '2024-01-14T15:45:00Z',
      dueDate: '2024-01-20T00:00:00Z'
    }
  ];

  get filteredAlerts() {
    return this.alerts.filter(alert => {
      const matchesSearch = alert.productCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           alert.batchNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           alert.message.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesPriority = this.priorityFilter === 'all' || alert.priority.toLowerCase() === this.priorityFilter;
      const matchesStatus = this.statusFilter === 'all' || alert.status.toLowerCase() === this.statusFilter;
      
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }

  getPriorityColor(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'critical': return 'warn';
      case 'high': return 'warn';
      case 'medium': return 'primary';
      case 'low': return 'accent';
      default: return 'primary';
    }
  }

  getStatusChipColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'active': return 'warn';
      case 'resolved': return 'primary';
      case 'pending': return 'accent';
      default: return 'primary';
    }
  }
}