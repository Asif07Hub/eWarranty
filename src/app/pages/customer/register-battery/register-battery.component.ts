import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register-battery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <!-- Mobile Header -->
      <div class="flex items-center justify-between mb-6">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <div class="flex items-center gap-2">
          <mat-icon class="text-primary">flash_on</mat-icon>
          <span class="font-bold text-lg">Pakistan Accumulators</span>
        </div>
      </div>

      <div class="max-w-md mx-auto">
        <mat-stepper [selectedIndex]="step" orientation="horizontal" #stepper>
          <!-- Step 1: QR Scan -->
          <mat-step>
            <ng-template matStepLabel>Scan QR</ng-template>
            <mat-card class="shadow-elegant">
              <mat-card-header class="text-center">
                <mat-card-title>Register Your Battery</mat-card-title>
                <mat-card-subtitle>Scan the QR code on your battery to start registration</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content class="space-y-6">
                <div class="flex flex-col items-center space-y-4">
                  <div *ngIf="!isScanning; else scanningTemplate" 
                       class="w-48 h-48 border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
                    <mat-icon class="text-6xl text-primary">qr_code</mat-icon>
                  </div>
                  
                  <ng-template #scanningTemplate>
                    <div class="w-48 h-48 border-2 border-primary rounded-lg flex items-center justify-center">
                      <mat-icon class="text-6xl text-primary animate-bounce">camera_alt</mat-icon>
                    </div>
                    <p class="text-center text-muted">Scanning QR code...</p>
                  </ng-template>
                  
                  <button *ngIf="!isScanning" 
                          mat-raised-button 
                          color="primary"
                          (click)="handleScan()"
                          class="w-full">
                    <mat-icon>camera_alt</mat-icon>
                    Scan QR Code
                  </button>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-step>

          <!-- Step 2: Customer Information -->
          <mat-step>
            <ng-template matStepLabel>Customer Info</ng-template>
            <mat-card *ngIf="scannedData" class="shadow-elegant">
              <mat-card-header>
                <mat-card-title>Battery Information</mat-card-title>
                <div [class]="'p-4 rounded-lg text-white ' + getBrandGradient(scannedData.brand)">
                  <div class="text-center">
                    <p class="font-bold text-lg">{{ scannedData.brand }}</p>
                    <p class="text-sm opacity-90">{{ scannedData.model }}</p>
                    <p class="text-xs opacity-75">Serial: {{ scannedData.serialNumber }}</p>
                  </div>
                </div>
              </mat-card-header>
              
              <mat-card-content class="space-y-4">
                <form #customerForm="ngForm">
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Full Name *</mat-label>
                    <input matInput [(ngModel)]="customerInfo.name" name="name" required>
                  </mat-form-field>
                  
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Phone Number *</mat-label>
                    <input matInput [(ngModel)]="customerInfo.phone" name="phone" required>
                  </mat-form-field>
                  
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Email (Optional)</mat-label>
                    <input matInput type="email" [(ngModel)]="customerInfo.email" name="email">
                  </mat-form-field>
                  
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Address *</mat-label>
                    <input matInput [(ngModel)]="customerInfo.address" name="address" required>
                  </mat-form-field>
                  
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Purchase Date *</mat-label>
                    <input matInput type="date" [(ngModel)]="customerInfo.purchaseDate" name="purchaseDate" required>
                  </mat-form-field>
                  
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Dealer/Shop Name</mat-label>
                    <input matInput [(ngModel)]="customerInfo.dealerName" name="dealerName">
                  </mat-form-field>
                </form>
                
                <button mat-raised-button 
                        color="primary"
                        (click)="handleSubmit()"
                        [disabled]="!customerForm.valid"
                        class="w-full">
                  Register Battery
                </button>
              </mat-card-content>
            </mat-card>
          </mat-step>

          <!-- Step 3: Success -->
          <mat-step>
            <ng-template matStepLabel>Complete</ng-template>
            <mat-card *ngIf="scannedData" class="shadow-elegant">
              <mat-card-content class="p-8">
                <div class="text-center space-y-6">
                  <div class="w-20 h-20 bg-success/20 rounded-full mx-auto flex items-center justify-center">
                    <mat-icon class="text-4xl text-success">check_circle</mat-icon>
                  </div>
                  
                  <div>
                    <h2 class="text-2xl font-bold mb-2">Registration Successful!</h2>
                    <p class="text-muted">
                      Your {{ scannedData.brand }} battery has been registered successfully.
                    </p>
                  </div>
                  
                  <div class="bg-muted/50 p-4 rounded-lg text-left">
                    <h3 class="font-semibold mb-2">Registration Details:</h3>
                    <div class="space-y-1 text-sm">
                      <p><span class="font-medium">Registration ID:</span> REG-{{ registrationId }}</p>
                      <p><span class="font-medium">Serial Number:</span> {{ scannedData.serialNumber }}</p>
                      <p><span class="font-medium">Brand:</span> {{ scannedData.brand }}</p>
                      <p><span class="font-medium">Model:</span> {{ scannedData.model }}</p>
                      <p><span class="font-medium">Purchase Date:</span> {{ customerInfo.purchaseDate }}</p>
                    </div>
                  </div>
                  
                  <div class="space-y-3">
                    <button mat-raised-button color="primary" routerLink="/customer/claim" class="w-full">
                      Submit Warranty Claim
                    </button>
                    <button mat-stroked-button routerLink="/" class="w-full">
                      Back to Home
                    </button>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-step>
        </mat-stepper>
      </div>
    </div>
  `,
  styles: [`
    .shadow-elegant {
      box-shadow: var(--shadow-elegant);
    }
  `]
})
export class RegisterBatteryComponent {
  step = 0;
  isScanning = false;
  registrationId = '';
  
  scannedData: {
    serialNumber: string;
    brand: string;
    model: string;
    capacity: string;
  } | null = null;

  customerInfo = {
    name: '',
    phone: '',
    email: '',
    address: '',
    purchaseDate: '',
    dealerName: ''
  };

  constructor(private router: Router) {}

  async handleScan(): Promise<void> {
    this.isScanning = true;
    
    // Simulate QR scan
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.scannedData = {
      serialNumber: 'VT24150089',
      brand: 'Volta',
      model: 'AGM 70Ah',
      capacity: '70Ah'
    };
    
    this.isScanning = false;
    this.step = 1;
  }

  handleSubmit(): void {
    this.registrationId = Date.now().toString();
    this.step = 2;
  }

  getBrandGradient(brand: string): string {
    const gradients: { [key: string]: string } = {
      'Volta': 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      'Osaka': 'bg-gradient-to-r from-orange-400 to-orange-600',
      'Fujika': 'bg-gradient-to-r from-purple-400 to-purple-600',
      'SAGA': 'bg-gradient-to-r from-green-400 to-green-600'
    };
    return gradients[brand] || 'bg-gradient-to-r from-blue-400 to-blue-600';
  }

  goBack(): void {
    if (this.step > 0) {
      this.step--;
    } else {
      this.router.navigate(['/']);
    }
  }
}