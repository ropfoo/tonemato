import { TeaserParams } from '~/generated/tygo';
import { categoryOptions, instrumentOptions } from '../../data';
import { FilterComboBoxProps } from '../../types';
import FilterComboBox from '../FilterComboBox';

interface CategoryComboboxProps
  extends Omit<
    FilterComboBoxProps<TeaserParams['category']>,
    'name' | 'label' | 'isDropdown' | 'options'
  > {
  value: TeaserParams['category'];
}

export default function CategorySelector(props: CategoryComboboxProps) {
  return (
    <FilterComboBox
      name="category"
      label="Suche"
      value={props.value}
      options={categoryOptions}
      isDropdown
    />
  );
}
