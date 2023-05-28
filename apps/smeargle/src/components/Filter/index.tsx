import { Transition } from 'solid-transition-group';
import { headerOpen } from '../Header';
import FilterDetailed from './FilterDetailed';
import FilterSimple from './FilterSimple';

export default function FilterMenu() {
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
