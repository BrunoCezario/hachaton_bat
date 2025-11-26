
import React from 'react';
import { DashboardView } from '../types';
import { downloadFullReport, generateFullIntelligenceCSV } from '../services/exportService';

interface SidebarProps {
  currentView: DashboardView;
  onChangeView: (view: DashboardView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { id: 'brands', label: 'Análise de Marcas', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )},
    { id: 'comparison', label: 'Comparativo Técnico', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'regulatory', label: 'Cenário Regulatório', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )},
    { id: 'news', label: 'Notícias & Operações', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    )},
    { id: 'report-channels', label: 'Canais para Denúncia', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    )},
  ];

  const handleSendFullReport = () => {
    try {
      // 1. Generate CSV data
      const csvData = generateFullIntelligenceCSV();
      
      // 2. Download File
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const date = new Date().toISOString().split('T')[0];
      link.href = url;
      link.setAttribute('download', `audita_vape_full_report_${date}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // 3. Open Mail Client
      const subject = encodeURIComponent("Dossiê Completo - Inteligência de Mercado (RDC 46/2009)");
      const body = encodeURIComponent(`À Ouvidoria da ANVISA,

Prezados,

Segue em anexo o relatório completo de inteligência (CSV) gerado pelo sistema Audita Vape IA.

O arquivo contém:
- Mapeamento de marcas e produtos ilegais;
- Comparativos técnicos (baterias e puffs);
- Lista de alvos de monitoramento prioritário;
- Registro de operações recentes.

Solicito a análise para fins de fiscalização.

Atenciosamente,
[Inserir Identificação]`);

      setTimeout(() => {
         window.location.href = `mailto:ouvidoria@anvisa.gov.br?subject=${subject}&body=${body}`;
      }, 500);

    } catch (e) {
      console.error("Erro ao preparar envio:", e);
      alert("Erro ao gerar o relatório para envio.");
    }
  };

  return (
    <div className="w-full md:w-64 bg-dark-card border-r border-gray-800 flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span>Audita Vape IA</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">INTELIGÊNCIA RDC 46/2009</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Módulos</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id as DashboardView)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              currentView === item.id
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-4">
        <div>
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Ferramentas de BI</p>
           <div className="space-y-2">
             <button 
               onClick={downloadFullReport}
               className="w-full flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 px-3 py-2 rounded-lg text-xs font-bold transition-all border border-blue-600/30"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
               </svg>
               Baixar Dados Brutos
             </button>

             <button 
               onClick={handleSendFullReport}
               className="w-full flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 px-3 py-2 rounded-lg text-xs font-bold transition-all border border-red-600/30"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
               Enviar Relatório Geral
             </button>
           </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3 flex items-center justify-between">
           <span className="text-xs text-gray-400">Análise para:</span>
           <span className="text-xs font-bold text-green-400 bg-green-500/20 px-2 py-0.5 rounded">ANVISA</span>
        </div>
      </div>
    </div>
  );
};
