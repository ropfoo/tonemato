export type FilterOption = {
  text: string;
  value: string;
};

export type FilterName = 'category' | 'instrument' | 'location';

export type FilterState = {
  activeFilter: FilterName | null;
  filter: { [name in FilterName]: string };
};

export type FilterContextType = [
  state: FilterState,
  actions: {
    setActive: (name: FilterName) => void;
    updateValue: (name: FilterName, value: string) => void;
  }
];
