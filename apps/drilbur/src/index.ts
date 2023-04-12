import express from 'express';
import scrapeSites from './websites';
const app = express();

app.get('/', (req, res) => {
  res.json({
    test: 'hello this is a test',
  });
});

app.get('/scrape', async (req, res) => {
  const scrapeResults = await scrapeSites('guitar', 'looking for musician');

  return res.json(scrapeResults);
});

app.listen(3001);
