import { createQuery } from '@tanstack/solid-query';

import { useFilterContext } from '~/components/Filter/FilterProvider';
import { getTeasers } from '~/requests/fetch-teasers';

export function useTeasers() {
  const [filterState] = useFilterContext();

  const query = createQuery(
    () => ['teasers'],
    () =>
      getTeasers({
        instrument: filterState.filter.instrument,
        category: filterState.filter.category,
        zipCode: filterState.filter.zipCode,
      }),
    { refetchOnMount: false }
  );

  return query;
}
