import { create } from 'zustand';
import { getCoinStats } from '../../../services/cryptoCurrenciesApi';

export const coinStatsStore = create()((set) => ({
  coinStatsItems: [],
  isLoading: false,
  error: null,

  getCoinStats: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await getCoinStats();
      set({
        coinStatsItems: data.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: 'Error occurred when fetching coin stats',
        isLoading: false,
      });
    }
  },
}));
