import { createStore, produce } from 'solid-js/store';
import { FilterContextType, FilterName, FilterState } from './types';
import { filterDefaultState } from './data';
import { createContext, useContext } from 'solid-js';
import { JSX } from 'solid-js/web/types/jsx';
import { Category, Instrument, TeaserRequestParams } from 'tonemato-types';

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

  const setActive = (name: FilterName) => setFilterState('activeFilter', name);

  const updateValue = (name: FilterName, value: string) =>
    setFilterState(
      produce((fs) => {
        if (name === 'instrument') {
          fs.filter[name] = value as Instrument;
        }
        if (name === 'category') {
          fs.filter[name] = value as Category;
        }
        if (name === 'zipCode') {
          fs.filter[name] = Number(value);
        }
      })
    );

  return (
    <FilterContext.Provider value={[filterState, { setActive, updateValue }]}>
      {props.children}
    </FilterContext.Provider>
  );
}
