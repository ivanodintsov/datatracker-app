import moment from 'moment-timezone';

const getQuarterMinutes = minutes => 15 * Math.floor((minutes * 4) / 60);

export const getStatisticsHour = (input) => {
  const date = moment(input).startOf('day');

  const quarter = moment(input);
  const quarterMinutes = getQuarterMinutes(quarter.minutes());
  quarter.startOf('hour').minutes(quarterMinutes);

  return {
    date,
    quarter,
  };
};
