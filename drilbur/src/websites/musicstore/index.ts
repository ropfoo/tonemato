import axios from 'axios';
import { load } from 'cheerio';
import { MusicStoreFilter } from './filter';
import { getMusicStorePage } from './get-musicstore-page';

export * from './get-musicstore-page';
export * from './filter';

export async function scrapeMusicStore({
  instrument,
  category,
}: MusicStoreFilter) {
  const url = `https://musikersuche.musicstore.de/filter-ergebnisse/page/1/?category=${category}&instrument=${instrument}`;

  const { data } = await axios.get(url);

  const $ = load(data);
  const pages = [];

  const pageCount = $('.pagination-link').length;

  for (let index = 1; index <= pageCount; index++) {
    const page = await getMusicStorePage({ url, pageCount: index });
    pages.push(page);
  }

  return { pages };
}
