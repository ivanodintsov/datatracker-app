import R from 'ramda';

/**
 * @function    percentageChange
 * @description Calculate percentage change between two values and return calculated value.
 * 
 * @param       {Number}  newNumber     - New Value
 * @param       {Number}  oldNumber     - Old value
 * 
 * @returns     {Number}                - Calculated number
 */
export const percentageChange = (newNumber, oldNumber) => R.pipe(
  R.subtract,
  R.divide(R.__, R.or(oldNumber, 1)),
  R.multiply(100)
)(newNumber, oldNumber);

/**
 * @function    percentageChangeObj
 * @description Calculate percentage change between two objects and return calculated object.
 * 
 * @param       {String[]}          props   - Props for calculation
 * @param       {[Object, Object]}  data    - List of objects for calculation
 * 
 * @returns     {Object}                    - Calculated object
 */
const percentageChangeObj = (props, data) => R.reduce(
  (acc, key) => R.pipe(
    R.converge(percentageChange, [R.pathOr(1, [1, key]), R.pathOr(1, [0, key])]),
    R.assoc(key, R.__, acc)
  )(data),
  {},
  props
);

export default percentageChangeObj;
