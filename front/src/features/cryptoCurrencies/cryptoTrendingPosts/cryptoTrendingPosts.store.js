import { create } from 'zustand';
import { getTrendingPosts } from '../../../services/cryptoCurrenciesApi';

export const trendingPostsStore = create()((set, get) => ({
  trendingPostsItems: [],
  isLoading: false,
  error: null,

  getTrendingPosts: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await getTrendingPosts();
      set({
        trendingPostsItems: data.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: 'Error occurred when fetching trending posts',
        isLoading: false,
      });
    }
  },
}));
