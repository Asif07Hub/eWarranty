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
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-platform-distributors-management',
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
    MatChipsModule,
    PageHeaderComponent,
    MetricCardComponent
  ],
  template: `
    <div class="space-y-6">
      <app-page-header
        title="Platform Distributors Management" 
        description="Manage distributor network across all tenant organizations">
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Add Distributor
        </button>
      </app-page-header>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <app-metric-card
          *ngFor="let metric of distributorMetrics"
          [title]="metric.label"
          [value]="metric.value"
          [icon]="metric.icon"
          [change]="metric.change">
        </app-metric-card>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Platform Distributor Network</mat-card-title>
          <mat-card-subtitle>Manage distributor partnerships and performance across all tenants</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="flex gap-4 mb-6">
            <mat-form-field appearance="outline" class="flex-1">
              <mat-label>Search</mat-label>
              <input matInput 
                     [(ngModel)]="searchTerm"
                     placeholder="Search distributors...">
              <mat-icon matPrefix>search</mat-icon>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="w-48">
              <mat-label>Filter by Tenant</mat-label>
              <mat-select [(ngModel)]="tenantFilter">
                <mat-option value="all">All Tenants</mat-option>
                <mat-option value="PowerCell Industries">PowerCell Industries</mat-option>
                <mat-option value="EnergyMax Solutions">EnergyMax Solutions</mat-option>
                <mat-option value="BatteryTech Corp">BatteryTech Corp</mat-option>
              </mat-select>
              <mat-icon matPrefix>business</mat-icon>
            </mat-form-field>
          </div>

          <div class="overflow-auto">
            <table mat-table [dataSource]="filteredDistributors" class="w-full">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Distributor</th>
                <td mat-cell *matCellDef="let distributor">
                  <div>
                    <p class="font-medium">{{ distributor.name }}</p>
                    <p class="text-sm text-muted">{{ distributor.id }}</p>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="contact">
                <th mat-header-cell *matHeaderCellDef>Contact</th>
                <td mat-cell *matCellDef="let distributor">
                  <div class="space-y-1">
                    <p class="font-medium">{{ distributor.contact }}</p>
                    <div class="flex items-center gap-1 text-xs text-muted">
                      <mat-icon class="text-xs">phone</mat-icon>
                      <span>{{ distributor.phone }}</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs text-muted">
                      <mat-icon class="text-xs">email</mat-icon>
                      <span>{{ distributor.email }}</span>
                    </div>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="tenant">
                <th mat-header-cell *matHeaderCellDef>Tenant</th>
                <td mat-cell *matCellDef="let distributor">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-xs text-muted">business</mat-icon>
                    <span>{{ distributor.tenant }}</span>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="location">
                <th mat-header-cell *matHeaderCellDef>Location</th>
                <td mat-cell *matCellDef="let distributor">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-xs text-muted">place</mat-icon>
                    <span>{{ distributor.location }}</span>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="brands">
                <th mat-header-cell *matHeaderCellDef>Brands</th>
                <td mat-cell *matCellDef="let distributor">
                  <div class="flex flex-wrap gap-1">
                    <mat-chip *ngFor="let brand of distributor.brands" class="text-xs">{{ brand }}</mat-chip>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="retailers">
                <th mat-header-cell *matHeaderCellDef>Retailers</th>
                <td mat-cell *matCellDef="let distributor">{{ distributor.retailers }}</td>
              </ng-container>

              <ng-container matColumnDef="volume">
                <th mat-header-cell *matHeaderCellDef>Monthly Volume</th>
                <td mat-cell *matCellDef="let distributor">{{ distributor.monthlyVolume | number }}</td>
              </ng-container>

              <ng-container matColumnDef="performance">
                <th mat-header-cell *matHeaderCellDef>Performance</th>
                <td mat-cell *matCellDef="let distributor">
                  <mat-chip [color]="getPerformanceColor(distributor.performance)">{{ distributor.performance }}</mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let distributor">
                  <mat-chip [color]="getStatusColor(distributor.status)">{{ distributor.status }}</mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let distributor">
                  <div class="flex gap-1">
                    <button mat-icon-button><mat-icon>edit</mat-icon></button>
                    <button mat-icon-button><mat-icon>delete</mat-icon></button>
                  </div>
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
export class PlatformDistributorsManagementComponent {
  searchTerm = '';
  tenantFilter = 'all';
  displayedColumns = ['name', 'contact', 'tenant', 'location', 'brands', 'retailers', 'volume', 'performance', 'status', 'actions'];

  distributorMetrics = [
    { label: 'Total Distributors', value: '4', icon: 'people', change: '+2 from last month' },
    { label: 'Active', value: '3', icon: 'people', change: 'Currently operating' },
    { label: 'Total Retailers', value: '83', icon: 'people', change: 'Network reach' },
    { label: 'Monthly Volume', value: '7,900', icon: 'people', change: 'Units distributed' }
  ];

  distributors = [
    {
      id: 'DIST-001',
      name: 'Metro Auto Distributors',
      contact: 'Tariq Ahmad',
      phone: '+92-300-1234567',
      email: 'tariq@metroauto.pk',
      location: 'Lahore',
      tenant: 'PowerCell Industries',
      brands: ['Volta', 'Osaka'],
      status: 'active',
      retailers: 25,
      monthlyVolume: 2500,
      performance: 'excellent'
    },
    {
      id: 'DIST-002',
      name: 'Power Solutions Hub',
      contact: 'Sadia Khan',
      phone: '+92-301-2345678',
      email: 'sadia@powersolutions.pk',
      location: 'Karachi',
      tenant: 'EnergyMax Solutions',
      brands: ['Fujika', 'SAGA'],
      status: 'active',
      retailers: 18,
      monthlyVolume: 1800,
      performance: 'good'
    }
  ];

  get filteredDistributors() {
    return this.distributors.filter(distributor => {
      const matchesSearch = distributor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           distributor.contact.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           distributor.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           distributor.tenant.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesTenant = this.tenantFilter === 'all' || distributor.tenant === this.tenantFilter;
      return matchesSearch && matchesTenant;
    });
  }

  getStatusColor(status: string): string {
    return status === 'active' ? 'primary' : 'accent';
  }

  getPerformanceColor(performance: string): string {
    switch (performance) {
      case 'excellent': return 'primary';
      case 'good': return 'accent';
      case 'poor': return 'warn';
      default: return 'basic';
    }
  }
}