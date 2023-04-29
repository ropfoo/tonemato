import { createQuery } from '@tanstack/solid-query';

import { useFilterContext } from '~/components/Filter/FilterProvider';
import { getTeasers } from '~/requests/fetch-teasers';

export function useTeasers() {
  const [filterState] = useFilterContext();

  const query = createQuery(
    () => ['teasers'],
    () =>
      getTeasers({
        instrument: filterState.filter.instrument?.value ?? 'all',
        category: filterState.filter.category?.value ?? 'all',
        zipCode: filterState.filter.zipCode?.value ?? '',
      }),
    { refetchOnMount: false }
  );

  return query;
}
