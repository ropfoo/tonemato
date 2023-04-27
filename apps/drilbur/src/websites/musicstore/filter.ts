export type MusicStoreFilter = {
  instrument: MusicStoreInstrument;
  category: MusicStoreCategory;
};

export enum MusicStoreInstrument {
  guitar = 5,
  bass = 6,
  drums = 4,
  vocals = 47,
}

export enum MusicStoreAgeRange {
  '26-35' = 21,
}

export enum MusicStoreCategory {
  'looking for band' = 'msb',
  'looking for musician' = 'bsm',
}
