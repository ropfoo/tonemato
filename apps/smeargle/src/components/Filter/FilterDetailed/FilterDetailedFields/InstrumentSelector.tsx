import { TeaserParams } from '~/generated/tygo';
import { instrumentOptions } from '../../data';
import { FilterComboBoxProps } from '../../types';
import FilterComboBox from '../FilterComboBox';

interface InstrumentComboboxProps
  extends Omit<
    FilterComboBoxProps<TeaserParams['instrument']>,
    'name' | 'label' | 'isDropdown' | 'options'
  > {
  value: TeaserParams['instrument'];
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
