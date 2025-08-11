import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="group relative overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300">
      <!-- Background Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <mat-card-content class="relative p-6">
        <div class="flex items-start justify-between">
          <div class="space-y-2">
            <p class="text-sm font-medium text-muted">{{ title }}</p>
            <div class="space-y-1">
              <p class="text-3xl font-bold">{{ value }}</p>
              <div *ngIf="change" class="flex items-center gap-1">
                <span [class]="getTrendColor()" class="text-sm font-medium">{{ change }}</span>
                <span class="text-xs text-muted">vs last period</span>
              </div>
            </div>
          </div>
          
          <div class="flex-shrink-0">
            <div class="relative">
              <div class="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative p-3 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 group-hover:scale-110 transition-transform duration-300">
                <mat-icon [class]="iconColor">{{ icon }}</mat-icon>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bottom accent line -->
        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </mat-card-content>
    </mat-card>
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
export class MetricCardComponent {
  @Input() title!: string;
  @Input() value!: string | number;
  @Input() icon!: string;
  @Input() iconColor: string = 'text-primary';
  @Input() change?: string;
  @Input() trend: 'up' | 'down' | 'neutral' = 'neutral';

  getTrendColor(): string {
    if (!this.change) return 'text-muted';
    
    if (this.change.startsWith('+')) return 'text-success';
    if (this.change.startsWith('-')) return 'text-destructive';
    return 'text-muted';
  }
}