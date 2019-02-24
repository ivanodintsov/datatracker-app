import R from 'ramda';

const headOr = R.curry((val, arr) => R.pipe(
  R.head,
  R.ifElse(
    R.isNil,
    val,
    R.identity
  )
)(arr));

export default headOr;
