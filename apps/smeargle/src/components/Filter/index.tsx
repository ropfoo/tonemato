import FilterCategory from './FilterCategory';

export default function Filter() {
  return (
    <div class="bg-joplin border-1 border-janis shadow-filter-dark flex h-12 min-w-fit items-center rounded-full">
      <FilterCategory position="start" name="Kategorie" />
      <Separator />
      <FilterCategory position="center" name="Instrument" />
      <Separator />
      <FilterCategory position="end" name="Ort" />
    </div>
  );
}
const Separator = () => <div class="bg-janis h-6 w-[1px]" />;
