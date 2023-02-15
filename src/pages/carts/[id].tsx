/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { useRouter } from 'next/router';

import Table from '../../components/Table';
import useCartDetails from '../../hooks/useCartDetails';

import type { ColumnDef } from '@tanstack/react-table';
import type { CartProduct } from '../../types/types';
import Link from 'next/link';

function CartDetails() {
  const router = useRouter();
  const { id } = router.query;

  const columns = useMemo<ColumnDef<CartProduct>[]>(
    () => [
      {
        header: 'Description',
        accessorKey: 'title',
        cell: (row) => (
          <div className="flex flex-row space-x-4">
            <>
              <div className="flex flex-col space-y-1">
                <div className="text-lg">{row.getValue() as string}</div>
                <span className="w-fit space-x-2 rounded-lg bg-blue-500 px-1.5 py-0.5 text-xs font-semibold text-white">
                  <span className="line-through opacity-60">${row.row.original.price}</span>
                  <span>${row.row.original.discountedPrice}</span>
                  <span>x {row.row.original.quantity}</span>
                </span>
              </div>
            </>
          </div>
        ),
      },
      {
        header: 'Price',
        accessorKey: 'price',
        cell: (row) => `$${row.getValue() as string}`,
      },
    ],
    []
  );

  const { products: rows, isLoading } = useCartDetails(id as string);

  return (
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
              className="relative w-full rounded-lg border-2 border-gray-200 bg-white py-2 px-2 text-lg shadow-md hover:bg-gray-300 hover:outline-none focus:ring-0"
            >
              Carts
            </button>
          </Link>
        </div>
        <h1 className="flex bg-gradient-to-t from-gray-900 to-gray-700 bg-clip-text text-center text-lg font-extrabold leading-relaxed text-transparent">
          Cart #{id}
        </h1>
        <div className="flex w-full flex-col space-y-6">
          <Table<CartProduct> isLoading={isLoading} columns={columns} rows={rows ?? []} hiddenColumns={[]} />
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
  );
}

export default CartDetails;
