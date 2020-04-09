import moment from 'moment-timezone';

const getQuarterMinutes = minutes => 15 * Math.floor((minutes * 4) / 60);

export const getStatisticsHour = (input) => {
  const date = moment(input).startOf('day');

  const querter = moment(input);
  const querterMinutes = getQuarterMinutes(querter.minutes());
  querter.startOf('hour').minutes(querterMinutes);

  return {
    date,
    querter,
  };
};
