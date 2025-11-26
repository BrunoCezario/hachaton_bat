import React from 'react';
import { Brand, ProductCategory } from '../types';

interface BrandListProps {
  brands: Brand[];
  onSelectBrand: (brandName: string) => void;
}

export const BrandList: React.FC<BrandListProps> = ({ brands, onSelectBrand }) => {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Alvos Frequentes de Investigação
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => onSelectBrand(brand.name)}
            className="group relative overflow-hidden bg-dark-surface hover:bg-dark-card border border-gray-700 hover:border-red-500/50 rounded-xl p-4 transition-all duration-300 text-left"
          >
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">
              {brand.category}
            </span>
            <span className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
              {brand.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};