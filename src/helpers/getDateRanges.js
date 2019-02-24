
import moment from 'moment-timezone';
import R from 'ramda';

/**
 * Check if range is full day (equal 86399999ms)
 * @function
 * @name isFullDay
 * 
 * @param {DateRange} range Date range
 * 
 * @returns {Boolean}
 */
const isFullDay = ([ from, to ]) => to.diff(from, 'ms') === 86399999;

const newRange = R.curry((range, newDates) => {
  if (R.is(Array, range) && range.length !== 0) {
    return [ range[0], newDates[1] ];
  }

  return [ newDates[0], newDates[1] ];
});

/**
 * 
 * @param {DateRange} range 
 * @param {DateRange} addRange 
 */
const addDayToRange = (range, addRange) => R.ifElse(
  isFullDay,
  newRange(range),
  R.always(range)
)(addRange);

const rangeToISO = range => R.is(Array, range)
  ? [ range[0].toISOString(), range[1].toISOString() ]
  : null;

const getDateRanges = ({ from, to }) => {
  const fromUTC = moment(from).tz('UTC');
  const toUTC = moment(to).tz('UTC');
  const rangeDuration = moment.duration(toUTC.diff(fromUTC));
  const daysCount = rangeDuration.as('d');

  if (daysCount >= 1) {
    const first = [ fromUTC, fromUTC.clone().endOf('d') ];
    const last = [ toUTC.clone().startOf('d'), toUTC ];
    const range = [ fromUTC.clone().add(1, 'd').startOf('d'), toUTC.clone().add(-1, 'd').endOf('d') ];
    const dates = {
      first: null,
      range: null,
      last: null
    };

    if (last[0].unix() - first[1].unix() === 1) {
      const dates = {
        first: null,
        range: null,
        last: null
      };

      if (isFullDay(first)) {
        dates.range = [ first[0], first[1] ];
      }

      if (!isFullDay(first)) {
        dates.first = first;
      }

      dates.range = addDayToRange(dates.range, last);
      if (!isFullDay(last)) {
        dates.last = last;
      }

      return dates;
    }

    if (isFullDay(first)) {
      dates.range = [ first[0], first[1] ];
    } else {
      dates.first = first;
    }

    dates.range = newRange(dates.range, range);
    dates.range = addDayToRange(dates.range, last);

    if (!isFullDay(last)) {
      dates.last = last;
    }

    dates.first = rangeToISO(dates.first);
    dates.range = rangeToISO(dates.range);
    dates.last = rangeToISO(dates.last);

    return dates;
  }

  return {
    first: rangeToISO([ fromUTC, toUTC ]),
    range: null,
    last: null
  };
};

export default getDateRanges;
