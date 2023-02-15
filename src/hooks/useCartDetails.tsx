/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { type AxiosError } from 'axios';
import useSWR from 'swr';

import type { Cart } from '../types/types';

const fetcher = async (url: string) => {
  const res = await axios.get<Cart>(url);
  return res.data;
};

function useCartDetails(id: string) {
  const { data, ...rest } = useSWR<Cart, AxiosError>(`/api/carts/${id}`, fetcher);

  return {
    data,
    products: data?.products,
    ...rest,
  };
}

export default useCartDetails;
