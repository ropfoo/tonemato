import redis from './redis';

export async function getCache() {
  return JSON.parse(await redis.get('data'));
}
