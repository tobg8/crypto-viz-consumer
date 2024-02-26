import { IArticles } from 'core/articles';
import { create } from 'zustand';

interface IUseHomePageArticlesStore {
  isLoading: boolean;
  error: string | null;
  itemsArtciles: IArticles[];
  fetchHomePageArticles: () => void;
  reset: () => void;
}
const defaultValue = {
  itemsArtciles: [],
  isLoading: false,
  error: null,
};

class HomePageArticlesStore {
  useStore = create<IUseHomePageArticlesStore>()((set) => ({
    ...defaultValue,
    reset: () =>
      set(() => ({
        ...defaultValue,
      })),

    fetchHomePageArticles: async () => {
      try {
        set({ isLoading: true, error: null });
        const eventSource = new EventSource('http://localhost:3001/articles',  {withCredentials: true});
        eventSource.onmessage = (event) => {
          const updatedArticle = JSON.parse(event.data);
          set(() => ({
            itemsArtciles: updatedArticle,
            isLoading: false,
          }));
        };
      } catch (error) {
        set({ error: 'Failed to fetch articles', isLoading: false });
      }
    },
  }));
}

export default new HomePageArticlesStore();
