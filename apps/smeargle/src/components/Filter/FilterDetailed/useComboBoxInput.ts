import { createSignal } from 'solid-js';
import { FilterName, FilterOption } from '../types';
import { filterStore } from '..';
import { produce } from 'solid-js/store';
import { FilterComboBoxProps } from './FilterComboBox';
import { useFilterDetailed } from './useFIlterDetailed';

export function useComboBoxInput(props: FilterComboBoxProps) {
  const [inputValue, setInputValue] = createSignal(props.value);
  const [filterState, setFilterState] = filterStore;

  const { focusNextSection, submitFilter } = useFilterDetailed();

  const isInputInOptions = () => {
    if (props.isDropdown) return false;
    return props.options?.filter((op) => op.text === inputValue()).length === 1;
  };

  const isTextInput = () => !props.options;

  const handleTextInput = () => {
    if (isTextInput()) {
      setFilterState(
        produce((fs) => {
          fs.filter[props.name].value = inputValue();
        })
      );
    }
  };

  const hasFilterAllValues = () =>
    !Object.values(filterState.filter)
      .map((f) => !!f.value)
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
    setFilterState(
      produce((fs) => {
        fs.filter[props.name].value = option.value;
      })
    );
    focusNextSection(props.name);
  };

  const handleInputChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
    }
  ) => setInputValue(e.currentTarget.value);

  const handleBlur = () => {
    if (inputValue() === '') {
      setFilterState(
        produce((fs) => {
          fs.filter[props.name].value = '';
        })
      );
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
