import { create } from 'zustand';
import { getDataHLCChart } from 'services/cryptoCurrenciesApi';
import { IChartData, IQuotes } from 'core/chartCandles';

interface IUseChartCandlesStore {
  isLoading: boolean;
  error: string | null;
  chartData: IChartData[];
  fetchData: () => void;
}

const usecCartCandlesStore = create<IUseChartCandlesStore>()((set) => ({
  chartData: [],
  isLoading: false,
  error: null,

  fetchData: async () => {
    try {
      set({ isLoading: true, error: null });

      // const response = await getDataHLCChart();
      // const data = response.data.data.quotes.map((quote: IQuotes) => [
      //   new Date(quote.quote.timestamp).getTime(),
      //   parseFloat(quote.quote.open),
      //   parseFloat(quote.quote.high),
      //   parseFloat(quote.quote.low),
      //   parseFloat(quote.quote.close),
      // ]);

      // set({ chartData: data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch data', isLoading: false });
    }
  },
}));

export default usecCartCandlesStore;
