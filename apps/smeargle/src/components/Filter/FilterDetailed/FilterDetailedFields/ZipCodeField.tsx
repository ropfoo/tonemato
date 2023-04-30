import { TeaserRequestParams } from 'tonemato-types';
import { FilterComboBoxProps } from '../../types';
import FilterComboBox from '../FilterComboBox';

interface ZipCodeFieldProps
  extends Omit<
    FilterComboBoxProps<TeaserRequestParams['zipCode']>,
    'name' | 'label' | 'isDropdown' | 'options'
  > {
  value: TeaserRequestParams['zipCode'];
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
