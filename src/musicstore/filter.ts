export type Filter = {
  ageRange: MusicStoreAgeRange;
  instrument: MusicStoreInstrument;
};

export enum MusicStoreInstrument {
  guitar = 5,
  bass = 6,
}

export enum MusicStoreAgeRange {
  '26-35' = 21,
}
