import React from 'react';
import { SubdomainSelector } from '@/components/SubdomainSelector';

export const SelectSubdomain: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <SubdomainSelector />
      </div>
    </div>
  );
};