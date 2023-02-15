/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import type { ColumnDef } from '@tanstack/react-table';

import Table from '../../components/Table';

import type { Cart, CartProduct } from '../../types/types';
import { useMemo } from 'react';

import useCarts from '../../hooks/useCarts';
import Link from 'next/link';
import Head from 'next/head';

function Home() {
  const columns = useMemo<ColumnDef<Cart>[]>(
    () => [
      {
        header: 'Cart Details',
        accessorKey: 'id',
        cell: (row) => (
          <Link href={`/carts/${row.getValue() as string}`}>
            <button
              type="button"
              className="relative w-full rounded-lg border-2 border-gray-200 bg-white py-2 px-2 shadow-md hover:bg-gray-300 hover:outline-none focus:ring-0 sm:text-sm"
            >
              Go to Cart #{row.getValue() as string}
            </button>
          </Link>
        ),
      },
      {
        header: 'Products',
        accessorKey: 'products',
        cell: (row) => (
          <div className="flex w-full flex-col space-y-1">
            {row.getValue<CartProduct[]>().map((item, idx) => (
              <div
                key={idx}
                className="w-fit space-x-2 rounded-lg bg-amber-500 px-1.5 py-1 text-xs font-semibold uppercase text-white"
              >
                <span>{item.title}</span>
                <span className="line-through opacity-60">${item.price}</span>
                <span>${item.discountedPrice}</span>
                <span>x {item.quantity}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        header: 'Price',
        accessorKey: 'discountedTotal',
        cell: (row) => (
          <div className="flex font-bold">
            <span className="line-through opacity-40">${row.row.original.total}</span>&nbsp;$
            <span>{row.getValue() as string}</span>
          </div>
        ),
      },
    ],
    []
  );
  const { data: rows, isLoading } = useCarts();

  return (
    <>
      <Head>
        <title>Carts</title>
      </Head>
      <main className="bg-mesh flex min-h-screen flex-col items-center justify-center from-yellow-200 via-red-500 to-fuchsia-500 bg-fixed">
        <div className="container flex max-w-4xl flex-col items-center justify-center space-y-6 px-8 py-32 lg:py-48 lg:px-12">
          <div className="flex flex-row space-x-4">
            <Link href="/">
              <button
                type="button"
                className="relative w-full rounded-lg border-2 border-gray-200 bg-white py-2 px-2 text-lg shadow-md hover:bg-gray-300 hover:outline-none focus:ring-0"
              >
                Products
              </button>
            </Link>
            <Link href="/carts">
              <button
                type="button"
                className="relative w-full rounded-lg border-2 border-blue-300 bg-blue-500 py-2 px-2 text-lg text-white shadow-md hover:bg-blue-600 hover:outline-none focus:ring-0"
              >
                Carts
              </button>
            </Link>
          </div>
          <div className="flex w-full flex-col space-y-6">
            <Table<Cart> isLoading={isLoading} columns={columns} rows={rows ?? []} hiddenColumns={[]} />
          </div>
          <footer className="flex space-y-3 pt-24 text-center text-gray-800">
            <div>
              Created by{' '}
              <a href="https://github.com/masnormen/" className="font-bold text-sky-800">
                Nourman Hajar
              </a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}

export default Home;
