import axios from 'axios';
import { load } from 'cheerio';
import { createDate } from '../../helper/create-date';
import { EntryTeaser } from '../../types';

export async function getMusicStorePage({
  url,
  pageCount = 1,
}: {
  url: string;
  pageCount?: number;
}) {
  const pageUrl = url.replace(/\/page\/1\//, `/page/${pageCount}/`);
  const { data } = await axios.get(pageUrl);

  const $ = load(data);
  const teasers = $('.teaser');

  const entries: EntryTeaser[] = [];

  teasers.each((i, teaser) => {
    const url = $(teaser).find('.teaser-content a').attr().href;
    const date = createDate($(teaser).find('.date').text(), 'musicstore');
    const address = $(teaser).find('.city').text();
    const zipCode = address?.substring(0, 5);
    const city = address?.substring(5, address?.length).replace(', ', '');
    const title = $(teaser).find('.teaser-body h4').text();
    const description = $(teaser).find('.teaser-text').text();
    const previewImageUrl = $(teaser).find('img').attr('src');

    entries.push({
      url,
      date: date.toJSON(),
      title,
      description,
      zipCode,
      city,
      previewImageUrl,
      origin: 'musicstore',
    });
  });

  return entries;
}
