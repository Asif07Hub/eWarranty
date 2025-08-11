import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TenantService } from '../services/tenant.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private tenantService: TenantService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map(user => {
        if (!user) {
          // Store the attempted URL for redirect after login
          const redirectPath = state.url;
          const currentTenant = this.tenantService.currentTenant;
          const loginPath = currentTenant 
            ? `/login?tenant=${currentTenant.subdomain}&redirect=${encodeURIComponent(redirectPath)}`
            : `/login?redirect=${encodeURIComponent(redirectPath)}`;
          
          this.router.navigate([loginPath]);
          return false;
        }
        return true;
      })
    );
  }
}