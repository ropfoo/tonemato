import express from 'express';
import {
  BackstageproInstrument,
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
    category: MusicStoreCategory['looking for musician'],
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
