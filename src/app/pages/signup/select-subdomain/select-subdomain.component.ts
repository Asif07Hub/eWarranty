import { Component } from '@angular/core';
import { SubdomainSelectorComponent } from '../../../components/subdomain-selector/subdomain-selector.component';

@Component({
  selector: 'app-select-subdomain',
  standalone: true,
  imports: [SubdomainSelectorComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center p-4">
      <div class="w-full max-w-lg">
        <app-subdomain-selector></app-subdomain-selector>
      </div>
    </div>
  `
})
export class SelectSubdomainComponent {}