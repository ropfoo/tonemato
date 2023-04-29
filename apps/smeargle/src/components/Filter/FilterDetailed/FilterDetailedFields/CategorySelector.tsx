import { TeaserRequestParams } from 'tonemato-types';
import { categoryOptions, instrumentOptions } from '../../data';
import { FilterComboBoxProps } from '../../types';
import FilterComboBox from '../FilterComboBox';

interface CategoryComboboxProps
  extends Omit<
    FilterComboBoxProps<TeaserRequestParams['category']>,
    'name' | 'label' | 'isDropdown' | 'options'
  > {
  value: TeaserRequestParams['category'];
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
