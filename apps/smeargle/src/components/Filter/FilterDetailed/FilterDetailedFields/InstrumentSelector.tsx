import { TeaserRequestParams } from 'tonemato-types';
import { instrumentOptions } from '../../data';
import { FilterComboBoxProps } from '../../types';
import FilterComboBox from '../FilterComboBox';

interface InstrumentComboboxProps
  extends Omit<
    FilterComboBoxProps<TeaserRequestParams['instrument']>,
    'name' | 'label' | 'isDropdown' | 'options'
  > {
  value: TeaserRequestParams['instrument'];
}

export default function InstrumentSelector(props: InstrumentComboboxProps) {
  return (
    <FilterComboBox
      name="instrument"
      label="Instrument"
      value={props.value}
      options={instrumentOptions}
    />
  );
}
