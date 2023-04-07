import { Domain } from '../types';

const prev: { date: Date; domain: Domain } = {
  date: new Date(),
  domain: null,
};

export function createDate(dateValue: string, domain: Domain) {
  if (dateValue) {
    const [day, month, year] = dateValue.split('.');

    if (year) return new Date(`${month}.${day}.${year}`);

    // handle no year
    const date = new Date(`${month}.${day}.${prev.date.getFullYear()}`);

    // is previous year
    if (prev.domain === domain && date.getMonth() > prev.date.getMonth()) {
      date.setFullYear(prev.date.getFullYear() - 1);
    }

    prev.date = date;

    return date;
  }
}
