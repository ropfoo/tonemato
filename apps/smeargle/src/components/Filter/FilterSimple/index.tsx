import clsx from 'clsx';
import SectionPreview from './SectionPreview';

export default function FilterSimple() {
  const Separator = () => <div class="bg-janis h-6 w-[1px]" />;

  return (
    <div
      class={clsx(
        'bg-joplin border-1 border-janis shadow-filter-dark flex h-12 w-fit items-center rounded-full transition-all duration-300'
      )}
    >
      <SectionPreview position="start" name="category" />
      <Separator />
      <SectionPreview position="center" name="instrument" />
      <Separator />
      <SectionPreview position="end" name="location" />
    </div>
  );
}
