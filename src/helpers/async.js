import util from 'util';
import async from 'async';
import R from 'ramda';

const asyncPromisified = R.mapObjIndexed(util.promisify, async);

export default asyncPromisified;
