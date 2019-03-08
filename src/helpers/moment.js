import moment from 'moment-timezone';

export const yesterdayDate = date => moment(date)
  .startOf('day')
  .subtract(1, 'days')
  .toDate();
