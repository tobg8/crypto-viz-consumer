import { create } from 'zustand';
import { getTrendingPosts } from '../../../services/cryptoCurrencies';

export const trendingPostsStore = create()((set, get) => ({
  isLoading: false,
  trendingPostsItems: [],

  /**
   * Fetch trending posts.
   */
  getTrendingPosts: async () => {
    set({ isLoading: true });
    try {
      const { data } = await getTrendingPosts();
      set({
        trendingPostsItems: data.data,
        isLoading: false,
      });
    } catch (err) {
      console.log('Error occurred when fetching trending posts', err);
      throw err;
    }
  },
}));
