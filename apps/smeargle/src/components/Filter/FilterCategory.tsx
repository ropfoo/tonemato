import { clsx } from 'clsx';

interface FilterCategoryProps {
  name: string;
  position: 'start' | 'center' | 'end';
}

export default function FilterCategory(props: FilterCategoryProps) {
  return (
    <button
      class={clsx('text-presley dark:text-snow text-sm" h-full w-full px-4', {
        'text-right': props.position === 'start',
        'text-center': props.position === 'center',
        'text-left': props.position === 'end',
      })}
    >
      {props.name}
    </button>
  );
}
