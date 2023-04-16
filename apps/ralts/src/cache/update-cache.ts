import axios from 'axios';
import redis from './redis';

const {
  DRILBUR_PORT,
} = process.env

export default async function updateCache() {
  try {
    console.log('fetching data');
    const {
      data: { backstagepro, musicstore, musikersucht },
    } = await axios.get(`http://drilbur:${DRILBUR_PORT}/scrape`);

    redis.set('backstagepro', JSON.stringify(backstagepro));
    console.log('backstagepro Data stored!');

    redis.set('musicstore', JSON.stringify(musicstore));
    console.log('musicstore Data stored!');

    redis.set('musikersucht', JSON.stringify(musikersucht));
    console.log('Musikersucht Data stored!');

    redis.set('timestamp', new Date().toJSON());

    console.log('done!');
  } catch (e) {
    console.error('failed fetching data: ', e);
    throw new Error(e);
  }
}
