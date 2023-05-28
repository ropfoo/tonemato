import { CreateQueryResult, createQuery } from '@tanstack/solid-query';
import { useFilterContext } from '~/components/Filter/FilterProvider';
import { getTeasers } from '~/requests/fetch-teasers';

export function useTeasers(): [
  // TODO add propper typing once endpoint returns flattened result
  CreateQueryResult<any, unknown>,
  { isLoading: () => boolean }
] {
  const [filterState] = useFilterContext();

  const query = createQuery(
    () => ['teasers'],
    () =>
      getTeasers({
        instrument: filterState.filter.instrument?.value ?? 'all',
        category: filterState.filter.category?.value ?? 'all',
        zipCode: filterState.filter.zipCode?.value ?? '',
      }),
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  const isLoading = () =>
    query.isFetching || query.isLoading || query.isRefetching;

  return [query, { isLoading }];
}
