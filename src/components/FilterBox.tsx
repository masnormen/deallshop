import { Combobox } from '@headlessui/react';
import type { Props } from '@headlessui/react/dist/types';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

interface FilterBoxProps extends Props<'input'> {
  options: string[];
  chosenValue: string | null;
  setChosenValue: ((q: string | null) => void) | Dispatch<SetStateAction<string | null>>;
}

function FilterBox({ chosenValue, options, setChosenValue, ...rest }: FilterBoxProps): JSX.Element {
  const [query, setQuery] = useState('');

  const filteredItem =
    query === ''
      ? options ?? []
      : options?.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        }) ?? [];

  return (
    <div className="relative w-full">
      <Combobox value={chosenValue} onChange={setChosenValue} nullable>
        <Combobox.Input
          className="relative w-full rounded-lg border-2 border-gray-200 bg-white py-2 pl-3 pr-10 shadow-md focus:border-blue-400 focus:outline-none focus:ring-0 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          {...rest}
        />
        <div className="absolute right-2 top-1/2 flex w-fit -translate-y-1/2 transform flex-row space-x-2 text-xs">
          <Combobox.Button>🔽</Combobox.Button>
          <button type="button" onClick={() => setChosenValue(null)}>
            ❌
          </button>
        </div>
        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredItem
            .sort((a, b) => a.localeCompare(b))
            .map((item) => (
              <Combobox.Option
                key={item}
                value={item}
                className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-orange-200"
              >
                {item}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

export default FilterBox;
