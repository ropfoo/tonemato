export type BackstagepoFilter = {
  instrument: BackstageproInstrument;
  category: BackstageproCategory;
};

export enum BackstageproInstrument {
  guitar = 'guitar',
  bass = 'bass',
  drums = 'drums',
  vocals = 'vocals_classic',
}

export enum BackstageproCategory {
  'looking for band' = 'musikersuchtband',
  'looking for musician' = 'bandsuchtmusiker',
}
