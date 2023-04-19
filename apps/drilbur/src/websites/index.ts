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
  ).flat();
};
