import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-select-plan',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule
  ],
  template: `
    <div class="min-h-screen bg-page-background p-4">
      <div class="max-w-6xl mx-auto">
        <!-- Progress -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-3xl font-bold">Create Your Account</h1>
            <span class="text-muted">Step 4 of 5</span>
          </div>
          <mat-progress-bar mode="determinate" [value]="80"></mat-progress-bar>
        </div>

        <!-- Subdomain Display -->
        <div class="text-center mb-8">
          <h2 class="text-2xl font-semibold mb-2">Choose Your Plan</h2>
          <p class="text-muted">
            Setting up: <span class="font-medium text-trust-blue">{{ subdomain }}.ewarranty.pk</span>
          </p>
        </div>

        <!-- Plans Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <mat-card *ngFor="let plan of plans" 
                    class="cursor-pointer transition-all hover:shadow-glow"
                    [class.ring-2]="selectedPlan === plan.id"
                    [class.ring-primary]="selectedPlan === plan.id"
                    [class.border-primary]="plan.popular"
                    (click)="selectPlan(plan.id)">
            
            <mat-chip *ngIf="plan.popular" 
                      color="primary" 
                      class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              Most Popular
            </mat-chip>
            
            <mat-card-header class="text-center">
              <div [class]="'w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ' + plan.color">
                <mat-icon class="text-white text-2xl">{{ plan.icon }}</mat-icon>
              </div>
              
              <mat-card-title>{{ plan.name }}</mat-card-title>
              
              <div class="text-center">
                <span class="text-2xl font-bold">{{ plan.price }}</span>
                <span class="text-muted">{{ plan.period }}</span>
              </div>
              
              <mat-card-subtitle>{{ plan.description }}</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content class="space-y-4">
              <div class="space-y-3">
                <div *ngFor="let feature of plan.features" class="flex items-center gap-3">
                  <mat-icon class="text-success text-sm">check_circle</mat-icon>
                  <span class="text-sm">{{ feature }}</span>
                </div>
              </div>

              <div *ngIf="plan.limitations.length > 0" class="pt-4 border-t">
                <p class="text-sm text-muted mb-2">Limitations:</p>
                <div class="space-y-2">
                  <div *ngFor="let limitation of plan.limitations" class="flex items-center gap-3">
                    <div class="w-5 h-5 rounded-full border flex items-center justify-center">
                      <div class="w-2 h-2 bg-muted rounded-full"></div>
                    </div>
                    <span class="text-sm text-muted">{{ limitation }}</span>
                  </div>
                </div>
              </div>

              <button mat-raised-button 
                      [color]="selectedPlan === plan.id ? 'primary' : 'accent'"
                      class="w-full mt-6">
                {{ selectedPlan === plan.id ? 'Selected' : 'Select Plan' }}
              </button>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between">
          <button mat-stroked-button (click)="handleBack()">
            <mat-icon>arrow_back</mat-icon>
            Back
          </button>
          <button mat-raised-button 
                  color="primary" 
                  (click)="handleNext()"
                  [disabled]="!selectedPlan">
            Continue to Onboarding
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
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
export class SelectPlanComponent implements OnInit {
  selectedPlan = '';
  subdomain = '';

  plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Free',
      period: '14-day trial',
      description: 'Perfect for small businesses getting started',
      icon: 'star',
      color: 'bg-trust-blue',
      features: [
        'Up to 1,000 warranties',
        'Basic QR code generation',
        'Customer portal',
        'Email support',
        'Basic analytics',
        '1 admin user'
      ],
      limitations: [
        'Limited to 1 brand',
        'No custom branding',
        'Basic reporting only'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 'PKR 15,000',
      period: '/month',
      description: 'Most popular for growing businesses',
      icon: 'flash_on',
      color: 'bg-primary',
      popular: true,
      features: [
        'Up to 10,000 warranties',
        'Advanced QR management',
        'Multi-portal system',
        'Priority support',
        'Advanced analytics',
        '5 admin users',
        'Custom branding',
        'API access',
        'Distributor management'
      ],
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations with complex needs',
      icon: 'workspace_premium',
      color: 'bg-energy-yellow',
      features: [
        'Unlimited warranties',
        'Full platform access',
        'White-label solution',
        'Dedicated support',
        'Custom integrations',
        'Unlimited users',
        'Advanced security',
        'Custom features',
        'SLA guarantee'
      ],
      limitations: []
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if previous steps are completed
    const companyInfo = localStorage.getItem('companyInfo');
    const accountSetup = localStorage.getItem('accountSetup');
    const brandSetup = localStorage.getItem('brandSetup');
    
    if (!companyInfo || !accountSetup || !brandSetup) {
      this.router.navigate(['/signup/company-info']);
      return;
    }

    // Get subdomain
    const storedSubdomain = localStorage.getItem('selectedSubdomain');
    if (storedSubdomain) {
      this.subdomain = storedSubdomain;
    }

    // Load saved plan selection
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan) {
      this.selectedPlan = savedPlan;
    }
  }

  selectPlan(planId: string): void {
    this.selectedPlan = planId;
    localStorage.setItem('selectedPlan', planId);
  }

  handleNext(): void {
    if (this.selectedPlan) {
      this.router.navigate(['/signup/onboarding']);
    }
  }

  handleBack(): void {
    this.router.navigate(['/signup/brand-setup']);
  }
}