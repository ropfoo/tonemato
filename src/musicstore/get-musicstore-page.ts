import axios from 'axios';
import { load } from 'cheerio';

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
  let entries = [];
  teasers.each((i, teaser) => {
    const url = $(teaser).find('.teaser-content a').attr().href;
    const date = $(teaser).find('.date').text();
    entries.push({ date, url });
  });

  return {
    entries,
  };
}
