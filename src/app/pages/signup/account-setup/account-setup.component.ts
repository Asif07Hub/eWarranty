import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-account-setup',
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
    MatProgressBarModule
  ],
  template: `
    <div class="min-h-screen bg-page-background flex items-center justify-center p-4">
      <div class="w-full max-w-2xl">
        <!-- Progress -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-3xl font-bold">Create Your Account</h1>
            <span class="text-muted">Step 2 of 5</span>
          </div>
          <mat-progress-bar mode="determinate" [value]="40"></mat-progress-bar>
        </div>

        <mat-card class="shadow-elegant">
          <mat-card-header>
            <mat-card-title class="flex items-center gap-3">
              <mat-icon class="text-trust-blue">person_add</mat-icon>
              Account Setup
            </mat-card-title>
            <mat-card-subtitle>Configure your admin account and basic branding</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content class="space-y-6">
            <form (ngSubmit)="handleNext()" #accountForm="ngForm">
              <!-- Admin Credentials -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold">Admin Credentials</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Username *</mat-label>
                    <input matInput 
                           [(ngModel)]="formData.username" 
                           name="username"
                           placeholder="admin"
                           required>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Password *</mat-label>
                    <input matInput 
                           [type]="hidePassword ? 'password' : 'text'"
                           [(ngModel)]="formData.password" 
                           name="password"
                           placeholder="Enter password (min 8 characters)"
                           minlength="8"
                           required>
                    <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                      <mat-icon>{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
                    </button>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="w-full md:col-span-2">
                    <mat-label>Confirm Password *</mat-label>
                    <input matInput 
                           [type]="hideConfirmPassword ? 'password' : 'text'"
                           [(ngModel)]="formData.confirmPassword" 
                           name="confirmPassword"
                           placeholder="Confirm your password"
                           required>
                    <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
                      <mat-icon>{{ hideConfirmPassword ? 'visibility' : 'visibility_off' }}</mat-icon>
                    </button>
                    <mat-error *ngIf="formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword">
                      Passwords do not match
                    </mat-error>
                  </mat-form-field>
                </div>
              </div>

              <!-- Branding -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold">Basic Branding</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-medium">Company Logo</label>
                    <div class="flex items-center gap-4">
                      <img *ngIf="formData.companyLogo" 
                           [src]="formData.companyLogo" 
                           alt="Company Logo" 
                           class="w-12 h-12 object-cover rounded border">
                      <div class="flex-1">
                        <input type="file" 
                               #logoInput
                               accept="image/*"
                               (change)="handleLogoUpload($event)"
                               class="hidden">
                        <button mat-stroked-button 
                                type="button"
                                (click)="logoInput.click()"
                                class="w-full">
                          <mat-icon>upload</mat-icon>
                          Upload Logo
                        </button>
                      </div>
                    </div>
                  </div>

                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Primary Color</mat-label>
                    <input matInput 
                           [(ngModel)]="formData.primaryColor" 
                           name="primaryColor"
                           placeholder="#00C853">
                    <input type="color" 
                           [(ngModel)]="formData.primaryColor"
                           class="w-8 h-8 rounded border-0 cursor-pointer"
                           matPrefix>
                  </mat-form-field>
                </div>
              </div>

              <!-- Preferences -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold">Preferences</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Timezone</mat-label>
                    <mat-select [(ngModel)]="formData.timezone" name="timezone">
                      <mat-option *ngFor="let tz of timezones" [value]="tz">{{ tz }}</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Currency</mat-label>
                    <mat-select [(ngModel)]="formData.currency" name="currency">
                      <mat-option *ngFor="let currency of currencies" [value]="currency.split(' ')[0]">
                        {{ currency }}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </div>

              <div class="flex justify-between pt-6">
                <button mat-stroked-button type="button" (click)="handleBack()">
                  <mat-icon>arrow_back</mat-icon>
                  Back
                </button>
                <button mat-raised-button 
                        color="primary" 
                        type="submit"
                        [disabled]="!isFormValid()">
                  Continue
                  <mat-icon>arrow_forward</mat-icon>
                </button>
              </div>
            </form>
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
export class AccountSetupComponent implements OnInit {
  subdomain = '';
  hidePassword = true;
  hideConfirmPassword = true;
  
  formData = {
    username: '',
    password: '',
    confirmPassword: '',
    companyLogo: '',
    primaryColor: '#00C853',
    timezone: 'Asia/Karachi',
    currency: 'PKR'
  };

  timezones = [
    'Asia/Karachi', 'Asia/Dubai', 'Asia/Riyadh', 'Europe/London',
    'America/New_York', 'Asia/Singapore'
  ];

  currencies = [
    'PKR - Pakistani Rupee', 'USD - US Dollar', 'EUR - Euro',
    'GBP - British Pound', 'AED - UAE Dirham', 'SAR - Saudi Riyal'
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if company info exists
    const companyInfo = localStorage.getItem('companyInfo');
    if (!companyInfo) {
      this.router.navigate(['/signup/company-info']);
      return;
    }

    // Load saved account setup data
    const savedData = localStorage.getItem('accountSetup');
    if (savedData) {
      this.formData = JSON.parse(savedData);
    }
  }

  handleLogoUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.formData.companyLogo = e.target?.result as string;
        this.saveFormData();
      };
      reader.readAsDataURL(file);
    }
  }

  saveFormData(): void {
    localStorage.setItem('accountSetup', JSON.stringify(this.formData));
  }

  isFormValid(): boolean {
    return !!(this.formData.username && 
             this.formData.password && 
             this.formData.confirmPassword &&
             this.formData.password === this.formData.confirmPassword &&
             this.formData.password.length >= 8);
  }

  handleNext(): void {
    if (this.isFormValid()) {
      this.saveFormData();
      this.router.navigate(['/signup/brand-setup']);
    }
  }

  handleBack(): void {
    this.router.navigate(['/signup/company-info']);
  }
}