import { unwrap } from 'solid-js/store';
import { useFilterContext } from '..';
import { FilterName } from '../types';
import { headerOpen } from '~/components/Header';
import { filterData } from '../data';

export function useFilterDetailed() {
  const [filterState, { setActive }] = useFilterContext();

  const [_, setIsHeaderOpen] = headerOpen;

  const focusNextSection = (currentSection: FilterName) => {
    const currentPosition = filterData[currentSection].position;

    const nextFilter = Object.entries(filterData).find(
      ([_, filter]) => filter.position === currentPosition + 1
    );

    if (nextFilter) {
      const [nextFilterName] = nextFilter as [FilterName, { position: number }];
      console.log(nextFilterName);
      if (filterState.filter[nextFilterName]) {
        focusNextSection(nextFilterName as FilterName);
        return;
      }

      setActive(nextFilterName as FilterName);
    }
  };

  const submitFilter = () => {
    const filteValues = unwrap(filterState.filter);
    console.log('filter submitted', filteValues);
    setIsHeaderOpen(false);
  };

  return { submitFilter, focusNextSection };
}
