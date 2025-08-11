import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-submit-claim',
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
    MatStepperModule,
    MatChipsModule
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
        <mat-stepper [selectedIndex]="step" orientation="horizontal">
          <!-- Step 1: QR Scan -->
          <mat-step>
            <ng-template matStepLabel>Scan QR</ng-template>
            <mat-card class="shadow-elegant">
              <mat-card-header class="text-center">
                <mat-card-title>Submit Warranty Claim</mat-card-title>
                <mat-card-subtitle>Scan the QR code on your battery to start your warranty claim</mat-card-subtitle>
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

          <!-- Step 2: Claim Details -->
          <mat-step>
            <ng-template matStepLabel>Claim Details</ng-template>
            <mat-card *ngIf="scannedData" class="shadow-elegant">
              <mat-card-header>
                <mat-card-title>Warranty Claim Details</mat-card-title>
                <div [class]="'p-4 rounded-lg text-white ' + getBrandGradient(scannedData.brand)">
                  <div class="text-center">
                    <p class="font-bold text-lg">{{ scannedData.brand }}</p>
                    <p class="text-sm opacity-90">{{ scannedData.model }}</p>
                    <p class="text-xs opacity-75">Serial: {{ scannedData.serialNumber }}</p>
                  </div>
                </div>
                
                <!-- Warranty Status -->
                <div class="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-success">check_circle</mat-icon>
                    <span class="text-sm font-medium text-success">Warranty Status</span>
                  </div>
                  <span class="text-sm font-bold text-success">{{ scannedData.warrantyStatus }}</span>
                </div>
              </mat-card-header>
              
              <mat-card-content class="space-y-4">
                <form #claimForm="ngForm">
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Issue Type *</mat-label>
                    <mat-select [(ngModel)]="claimInfo.issueType" name="issueType" required>
                      <mat-option *ngFor="let type of issueTypes" [value]="type">{{ type }}</mat-option>
                    </mat-select>
                  </mat-form-field>
                  
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Issue Description *</mat-label>
                    <textarea matInput 
                              [(ngModel)]="claimInfo.description" 
                              name="description"
                              placeholder="Please describe the issue in detail..."
                              rows="4"
                              required></textarea>
                  </mat-form-field>
                  
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Contact Number *</mat-label>
                    <input matInput 
                           type="tel"
                           [(ngModel)]="claimInfo.customerContact" 
                           name="contact"
                           placeholder="+92-XXX-XXXXXXX"
                           required>
                  </mat-form-field>
                </form>
                
                <div class="bg-warning/10 border border-warning/20 rounded-lg p-3">
                  <div class="flex items-start gap-2">
                    <mat-icon class="text-warning">warning</mat-icon>
                    <div class="text-sm text-warning">
                      <p class="font-medium">Important:</p>
                      <p>Please ensure all information is accurate. False claims may void your warranty.</p>
                    </div>
                  </div>
                </div>
                
                <button mat-raised-button 
                        color="primary"
                        (click)="handleSubmit()"
                        [disabled]="!claimForm.valid"
                        class="w-full">
                  Submit Claim
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
                    <h2 class="text-2xl font-bold mb-2">Claim Submitted Successfully!</h2>
                    <p class="text-muted">Your warranty claim has been submitted and is under review.</p>
                  </div>
                  
                  <div class="bg-muted/50 p-4 rounded-lg text-left">
                    <h3 class="font-semibold mb-2">Claim Details:</h3>
                    <div class="space-y-1 text-sm">
                      <p><span class="font-medium">Claim ID:</span> CLM-{{ claimId }}</p>
                      <p><span class="font-medium">Battery:</span> {{ scannedData.brand }} {{ scannedData.model }}</p>
                      <p><span class="font-medium">Issue:</span> {{ claimInfo.issueType }}</p>
                      <p><span class="font-medium">Status:</span> Under Review</p>
                      <p><span class="font-medium">Expected Response:</span> 2-3 business days</p>
                    </div>
                  </div>
                  
                  <div class="bg-info/10 border border-info/20 rounded-lg p-3">
                    <p class="text-sm text-info">
                      <span class="font-medium">Next Steps:</span> Our team will review your claim and contact you within 2-3 business days. Keep your claim ID for reference.
                    </p>
                  </div>
                  
                  <div class="space-y-3">
                    <button mat-raised-button color="primary" routerLink="/customer/status" class="w-full">
                      Check Claim Status
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
export class SubmitClaimComponent {
  step = 0;
  isScanning = false;
  claimId = '';
  
  scannedData: {
    serialNumber: string;
    brand: string;
    model: string;
    registrationId: string;
    purchaseDate: string;
    warrantyStatus: string;
  } | null = null;

  claimInfo = {
    issueType: '',
    description: '',
    customerContact: ''
  };

  customerInfo = {
    name: '',
    phone: '',
    email: '',
    address: '',
    purchaseDate: '',
    dealerName: ''
  };

  issueTypes = [
    'Battery not charging',
    'Battery drains quickly',
    'Physical damage',
    'Overheating',
    'Swelling/Bulging',
    'Other'
  ];

  constructor(private router: Router) {}

  async handleScan(): Promise<void> {
    this.isScanning = true;
    
    // Simulate QR scan
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.scannedData = {
      serialNumber: 'VT24150089',
      brand: 'Volta',
      model: 'AGM 70Ah',
      registrationId: 'REG-1705123456',
      purchaseDate: '2024-01-10',
      warrantyStatus: 'Active'
    };
    
    this.isScanning = false;
    this.step = 1;
  }

  handleSubmit(): void {
    this.claimId = Date.now().toString();
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