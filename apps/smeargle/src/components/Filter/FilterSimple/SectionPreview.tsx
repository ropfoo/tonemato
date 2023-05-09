import { clsx } from 'clsx';
import SearchIcon from '../../Icons/SearchIcon';
import { headerOpen } from '../../Header';
import { FilterName } from '../types';
import { useFilterContext } from '../FilterProvider';
import { filterPlaceholder } from '../data';

interface SectionPreviewProps {
  name: FilterName;
  position: 'start' | 'center' | 'end';
}

export default function SectionPreview(props: SectionPreviewProps) {
  const [, setIsHeaderOpen] = headerOpen;

  const [filterState, { setActive }] = useFilterContext();

  const handleOpen = () => {
    setIsHeaderOpen(true);
    setActive(props.name);
  };

  return (
    <button
      class={clsx(
        'text-presley dark:text-elvis/80 font-poppins flex h-full  items-center px-4 text-sm',
        {
          'pl-6 text-right': props.position === 'start',
          'text-center': props.position === 'center',
          'text-left': props.position === 'end',
        }
      )}
      onClick={handleOpen}
    >
      <p>
        {filterState.filter[props.name]
          ? filterState.filter[props.name]?.text ||
            filterPlaceholder[props.name].simple
          : filterPlaceholder[props.name].simple}
      </p>
      {props.position === 'end' && (
        <div class="ml-6">
          <div class="bg-stewart rounded-full">
            <SearchIcon />
          </div>
        </div>
      )}
    </button>
  );
}
