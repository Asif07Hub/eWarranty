
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Brand } from '@/types';

interface BrandContextType {
  brands: Brand[];
  activeBrand: Brand | null;
  setActiveBrand: (brand: Brand | null) => void;
  addBrand: (brand: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBrand: (id: string, updates: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  getBrandById: (id: string) => Brand | undefined;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const useBrands = () => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrands must be used within a BrandProvider');
  }
  return context;
};

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize brands from localStorage or demo data
  const initializeBrands = (): Brand[] => {
    // Check if there's brand setup data from onboarding
    const brandSetup = localStorage.getItem('brandSetup');
    if (brandSetup) {
      try {
        const setupBrands = JSON.parse(brandSetup);
        return setupBrands.map((brand: any, index: number) => ({
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
    
    // Fallback to demo brands for different customer scenarios
    return [
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
  };

  const [brands, setBrands] = useState<Brand[]>(initializeBrands());
  
  const [activeBrand, setActiveBrand] = useState<Brand | null>(() => {
    // Set the first brand as active by default
    const initialBrands = initializeBrands();
    return initialBrands.length > 0 ? initialBrands[0] : null;
  });

  const addBrand = (brandData: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBrand: Brand = {
      ...brandData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const updatedBrands = [...brands, newBrand];
    setBrands(updatedBrands);
    
    // Update localStorage
    const brandSetup = updatedBrands.map(brand => ({
      id: brand.id,
      name: brand.name,
      displayName: brand.displayName,
      color: brand.color,
      logo: brand.logo,
      isPrimary: brand.id === activeBrand?.id
    }));
    localStorage.setItem('brandSetup', JSON.stringify(brandSetup));
  };

  const updateBrand = (id: string, updates: Partial<Brand>) => {
    const updatedBrands = brands.map(brand => 
      brand.id === id 
        ? { ...brand, ...updates, updatedAt: new Date() }
        : brand
    );
    setBrands(updatedBrands);
    
    // Update active brand if it was modified
    if (activeBrand?.id === id) {
      setActiveBrand(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
    
    // Update localStorage
    const brandSetup = updatedBrands.map(brand => ({
      id: brand.id,
      name: brand.name,
      displayName: brand.displayName,
      color: brand.color,
      logo: brand.logo,
      isPrimary: brand.id === activeBrand?.id
    }));
    localStorage.setItem('brandSetup', JSON.stringify(brandSetup));
  };

  const deleteBrand = (id: string) => {
    const updatedBrands = brands.filter(brand => brand.id !== id);
    setBrands(updatedBrands);
    
    if (activeBrand?.id === id) {
      // Set first remaining brand as active, or null if no brands left
      setActiveBrand(updatedBrands.length > 0 ? updatedBrands[0] : null);
    }
    
    // Update localStorage
    const brandSetup = updatedBrands.map(brand => ({
      id: brand.id,
      name: brand.name,
      displayName: brand.displayName,
      color: brand.color,
      logo: brand.logo,
      isPrimary: brand.id === (activeBrand?.id === id ? updatedBrands[0]?.id : activeBrand?.id)
    }));
    localStorage.setItem('brandSetup', JSON.stringify(brandSetup));
  };

  const getBrandById = (id: string) => {
    return brands.find(brand => brand.id === id);
  };

  return (
    <BrandContext.Provider value={{
      brands,
      activeBrand,
      setActiveBrand,
      addBrand,
      updateBrand,
      deleteBrand,
      getBrandById
    }}>
      {children}
    </BrandContext.Provider>
  );
};
