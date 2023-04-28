import { TeaserRequestParams } from 'tonemato-types';

export type FilterOption = {
  text: string;
  value: string;
};

export type FilterName = 'category' | 'instrument' | 'zipCode';

export type FilterState = {
  activeFilter: FilterName | null;
  filter: {
    category: TeaserRequestParams['category'];
    instrument: TeaserRequestParams['instrument'];
    zipCode: TeaserRequestParams['zipCode'];
  };
};

export type FilterContextType = [
  state: FilterState,
  actions: {
    setActive: (name: FilterName) => void;
    updateValue: (name: FilterName, value: string) => void;
  }
];
