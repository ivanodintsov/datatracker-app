import R from 'ramda';
import moment from 'moment-timezone';

/**
 * 
 * @param {Number}        offset  Hours offset for subtract
 * @param {(Moment|Date)} from    Start Date
 * @param {(Moment|Date)} to      End Date
 * 
 * @returns {Object} Dates range
 */
const getDatesFromTo = R.curry((offset, [ from, to ]) => {
  return {
    from: moment(from).subtract(-offset, 'hours').startOf('day').subtract(offset, 'hours'),
    to: moment(to).subtract(-offset, 'hours').endOf('day').subtract(offset, 'hours')
  };
});

export default getDatesFromTo;
