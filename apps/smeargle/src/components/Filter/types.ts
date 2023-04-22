export type FilterOption = {
  text: string;
  value: string;
};

export type FilterName = 'category' | 'instrument' | 'location';

export type FilterState = {
  activeFilter: FilterName | null;
  filter: { [name in FilterName]: { value: string } };
};
