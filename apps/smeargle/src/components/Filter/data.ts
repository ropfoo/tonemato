import { FilterName, FilterOption } from './types';

export const categoryOptiones: FilterOption[] = [
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
  instrument: { simple: 'Instrument', detail: 'Alle' },
  location: { simple: 'Ort', detail: 'Überall' },
};
