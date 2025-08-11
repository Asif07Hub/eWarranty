import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-company-info',
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
            <span class="text-muted">Step 1 of 5</span>
          </div>
          <mat-progress-bar mode="determinate" [value]="20"></mat-progress-bar>
        </div>

        <mat-card class="shadow-elegant">
          <mat-card-header>
            <mat-card-title class="flex items-center gap-3">
              <mat-icon class="text-trust-blue">business</mat-icon>
              Company Information
            </mat-card-title>
            <mat-card-subtitle>
              Setting up: <span class="font-medium text-trust-blue">{{ subdomain }}.ewarranty.pk</span>
            </mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content class="space-y-6">
            <form (ngSubmit)="handleNext()" #companyForm="ngForm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Company Name *</mat-label>
                  <input matInput 
                         [(ngModel)]="formData.companyName" 
                         name="companyName"
                         placeholder="Enter your company name"
                         required>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Industry *</mat-label>
                  <mat-select [(ngModel)]="formData.industry" name="industry" required>
                    <mat-option *ngFor="let industry of industries" [value]="industry">
                      {{ industry }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Contact Person *</mat-label>
                  <input matInput 
                         [(ngModel)]="formData.contactPerson" 
                         name="contactPerson"
                         placeholder="Full name"
                         required>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Email Address *</mat-label>
                  <input matInput 
                         type="email"
                         [(ngModel)]="formData.email" 
                         name="email"
                         placeholder="admin@yourcompany.com"
                         required>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Phone Number *</mat-label>
                  <input matInput 
                         [(ngModel)]="formData.phone" 
                         name="phone"
                         placeholder="+92 300 1234567"
                         required>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Company Size</mat-label>
                  <mat-select [(ngModel)]="formData.companySize" name="companySize">
                    <mat-option *ngFor="let size of companySizes" [value]="size">
                      {{ size }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Expected Warranty Volume</mat-label>
                <mat-select [(ngModel)]="formData.expectedVolume" name="expectedVolume">
                  <mat-option *ngFor="let volume of expectedVolumes" [value]="volume">
                    {{ volume }}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <div class="flex justify-between pt-6">
                <button mat-stroked-button type="button" (click)="goBack()">
                  <mat-icon>arrow_back</mat-icon>
                  Back to Home
                </button>
                <button mat-raised-button 
                        color="primary" 
                        type="submit"
                        [disabled]="!companyForm.valid">
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
export class CompanyInfoComponent implements OnInit {
  subdomain = '';
  formData = {
    companyName: '',
    industry: '',
    contactPerson: '',
    email: '',
    phone: '',
    companySize: '',
    expectedVolume: ''
  };

  industries = [
    'Electronics', 'Automotive', 'Home Appliances', 'Industrial Equipment',
    'Consumer Goods', 'Technology', 'Healthcare', 'Manufacturing', 'Other'
  ];

  companySizes = [
    'Small (1-50 employees)', 'Medium (51-200 employees)', 
    'Large (201-1000 employees)', 'Enterprise (1000+ employees)'
  ];

  expectedVolumes = [
    'Low (< 1,000 warranties/year)', 'Medium (1,000 - 10,000 warranties/year)',
    'High (10,000 - 100,000 warranties/year)', 'Enterprise (100,000+ warranties/year)'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const urlSubdomain = this.route.snapshot.queryParams['subdomain'];
    const storedSubdomain = localStorage.getItem('selectedSubdomain');
    
    if (urlSubdomain) {
      this.subdomain = urlSubdomain;
      localStorage.setItem('selectedSubdomain', urlSubdomain);
    } else if (storedSubdomain) {
      this.subdomain = storedSubdomain;
    } else {
      this.router.navigate(['/']);
    }

    // Load saved form data
    const savedData = localStorage.getItem('companyInfo');
    if (savedData) {
      this.formData = JSON.parse(savedData);
    }
  }

  handleNext(): void {
    localStorage.setItem('companyInfo', JSON.stringify(this.formData));
    this.router.navigate(['/signup/account-setup']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}