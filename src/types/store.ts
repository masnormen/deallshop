export interface DeallShopStoreState {
  product: string | null;
  brand: string | null;
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
}
export interface DeallShopStore extends DeallShopStoreState {
  isFilterExpanded: boolean;
  setFilterExpanded: (state: boolean) => void;
  setProduct: (state: string | null) => void;
  setBrand: (state: string | null) => void;
  setCategory: (state: string | null) => void;
  setMinPrice: (state: number | null) => void;
  setMaxPrice: (state: number | null) => void;
}
