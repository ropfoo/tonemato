import axios from 'axios';
import redis from './redis';

export default async function updateCache() {
  // set backstagepro cache
  try {
    console.log('fetching data');
    const { data: { backstagepro, musicstore, musikersucht } } = await axios.get('http://drilbur:3001/scrape');
    redis.set('backstagepro', JSON.stringify(backstagepro));
    console.log('backstagepro Data stored!');

    redis.set('musicstore', JSON.stringify(musicstore));
    console.log('musicstore Data stored!');

    redis.set('musikersucht', JSON.stringify(musikersucht));
    console.log('Musikersucht Data stored!');
    console.log('done!');
  } catch (e) {
    console.error('failed fetching data: ', e);
    throw new Error(e);
  }
}
