import { Category, Instrument } from './general';

export type TeaserRequestParams = {
  instrument: Instrument;
  category: Category;
  zipCode: number;
};
