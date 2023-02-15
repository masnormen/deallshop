/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { type AxiosError } from 'axios';
import useSWR from 'swr';

import type { DummyResponse, Product } from '../types/types';

const fetcher = async (url: string) => {
  const res = await axios.get<DummyResponse<'products', Product>>(url);
  return res.data;
};

function useProducts() {
  const { data, ...rest } = useSWR<DummyResponse<'products', Product>, AxiosError>(
    `/api/products?skip=0&limit=100`,
    fetcher
  );

  const brands = [...new Set(data?.products.map((item) => item.brand))];
  const categories = [...new Set(data?.products.map((item) => item.category))];

  return {
    data: data?.products,
    brands,
    categories,
    ...rest,
  };
}

export default useProducts;
