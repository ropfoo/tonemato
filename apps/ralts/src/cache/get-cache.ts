import redis from './redis';

export async function getCache(cacheKey: string) {
  return JSON.parse(await redis.get(cacheKey));
}
