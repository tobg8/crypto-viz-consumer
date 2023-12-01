import { create } from 'zustand';
import {
  fetchCurrencyCryto,
  fetchListingCrypto,
} from '../../services/listingApi';

const useListingCryptocurencyStore = create((set, get) => ({
  itemsListing: [],
  itemsCurrency: [],
  merged: [],

  isLoading: false,
  error: null,

  fetchListing: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetchListingCrypto();
      set({ itemsListing: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch listing', isLoading: false });
    }
  },

  fetchCurrency: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetchCurrencyCryto();
      set({ itemsCurrency: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch currency', isLoading: false });
    }
  },

  itemsMerged: () => {
    const { itemsCurrency, itemsListing } = get();

    const mergedItems =
      itemsListing.items &&
      itemsListing.items.map((item1) => {
        const matchingItem2 =
          itemsCurrency.items &&
          itemsCurrency.items.find((item2) => item2?.id === item1?.currency_id);

        return {
          ...item1,
          ...matchingItem2,
        };
      });

    set({ merged: mergedItems });
  },
}));

export default useListingCryptocurencyStore;
