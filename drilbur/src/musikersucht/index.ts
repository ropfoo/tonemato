import axios from 'axios';
import { load } from 'cheerio';
import { Filter } from './filter';
import { getMusikersuchtPage } from './get-musikersucht-page';

export default async function scrapeMusikersucht({
  instrument,
  category,
  plz = '',
}: Filter) {
  const url = `https://www.musiker-sucht.de/requests/index/${category}/instrument:${instrument}/plz:${plz}/page:1/`;

  const { data } = await axios.get(url);

  const $ = load(data);
  const pages = [];

  const pageCount = $('.pagination a').length ?? 0;

  for (let index = 0; index <= pageCount; index++) {
    const page = await getMusikersuchtPage({ url, pageCount: index });
    pages.push(page);
  }

  return { pages };
}
