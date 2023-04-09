export type EntryTeaser = {
  url: string;
  date: string;
  title: string;
  description?: string;
  zipCode: string;
  city: string;
  previewImageUrl?: string;
  origin: Domain;
};

export type Domain = 'backstagepro' | 'musikersucht' | 'musicstore';
