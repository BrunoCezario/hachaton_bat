
import React from 'react';
import { DISCLAIMER_TEXT } from '../constants';

export const Disclaimer: React.FC = () => {
  return (
    <div className="mt-16 border-t border-gray-800 pt-8 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-start gap-4 text-gray-500 text-xs text-justify leading-relaxed">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>{DISCLAIMER_TEXT}</p>
        </div>
        <div className="text-center mt-6 text-gray-700 text-xs">
          &copy; {new Date().getFullYear()} Audita Vape Market IA. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};
