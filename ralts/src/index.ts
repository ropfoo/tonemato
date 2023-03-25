import axios from 'axios';
import express from 'express';
import Redis from 'ioredis';

const redis = new Redis({
  port: 6379, // Redis port
  host: 'host.docker.internal', // Redis host
});

const app = express();

app.get('/', async (req, res) => {
  const cache = await redis.get('lel');

  if (cache) {
    return res.json({ type: 'cache', ...JSON.parse(cache) });
  }
  const { data } = await axios.get('http://drilbur:3001/musicstore');
  redis.set('lel', JSON.stringify(data));
  res.json({
    type: 'no-cache',
    test: 'hello from ralts',
    data,
  });
});

app.listen(3005);
