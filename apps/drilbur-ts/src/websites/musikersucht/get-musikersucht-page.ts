import axios from 'axios';
import { load } from 'cheerio';
import { createDate } from '../../helper/create-date';
import { Teaser } from 'tonemato-types';

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

  const entries: Teaser[] = [];

  teasers.each((i, teaser) => {
    const url = `https://musiker-sucht.de/${$(teaser).find('a').attr().href}`;
    const [day] = $(teaser).find('.label').text().split('.');

    const date = createDate($(teaser).find('.label').text(), 'musikersucht');

    const address = $(teaser).find('td:eq(3)').text().split('D-', 2)[1];
    const zipCode = address?.substring(0, 5);
    const city = address
      ?.substring(5, address?.length)
      .replace('...', '')
      .replace(' ', '');
    const title = $(teaser).find('td:eq(0)').text().trim();
    const description = $(teaser).find('td:eq(1)').text();
    if (day) {
      entries.push({
        url,
        date: date.toJSON(),
        title,
        description,
        zipCode,
        city,
        domain: 'musikersucht',
      });
    }
  });

  return entries;
}
