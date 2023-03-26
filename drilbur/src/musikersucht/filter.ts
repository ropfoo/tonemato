export type Filter = {
  instrument: MusikersuchtInstrument;
  category: MusikersuchtCategory;
  plz?: string;
};

export enum MusikersuchtInstrument {
  guitar = 4,
  bass = 2,
}

export enum MusikersuchtCategory {
  'looking for band' = 'band',
  'looking for musician' = 'musician',
}
