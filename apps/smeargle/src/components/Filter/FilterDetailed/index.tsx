import clsx from 'clsx';
import FilterComboBox from './FilterComboBox';
import { filterStore } from '..';
import { categoryOptions, instrumentOptions } from '../data';

export default function FilterDetailed() {
  const [filterState] = filterStore;

  return (
    <div
      class={clsx(
        'bg-joplin border-1 border-janis shadow-filter-dark absolute flex h-20 w-fit translate-y-[50px] items-center rounded-full transition-all duration-300'
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
        value={filterState.filter.instrument.value}
        options={instrumentOptions}
      />
      <div class="mr-2" />
      <FilterComboBox
        name="location"
        label="Ort"
        value={filterState.filter.location.value}
      />
    </div>
  );
}
