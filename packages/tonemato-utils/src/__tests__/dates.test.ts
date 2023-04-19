import { isTimePassed } from '../dates';

describe('isTimePassed', () => {
  it('should not be passed one day ago', () => {
    const isPassed = isTimePassed({ date: new Date(), timeOffset: 'oneDay' });

    expect(isPassed).toBe(false);
  });

  it('should be passed one day ago', () => {
    // create yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1.1);

    const isPassed = isTimePassed({
      date: yesterday,
      timeOffset: 'oneDay',
    });

    expect(isPassed).toBe(true);
  });
});
