import clsx from 'clsx';
import SectionPreview from './SectionPreview';
import { headerOpen } from '../Header';
import { Transition } from 'solid-transition-group';
import FilterComboBox from './FilterComboBox';
import { categoryOptiones, instrumentOptions } from './data';
import { createStore } from 'solid-js/store';
import { FilterState } from './types';

export const filterStore = createStore<FilterState>({
  activeFilter: null,
  filter: {
    category: {
      value: '',
    },
    instrument: {
      value: '',
    },
    location: {
      value: '',
    },
  },
});

export default function Filter() {
  const [isHeaderOpen] = headerOpen;
  const [filterState] = filterStore;

  const Separator = () => <div class="bg-janis h-6 w-[1px]" />;

  return (
    <div class="flex w-full justify-center">
      <Transition
        name={isHeaderOpen() ? 'slide-fade-filter-detail' : 'slide-fade'}
      >
        {!isHeaderOpen() && (
          <div
            class={clsx(
              'bg-joplin border-1 border-janis shadow-filter-dark flex h-12 w-fit items-center rounded-full transition-all duration-300'
            )}
          >
            <SectionPreview position="start" name="category" />
            <Separator />
            <SectionPreview position="center" name="instrument" />
            <Separator />
            <SectionPreview position="end" name="location" />
          </div>
        )}
        {isHeaderOpen() && (
          <div
            class={clsx(
              'bg-joplin border-1 border-janis shadow-filter-dark absolute flex h-20 w-fit translate-y-[50px] items-center rounded-full transition-all duration-300'
            )}
          >
            <FilterComboBox
              name="category"
              label="Suche"
              value={filterState.filter.category.value}
              options={categoryOptiones}
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
        )}
      </Transition>
    </div>
  );
}
