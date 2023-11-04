import { create } from 'zustand';
import { getCoinStats } from '../../../services/cryptoCurrencies';

export const coinStatsStore = create()((set, get) => ({
  isLoading: false,
  coinStatsItems: [],

  /**
   * Fetch coin stats.
   */
  getCoinStats: async () => {
    set({ isLoading: true });
    try {
      const { data } = await getCoinStats();
      set({
        coinStatsItems: data.data,
        isLoading: false,
      });
    } catch (err) {
      console.log('Error occurred when fetching coin stats', err);
      throw err;
    }
  },
}));
