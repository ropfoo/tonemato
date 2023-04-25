import { For, Show, createEffect } from 'solid-js';
import { Transition } from 'solid-transition-group';
import clsx from 'clsx';
import { FilterName, FilterOption } from '../types';
import { filterStore } from '..';
import { filterPlaceholder } from '../data';
import { useComboBoxInput } from './useComboBoxInput';

export interface FilterComboBoxProps {
  name: FilterName;
  label: string;
  value: string;
  options?: FilterOption[];
  // turn combobox into dropdown (no text input)
  isDropdown?: boolean;
}

export default function FilterComboBox(props: FilterComboBoxProps) {
  const {
    handleInputChange,
    inputValue,
    handleInputKeyDown,
    selectOption,
    isInputInOptions,
    handleBlur,
  } = useComboBoxInput(props);

  const [filterState, setFilterState] = filterStore;

  let inputRef: HTMLInputElement;

  createEffect(() => {
    filterState.activeFilter === props.name
      ? inputRef.focus()
      : inputRef.blur();
  });

  const handleFilterSelect = () => {
    inputRef.focus();
    if (filterState.activeFilter === props.name) return;
    setFilterState('activeFilter', props.name);
  };

  return (
    <div class="relative h-full ">
      <button
        onClick={handleFilterSelect}
        class={clsx(
          'hover:dark:shadow-filter-dark hover:shadow-filter-light flex h-full cursor-pointer flex-col justify-center rounded-full px-6 transition-all ',
          {
            'min-w-[220px]': props.name === 'category',
            'min-w-[180px]': props.name === 'instrument',
            'min-w-[160px]': props.name === 'location',
            'dark:shadow-filter-dark shadow-filter-light bg-white dark:bg-black':
              props.name === filterState.activeFilter,
          }
        )}
      >
        <p class="dark:text-snow mb-1 text-xs font-bold">{props.label}</p>
        <input
          ref={(ref) => (inputRef = ref)}
          class={clsx('text-presley bg-transparent  outline-none', {
            'cursor-pointer': props.isDropdown,
          })}
          type="text"
          placeholder={filterPlaceholder[props.name].detail}
          value={inputValue()}
          onInput={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleBlur}
          disabled={props.isDropdown}
        />
      </button>

      <Transition name="slide-fade">
        <Show
          when={
            props.options &&
            filterState.activeFilter === props.name &&
            !isInputInOptions()
          }
        >
          <div class="dark:shadow-filter-dark shadow-filter-light absolute top-20 mt-4 w-full rounded-2xl bg-white p-4 dark:bg-black">
            <For
              each={
                props.isDropdown
                  ? props.options
                  : props.options?.filter((op) =>
                      op.text
                        .toLowerCase()
                        .startsWith(inputValue().toLowerCase())
                    )
              }
            >
              {(option) => (
                <button
                  onClick={() => selectOption(option)}
                  class="dark:text-elvis dark:hover:bg-whinehouse hover:bg-elvis/50 block w-full rounded-lg text-left"
                >
                  <p class="p-2">{option.text}</p>
                </button>
              )}
            </For>
          </div>
        </Show>
      </Transition>
    </div>
  );
}
