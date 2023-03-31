import Redis from 'ioredis';

const redis = new Redis({
  port: 6379,
  host: 'host.docker.internal',
});

export const cacheKeys = {
  backstagepro: 'backstagepro',
  musicstore: 'musicstore',
  musikersucht: 'musikersucht',
} as const;

export default redis;
