import express from 'express';
import redis from './redis';
import updateCache from './update-cache';

const app = express();

app.get('/musicstore', async (req, res) => {
  const cache = await redis.get('musicstore');

  res.json({
    type: 'cache',
    test: 'hello from ralts',
    ...JSON.parse(cache),
  });
});

app.get('/backstagepro', async (req, res) => {
  const cache = await redis.get('backstagepro');

  res.json({
    type: 'cache',
    test: 'hello from ralts',
    ...JSON.parse(cache),
  });
});

app.get('/musikersucht', async (req, res) => {
  const cache = await redis.get('musikersucht');

  res.json({
    type: 'cache',
    test: 'hello from ralts',
    ...JSON.parse(cache),
  });
});

app.listen(3005, async () => {
  try {
    console.log('ralts is starting');
    console.log('updating cache...');
    await updateCache();
    console.log('cache was successfully updated!');
    console.log('ralts is ready to use!');
  } catch (e) {
    console.error('failed updating cache: ', e);
  }
});
