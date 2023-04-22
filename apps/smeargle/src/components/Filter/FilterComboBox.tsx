import clsx from 'clsx';
import { For, Show, createSignal } from 'solid-js';
import { FilterName, FilterOption } from './types';
import { Transition } from 'solid-transition-group';
import { filterStore } from '.';

interface FilterComboBoxProps {
  name: FilterName;
  label: string;
  value: string;
  options?: FilterOption[];
}

export default function FilterComboBox(props: FilterComboBoxProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [_, setFilterState] = filterStore;

  const handleOptionClick = (option: FilterOption) => {
    setFilterState(props.name, (fs) => ({
      ...fs,
      value: option.value,
    }));

    setIsOpen(false);
  };

  return (
    <div class="relative h-full ">
      <div
        onClick={() => setIsOpen((open) => !open)}
        class={clsx(
          'dark:shadow-filter-dark flex h-full  flex-col justify-center rounded-full px-6 dark:bg-black',
          {
            'min-w-[220px]': props.name === 'category',
            'min-w-[180px]': props.name === 'instrument',
            'min-w-[160px]': props.name === 'location',
          }
        )}
      >
        <p class="dark:text-snow text-[10px] font-bold">{props.label}</p>
        <p class="dark:text-presley">{props.value}</p>
      </div>

      <Transition name="slide-fade">
        <Show when={isOpen() && props.options}>
          <div class="dark:shadow-filter-dark absolute top-20 mt-2 w-full rounded-2xl px-6 py-4 dark:bg-black">
            <For each={props.options}>
              {(option) => (
                <div
                  onClick={() => handleOptionClick(option)}
                  class="dark:text-presley"
                >
                  <p>{option.text}</p>
                </div>
              )}
            </For>
          </div>
        </Show>
      </Transition>
    </div>
  );
}
