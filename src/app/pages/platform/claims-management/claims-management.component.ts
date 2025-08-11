import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-platform-claims-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    PageHeaderComponent,
    MetricCardComponent
  ],
  template: `
    <div class="space-y-6">
      <app-page-header
        title="Platform Claims Management" 
        description="Process and manage warranty claims across all tenant organizations">
      </app-page-header>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <app-metric-card
          *ngFor="let metric of claimsMetrics"
          [title]="metric.label"
          [value]="metric.value"
          [icon]="metric.icon"
          [change]="metric.change">
        </app-metric-card>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Platform Warranty Claims</mat-card-title>
          <mat-card-subtitle>Review and process customer warranty claims across all tenants</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="flex gap-4 mb-6">
            <mat-form-field appearance="outline" class="flex-1">
              <mat-label>Search</mat-label>
              <input matInput 
                     [(ngModel)]="searchTerm"
                     placeholder="Search claims...">
              <mat-icon matPrefix>search</mat-icon>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="w-48">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="statusFilter">
                <mat-option value="all">All Status</mat-option>
                <mat-option value="pending">Pending</mat-option>
                <mat-option value="processing">Processing</mat-option>
                <mat-option value="approved">Approved</mat-option>
                <mat-option value="rejected">Rejected</mat-option>
              </mat-select>
              <mat-icon matPrefix>filter_list</mat-icon>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="w-48">
              <mat-label>Tenant</mat-label>
              <mat-select [(ngModel)]="tenantFilter">
                <mat-option value="all">All Tenants</mat-option>
                <mat-option value="PowerCell Industries">PowerCell Industries</mat-option>
                <mat-option value="EnergyMax Solutions">EnergyMax Solutions</mat-option>
                <mat-option value="BatteryTech Corp">BatteryTech Corp</mat-option>
              </mat-select>
              <mat-icon matPrefix>filter_list</mat-icon>
            </mat-form-field>
          </div>

          <div class="overflow-auto">
            <table mat-table [dataSource]="filteredClaims" class="w-full">
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>Claim ID</th>
                <td mat-cell *matCellDef="let claim" class="font-medium">{{ claim.id }}</td>
              </ng-container>

              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef>Date</th>
                <td mat-cell *matCellDef="let claim">{{ claim.date }}</td>
              </ng-container>

              <ng-container matColumnDef="customer">
                <th mat-header-cell *matHeaderCellDef>Customer</th>
                <td mat-cell *matCellDef="let claim">
                  <div>
                    <p class="font-medium">{{ claim.customer }}</p>
                    <p class="text-xs text-muted">{{ claim.phone }}</p>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="tenant">
                <th mat-header-cell *matHeaderCellDef>Tenant</th>
                <td mat-cell *matCellDef="let claim">
                  <div>
                    <p class="font-medium">{{ claim.tenant }}</p>
                    <p class="text-xs text-muted">{{ claim.brand }}</p>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="product">
                <th mat-header-cell *matHeaderCellDef>Product</th>
                <td mat-cell *matCellDef="let claim">
                  <div>
                    <p class="font-medium">{{ claim.product }}</p>
                    <p class="text-xs text-muted font-mono">{{ claim.serialNumber }}</p>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="issue">
                <th mat-header-cell *matHeaderCellDef>Issue</th>
                <td mat-cell *matCellDef="let claim" class="max-w-48 truncate">{{ claim.issue }}</td>
              </ng-container>

              <ng-container matColumnDef="priority">
                <th mat-header-cell *matHeaderCellDef>Priority</th>
                <td mat-cell *matCellDef="let claim">
                  <mat-chip [color]="getPriorityColor(claim.priority)">{{ claim.priority }}</mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let claim">
                  <mat-chip [color]="getStatusColor(claim.status)">
                    <mat-icon class="text-xs mr-1">{{ getStatusIcon(claim.status) }}</mat-icon>
                    {{ claim.status }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let claim">
                  <button mat-stroked-button (click)="reviewClaim(claim)">
                    <mat-icon>visibility</mat-icon>
                    Review
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class PlatformClaimsManagementComponent {
  searchTerm = '';
  statusFilter = 'all';
  tenantFilter = 'all';
  displayedColumns = ['id', 'date', 'customer', 'tenant', 'product', 'issue', 'priority', 'status', 'actions'];

  claimsMetrics = [
    { label: 'Total Claims', value: '4', icon: 'schedule', change: '+12 from last week' },
    { label: 'Pending', value: '1', icon: 'warning', change: 'Requires attention' },
    { label: 'Approved', value: '1', icon: 'check_circle', change: 'This month' },
    { label: 'Rejected', value: '1', icon: 'cancel', change: 'This month' }
  ];

  claims = [
    {
      id: 'CLM-001',
      date: '2024-07-15',
      customer: 'Muhammad Ali',
      phone: '+92-300-1234567',
      tenant: 'PowerCell Industries',
      brand: 'Volta',
      product: 'VL120-45AH',
      serialNumber: 'VL120230001',
      purchaseDate: '2023-05-15',
      issue: 'Battery not holding charge',
      status: 'pending',
      priority: 'high',
      retailer: 'AutoMart Central'
    },
    {
      id: 'CLM-002',
      date: '2024-07-14',
      customer: 'Ayesha Khan',
      phone: '+92-301-2345678',
      tenant: 'EnergyMax Solutions',
      brand: 'Osaka',
      product: 'OS80-35AH',
      serialNumber: 'OS80230002',
      purchaseDate: '2023-08-20',
      issue: 'Physical damage to terminals',
      status: 'approved',
      priority: 'medium',
      retailer: 'Power Zone Lahore'
    }
  ];

  get filteredClaims() {
    return this.claims.filter(claim => {
      const matchesSearch = claim.customer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           claim.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           claim.product.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           claim.tenant.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' || claim.status === this.statusFilter;
      const matchesTenant = this.tenantFilter === 'all' || claim.tenant === this.tenantFilter;
      return matchesSearch && matchesStatus && matchesTenant;
    });
  }

  openCreateDialog(): void {
    console.log('Open create dialog');
  }

  reviewClaim(claim: any): void {
    console.log('Review claim:', claim);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return 'primary';
      case 'processing': return 'accent';
      case 'approved': return 'primary';
      case 'rejected': return 'warn';
      default: return 'basic';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'warn';
      case 'medium': return 'primary';
      case 'low': return 'accent';
      default: return 'basic';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending': return 'schedule';
      case 'processing': return 'warning';
      case 'approved': return 'check_circle';
      case 'rejected': return 'cancel';
      default: return 'schedule';
    }
  }
}