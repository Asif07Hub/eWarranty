import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Brand } from '../types';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private brandsSubject = new BehaviorSubject<Brand[]>([]);
  private activeBrandSubject = new BehaviorSubject<Brand | null>(null);

  public brands$ = this.brandsSubject.asObservable();
  public activeBrand$ = this.activeBrandSubject.asObservable();

  constructor() {
    this.initializeBrands();
  }

  private initializeBrands(): void {
    // Check if there's brand setup data from onboarding
    const brandSetup = localStorage.getItem('brandSetup');
    let brands: Brand[] = [];

    if (brandSetup) {
      try {
        const setupBrands = JSON.parse(brandSetup);
        brands = setupBrands.map((brand: any, index: number) => ({
          id: brand.id || (index + 1).toString(),
          name: brand.name,
          displayName: brand.displayName,
          color: brand.color,
          logo: brand.logo,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }));
      } catch (e) {
        console.error('Error parsing brand setup:', e);
      }
    }
    
    // Fallback to demo brands
    if (brands.length === 0) {
      brands = [
        {
          id: '1',
          name: 'volta',
          displayName: 'Volta Batteries',
          color: '#00C853',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          name: 'osaka',
          displayName: 'Osaka Auto',
          color: '#DC2626',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '3',
          name: 'saga',
          displayName: 'Saga Batteries',
          color: '#059669',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '4',
          name: 'fujika',
          displayName: 'Fujika Power',
          color: '#7C3AED',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
    }

    this.brandsSubject.next(brands);
    // Set the first brand as active by default
    if (brands.length > 0) {
      this.activeBrandSubject.next(brands[0]);
    }
  }

  setActiveBrand(brand: Brand | null): void {
    this.activeBrandSubject.next(brand);
  }

  addBrand(brandData: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newBrand: Brand = {
      ...brandData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const currentBrands = this.brandsSubject.value;
    const updatedBrands = [...currentBrands, newBrand];
    this.brandsSubject.next(updatedBrands);
    this.updateLocalStorage(updatedBrands);
  }

  updateBrand(id: string, updates: Partial<Brand>): void {
    const currentBrands = this.brandsSubject.value;
    const updatedBrands = currentBrands.map(brand => 
      brand.id === id 
        ? { ...brand, ...updates, updatedAt: new Date() }
        : brand
    );
    
    this.brandsSubject.next(updatedBrands);
    
    // Update active brand if it was modified
    const activeBrand = this.activeBrandSubject.value;
    if (activeBrand?.id === id) {
      this.activeBrandSubject.next({ ...activeBrand, ...updates, updatedAt: new Date() });
    }
    
    this.updateLocalStorage(updatedBrands);
  }

  deleteBrand(id: string): void {
    const currentBrands = this.brandsSubject.value;
    const updatedBrands = currentBrands.filter(brand => brand.id !== id);
    this.brandsSubject.next(updatedBrands);
    
    const activeBrand = this.activeBrandSubject.value;
    if (activeBrand?.id === id) {
      // Set first remaining brand as active, or null if no brands left
      this.activeBrandSubject.next(updatedBrands.length > 0 ? updatedBrands[0] : null);
    }
    
    this.updateLocalStorage(updatedBrands);
  }

  getBrandById(id: string): Brand | undefined {
    return this.brandsSubject.value.find(brand => brand.id === id);
  }

  get brands(): Brand[] {
    return this.brandsSubject.value;
  }

  get activeBrand(): Brand | null {
    return this.activeBrandSubject.value;
  }

  private updateLocalStorage(brands: Brand[]): void {
    const brandSetup = brands.map(brand => ({
      id: brand.id,
      name: brand.name,
      displayName: brand.displayName,
      color: brand.color,
      logo: brand.logo,
      isPrimary: brand.id === this.activeBrandSubject.value?.id
    }));
    localStorage.setItem('brandSetup', JSON.stringify(brandSetup));
  }
}