import redis, { cacheKeys } from './redis';

export async function getCache() {
  const caches = await redis.mget(...Object.values(cacheKeys));

  return caches.reduce(
    (all, cache, index) => ({
      ...all,
      [Object.keys(cacheKeys)[index]]: JSON.parse(cache),
    }),
    {}
  );
}
