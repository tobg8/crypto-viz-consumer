import { create } from 'zustand';
import { IArticles } from 'features/sectionArticle/core/interfaces';
import { getTrendingPosts } from 'services/cryptoCurrenciesApi';

interface IUsetrendingPostsStore {
  isLoading: boolean;
  error: string | null;
  trendingPostsItems: IArticles[];
  getTrendingPosts: () => void;
}

export const usetrendingPostsStore = create<IUsetrendingPostsStore>()(
  (set) => ({
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
  })
);
