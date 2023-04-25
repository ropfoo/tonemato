import { FilterName, FilterOption, FilterState } from './types';

export const categoryOptions: FilterOption[] = [
  {
    text: 'Band',
    value: 'Band',
  },
  {
    text: 'Musiker',
    value: 'Musiker',
  },
  {
    text: 'Bands und Musiker',
    value: 'Bands und Musiker',
  },
];

export const instrumentOptions: FilterOption[] = [
  {
    text: 'Gesang',
    value: 'Gesang',
  },
  {
    text: 'Bass',
    value: 'Bass',
  },
  {
    text: 'Gitarre',
    value: 'Gitarre',
  },
  {
    text: 'Schlagzeug',
    value: 'Schlagzeug',
  },
];

export const filterPlaceholder: {
  [name in FilterName]: { simple: string; detail: string };
} = {
  category: { simple: 'Bands und Musiker', detail: 'Bands und Musiker' },
  instrument: { simple: 'Instrument', detail: 'Instrument wählen' },
  location: { simple: 'Ort', detail: 'Überall' },
};

export const filterDefaultState: FilterState = {
  activeFilter: null,
  filter: {
    category: '',
    instrument: '',
    location: '',
  },
};

export const filterData = {
  category: {
    position: 1,
  },
  instrument: {
    position: 2,
  },
  location: {
    position: 3,
  },
};
