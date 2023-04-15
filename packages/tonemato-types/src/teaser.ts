import { Domain } from './general';

export type Teaser = {
  url: string;
  date: string;
  title: string;
  description?: string;
  zipCode: string;
  city: string;
  previewImageUrl?: string;
  domain: Domain;
};
