import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../types';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';

@Component({
  selector: 'app-platform-brand-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    PageHeaderComponent
  ],
  template: `
    <div class="space-y-6">
      <app-page-header
        title="Platform Brand Management"
        description="Manage brands across all tenant organizations">
        <button mat-raised-button color="primary" (click)="openCreateDialog()">
          <mat-icon>add</mat-icon>
          Add Brand
        </button>
      </app-page-header>

      <!-- Brand Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <mat-card *ngFor="let brand of brands$ | async" 
                  class="shadow-elegant hover:shadow-glow transition-all duration-300">
          <mat-card-header class="pb-3">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full shadow-sm" [style.background-color]="brand.color"></div>
                <mat-card-title class="text-lg">{{ brand.displayName }}</mat-card-title>
              </div>
              <mat-chip [color]="brand.isActive ? 'primary' : 'basic'">
                <mat-icon class="text-xs mr-1">{{ brand.isActive ? 'check_circle' : 'cancel' }}</mat-icon>
                {{ brand.isActive ? 'Active' : 'Inactive' }}
              </mat-chip>
            </div>
          </mat-card-header>
          
          <mat-card-content class="space-y-4">
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-muted">URL Name:</span>
                <span class="font-mono bg-muted px-2 py-1 rounded text-xs">{{ brand.name }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted">Color:</span>
                <span class="font-mono text-xs">{{ brand.color }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted">Created:</span>
                <span class="text-xs">{{ brand.createdAt | date }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center pt-2 border-t">
              <button mat-stroked-button 
                      (click)="toggleBrandStatus(brand)"
                      class="text-xs">
                {{ brand.isActive ? 'Deactivate' : 'Activate' }}
              </button>
              
              <div class="flex gap-1">
                <button mat-icon-button (click)="editBrand(brand)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button 
                        color="warn"
                        (click)="deleteBrand(brand)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .shadow-elegant {
      box-shadow: var(--shadow-elegant);
    }
    
    .shadow-glow {
      box-shadow: var(--shadow-glow);
    }
  `]
})
export class PlatformBrandManagementComponent implements OnInit {
  brands$: Observable<Brand[]>;

  constructor(
    private brandService: BrandService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.brands$ = this.brandService.brands$;
  }

  ngOnInit(): void {}

  openCreateDialog(): void {
    // Implementation for create brand dialog
    console.log('Open create brand dialog');
  }

  editBrand(brand: Brand): void {
    // Implementation for edit brand dialog
    console.log('Edit brand:', brand);
  }

  deleteBrand(brand: Brand): void {
    if (confirm(`Are you sure you want to delete ${brand.displayName}?`)) {
      this.brandService.deleteBrand(brand.id);
      this.snackBar.open('Brand deleted successfully', 'Close', { duration: 3000 });
    }
  }

  toggleBrandStatus(brand: Brand): void {
    this.brandService.updateBrand(brand.id, { isActive: !brand.isActive });
    this.snackBar.open(
      `Brand ${brand.isActive ? 'deactivated' : 'activated'} successfully`, 
      'Close', 
      { duration: 3000 }
    );
  }
}