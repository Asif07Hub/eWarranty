import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { SubdomainSelectorComponent } from '../../components/subdomain-selector/subdomain-selector.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <!-- Header -->
      <header class="relative z-50 border-b bg-card/80 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <mat-icon class="text-white">flash_on</mat-icon>
              </div>
              <h1 class="text-xl font-bold">eWarranty Platform</h1>
            </div>
            
            <nav class="hidden md:flex items-center gap-6">
              <a href="#features" class="text-muted hover:text-foreground transition-colors">Features</a>
              <a href="#benefits" class="text-muted hover:text-foreground transition-colors">Benefits</a>
              <a href="#industries" class="text-muted hover:text-foreground transition-colors">Industries</a>
              <button mat-button routerLink="/login">Sign In</button>
              <button mat-raised-button color="primary" (click)="openSubdomainSelector()">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-trust-blue/10 rounded-full blur-3xl"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div class="text-center space-y-8">
            <mat-chip-set>
              <mat-chip color="primary">
                <mat-icon>star</mat-icon>
                Trusted by Leading Manufacturers Worldwide
              </mat-chip>
            </mat-chip-set>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              The Future of
              <span class="block bg-gradient-primary bg-clip-text text-transparent">
                Product Warranty
              </span>
              Management
            </h1>
            
            <p class="max-w-3xl mx-auto text-lg text-muted leading-relaxed">
              Secure, traceable, and automated warranty solutions for modern manufacturing. 
              From QR code generation to claim processing, manage your entire warranty ecosystem 
              across all industries with enterprise-grade security and real-time analytics.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button mat-raised-button color="primary" size="large" (click)="openSubdomainSelector()" class="shadow-glow">
                Start Your Free Trial
                <mat-icon>arrow_forward</mat-icon>
              </button>
              <button mat-stroked-button size="large" routerLink="/login">
                <mat-icon>public</mat-icon>
                View Demo
              </button>
            </div>
            
            <!-- Stats -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              <div *ngFor="let stat of stats" class="text-center">
                <div class="text-2xl lg:text-3xl font-bold">{{ stat.value }}</div>
                <div class="text-sm text-muted mt-1">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Industries Section -->
      <section id="industries" class="py-24 bg-section-background">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-semibold mb-4">Trusted Across Industries</h2>
            <p class="text-lg text-muted max-w-2xl mx-auto">
              From automotive to electronics, our platform adapts to your industry's 
              specific warranty requirements and compliance standards.
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <mat-card *ngFor="let industry of industries" class="text-center hover:shadow-glow transition-all">
              <mat-card-content class="p-6">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-card mb-4">
                  <mat-icon class="text-primary">{{ industry.icon }}</mat-icon>
                </div>
                <h3 class="text-lg font-semibold mb-2">{{ industry.name }}</h3>
                <p class="text-sm text-muted">{{ industry.description }}</p>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-semibold mb-4">Powerful Features Built for Scale</h2>
            <p class="text-lg text-muted max-w-2xl mx-auto">
              Everything you need to manage warranties across your entire supply chain, 
              from manufacturing to end-customer.
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <mat-card *ngFor="let feature of features" class="text-center hover:shadow-glow transition-all">
              <mat-card-content class="p-6">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-card mb-4">
                  <mat-icon [class]="feature.color">{{ feature.icon }}</mat-icon>
                </div>
                <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
                <p class="text-sm text-muted">{{ feature.description }}</p>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t bg-card/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center text-sm text-muted">
            <p>&copy; 2024 eWarranty Platform. Built for the future of warranty management.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .bg-gradient-primary {
      background: var(--gradient-primary);
    }
    
    .bg-gradient-hero {
      background: var(--gradient-hero);
    }
    
    .bg-gradient-card {
      background: var(--gradient-card);
    }
    
    .shadow-glow {
      box-shadow: var(--shadow-glow);
    }
  `]
})
export class IndexComponent {
  stats = [
    { value: '1M+', label: 'Products Tracked' },
    { value: '99.9%', label: 'Uptime' },
    { value: '30s', label: 'Avg. Claim Time' },
    { value: '24/7', label: 'Support' }
  ];

  industries = [
    { icon: 'directions_car', name: 'Automotive', description: 'Parts & Components' },
    { icon: 'laptop', name: 'Electronics', description: 'Consumer Devices' },
    { icon: 'home', name: 'Appliances', description: 'Home & Kitchen' },
    { icon: 'factory', name: 'Industrial', description: 'Equipment & Machinery' }
  ];

  features = [
    {
      icon: 'security',
      title: 'Warranty Protection',
      description: 'Comprehensive warranty management with instant claim processing and verification across all industries.',
      color: 'text-primary'
    },
    {
      icon: 'qr_code',
      title: 'Product Traceability',
      description: 'Track every product from manufacturing to end-user with secure QR codes and digital certificates.',
      color: 'text-trust-blue'
    },
    {
      icon: 'analytics',
      title: 'Advanced Analytics',
      description: 'Real-time insights into warranty claims, performance metrics, and industry trends.',
      color: 'text-energy-yellow'
    },
    {
      icon: 'people',
      title: 'Multi-Tenant Platform',
      description: 'Separate, secure environments for different brands and organizations across industries.',
      color: 'text-success'
    }
  ];

  constructor(private dialog: MatDialog) {}

  openSubdomainSelector(): void {
    this.dialog.open(SubdomainSelectorComponent, {
      width: '500px',
      disableClose: false
    });
  }
}