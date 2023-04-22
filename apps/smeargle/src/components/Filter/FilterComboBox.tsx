import { For, Show, createEffect, createSignal } from 'solid-js';
import { produce } from 'solid-js/store';
import { Transition } from 'solid-transition-group';
import clsx from 'clsx';
import { FilterName, FilterOption } from './types';
import { filterStore } from '.';
import { filterPlaceholder } from './data';

interface FilterComboBoxProps {
  name: FilterName;
  label: string;
  value: string;
  options?: FilterOption[];
}

export default function FilterComboBox(props: FilterComboBoxProps) {
  const [isInputFocussed, setIsInputFocussed] = createSignal(false);
  const [inputValue, setInputValue] = createSignal(props.value);

  const [filterState, setFilterState] = filterStore;

  let inputRef: HTMLInputElement;

  createEffect(() => {
    if (filterState.activeFilter === props.name) {
      inputRef.focus();
    }
  });

  const handleInputChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
    }
  ) => setInputValue(e.currentTarget.value);

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const option = props.options?.find(
        (op) => op.text.toLowerCase() === inputValue().toLocaleLowerCase()
      );
      if (option) handleOptionClick(option);
    }
  };

  const handleFilterSelect = () => {
    inputRef.focus();
    if (filterState.activeFilter === props.name) return;
    setFilterState('activeFilter', props.name);
  };

  const handleOptionClick = (option: FilterOption) => {
    setInputValue(option.text);
    setFilterState(
      produce((fs) => {
        fs.filter[props.name].value = option.value;
      })
    );
  };

  return (
    <div class="relative h-full ">
      <button
        // tabIndex={props.name === 'category' ? 1 : 2}
        onClick={handleFilterSelect}
        class={clsx(
          'hover:dark:shadow-filter-dark flex h-full cursor-pointer flex-col justify-center rounded-full px-6 transition-all ',
          {
            'min-w-[220px]': props.name === 'category',
            'min-w-[180px]': props.name === 'instrument',
            'min-w-[160px]': props.name === 'location',
            'dark:shadow-filter-dark dark:bg-black':
              props.name === filterState.activeFilter,
          }
        )}
      >
        <p class="dark:text-snow mb-1 text-xs font-bold">{props.label}</p>
        <input
          ref={(ref) => (inputRef = ref)}
          class="dark:text-presley bg-transparent  outline-none"
          type="text"
          placeholder={filterPlaceholder[props.name].detail}
          value={inputValue()}
          onInput={handleInputChange}
          onFocus={() => setIsInputFocussed(true)}
          onBlur={() => setIsInputFocussed(false)}
          onKeyDown={handleInputKeyDown}
        />
      </button>

      <Transition name="slide-fade">
        <Show
          when={
            // isInputFocussed() &&
            props.options &&
            filterState.activeFilter === props.name &&
            props.options.filter((op) => op.text === inputValue()).length !== 1
          }
        >
          <div class="dark:shadow-filter-dark absolute top-20 mt-4 w-full rounded-2xl px-6 py-4 dark:bg-black">
            <For
              each={props.options?.filter((op) =>
                op.text.toLowerCase().startsWith(inputValue().toLowerCase())
              )}
            >
              {(option) => (
                <button
                  onClick={() => handleOptionClick(option)}
                  class="dark:text-presley block py-2"
                >
                  <p>{option.text}</p>
                </button>
              )}
            </For>
          </div>
        </Show>
      </Transition>
    </div>
  );
}
