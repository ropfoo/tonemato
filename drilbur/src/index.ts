import express from 'express';
import {
  BackstageproInstrument,
  MusicStoreAgeRange,
  MusicStoreCategory,
  MusicStoreInstrument,
  MusikersuchtCategory,
  MusikersuchtInstrument,
  scrapeBackstagepro,
  scrapeMusicStore,
  scrapeMusikersucht,
} from './websites';
const app = express();

app.get('/', (req, res) => {
  res.json({
    test: 'hello',
  });
});

app.get('/musicstore', async (req, res) => {
  const musicStoreResult = await scrapeMusicStore({
    instrument: MusicStoreInstrument.guitar,
    ageRange: MusicStoreAgeRange['26-35'],
    category: MusicStoreCategory['looking for band'],
  });
  res.json({
    data: musicStoreResult,
  });
});

app.get('/musikersucht', async (req, res) => {
  const musicStoreResult = await scrapeMusikersucht({
    instrument: MusikersuchtInstrument.guitar,
    category: MusikersuchtCategory['looking for musician'],
  });
  res.json({
    data: musicStoreResult,
  });
});

app.get('/backstagepro', async (req, res) => {
  const musicStoreResult = await scrapeBackstagepro({
    instrument: BackstageproInstrument.guitar,
    category: BackstageproInstrument['looking for musician'],
  });
  res.json({
    data: musicStoreResult,
  });
});

app.listen(3001);
