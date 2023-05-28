import { createSignal, onMount } from 'solid-js';
import { FilterComboBoxProps, FilterName, FilterOption } from '../types';
import { useFilterContext } from '../FilterProvider';
import { TeaserParams } from '~/generated/tygo';
import { useFilterDetailed } from './useFilterDetailed';

export function useComboBoxInput(
  props: FilterComboBoxProps<TeaserParams[FilterName]>
) {
  const [inputValue, setInputValue] = createSignal(
    props.value
      ? props.options && props.value
        ? props.options[props.value]
        : props.value
      : ''
  );
  const [filterState, { updateValue }] = useFilterContext();

  const { focusNextSection } = useFilterDetailed();

  onMount(() => {
    if (props.value) {
      updateValue(props.name, props.value);
    }
  });

  const isInputInOptions = () => {
    if (props.isDropdown) return false;
    if (!props.options) return false;
    return (
      Object.entries(props.options).filter(([, text]) => text === inputValue())
        .length === 1
    );
  };

  const isTextInput = () => !props.options;

  const handleTextInput = () =>
    isTextInput() && updateValue(props.name, inputValue());

  const hasFilterAllValues = () =>
    !Object.values(filterState.filter)
      .map((f) => !!f)
      .includes(false);

  // return option that matches the text input
  const getOptionMatchingInput = () => {
    if (!props.options) return null;

    const optionEntries = Object.entries(props.options).find(
      ([, text]) => text?.toLowerCase() === inputValue()?.toLowerCase()
    );

    if (!optionEntries) return null;

    return {
      text: optionEntries[1],
      value: optionEntries[0],
    };
  };

  const selectOption = (option: {
    text: string;
    value: TeaserParams[FilterName];
  }) => {
    setInputValue(option.text);
    updateValue(props.name, option.value ?? '');
    focusNextSection(props.name);
  };

  const handleInputChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
    }
  ) => setInputValue(e.currentTarget.value);

  const handleBlur = () => {
    if (inputValue() === '') {
      updateValue(props.name, '');
      return;
    }

    if (isTextInput()) {
      handleTextInput();
      return;
    }

    const option = getOptionMatchingInput();
    option && selectOption(option);
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      // check if combo box is textinput
      isTextInput() && handleTextInput();

      const option = getOptionMatchingInput();
      option && selectOption(option);
    }
  };

  return {
    handleInputChange,
    inputValue,
    handleInputKeyDown,
    selectOption,
    isInputInOptions,
    handleBlur,
  };
}
