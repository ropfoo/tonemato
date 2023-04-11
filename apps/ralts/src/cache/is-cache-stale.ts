import redis from "./redis";

export async function isCacheStale() {
  try {
    const latestTimestamp = await redis.get("timestamp");
    const oneDayAgo = Date.now() - 1000 * 60 * 60 * 24;
    return new Date(latestTimestamp).getMilliseconds() > oneDayAgo;
  } catch (e) {
    console.log(e);
    return true;
  }
}
