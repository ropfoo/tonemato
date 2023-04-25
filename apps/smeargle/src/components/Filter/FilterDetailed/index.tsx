import clsx from 'clsx';
import FilterComboBox from './FilterComboBox';
import { categoryOptions, instrumentOptions } from '../data';
import { useFilterContext } from '..';

export default function FilterDetailed() {
  const [filterState] = useFilterContext();

  return (
    <div
      class={clsx(
        'dark:bg-joplin border-1 dark:border-janis border-elvis dark:shadow-filter-dark shadow-filter-light bg-snow absolute flex h-20 w-fit translate-y-[55px] items-center rounded-full transition-all duration-300'
      )}
    >
      <FilterComboBox
        name="category"
        label="Suche"
        value={categoryOptions[2].text}
        options={categoryOptions}
        isDropdown
      />
      <div class="mr-2" />
      <FilterComboBox
        name="instrument"
        label="Instrument"
        value={filterState.filter.instrument}
        options={instrumentOptions}
      />
      <div class="mr-2" />
      <FilterComboBox
        name="location"
        label="Ort"
        value={filterState.filter.location}
      />
    </div>
  );
}
