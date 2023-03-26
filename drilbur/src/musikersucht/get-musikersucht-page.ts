import axios from 'axios';
import { load } from 'cheerio';
import { EntryTeaser } from '../types';

export async function getMusikersuchtPage({
  url,
  pageCount = 1,
}: {
  url: string;
  pageCount?: number;
}) {
  const pageUrl = url.replace(/\/page:1/, `/page:${pageCount}/`);

  const { data } = await axios.get(pageUrl);

  const $ = load(data);
  const teasers = $('tr');

  const entries: EntryTeaser[] = [];

  teasers.each((i, teaser) => {
    const url = `https://musiker-sucht.de/${$(teaser).find('a').attr().href}`;
    const date = $(teaser).find('.label').text();
    const address = $(teaser).find('td:eq(3)').text().split('D-', 2)[1];
    const zipCode = address?.substring(0, 5);
    const city = address
      ?.substring(5, address?.length)
      .replace('...', '')
      .replace(' ', '');
    const title = $(teaser).find('td:eq(0)').text();
    const description = $(teaser).find('td:eq(1)').text();
    if (date) {
      entries.push({ url, date, title, description, zipCode, city });
    }
  });

  return entries;
}
