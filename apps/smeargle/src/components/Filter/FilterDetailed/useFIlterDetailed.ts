import { unwrap } from 'solid-js/store';
import { filterStore } from '..';
import { FilterName } from '../types';
import { headerOpen } from '~/components/Header';

export function useFilterDetailed() {
  const [filterState, setFilterState] = filterStore;
  const [_, setIsHeaderOpen] = headerOpen;
  const focusNextSection = (currentSection: FilterName) => {
    const currentPosition = filterState.filter[currentSection].position;

    const nextFilter = Object.entries(filterState.filter).find(
      ([_, filter]) => filter.position === currentPosition + 1
    );

    if (nextFilter) {
      const [nextFilterName, nextFilterState] = nextFilter;

      if (nextFilterState.value) {
        focusNextSection(nextFilterName as FilterName);
        return;
      }

      setFilterState('activeFilter', nextFilterName as FilterName);
    }
  };

  const submitFilter = () => {
    const filterData = unwrap(filterState.filter);
    console.log('filter submitted', filterData);
    setIsHeaderOpen(false);
  };

  return { submitFilter, focusNextSection };
}
