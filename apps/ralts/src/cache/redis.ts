import Redis from 'ioredis';

const {
  IS_DOCKER
} = process.env

const redis = new Redis({
  port: 6379,
  host: IS_DOCKER ? 'host.docker.internal' : '127.0.0.1',
});

export const cacheKeys = {
  backstagepro: 'backstagepro',
  musicstore: 'musicstore',
  musikersucht: 'musikersucht',
} as const;

export default redis;
