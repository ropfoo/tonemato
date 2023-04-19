import axios from 'axios';
import redis from './redis';

const { DRILBUR_PORT } = process.env;

export default async function updateCache() {
  try {
    console.log('fetching data');
    const { data } = await axios.get(`http://drilbur:${DRILBUR_PORT}/scrape`);

    redis.set('data', JSON.stringify(data));
    console.log('Teasers stored!');

    redis.set('timestamp', new Date().toJSON());

    console.log('done!');
  } catch (e) {
    console.error('failed fetching data: ', e);
    throw new Error(e);
  }
}
