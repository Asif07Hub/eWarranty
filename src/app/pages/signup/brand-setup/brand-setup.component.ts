import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

interface BrandData {
  id: string;
  name: string;
  displayName: string;
  color: string;
  logo?: string;
  isPrimary: boolean;
}

@Component({
  selector: 'app-brand-setup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  template: `
    <div class="min-h-screen bg-page-background flex items-center justify-center p-4">
      <div class="w-full max-w-4xl">
        <!-- Progress -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-3xl font-bold">Create Your Account</h1>
            <span class="text-muted">Step 3 of 5</span>
          </div>
          <mat-progress-bar mode="determinate" [value]="60"></mat-progress-bar>
        </div>

        <mat-card class="shadow-elegant">
          <mat-card-header>
            <mat-card-title class="flex items-center gap-3">
              <mat-icon class="text-trust-blue">palette</mat-icon>
              Brand Configuration
            </mat-card-title>
            <mat-card-subtitle>
              Set up your brands for <span class="font-medium text-trust-blue">{{ companyName }}</span>. 
              You can manage multiple brands or start with one.
            </mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content class="space-y-6">
            <!-- Brands List -->
            <div class="space-y-6">
              <div *ngFor="let brand of brands; let i = index" 
                   class="p-6 border rounded-lg space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <h3 class="text-lg font-semibold">Brand {{ i + 1 }}</h3>
                    <mat-chip *ngIf="brand.isPrimary" color="primary">
                      <mat-icon>star</mat-icon>
                      Primary
                    </mat-chip>
                  </div>
                  
                  <button *ngIf="brands.length > 1" 
                          mat-icon-button 
                          color="warn"
                          (click)="removeBrand(brand.id)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Brand Display Name *</mat-label>
                    <input matInput 
                           [(ngModel)]="brand.displayName"
                           [name]="'displayName-' + brand.id"
                           placeholder="e.g., Volta Batteries, Osaka Auto"
                           (input)="onDisplayNameChange(brand)"
                           required>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Brand Code *</mat-label>
                    <input matInput 
                           [(ngModel)]="brand.name"
                           [name]="'name-' + brand.id"
                           placeholder="e.g., volta, osaka"
                           class="font-mono"
                           required>
                    <mat-hint>Used for URLs and internal identification</mat-hint>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Brand Color</mat-label>
                    <input matInput 
                           [(ngModel)]="brand.color"
                           [name]="'color-' + brand.id"
                           placeholder="#00C853"
                           class="font-mono">
                    <input type="color" 
                           [(ngModel)]="brand.color"
                           class="w-8 h-8 rounded border-0 cursor-pointer"
                           matPrefix>
                  </mat-form-field>

                  <div class="space-y-2">
                    <label class="text-sm font-medium">Brand Logo</label>
                    <div class="flex items-center gap-4">
                      <img *ngIf="brand.logo" 
                           [src]="brand.logo" 
                           [alt]="brand.displayName + ' Logo'" 
                           class="w-12 h-12 object-cover rounded border">
                      <div class="flex-1">
                        <input type="file" 
                               [id]="'logo-' + brand.id"
                               accept="image/*"
                               (change)="handleLogoUpload(brand.id, $event)"
                               class="hidden">
                        <button mat-stroked-button 
                                type="button"
                                (click)="triggerFileInput('logo-' + brand.id)"
                                class="w-full">
                          <mat-icon>upload</mat-icon>
                          Upload Logo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <mat-checkbox [(ngModel)]="brand.isPrimary" 
                              [name]="'primary-' + brand.id"
                              (change)="onPrimaryChange(brand)">
                  Make this the primary brand
                </mat-checkbox>
              </div>
            </div>

            <!-- Add Brand Button -->
            <button mat-stroked-button 
                    type="button"
                    (click)="addBrand()"
                    class="w-full border-dashed">
              <mat-icon>add</mat-icon>
              Add Another Brand
            </button>

            <!-- Examples -->
            <div class="p-4 bg-section-background rounded-lg">
              <h4 class="font-medium mb-2">Examples:</h4>
              <div class="space-y-2 text-sm text-muted">
                <div><strong>Pak Accumulators:</strong> Volta, Osaka, Saga, Fujika</div>
                <div><strong>Daewoo Batteries:</strong> Daewoo (single brand)</div>
                <div><strong>Atlas Honda:</strong> Honda Motorcycles, Honda Parts</div>
              </div>
            </div>

            <div class="flex justify-between pt-6">
              <button mat-stroked-button type="button" (click)="handleBack()">
                <mat-icon>arrow_back</mat-icon>
                Back
              </button>
              <button mat-raised-button 
                      color="primary" 
                      (click)="handleNext()"
                      [disabled]="!isFormValid()">
                Continue to Plans
                <mat-icon>arrow_forward</mat-icon>
              </button>
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
  `]
})
export class BrandSetupComponent implements OnInit {
  companyName = '';
  brands: BrandData[] = [
    {
      id: '1',
      name: '',
      displayName: '',
      color: '#00C853',
      isPrimary: true
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if previous steps are completed
    const companyInfo = localStorage.getItem('companyInfo');
    const accountSetup = localStorage.getItem('accountSetup');
    
    if (!companyInfo || !accountSetup) {
      this.router.navigate(['/signup/company-info']);
      return;
    }

    // Get company name for context
    try {
      const company = JSON.parse(companyInfo);
      this.companyName = company.companyName || 'Your Company';
    } catch (e) {
      console.error('Error parsing company info:', e);
    }

    // Load saved brand setup data
    const savedBrands = localStorage.getItem('brandSetup');
    if (savedBrands) {
      try {
        this.brands = JSON.parse(savedBrands);
      } catch (e) {
        console.error('Error parsing saved brands:', e);
      }
    }
  }

  onDisplayNameChange(brand: BrandData): void {
    if (brand.displayName) {
      brand.name = this.generateBrandName(brand.displayName);
    }
    this.saveBrands();
  }

  onPrimaryChange(selectedBrand: BrandData): void {
    if (selectedBrand.isPrimary) {
      // Remove primary from all other brands
      this.brands.forEach(brand => {
        if (brand.id !== selectedBrand.id) {
          brand.isPrimary = false;
        }
      });
    }
    this.saveBrands();
  }

  addBrand(): void {
    const newBrand: BrandData = {
      id: Date.now().toString(),
      name: '',
      displayName: '',
      color: '#3B82F6',
      isPrimary: false
    };
    
    this.brands.push(newBrand);
    this.saveBrands();
  }

  removeBrand(id: string): void {
    if (this.brands.length <= 1) return;
    
    const brandToRemove = this.brands.find(b => b.id === id);
    this.brands = this.brands.filter(brand => brand.id !== id);
    
    // If removing primary brand, make first remaining brand primary
    if (brandToRemove?.isPrimary && this.brands.length > 0) {
      this.brands[0].isPrimary = true;
    }
    
    this.saveBrands();
  }

  handleLogoUpload(brandId: string, event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const brand = this.brands.find(b => b.id === brandId);
        if (brand) {
          brand.logo = e.target?.result as string;
          this.saveBrands();
        }
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(inputId: string): void {
    document.getElementById(inputId)?.click();
  }

  private generateBrandName(displayName: string): string {
    return displayName.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  private saveBrands(): void {
    localStorage.setItem('brandSetup', JSON.stringify(this.brands));
  }

  isFormValid(): boolean {
    return this.brands.every(brand => brand.name && brand.displayName) &&
           this.brands.some(brand => brand.isPrimary);
  }

  handleNext(): void {
    if (this.isFormValid()) {
      this.router.navigate(['/signup/select-plan']);
    }
  }

  handleBack(): void {
    this.router.navigate(['/signup/account-setup']);
  }
}