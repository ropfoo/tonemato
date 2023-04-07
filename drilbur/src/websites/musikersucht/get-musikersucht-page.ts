import axios from 'axios';
import { load } from 'cheerio';
import { EntryTeaser } from '../../types';

export async function getMusikersuchtPage({
  url,
  pageCount = 1,
  updateLatestEntryDate,
  latestEntryDate,
}: {
  url: string;
  pageCount?: number;
  updateLatestEntryDate: (date: Date) => Promise<void>;
  latestEntryDate: Date;
}) {
  const pageUrl = url.replace(/\/page:1/, `/page:${pageCount}/`);

  const { data } = await axios.get(pageUrl);

  const $ = load(data);
  const teasers = $('tr');

  const entries: EntryTeaser[] = [];

  teasers.each((i, teaser) => {
    const url = `https://musiker-sucht.de/${$(teaser).find('a').attr().href}`;
    const [day, month] = $(teaser).find('.label').text().split('.');
    const date = new Date(
      `${month}.${day}.${new Date().getFullYear()}`
    ).toJSON();
    console.log('date: ', date);

    if (pageCount === 0 && i === 0) {
      updateLatestEntryDate(new Date(date));
    }

    console.log(latestEntryDate?.toJSON(), pageCount, i);
    const address = $(teaser).find('td:eq(3)').text().split('D-', 2)[1];
    const zipCode = address?.substring(0, 5);
    const city = address
      ?.substring(5, address?.length)
      .replace('...', '')
      .replace(' ', '');
    const title = $(teaser).find('td:eq(0)').text();
    const description = $(teaser).find('td:eq(1)').text();
    if (day) {
      entries.push({ url, date, title, description, zipCode, city });
    }
  });

  return entries;
}
