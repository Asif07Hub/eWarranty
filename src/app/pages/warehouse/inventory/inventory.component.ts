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

@Component({
  selector: 'app-inventory',
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
    PageHeaderComponent
  ],
  template: `
    <div class="space-y-6">
      <app-page-header
        title="Inventory Management" 
        description="Monitor and manage warehouse inventory levels">
        <button mat-raised-button color="primary">
          <mat-icon>download</mat-icon>
          Export Report
        </button>
      </app-page-header>

      <mat-card>
        <mat-card-header>
          <mat-card-title class="flex items-center gap-2">
            <mat-icon class="text-primary">inventory</mat-icon>
            Current Inventory
          </mat-card-title>
          <mat-card-subtitle>Real-time inventory status and locations</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="flex gap-4 mb-6">
            <mat-form-field appearance="outline" class="flex-1">
              <mat-label>Search</mat-label>
              <input matInput 
                     [(ngModel)]="searchTerm"
                     placeholder="Search by product ID or brand...">
              <mat-icon matPrefix>search</mat-icon>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="w-48">
              <mat-label>Filter by Brand</mat-label>
              <mat-select [(ngModel)]="filterBrand">
                <mat-option value="all">All Brands</mat-option>
                <mat-option value="Volta">Volta</mat-option>
                <mat-option value="Osaka">Osaka</mat-option>
                <mat-option value="Fujika">Fujika</mat-option>
                <mat-option value="SAGA">SAGA</mat-option>
              </mat-select>
              <mat-icon matPrefix>filter_list</mat-icon>
            </mat-form-field>
          </div>

          <div class="overflow-auto">
            <table mat-table [dataSource]="filteredItems" class="w-full">
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>Product ID</th>
                <td mat-cell *matCellDef="let item" class="font-medium">{{ item.id }}</td>
              </ng-container>

              <ng-container matColumnDef="brand">
                <th mat-header-cell *matHeaderCellDef>Brand</th>
                <td mat-cell *matCellDef="let item">{{ item.brand }}</td>
              </ng-container>

              <ng-container matColumnDef="capacity">
                <th mat-header-cell *matHeaderCellDef>Capacity</th>
                <td mat-cell *matCellDef="let item">{{ item.capacity }}</td>
              </ng-container>

              <ng-container matColumnDef="quantity">
                <th mat-header-cell *matHeaderCellDef>Quantity</th>
                <td mat-cell *matCellDef="let item">{{ item.quantity }}</td>
              </ng-container>

              <ng-container matColumnDef="location">
                <th mat-header-cell *matHeaderCellDef>Location</th>
                <td mat-cell *matCellDef="let item">{{ item.location }}</td>
              </ng-container>

              <ng-container matColumnDef="expiry">
                <th mat-header-cell *matHeaderCellDef>Expiry Date</th>
                <td mat-cell *matCellDef="let item">{{ item.expiry }}</td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let item">
                  <mat-chip [color]="getStatusColor(item.status)">
                    <mat-icon *ngIf="item.status === 'critical'">warning</mat-icon>
                    {{ item.status }}
                  </mat-chip>
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
export class InventoryComponent {
  searchTerm = '';
  filterBrand = 'all';
  displayedColumns = ['id', 'brand', 'capacity', 'quantity', 'location', 'expiry', 'status'];

  inventoryItems = [
    { id: 'VOLTA-VL120-45AH', brand: 'Volta', capacity: '45AH', quantity: 450, location: 'A-12-B', expiry: '2024-08-15', status: 'critical' },
    { id: 'OSAKA-OS80-35AH', brand: 'Osaka', capacity: '35AH', quantity: 280, location: 'B-05-C', expiry: '2024-09-22', status: 'warning' },
    { id: 'FUJIKA-FK65-28AH', brand: 'Fujika', capacity: '28AH', quantity: 320, location: 'C-08-A', expiry: '2024-12-01', status: 'good' },
    { id: 'SAGA-SG100-40AH', brand: 'SAGA', capacity: '40AH', quantity: 150, location: 'D-03-B', expiry: '2024-11-15', status: 'good' },
    { id: 'VOLTA-VL150-55AH', brand: 'Volta', capacity: '55AH', quantity: 200, location: 'A-15-A', expiry: '2024-10-30', status: 'warning' }
  ];

  get filteredItems() {
    return this.inventoryItems.filter(item => {
      const matchesSearch = item.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           item.brand.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesBrand = this.filterBrand === 'all' || item.brand === this.filterBrand;
      return matchesSearch && matchesBrand;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'critical': return 'warn';
      case 'warning': return 'primary';
      case 'good': return 'accent';
      default: return 'basic';
    }
  }
}