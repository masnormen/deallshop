/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { type AxiosError } from 'axios';
import useSWR from 'swr';

import type { Cart, DummyResponse } from '../types/types';

const fetcher = async (url: string) => {
  const res = await axios.get<DummyResponse<'carts', Cart>>(url);
  return res.data;
};

function useCarts() {
  const { data, ...rest } = useSWR<DummyResponse<'carts', Cart>, AxiosError>(`/api/carts?skip=0&limit=20`, fetcher);

  return {
    data: data?.carts,
    ...rest,
  };
}

export default useCarts;
