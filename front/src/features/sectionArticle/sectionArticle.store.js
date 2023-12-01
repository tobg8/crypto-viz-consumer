import { create } from 'zustand';
import { getHomePageArticles } from '../../services/homePageApi';

const useHomePageArticlesStore = create()((set) => ({
  itemsArtciles: [],
  isLoading: false,
  error: null,

  fetchHomePageArticles: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getHomePageArticles();
      set({ itemsArtciles: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch articles', isLoading: false });
    }
  },
}));

export default useHomePageArticlesStore;
