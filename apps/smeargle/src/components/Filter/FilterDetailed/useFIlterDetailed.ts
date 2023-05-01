import { useFilterContext } from '../FilterProvider';
import { FilterName } from '../types';
import { headerOpen } from '~/components/Header';
import { filterData } from '../data';
import { useTeasers } from '~/hooks/useTeasers';
import { useFilterStorage } from './useFilterStorage';

export function useFilterDetailed() {
  const [filterState, { setActive }] = useFilterContext();
  const [, setIsHeaderOpen] = headerOpen;
  const { storeFilterState } = useFilterStorage();
  const [teasers] = useTeasers();

  const focusNextSection = (currentSection: FilterName) => {
    const currentPosition = filterData[currentSection].position;

    const nextFilter = Object.entries(filterData).find(
      ([_, filter]) => filter.position === currentPosition + 1
    );

    if (nextFilter) {
      const [nextFilterName] = nextFilter as [FilterName, { position: number }];

      if (filterState.filter[nextFilterName]) {
        focusNextSection(nextFilterName as FilterName);
        return;
      }

      setActive(nextFilterName as FilterName);
    }
  };

  const submitFilter = async () => {
    // store filter in local storage
    storeFilterState();

    // refetch with current filter state
    await teasers.refetch();

    // close header after refetch to prevent transition issues
    setIsHeaderOpen(false);
  };

  return { submitFilter, focusNextSection };
}
