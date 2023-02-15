/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import type { ColumnDef } from '@tanstack/react-table';

import Search from '../../components/Search';
import Table from '../../components/Table';

import { useDeallShopStore } from '../../store/store';

import type { Product } from '../../types/types';
import { useEffect, useMemo, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import { Disclosure } from '@headlessui/react';
import FilterBox from '../../components/FilterBox';
import { useDebounce } from 'use-debounce';

import type { ChartData } from 'chart.js';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { countBy } from 'underscore';

import autocolors from 'chartjs-plugin-autocolors';
ChartJS.register(ArcElement, Tooltip, autocolors);

function getRandomColors(length: number) {
  return Array(length)
    .fill('')
    .map(() => `hsl(${360 * Math.random()},${20 + 70 * Math.random()}%,${75 + 10 * Math.random()}%)`);
}

const numberInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const eventCode = event.code.toLowerCase();
  if (
    !(
      event.code !== null &&
      (eventCode.includes('digit') ||
        eventCode.includes('arrow') ||
        eventCode.includes('home') ||
        eventCode.includes('end') ||
        eventCode.includes('backspace') ||
        (eventCode.includes('numpad') && eventCode.length === 7))
    )
  ) {
    event.preventDefault();
  }
};

function Home() {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        header: 'Description',
        accessorKey: 'title',
        cell: (row) => (
          <div className="flex flex-row space-x-4">
            <>
              <div
                className="block h-24 w-24 rounded-lg border-2 border-gray-100 bg-cover bg-center bg-no-repeat object-cover shadow-lg"
                style={{ backgroundImage: `url(${row.row.original.thumbnail})` }}
              />
              <div className="flex flex-col space-y-1">
                <div className="text-lg">{row.getValue() as string}</div>
                <div className="w-fit rounded-lg bg-blue-500 px-1.5 py-0.5 text-xs font-semibold uppercase text-white">
                  {row.row.original.brand}
                </div>
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
      {
        header: 'Stock',
        accessorKey: 'stock',
        cell: (row) => row.getValue() as number,
      },
      {
        header: 'Category',
        accessorKey: 'category',
        cell: (row) => (row.getValue() as string).toLocaleUpperCase(),
      },
      // {
      //   header: 'Status',
      //   accessorKey: 'status',
      //   cell: (row) => (
      //     <span
      //       className={`px-1.5 py-1 ${
      //         statusColor[row.getValue() as Status]
      //       } rounded-lg text-xs font-semibold uppercase text-white`}
      //     >
      //       {row.getValue() as string}
      //     </span>
      //   ),
      // },
    ],
    []
  );
  const { data: rows, brands, categories } = useProducts();

  const dataCount = useMemo(
    () => Object.entries(countBy(rows ?? [], (v) => v.brand)).sort((a, b) => a[1] - b[1]),
    [rows]
  );

  const dataColors = useMemo(() => getRandomColors(dataCount.length), [dataCount]);

  // const chartData: ChartData<'pie', number[], string> = {
  //   labels: Object.keys(dataCount),
  //   datasets: [
  //     {
  //       label: 'Brand',
  //       data: Object.values(dataCount),
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

  const {
    setBrand,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setProduct,
    isFilterExpanded,
    setFilterExpanded,
    ...filters
  } = useDeallShopStore((state) => state);

  const [domFilterExpanded, setDomFilterExpanded] = useState(false);
  useEffect(() => setDomFilterExpanded(isFilterExpanded), [isFilterExpanded]);

  // Filters
  const [brand, setRawBrand] = useState<Product['brand'] | null>(null);
  const [category, setRawCategory] = useState<Product['category'] | null>(null);

  const [rawMinPrice, setRawMinPrice] = useState<number | null>(null);
  const [rawMaxPrice, setRawMaxPrice] = useState<number | null>(null);
  const [minPrice] = useDebounce(rawMinPrice, 200);
  const [maxPrice] = useDebounce(rawMaxPrice, 200);

  useEffect(() => {
    setBrand(brand);
  }, [brand]);

  useEffect(() => {
    setCategory(category);
  }, [category]);

  useEffect(() => {
    setMinPrice(minPrice);
  }, [minPrice]);

  useEffect(() => {
    setMaxPrice(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <main className="bg-mesh flex min-h-screen flex-col items-center justify-center from-yellow-200 via-red-500 to-fuchsia-500 bg-fixed">
      <div className="container flex max-w-4xl flex-col items-center justify-center space-y-6 px-8 py-32 lg:py-48 lg:px-12">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          className="flex bg-gradient-to-t from-gray-900 to-gray-700 bg-clip-text text-7xl font-extrabold leading-relaxed text-transparent"
          href="/"
        >
          <h1 className="text-center">Products</h1>
        </a>
        <div className="relative flex h-10 min-h-fit w-full">
          <Search />
        </div>
        <div className="relative flex min-h-fit w-full flex-col space-y-4">
          <div onClick={() => setFilterExpanded(!isFilterExpanded)} className="flex w-full cursor-pointer font-bold">
            Filters{domFilterExpanded ? ' 🔼' : ' 🔽'}
          </div>
          <div
            className={`justify-stretch w-full grid-cols-2 gap-2 md:grid-cols-4 ${
              domFilterExpanded ? 'grid' : 'hidden'
            }`}
          >
            <FilterBox options={brands} chosenValue={brand} setChosenValue={setRawBrand} placeholder="Filter brands" />
            <FilterBox
              options={categories}
              chosenValue={category}
              setChosenValue={setRawCategory}
              placeholder="Filter categories"
            />
            <input
              type="number"
              className="relative w-full rounded-lg border-2 border-gray-200 bg-white py-2 px-3 shadow-md [appearance:textfield] focus:border-blue-400 focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Minimum price"
              value={rawMinPrice ?? ''}
              onChange={(e) => setRawMinPrice(e.target.value.length > 0 ? parseInt(e.target.value) : null)}
              onKeyDown={numberInputKeyDown}
            />
            <input
              type="number"
              className="relative w-full rounded-lg border-2 border-gray-200 bg-white py-2 px-3 shadow-md [appearance:textfield] focus:border-blue-400 focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Maximum price"
              value={rawMaxPrice ?? ''}
              onChange={(e) => setRawMaxPrice(e.target.value.length > 0 ? parseInt(e.target.value) : null)}
              onKeyDown={numberInputKeyDown}
            />
          </div>
        </div>
        <div className="flex w-full flex-col space-y-6">
          <Table<Product> columns={columns} rows={rows ?? []} filters={filters} hiddenColumns={[]} />
        </div>

        <div className="flex w-full max-w-sm flex-col items-center space-y-6 pt-24">
          <div className="flex font-bold">Brands count chart</div>
          <Pie
            data={{
              labels: dataCount.map((x) => x[0]),
              datasets: [
                {
                  label: 'Brand count',
                  data: dataCount.map((x) => x[1]),
                  backgroundColor: dataColors,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
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

export default Home;
