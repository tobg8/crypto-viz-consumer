import { create } from 'zustand';
import { getDataHLCChart } from 'services/cryptoCurrenciesApi';
import { IChartData, IQuotes } from 'core/chartCandles';

interface IUseChartLineStore {
  isLoading: boolean;
  error: string | null;
  chartData: unknown[];
  fetchData: () => void;
}

const usecChartLineStore = create<IUseChartLineStore>()((set) => ({
  chartData: [],
  isLoading: false,
  error: null,

  fetchData: async () => {
    try {
      set({ isLoading: true, error: null });
      const symbol = 'btc';
      const chartType = 'chart';
      const range = 1;
      // const response = await getDataHLCChart(symbol, chartType, range);
      // console.log('response::=>', response);

      const eventSource = new EventSource(
        `http://localhost:3001/prices/${symbol}/${chartType}/${range}`
      );
      console.log('eventSource FROM STORE::=>', eventSource);

      eventSource.onmessage = (event) => {
        const updatedArticle = JSON.parse(event.data);
        console.log('updatedArticle FROM STORE::=>', updatedArticle);
        console.log('event FROM STORE::=>', event);
        set(() => ({
          chartData: updatedArticle,
          isLoading: false,
        }));
      };
      // const data = response.data.data.quotes.map((quote: IQuotes) => [
      //   new Date(quote.quote.timestamp).getTime(),
      //   parseFloat(quote.quote.open),
      //   parseFloat(quote.quote.high),
      //   parseFloat(quote.quote.low),
      //   parseFloat(quote.quote.close),
      // ]);

      // set({ chartData: response, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch data', isLoading: false });
    }
  },
}));

export default usecChartLineStore;
