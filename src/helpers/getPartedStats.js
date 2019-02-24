import R from 'ramda';
import moment from 'moment-timezone';

const toAndRange = R.curry((field, [ from, to ]) => (
  { $and: [
    { $gte: [ field, new Date(from) ] },
    { $lte: [ field, new Date(to) ] }
  ]}
));
const toStartOfDay = R.map(el => moment(el).startOf('day').toDate());

/**
 * Object of date ranges
 *
 * @typedef   {Array} DateRange
 * 
 * @property  {(Moment|Date)} ranges[0] Start date
 * @property  {(Moment|Date)} ranges[1] End date
 */

/**
 * Object of date ranges
 *
 * @typedef {Object}      DateRanges
 * 
 * @property {(DateRange|null)}  ranges.first  First range
 * @property {(DateRange|null)}  ranges.range  Middle range
 * @property {(DateRange|null)}  ranges.last   Last range
 */

/**
 * @function
 * @name pickAndFilterRanges
 * 
 * @param {String[]}    names   Pick names from ranges
 * @param {DateRanges}  ranges  Object of date ranges
 * 
 * @description Get "names" props from "ranges".
 *              Filter values array els that are not equal to null. 
 *              If the result is empty, it returns "null" otherwise the filtered array
 */
const pickAndFilterRanges = R.curry((names, ranges) => R.pipe(
  R.pick,
  R.values,
  R.filter(R.complement(R.isNil)),
  R.ifElse(
    R.isEmpty,
    R.always(null),
    R.identity
  )
)(names, ranges));

/**
 * @function
 * @name searchFnOr
 * 
 * @param {Function}                      fn      Function that call if ranges is not nil
 * @param {(DateRange[]|DateRange|null)}  ranges  Date range
 * 
 * @returns {Object[]}                            Result of function or [{}]
 */
const searchFnOr = R.curry((fn, ranges) => R.ifElse(R.isNil, R.always([{}]), fn)(ranges));

const getNotFullStatsFromRanges = R.curry((search, { chat, rangeField }, ranges) => R.pipe(
  R.map(toAndRange(rangeField)),
  search(chat, R.flatten(R.map(toStartOfDay, ranges)))
)(ranges));

export const getNotFullStats = (search, match, ranges) => R.pipe(
  pickAndFilterRanges([ 'first', 'last' ]),
  searchFnOr(getNotFullStatsFromRanges(search, match))
)(ranges);

export const getFullStats = (search, match, ranges) => R.pipe(
  R.prop('range'),
  searchFnOr(search(match)),
)(ranges);
