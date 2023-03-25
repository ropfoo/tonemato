import axios from 'axios';
import { load } from 'cheerio';
import { Filter } from './filter';
import { getMusicStorePage } from './get-musicstore-page';

export default async function scrapeMusicStore({
  instrument,
  ageRange,
  category,
}: Filter) {
  const url = `https://musikersuche.musicstore.de/filter-ergebnisse/page/1/?category=${category}&instrument=${instrument}&age=${ageRange}&plz=51149&city=K%C3%B6ln&umkreis=20`;

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
