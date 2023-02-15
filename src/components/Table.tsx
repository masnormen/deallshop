import { memo } from 'react';
import type { ColumnDef, SortingState, SortDirection } from '@tanstack/react-table';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

// import { generateEnumFilterFn, generateDateFilterFn } from '../lib/generateFilterFn';
import type { Product } from '../types/types';
import type { DeallShopStoreState } from '../types/store';

const sortIcon: Record<SortDirection, string> = {
  asc: '↑',
  desc: '↓',
};

function filterData(rows: Product[], filter: DeallShopStoreState) {
  return rows.filter((row) => {
    // Guard statements for filtering
    if (
      filter?.product != null &&
      filter.product.length > 0 &&
      !row.title.toLocaleLowerCase().includes(filter.product.toLocaleLowerCase())
    ) {
      return false;
    }
    if (filter?.brand != null && row.brand !== filter.brand) return false;
    if (filter?.category != null && row.category !== filter.category) return false;
    if (filter?.minPrice != null && row.price < filter.minPrice) return false;
    if (filter?.maxPrice != null && row.price > filter.maxPrice) return false;
    return true;
  });
}

interface TableProps<T extends object> {
  rows: T[];
  columns: ColumnDef<T>[];
  hiddenColumns?: (keyof T)[];
  filters: DeallShopStoreState;
}

function Table<T extends object>({ rows, columns, hiddenColumns, filters }: TableProps<T>): JSX.Element {
  const data = useMemo(() => filterData(rows as Product[], filters), [rows, filters]) as T[];
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    enableSortingRemoval: false,
    state: {
      columnVisibility: { ...Object.fromEntries(hiddenColumns?.map((c) => [c, false]) ?? []) },
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="w-full overflow-x-auto rounded-md bg-gray-200 p-0.5 shadow-md">
        <table className="w-full border-spacing-0 bg-white text-sm">
          <thead className="rounded-lg border-b-2 bg-sky-100 text-center">
            {table.getHeaderGroups().map(({ headers, id }) => (
              <tr key={id}>
                {headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-r-2 border-gray-200 px-4 py-3 font-bold uppercase text-gray-700 last:border-r-0"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sortIcon[header.column.getIsSorted() as SortDirection] ?? ''}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(({ id, original, getVisibleCells }) => (
              <tr key={id} className={`border-b `}>
                {getVisibleCells().map((cell) => (
                  <td
                    className="whitespace-nowrap border-r border-gray-200 px-4 py-3 text-gray-700 last:border-r-0"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <span className="mr-6 flex cursor-pointer items-center">
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <button
          type="button"
          className="cursor-pointer select-none rounded rounded-r-none border-2 border-r-0 border-gray-200 bg-white px-2 py-0.5 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-75"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          ⬅️
        </button>
        <button
          type="button"
          className="cursor-pointer select-none rounded rounded-l-none border-2 border-l-0 border-gray-200 bg-white px-2 py-0.5 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-75"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          ➡️
        </button>
      </div>
    </>
  );
}

Table.displayName = 'Table';

export default memo(Table) as typeof Table;
