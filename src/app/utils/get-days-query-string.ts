import { format, subDays } from 'date-fns';

export function getDaysQueryString(nbOfDays: number): string {
  let qs = '';
  for (let i = 1; i < nbOfDays; i++) {
    let date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    qs = qs.concat('&dates[]=' + date);
  }
  return qs;
}
