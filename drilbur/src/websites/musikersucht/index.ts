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

  const pageCount = $('.pagination a').length ?? 0;
  // const pageCount = 0;

  let latestEntryDate: Date = new Date();
  const updateLatestEntryDate = async (date: Date) => {
    console.log('in update: ', date);
    latestEntryDate = date;
  };

  for (let index = 0; index <= pageCount; index++) {
    console.log('LEL', latestEntryDate);
    const page = await getMusikersuchtPage({
      url,
      pageCount: index,
      latestEntryDate,
      updateLatestEntryDate,
    });
    pages.push(page);
  }

  return { pages };
}
