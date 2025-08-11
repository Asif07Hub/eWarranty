import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../types';
import { PageHeaderComponent } from '../../../components/ui/page-header/page-header.component';
import { MetricCardComponent } from '../../../components/ui/metric-card/metric-card.component';

@Component({
  selector: 'app-brand-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    PageHeaderComponent,
    MetricCardComponent
  ],
  template: `
    <div class="space-y-6">
      <app-page-header
        [title]="getPageTitle()"
        description="Monitor your brand's warranty performance and analytics">
      </app-page-header>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <app-metric-card
          *ngFor="let stat of stats"
          [title]="stat.title"
          [value]="stat.value"
          [icon]="stat.icon"
          [iconColor]="stat.iconColor"
          [change]="stat.change">
        </app-metric-card>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <mat-card class="shadow-elegant">
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon class="text-primary">bar_chart</mat-icon>
              Warranty Claims Trend
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="h-64 flex items-center justify-center text-muted">
              Chart Component Placeholder
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="shadow-elegant">
          <mat-card-header>
            <mat-card-title class="flex items-center gap-2">
              <mat-icon class="text-primary">people</mat-icon>
              Distributor Performance
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="h-64 flex items-center justify-center text-muted">
              Chart Component Placeholder
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Recent Activity -->
      <mat-card class="shadow-elegant">
        <mat-card-header>
          <mat-card-title>Recent Activities</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="space-y-4">
            <div *ngFor="let activity of recentActivities" 
                 class="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p class="text-sm font-medium">{{ activity.activity }}</p>
                <p class="text-xs text-muted">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .shadow-elegant {
      box-shadow: var(--shadow-elegant);
    }
  `]
})
export class BrandAdminDashboardComponent {
  activeBrand$: Observable<Brand | null>;

  stats = [
    { title: 'Active Warranties', value: '2,847', change: '+12.5% from last month', icon: 'inventory', iconColor: 'text-primary' },
    { title: 'Claims This Month', value: '23', change: '-8.2% from last month', icon: 'warning', iconColor: 'text-destructive' },
    { title: 'Distributors', value: '45', change: '+2 from last month', icon: 'people', iconColor: 'text-success' },
    { title: 'Revenue', value: '₨12.4M', change: '+18.7% from last month', icon: 'trending_up', iconColor: 'text-info' }
  ];

  recentActivities = [
    { time: '2 hours ago', activity: 'New warranty claim submitted for battery #VT-2024-001' },
    { time: '4 hours ago', activity: 'Distributor ABC Electronics added 50 new batteries to inventory' },
    { time: '6 hours ago', activity: 'Quality inspection completed for batch #BT-2024-15' },
    { time: '1 day ago', activity: 'Claim #CL-2024-089 approved and processed' }
  ];

  constructor(private brandService: BrandService) {
    this.activeBrand$ = this.brandService.activeBrand$;
  }

  getPageTitle(): string {
    const activeBrand = this.brandService.activeBrand;
    return `${activeBrand?.displayName || 'Brand'} Dashboard`;
  }
}