
import React from 'react';
import { TECH_COMPARISON_BATTERY, TECH_COMPARISON_PUFFS } from '../constants';

export const TechComparison: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Battery Capacity Chart */}
      <div className="bg-dark-card border border-gray-700 rounded-2xl p-6 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Capacidade Energética (mAh)
        </h3>
        
        <div className="flex-1 space-y-6">
          {TECH_COMPARISON_BATTERY.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-gray-300">{item.model}</span>
                <span className="text-gray-500">{item.battery} mAh</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full relative transition-all duration-1000"
                  style={{ width: `${(item.battery / 3500) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-gray-500 italic">
          * Nota: O Airistech Nokiva possui a maior bateria (2200mAh) devido à alta demanda energética para aquecimento de câmara de cerâmica por condução.
        </p>
      </div>

      {/* Puffs Capacity Chart */}
      <div className="bg-dark-card border border-gray-700 rounded-2xl p-6 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Volume de Puffs (Descartáveis)
        </h3>
        
        <div className="flex-1 space-y-6">
          {TECH_COMPARISON_PUFFS.map((item, idx) => (
             <div key={idx} className="relative">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-gray-300">{item.model}</span>
                <span className="text-gray-500">{(item.puffs || 0).toLocaleString()} puffs</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full relative transition-all duration-1000"
                  style={{ width: `${((item.puffs || 0) / 45000) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-gray-500 italic">
          * Ceticismo Técnico: A alegação de 40.000 puffs do Airmez X-Beats com apenas ~22ml sugere métricas de teste não padronizadas.
        </p>
      </div>

       {/* Innovation Card */}
       <div className="lg:col-span-2 bg-dark-card border border-gray-700 rounded-2xl p-6 mt-4">
          <h3 className="text-lg font-bold text-white mb-4">Inovações Disruptivas 2024-2025</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-bg p-4 rounded-xl border border-gray-800">
                  <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                     </svg>
                     Áudio Integrado
                  </h4>
                  <p className="text-xs text-gray-400">
                      <strong className="text-gray-200">Airmez X-Beats:</strong> O dispositivo atua como estojo de carregamento para fones Bluetooth TWS inclusos. Estratégia de retenção pós-uso.
                  </p>
              </div>
              <div className="bg-dark-bg p-4 rounded-xl border border-gray-800">
                  <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                     </svg>
                     Gamificação & Touch
                  </h4>
                  <p className="text-xs text-gray-400">
                      <strong className="text-gray-200">Airmez Matrix:</strong> Tela HD 2.1" com jogos tipo "Slot Machine". Convergência polêmica entre nicotina e jogos de azar.
                  </p>
              </div>
               <div className="bg-dark-bg p-4 rounded-xl border border-gray-800">
                  <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                     </svg>
                     Engenharia Térmica
                  </h4>
                  <p className="text-xs text-gray-400">
                      <strong className="text-gray-200">Airistech Herbva:</strong> Persistência da câmara de cerâmica e controle digital grau-a-grau em dispositivos de baixo custo para botânicos.
                  </p>
              </div>
          </div>
       </div>
    </div>
  );
};
