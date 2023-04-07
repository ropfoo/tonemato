export type BackstagepoFilter = {
  instrument: BackstageproInstrument;
  category: BackstageproCategory;
};

export enum BackstageproInstrument {
  guitar = 'guitar',
  bass = 'bass',
}

export enum BackstageproCategory {
  'looking for band' = 'musikersuchtband',
  'looking for musician' = 'bandsuchtmusiker',
}
