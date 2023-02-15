import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { DeallShopStore } from '../types/store';

export const useDeallShopStore = create(
  persist<DeallShopStore>(
    (set) => ({
      isFilterExpanded: false,
      product: null,
      brand: null,
      category: null,
      minPrice: null,
      maxPrice: null,
      setFilterExpanded: (state) => set(() => ({ isFilterExpanded: state })),
      setProduct: (state) => set(() => ({ product: state })),
      setBrand: (state) => set(() => ({ brand: state })),
      setCategory: (state) => set(() => ({ category: state })),
      setMinPrice: (state) => set(() => ({ minPrice: state })),
      setMaxPrice: (state) => set(() => ({ maxPrice: state })),
    }),
    {
      name: 'product-filters',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
