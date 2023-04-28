import express, { Request } from 'express';
import cors from 'cors';
import { getCache } from './cache/get-cache';
import updateCache from './cache/update-cache';
import { isCacheStale } from './cache/is-cache-stale';
import { TeaserRequestParams } from 'tonemato-types';

const { VITE_RALTS_PORT, SMEARGLE_PORT, SMEARGLE_DOMAIN, NODE_ENV } =
  process.env;

const app = express();
app.use(
  cors({
    origin: `${SMEARGLE_DOMAIN}:${SMEARGLE_PORT}`,
  })
);

app.get('/', async (req: Request<TeaserRequestParams>, res) => {
  const cache = await getCache();

  console.log('params: ', req.params);
  const { category, instrument, zipCode } = req.query;
  console.log('Request', category, instrument, zipCode);
  if (instrument === 'Gitarre') {
    // to see change in ui
    console.log('its Gitarre lel now you get nothin!');
    return res.json({
      type: 'cache',
      cache: [],
    });
  }

  res.json({
    type: 'cache',
    cache,
  });
});

if (NODE_ENV === 'development') {
  app.get('/nocache', async (req, res) => {
    await updateCache();
    const cache = await getCache();

    return res.json({
      type: 'cache',
      cache,
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
