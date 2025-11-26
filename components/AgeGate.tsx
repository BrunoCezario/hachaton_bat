import React from 'react';

interface AgeGateProps {
  onVerify: () => void;
}

export const AgeGate: React.FC<AgeGateProps> = ({ onVerify }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      <div className="bg-dark-card border border-yellow-600/50 rounded-2xl p-8 max-w-lg w-full shadow-2xl text-center relative overflow-hidden">
        {/* Decorative alert bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-600 via-orange-500 to-yellow-600"></div>
        
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-yellow-500/10 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Ferramenta de Monitoramento</h2>
        <h3 className="text-sm font-semibold text-yellow-500 uppercase tracking-widest mb-4">Uso Estrito para Denúncia (RDC 46/2009)</h3>
        
        <p className="text-gray-300 mb-6 text-sm leading-relaxed text-justify">
          Este sistema utiliza Inteligência Artificial para identificar sites e ofertas de produtos proibidos pela ANVISA. 
          O objetivo é gerar relatórios (CSV) contendo URLs e dados de identificação para instruir denúncias formais.
        </p>
        
        <p className="text-gray-400 mb-8 text-xs">
          Ao prosseguir, você declara estar ciente de que esta ferramenta serve para fins de pesquisa, auditoria e fiscalização cidadã, não para aquisição de produtos ilícitos.
        </p>

        <div className="space-y-3">
          <button
            onClick={onVerify}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-yellow-900/20"
          >
            Concordo e quero coletar dados
          </button>
          <button
            onClick={() => window.location.href = 'https://www.gov.br/anvisa'}
            className="w-full bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 font-medium py-3 px-6 rounded-xl transition-colors"
          >
            Sair e ir para Anvisa.gov.br
          </button>
        </div>
      </div>
    </div>
  );
};