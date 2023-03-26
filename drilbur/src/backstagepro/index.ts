import axios from 'axios';
import { load } from 'cheerio';
import { Filter } from './filter';
import { getBackstageproPage } from './get-backstagepro-page';

export default async function scrapeBackstagepro({
  instrument,
  category,
}: Filter) {
  const url = `https://www.backstagepro.de/musikersuche?city=&radius=40&city_name=&city_country=&city_lon=&city_lat=&address=&orderby=lastmod&instruments[]=${instrument}&rubrik=${category}&page=1`;

  const { data } = await axios.get(url);

  const $ = load(data);
  const pages = [];

  const pageCount = Number($('.pagination > li').last().text()) ?? 0;

  for (let index = 0; index <= pageCount; index++) {
    const page = await getBackstageproPage({ url, pageCount: index });
    pages.push(page);
  }

  return { pages };
}
