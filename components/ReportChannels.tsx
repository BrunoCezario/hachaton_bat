
import React from 'react';

export const ReportChannels: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-dark-card border border-gray-700 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          Canais Oficiais para Denúncia
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Utilize os canais abaixo para encaminhar as evidências coletadas (CSV e Prints) diretamente à Ouvidoria da Anvisa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulário Eletrônico */}
        <div className="bg-dark-card border border-gray-700 hover:border-green-500 rounded-2xl p-6 group transition-all duration-300">
          <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Formulário Eletrônico</h3>
          <p className="text-sm text-gray-400 mb-6">
            Canal preferencial para denúncias de vendas online, sites irregulares e marketplaces. Permite anexos.
          </p>
          <a 
            href="https://www.gov.br/anvisa/pt-br/canais_atendimento/ouvidoria/orientacoes/orientacoes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors text-sm"
          >
            Acessar Formulário
          </a>
        </div>

        {/* E-mail */}
        <div className="bg-dark-card border border-gray-700 hover:border-blue-500 rounded-2xl p-6 group transition-all duration-300">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">E-mail Ouvidoria</h3>
          <p className="text-sm text-gray-400 mb-6">
            Para envio de relatórios detalhados, dossiês volumosos ou dúvidas sobre o processo de denúncia.
          </p>
          <a 
            href="mailto:ouvidoria@anvisa.gov.br" 
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 font-bold border border-blue-600/50 rounded-lg transition-colors text-sm"
          >
            ouvidoria@anvisa.gov.br
          </a>
        </div>

        {/* Telefone */}
        <div className="bg-dark-card border border-gray-700 hover:border-purple-500 rounded-2xl p-6 group transition-all duration-300">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Central de Atendimento</h3>
          <p className="text-sm text-gray-400 mb-6">
            Atendimento telefônico para orientações rápidas e acompanhamento de protocolos abertos.
          </p>
          <div className="inline-flex items-center justify-center w-full px-4 py-3 bg-purple-600/20 text-purple-400 font-bold border border-purple-600/50 rounded-lg text-sm select-all">
            0800 642 9782
          </div>
        </div>
      </div>

      <div className="bg-yellow-900/10 border border-yellow-700/30 rounded-xl p-6 mt-8">
         <h4 className="text-yellow-500 font-bold mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            O que incluir na denúncia?
         </h4>
         <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
            <li><strong>Link do Anúncio (URL):</strong> Indispensável para rastreio.</li>
            <li><strong>Prints/Capturas de Tela:</strong> Evidências visuais de oferta e preço.</li>
            <li><strong>Dados do Vendedor:</strong> CNPJ, Nome, Telefone ou WhatsApp (se disponível).</li>
            <li><strong>Localização:</strong> Se houver endereço físico ou cidade de origem da postagem.</li>
         </ul>
      </div>
    </div>
  );
};
