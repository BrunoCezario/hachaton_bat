
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { SearchResult } from '../types';

interface ResultDisplayProps {
  result: SearchResult | null;
  error: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, error }) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successDesc, setSuccessDesc] = useState("");
  
  // Email Simulation State
  const [isSimulatingEmail, setIsSimulatingEmail] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center animate-pulse">
        <p className="text-red-400 font-medium">{error}</p>
      </div>
    );
  }

  if (!result) return null;

  const handleDownloadCsv = () => {
    if (!result.csvData) return;

    // Add BOM for Excel compatibility with UTF-8
    const bom = '\uFEFF';
    const blob = new Blob([bom + result.csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Create a filename based on date
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString().replace(/:/g, '-');
    link.href = url;
    link.setAttribute('download', `evidencia_anvisa_${date}_${time}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSendReport = () => {
    setSuccessTitle("Denúncia Enviada!");
    setSuccessDesc("O Relatório de Evidências foi encaminhado com sucesso para a base de dados da ANVISA.");
    setShowSuccessPopup(true);

    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);

    setTimeout(() => {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const dateStr = new Date().toLocaleString('pt-BR');
        
        const htmlContent = `
          <html>
            <head>
              <title>Relatório de Evidências - ANVISA - ${dateStr}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6; }
                .header { border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
                .logo { font-size: 24px; font-weight: bold; color: #004d00; }
                .meta { font-size: 12px; color: #666; margin-top: 10px; }
                .warning { background-color: #fff3cd; border: 1px solid #ffeeba; padding: 15px; margin-bottom: 20px; font-size: 14px; }
                h1 { font-size: 20px; margin-bottom: 10px; }
                h2 { font-size: 16px; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
                .content { font-size: 14px; white-space: pre-wrap; }
                .source-item { background: #f9f9f9; padding: 10px; margin-bottom: 5px; border-left: 4px solid #004d00; font-size: 12px; }
                .footer { margin-top: 50px; font-size: 10px; text-align: center; border-top: 1px solid #eee; padding-top: 10px; }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="logo">RELATÓRIO DE AUDITORIA DE MERCADO</div>
                <div class="meta">
                  <strong>Data de Emissão:</strong> ${dateStr}<br/>
                  <strong>Objeto:</strong> Comércio Irregular de Dispositivos Eletrônicos para Fumar (DEF)<br/>
                  <strong>Base Legal:</strong> RDC nº 46/2009 (ANVISA)
                </div>
              </div>

              <div class="warning">
                <strong>DOCUMENTO OFICIAL DE EVIDÊNCIA:</strong> Este relatório contém dados coletados automaticamente através de varredura digital em fontes abertas (OSINT) para instrução de processo administrativo.
              </div>

              <h2>1. RESUMO DA INVESTIGAÇÃO</h2>
              <div class="content">
                ${result.text.replace(/\n/g, '<br/>').replace(/\*\*/g, '')}
              </div>

              <h2>2. LINKS E FONTES RASTREADAS</h2>
              <div>
                ${result.sources.map(s => s.web ? `
                  <div class="source-item">
                    <strong>${s.web.title}</strong><br/>
                    <a href="${s.web.uri}">${s.web.uri}</a>
                  </div>
                ` : '').join('')}
              </div>

              <div class="footer">
                Relatório gerado automaticamente pelo sistema Audita Vape Market IA.<br/>
                Uso exclusivo para fins de denúncia.
              </div>
              <script>
                window.onload = function() { window.print(); }
              </script>
            </body>
          </html>
        `;
        
        printWindow.document.write(htmlContent);
        printWindow.document.close();
      }
    }, 1000);
  };

  const handleSimulateEmail = () => {
    setIsSimulatingEmail(true);
    setSimulationStep(0); // "Gerando PDF..."

    // Step 1: Conectando
    setTimeout(() => {
      setSimulationStep(1);
    }, 2500);

    // Step 2: Enviando
    setTimeout(() => {
      setSimulationStep(2);
    }, 4500);

    // End
    setTimeout(() => {
      setIsSimulatingEmail(false);
      setSuccessTitle("E-mail Enviado!");
      setSuccessDesc("O relatório foi encaminhado com sucesso para anna_julia...@bat.com");
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 4000);
    }, 7000);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* Email Simulation Overlay */}
      {isSimulatingEmail && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in">
           <div className="flex flex-col items-center justify-center w-full max-w-md p-8">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-8"></div>
              
              <div className="space-y-4 text-center w-full">
                 <p className={`text-lg font-mono transition-all duration-300 ${simulationStep === 0 ? 'text-white scale-110 font-bold' : 'text-gray-500'}`}>
                    {simulationStep === 0 && "➔ "} Gerando PDF...
                 </p>
                 <p className={`text-lg font-mono transition-all duration-300 ${simulationStep === 1 ? 'text-white scale-110 font-bold' : 'text-gray-500'}`}>
                    {simulationStep === 1 && "➔ "} Conectando ao Servidor...
                 </p>
                 <p className={`text-lg font-mono transition-all duration-300 ${simulationStep === 2 ? 'text-blue-400 scale-110 font-bold' : 'text-gray-500'}`}>
                    {simulationStep === 2 && "➔ "} Enviando para anna_julia...@bat.com
                 </p>
              </div>

              <div className="mt-8 w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                 <div 
                   className="h-full bg-blue-500 transition-all duration-500 ease-out"
                   style={{ width: simulationStep === 0 ? '30%' : simulationStep === 1 ? '60%' : '95%' }}
                 ></div>
              </div>
           </div>
        </div>
      )}

      {/* Success Modal Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-card border border-green-500 rounded-2xl p-8 max-w-sm text-center shadow-2xl shadow-green-900/50 transform scale-105">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{successTitle}</h3>
            <p className="text-gray-300 text-sm">
              {successDesc}
            </p>
          </div>
        </div>
      )}

      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-dark-card border border-gray-700 p-4 rounded-xl">
        <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Relatório de Auditoria Gerado
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {/* Send Email Button (NEW) */}
           <button
            onClick={handleSimulateEmail}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 text-xs font-bold shadow-lg shadow-blue-900/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enviar por email
          </button>

          {/* Send Report Button */}
          <button
            onClick={handleSendReport}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all duration-300 text-xs font-bold shadow-lg shadow-red-900/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Enviar Denúncia para ANVISA
          </button>

          {/* Export CSV Button */}
          {result.csvData && (
            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all duration-300 text-xs font-bold shadow-lg shadow-green-900/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar CSV
            </button>
          )}
        </div>
      </div>

      {/* AI Summary Section with Custom Markdown Styling */}
      <div className="bg-dark-card border border-gray-700 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="prose prose-invert prose-sm max-w-none text-gray-300">
          <ReactMarkdown
            components={{
              // Custom styling for blockquotes to look like "Evidence Cards"
              blockquote: ({node, ...props}) => (
                <blockquote className="bg-slate-800/60 border-l-4 border-yellow-500 pl-4 py-3 my-4 rounded-r-lg shadow-sm" {...props} />
              ),
              // Custom styling for headers
              h3: ({node, ...props}) => (
                <h3 className="text-xl font-bold text-blue-400 mt-8 mb-4 border-b border-gray-700 pb-2 flex items-center gap-2" {...props} />
              ),
              // Make bold text pop with white color
              strong: ({node, ...props}) => (
                <strong className="text-white font-bold" {...props} />
              ),
              // Custom styling for links inside the markdown text
              a: ({node, ...props}) => (
                <a className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
              ),
              // List styling
              ul: ({node, ...props}) => (
                <ul className="list-disc pl-5 space-y-1 text-gray-300 my-4" {...props} />
              ),
               // Horizontal Rule styling
              hr: ({node, ...props}) => (
                <hr className="border-gray-700 my-8" {...props} />
              )
            }}
          >
            {result.text}
          </ReactMarkdown>
        </div>
      </div>

      {/* Links Section (Grounding Sources) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Fontes Rastreadas
        </h3>
        
        {result.sources.length === 0 ? (
          <p className="text-gray-600 text-xs italic">Nenhuma fonte direta indexada.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {result.sources.map((source, index) => {
              if (!source.web) return null;
              return (
                <a
                  key={index}
                  href={source.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-dark-surface border border-gray-700 hover:border-blue-500 rounded-lg group transition-all duration-200 hover:bg-dark-card"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-xs font-bold text-gray-300 truncate group-hover:text-blue-400 transition-colors">
                      {source.web.title}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">
                      {source.web.uri}
                    </p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
