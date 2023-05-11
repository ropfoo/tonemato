import axios from 'axios';
import redis from './redis';

const { DRILBUR_PORT, DRILBUR_DOMAIN, IS_DOCKER } = process.env;

export default async function updateCache() {
  try {
    console.log('fetching data');
    const { data } = await axios.get(
      `${IS_DOCKER ? 'http://drilbur' : DRILBUR_DOMAIN}:${DRILBUR_PORT}`
    );

    // Transform all fetched teasers in a flattened form and store it in 'data'
    redis.set(
      'raw',
      JSON.stringify(
        Object.keys(data)
          .map((domain) => data[domain])
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
