
import { BRAND_ANALYSIS, TECH_COMPARISON_BATTERY, TECH_COMPARISON_PUFFS, KNOWN_TARGETS, RECENT_NEWS } from '../constants';

export const generateFullIntelligenceCSV = () => {
  const bom = '\uFEFF'; // Byte Order Mark for Excel compatibility
  let csvContent = bom + "TIPO_REGISTRO;ID_MODELO;MARCA;CATEGORIA_ITEM;VALOR_METRICA;DETALHES_TECNICOS;OBSERVACOES_INSIGHTS\n";

  // 1. Export Brand Analysis (Products)
  BRAND_ANALYSIS.forEach(brand => {
    // Export Brand Header Info
    const brandRow = [
      'PERFIL_MARCA',
      brand.id,
      brand.name,
      'Descricao Institucional',
      brand.flagship, // Using metric column for flagship model name
      brand.description,
      ''
    ].map(field => `"${String(field || '').replace(/"/g, '""')}"`).join(';');
    csvContent += brandRow + "\n";

    // Export Products
    brand.products.forEach(product => {
      const specs = product.specs.join(' | ');
      const row = [
        'DETALHE_PRODUTO',
        brand.id,
        brand.name,
        product.name,
        '', // No single numeric metric
        specs,
        product.note || ''
      ].map(field => `"${String(field || '').replace(/"/g, '""')}"`).join(';');
      csvContent += row + "\n";
    });
  });

  // 2. Export Tech Comparison (Battery)
  TECH_COMPARISON_BATTERY.forEach(item => {
    const row = [
      'COMPARATIVO_TECNICO',
      item.model,
      'Múltiplas/Genérico', // Brand not strictly structured in tech array, generalized
      'Capacidade Bateria (mAh)',
      item.battery,
      item.features.join(' | '),
      'Fonte: Comparativo Técnico'
    ].map(field => `"${String(field || '').replace(/"/g, '""')}"`).join(';');
    csvContent += row + "\n";
  });

  // 3. Export Tech Comparison (Puffs)
  TECH_COMPARISON_PUFFS.forEach(item => {
    const row = [
      'COMPARATIVO_TECNICO',
      item.model,
      'Múltiplas/Genérico',
      'Volume de Puffs',
      item.puffs,
      '',
      'Fonte: Comparativo Técnico'
    ].map(field => `"${String(field || '').replace(/"/g, '""')}"`).join(';');
    csvContent += row + "\n";
  });

  // 4. Export Known Targets
  KNOWN_TARGETS.forEach(target => {
    const row = [
      'ALVO_MONITORAMENTO',
      'URL_ALVO',
      '',
      'Target URL',
      '',
      target,
      'Monitoramento Prioritário'
    ].map(field => `"${String(field || '').replace(/"/g, '""')}"`).join(';');
    csvContent += row + "\n";
  });

  // 5. Export Recent News
  RECENT_NEWS.forEach(news => {
    const row = [
      'NOTICIA_OPERACAO',
      news.date,
      news.source,
      news.type,
      '',
      news.title,
      news.summary
    ].map(field => `"${String(field || '').replace(/"/g, '""')}"`).join(';');
    csvContent += row + "\n";
  });

  // 6. Export Reporting Channels (Static Data)
  const reportChannels = [
    { name: 'Ouvidoria Anvisa - Form', val: 'https://www.gov.br/anvisa/pt-br/canais_atendimento/ouvidoria/orientacoes/orientacoes' },
    { name: 'Ouvidoria Anvisa - Email', val: 'ouvidoria@anvisa.gov.br' },
    { name: 'Ouvidoria Anvisa - Tel', val: '0800 642 9782' }
  ];

  reportChannels.forEach(channel => {
    const row = [
      'CANAL_DENUNCIA',
      'ANVISA',
      '',
      channel.name,
      '',
      channel.val,
      'Canal Oficial'
    ].map(field => `"${String(field || '').replace(/"/g, '""')}"`).join(';');
    csvContent += row + "\n";
  });

  return csvContent;
};

export const downloadFullReport = () => {
  try {
    const csvData = generateFullIntelligenceCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString().replace(/:/g, '-');
    
    link.href = url;
    link.setAttribute('download', `intelligence_db_full_${date}_${time}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error("Erro ao gerar relatório completo:", e);
    alert("Erro ao gerar o arquivo de dados brutos.");
  }
};
