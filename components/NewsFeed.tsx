import React, { useEffect, useState } from 'react';
import { RECENT_NEWS } from '../constants';
import { fetchDynamicNews } from '../services/geminiService';
import { NewsItem } from '../types';

export const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [useFallback, setUseFallback] = useState<boolean>(false);

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const sortNewsByDate = (newsList: NewsItem[]) => {
    return [...newsList].sort((a, b) => {
      return parseDate(b.date).getTime() - parseDate(a.date).getTime();
    });
  };

  const loadNews = async () => {
    setIsLoading(true);
    setUseFallback(false);
    try {
      const dynamicNews = await fetchDynamicNews();
      if (dynamicNews && dynamicNews.length > 0) {
        setNews(sortNewsByDate(dynamicNews));
      } else {
        throw new Error("Nenhuma notícia encontrada");
      }
    } catch (error) {
      console.error("Falha ao carregar notícias dinâmicas, usando fallback:", error);
      setNews(sortNewsByDate(RECENT_NEWS));
      setUseFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCsv = () => {
    if (news.length === 0) return;

    const bom = '\uFEFF';
    let csvContent = bom + "DATA;TITULO;FONTE;TIPO;RESUMO;LINK_ORIGINAL\n";

    news.forEach(item => {
      const typeLabel = item.type === 'seizure' ? 'Apreensao' : item.type === 'regulation' ? 'Regulatorio' : 'Operacao';
      const row = [
        item.date,
        `"${item.title.replace(/"/g, '""')}"`,
        `"${item.source.replace(/"/g, '""')}"`,
        typeLabel,
        `"${item.summary.replace(/"/g, '""')}"`,
        item.url || ''
      ].join(';');
      csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const date = new Date().toISOString().split('T')[0];
    link.href = url;
    link.setAttribute('download', `relatorio_noticias_vape_${date}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReportEmail = () => {
    // 1. Baixar o arquivo para o usuário poder anexar
    handleExportCsv();

    // 2. Preparar o email
    const subject = encodeURIComponent("Denúncia - Monitoramento de Inteligência RDC 46/2009");
    const body = encodeURIComponent(`À Ouvidoria da ANVISA,

Prezados,

Segue em anexo o relatório CSV gerado automaticamente contendo evidências recentes (notícias e operações) sobre o comércio e circulação irregular de Dispositivos Eletrônicos para Fumar (DEFs).

Os dados foram coletados via monitoramento de fontes abertas (OSINT).

Atenciosamente,
[Inserir Identificação]`);

    // 3. Abrir cliente de email
    // Usando setTimeout para garantir que o download inicie antes da troca de contexto (alguns browsers bloqueiam)
    setTimeout(() => {
        window.location.href = `mailto:ouvidoria@anvisa.gov.br?subject=${subject}&body=${body}`;
    }, 500);
    
    // Opcional: Feedback visual simples
    alert("O relatório CSV foi baixado.\n\nSeu cliente de e-mail será aberto. Por favor, arraste o arquivo CSV baixado para o anexo do e-mail.");
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-dark-card border border-gray-700 p-6 rounded-xl mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Notícias & Operações Recentes
          </h2>
          <div className="mt-2">
            <p className="text-gray-400 text-sm">
              Monitoramento em tempo real de ações de fiscalização e atualizações regulatórias.
            </p>
            {!useFallback && !isLoading && news.length > 0 && (
              <div className="flex items-center gap-1.5 mt-2 w-fit px-2 py-1 rounded-full bg-blue-900/20 border border-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">
                  Dados Verificados via Google Search
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleReportEmail}
            disabled={news.length === 0 || isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/50 rounded-lg transition-all text-xs font-bold disabled:opacity-50"
            title="Baixar relatório e abrir e-mail para denúncia"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enviar Relatório
          </button>

          <button 
            onClick={handleExportCsv}
            disabled={news.length === 0 || isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-600/50 rounded-lg transition-all text-xs font-bold disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar CSV
          </button>

          <button 
            onClick={loadNews}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-600/50 rounded-lg transition-all text-xs font-bold disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isLoading ? 'Buscando...' : 'Atualizar Feed'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 animate-pulse">Consultando fontes oficiais e bases de dados em tempo real...</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-gray-700 ml-4 space-y-8 pl-8 pb-4">
           {useFallback && (
             <div className="bg-yellow-900/20 border border-yellow-700/50 p-3 rounded-lg text-xs text-yellow-500 mb-6">
               ⚠️ Não foi possível conectar à base de notícias em tempo real. Exibindo registros do banco de dados interno.
             </div>
           )}

          {news.map((item) => (
            <div key={item.id} className="relative group animate-slide-up">
              {/* Timeline Dot */}
              <div className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-dark-bg ${
                item.type === 'seizure' ? 'bg-red-500' : 
                item.type === 'regulation' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}></div>

              <div className="bg-dark-card border border-gray-700 rounded-xl p-5 hover:border-gray-500 transition-colors shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                     <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                        item.type === 'seizure' ? 'bg-red-900/30 text-red-400 border-red-900/50' : 
                        item.type === 'regulation' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-900/50' : 'bg-blue-900/30 text-blue-400 border-blue-900/50'
                     }`}>
                       {item.type === 'seizure' ? 'Apreensão' : item.type === 'regulation' ? 'Regulatório' : 'Operação'}
                     </span>
                     <span className="text-xs text-gray-500 font-mono">{item.date}</span>
                  </div>
                  <span className="text-xs text-gray-400 font-bold truncate max-w-[150px] text-right" title={item.source}>{item.source}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.summary}
                </p>

                {item.url && item.url !== '#' && (
                   <a 
                     href={item.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-400 mt-4 font-bold uppercase tracking-wide hover:underline"
                   >
                     Ler Fonte Oficial
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                   </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};