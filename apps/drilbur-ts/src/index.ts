import fs from 'fs/promises';
import path from 'path';
import express from 'express';
import scrapeSites from './websites';
import { mockDataExists, loadMockData, saveMockData } from './helper/mockdata';
const app = express();

const { DRILBUR_PORT, NODE_ENV } = process.env;

app.get('/', (req, res) => {
  res.json({
    test: 'hello this is a test',
  });
});

app.get('/scrape', async (req, res) => {
  const scrapeResults = await scrapeSites('guitar', 'looking for musician');

  return res.json(scrapeResults);
});

if (NODE_ENV === 'development') {
  app.get('/mock', async (req, res) => {
    if (!(await mockDataExists()) || req.query.refresh === 'true')
      await saveMockData(await scrapeSites('guitar', 'looking for musician'));

    return res.json(await loadMockData());
  });
}

app.listen(DRILBUR_PORT || 3001);
