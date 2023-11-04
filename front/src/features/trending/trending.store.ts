import axios from 'axios';
import { ITrending } from 'core/trending';
import { create } from 'zustand';

interface IUseTrendingStore {
  isLoading: boolean;
  error: string | null;
  itemsTrending: ITrending[];
  fetchTrending: () => void;
  reset: () => void;
}

const defaultValue = {
  itemsTrending: [],
  isLoading: false,
  error: null,
};

class TrendingStore {
  useStore = create<IUseTrendingStore>()((set) => ({
    ...defaultValue,
    reset: () =>
      set(() => ({
        ...defaultValue,
      })),

    fetchTrending: async () => {
      try {
        set({ isLoading: true, error: null });
        const updatedTrending = await axios.get(
          'http://localhost:3001/search/trending'
        );
        set(() => ({
          itemsTrending: updatedTrending.data.coins,
          isLoading: false,
        }));
      } catch (error) {
        set({ error: 'Failed to fetch trending', isLoading: false });
      }
    },
  }));
}

export default new TrendingStore();
