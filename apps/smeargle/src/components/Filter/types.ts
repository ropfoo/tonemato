import { TeaserRequestParams } from 'tonemato-types';

export type FilterOption<T extends TeaserRequestParams[FilterName]> = {
  [key in T]: string;
};

export type FilterName = 'category' | 'instrument' | 'zipCode';

export type FilterStateField<TFilterName extends FilterName> = {
  text: string;
  value: TeaserRequestParams[TFilterName];
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

export interface FilterComboBoxProps<
  T extends TeaserRequestParams[FilterName]
> {
  name: FilterName;
  label: string;
  value: TeaserRequestParams[FilterName];
  options?: FilterOption<T>;
  // turn combobox into dropdown (no text input)
  isDropdown?: boolean;
}
