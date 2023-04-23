import { createSignal } from 'solid-js';
import { FilterName, FilterOption } from '../types';
import { filterStore } from '..';
import { produce } from 'solid-js/store';
import { FilterComboBoxProps } from './FilterComboBox';
import { useFilterDetailed } from './useFIlterDetailed';

export function useComboBoxInput(props: FilterComboBoxProps) {
  const [inputValue, setInputValue] = createSignal(props.value);
  const [filterState, setFilterState] = filterStore;

  const { focusNextSection } = useFilterDetailed();

  const handleOptionClick = (option: FilterOption) => {
    setInputValue(option.text);
    setFilterState(
      produce((fs) => {
        fs.filter[props.name].value = option.value;
      })
    );
    if (props.isDropdown) focusNextSection(props.name);
  };

  const handleInputChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
    }
  ) => setInputValue(e.currentTarget.value);

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      // check if input value matches a filter option
      const option = props.options?.find(
        (op) => op.text.toLowerCase() === inputValue().toLocaleLowerCase()
      );

      if (!option) return;

      handleOptionClick(option);

      // check if last filter option is reached
      if (filterState.filter[props.name].position >= 3) {
        // if the last filter option is active submit
        return;
      }

      // jump to the next filter option
      focusNextSection(props.name);
    }
  };

  return {
    handleInputChange,
    inputValue,
    handleInputKeyDown,
    handleOptionClick,
  };
}
