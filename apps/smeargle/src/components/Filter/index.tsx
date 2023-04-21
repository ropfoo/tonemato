import clsx from 'clsx';
import FilterCategory from './FilterCategory';
import { headerOpen } from '../Header';
import { Transition } from 'solid-transition-group';

export default function Filter() {
  const [isHeaderOpen] = headerOpen;

  const Separator = () => <div class="bg-janis h-6 w-[1px]" />;

  return (
    <div class="flex w-full justify-center">
      <Transition name={isHeaderOpen() ? 'slide-fade2' : 'slide-fade'}>
        {!isHeaderOpen() && (
          <div
            class={clsx(
              'bg-joplin border-1 border-janis shadow-filter-dark flex h-12 w-fit items-center rounded-full transition-all duration-300',
              {
                // 'h-20  translate-y-12': isHeaderOpen(),
                // 'h-12  translate-y-0': !isHeaderOpen(),
              }
            )}
          >
            <FilterCategory
              position="start"
              name={isHeaderOpen() ? 'This is more' : 'Kategorie'}
            />
            <Separator />
            <FilterCategory position="center" name="Instrument" />
            <Separator />
            <FilterCategory position="end" name="Ort" />
          </div>
        )}
        {isHeaderOpen() && (
          <div
            class={clsx(
              'bg-joplin border-1 border-janis shadow-filter-dark absolute flex h-20 w-full max-w-[500px] translate-y-[50px] items-center rounded-full transition-all duration-300'
            )}
          >
            <FilterCategory position="start" name={'Was suchst du?'} />
            <Separator />
            <FilterCategory position="center" name="Instrument" />
            <Separator />
            <FilterCategory position="end" name="Ort" />
          </div>
        )}
      </Transition>
    </div>
  );
}
