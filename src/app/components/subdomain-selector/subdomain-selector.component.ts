import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subdomain-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="p-6">
      <div class="text-center mb-6">
        <mat-icon class="text-6xl text-primary mb-4">public</mat-icon>
        <h2 class="text-2xl font-bold mb-2">Choose Your Subdomain</h2>
        <p class="text-muted">Get your custom warranty portal instantly</p>
      </div>

      <div class="space-y-4">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Your Company Subdomain</mat-label>
          <input matInput 
                 [(ngModel)]="subdomain" 
                 placeholder="yourcompany"
                 (input)="onSubdomainChange()"
                 [disabled]="isChecking">
          <mat-hint>{{ subdomain }}.ewarranty.pk</mat-hint>
        </mat-form-field>

        <div *ngIf="subdomain" class="text-center">
          <p class="text-sm text-muted">
            Your portal will be: 
            <span class="font-medium text-primary">{{ subdomain }}.ewarranty.pk</span>
          </p>
        </div>

        <button 
          *ngIf="subdomain && !isAvailable" 
          mat-raised-button 
          color="primary" 
          class="w-full"
          (click)="checkAvailability()"
          [disabled]="isChecking">
          <mat-icon *ngIf="isChecking">refresh</mat-icon>
          <mat-icon *ngIf="!isChecking">public</mat-icon>
          {{ isChecking ? 'Checking...' : 'Check Availability' }}
        </button>

        <div *ngIf="isAvailable === true" class="space-y-4">
          <div class="flex items-center justify-center gap-2 text-success">
            <mat-icon>check_circle</mat-icon>
            <span class="font-medium">Available!</span>
          </div>
          <button 
            mat-raised-button 
            color="accent" 
            class="w-full"
            (click)="getStarted()">
            Get Started with {{ subdomain }}.ewarranty.pk
          </button>
        </div>

        <div *ngIf="isAvailable === false" class="space-y-4">
          <div class="text-center text-destructive">
            <span class="font-medium">Not available or invalid</span>
            <p class="text-sm text-muted mt-1">
              Subdomains must be at least 3 characters and cannot be reserved words
            </p>
          </div>
          <div *ngIf="suggestions.length > 0" class="space-y-2">
            <p class="text-sm text-muted text-center">Try these suggestions:</p>
            <div class="flex flex-wrap gap-2 justify-center">
              <button 
                *ngFor="let suggestion of suggestions"
                mat-stroked-button
                color="primary"
                (click)="selectSuggestion(suggestion)">
                {{ suggestion }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SubdomainSelectorComponent {
  subdomain = '';
  isChecking = false;
  isAvailable: boolean | null = null;
  suggestions: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<SubdomainSelectorComponent>,
    private router: Router
  ) {}

  onSubdomainChange(): void {
    this.subdomain = this.subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
    this.isAvailable = null;
    this.suggestions = [];
  }

  async checkAvailability(): Promise<void> {
    if (!this.subdomain.trim()) return;
    
    this.isChecking = true;
    
    // Simulate API call with validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const cleanSubdomain = this.subdomain.trim().toLowerCase();
    
    // Basic validation
    if (cleanSubdomain.length < 3) {
      this.isAvailable = false;
      this.suggestions = [`${cleanSubdomain}corp`, `${cleanSubdomain}company`, `${cleanSubdomain}inc`];
    } else if (['admin', 'api', 'www'].includes(cleanSubdomain)) {
      this.isAvailable = false;
      this.suggestions = [`${cleanSubdomain}corp`, `${cleanSubdomain}company`, `my${cleanSubdomain}`];
    } else {
      this.isAvailable = true;
      this.suggestions = [];
    }
    
    this.isChecking = false;
  }

  selectSuggestion(suggestion: string): void {
    this.subdomain = suggestion;
    this.isAvailable = null;
    this.suggestions = [];
  }

  getStarted(): void {
    if (this.subdomain.trim()) {
      localStorage.setItem('selectedSubdomain', this.subdomain.trim());
      this.dialogRef.close();
      this.router.navigate(['/signup/company-info'], { 
        queryParams: { subdomain: this.subdomain.trim() } 
      });
    }
  }
}