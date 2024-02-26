import { create } from 'zustand';
import axios from 'axios';
import {
  IListingCrypto,
  ICurrencyCryto,
  ICryptocurrencis,
} from 'core/listingCurrencies';

interface IListingCurrenciesStore {
  isLoading: boolean;
  error: string | null;
  itemsListing: IListingCrypto[];
  itemsCurrency: ICurrencyCryto[];
  merged: ICryptocurrencis[];
  itemsByCurrencyId: ICryptocurrencis[];
  fetchListing: () => void;
  fetchCurrency: () => void;
  itemsMerged: () => void;
  reset: () => void;
}

const defaultValue = {
  itemsListing: [] as IListingCrypto[],
  itemsCurrency: [] as ICurrencyCryto[],
  merged: [] as ICryptocurrencis[],
  itemsByCurrencyId: [] as ICryptocurrencis[],
  isLoading: false,
  error: null,
};

class ListingCurrenciesStore {
  useStore = create<IListingCurrenciesStore>((set, get) => ({
    ...defaultValue,
    reset: () =>
      set(() => ({
        ...defaultValue,
      })),

    fetchCurrency: async () => {
      try {
        set({ isLoading: true, error: null });
        const response = await axios.get('http://localhost:3001/currencies', {withCredentials: true});
        set({ itemsCurrency: response.data, isLoading: false });
      } catch (error) {
        set({ error: 'Failed to fetch currency', isLoading: false });
      }
    },

    fetchListing: async () => {
      try {
        set({ isLoading: true, error: null });
        const eventSource = new EventSource('http://localhost:3001/listings', {withCredentials: true});
        eventSource.onmessage = (event) => {
          const updatedListings = JSON.parse(event.data);
          const { itemsListing } = get();
          const newItemsListing = [...itemsListing];

          updatedListings.forEach((updatedListing: IListingCrypto) => {
            const index = newItemsListing.findIndex(
              (item) => item.currency_id === updatedListing.currency_id
            );
            if (index !== -1) {
              newItemsListing[index] = updatedListing;
            } else {
              newItemsListing.push(updatedListing);
            }
          });

          set({ itemsListing: newItemsListing, isLoading: false });
        };

        eventSource.onerror = () => {

          eventSource.close()
        };
      } catch (error) {
        set({ error: 'Failed to fetch listing', isLoading: false });
      }
    },

    itemsMerged: () => {
      const { itemsCurrency, itemsListing } = get();
      set({ isLoading: true, error: null });

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

      set({ merged: mergedItems, isLoading: false });
    },
  }));
}

export default new ListingCurrenciesStore();
