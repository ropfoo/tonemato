export const TIMES = {
  oneDay: 1000 * 60 * 60 * 24,
  oneHour: 1000 * 60 * 60,
  oneMinute: 1000 * 60,
  oneSecond: 1000,
} as const;

export function isTimePassed({
  date,
  timeOffset,
}: {
  date: Date;
  timeOffset: keyof typeof TIMES;
}) {
  return date.getTime() < Date.now() - TIMES[timeOffset];
}
