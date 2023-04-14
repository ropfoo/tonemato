import { isTimePassed } from 'tonemato-utils';
import redis from './redis';

export async function isCacheStale() {
  try {
    const latestTimestamp = await redis.get('timestamp');
    if (!latestTimestamp) return true;
    return isTimePassed({
      date: new Date(latestTimestamp),
      timeOffset: 'oneDay',
    });
  } catch (e) {
    console.log(e);
    return true;
  }
}
