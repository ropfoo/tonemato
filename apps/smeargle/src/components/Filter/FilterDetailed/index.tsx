import clsx from 'clsx';
import { useFilterContext } from '../FilterProvider';
import InstrumentSelector from './FilterDetailedFields/InstrumentSelector';
import CategorySelector from './FilterDetailedFields/CategorySelector';
import ZipCodeField from './FilterDetailedFields/ZipCodeField';
import { useFilterDetailed } from './useFilterDetailed';
import { Form } from 'solid-start/data/Form';

export default function FilterDetailed() {
  const [filterState] = useFilterContext();
  const { submitFilter } = useFilterDetailed();
  return (
    <Form
      onSubmit={submitFilter}
      class={clsx(
        'dark:bg-joplin border-1 dark:border-janis border-elvis dark:shadow-filter-dark shadow-filter-light bg-snow absolute flex h-20 w-fit translate-y-[55px] items-center rounded-full transition-all duration-300'
      )}
    >
      <CategorySelector value={filterState.filter.category?.value ?? 'all'} />
      <div class="mr-2" />
      <InstrumentSelector
        value={filterState.filter.instrument?.value ?? 'all'}
      />
      <div class="mr-2" />
      <ZipCodeField value={filterState.filter.zipCode?.value ?? ''} />
    </Form>
  );
}
