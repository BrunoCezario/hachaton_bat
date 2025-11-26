
import React, { useState } from 'react';
import { BRAND_ANALYSIS } from '../constants';

export const BrandAnalysis: React.FC = () => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>(BRAND_ANALYSIS[0].id);
  const selectedBrand = BRAND_ANALYSIS.find(b => b.id === selectedBrandId) || BRAND_ANALYSIS[0];

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full overflow-hidden">
      {/* Brand Selector */}
      <div className="w-full md:w-64 space-y-3 shrink-0 overflow-y-auto pr-2 custom-scrollbar">
        {BRAND_ANALYSIS.map((brand) => (
          <button
            key={brand.id}
            onClick={() => setSelectedBrandId(brand.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedBrandId === brand.id
                ? 'bg-dark-card border-green-500 shadow-lg shadow-green-900/10'
                : 'bg-dark-surface border-gray-700 hover:border-gray-500 opacity-70 hover:opacity-100'
            }`}
          >
            <h4 className={`font-bold ${selectedBrandId === brand.id ? 'text-white' : 'text-gray-300'}`}>
              {brand.name}
            </h4>
            <p className="text-xs text-gray-400 mt-1 truncate">{brand.description}</p>
          </button>
        ))}
      </div>

      {/* Brand Detail Card */}
      <div className="flex-1 bg-dark-card border border-gray-700 rounded-2xl p-6 md:p-8 overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-start mb-6 border-b border-gray-700 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{selectedBrand.name}</h2>
            <p className="text-green-400 text-sm font-medium">{selectedBrand.description}</p>
          </div>
          <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600">
            Flagship: {selectedBrand.flagship}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedBrand.products.map((product, idx) => (
            <div key={idx} className="bg-dark-bg border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-green-500">›</span> {product.name}
              </h3>
              
              <ul className="space-y-3 mb-4">
                {product.specs.map((spec, sIdx) => (
                  <li key={sIdx} className="text-sm text-gray-400 flex items-start gap-2">
                     <span className="mt-1.5 w-1 h-1 bg-gray-500 rounded-full shrink-0"></span>
                     {spec}
                  </li>
                ))}
              </ul>

              {product.note && (
                <div className="mt-auto bg-yellow-900/10 border border-yellow-700/30 p-3 rounded-lg">
                  <p className="text-xs text-yellow-500">
                    <span className="font-bold block mb-1">Obs:</span>
                    {product.note}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
