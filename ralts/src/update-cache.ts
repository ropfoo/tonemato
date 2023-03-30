import axios from 'axios';
import redis from './redis';

export default async function updateCache() {
  // set backstagepro cache
  try {
    console.log('fetching data from backstage pro...');
    const backstagepro = await axios.get('http://drilbur:3001/backstagepro');
    redis.set('backstagepro', JSON.stringify(backstagepro.data));
    console.log('done!');
  } catch (e) {
    console.error('failed fetching backstagepro: ', e);
  }

  // set musicstore cache
  try {
    console.log('fetching data from musicstore...');
    const musicstore = await axios.get('http://drilbur:3001/musicstore');
    redis.set('musicstore', JSON.stringify(musicstore.data));
    console.log('done!');
  } catch (e) {
    console.error('failed fetching musicstore: ', e);
  }

  // set musikersucht cache
  try {
    console.log('fetching data from musikersucht...');
    const musikersucht = await axios.get('http://drilbur:3001/musikersucht');
    redis.set('musikersucht', JSON.stringify(musikersucht.data));
    console.log('done!');
  } catch (e) {
    console.error('failed fetching musikersucht: ', e);
  }
}
