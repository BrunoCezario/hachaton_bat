
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SearchResult, GroundingChunk, NewsItem, SocialMediaMention } from "../types";
import { KNOWN_TARGETS } from "../constants";



const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const searchProductLinks = async (query: string): Promise<SearchResult> => {
  try {
    const prompt = `
      Você é um assistente de auditoria digital e conformidade regulatória (RDC 46/2009).
      
      O usuário está investigando: "${query}".
      
      TAREFAS DE INVESTIGAÇÃO:
      1. MARKETPLACES & SITES: Busque no Mercado Livre, Shopee, AliExpress, Facebook Marketplace e sites independentes ("Vape Shops").
      2. REDES SOCIAIS & CANAIS:
         - Busque perfis no **Instagram**, **TikTok** e **Facebook** que divulgam a venda.
         - Identifique canais de **WhatsApp** ou **Telegram** usados para transação direta.
         - Anote @usuarios (handles) e links de "Bio".
      3. EXTRAÇÃO DE DADOS (CRUCIAL):
         - **Marca**: Identifique a marca do fabricante (ex: Elfbar, Ignite, Vaporesso).
         - **Contato**: Busque ativamente por WhatsApp, Telefone ou E-mail visíveis na página ou perfil.
         - **Vendedor**: Nome da loja, CNPJ ou Nome do Perfil Social.
      4. ALVOS CONHECIDOS (PRIORIDADE):
         Verifique se o produto ou termos relacionados aparecem nestes domínios de monitoramento prioritário:
         ${KNOWN_TARGETS.join(', ')}
      
      FORMATO DA RESPOSTA (MARKDOWN RICO):
      
      ### 🚨 Resumo da Auditoria
      [Resumo breve da disponibilidade e principais redes de divulgação encontradas, mencionando se foi encontrado nos alvos prioritários]

      ---

      ### 📦 Evidências Coletadas (Lojas e Anúncios)
      [Use este formato para e-commerces e marketplaces]:
      
      > **Produto:** [Título do Anúncio]
      > 🏷️ **Marca:** [Marca identificada] | 📂 **Categoria:** [Categoria]
      > 💰 **Preço:** [Valor]
      > 📞 **Contato/WhatsApp:** [Número ou "Não identificado"]
      > 🏪 **Vendedor:** [Nome da Loja/CNPJ]
      > 🔗 **Link:** [URL Válida]
      > ⚠️ **Obs:** [Táticas de evasão usadas]

      ### 📱 Redes Sociais de Divulgação
      [Use este formato para Perfis de Instagram, TikTok, Facebook, Grupos]:
      
      > **Perfil/Canal:** [Nome do Perfil/Grupo]
      > 📸 **Plataforma:** [Instagram / TikTok / Facebook / WhatsApp / Discord]
      > 🔗 **Link/Handle:** [@usuario ou Link]
      > 📝 **Bio/Info:** [Resumo da bio ou contato na bio]
      > 🔄 **Vínculo:** [Link para site externo se houver]

      ---
      
      ARQUIVO CSV (OBRIGATÓRIO):
      Gere um bloco csv ao final com separador ponto e vírgula (;).
      Colunas: Plataforma;Categoria;Marca;Produto_ou_Perfil;Preco;Contato;Redes_Sociais_Divulgacao;Link_Evidencia
      
      \`\`\`csv
      Plataforma;Categoria;Marca;Produto_ou_Perfil;Preco;Contato;Redes_Sociais_Divulgacao;Link_Evidencia
      "Mercado Livre";"Pod Descartável";"Elfbar";"Capa Elfbar BC4000";"R$ 80,00";"(11) 99999-9999";"Não identificado";"https://produto.mercadolivre..."
      "Instagram";"Divulgação";"Ignite";"Perfil @VapeKingBr";"N/A";"Link na Bio";"@VapeKingBr";"https://instagram.com/vapekingbr"
      "Site Próprio";"Juice";"Nasty";"Nasty Juice 30ml";"R$ 60,00";"contato@lojailegal.com";"Insta: @lojailegal";"https://loja..."
      \`\`\`
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "Nenhum resultado encontrado.";
    
    // Extract CSV block
    const csvMatch = text.match(/```csv\n([\s\S]*?)\n```/);
    const csvData = csvMatch ? csvMatch[1] : undefined;
    
    // Remove CSV from display text
    const displayText = text.replace(/```csv[\s\S]*?```/, '');

    // Extract grounding chunks (sources)
    const sources: GroundingChunk[] = [];
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
       const chunks = response.candidates[0].groundingMetadata.groundingChunks;
       chunks.forEach((chunk: any) => {
         if (chunk.web) {
           sources.push({
             web: {
               uri: chunk.web.uri,
               title: chunk.web.title
             }
           });
         }
       });
    }

    return {
      text: displayText,
      sources,
      csvData
    };
  } catch (error: any) {
    console.error("Error in searchProductLinks:", error);
    throw new Error(error.message || "Falha ao realizar a auditoria.");
  }
};

export const fetchDynamicNews = async (): Promise<NewsItem[]> => {
  try {
    const today = new Date().toLocaleDateString('pt-BR');
    const prompt = `
      Contexto: Hoje é ${today}.
      Atue como um analista de inteligência regulatória no Brasil.
      
      TAREFA: Busque 5 notícias REAIS e EXTREMAMENTE RECENTES (prioridade para 2024 e 2025) sobre:
      - Apreensões de cigarros eletrônicos (vapes) pela Receita Federal, PF ou PRF.
      - Novas operações de fiscalização da ANVISA ou Procon.
      - Tramitação do PL 5008/2023 no Senado (CAE) ou novas regras.

      REGRAS RÍGIDAS DE VALIDAÇÃO:
      1. DATA: Ignore notícias de 2023 ou anteriores. Foque nos **últimos 3-6 meses**.
      2. ORDENAÇÃO: A primeira notícia do array DEVE ser a mais recente possível. Ordene da mais nova para a mais antiga.
      3. LINKS: Use a ferramenta de busca para garantir que o link exista. Se não encontrar o link exato, não invente. Valide que a URL não está quebrada (404).
      4. TEMA: Ignore apreensões de cigarros comuns (tabaco). O foco é VAPE/POD.

      FORMATO JSON (Sem Markdown extra):
      \`\`\`json
      [
        {
          "id": "guid-unico",
          "date": "DD/MM/AAAA",
          "title": "Título da manchete",
          "source": "Nome do Veículo",
          "summary": "Resumo curto.",
          "type": "seizure" | "operation" | "regulation",
          "url": "https://url-verdadeira..."
        }
      ]
      \`\`\`
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "[]";
    
    let jsonString = "[]";
    const codeBlockMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (codeBlockMatch) {
        jsonString = codeBlockMatch[1];
    } else {
        const arrayMatch = text.match(/\[[\s\S]*\]/);
        if (arrayMatch) jsonString = arrayMatch[0];
    }
    
    try {
        const newsData: NewsItem[] = JSON.parse(jsonString);
        if (Array.isArray(newsData)) {
            // Filter invalid items
            const filteredNews = newsData.filter(item => {
                // 1. Basic URL Validation
                if (!item.url || typeof item.url !== 'string' || item.url.length < 15) return false;
                const url = item.url.toLowerCase().trim();
                if (url === '#' || url.includes('example') || !url.startsWith('http')) return false;
                
                // 2. RELEVANCE CHECK
                const contentStr = (item.title + ' ' + item.summary).toLowerCase();
                const keywords = [
                    'vape', 'cigarro eletrônico', 'cigarro eletronico', 'pod', 
                    'def', 'dispositivo eletrônico', 'e-liquid', 'juice', 
                    'vaporizador', 'nicotina líquida', 'eletrônicos para fumar', 'contrabando', 'apreensão'
                ];
                
                const hasKeyword = keywords.some(k => contentStr.includes(k));
                if (!hasKeyword) return false;

                // 3. Filter generic homepages
                const slashCount = (url.match(/\//g) || []).length;
                if (slashCount < 3) return false;

                return true;
            });

            // STRICT SORTING (Newest to Oldest)
            // Helper to parse DD/MM/YYYY
            const parseDate = (dateStr: string) => {
                try {
                    const parts = dateStr.split('/');
                    if (parts.length === 3) {
                        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                    }
                } catch (e) { return new Date(0); }
                return new Date(0);
            };

            return filteredNews.sort((a, b) => {
                return parseDate(b.date).getTime() - parseDate(a.date).getTime();
            });
        }
    } catch (e) {
        console.warn("Failed to parse news JSON from AI response:", e);
    }
    return [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const searchSocialMedia = async (query: string): Promise<SocialMediaMention[]> => {
  try {
    const prompt = `
      Atue como uma ferramenta de "Social Listening" (Escuta Social).
      O usuário quer monitorar menções, vendas ilegais ou reviews do produto: "${query}".

      INSTRUÇÃO DE BUSCA:
      Utilize o Google Search para encontrar vídeos, postagens, shorts e tweets RECENTES nas plataformas:
      - YouTube (site:youtube.com)
      - TikTok (site:tiktok.com)
      - Instagram (site:instagram.com)
      - X / Twitter (site:twitter.com ou site:x.com)

      Busque por termos como "comprar ${query}", "review ${query}", "preço ${query}", "unboxing ${query}".

      TAREFA DE EXTRAÇÃO:
      Para cada resultado relevante encontrado, extraia ou infira os dados no formato JSON.
      Se o conteúdo for de venda ou promoção ilegal, marque sentiment como "promo".
      Se for alerta de saúde, marque sentiment como "risk".
      Se for review neutro, marque sentiment como "neutral".

      IMPORTANTE: O campo "platform" DEVE ser estritamente minúsculo: "youtube", "tiktok", "instagram" ou "x".

      Retorne APENAS um JSON array com até 8 itens.

      FORMATO JSON:
      \`\`\`json
      [
        {
          "id": "1",
          "platform": "youtube" | "tiktok" | "instagram" | "x",
          "author": "Nome do Canal ou @Usuario",
          "content": "Resumo do que é dito na descrição ou comentário (ex: 'Link de compra na bio', 'Review completo do sabor...')",
          "url": "URL do vídeo ou post",
          "date": "Data aproximada (ex: 'Há 2 dias', '20/09/2024')",
          "sentiment": "promo" | "risk" | "neutral",
          "likes": "Estimativa de views/likes (ex: '10k views', '50 likes')"
        }
      ]
      \`\`\`
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "[]";
    let jsonString = "[]";
    const codeBlockMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (codeBlockMatch) {
      jsonString = codeBlockMatch[1];
    } else {
      const arrayMatch = text.match(/\[[\s\S]*\]/);
      if (arrayMatch) jsonString = arrayMatch[0];
    }

    const mentions: SocialMediaMention[] = JSON.parse(jsonString);
    return mentions.filter(m => m.url && m.content); // Basic validation

  } catch (error) {
    console.error("Error searching social media:", error);
    return [];
  }
};
