
import React, { useState } from 'react';
import { searchSocialMedia } from '../services/geminiService';
import { SocialMediaMention, SocialPlatform } from '../types';
import { POPULAR_BRANDS } from '../constants';

export const MediaSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SocialMediaMention[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hasSearched, setHasSearched] = useState(false);

  const executeSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setQuery(searchTerm);
    setIsLoading(true);
    setHasSearched(true);
    setResults([]);

    try {
      const data = await searchSocialMedia(searchTerm);
      setResults(data);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const handleReset = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setActiveFilter('all');
  };

  // Helper to safely handle platform strings from AI
  const normalizePlatform = (p: string): SocialPlatform => {
    if (!p) return 'x';
    const lower = p.toLowerCase().trim();
    if (lower.includes('youtube')) return 'youtube';
    if (lower.includes('tiktok')) return 'tiktok';
    if (lower.includes('insta')) return 'instagram';
    return 'x'; // Default / Fallback
  };

  const filteredResults = activeFilter === 'all' 
    ? results 
    : results.filter(r => normalizePlatform(r.platform) === activeFilter);

  const getPlatformIcon = (platform: string) => {
    const p = normalizePlatform(platform);
    switch (p) {
      case 'youtube':
        return (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
        );
      case 'tiktok':
        return (
           <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 3.18-1.32 5.37-3.23 6.38-4.82 2.12-9.12-1.79-9.12-6.93 0-3.14 2.53-5.75 5.66-5.75.14 0 .28 0 .42.01V12c-.09-.01-.19-.01-.28-.01-1.04 0-2.02.44-2.66 1.25-.97 1.25-.66 3.33.6 4.34 1.34 1.05 3.44.75 4.38-.68.61-.94.75-2.06.75-3.17V.02z"/></svg>
        );
      case 'instagram':
        return (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        );
      default: // X / Twitter
        return (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        );
    }
  };

  const getCardStyle = (platform: string) => {
    const p = normalizePlatform(platform);
    switch (p) {
      case 'youtube': return 'border-red-600/30 hover:border-red-500 bg-red-900/10';
      case 'tiktok': return 'border-cyan-500/30 hover:border-cyan-400 bg-cyan-900/10';
      case 'instagram': return 'border-pink-600/30 hover:border-pink-500 bg-pink-900/10';
      case 'x': return 'border-gray-500/30 hover:border-gray-400 bg-gray-800/30';
      default: return 'border-gray-600/30 hover:border-gray-400 bg-gray-800/20'; // Fallback style
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    if (sentiment === 'promo') return <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30 shrink-0">Venda/Promo</span>;
    if (sentiment === 'risk') return <span className="text-[10px] font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30 shrink-0">Alerta/Risco</span>;
    return <span className="text-[10px] font-bold bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded border border-gray-500/30 shrink-0">Neutro/Review</span>;
  };

  return (
    <div className="space-y-8 animate-fade-in h-full">
      
      {/* Search Header */}
      <div className="bg-dark-card border border-gray-700 p-6 rounded-xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full -mr-16 -mt-16 pointer-events-none"></div>
        
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
          Busca em Mídias Sociais
        </h2>
        <p className="text-gray-400 text-sm mt-2 relative z-10 max-w-3xl">
          Monitore descrições de vídeos, comentários e posts no YouTube, TikTok, Instagram e X para identificar canais de venda e tendências de consumo.
        </p>

        <form onSubmit={handleSearch} className="mt-6 flex flex-wrap gap-2 max-w-2xl relative z-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: Pod Elfbar, Vaporesso Review, Comprar Vape"
            className="flex-1 min-w-[200px] bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors shadow-inner"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-lg transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-purple-900/20"
          >
            {isLoading ? (
               <>
                 <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Buscando...
               </>
            ) : 'Buscar'}
          </button>
          
          {hasSearched && (
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-lg transition-all flex items-center gap-2 border border-gray-600 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Nova Busca
            </button>
          )}
        </form>
      </div>

      {/* --- SUGGESTIONS (POPULAR BRANDS) --- */}
      {!hasSearched && (
        <div className="animate-fade-in">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
             </svg>
             Alvos Frequentes de Investigação (Sugestões)
           </h3>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {POPULAR_BRANDS.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => executeSearch(brand.name)}
                  className="text-left bg-dark-card border border-gray-700 hover:border-purple-500 hover:bg-purple-900/10 p-3 rounded-lg transition-all group shadow-md"
                >
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    {brand.category}
                  </span>
                  <span className="font-bold text-gray-200 group-hover:text-purple-400 transition-colors">
                    {brand.name}
                  </span>
                </button>
              ))}
           </div>
        </div>
      )}

      {/* Filters */}
      {hasSearched && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
           <button 
             onClick={() => setActiveFilter('all')}
             className={`px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 ${activeFilter === 'all' ? 'bg-gray-200 text-black border-white' : 'bg-dark-card text-gray-400 border-gray-700 hover:bg-gray-800'}`}
           >
             Todos
           </button>
           <button 
             onClick={() => setActiveFilter('youtube')}
             className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 ${activeFilter === 'youtube' ? 'bg-red-600 text-white border-red-400' : 'bg-dark-card text-gray-400 border-gray-700 hover:border-red-900'}`}
           >
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
             YouTube
           </button>
           <button 
             onClick={() => setActiveFilter('tiktok')}
             className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 ${activeFilter === 'tiktok' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-dark-card text-gray-400 border-gray-700 hover:border-cyan-900'}`}
           >
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 3.18-1.32 5.37-3.23 6.38-4.82 2.12-9.12-1.79-9.12-6.93 0-3.14 2.53-5.75 5.66-5.75.14 0 .28 0 .42.01V12c-.09-.01-.19-.01-.28-.01-1.04 0-2.02.44-2.66 1.25-.97 1.25-.66 3.33.6 4.34 1.34 1.05 3.44.75 4.38-.68.61-.94.75-2.06.75-3.17V.02z"/></svg>
             TikTok
           </button>
           <button 
             onClick={() => setActiveFilter('instagram')}
             className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 ${activeFilter === 'instagram' ? 'bg-pink-600 text-white border-pink-400' : 'bg-dark-card text-gray-400 border-gray-700 hover:border-pink-900'}`}
           >
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
             Instagram
           </button>
           <button 
             onClick={() => setActiveFilter('x')}
             className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 ${activeFilter === 'x' ? 'bg-gray-700 text-white border-gray-500' : 'bg-dark-card text-gray-400 border-gray-700 hover:border-gray-600'}`}
           >
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
             X / Twitter
           </button>
        </div>
      )}

      {/* Results Grid */}
      {hasSearched && !isLoading && filteredResults.length === 0 && (
         <div className="text-center py-20 text-gray-500 bg-dark-card/50 rounded-xl border border-gray-800 border-dashed">
           <p className="text-lg font-medium">Nenhuma menção relevante encontrada.</p>
           <p className="text-sm">Tente ajustar o termo de busca ou selecionar outra plataforma.</p>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
        {filteredResults.map((item) => (
          <div 
             key={item.id} 
             className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] flex flex-col h-full shadow-lg ${getCardStyle(item.platform)}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-black/20 rounded-full shrink-0">
                  {getPlatformIcon(item.platform)}
                </div>
                <div className="min-w-0">
                   <p className="text-sm font-bold text-white leading-none truncate" title={item.author}>{item.author}</p>
                   <p className="text-[10px] text-gray-300 mt-1">{item.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 ml-2">
                 {getSentimentBadge(item.sentiment)}
              </div>
            </div>

            <p className="text-sm text-gray-200 mb-6 line-clamp-4 leading-relaxed">
               "{item.content}"
            </p>

            <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/10">
               <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                   <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                 </svg>
                 {item.likes || 'N/A'}
               </span>
               <a 
                 href={item.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-xs font-bold text-white hover:underline flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
               >
                 Ver Post
                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
               </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
