import axios from 'axios';
import { load } from 'cheerio';
import { Filter } from './filter';

export default async function scrapeMusicStore({
  instrument,
  ageRange,
}: Filter) {
  const url = `https://musikersuche.musicstore.de/filter-ergebnisse/?category=msb&instrument=${instrument}&age=${ageRange}&plz=51149&city=K%C3%B6ln&umkreis=20`;
  const { data } = await axios.get(url);
  const $ = load(data);
  const links = $('.teaser-content a');

  links.each((i, linkElement) => {
    console.log(linkElement.attribs.href);
  });
}
