import axios from 'axios';
import { load } from 'cheerio';
import scrapeMusicStore from './musicstore';
import { MusicStoreAgeRange, MusicStoreInstrument } from './musicstore/filter';

async function init() {
  console.log('start');

  scrapeMusicStore({
    instrument: MusicStoreInstrument.guitar,
    ageRange: MusicStoreAgeRange['26-35'],
  });
}

init();
