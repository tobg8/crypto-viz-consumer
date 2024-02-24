export interface IChartData {
  data: {
    id: number;
    name: string;
    symbol: string;
    quotes: IQuotes[];
  };
}

export interface IQuotes {
  timeOpen: string;
  timeClose: string;
  timeHigh: string;
  timeLow: string;
  quote: {
    open: string;
    high: string;
    low: string;
    close: string;
    volume: number;
    marketCap: number;
    timestamp: string;
  };
}

export interface IChart {
  collectionId: string;
  collectionName: string;
  created: string;
  currency: string;
  id: string;
  range: string;
  timestamp: string;
  type: string;
  updated: string;
  value: string;
}
