import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between pb-6 border-b">
      <div class="space-y-1">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        <p *ngIf="description" class="text-lg text-muted">{{ description }}</p>
      </div>
      <div *ngIf="hasActionContent" class="flex items-center gap-2">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class PageHeaderComponent {
  @Input() title!: string;
  @Input() description?: string;

  get hasActionContent(): boolean {
    return true; // Angular doesn't have a direct equivalent to React's children check
  }
}