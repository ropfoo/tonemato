import clsx from 'clsx';
import SectionPreview from './SectionPreview';

export default function FilterSimple() {
  const Separator = () => <div class="dark:bg-janis bg-elvis h-6 w-[1px]" />;

  return (
    <div
      class={clsx(
        'dark:bg-joplin border-1 dark:border-janis border-elvis dark:shadow-filter-dark shadow-filter-light flex h-12 w-fit items-center rounded-full transition-all duration-300'
      )}
    >
      <SectionPreview position="start" name="category" />
      <Separator />
      <SectionPreview position="center" name="instrument" />
      <Separator />
      <SectionPreview position="end" name="zipCode" />
    </div>
  );
}
