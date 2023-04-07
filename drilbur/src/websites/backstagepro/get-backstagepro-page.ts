import axios from 'axios';
import { load } from 'cheerio';
import { EntryTeaser } from '../../types';

export async function getBackstageproPage({
  url,
  pageCount = 1,
}: {
  url: string;
  pageCount?: number;
}) {
  const pageUrl = url.replace(/&page=1/, `&page=${pageCount}`);
  const { data } = await axios.get(pageUrl);

  const $ = load(data);
  const teasers = $('.media-object');

  const entries: EntryTeaser[] = [];

  teasers.each((i, teaser) => {
    const url = `https://www.backstagepro.de/${
      $(teaser).find('a').attr().href
    }`;
    const date = $(teaser)
      .find('.feedhide')
      .find('span:eq(1)')
      .text()
      .replace(', ', '');
    const address = $(teaser).find('h3').text();
    const zipCode = address?.substring(0, 5);
    const city = address?.substring(5, address?.length).replace(' ', '');
    const title = $(teaser).find('h2').text();
    const description = $(teaser)
      .find('.infotable')
      .find('tr:first')
      .find('td:eq(1)')
      .text();

    entries.push({ url, date, title, description, zipCode, city });
  });

  return entries;
}
