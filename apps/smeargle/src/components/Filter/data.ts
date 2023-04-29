import { TeaserRequestParams } from 'tonemato-types';
import { FilterName, FilterOption, FilterState } from './types';

export const categoryOptions: FilterOption<TeaserRequestParams['category']> = {
  all: 'Bands und Musiker',
  bsm: 'Band',
  msb: 'Musiker',
};

export const instrumentOptions: FilterOption<
  TeaserRequestParams['instrument']
> = {
  all: 'Alle',
  vocals: 'Gesang',
  bass: 'Bass',
  guitar: 'Gitarre',
  drums: 'Schlagzeug',
};

export const filterPlaceholder: {
  [name in FilterName]: { simple: string; detail: string };
} = {
  category: { simple: 'Bands und Musiker', detail: 'Bands und Musiker' },
  instrument: { simple: 'Instrument', detail: 'Instrument wählen' },
  zipCode: { simple: 'Ort', detail: 'Überall' },
};

export const filterDefaultState: FilterState = {
  activeFilter: null,
  filter: {
    category: { text: categoryOptions.all, value: 'all' },
    instrument: { text: instrumentOptions.all, value: 'all' },
    zipCode: null,
  },
};

export const filterData = {
  category: {
    position: 1,
  },
  instrument: {
    position: 2,
  },
  zipCode: {
    position: 3,
  },
};
