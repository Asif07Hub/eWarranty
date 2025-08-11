import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-check-status',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
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

      <div class="max-w-md mx-auto space-y-6">
        <!-- Search Section -->
        <mat-card class="shadow-elegant">
          <mat-card-header class="text-center">
            <mat-card-title>Check Claim Status</mat-card-title>
            <mat-card-subtitle>Enter your claim ID or registration ID to check status</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content class="space-y-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Claim ID or Registration ID</mat-label>
              <input matInput 
                     [(ngModel)]="searchTerm"
                     placeholder="e.g., CLM-1705312345 or REG-1705123456"
                     (keyup.enter)="handleSearch()">
            </mat-form-field>
            
            <button mat-raised-button 
                    color="primary"
                    (click)="handleSearch()"
                    [disabled]="!searchTerm.trim() || isSearching"
                    class="w-full">
              <mat-spinner *ngIf="isSearching" diameter="16" class="mr-2"></mat-spinner>
              <mat-icon *ngIf="!isSearching">search</mat-icon>
              {{ isSearching ? 'Searching...' : 'Check Status' }}
            </button>
          </mat-card-content>
        </mat-card>

        <!-- Results Section -->
        <div *ngIf="claimData" class="space-y-6">
          <!-- Battery Info -->
          <mat-card class="shadow-elegant">
            <mat-card-header>
              <div [class]="'p-4 rounded-lg text-white ' + getBrandGradient(claimData.batteryInfo.brand)">
                <div class="text-center">
                  <p class="font-bold text-lg">{{ claimData.batteryInfo.brand }}</p>
                  <p class="text-sm opacity-90">{{ claimData.batteryInfo.model }}</p>
                  <p class="text-xs opacity-75">Serial: {{ claimData.batteryInfo.serialNumber }}</p>
                </div>
              </div>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-muted">Claim ID:</span>
                  <span class="font-medium">{{ claimData.claimId }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-muted">Status:</span>
                  <mat-chip [color]="getStatusColor(claimData.status)">{{ claimData.status }}</mat-chip>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-muted">Submitted:</span>
                  <span class="font-medium">{{ claimData.submissionDate }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-muted">Est. Resolution:</span>
                  <span class="font-medium">{{ claimData.estimatedResolution }}</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Issue Details -->
          <mat-card class="shadow-elegant">
            <mat-card-header>
              <mat-card-title>Issue Details</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-3">
                <div>
                  <span class="text-sm text-muted">Issue Type:</span>
                  <p class="font-medium">{{ claimData.issueType }}</p>
                </div>
                <div>
                  <span class="text-sm text-muted">Description:</span>
                  <p class="text-sm">{{ claimData.description }}</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Timeline -->
          <mat-card class="shadow-elegant">
            <mat-card-header>
              <mat-card-title>Progress Timeline</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-4">
                <div *ngFor="let item of claimData.timeline" class="flex items-start gap-3">
                  <div [class]="getTimelineIconClass(item.completed)">
                    <mat-icon *ngIf="item.completed; else pendingIcon">check_circle</mat-icon>
                    <ng-template #pendingIcon>
                      <div class="w-2 h-2 bg-current rounded-full"></div>
                    </ng-template>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                      <p [class]="item.completed ? 'font-medium' : 'font-medium text-muted'">{{ item.status }}</p>
                      <span class="text-xs text-muted">{{ item.date }}</span>
                    </div>
                    <p class="text-sm text-muted">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Contact Support -->
          <mat-card class="shadow-elegant">
            <mat-card-content class="p-6">
              <div class="text-center space-y-4">
                <div>
                  <h3 class="font-semibold mb-2">Need Help?</h3>
                  <p class="text-sm text-muted">Contact our support team for any questions about your claim.</p>
                </div>
                
                <div class="space-y-2">
                  <button mat-stroked-button class="w-full">Call Support: +92-XXX-XXXXXX</button>
                  <button mat-stroked-button class="w-full">WhatsApp: +92-XXX-XXXXXX</button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- No Results -->
        <mat-card *ngIf="searchTerm && !claimData && !isSearching" class="shadow-elegant">
          <mat-card-content class="p-8 text-center">
            <mat-icon class="text-6xl text-warning mb-4">warning</mat-icon>
            <h3 class="font-semibold mb-2">No Results Found</h3>
            <p class="text-sm text-muted mb-4">
              We couldn't find any claims with ID "{{ searchTerm }}". Please check your ID and try again.
            </p>
            <button mat-stroked-button (click)="searchTerm = ''" class="w-full">Try Again</button>
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
export class CheckStatusComponent {
  searchTerm = '';
  claimData: any = null;
  isSearching = false;

  constructor(private router: Router) {}

  async handleSearch(): Promise<void> {
    if (!this.searchTerm.trim()) return;
    
    this.isSearching = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    this.claimData = {
      claimId: this.searchTerm,
      batteryInfo: {
        serialNumber: 'VT24150089',
        brand: 'Volta',
        model: 'AGM 70Ah',
        registrationId: 'REG-1705123456'
      },
      issueType: 'Battery not charging',
      description: 'Battery stops charging after 2 hours and shows error light',
      submissionDate: '2024-01-16',
      status: 'Under Review',
      estimatedResolution: '2024-01-19',
      timeline: [
        { date: '2024-01-16', status: 'Claim Submitted', description: 'Your warranty claim has been received', completed: true },
        { date: '2024-01-17', status: 'Under Review', description: 'Technical team is reviewing your claim', completed: true },
        { date: '2024-01-18', status: 'Inspection Scheduled', description: 'Field inspection scheduled', completed: false },
        { date: '2024-01-19', status: 'Resolution', description: 'Claim resolution and action', completed: false }
      ]
    };
    
    this.isSearching = false;
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

  getStatusColor(status: string): string {
    switch (status) {
      case 'Under Review': return 'accent';
      case 'Approved': return 'primary';
      case 'Rejected': return 'warn';
      default: return 'primary';
    }
  }

  getTimelineIconClass(completed: boolean): string {
    return completed 
      ? 'w-6 h-6 rounded-full flex items-center justify-center bg-success text-white'
      : 'w-6 h-6 rounded-full flex items-center justify-center bg-muted text-muted';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}