let prevDate: Date = new Date();

export function createDate(dateValue: string) {
  if (dateValue) {
    const [day, month, year] = dateValue.split('.');
    console.log(dateValue);
    if (year) return new Date(`${month}.${day}.${year}`);

    // handle no year
    const date = new Date(`${month}.${day}.${prevDate.getFullYear()}`);

    // is previous year
    if (date.getMonth() > prevDate.getMonth()) {
      date.setFullYear(prevDate.getFullYear() - 1);
    }

    prevDate = date;

    return date;
  }
}
