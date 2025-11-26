
import { Brand, ProductCategory, BrandAnalysisData, TechSpec, NewsItem } from './types';

export const POPULAR_BRANDS: Brand[] = [
  { id: '1', name: 'Elf Bar', category: ProductCategory.DISPOSABLE, popular: true },
  { id: '2', name: 'Vaporesso', category: ProductCategory.DEVICE, popular: true },
  { id: '3', name: 'Ignite', category: ProductCategory.DISPOSABLE, popular: true },
  { id: '4', name: 'Zyn', category: ProductCategory.POUCH, popular: true },
  { id: '5', name: 'Nasty Juice', category: ProductCategory.JUICE, popular: true },
  { id: '6', name: 'Vuse', category: ProductCategory.DISPOSABLE, popular: true },
  { id: '7', name: 'Voopoo', category: ProductCategory.DEVICE, popular: true },
  { id: '8', name: 'Smok', category: ProductCategory.DEVICE, popular: true },
  { id: '9', name: 'Velo', category: ProductCategory.POUCH, popular: true },
  { id: '10', name: 'GeekVape', category: ProductCategory.DEVICE, popular: true },
  { id: '11', name: 'Oxbar', category: ProductCategory.DISPOSABLE, popular: true },
  { id: '12', name: 'NikBar', category: ProductCategory.DISPOSABLE, popular: true },
  { id: '13', name: 'Airistech Nokiva', category: ProductCategory.DEVICE, popular: true },
  { id: '14', name: 'Cuvie Air', category: ProductCategory.DISPOSABLE, popular: true },
  { id: '15', name: 'Airistech Herbva', category: ProductCategory.DEVICE, popular: true },
  { id: '16', name: 'Airistech Mystica', category: ProductCategory.DEVICE, popular: true },
  { id: '17', name: 'Airmez 40000 Puffs', category: ProductCategory.DISPOSABLE, popular: true },
  { id: '18', name: 'Hannya Airtok', category: ProductCategory.DEVICE, popular: true },
  { id: '19', name: 'Air Mez', category: ProductCategory.DISPOSABLE, popular: true },
  { id: '20', name: 'Airistech Airis', category: ProductCategory.DISPOSABLE, popular: true },
  { id: '21', name: 'Airmez 2in', category: ProductCategory.DISPOSABLE, popular: true },
];

export const KNOWN_TARGETS = [
  "https://www.aldeiavape.com/",
  "https://whitecloudbrasil.com/",
  "https://stigvaperio.com/",
  "https://www.mdntabacaria.com/",
  "https://megapodshop.ola.click/",
  "https://tabacaria-conveniencia-jack-99.ola.click/",
  "https://www.vdevaape.com/",
  "https://atacadopods.com/",
  "https://www.beckelitebrasil.com/",
  "https://www.vitrinevape.com/",
  "https://deliverydireto.com.br/vaperfenix/vaperfenix",
  "https://www.smokebrasil.com/",
  "https://www.gullotabacaria.com.br/",
  "https://www.barrashopping.com.br/lojas/jr-tabacaria/",
  "https://www.lojaelitevape420.com/",
  "https://lista.mercadolivre.com.br/essencia-para-vaporizador",
  "https://shopee.com.br/list/Pod/Recarreg%C3%A1vel",
  "https://discord.com/invite/discord-vape-138490073145540608"
];

export const DISCLAIMER_TEXT = `
  FERRAMENTA DE MONITORAMENTO: Este aplicativo destina-se exclusivamente à coleta de dados e evidências para fins de denúncia junto à ANVISA (Agência Nacional de Vigilância Sanitária) e órgãos de defesa do consumidor.
  A comercialização, importação e propaganda de Dispositivos Eletrônicos para Fumar (DEFs) são proibidas no Brasil pela Resolução RDC nº 46/2009.
  Os dados gerados (CSV) devem ser utilizados para instruir processos administrativos ou denúncias formais na Ouvidoria. Não temos vínculo com os sites listados.
`;

export const RECENT_NEWS: NewsItem[] = [
  {
    id: 'news-real-001',
    date: '24/09/2024',
    title: 'PF combate contrabando de cigarros eletrônicos e convencionais',
    source: 'Polícia Federal',
    summary: 'Operação policial cumpriu mandados de busca e apreensão visando desarticular grupos que comercializam vapes ilegalmente.',
    type: 'operation',
    url: 'https://www.gov.br/pf/pt-br/assuntos/noticias/2024/09/pf-combate-contrabando-de-cigarros-eletronicos-e-cigarros-convencionais-1'
  },
  {
    id: 'news-real-002',
    date: '03/09/2024',
    title: 'CAE adia votação de projeto que regulamenta cigarros eletrônicos',
    source: 'Senado Notícias',
    summary: 'Comissão de Assuntos Econômicos discute o PL 5008/2023. Senadores pedem mais tempo para analisar os impactos na saúde pública.',
    type: 'regulation',
    url: 'https://www12.senado.leg.br/noticias/materias/2024/09/03/cae-adia-votacao-de-projeto-que-regulamenta-cigarros-eletronicos'
  },
  {
    id: 'news-real-003',
    date: '05/08/2024',
    title: 'Operação combate venda ilegal de DEFs na internet',
    source: 'Agência Brasil / MJSP',
    summary: 'Investigação foca em influenciadores e lojas virtuais que utilizam redes sociais para comercializar produtos proibidos.',
    type: 'operation',
    url: 'https://agenciabrasil.ebc.com.br/geral/noticia/2024-08/operacao-combate-venda-ilegal-de-cigarros-eletronicos-na-internet'
  },
  {
    id: 'news-real-004',
    date: '19/04/2024',
    title: 'Anvisa mantém proibição de cigarros eletrônicos no Brasil',
    source: 'ANVISA / Gov.br',
    summary: 'Diretoria Colegiada aprovou a manutenção da proibição dos dispositivos eletrônicos para fumar (DEFs) após consulta pública.',
    type: 'regulation',
    url: 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2024/anvisa-mantem-proibicao-de-dispositivos-eletronicos-para-fumar'
  },
  {
    id: 'news-real-005',
    date: '25/10/2023',
    title: 'Receita apreende vapes no Aeroporto de Viracopos',
    source: 'Receita Federal',
    summary: 'Fiscalização interceptou carga declarada incorretamente vinda da China. Material continha milhares de dispositivos descartáveis.',
    type: 'seizure',
    url: 'https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2023/10/receita-federal-apreende-cigarros-eletronicos-em-viracopos'
  }
];

export const BRAND_ANALYSIS: BrandAnalysisData[] = [
  {
    id: 'airistech',
    name: 'Airistech',
    description: 'Especializada em vaporização de ervas secas e concentrados via condução térmica.',
    flagship: 'Herbva Nokiva',
    products: [
      {
        name: 'Herbva Nokiva',
        specs: [
          'Energia: 2200mAh (LiPo)',
          'Controle: Digital (149°C - 224°C)',
          'Tecnologia: Câmara de Cerâmica / Condução',
          'Bocal de Vidro, Aquecimento em 20s'
        ],
        note: 'Requer limpeza frequente. Não usar pass-through.'
      },
      {
        name: 'Herbva 5G',
        specs: [
          'Energia: 1000-1100mAh',
          'Controle: 3 Presets (199°C, 207°C, 215°C)',
          'Tecnologia: Câmara de Cerâmica',
          'Ultra-portabilidade, Bocal Magnético'
        ],
        note: 'Autonomia reduzida para garantir tamanho.'
      },
      {
        name: 'Série Mystica',
        specs: [
          'Energia: Variável (Ajuste de Voltagem)',
          'Controle: Voltagem Variável (3.4V - 4.0V)',
          'Tecnologia: Conexão Magnética 510',
          'Design "Conceal" (Ocultação)'
        ],
        note: 'Compatível com cartuchos de óleo de até 11.5mm.'
      }
    ]
  },
  {
    id: 'airmez',
    name: 'Airmez',
    description: 'Convergência Multimídia, Gamificação e Alta Capacidade de Puffs.',
    flagship: 'Airmez X-Beats',
    products: [
      {
        name: 'Airmez Matrix',
        specs: [
          'Puffs: 25.000',
          'Tela: HD 2.1" Touch',
          'Recurso: Jogos tipo "Slot Machine" integrados',
          'Coil: Dual Mesh'
        ],
        note: 'Convergência polêmica entre nicotina e jogos de azar.'
      },
      {
        name: 'Airmez X-Beats',
        specs: [
          'Puffs: 40.000 (Estimado)',
          'Inovação: Estojo de carregamento com Fones Bluetooth TWS',
          'Display: Smart Touch Display',
          'Energia: Bateria recarregável via USB-C'
        ],
        note: 'Estratégia de retenção pós-uso do líquido.'
      }
    ]
  },
  {
    id: 'hqd',
    name: 'HQD',
    description: 'Descartáveis de média duração e alta penetração de mercado.',
    flagship: 'Cuvie Air',
    products: [
      {
        name: 'Cuvie Air',
        specs: [
          'Puffs: 4.000',
          'Capacidade: 12ml',
          'Bateria: 650mAh (Recarregável)',
          'Design: Ergonômico achatado'
        ]
      },
      {
        name: 'HQD Cuvie Plus',
        specs: [
          'Puffs: 1.200',
          'Capacidade: 5ml',
          'Bateria: 950mAh (Não recarregável)',
          'Material: Alumínio'
        ]
      }
    ]
  },
  {
    id: 'vapelustion',
    name: 'Vapelustion',
    description: 'Identidade Visual e Subcultura (Anime/Manga).',
    flagship: 'Hannya Airtok',
    products: [
      {
        name: 'Hannya Airtok',
        specs: [
          'Estilo: Pod System Aberto',
          'Design: Capas translúcidas com arte Anime',
          'Bateria: 650mAh',
          'Cartucho: 1.0ohm Mesh'
        ]
      },
      {
        name: 'Hannya Nano Pro',
        specs: [
           'Painéis: Substituíveis (Arte Metal)',
           'Potência: 13.6W',
           'Bateria: 700mAh',
           'Airflow: Ajustável'
        ]
      }
    ]
  },
  {
    id: 'elfbar',
    name: 'Elf Bar',
    description: 'Líder global em descartáveis, massificação do design "box".',
    flagship: 'BC4000/5000',
    products: [
      {
        name: 'BC4000 / BC5000',
        specs: [
          'Puffs: 4000 a 5000',
          'Coil: Dual Mesh (Sabor intenso)',
          'Bateria: 650mAh Recarregável',
          'Design: Gradiente de cores, formato "caixinha"'
        ],
        note: 'Altíssimo índice de falsificação no mercado.'
      },
      {
        name: 'TE5000',
        specs: [
          'Design: Transparente/Cyberpunk',
          'Silencioso: Tecnologia Extreme Silence',
          'Puffs: 5000',
          'Coil: Mesh aprimorada'
        ]
      }
    ]
  },
  {
    id: 'ignite',
    name: 'Ignite',
    description: 'Marca lifestyle premium, foco em estética e status.',
    flagship: 'V50 / V80',
    products: [
      {
        name: 'Ignite V50',
        specs: [
          'Puffs: 5000',
          'Bateria: 500mAh Recarregável',
          'Sensor: Ativação por sucção',
          'Hardware: Acabamento emborrachado'
        ]
      },
      {
        name: 'Ignite V80',
        specs: [
          'Puffs: 8000',
          'Capacidade: 17ml',
          'Bateria: 550mAh',
          'Design: Bocal ergonômico'
        ],
        note: 'Preço elevado em comparação aos concorrentes.'
      }
    ]
  },
  {
    id: 'vaporesso',
    name: 'Vaporesso',
    description: 'Referência em Pod Systems abertos e tecnologia de atomização.',
    flagship: 'XROS Series',
    products: [
      {
        name: 'XROS 3 / 4',
        specs: [
          'Bateria: 1000mAh de alta densidade',
          'Chipset: AXON Chip (Pulse Mode)',
          'Cartucho: Tecnologia COREX (Sabor)',
          'Leak-proof: Tecnologia SSS'
        ]
      },
      {
        name: 'LUXE XR Max',
        specs: [
          'Potência: 80W',
          'Bateria: 2800mAh Ultra-High Density',
          'Compatibilidade: Coils GTX',
          'Estilo: DTL (Direct to Lung)'
        ]
      }
    ]
  },
  {
    id: 'geekvape',
    name: 'GeekVape',
    description: 'Durabilidade extrema e construção robusta (IP68).',
    flagship: 'Aegis Series',
    products: [
      {
        name: 'Aegis Legend 2 (L200)',
        specs: [
          'Proteção: IP68 (Água, Poeira, Choque)',
          'Potência: 200W',
          'Baterias: 2x 18650 Externas',
          'Trava: A-Lock (Bloqueio lateral)'
        ]
      },
      {
        name: 'Sonder U',
        specs: [
          'Estilo: Pod System Básico',
          'Bateria: 1000mAh',
          'Cartucho: 0.7ohm Integrado',
          'Foco: Custo-benefício'
        ]
      }
    ]
  },
  {
    id: 'zyn',
    name: 'Zyn',
    description: 'Sachês de nicotina (Nicotine Pouches) sem tabaco.',
    flagship: 'Zyn Slim',
    products: [
      {
        name: 'Zyn Cool Mint',
        specs: [
          'Formato: Slim Pouch',
          'Nicotina: 3mg, 6mg ou 9mg',
          'Composição: Fibras vegetais, sais de nicotina',
          'Uso: Gengival (Não gera fumaça)'
        ],
        note: 'Popularização rápida como alternativa "discreta".'
      }
    ]
  },
  {
    id: 'nasty',
    name: 'Nasty',
    description: 'Famosa mundialmente pelos e-liquids "Low Mint".',
    flagship: 'Nasty Fix',
    products: [
      {
        name: 'Nasty Fix Go',
        specs: [
          'Puffs: 5000',
          'Airflow: Ajustável (Airfix)',
          'Sabores: Baseados na linha de Juices premiada',
          'Formato: Pen Style'
        ]
      },
      {
        name: 'Nasty Juice (E-liquid)',
        specs: [
          'Linhas: Cush Man, Slow Blow',
          'Embalagem: Alumínio (Signature)',
          'Tipo: Freebase e NicSalt'
        ]
      }
    ]
  },
  {
    id: 'oxbar',
    name: 'Oxbar',
    description: 'Design jovem, transparente e acessórios inclusos.',
    flagship: 'G8000',
    products: [
      {
        name: 'G8000',
        specs: [
          'Puffs: 8000',
          'Design: Carcaça transparente',
          'Acessório: Lanyard (Cordão) incluso',
          'Bateria: 650mAh'
        ]
      },
      {
        name: 'Magic Maze Pro',
        specs: [
          'Puffs: 10000',
          'Controle: Wattagem ajustável',
          'Display: Tela lateral de LED'
        ]
      }
    ]
  },
  {
    id: 'nikbar',
    name: 'NikBar',
    description: 'Marca com forte presença e adaptação ao mercado brasileiro.',
    flagship: 'NikBar 6000',
    products: [
      {
        name: 'NikBar 6000',
        specs: [
          'Puffs: 6000',
          'Design: Garrafinha ergonômica',
          'Bateria: Recarregável USB-C',
          'Sabores: Focados no paladar tropical'
        ]
      },
      {
        name: 'NikBar 12000',
        specs: [
          'Puffs: 12000',
          'Indicador: LED de bateria e líquido',
          'Coil: Dual Mesh'
        ]
      }
    ]
  },
  {
    id: 'voopoo',
    name: 'Voopoo',
    description: 'Tecnologia de chips (GENE) e velocidade de disparo.',
    flagship: 'Drag Series',
    products: [
      {
        name: 'Drag S / X Pro',
        specs: [
          'Chip: GENE.FAN 3.0',
          'Tanque: TPP X Pod Tank',
          'Ativação: Botão ou Sucção',
          'Material: Liga de zinco e couro'
        ]
      }
    ]
  },
  {
    id: 'smok',
    name: 'Smok',
    description: 'Pioneira na massificação de Pod Systems e Coils sub-ohm.',
    flagship: 'Nord / Novo',
    products: [
      {
        name: 'Novo 4 / 5',
        specs: [
          'Airflow: Roda de ajuste de entrada de ar',
          'Tela: OLED pequena para infos',
          'Coils: LP1 (Leak Proof)',
          'Tamanho: Compacto'
        ]
      }
    ]
  },
  {
    id: 'vuse',
    name: 'Vuse',
    description: 'Marca de "Big Tobacco" (BAT), foco em sistemas fechados.',
    flagship: 'Vuse ePod 2',
    products: [
      {
        name: 'Vuse ePod 2',
        specs: [
          'Sistema: Fechado (Cartuchos pré-carregados)',
          'Design: Angular, metálico',
          'Carregamento: Magnético proprietário',
          'Nicotina: Sais de nicotina'
        ]
      },
      {
        name: 'Vuse Go',
        specs: [
           'Tipo: Descartável',
           'Puffs: 700 a 5000 (dependendo da versão)',
           'Foco: Conveniência imediata'
        ]
      }
    ]
  },
  {
    id: 'velo',
    name: 'Velo',
    description: 'Sachês de nicotina da BAT, concorrente direto do Zyn.',
    flagship: 'Velo Pouches',
    products: [
      {
        name: 'Velo Max',
        specs: [
          'Formato: Pouch',
          'Sabores: Menta, Frutas Vermelhas',
          'Intensidade: Pontos (Dots system)',
          'Origem: Evolução da marca Lyft'
        ]
      }
    ]
  }
];

export const TECH_COMPARISON_BATTERY: TechSpec[] = [
  { model: 'GeekVape L200', battery: 3000, features: ['Dual 18650 (Est.)'] },
  { model: 'Vaporesso Luxe XR', battery: 2800, features: [] },
  { model: 'Airistech Nokiva', battery: 2200, features: [] },
  { model: 'Airmez X-Beats', battery: 1000, features: [] },
  { model: 'Airmez Matrix', battery: 850, features: [] },
  { model: 'HQD Cuvie Air', battery: 650, features: [] },
  { model: 'Elfbar BC4000', battery: 650, features: [] },
  { model: 'Hannya Airtok', battery: 650, features: [] },
  { model: 'Ignite V50', battery: 500, features: [] },
];

export const TECH_COMPARISON_PUFFS: TechSpec[] = [
  { model: 'Airmez X-Beats', battery: 0, puffs: 40000, features: [] },
  { model: 'Airmez Matrix', battery: 0, puffs: 25000, features: [] },
  { model: 'NikBar 12000', battery: 0, puffs: 12000, features: [] },
  { model: 'Oxbar Magic Maze', battery: 0, puffs: 10000, features: [] },
  { model: 'Ignite V80', battery: 0, puffs: 8000, features: [] },
  { model: 'Elfbar BC5000', battery: 0, puffs: 5000, features: [] },
  { model: 'HQD Cuvie Air', battery: 0, puffs: 4000, features: [] },
];
