export interface ICryptoStats {
  data: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    date_added: string;
    num_market_pairs: number;
    cmc_rank: number;
    last_updated: string;
    tags: string[];
    quote: {
      USD: {
        price: number;
        volume_24h: number;
        volume_change_24h: number;
        percent_change_1h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        market_cap: number;
        market_cap_dominance: number;
        fully_diluted_market_cap: number;
        last_updated: string;
      };
    };
  };
}
