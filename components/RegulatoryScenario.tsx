
import React from 'react';

export const RegulatoryScenario: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Legal Status Banner */}
      <div className="bg-gradient-to-r from-red-900/50 to-pink-900/20 border-l-4 border-red-500 p-6 rounded-r-xl shadow-lg shadow-red-900/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Status Legal: PROIBIÇÃO TOTAL
        </h2>
        <p className="text-gray-300 text-sm">
          A ANVISA mantém a proibição de importação, comercialização e propaganda. Em 2024-2025, a fiscalização intensificou-se, incluindo apreensões em aeroportos (transporte pessoal) e denúncias descentralizadas.
        </p>
      </div>

      {/* --- GEOGRAPHIC MAP (TACTICAL) --- */}
      <div className="bg-dark-card border border-gray-700 rounded-xl p-6 relative overflow-hidden group">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Geopolítica do Contrabando (Mapa Tático)
              </h4>
              
              {/* Legends */}
              <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 bg-dark-bg/80 backdrop-blur-sm p-2 rounded-lg border border-gray-700 shadow-lg">
                <span className="flex items-center gap-1.5 font-bold"><span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>Terrestre (PY)</span>
                <span className="flex items-center gap-1.5 font-bold"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>Fluvial (Norte)</span>
                <span className="flex items-center gap-1.5 font-bold"><span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>Aéreo (CN)</span>
                <span className="flex items-center gap-1.5 font-bold"><span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>Marítimo</span>
              </div>
          </div>
          
          <div className="relative w-full aspect-[16/9] bg-[#0f172a] rounded-lg border border-gray-800 overflow-hidden shadow-2xl">
              {/* Grid Background */}
              <div className="absolute inset-0" style={{ 
                  backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
                  backgroundSize: '40px 40px', 
                  opacity: 0.3
              }}></div>
              
              <svg viewBox="0 0 800 500" className="w-full h-full filter drop-shadow-xl relative z-10">
                 <defs>
                   <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                     <feGaussianBlur stdDeviation="3" result="blur" />
                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
                   </filter>
                   <marker id="arrow-orange" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                     <path d="M0,0 L0,6 L6,3 z" fill="#f97316" />
                   </marker>
                   <marker id="arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                     <path d="M0,0 L0,6 L6,3 z" fill="#ef4444" />
                   </marker>
                   <marker id="arrow-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                     <path d="M0,0 L0,6 L6,3 z" fill="#3b82f6" />
                   </marker>
                   <marker id="arrow-yellow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                     <path d="M0,0 L0,6 L6,3 z" fill="#facc15" />
                   </marker>
                 </defs>

                 {/* Stylized Brazil Map - More detailed polygon */}
                 <path 
                    d="M 280,180 Q 350,100 450,120 L 550,150 L 620,180 L 580,350 L 520,420 L 450,460 L 380,410 L 330,360 L 250,320 L 220,250 L 280,180 Z" 
                    fill="#1e293b" 
                    stroke="#475569" 
                    strokeWidth="1"
                    className="hover:fill-slate-800 transition-colors duration-500"
                 />
                 
                 {/* Internal Hubs Markings with Labels */}
                 
                 {/* SP Region */}
                 <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <circle cx="510" cy="380" r="3" fill="#fff" className="animate-pulse" filter="url(#glow)" />
                    <text x="520" y="385" fill="white" fontSize="10" fontWeight="bold" className="font-sans" filter="url(#glow)">SP/Santos</text>
                 </g>

                 {/* Foz Region */}
                 <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <circle cx="360" cy="360" r="3" fill="#f97316" className="animate-pulse" filter="url(#glow)" />
                    <text x="280" y="365" fill="#f97316" fontSize="10" fontWeight="bold" className="font-sans">Foz do Iguaçu</text>
                 </g>

                 {/* North Region */}
                 <g className="cursor-pointer hover:opacity-80 transition-opacity">
                    <circle cx="480" cy="150" r="3" fill="#ef4444" className="animate-pulse" filter="url(#glow)" />
                    <text x="495" y="155" fill="#ef4444" fontSize="10" fontWeight="bold" className="font-sans">Portos Norte</text>
                 </g>

                 {/* --- ROUTES --- */}

                 {/* Cone Sul (Paraguay -> Foz) */}
                 <path 
                    d="M 240,360 L 350,360" 
                    fill="none" 
                    stroke="#f97316" 
                    strokeWidth="2" 
                    markerEnd="url(#arrow-orange)"
                    strokeDasharray="4,2"
                    className="opacity-70"
                 >
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                 </path>
                 <rect x="200" y="350" width="50" height="16" rx="2" fill="#0f172a" stroke="#f97316" strokeWidth="0.5" />
                 <text x="225" y="361" textAnchor="middle" fill="#f97316" fontSize="8" fontWeight="bold">PY</text>

                 {/* Arco Norte (Suriname -> North Brazil) */}
                 <path 
                    d="M 420,50 Q 450,90 475,140" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    markerEnd="url(#arrow-red)"
                    className="opacity-70"
                 >
                    <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2.5s" repeatCount="indefinite" />
                 </path>
                 <rect x="390" y="35" width="60" height="16" rx="2" fill="#0f172a" stroke="#ef4444" strokeWidth="0.5" />
                 <text x="420" y="46" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">SURINAME</text>

                 {/* Aerial (China -> SP) */}
                 <path 
                    d="M 700,60 Q 650,200 515,370" 
                    fill="none" 
                    stroke="#facc15" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                    markerEnd="url(#arrow-yellow)"
                    className="opacity-70"
                 >
                    <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" />
                 </path>
                 <rect x="680" y="45" width="50" height="16" rx="2" fill="#0f172a" stroke="#facc15" strokeWidth="0.5" />
                 <text x="705" y="56" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">CHINA</text>

                 {/* Maritime (Asia -> Santos) */}
                 <path 
                    d="M 750,420 Q 650,450 520,390" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                    markerEnd="url(#arrow-blue)"
                    className="opacity-70"
                 >
                    <animate attributeName="stroke-dashoffset" from="300" to="0" dur="4s" repeatCount="indefinite" />
                 </path>
                 <rect x="730" y="410" width="50" height="16" rx="2" fill="#0f172a" stroke="#3b82f6" strokeWidth="0.5" />
                 <text x="755" y="421" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="bold">ÁSIA</text>

              </svg>
          </div>
      </div>

      {/* --- MATRIZ LOGÍSTICA --- */}
      <div className="space-y-4">
        <div className="mb-2">
           <h2 className="text-2xl font-bold text-white">Matriz Logística</h2>
           <p className="text-xs text-gray-500">Análise baseada em relatórios da Receita Federal, PF, PRF e Mídia Especializada.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
            {/* Rota Cone Sul */}
            <div className="bg-dark-card border border-gray-700 p-5 rounded-xl flex flex-col md:flex-row gap-4 hover:border-orange-500/30 transition-colors">
                <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20 text-orange-500 shrink-0 self-start">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                   </svg>
                </div>
                <div className="flex-1">
                   <div className="flex flex-wrap items-center gap-2 mb-2">
                       <h3 className="text-lg font-bold text-white">Rota Cone Sul (Tradicional)</h3>
                       <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-900/50 text-orange-400 border border-orange-500/30 uppercase">Alto</span>
                   </div>
                   <p className="text-xs text-gray-400 mb-2 font-mono flex items-center gap-2">
                      <span>🚚 Origem: Paraguai (CDE)</span>
                      <span className="text-gray-600">→</span>
                      <span>🏁 Entrada: Ponte da Amizade / Lago de Itaipu (PR)</span>
                   </p>
                   <p className="text-sm text-gray-300">Consolidação no Paraguai. Escoamento via BR-277/163. Uso intensivo de batedores.</p>
                </div>
            </div>

            {/* Rota Arco Norte */}
            <div className="bg-dark-card border border-gray-700 p-5 rounded-xl flex flex-col md:flex-row gap-4 hover:border-red-500/30 transition-colors">
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20 text-red-500 shrink-0 self-start">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <circle cx="12" cy="5" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     <line x1="12" y1="22" x2="12" y2="8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M5 12H2a10 10 0 0 0 20 0h-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                   </svg>
                </div>
                <div className="flex-1">
                   <div className="flex flex-wrap items-center gap-2 mb-2">
                       <h3 className="text-lg font-bold text-white">Rota Arco Norte (Emergente)</h3>
                       <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-900/50 text-red-400 border border-red-500/30 uppercase">Crítico</span>
                   </div>
                   <p className="text-xs text-gray-400 mb-2 font-mono flex items-center gap-2">
                      <span>⚓ Origem: Suriname / Caribe</span>
                      <span className="text-gray-600">→</span>
                      <span>🏁 Entrada: Costa do Pará / Marajó</span>
                   </p>
                   <p className="text-sm text-gray-300">Infraestrutura de estaleiros clandestinos. Alta complexidade logística e difícil detecção.</p>
                </div>
            </div>

            {/* Rota Aérea */}
            <div className="bg-dark-card border border-gray-700 p-5 rounded-xl flex flex-col md:flex-row gap-4 hover:border-yellow-500/30 transition-colors">
                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20 text-yellow-500 shrink-0 self-start">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                   </svg>
                </div>
                <div className="flex-1">
                   <div className="flex flex-wrap items-center gap-2 mb-2">
                       <h3 className="text-lg font-bold text-white">Rota Aérea (Premium)</h3>
                       <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-900/50 text-yellow-400 border border-yellow-500/30 uppercase">Médio-Alto</span>
                   </div>
                   <p className="text-xs text-gray-400 mb-2 font-mono flex items-center gap-2">
                      <span>✈️ Origem: China (Nansha)</span>
                      <span className="text-gray-600">→</span>
                      <span>🏁 Entrada: Aeroporto de Guarulhos (SP)</span>
                   </p>
                   <p className="text-sm text-gray-300">Foco em lançamentos (Hype) e alto valor agregado. Grandes volumes concentrados.</p>
                </div>
            </div>

            {/* Rota Marítima */}
            <div className="bg-dark-card border border-gray-700 p-5 rounded-xl flex flex-col md:flex-row gap-4 hover:border-orange-500/30 transition-colors">
                <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20 text-orange-500 shrink-0 self-start">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
                <div className="flex-1">
                   <div className="flex flex-wrap items-center gap-2 mb-2">
                       <h3 className="text-lg font-bold text-white">Rota Marítima (Volume)</h3>
                       <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-900/50 text-orange-400 border border-orange-500/30 uppercase">Alto</span>
                   </div>
                   <p className="text-xs text-gray-400 mb-2 font-mono flex items-center gap-2">
                      <span>🚢 Origem: Ásia</span>
                      <span className="text-gray-600">→</span>
                      <span>🏁 Entrada: Porto de Santos (SP)</span>
                   </p>
                   <p className="text-sm text-gray-300">Ocultação em cargas lícitas (eletrodomésticos). Volumes na casa dos milhões.</p>
                </div>
            </div>
        </div>
      </div>

      {/* MAPA LÓGICO DE FLUXO */}
      <div className="bg-dark-card border border-gray-700 rounded-xl p-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-8 border-b border-gray-800 pb-2">Mapa Lógico de Fluxo</h4>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 relative p-4">
               {/* China */}
               <div className="relative z-10 text-center group">
                  <div className="border border-red-900/50 bg-red-900/10 px-6 py-4 rounded-lg mb-2 shadow-lg shadow-red-900/10 group-hover:bg-red-900/20 transition-all">
                      <span className="text-red-400 font-bold block text-sm lg:text-base">CHINA / ÁSIA</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Produção</span>
               </div>

               {/* Connector */}
               <div className="hidden lg:block w-16 h-0.5 bg-gradient-to-r from-gray-700 to-gray-600"></div>
               <div className="lg:hidden h-8 w-0.5 bg-gray-700"></div>

               {/* Hubs */}
               <div className="flex flex-col gap-4 z-10 relative">
                   {/* Decoration bracket */}
                   <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-full w-2 border-l border-t border-b border-gray-700 rounded-l-lg hidden lg:block"></div>
                   
                   <div className="text-center group">
                      <div className="border border-orange-900/50 bg-orange-900/10 px-6 py-3 rounded-lg mb-1 shadow-lg shadow-orange-900/10 group-hover:bg-orange-900/20 transition-all">
                          <span className="text-orange-400 font-bold text-sm">PARAGUAI</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">Triangulação</span>
                   </div>
                   
                   <div className="text-center group">
                      <div className="border border-orange-900/50 bg-orange-900/10 px-6 py-3 rounded-lg mb-1 shadow-lg shadow-orange-900/10 group-hover:bg-orange-900/20 transition-all">
                          <span className="text-orange-400 font-bold text-sm">SURINAME</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">Logística</span>
                   </div>

                   <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-full w-2 border-r border-t border-b border-gray-700 rounded-r-lg hidden lg:block"></div>
               </div>

               {/* Connector */}
               <div className="hidden lg:block w-16 h-0.5 bg-gradient-to-r from-gray-600 to-blue-900"></div>
               <div className="lg:hidden h-8 w-0.5 bg-gray-700"></div>

               {/* Brasil */}
               <div className="relative z-10 text-center group">
                  <div className="border border-blue-600/30 bg-blue-600/10 px-8 py-4 rounded-lg mb-2 shadow-lg shadow-blue-900/10 group-hover:bg-blue-600/20 transition-all">
                      <span className="text-blue-400 font-bold block text-sm lg:text-base">BRASIL</span>
                      <div className="absolute -inset-1 rounded-lg bg-blue-500/10 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Consumo & Financiamento</span>
               </div>
          </div>
          
          <div className="text-right mt-6">
             <span className="text-[10px] text-gray-600 italic">Representação Esquemática</span>
          </div>
      </div>

      {/* Price Dynamics Card */}
      <div className="bg-dark-card border border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-green-400 mb-6 flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Dinâmica de Preços (Mercado Cinza)
        </h3>
        
        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
          {/* Origin */}
          <div className="bg-dark-surface p-6 rounded-xl border border-gray-700 w-full md:w-1/3 text-center">
             <p className="text-gray-400 text-xs mb-2">Origem (Paraguai/CDE)</p>
             <p className="text-3xl font-bold text-white">US$ 6,25</p>
             <p className="text-gray-500 text-xs mt-1">~ R$ 35,00</p>
             <p className="text-gray-600 text-[10px] mt-2">Base: HQD Cuvie Air</p>
          </div>

          {/* Arrow / Markup */}
          <div className="flex flex-col items-center">
             <p className="text-gray-500 text-xs font-bold mb-1">ÁGIO +500%</p>
             <div className="h-0.5 w-16 bg-gray-700"></div>
             <p className="text-red-500 text-[10px] mt-1">Risco Logístico</p>
          </div>

          {/* Resale */}
          <div className="bg-dark-bg p-6 rounded-xl border border-green-900/50 w-full md:w-1/3 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] px-2 py-0.5">Venda Final</div>
             <p className="text-gray-400 text-xs mb-2">Revenda Brasil (Online/WPP)</p>
             <p className="text-3xl font-bold text-green-400">R$ 180 - R$ 200</p>
             <p className="text-gray-500 text-xs mt-1">Mark-up Ilegal</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Channels */}
        <div className="bg-dark-card border border-gray-700 rounded-2xl p-6">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
             Canais de Venda
           </h3>
           <ul className="space-y-2 text-sm text-gray-300">
             <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span> Grupos fechados (WhatsApp/Instagram).
             </li>
             <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span> Sites efêmeros ("Vapehan", "Pontocom").
             </li>
             <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span> Transações Peer-to-Peer para evitar rastreio.
             </li>
           </ul>
        </div>

        {/* Tech Support */}
        <div className="bg-dark-card border border-gray-700 rounded-2xl p-6">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
             Suporte Técnico Informal
           </h3>
            <ul className="space-y-2 text-sm text-gray-300">
             <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span> YouTube atua como "SAC" não oficial.
             </li>
             <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span> Tutoriais de limpeza (ex: Nokiva) e operação.
             </li>
             <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span> Vídeos de "Unboxing" para validar autenticidade contra clones.
             </li>
           </ul>
        </div>
      </div>
    </div>
  );
};
