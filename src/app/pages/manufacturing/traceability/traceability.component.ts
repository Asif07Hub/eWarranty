import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-traceability',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    PageHeaderComponent,
    MetricCardComponent
  ],
  template: `
    <div class="space-y-8">
      <app-page-header
        title="Product Traceability"
        description="Track products throughout their entire lifecycle from manufacturing to customer delivery">
        <button mat-raised-button color="primary">
          <mat-icon>qr_code_scanner</mat-icon>
          Scan QR Code
        </button>
      </app-page-header>

      <!-- Statistics -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <app-metric-card
          *ngFor="let stat of traceabilityStats"
          [title]="stat.label"
          [value]="stat.value"
          [icon]="stat.icon"
          [change]="stat.change">
        </app-metric-card>
      </div>

      <mat-tab-group>
        <mat-tab label="Product Search">
          <!-- Search -->
          <mat-card class="mt-6">
            <mat-card-header>
              <mat-card-title>Find Product</mat-card-title>
              <mat-card-subtitle>Search by Product ID, QR Code, or Batch Number</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Search</mat-label>
                <input matInput 
                       [(ngModel)]="searchTerm"
                       placeholder="Enter Product ID, QR Code, or Batch Number...">
                <mat-icon matPrefix>search</mat-icon>
              </mat-form-field>
            </mat-card-content>
          </mat-card>

          <!-- Product Results -->
          <div class="space-y-4 mt-6">
            <mat-card *ngFor="let product of filteredProducts" 
                      class="hover:shadow-md transition-shadow cursor-pointer"
                      (click)="selectProduct(product)">
              <mat-card-content class="p-6">
                <div class="flex items-start justify-between">
                  <div class="space-y-3 flex-1">
                    <div class="flex items-center gap-3">
                      <mat-chip>{{ product.id }}</mat-chip>
                      <mat-chip [color]="product.status === 'Active' ? 'primary' : 'accent'">
                        {{ product.status }}
                      </mat-chip>
                      <mat-chip color="accent">{{ product.brand }}</mat-chip>
                    </div>
                    
                    <div>
                      <h3 class="text-lg font-semibold">{{ product.model }}</h3>
                      <p class="text-muted">QR Code: {{ product.qrCode }}</p>
                    </div>
                    
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span class="font-medium">Batch:</span><br>{{ product.batchNumber }}
                      </div>
                      <div>
                        <span class="font-medium">Manufactured:</span><br>{{ product.manufacturingDate | date }}
                      </div>
                      <div>
                        <span class="font-medium">Current Location:</span><br>{{ product.currentLocation }}
                      </div>
                      <div>
                        <span class="font-medium">Warranty:</span><br>{{ product.warrantyStatus }} until {{ product.warrantyExpiry | date }}
                      </div>
                    </div>
                  </div>
                  
                  <button mat-stroked-button>View Journey</button>
                </div>
              </mat-card-content>
            </mat-card>
          </div>

          <mat-card *ngIf="filteredProducts.length === 0 && searchTerm">
            <mat-card-content class="flex flex-col items-center justify-center py-12">
              <mat-icon class="text-6xl text-muted mb-4">search</mat-icon>
              <h3 class="text-lg font-semibold mb-2">No products found</h3>
              <p class="text-muted text-center">
                No products match your search criteria. Please check the Product ID, QR Code, or Batch Number.
              </p>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="Journey Tracking">
          <mat-card *ngIf="selectedProduct; else noProductSelected" class="mt-6">
            <mat-card-header>
              <mat-card-title class="flex items-center gap-2">
                <mat-icon>route</mat-icon>
                Product Journey: {{ selectedProduct.id }}
              </mat-card-title>
              <mat-card-subtitle>
                Complete tracking history from manufacturing to current location
              </mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-6">
                <div *ngFor="let stage of selectedProduct.journey; let last = last" 
                     class="flex items-start gap-4">
                  <div class="flex flex-col items-center">
                    <div [class]="getStageStatusClass(stage.status)">
                      <mat-icon>{{ getStageIcon(stage.stage) }}</mat-icon>
                    </div>
                    <div *ngIf="!last" [class]="getConnectorClass(stage.status)"></div>
                  </div>
                  
                  <div class="flex-1 space-y-2">
                    <div class="flex items-center gap-2">
                      <h3 class="font-semibold">{{ stage.stage }}</h3>
                      <mat-chip [color]="getStageChipColor(stage.status)">{{ stage.status }}</mat-chip>
                    </div>
                    <div class="text-sm text-muted">
                      <div class="flex items-center gap-1 mb-1">
                        <mat-icon class="text-xs">place</mat-icon>
                        {{ stage.location }}
                      </div>
                      <div class="flex items-center gap-1 mb-1">
                        <mat-icon class="text-xs">schedule</mat-icon>
                        {{ stage.timestamp | date:'medium' }}
                      </div>
                      <p>{{ stage.details }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <ng-template #noProductSelected>
            <mat-card class="mt-6">
              <mat-card-content class="flex flex-col items-center justify-center py-12">
                <mat-icon class="text-6xl text-muted mb-4">route</mat-icon>
                <h3 class="text-lg font-semibold mb-2">Select a Product</h3>
                <p class="text-muted text-center">
                  Search for a product in the "Product Search" tab to view its complete journey.
                </p>
              </mat-card-content>
            </mat-card>
          </ng-template>
        </mat-tab>
      </mat-tab-group>
    </div>
  `
})
export class TraceabilityComponent implements OnInit {
  searchTerm = '';
  selectedProduct: any = null;

  traceabilityStats = [
    { label: 'Tracked Products', value: '12,543', icon: 'inventory', change: '+245 this week' },
    { label: 'Active Journeys', value: '3,456', icon: 'route', change: 'Real-time tracking' },
    { label: 'Locations Mapped', value: '89', icon: 'place', change: 'Nationwide coverage' },
    { label: 'Avg Transit Time', value: '3.2 days', icon: 'schedule', change: '-0.3 days vs target' }
  ];

  products = [
    {
      id: 'VLT-12V-100AH-001234',
      qrCode: 'QR123456789',
      brand: 'Volta',
      model: '12V 100AH Lead Acid',
      batchNumber: 'BT2024001',
      manufacturingDate: '2024-01-15',
      status: 'Active',
      currentLocation: 'Karachi Distributor - Zone A',
      warrantyStatus: 'Valid',
      warrantyExpiry: '2026-01-15',
      journey: [
        {
          stage: 'Manufacturing',
          location: 'Pakistan Accumulators Factory - Lahore',
          timestamp: '2024-01-15T08:00:00Z',
          status: 'completed',
          details: 'Battery manufactured and quality tested'
        },
        {
          stage: 'Quality Control',
          location: 'QC Department - Lahore',
          timestamp: '2024-01-15T14:00:00Z',
          status: 'completed',
          details: 'Passed all quality control tests'
        },
        {
          stage: 'Warehouse',
          location: 'Central Warehouse - Lahore',
          timestamp: '2024-01-16T09:00:00Z',
          status: 'completed',
          details: 'Stored in climate-controlled environment'
        },
        {
          stage: 'Distribution',
          location: 'Karachi Regional Hub',
          timestamp: '2024-01-18T11:00:00Z',
          status: 'completed',
          details: 'Shipped to regional distributor'
        },
        {
          stage: 'Retail',
          location: 'Karachi Distributor - Zone A',
          timestamp: '2024-01-20T15:30:00Z',
          status: 'current',
          details: 'Available for sale to customers'
        }
      ]
    }
  ];

  ngOnInit(): void {}

  get filteredProducts() {
    if (!this.searchTerm) return [];
    
    return this.products.filter(product =>
      product.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.qrCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.batchNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectProduct(product: any): void {
    this.selectedProduct = product;
  }

  getStageIcon(stage: string): string {
    switch (stage.toLowerCase()) {
      case 'manufacturing': return 'factory';
      case 'quality control': return 'check_circle';
      case 'warehouse': return 'inventory';
      case 'distribution': return 'local_shipping';
      case 'retail': return 'store';
      case 'customer': return 'person';
      default: return 'schedule';
    }
  }

  getStageStatusClass(status: string): string {
    const baseClass = 'p-2 rounded-full border-2 flex items-center justify-center';
    switch (status) {
      case 'completed': return `${baseClass} bg-success border-success text-white`;
      case 'current': return `${baseClass} bg-primary border-primary text-white`;
      default: return `${baseClass} bg-muted border-muted text-muted`;
    }
  }

  getConnectorClass(status: string): string {
    const baseClass = 'w-0.5 h-12 mt-2';
    return status === 'completed' ? `${baseClass} bg-success` : `${baseClass} bg-border`;
  }

  getStageChipColor(status: string): string {
    switch (status) {
      case 'completed': return 'primary';
      case 'current': return 'accent';
      default: return 'basic';
    }
  }
}