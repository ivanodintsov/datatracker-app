import R from 'ramda';
import getTimeZoneOffset from './getTimeZoneOffset';
import getDatesFromTo from './getDatesFromTo';
import getDateRanges from './getDateRanges';

/**
 * @function
 * @name timeZoneDateRanges
 * 
 * @param {String}    timeZone  Time zone name
 * @param {DateRange} range     Date range
 * 
 * @returns {DateRanges}
 */
const timeZoneDateRanges = (timeZone, range) => R.pipe(
  getTimeZoneOffset,
  getDatesFromTo(R.__, range),
  getDateRanges
)(timeZone);

export default timeZoneDateRanges;
