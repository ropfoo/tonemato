import { createSignal, onMount } from 'solid-js';
import { FilterOption } from '../types';
import { FilterComboBoxProps } from './FilterComboBox';
import { useFilterDetailed } from './useFIlterDetailed';
import { useFilterContext } from '../FilterProvider';

export function useComboBoxInput(props: FilterComboBoxProps) {
  const [inputValue, setInputValue] = createSignal(props.value);
  const [filterState, { updateValue }] = useFilterContext();

  const { focusNextSection, submitFilter } = useFilterDetailed();

  onMount(() => {
    if (props.value) {
      updateValue(props.name, props.value);
    }
  });

  const isInputInOptions = () => {
    if (props.isDropdown) return false;
    return props.options?.filter((op) => op.text === inputValue()).length === 1;
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
    const option = props.options?.find(
      (op) => op.text.toLowerCase() === inputValue().toLocaleLowerCase()
    );
    return option;
  };

  const selectOption = (option: FilterOption) => {
    setInputValue(option.text);
    updateValue(props.name, option.value);
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
    // if () handleOptionClick(option);
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      // check if combo box is textinput
      isTextInput() && handleTextInput();

      const option = getOptionMatchingInput();
      option && selectOption(option);

      if (hasFilterAllValues()) {
        // if the last filter option is active submit
        return submitFilter();
      }

      // jump to the next filter option
      focusNextSection(props.name);
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
