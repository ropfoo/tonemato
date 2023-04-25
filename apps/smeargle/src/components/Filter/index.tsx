import { createStore, produce } from 'solid-js/store';
import { Transition } from 'solid-transition-group';
import { headerOpen } from '../Header';
import { FilterContextType, FilterName, FilterState } from './types';
import FilterDetailed from './FilterDetailed';
import FilterSimple from './FilterSimple';
import { createContext, useContext } from 'solid-js';
import { filterDefaultState } from './data';

const FilterContext = createContext<FilterContextType>([
  filterDefaultState,
  { setActive: () => undefined, updateValue: () => undefined },
]);

export const useFilterContext = () => useContext(FilterContext);

export default function Filter() {
  const [isHeaderOpen] = headerOpen;

  const [filterState, setFilterState] =
    createStore<FilterState>(filterDefaultState);

  const setActive = (name: FilterName) => setFilterState('activeFilter', name);

  const updateValue = (name: FilterName, value: string) =>
    setFilterState(
      produce((fs) => {
        fs.filter[name] = value;
      })
    );
  return (
    <FilterContext.Provider value={[filterState, { setActive, updateValue }]}>
      <div class="flex w-full justify-center">
        <Transition
          name={isHeaderOpen() ? 'slide-fade-filter-detail' : 'slide-fade'}
        >
          {!isHeaderOpen() && <FilterSimple />}
          {isHeaderOpen() && <FilterDetailed />}
        </Transition>
      </div>
    </FilterContext.Provider>
  );
}
