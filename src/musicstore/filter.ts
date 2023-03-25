export type Filter = {
  ageRange: MusicStoreAgeRange;
  instrument: MusicStoreInstrument;
  category: MusicStoreCategory;
};

export enum MusicStoreInstrument {
  guitar = 5,
  bass = 6,
}

export enum MusicStoreAgeRange {
  '26-35' = 21,
}

export enum MusicStoreCategory {
  'looking for band' = 'msb',
  'looking for musician' = 'bsm',
}
