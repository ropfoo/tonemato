import express from 'express';
import cors from 'cors';
import updateCache from './cache/update-cache';
import { isCacheStale } from './cache/is-cache-stale';
import { getCache } from './cache/get-cache';

const { VITE_RALTS_PORT, SMEARGLE_PORT, SMEARGLE_DOMAIN, MODE } = process.env;

const app = express();
app.use(
  cors({
    origin: `${SMEARGLE_DOMAIN}:${SMEARGLE_PORT}`,
  })
);

app.get('/', async (req, res) => {
  const teasers = await getCache('raw');
  return res.json({
    type: 'cache',
    teasers,
  });
});

if (MODE === 'development') {
  app.get('/nocache', async (req, res) => {
    await updateCache();
    const teasers = await getCache('raw');
    return res.json({
      type: 'nocache',
      teasers,
    });
  });
}

app.listen(VITE_RALTS_PORT || 3005, async () => {
  try {
    console.log('ralts is starting');

    if (await isCacheStale()) {
      console.log('updating cache...');
      await updateCache();
      console.log('cache was successfully updated!');
    } else {
      console.log('cache is already up to date!');
    }

    console.log('ralts is ready to use!');
  } catch (e) {
    console.error('failed updating cache:  ', e);
  }
});
