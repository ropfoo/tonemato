import {
  BackstageproCategory,
  BackstageproInstrument,
  scrapeBackstagepro,
} from './backstagepro';
import {
  MusicStoreCategory,
  MusicStoreInstrument,
  scrapeMusicStore,
} from './musicstore';
import {
  MusikersuchtCategory,
  MusikersuchtInstrument,
  scrapeMusikersucht,
} from './musikersucht';

// final scrape function that calls platform specific scrapers
export default async (instrument: string, category: string) => {
  return (
    await Promise.all([
      scrapeBackstagepro({
        instrument: BackstageproInstrument[instrument],
        category: BackstageproCategory[category],
      }),
      scrapeMusicStore({
        instrument: MusicStoreInstrument[instrument],
        category: MusicStoreCategory[category],
      }),
      scrapeMusikersucht({
        instrument: MusikersuchtInstrument[instrument],
        category: MusikersuchtCategory[category],
      }),
    ])
  ).map((val, index, arr) => ({
    backstagepro: arr[0], // same order as scrape order above
    musicstore: arr[1],
    musikersucht: arr[2],
  }))[0]; // remove wrapping array with one element from Promise.all
};
