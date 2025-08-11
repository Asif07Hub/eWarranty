import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-dashboard-redirect',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-muted">Redirecting to your dashboard...</p>
      </div>
    </div>
  `
})
export class DashboardRedirectComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.pipe(take(1)).subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      // Route users to their appropriate dashboard based on role
      switch (user.role) {
        case 'system-admin':
          this.router.navigate(['/platform/dashboard']);
          break;
        case 'brand-admin':
          this.router.navigate(['/brandadmin/dashboard']);
          break;
        case 'manufacturing-plant':
          this.router.navigate(['/manufacturing/dashboard']);
          break;
        case 'plant-warehouse':
          this.router.navigate(['/warehouse/dashboard']);
          break;
        case 'brand-distributor':
          this.router.navigate(['/distributor/dashboard']);
          break;
        case 'brand-retailer':
          this.router.navigate(['/retailer/dashboard']);
          break;
        case 'customer':
          this.router.navigate(['/']);
          break;
        default:
          this.router.navigate(['/']);
          break;
      }
    });
  }
}