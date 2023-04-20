import { clsx } from 'clsx';
import SearchIcon from '../Icons/SearchIcon';

interface FilterCategoryProps {
  name: string;
  position: 'start' | 'center' | 'end';
}

export default function FilterCategory(props: FilterCategoryProps) {
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
    >
      <p>{props.name}</p>
      {props.position === 'end' && (
        <div class="ml-6">
          <SearchIcon />
        </div>
      )}
    </button>
  );
}
