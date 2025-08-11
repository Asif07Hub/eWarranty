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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';

@Component({
  selector: 'app-sales',
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
    PageHeaderComponent
  ],
  template: `
    <div class="space-y-6">
      <app-page-header
        title="Sales Management" 
        description="Process sales and manage customer transactions">
        <button mat-raised-button color="primary" (click)="openNewSaleDialog()">
          <mat-icon>add</mat-icon>
          New Sale
        </button>
      </app-page-header>

      <mat-card>
        <mat-card-header>
          <mat-card-title class="flex items-center gap-2">
            <mat-icon class="text-primary">shopping_cart</mat-icon>
            Sales History
          </mat-card-title>
          <mat-card-subtitle>Complete record of all customer transactions</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="flex gap-4 mb-6">
            <mat-form-field appearance="outline" class="flex-1">
              <mat-label>Search</mat-label>
              <input matInput 
                     [(ngModel)]="searchTerm"
                     placeholder="Search sales...">
              <mat-icon matPrefix>search</mat-icon>
            </mat-form-field>
          </div>

          <div class="overflow-auto">
            <table mat-table [dataSource]="filteredSales" class="w-full">
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>Sale ID</th>
                <td mat-cell *matCellDef="let sale" class="font-medium">{{ sale.id }}</td>
              </ng-container>

              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef>Date</th>
                <td mat-cell *matCellDef="let sale">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-xs text-muted">event</mat-icon>
                    <span>{{ sale.date }}</span>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="customer">
                <th mat-header-cell *matHeaderCellDef>Customer</th>
                <td mat-cell *matCellDef="let sale">
                  <div>
                    <p class="font-medium">{{ sale.customer }}</p>
                    <p class="text-xs text-muted">{{ sale.phone }}</p>
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="product">
                <th mat-header-cell *matHeaderCellDef>Product</th>
                <td mat-cell *matCellDef="let sale">{{ sale.product }}</td>
              </ng-container>

              <ng-container matColumnDef="serialNumber">
                <th mat-header-cell *matHeaderCellDef>Serial Number</th>
                <td mat-cell *matCellDef="let sale" class="font-mono text-sm">{{ sale.serialNumber }}</td>
              </ng-container>

              <ng-container matColumnDef="quantity">
                <th mat-header-cell *matHeaderCellDef>Qty</th>
                <td mat-cell *matCellDef="let sale">{{ sale.quantity }}</td>
              </ng-container>

              <ng-container matColumnDef="total">
                <th mat-header-cell *matHeaderCellDef>Total</th>
                <td mat-cell *matCellDef="let sale">₨ {{ sale.total | number }}</td>
              </ng-container>

              <ng-container matColumnDef="warranty">
                <th mat-header-cell *matHeaderCellDef>Warranty</th>
                <td mat-cell *matCellDef="let sale">
                  <mat-chip>{{ sale.warranty }}</mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let sale">
                  <mat-chip color="primary">{{ sale.status }}</mat-chip>
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
export class SalesComponent {
  searchTerm = '';
  displayedColumns = ['id', 'date', 'customer', 'product', 'serialNumber', 'quantity', 'total', 'warranty', 'status'];

  salesData = [
    { 
      id: 'SAL-001', 
      date: '2024-07-15', 
      customer: 'Muhammad Ali', 
      phone: '+92-300-1234567',
      product: 'VOLTA-VL120-45AH', 
      serialNumber: 'VL120230001',
      quantity: 1,
      unitPrice: 15000,
      total: 15000,
      warranty: '24 months',
      status: 'completed'
    },
    { 
      id: 'SAL-002', 
      date: '2024-07-15', 
      customer: 'Ayesha Khan', 
      phone: '+92-301-2345678',
      product: 'OSAKA-OS80-35AH', 
      serialNumber: 'OS80230002',
      quantity: 1,
      unitPrice: 12000,
      total: 12000,
      warranty: '18 months',
      status: 'completed'
    }
  ];

  constructor(private dialog: MatDialog) {}

  get filteredSales() {
    return this.salesData.filter(sale =>
      sale.customer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      sale.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      sale.product.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openNewSaleDialog(): void {
    // Implementation for new sale dialog
    console.log('Open new sale dialog');
  }
}