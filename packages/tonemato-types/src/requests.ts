import { Category, Instrument } from './general';

export type TeaserRequestParams = {
  instrument: Instrument | null;
  category: Category;
  zipCode: string | null;
};
