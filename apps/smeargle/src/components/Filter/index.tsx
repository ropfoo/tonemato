import { createStore } from 'solid-js/store';
import { Transition } from 'solid-transition-group';
import { headerOpen } from '../Header';
import { FilterState } from './types';
import FilterDetailed from './FilterDetailed';
import FilterSimple from './FilterSimple';

export const filterStore = createStore<FilterState>({
  activeFilter: null,
  filter: {
    category: {
      value: '',
      position: 1,
    },
    instrument: {
      value: '',
      position: 2,
    },
    location: {
      value: '',
      position: 3,
    },
  },
});

export default function Filter() {
  const [isHeaderOpen] = headerOpen;

  return (
    <div class="flex w-full justify-center">
      <Transition
        name={isHeaderOpen() ? 'slide-fade-filter-detail' : 'slide-fade'}
      >
        {!isHeaderOpen() && <FilterSimple />}
        {isHeaderOpen() && <FilterDetailed />}
      </Transition>
    </div>
  );
}
