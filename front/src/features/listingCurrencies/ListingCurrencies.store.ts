import { create } from 'zustand';
import axios from 'axios';
import {
  IListingCrypto,
  ICurrencyCryto,
  ICryptocurrencis,
} from 'core/listingCurrencies';

interface IUseListingCurrenciesStore {
  isLoading: boolean;
  error: string | null;
  itemsListing: IListingCrypto[];
  itemsCurrency: ICurrencyCryto[];
  merged: ICryptocurrencis[];
  fetchListing: () => void;
  fetchCurrency: () => void;
  itemsMerged: () => void;
}

const useListingCurrenciesStore = create<IUseListingCurrenciesStore>(
  (set, get) => ({
    itemsListing: [] as IListingCrypto[],
    itemsCurrency: [] as ICurrencyCryto[],
    merged: [] as ICryptocurrencis[],
    isLoading: false,
    error: null,
    fetchListing: async () => {
      try {
        set({ isLoading: true, error: null });
        const eventSource = new EventSource('http://localhost:3001/listings');
        eventSource.onmessage = (event) => {
          const updatedArticle = JSON.parse(event.data);
          set(() => ({
            itemsListing: updatedArticle,
            isLoading: false,
          }));
        };
      } catch (error) {
        set({ error: 'Failed to fetch listing', isLoading: false });
      }
    },

    fetchCurrency: async () => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.get('http://localhost:3001/currencies');
        set({ itemsCurrency: response.data, isLoading: false });
      } catch (error) {
        set({ error: 'Failed to fetch currency', isLoading: false });
      }
    },

    itemsMerged: () => {
      const { itemsCurrency, itemsListing } = get();

      const mergedItems =
        itemsListing &&
        itemsListing.map((item1) => {
          const matchingItem2 =
            itemsCurrency &&
            itemsCurrency.find((item2) => item2?.id === item1?.currency_id);

          return {
            ...item1,
            ...matchingItem2,
          };
        });

      set({ merged: mergedItems });
    },
  })
);

export default useListingCurrenciesStore;
