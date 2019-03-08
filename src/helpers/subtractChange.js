import R from 'ramda';

/**
 * @function    subtractChangeObj
 * @description Calculate subtract change between two objects and return calculated object.
 * 
 * @param       {String[]}          props   - Props for calculation
 * @param       {[Object, Object]}  data    - List of objects for calculation
 * 
 * @returns     {Object}                    - Calculated object
 */
const subtractChangeObj = (props, data) => R.reduce(
  (acc, key) => R.pipe(
    R.converge(R.subtract, [R.pathOr(0, [1, key]), R.pathOr(0, [0, key])]),
    R.assoc(key, R.__, acc)
  )(data),
  {},
  props
);

export default subtractChangeObj;
