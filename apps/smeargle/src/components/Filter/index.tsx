import FilterCategory from './FilterCategory';

export default function Filter() {
  return (
    <div class="border-1 border-presley shadow-filter-dark flex h-12 items-center rounded-full">
      <FilterCategory position="start" name="Kategorie" />
      <Separator />
      <FilterCategory position="center" name="Instrument" />
      <Separator />
      <FilterCategory position="end" name="Ort" />
    </div>
  );
}
const Separator = () => <div class="border-presley bg-presley h-6 w-[1px]" />;
