import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-qr-generation',
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
    MatProgressBarModule,
    MatChipsModule,
    PageHeaderComponent,
    MetricCardComponent
  ],
  template: `
    <div class="space-y-8">
      <app-page-header
        title="QR Code Generation"
        description="Generate unique QR codes for battery products to enable warranty tracking and authentication">
        <button mat-stroked-button>
          <mat-icon>download</mat-icon>
          Export Template
        </button>
      </app-page-header>

      <!-- Statistics -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <app-metric-card
          *ngFor="let stat of qrStats"
          [title]="stat.label"
          [value]="stat.value"
          [icon]="stat.icon"
          [change]="stat.change">
        </app-metric-card>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <!-- QR Generation Form -->
        <mat-card>
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon>add</mat-icon>
              Generate New QR Batch
            </mat-card-title>
            <mat-card-subtitle>Create QR codes for a new production batch</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content class="space-y-6">
            <form (ngSubmit)="handleGeneration()" #qrForm="ngForm">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Brand</mat-label>
                <mat-select [(ngModel)]="selectedBrand" name="brand" required>
                  <mat-option *ngFor="let brand of brands" [value]="brand.id">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full" [style.background-color]="brand.color"></div>
                      {{ brand.name }}
                    </div>
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Product Type</mat-label>
                <mat-select [(ngModel)]="selectedProduct" name="product" required>
                  <mat-option *ngFor="let product of productTypes" [value]="product.id">
                    {{ product.name }}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <div class="grid grid-cols-2 gap-4">
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Batch Number</mat-label>
                  <input matInput 
                         [(ngModel)]="batchNumber" 
                         name="batchNumber"
                         placeholder="e.g., BT2024005"
                         required>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Quantity</mat-label>
                  <input matInput 
                         type="number"
                         [(ngModel)]="quantity" 
                         name="quantity"
                         placeholder="e.g., 500"
                         required>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Manufacturing Date</mat-label>
                <input matInput 
                       type="date"
                       [(ngModel)]="manufacturingDate" 
                       name="manufacturingDate"
                       required>
              </mat-form-field>

              <div *ngIf="isGenerating" class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span>Generating QR codes...</span>
                  <span>{{ generationProgress }}%</span>
                </div>
                <mat-progress-bar mode="determinate" [value]="generationProgress"></mat-progress-bar>
              </div>

              <button mat-raised-button 
                      color="primary"
                      type="submit"
                      class="w-full"
                      [disabled]="!qrForm.valid || isGenerating">
                <mat-icon>qr_code</mat-icon>
                {{ isGenerating ? 'Generating...' : 'Generate QR Codes' }}
              </button>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Recent Batches -->
        <mat-card>
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon>inventory</mat-icon>
              Recent Batches
            </mat-card-title>
            <mat-card-subtitle>Recently generated QR code batches</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let batch of recentBatches" 
                   class="flex items-center justify-between p-4 bg-card rounded-lg border">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <mat-chip>{{ batch.id }}</mat-chip>
                    <mat-icon [class]="getStatusIconClass(batch.status)">{{ getStatusIcon(batch.status) }}</mat-icon>
                  </div>
                  <div class="font-medium">{{ batch.brand }} - {{ batch.product }}</div>
                  <div class="text-sm text-muted">
                    QR: {{ batch.qrGenerated }}/{{ batch.quantity }} codes generated
                  </div>
                  <div class="text-sm text-muted">{{ batch.date }}</div>
                </div>
                <div class="flex flex-col gap-2">
                  <mat-chip [color]="getStatusColor(batch.status)">
                    {{ batch.status.replace('-', ' ') }}
                  </mat-chip>
                  <button mat-stroked-button size="small">
                    <mat-icon>download</mat-icon>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Generation Complete -->
      <mat-card *ngIf="generationProgress === 100">
        <mat-card-header>
          <mat-card-title class="flex items-center gap-2">
            <mat-icon class="text-success">check_circle</mat-icon>
            Generation Complete
          </mat-card-title>
          <mat-card-subtitle>
            QR codes have been successfully generated for batch {{ batchNumber }}
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
            <div>
              <div class="font-medium text-success">{{ quantity }} QR codes generated successfully</div>
              <div class="text-sm text-muted mt-1">
                Batch: {{ batchNumber }} • Brand: {{ getSelectedBrandName() }}
              </div>
            </div>
            <div class="flex gap-2">
              <button mat-raised-button color="primary">
                <mat-icon>download</mat-icon>
                Download ZIP
              </button>
              <button mat-stroked-button>
                <mat-icon>print</mat-icon>
                Print Labels
              </button>
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
export class QrGenerationComponent implements OnInit {
  selectedBrand = '';
  selectedProduct = '';
  batchNumber = '';
  quantity = '';
  manufacturingDate = '';
  isGenerating = false;
  generationProgress = 0;

  brands = [
    { id: 'volta', name: 'Volta', color: '#00C853' },
    { id: 'osaka', name: 'Osaka', color: '#DC2626' },
    { id: 'fujika', name: 'Fujika', color: '#7C3AED' },
    { id: 'saga', name: 'Saga', color: '#059669' }
  ];

  productTypes = [
    { id: '12v-65ah', name: '12V 65AH Lead Acid Battery' },
    { id: '12v-75ah', name: '12V 75AH Lead Acid Battery' },
    { id: '12v-100ah', name: '12V 100AH Lead Acid Battery' },
    { id: '12v-150ah', name: '12V 150AH Lead Acid Battery' },
    { id: '6v-200ah', name: '6V 200AH Deep Cycle Battery' }
  ];

  qrStats = [
    { label: 'Total Generated', value: '45,678', icon: 'qr_code', change: '+2,345 this month' },
    { label: 'Active Batches', value: '8', icon: 'inventory', change: '3 completing today' },
    { label: 'Brands Served', value: '4', icon: 'factory', change: 'All brands active' },
    { label: 'Success Rate', value: '99.8%', icon: 'check_circle', change: '0.2% error rate' }
  ];

  recentBatches = [
    {
      id: 'BT2024001',
      brand: 'Volta',
      product: '12V 100AH',
      quantity: 500,
      qrGenerated: 500,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 'BT2024002',
      brand: 'Osaka',
      product: '12V 75AH',
      quantity: 300,
      qrGenerated: 180,
      date: '2024-01-14',
      status: 'in-progress'
    }
  ];

  ngOnInit(): void {}

  async handleGeneration(): Promise<void> {
    if (!this.selectedBrand || !this.selectedProduct || !this.batchNumber || !this.quantity || !this.manufacturingDate) {
      return;
    }

    this.isGenerating = true;
    this.generationProgress = 0;

    // Simulate QR code generation progress
    const interval = setInterval(() => {
      this.generationProgress += 10;
      if (this.generationProgress >= 100) {
        clearInterval(interval);
        this.isGenerating = false;
      }
    }, 300);
  }

  getSelectedBrandName(): string {
    const brand = this.brands.find(b => b.id === this.selectedBrand);
    return brand?.name || '';
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'completed': return 'check_circle';
      case 'in-progress': return 'schedule';
      case 'failed': return 'error';
      default: return 'schedule';
    }
  }

  getStatusIconClass(status: string): string {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'failed': return 'text-destructive';
      default: return 'text-muted';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'primary';
      case 'in-progress': return 'accent';
      case 'failed': return 'warn';
      default: return 'primary';
    }
  }
}