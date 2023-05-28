import { TeaserParams } from '~/generated/tygo';

export type FilterOption<T extends TeaserParams[FilterName]> = {
  [key in T]: string;
};

export type FilterName = 'category' | 'instrument' | 'zipCode';

export type FilterStateField<TFilterName extends FilterName> = {
  text: string;
  value: TeaserParams[TFilterName];
} | null;

export type FilterState = {
  activeFilter: FilterName | null;
  filter: {
    category: FilterStateField<'category'>;
    instrument: FilterStateField<'instrument'>;
    zipCode: FilterStateField<'zipCode'>;
  };
};

export type FilterContextType = [
  state: FilterState,
  actions: {
    setActive: (name: FilterName) => void;
    updateValue: (name: FilterName, value: string) => void;
  }
];

export interface FilterComboBoxProps<T extends TeaserParams[FilterName]> {
  name: FilterName;
  label: string;
  value: TeaserParams[FilterName];
  options?: FilterOption<T>;
  // turn combobox into dropdown (no text input)
  isDropdown?: boolean;
  hasSubmitButton?: boolean;
}
