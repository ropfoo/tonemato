import { For, Show, createEffect } from 'solid-js';
import { Transition } from 'solid-transition-group';
import clsx from 'clsx';
import { FilterComboBoxProps, FilterName } from '../types';
import { filterPlaceholder } from '../data';
import { useComboBoxInput } from './useComboBoxInput';
import { useFilterContext } from '../FilterProvider';
import { TeaserRequestParams } from 'tonemato-types';

export default function FilterComboBox(
  props: FilterComboBoxProps<TeaserRequestParams[FilterName]>
) {
  const {
    handleInputChange,
    inputValue,
    handleInputKeyDown,
    selectOption,
    isInputInOptions,
    handleBlur,
  } = useComboBoxInput(props);

  const [filterState, { setActive }] = useFilterContext();

  let inputRef: HTMLInputElement;

  createEffect(() => {
    filterState.activeFilter === props.name
      ? inputRef.focus()
      : inputRef.blur();
  });

  const handleFilterSelect = () => {
    inputRef.focus();
    if (filterState.activeFilter === props.name) return;
    setActive(props.name);
  };

  return (
    <div class="relative h-full ">
      <button
        type="button"
        onClick={handleFilterSelect}
        class={clsx(
          'hover:dark:shadow-filter-dark hover:shadow-filter-light flex h-full cursor-pointer flex-col justify-center rounded-full px-6 transition-all ',
          {
            'min-w-[220px]': props.name === 'category',
            'min-w-[180px]': props.name === 'instrument',
            'min-w-[160px]': props.name === 'zipCode',
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
                  ? Object.entries(props.options!)
                  : Object.entries(props.options!).filter(([key, op]) =>
                      op.toLowerCase().startsWith(inputValue().toLowerCase())
                    )
              }
              fallback={<p class="text-wolf">Nicht verfügbar</p>}
            >
              {([value, text]) => (
                <button
                  type="button"
                  onClick={() => selectOption({ text, value })}
                  class="dark:text-elvis dark:hover:bg-whinehouse hover:bg-elvis/50 block w-full rounded-lg text-left"
                >
                  <p class="p-2">{text}</p>
                </button>
              )}
            </For>
          </div>
        </Show>
      </Transition>
    </div>
  );
}
