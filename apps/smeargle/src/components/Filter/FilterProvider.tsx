import { createStore, produce } from 'solid-js/store';
import { FilterContextType, FilterName, FilterState } from './types';
import { categoryOptions, filterDefaultState, instrumentOptions } from './data';
import { createContext, onMount, useContext } from 'solid-js';
import { JSX } from 'solid-js/web/types/jsx';
import { useFilterStorage } from './FilterDetailed/useFilterStorage';

const FilterContext = createContext<FilterContextType>([
  filterDefaultState,
  {
    setActive: () => undefined,
    updateValue: () => undefined,
  },
]);

export const useFilterContext = () => useContext(FilterContext);

interface FilterProviderProps {
  children: JSX.Element;
}

export default function FilterProvider(props: FilterProviderProps) {
  const [filterState, setFilterState] =
    createStore<FilterState>(filterDefaultState);

  const { getFilterStorage } = useFilterStorage();

  onMount(() => {
    // initial check if filter is stored in local storage
    const filterStorage = getFilterStorage();
    if (filterStorage) setFilterState('filter', filterStorage);
  });

  const setActive = (name: FilterName) => setFilterState('activeFilter', name);

  const updateValue = (name: FilterName, value: string) =>
    setFilterState(
      produce((fs) => {
        if (name === 'instrument') {
          if (instrumentOptions[value])
            fs.filter['instrument'] = {
              text: instrumentOptions[value],
              value: value,
            };
        }
        if (name === 'category') {
          if (categoryOptions[value])
            fs.filter['category'] = {
              text: categoryOptions[value],
              value: value,
            };
        }
        if (name === 'zipCode') {
          fs.filter['zipCode'] = { text: value, value };
        }
      })
    );

  return (
    <FilterContext.Provider value={[filterState, { setActive, updateValue }]}>
      {props.children}
    </FilterContext.Provider>
  );
}
