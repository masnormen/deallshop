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
    `/api/carts?skip=0&limit=20`,
    fetcher
  );

  return {
    data: data?.products,
    ...rest,
  };
}

export default useProducts;
