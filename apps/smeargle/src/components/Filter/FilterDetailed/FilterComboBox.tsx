import { For, Show, createEffect } from 'solid-js';
import { Transition } from 'solid-transition-group';
import clsx from 'clsx';
import { FilterComboBoxProps, FilterName } from '../types';
import { filterPlaceholder } from '../data';
import { useComboBoxInput } from './useComboBoxInput';
import { useFilterContext } from '../FilterProvider';
import { TeaserRequestParams } from 'tonemato-types';
import SearchIcon from '~/components/Icons/SearchIcon';
import { useTeasers } from '~/hooks/useTeasers';

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

  const [, { isLoading }] = useTeasers();

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
          'hover:dark:shadow-filter-dark hover:shadow-filter-light flex h-full cursor-pointer items-center justify-center rounded-full px-6 transition-all ',
          {
            'pr-3': props.hasSubmitButton,
            'dark:shadow-filter-dark shadow-filter-light bg-white dark:bg-black':
              props.name === filterState.activeFilter,
          }
        )}
      >
        <div class="flex h-full w-full flex-col items-start justify-center">
          <p class="dark:text-snow mb-1 text-xs font-bold">{props.label}</p>
          <input
            ref={(ref) => (inputRef = ref)}
            class={clsx('text-presley bg-transparent  outline-none', {
              'cursor-pointer': props.isDropdown,
              'max-w-[150px]': props.name === 'category',
              'max-w-[140px]': props.name === 'instrument',
              'max-w-[90px]': props.name === 'zipCode',
            })}
            type="text"
            placeholder={filterPlaceholder[props.name].detail}
            value={inputValue()}
            onInput={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={handleBlur}
            disabled={props.isDropdown || isLoading()}
          />
        </div>
        <Show when={props.hasSubmitButton}>
          <button
            type="submit"
            disabled={isLoading()}
            class="bg-stewart ml-4 flex h-[50px] items-center justify-center rounded-full px-5 pl-4 hover:brightness-125 disabled:brightness-50"
          >
            <div class="scale-125">
              <SearchIcon />
            </div>
            <p class="font-poppins text-xs font-bold tracking-wide text-white dark:text-black">
              suchen
            </p>
          </button>
        </Show>
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
