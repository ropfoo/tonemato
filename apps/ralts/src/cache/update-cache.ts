import axios from 'axios';
import redis from './redis';

const { DRILBUR_PORT } = process.env;

export default async function updateCache() {
  try {
    console.log('fetching data');
    const { data } = await axios.get(`http://drilbur:${DRILBUR_PORT}/scrape`);

    // Transform all fetched teasers in a flattened form and store it in 'data'
    redis.set(
      'data',
      JSON.stringify(
        Object.keys(data)
          .map((domain) => data[domain].pages.flat())
          .flat()
      )
    );
    console.log('Teasers stored!');

    redis.set('timestamp', new Date().toJSON());

    console.log('done!');
  } catch (e) {
    console.error('failed fetching data: ', e);
    throw new Error(e);
  }
}
