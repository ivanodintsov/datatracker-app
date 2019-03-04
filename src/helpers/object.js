import R from 'ramda';

const defaultZero = R.ifElse(R.is(Number), R.identity, R.always(0));

export const sumObjByKey = obj1 => (obj2, key) => {
  const num1 = R.propOr(0, key, obj1);
  const sum = R.pipe(
    defaultZero,
    R.add(num1)
  );
  return R.over(R.lensProp(key), sum, obj2);
};

export const divideObject = R.reduce((acc, key) => R.over(
  R.lensProp(key),
  R.divide(R.__, 24),
  acc
));

export const concatPropName = R.curry((str, obj) => R.pipe(
  R.toPairs,
  R.map(R.over(R.lensIndex(0), R.concat(str))),
  R.fromPairs
)(obj));
