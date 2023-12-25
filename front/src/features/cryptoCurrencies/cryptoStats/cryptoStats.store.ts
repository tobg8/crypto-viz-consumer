import { create } from 'zustand';
import { getCoinStats } from '../../../services/cryptoCurrenciesApi';
import { ICryptoStats } from './core/interfaces';

interface IUseCoinStatsStore {
  isLoading: boolean;
  error: string | null;
  coinStatsItems: ICryptoStats[];
  getCoinStats: () => void;
}

export const useCoinStatsStore = create<IUseCoinStatsStore>()((set) => ({
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
