import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { BrandService } from '../../services/brand.service';
import { AuthService } from '../../services/auth.service';
import { Brand, User } from '../../types';

@Component({
  selector: 'app-brand-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div *ngIf="availableBrands.length > 1">
      <button mat-button [matMenuTriggerFor]="brandMenu" class="flex items-center gap-2">
        <div *ngIf="activeBrand$ | async as brand" class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full" [style.background-color]="brand.color"></div>
          <span class="font-medium">{{ brand.displayName }}</span>
        </div>
        <mat-icon>expand_more</mat-icon>
      </button>
      
      <mat-menu #brandMenu="matMenu" class="w-64">
        <div class="p-2">
          <p class="text-sm text-muted mb-2">Switch Brand</p>
          
          <button 
            *ngFor="let brand of availableBrands" 
            mat-menu-item 
            (click)="selectBrand(brand)"
            class="flex items-center justify-between w-full p-3">
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-full" [style.background-color]="brand.color"></div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ brand.displayName }}</span>
                  <mat-chip *ngIf="brand.id === '1'" color="primary" class="text-xs">
                    <mat-icon class="text-xs">star</mat-icon>
                    Primary
                  </mat-chip>
                </div>
                <span class="text-sm text-muted">@{{ brand.name }}</span>
              </div>
            </div>
            
            <mat-icon *ngIf="(activeBrand$ | async)?.id === brand.id" class="text-primary">
              check
            </mat-icon>
          </button>
        </div>
        
        <mat-divider></mat-divider>
        
        <button mat-menu-item routerLink="/platform/brands">
          <mat-icon>settings</mat-icon>
          <span>Manage Brands</span>
        </button>
      </mat-menu>
    </div>
  `
})
export class BrandSelectorComponent implements OnInit {
  user$: Observable<User | null>;
  brands$: Observable<Brand[]>;
  activeBrand$: Observable<Brand | null>;
  availableBrands: Brand[] = [];

  constructor(
    private brandService: BrandService,
    private authService: AuthService
  ) {
    this.user$ = this.authService.user$;
    this.brands$ = this.brandService.brands$;
    this.activeBrand$ = this.brandService.activeBrand$;
  }

  ngOnInit(): void {
    this.brands$.subscribe(brands => {
      this.user$.subscribe(user => {
        this.availableBrands = this.getAvailableBrands(brands, user);
      });
    });
  }

  private getAvailableBrands(brands: Brand[], user: User | null): Brand[] {
    if (!user) return [];
    
    // System admins and company admins can see all brands
    if (user.role === 'system-admin' || user.role === 'brand-admin') {
      return brands;
    }
    
    // Brand-specific users only see their assigned brand
    if (user.brandId) {
      return brands.filter(brand => brand.id === user.brandId);
    }
    
    return brands;
  }

  selectBrand(brand: Brand): void {
    this.brandService.setActiveBrand(brand);
  }
}