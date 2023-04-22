import { clsx } from 'clsx';
import SearchIcon from '../Icons/SearchIcon';
import { headerOpen } from '../Header';
import { FilterName } from './types';
import { filterStore } from '.';

interface SectionPreviewProps {
  name: FilterName;
  position: 'start' | 'center' | 'end';
}

export default function SectionPreview(props: SectionPreviewProps) {
  const [_, setIsHeaderOpen] = headerOpen;

  const [filterState] = filterStore;

  return (
    <button
      class={clsx(
        'text-presley dark:text-elvis/80 font-poppins flex h-full w-full items-center px-4 text-sm',
        {
          'pl-6 text-right': props.position === 'start',
          'text-center': props.position === 'center',
          'text-left': props.position === 'end',
        }
      )}
      onClick={() => setIsHeaderOpen(true)}
    >
      <p>{filterState[props.name].value}</p>
      {props.position === 'end' && (
        <div class="ml-6">
          <SearchIcon />
        </div>
      )}
    </button>
  );
}
