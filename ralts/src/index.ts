import express from 'express';
import { getCache } from './cache/get-cache';
import updateCache from './cache/update-cache';

const app = express();

app.get('/', async (req, res) => {
  const cache = await getCache();

  res.json({
    type: 'cache',
    test: 'hello from ralts',
    cache,
  });
});

app.listen(3005, async () => {
  try {
    console.log('ralts is starting');
    console.log('updating cache...');

    // comment out in dev after init to prevent refetch by nodemon
    await updateCache();

    console.log('cache was successfully updated!');
    console.log('ralts is ready to use!');
  } catch (e) {
    console.error('failed updating cache: ', e);
  }
});
