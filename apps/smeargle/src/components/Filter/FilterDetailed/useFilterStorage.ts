import { useFilterContext } from '../FilterProvider';
import { FilterState } from '../types';

export function useFilterStorage() {
  const [filterState] = useFilterContext();

  const storeFilterState = () => {
    localStorage.setItem('filter', JSON.stringify(filterState.filter));
  };

  const getFilterStorage = () => {
    const filterStorage = localStorage.getItem('filter');
    return filterStorage && (JSON.parse(filterStorage) as FilterState['filter']);
  };

  return { storeFilterState, getFilterStorage };
}
