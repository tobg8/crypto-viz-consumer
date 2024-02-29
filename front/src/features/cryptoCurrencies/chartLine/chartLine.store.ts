import { IChart } from 'core/chartCandles';
import { create } from 'zustand';

interface IFetchData {
  symbol: string | undefined;
  chartType: string;
  range: number;
}

interface IChartLineStore {
  isLoading: boolean;
  error: string | null;
  chartData: unknown[];
  fetchData: (options: IFetchData) => void;
  reset: () => void;
  sortValue: string;
  setSortValue: (sortValue: string) => void;
  openTrandingView: boolean;
  setOpenTrandingView: (openPopUp: boolean) => void;
}

const defaultValue = {
  chartData: [],
  isLoading: false,
  error: null,
  sortValue: '',
  openTrandingView: false,
};

class ChartLineStore {
  useStore = create<IChartLineStore>()((set) => ({
    ...defaultValue,

    reset: () =>
      set(() => ({
        ...defaultValue,
      })),

    setOpenTrandingView: (openTrandingView: boolean) => {
      set(() => ({
        openTrandingView,
      }));
    },
    setSortValue: (sortValue: string) => {
      set(() => ({
        sortValue,
      }));
    },
    fetchData: async ({ symbol, chartType, range }) => {
      try {
        set({ isLoading: true, error: null });

        const eventSource = new EventSource(
          `http://localhost:3001/prices/${symbol}/${chartType}/${range}`
        );

        eventSource.onmessage = (event) => {
          const updatedArticle = JSON.parse(event.data);
          const transformedData = updatedArticle.map((item: IChart) => [
            parseInt(item.timestamp),
            parseFloat(item.value),
          ]);

          set(() => ({
            chartData: transformedData,
            isLoading: false,
          }));
        };
      } catch (error) {
        set({ error: 'Failed to fetch data', isLoading: false });
      }
    },
  }));
}

export default new ChartLineStore();
