export interface ICurrencyCryto {
  articles: string[];
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  identifier: string;
  image_url: string;
  listing: string[];
  name: string;
  symbol: string;
  updated: string;
}

export interface IListingCrypto {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date_: string;
  circulating_supply: number;
  collectionId: string;
  collectionName: string;
  created: string;
  currency_id: string;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  kafka_id: string;
  low_24h: number;
  market_cap: number;
  market_cap_rank: number;
  max_supply: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  total_supply: number;
  total_volume: number;
  updated: string;
}

export interface ICryptocurrencis {
  articles?: string[];
  identifier?: string;
  image_url?: string;
  listing?: string[];
  name?: string;
  symbol?: string;
  ath?: number;
  ath_change_percentage?: number;
  ath_date?: string;
  atl?: number;
  atl_change_percentage?: number;
  atl_date_?: string;
  circulating_supply?: number;
  collectionId?: string;
  collectionName?: string;
  created?: string;
  currency_id?: string;
  current_price?: number;
  fully_diluted_valuation?: number;
  high_24h?: number;
  id?: string;
  kafka_id?: string;
  low_24h?: number;
  market_cap?: number;
  market_cap_rank?: number;
  max_supply?: number;
  price_change_24h?: number;
  price_change_percentage_24h?: number;
  total_supply?: number;
  total_volume?: number;
  updated?: string;
}
