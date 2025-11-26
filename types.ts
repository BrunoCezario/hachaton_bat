
export interface SearchResult {
  text: string;
  sources: GroundingChunk[];
  csvData?: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export enum ProductCategory {
  DISPOSABLE = 'Pod Descartável',
  DEVICE = 'Vaporizadores e Mods',
  JUICE = 'Juices / E-Liquids',
  POUCH = 'Sachês de Nicotina (Nicopods)',
  ACCESSORY = 'Acessórios e Coils'
}

export interface Brand {
  id: string;
  name: string;
  category: ProductCategory;
  popular: boolean;
}

export type DashboardView = 'overview' | 'brands' | 'comparison' | 'regulatory' | 'news' | 'report-channels' | 'media-search';

export interface TechSpec {
  model: string;
  battery: number; // mAh
  puffs?: number;
  capacity?: string; // ml
  features: string[];
}

export interface BrandAnalysisData {
  id: string;
  name: string;
  manufacturer: string;
  description: string;
  flagship: string;
  products: {
    name: string;
    specs: string[];
    note?: string;
  }[];
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  source: string;
  summary: string;
  url?: string;
  type: 'seizure' | 'operation' | 'regulation';
}

export type SocialPlatform = 'youtube' | 'tiktok' | 'instagram' | 'x';

export interface SocialMediaMention {
  id: string;
  platform: SocialPlatform;
  author: string;
  content: string;
  url: string;
  date: string;
  sentiment: 'risk' | 'neutral' | 'promo';
  likes?: string;
}