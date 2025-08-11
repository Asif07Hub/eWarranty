import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatCheckboxModule
  ],
  template: `
    <div class="min-h-screen bg-page-background flex items-center justify-center p-4">
      <div class="w-full max-w-4xl">
        <!-- Progress -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-3xl font-bold">Platform Onboarding</h1>
            <span class="text-muted">Step {{ currentStep + 1 }} of {{ onboardingSteps.length }}</span>
          </div>
          <mat-progress-bar mode="determinate" [value]="((currentStep + 1) / onboardingSteps.length) * 100"></mat-progress-bar>
        </div>

        <mat-card class="shadow-elegant">
          <mat-card-header class="text-center">
            <div class="w-16 h-16 bg-trust-blue rounded-full mx-auto mb-4 flex items-center justify-center">
              <mat-icon class="text-white text-2xl">{{ currentStepData.icon }}</mat-icon>
            </div>
            <mat-card-title>{{ currentStepData.title }}</mat-card-title>
            <mat-card-subtitle>{{ currentStepData.description }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content class="min-h-[400px] flex flex-col justify-between">
            <div class="flex-1">
              <!-- Step Content -->
              <div [ngSwitch]="currentStep">
                <!-- Welcome Step -->
                <div *ngSwitchCase="0" class="space-y-6 text-center">
                  <div class="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center">
                    <mat-icon class="text-white text-4xl">check_circle</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold mb-4">You're all set up!</h3>
                    <p class="text-muted mb-6">
                      Your warranty management platform is ready to use. Let's take a quick tour of the key features.
                    </p>
                  </div>
                </div>

                <!-- Multi-Portal Step -->
                <div *ngSwitchCase="1" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div *ngFor="let portal of portals" class="p-4 border rounded-lg">
                      <h4 class="font-medium mb-2">{{ portal.title }}</h4>
                      <p class="text-sm text-muted">{{ portal.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- QR Code Step -->
                <div *ngSwitchCase="2" class="space-y-6">
                  <div class="text-center">
                    <mat-icon class="text-6xl text-trust-blue mb-4">qr_code</mat-icon>
                    <h4 class="text-xl font-semibold mb-2">Smart QR System</h4>
                    <p class="text-muted mb-6">
                      Generate unique QR codes for each product, enabling instant warranty registration for customers.
                    </p>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div *ngFor="let step of qrSteps" class="text-center p-4 border rounded-lg">
                      <mat-icon class="text-2xl text-primary mb-2">{{ step.icon }}</mat-icon>
                      <h5 class="font-medium mb-1">{{ step.title }}</h5>
                      <p class="text-sm text-muted">{{ step.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- Sample Data Step -->
                <div *ngSwitchCase="3" class="space-y-6">
                  <div class="text-center mb-6">
                    <mat-icon class="text-6xl text-trust-blue mb-4">settings</mat-icon>
                    <h4 class="text-xl font-semibold mb-2">Explore with Sample Data</h4>
                    <p class="text-muted">Add sample data to better understand how the platform works</p>
                  </div>
                  
                  <div class="space-y-4">
                    <div *ngFor="let option of sampleDataOptions | keyvalue" 
                         class="flex items-center gap-3 p-3 border rounded-lg">
                      <mat-checkbox [(ngModel)]="sampleDataPreferences[option.key]">
                      </mat-checkbox>
                      <label class="cursor-pointer flex-1">{{ option.value }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-between pt-6 mt-6 border-t">
              <button mat-stroked-button (click)="handleBack()">
                <mat-icon>arrow_back</mat-icon>
                {{ currentStep === 0 ? 'Back to Plans' : 'Previous' }}
              </button>
              
              <div class="flex items-center gap-4">
                <button *ngIf="currentStep === 0" mat-stroked-button>
                  <mat-icon>play_arrow</mat-icon>
                  Watch Quick Demo
                </button>
                
                <button mat-raised-button color="primary" (click)="handleNext()">
                  {{ currentStep === onboardingSteps.length - 1 ? 'Complete Setup' : 'Next' }}
                  <mat-icon>arrow_forward</mat-icon>
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
export class OnboardingComponent implements OnInit {
  currentStep = 0;
  subdomain = '';
  
  sampleDataPreferences = {
    sampleProducts: false,
    sampleCustomers: false,
    sampleWarranties: false,
    sampleClaims: false
  };

  sampleDataOptions = {
    sampleProducts: 'Sample Products (Electronics, Automotive)',
    sampleCustomers: 'Sample Customer Accounts',
    sampleWarranties: 'Sample Warranty Registrations',
    sampleClaims: 'Sample Warranty Claims'
  };

  onboardingSteps = [
    { title: 'Welcome to eWarranty!', description: 'Let\'s get you familiar with the platform', icon: 'check_circle' },
    { title: 'Multi-Portal System', description: 'Understand your different user portals', icon: 'people' },
    { title: 'QR Code Management', description: 'Learn about QR code generation and tracking', icon: 'qr_code' },
    { title: 'Sample Data Setup', description: 'Add sample data to explore the platform', icon: 'settings' }
  ];

  portals = [
    { title: 'Admin Portal', description: 'Manage brands, users, and system settings' },
    { title: 'Brand Manager', description: 'Oversee distributors and warranty policies' },
    { title: 'Manufacturing', description: 'Generate QR codes and manage batches' },
    { title: 'Customer Portal', description: 'Register warranties and submit claims' }
  ];

  qrSteps = [
    { icon: 'inventory', title: 'Generate', description: 'Create QR codes in batches' },
    { icon: 'smartphone', title: 'Scan', description: 'Customers scan to register' },
    { icon: 'analytics', title: 'Track', description: 'Monitor usage and analytics' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if previous steps are completed
    const companyInfo = localStorage.getItem('companyInfo');
    const accountSetup = localStorage.getItem('accountSetup');
    const brandSetup = localStorage.getItem('brandSetup');
    const selectedPlan = localStorage.getItem('selectedPlan');
    
    if (!companyInfo || !accountSetup || !brandSetup || !selectedPlan) {
      this.router.navigate(['/signup/company-info']);
      return;
    }

    const storedSubdomain = localStorage.getItem('selectedSubdomain');
    if (storedSubdomain) {
      this.subdomain = storedSubdomain;
    }
  }

  get currentStepData() {
    return this.onboardingSteps[this.currentStep];
  }

  handleNext(): void {
    if (this.currentStep < this.onboardingSteps.length - 1) {
      this.currentStep++;
    } else {
      // Save sample data preferences and proceed to dashboard
      localStorage.setItem('sampleDataOptions', JSON.stringify(this.sampleDataPreferences));
      this.router.navigate(['/dashboard']);
    }
  }

  handleBack(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    } else {
      this.router.navigate(['/signup/select-plan']);
    }
  }
}