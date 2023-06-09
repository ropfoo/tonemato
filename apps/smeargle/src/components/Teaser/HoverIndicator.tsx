import ArrowIcon from '../Icons/ArrowIcon';

export default function HoverIndicator() {
  return (
    <div class="bg-presley dark:shadow-filter-dark shadow-filter-light absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 scale-0 items-center justify-center rounded-full opacity-0 transition-all ease-in-out group-hover:first:scale-100 group-hover:first:opacity-100">
      <ArrowIcon />
    </div>
  );
}
