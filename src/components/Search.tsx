import { useEffect, useState, memo } from 'react';
import { useDebounce } from 'use-debounce';
import { useDeallShopStore } from '../store/store';

const Search = memo(() => {
  const product = useDeallShopStore((state) => state.product);
  const setProduct = useDeallShopStore((state) => state.setProduct);
  const [rawQuery, setRawQuery] = useState(product);
  const [query] = useDebounce(rawQuery, 200);

  useEffect(() => {
    setProduct(query);
  }, [query, setProduct]);

  return (
    <>
      <input
        type="search"
        data-testid="search-input"
        className="absolute top-0 left-0 z-10 inline-flex h-10 w-full rounded-lg border-2 border-gray-200 p-2.5 text-sm leading-10 text-gray-900 shadow-md focus:border-blue-400 focus:outline-none focus:ring-0"
        placeholder="Search..."
        required
        onChange={(e) => setRawQuery(e.target.value)}
        value={rawQuery || ''}
        onScroll={(e) => {
          const input = e.target as HTMLInputElement;
          const div = input.previousSibling as HTMLDivElement;
          div.scrollTop = input.scrollTop;
          div.scrollLeft = input.scrollLeft;
        }}
      />
    </>
  );
});

Search.displayName = 'Search';

export default Search;
