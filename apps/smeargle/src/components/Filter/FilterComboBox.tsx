import clsx from 'clsx';
import { For, Show, createSignal } from 'solid-js';
import { FilterName, FilterOption } from './types';
import { Transition } from 'solid-transition-group';
import { filterStore } from '.';
import { produce } from 'solid-js/store';

interface FilterComboBoxProps {
  name: FilterName;
  label: string;
  value: string;
  options?: FilterOption[];
}

export default function FilterComboBox(props: FilterComboBoxProps) {
  const [isOpen, setIsOpen] = createSignal(false);

  const [filterState, setFilterState] = filterStore;

  const handleFilterSelect = () => {
    if (filterState.activeFilter === props.name) return setIsOpen(true);
    setFilterState('activeFilter', props.name);
  };

  const handleOptionClick = (option: FilterOption) => {
    setFilterState(
      produce((fs) => {
        fs.filter[props.name].value = option.value;
      })
    );

    setIsOpen(false);
  };

  return (
    <div class="relative h-full ">
      <div
        onClick={handleFilterSelect}
        class={clsx(
          ' hover:dark:shadow-filter-dark flex h-full flex-col justify-center rounded-full px-6 transition-all ',
          {
            'min-w-[220px]': props.name === 'category',
            'min-w-[180px]': props.name === 'instrument',
            'min-w-[160px]': props.name === 'location',
            'dark:shadow-filter-dark dark:bg-black':
              props.name === filterState.activeFilter,
          }
        )}
      >
        <p class="dark:text-snow text-[10px] font-bold">{props.label}</p>
        <p class="dark:text-presley">{props.value}</p>
      </div>

      <Transition name="slide-fade">
        <Show
          when={
            isOpen() && props.options && filterState.activeFilter === props.name
          }
        >
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
