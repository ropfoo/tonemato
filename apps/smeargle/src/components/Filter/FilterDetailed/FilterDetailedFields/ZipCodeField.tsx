import { TeaserParams } from '~/generated/tygo';
import { FilterComboBoxProps } from '../../types';
import FilterComboBox from '../FilterComboBox';

interface ZipCodeFieldProps
  extends Omit<
    FilterComboBoxProps<TeaserParams['zipCode']>,
    'name' | 'label' | 'isDropdown' | 'options'
  > {
  value: TeaserParams['zipCode'];
}

export default function ZipCodeField(props: ZipCodeFieldProps) {
  return (
    <FilterComboBox
      name="zipCode"
      label="PLZ"
      value={props.value}
      hasSubmitButton
    />
  );
}
