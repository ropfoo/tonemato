import { filterStore } from '..';
import { FilterName } from '../types';

export function useFilterDetailed() {
  const [filterState, setFilterState] = filterStore;

  const focusNextSection = (currentSection: FilterName) => {
    const currentPosition = filterState.filter[currentSection].position;

    const nextFilter = Object.entries(filterState.filter).find(
      ([_, filter]) => filter.position === currentPosition + 1
    );

    if (nextFilter) {
      const [nextFilterName] = nextFilter;
      setFilterState('activeFilter', nextFilterName as FilterName);
    }
  };

  const submitFilter = () => {
    console.log('filter submitted');
  };

  return { submitFilter, focusNextSection };
}
