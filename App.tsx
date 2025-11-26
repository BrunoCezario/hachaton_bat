
import React, { useState, useEffect } from 'react';
import { AgeGate } from './components/AgeGate';
import { SearchBar } from './components/SearchBar';
import { BrandList } from './components/BrandList';
import { ResultDisplay } from './components/ResultDisplay';
import { Sidebar } from './components/Sidebar';
import { BrandAnalysis } from './components/BrandAnalysis';
import { TechComparison } from './components/TechComparison';
import { RegulatoryScenario } from './components/RegulatoryScenario';
import { NewsFeed } from './components/NewsFeed';
import { ReportChannels } from './components/ReportChannels';
import { Disclaimer } from './components/Disclaimer';
import { POPULAR_BRANDS } from './constants';
import { searchProductLinks } from './services/geminiService';
import { SearchResult, DashboardView } from './types';

function App() {
  const [isLegalVerified, setIsLegalVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<DashboardView>('overview');

  // Check local storage for previous verification
  useEffect(() => {
    const verified = localStorage.getItem('legalVerified');
    if (verified === 'true') {
      setIsLegalVerified(true);
    }
  }, []);

  const handleLegalVerify = () => {
    localStorage.setItem('legalVerified', 'true');
    setIsLegalVerified(true);
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSearchResult(null);
    setCurrentView('overview'); // Ensure we are on the search view

    try {
      const result = await searchProductLinks(query);
      setSearchResult(result);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao auditar os sites.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render content based on current view
  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return (
          <div className="animate-fade-in space-y-8">
            {/* KPI Cards (Overview only) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
               <div className="bg-dark-card border border-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Divergência Tecnológica</p>
                  <p className="text-2xl font-bold text-white mt-1">4 Vetores</p>
                  <p className="text-[10px] text-gray-500 mt-2">Condução, Massificação, Estética, Convergência</p>
               </div>
               <div className="bg-dark-card border border-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Capacidade Máxima</p>
                  <p className="text-2xl font-bold text-green-400 mt-1">40.000 Puffs</p>
                  <p className="text-[10px] text-gray-500 mt-2">Airmez X-Beats (Estimado)</p>
               </div>
               <div className="bg-dark-card border border-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Ágio Mercado Cinza</p>
                  <p className="text-2xl font-bold text-red-400 mt-1">+500%</p>
                  <p className="text-[10px] text-gray-500 mt-2">Paraguai (US$6) vs Brasil (R$200)</p>
               </div>
                <div className="bg-dark-card border border-gray-700 p-4 rounded-xl">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Regulação BR</p>
                  <p className="text-2xl font-bold text-white mt-1">Proibido</p>
                  <p className="text-[10px] text-gray-500 mt-2">RDC ANVISA (Venda e Importação)</p>
               </div>
            </div>
            
            <div className="bg-dark-card border border-gray-700 p-6 rounded-2xl mb-8">
               <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                 </svg>
                 Resumo Executivo 2024-2025
               </h3>
               <p className="text-gray-300 text-sm leading-relaxed">
                 O mercado global de ENDS atravessa um período de divergência. O que antes era um setor monolítico fragmentou-se. A análise forense destaca a <strong>Airistech</strong> dominando a vaporização de botânicos via condução térmica, enquanto a <strong>Airmez</strong> redefine o conceito de "descartável" ao integrar áudio Bluetooth e telas touch.
                 <br/><br/>
                 No Brasil, sob a vigilância da ANVISA, observa-se um "mercado cinza" sofisticado. A proibição formal contrasta com a disponibilidade de tecnologias de ponta, sustentada por canais de venda peer-to-peer (WhatsApp/Instagram) e suporte técnico informal via YouTube.
               </p>
            </div>

            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            
             <div className="min-h-[200px]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-10">
                  <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-green-400 text-sm font-mono">Processando auditoria...</p>
                </div>
              ) : searchResult || error ? (
                <ResultDisplay result={searchResult} error={error} />
              ) : (
                <BrandList brands={POPULAR_BRANDS} onSelectBrand={handleSearch} />
              )}
            </div>
          </div>
        );
      case 'brands':
        return <BrandAnalysis />;
      case 'comparison':
        return <TechComparison />;
      case 'regulatory':
        return <RegulatoryScenario />;
      case 'news':
        return <NewsFeed />;
      case 'report-channels':
        return <ReportChannels />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-dark-bg text-slate-100 font-sans overflow-hidden">
      {!isLegalVerified && <AgeGate onVerify={handleLegalVerify} />}

      {/* Sidebar */}
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-dark-bg/80 backdrop-blur-md border-b border-gray-800 px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-white">Audita Vape Market IA</h1>
              <p className="text-xs text-gray-500 uppercase tracking-wide">RELATÓRIO TÉCNICO 2024-2025</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Status do Sistema:</span>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-xs font-bold text-green-400">ONLINE</span>
              </div>
            </div>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto pb-20">
          {renderContent()}
          <Disclaimer />
        </div>
      </main>
    </div>
  );
}

export default App;
