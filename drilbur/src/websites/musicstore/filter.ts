export type MusicStoreFilter = {
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
  'looking for band' = 'bsm',
  'looking for musician' = 'msb',
}
