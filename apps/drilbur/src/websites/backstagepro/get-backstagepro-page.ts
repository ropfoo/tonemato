import axios from 'axios';
import { load } from 'cheerio';
import { createDate } from '../../helper/create-date';
import { Teaser } from 'tonemato-types';

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

  const entries: Teaser[] = [];

  teasers.each((i, teaser) => {
    const url = `https://www.backstagepro.de${$(teaser).find('a').attr().href}`;

    const unformattedDate = $(teaser)
      .find('.feedhide')
      .find('span:eq(1)')
      .text()
      .replace(', ', '')
      .replace('Januar', '01.')
      .replace('Februar', '02.')
      .replace('März', '03.')
      .replace('April', '04.')
      .replace('Mai', '05.')
      .replace('Juni', '06.')
      .replace('Juli', '07.')
      .replace('August', '08.')
      .replace('September', '09.')
      .replace('Oktober', '10.')
      .replace('November', '11.')
      .replace('Dezember', '12.')
      .replace(' ', '');

    const date = createDate(unformattedDate, 'backstagepro');

    const address = $(teaser).find('h3').text();
    const zipCode = address?.substring(0, 5);
    const city = address?.substring(5, address?.length).replace(' ', '');
    const title = $(teaser).find('h2').text().trim();
    const description = $(teaser)
      .find('.infotable')
      .find('tr:first')
      .find('td:eq(1)')
      .text();

    const previewImageUrl = $(teaser)
      .find('img')
      ?.attr('data-lzsrc')
      ?.replace('/small/', '/large/');

    entries.push({
      url,
      date: date.toJSON(),
      title,
      description,
      zipCode,
      city,
      previewImageUrl,
      domain: 'backstagepro',
    });
  });

  return entries;
}
