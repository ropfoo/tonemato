import axios from 'axios';
import { load } from 'cheerio';
import { MusikersuchtFilter } from './filter';
import { getMusikersuchtPage } from './get-musikersucht-page';

export * from './get-musikersucht-page';
export * from './filter';

export async function scrapeMusikersucht({
  instrument,
  category,
}: MusikersuchtFilter) {
  const url = `https://www.musiker-sucht.de/requests/index/${category}/instrument:${instrument}/page:1/`;

  const { data } = await axios.get(url);

  const $ = load(data);
  const pages = [];

  const pageCount =
    $('.pagination').first().find('[currenttag="a"]').length + 1;

  for (let index = 1; index <= pageCount; index++) {
    const page = await getMusikersuchtPage({
      url,
      pageCount: index,
    });
    pages.push(...page);
  }

  return pages;
}
