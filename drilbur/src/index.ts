import scrapeMusicStore from './musicstore';
import {
  MusicStoreAgeRange,
  MusicStoreCategory,
  MusicStoreInstrument,
} from './musicstore/filter';
import express from 'express';

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

app.listen(3001);
