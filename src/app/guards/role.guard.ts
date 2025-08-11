import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../types';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const allowedRoles = route.data['allowedRoles'] as UserRole[];
    
    return this.authService.user$.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        if (allowedRoles && !allowedRoles.includes(user.role)) {
          // Redirect to appropriate dashboard based on user role
          this.redirectToDashboard(user.role);
          return false;
        }

        return true;
      })
    );
  }

  private redirectToDashboard(role: UserRole): void {
    switch (role) {
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
      default:
        this.router.navigate(['/']);
        break;
    }
  }
}